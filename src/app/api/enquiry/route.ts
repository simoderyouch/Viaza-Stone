import { NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'

export const runtime = 'nodejs'

const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024
const allowedExtensions = new Set(['pdf', 'dwg', 'dxf', 'jpg', 'jpeg', 'png'])

function field(form: FormData, name: string, maxLength = 2_000) {
  const value = form.get(name)
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function readableLine(label: string, value: string) {
  return value ? `${label}: ${value}` : null
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > MAX_ATTACHMENT_BYTES + 512_000) {
    return NextResponse.json({ error: 'The submitted file is too large.' }, { status: 413 })
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ error: 'The request format is invalid.' }, { status: 400 })
  }

  // Quietly accept bot submissions caught by the honeypot without sending email.
  if (field(form, 'website')) return NextResponse.json({ ok: true })

  const name = field(form, 'name', 120)
  const company = field(form, 'company', 160)
  const email = field(form, 'email', 254)
  const phone = field(form, 'phone', 80)
  const role = field(form, 'role', 100)
  const enquiryType = field(form, 'enquiryType', 100)
  const material = field(form, 'material', 160)
  const country = field(form, 'country', 120)
  const location = field(form, 'location', 180)
  const quantity = field(form, 'quantity', 120)
  const finish = field(form, 'finish', 120)
  const thickness = field(form, 'thickness', 100)
  const deliveryDate = field(form, 'deliveryDate', 40)
  const message = field(form, 'message', 6_000)
  const privacyAccepted = field(form, 'privacyAccepted', 10)
  const isSampleRequest = field(form, 'isSampleRequest', 10) === 'true'
  const locale = field(form, 'locale', 5)

  if (!name || !isEmail(email) || !enquiryType || !country || !message || privacyAccepted !== 'yes') {
    return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
  }

  const attachment = form.get('attachment')
  const attachments: Array<{ filename: string; content: string }> = []

  if (attachment instanceof File && attachment.size > 0) {
    const extension = attachment.name.split('.').pop()?.toLowerCase() ?? ''
    if (attachment.size > MAX_ATTACHMENT_BYTES || !allowedExtensions.has(extension)) {
      return NextResponse.json({ error: 'The attachment type or size is not supported.' }, { status: 400 })
    }
    attachments.push({
      filename: attachment.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-180),
      content: Buffer.from(await attachment.arrayBuffer()).toString('base64'),
    })
  }

  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.CONTACT_FROM_EMAIL
  const toEmail = process.env.CONTACT_TO_EMAIL ?? 'hello@viazastone.com'

  if (!apiKey || !fromEmail) {
    console.error('Enquiry email service is not configured. Set RESEND_API_KEY and CONTACT_FROM_EMAIL.')
    return NextResponse.json({ error: 'The enquiry service is temporarily unavailable.' }, { status: 503 })
  }

  const reference = `VS-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${randomUUID().slice(0, 8).toUpperCase()}`
  const subject = `[${reference}] ${isSampleRequest ? 'Sample request' : 'Project enquiry'}${material ? ` — ${material}` : ''}`
  const enquiryText = [
    readableLine('Reference', reference),
    readableLine('Name', name),
    readableLine('Company', company),
    readableLine('Email', email),
    readableLine('Phone', phone),
    readableLine('Role', role),
    readableLine('Enquiry type', enquiryType),
    readableLine('Material', material),
    readableLine('Country / destination', country),
    readableLine('Project location', location),
    readableLine('Estimated quantity', quantity),
    readableLine('Preferred finish', finish),
    readableLine('Preferred thickness', thickness),
    readableLine('Expected delivery date', deliveryDate),
    '',
    'Project details:',
    message,
  ].filter((line): line is string => line !== null).join('\n')

  const confirmations: Record<string, { subject: string; greeting: string; body: string; material: string; destination: string; type: string; reference: string }> = {
    en: {
      subject: 'We received your Viaza Stone enquiry', greeting: `Hello ${name},`,
      body: 'Thank you for contacting Viaza Stone. We received your enquiry and will reply after reviewing the project information you supplied.',
      material: 'Material', destination: 'Destination', type: 'Enquiry type', reference: 'Reference',
    },
    fr: {
      subject: 'Votre demande Viaza Stone a bien été reçue', greeting: `Bonjour ${name},`,
      body: 'Merci d’avoir contacté Viaza Stone. Nous avons reçu votre demande et vous répondrons après examen des informations fournies.',
      material: 'Matériau', destination: 'Destination', type: 'Type de demande', reference: 'Référence',
    },
    ar: {
      subject: 'تم استلام طلبك لدى فيازا ستون', greeting: `مرحبًا ${name}،`,
      body: 'شكرًا لتواصلك مع فيازا ستون. استلمنا طلبك وسنرد بعد مراجعة معلومات المشروع التي أرسلتها.',
      material: 'الحجر', destination: 'الوجهة', type: 'نوع الطلب', reference: 'المرجع',
    },
  }
  const confirmation = confirmations[locale] ?? confirmations.en

  const payload = [
    {
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject,
      text: enquiryText,
      attachments,
    },
    {
      from: fromEmail,
      to: [email],
      reply_to: toEmail,
      subject: `[${reference}] ${confirmation.subject}`,
      text: `${confirmation.greeting}\n\n${confirmation.body}\n\n${confirmation.reference}: ${reference}\n${confirmation.material}: ${material || '—'}\n${confirmation.destination}: ${country}\n${confirmation.type}: ${enquiryType}\n\nViaza Stone\n${toEmail}`,
    },
  ]

  const response = await fetch('https://api.resend.com/emails/batch', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    console.error('Enquiry email delivery failed:', response.status, await response.text())
    return NextResponse.json({ error: 'Email delivery failed.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, reference })
}
