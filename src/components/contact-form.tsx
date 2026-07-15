'use client'

import { FormEvent, useState } from 'react'
import { CustomSelect } from '@/components/custom-select'

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
      ['Name', form.get('name')],
      ['Company', form.get('company')],
      ['Email', form.get('email')],
      ['Phone', form.get('phone')],
      ['Enquiry type', form.get('enquiryType')],
      ['Material / surface', selectedMaterial],
      ['Project location', form.get('location')],
      ['Project scale / quantity', form.get('quantity')],
      ['Project details', form.get('message')],
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
        <p className="eyebrow">Thank you</p>
        <h2 className="font-display mt-3 text-3xl">Your email draft is ready.</h2>
        <p className="mt-3 leading-7 text-stone-600">We opened a pre-filled message in your email application. Review it, add any drawings or references, and send it to the Viaza Stone team.</p>
        <a href={`mailto:${contactEmail}`} className="button-primary mt-6">Email Viaza Stone directly</a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5" aria-label="Contact Viaza Stone">
      <p className="text-sm leading-6 text-stone-600">Share the material direction, project location, intended use, and any quantity or timing notes. The form prepares a detailed email that you can review and send.</p>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Name" name="name" required autoComplete="name" />
        <FormField label="Company" name="company" />
        <FormField label="Email" name="email" type="email" required autoComplete="email" />
        <FormField label="Phone" name="phone" type="tel" autoComplete="tel" />
        <div className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-stone-700">What do you need?</span>
          <CustomSelect
            name="enquiryType"
            value={enquiryType}
            onChange={(value) => {
              setEnquiryType(value)
              setEnquiryTypeError(false)
            }}
            placeholder="Select an enquiry type"
            invalid={enquiryTypeError}
            options={[
              { value: 'Material selection', label: 'Material selection', detail: 'Help me find the right stone direction' },
              { value: 'Material sample request', label: 'Material sample request', detail: 'I would like to review a sample' },
              { value: 'Project quote', label: 'Project quote', detail: 'I have a defined project requirement' },
              { value: 'Custom finish or format', label: 'Custom finish or format', detail: 'I need a tailored surface or cut' },
              { value: 'Export or supply enquiry', label: 'Export or supply enquiry', detail: 'I am sourcing for an international project' },
            ]}
          />
          {enquiryTypeError && <p className="mt-2 text-xs text-red-700">Choose an enquiry type before preparing your email.</p>}
        </div>
        <FormField label="Material or surface" name="material" defaultValue={material || sample} />
        <FormField label="Project location / destination" name="location" required />
        <FormField label="Project scale or estimated quantity" name="quantity" />
        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-stone-700">Tell us about the project</span>
          <textarea name="message" rows={6} required placeholder="Application, finish or format, timing, and anything else that will help us understand the brief." className="w-full border border-stone-300 bg-white px-3 py-3 text-sm placeholder:text-stone-400" />
        </label>
      </div>
      <button type="submit" className="button-primary w-fit">
        Prepare enquiry email
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
