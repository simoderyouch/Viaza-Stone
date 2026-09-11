'use client'

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { CustomSelect } from '@/components/custom-select'
import { useLocale } from '@/components/locale-provider'

const contactEmail = 'hello@viazastone.com'

export function ContactForm({
  material = '',
  sample = '',
  initialEnquiryType = '',
}: {
  material?: string
  sample?: string
  initialEnquiryType?: string
}) {
  const { t, locale } = useLocale()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [reference, setReference] = useState('')
  const [enquiryType, setEnquiryType] = useState(sample ? 'Material sample request' : initialEnquiryType)
  const [role, setRole] = useState('')
  const [enquiryTypeError, setEnquiryTypeError] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!enquiryType) {
      setEnquiryTypeError(true)
      return
    }

    const form = new FormData(event.currentTarget)
    form.set('enquiryType', enquiryType)
    form.set('role', role)
    form.set('isSampleRequest', sample ? 'true' : 'false')
    form.set('locale', locale)
    setStatus('submitting')

    try {
      const response = await fetch('/api/enquiry', { method: 'POST', body: form })
      if (!response.ok) throw new Error('Enquiry submission failed')
      const result = await response.json() as { reference?: string }
      setReference(result.reference ?? '')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-[#282828] bg-[#f3f3f3] p-8" role="status">
        <p className="eyebrow">{t('contact.thankYou')}</p>
        <h2 className="font-display mt-3 text-3xl">{t('contact.emailReady')}</h2>
        <p className="mt-3 leading-7 text-stone-600">{t('contact.emailReadyCopy')}</p>
        {reference && <p className="mt-3 text-sm font-semibold text-stone-700">{t('contact.reference')}: {reference}</p>}
        <Link href="/catalogue" className="button-primary mt-6">Explore materials</Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="grid gap-5" aria-label={t('contact.formLabel')}>
      <p className="text-sm leading-6 text-stone-600">{t('contact.intro')}</p>
      {status === 'error' && (
        <div className="border border-red-300 bg-red-50 p-4 text-sm leading-6 text-red-800" role="alert">
          {t('contact.sendError')} <a href={`mailto:${contactEmail}`} className="font-semibold underline">{contactEmail}</a>
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label={t('contact.name')} name="name" required autoComplete="name" />
        <FormField label={t('contact.company')} name="company" />
        <FormField label={t('contact.email')} name="email" type="email" required autoComplete="email" />
        <FormField label={t('contact.phone')} name="phone" type="tel" autoComplete="tel" />
        <div className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-stone-700">{t('contact.role')}</span>
          <CustomSelect
            name="role"
            value={role}
            onChange={setRole}
            placeholder={t('contact.selectRole')}
            options={[
              { value: 'Importer / Distributor', label: 'Importer / Distributor' },
              { value: 'Architect / Designer', label: 'Architect / Designer' },
              { value: 'Developer', label: 'Developer' },
              { value: 'Contractor / Fabricator', label: 'Contractor / Fabricator' },
              { value: 'Private client', label: 'Private client' },
            ]}
          />
        </div>
        <div className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-stone-700">{t('contact.need')}</span>
          <CustomSelect
            name="enquiryType"
            value={enquiryType}
            onChange={(value) => {
              setEnquiryType(value)
              setEnquiryTypeError(false)
            }}
            placeholder={t('contact.selectType')}
            invalid={enquiryTypeError}
            options={[
              { value: 'Material selection', label: t('contact.materialSelection'), detail: t('contact.materialSelectionDetail') },
              { value: 'Material sample request', label: t('contact.sampleRequest'), detail: t('contact.sampleRequestDetail') },
              { value: 'Project quote', label: t('contact.projectQuote'), detail: t('contact.projectQuoteDetail') },
              { value: 'Custom finish or format', label: t('contact.customFinish'), detail: t('contact.customFinishDetail') },
              { value: 'Export or supply enquiry', label: t('contact.export'), detail: t('contact.exportDetail') },
            ]}
          />
          {enquiryTypeError && <p className="mt-2 text-xs text-red-700">{t('contact.chooseType')}</p>}
        </div>
        <FormField label={t('contact.material')} name="material" defaultValue={material || sample} />
        <FormField label={t('contact.country')} name="country" required autoComplete="country-name" />
        <FormField label={t('contact.location')} name="location" />
        <FormField label={t('contact.quantity')} name="quantity" />
        <FormField label={t('contact.finish')} name="finish" />
        <FormField label={t('contact.thickness')} name="thickness" />
        <FormField label={t('contact.delivery')} name="deliveryDate" type="date" />
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-stone-700">{t('contact.projectDetails')}</span>
          <textarea name="message" rows={6} required placeholder={t('contact.projectPlaceholder')} className="w-full border border-stone-300 bg-white px-3 py-3 text-sm placeholder:text-stone-400" />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-stone-700">{t('contact.attachment')}</span>
          <input name="attachment" type="file" accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png" className="w-full border border-stone-300 bg-white px-3 py-3 text-sm file:mr-4 file:border-0 file:bg-[#282828] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-white" />
          <span className="mt-2 block text-xs text-stone-500">{t('contact.attachmentHelp')}</span>
        </label>
        <label className="flex items-start gap-3 sm:col-span-2">
          <input name="privacyAccepted" type="checkbox" value="yes" required className="mt-1 size-4 accent-[#282828]" />
          <span className="text-sm leading-6 text-stone-600">
            {t('contact.privacy')} <Link href="/privacy" className="font-semibold text-[#282828] underline">{t('footer.privacy')}</Link>.
          </span>
        </label>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      </div>
      <button type="submit" disabled={status === 'submitting'} className="button-primary w-fit disabled:cursor-wait disabled:opacity-60">
        {status === 'submitting' ? t('contact.sending') : t('contact.prepareEmail')}
      </button>
    </form>
  )
}

function FormField({
  label,
  name,
  type = 'text',
  required = false,
  defaultValue,
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  defaultValue?: string
  autoComplete?: string
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-stone-700">
        {label}{required && <span aria-hidden="true"> *</span>}
      </span>
      <input name={name} type={type} required={required} defaultValue={defaultValue} autoComplete={autoComplete} className="w-full border border-stone-300 bg-white px-3 py-3 text-sm" />
    </label>
  )
}
