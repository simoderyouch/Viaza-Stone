import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Viaza Stone handles information submitted through this website.',
}

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-4xl px-5 pb-20 pt-36 sm:px-8 lg:pt-44">
      <p className="eyebrow">Website information</p>
      <h1 className="font-display mt-4 text-5xl text-[#292b2c] sm:text-6xl">Privacy Policy</h1>
      <p className="mt-6 text-sm text-stone-500">Last updated: 11 September 2026</p>
      <div className="mt-10 space-y-9 text-base leading-8 text-stone-700">
        <PolicySection title="Information we receive">
          When you send an enquiry, we receive the information you enter in the form, such as your name, company, email address, telephone number, professional role, project destination, material requirements, quantity, timing, message, and any file you choose to attach.
        </PolicySection>
        <PolicySection title="How the information is used">
          We use this information to review your request, respond to you, prepare samples or quotations, and communicate about the project. We do not ask you to provide sensitive personal information through this website.
        </PolicySection>
        <PolicySection title="Service providers and international processing">
          Website hosting and email-delivery providers may process enquiry information on our behalf so that the website can operate and messages can be delivered. Their handling of information is governed by their own security and privacy obligations.
        </PolicySection>
        <PolicySection title="Retention and security">
          Enquiry information is retained only for as long as reasonably needed to respond, maintain relevant business records, and meet applicable obligations. Reasonable technical and organisational measures are used to protect submitted information, but no online transmission can be guaranteed to be completely secure.
        </PolicySection>
        <PolicySection title="Your choices">
          You may ask to access, correct, or delete personal information associated with your enquiry, subject to applicable legal and record-keeping requirements.
        </PolicySection>
        <PolicySection title="Contact">
          For a privacy question or request, email hello@viazastone.com or call +212 665 256 463.
        </PolicySection>
      </div>
    </article>
  )
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-3xl text-[#292b2c]">{title}</h2>
      <p className="mt-3">{children}</p>
    </section>
  )
}
