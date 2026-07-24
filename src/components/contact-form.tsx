'use client'

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
  const { t } = useLocale()
  const [submitted, setSubmitted] = useState(false)
  const [enquiryType, setEnquiryType] = useState(sample ? 'Material sample request' : initialEnquiryType)
  const [enquiryTypeError, setEnquiryTypeError] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!enquiryType) {
      setEnquiryTypeError(true)
      return
    }

    const form = new FormData(event.currentTarget)
    const selectedMaterial = String(form.get('material') || '')
    const isSampleRequest = Boolean(sample)
    const subject = isSampleRequest
      ? `Sample request${selectedMaterial ? ` — ${selectedMaterial}` : ''}`
      : `Viaza Stone project enquiry${selectedMaterial ? ` — ${selectedMaterial}` : ''}`
    const details = [
      [t('contact.name'), form.get('name')],
      [t('contact.company'), form.get('company')],
      [t('contact.email'), form.get('email')],
      [t('contact.phone'), form.get('phone')],
      [t('contact.need'), form.get('enquiryType')],
      [t('contact.material'), selectedMaterial],
      [t('contact.location'), form.get('location')],
      [t('contact.quantity'), form.get('quantity')],
      [t('contact.projectDetails'), form.get('message')],
    ]
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`)
      .join('\n\n')

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(details)}`
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="border border-[#282828] bg-[#f3f3f3] p-8" role="status">
        <p className="eyebrow">{t('contact.thankYou')}</p>
        <h2 className="font-display mt-3 text-3xl">{t('contact.emailReady')}</h2>
        <p className="mt-3 leading-7 text-stone-600">{t('contact.emailReadyCopy')}</p>
        <a href={`mailto:${contactEmail}`} className="button-primary mt-6">{t('contact.emailDirect')}</a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" aria-label={t('contact.formLabel')}>
      <p className="text-sm leading-6 text-stone-600">{t('contact.intro')}</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label={t('contact.name')} name="name" required autoComplete="name" />
        <FormField label={t('contact.company')} name="company" />
        <FormField label={t('contact.email')} name="email" type="email" required autoComplete="email" />
        <FormField label={t('contact.phone')} name="phone" type="tel" autoComplete="tel" />
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
        <FormField label={t('contact.location')} name="location" required />
        <FormField label={t('contact.quantity')} name="quantity" />
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-stone-700">{t('contact.projectDetails')}</span>
          <textarea name="message" rows={6} required placeholder={t('contact.projectPlaceholder')} className="w-full border border-stone-300 bg-white px-3 py-3 text-sm placeholder:text-stone-400" />
        </label>
      </div>
      <button type="submit" className="button-primary w-fit">
        {t('contact.prepareEmail')}
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
