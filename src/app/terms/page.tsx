import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Website Terms',
  description: 'Terms governing the use of the Viaza Stone website and catalogue information.',
}

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-4xl px-5 pb-20 pt-36 sm:px-8 lg:pt-44">
      <p className="eyebrow">Website information</p>
      <h1 className="font-display mt-4 text-5xl text-[#292b2c] sm:text-6xl">Website Terms</h1>
      <p className="mt-6 text-sm text-stone-500">Last updated: 11 September 2026</p>
      <div className="mt-10 space-y-9 text-base leading-8 text-stone-700">
        <TermsSection title="Catalogue information">
          Website descriptions, images, formats, finishes, and availability are provided for general product exploration. They do not constitute a final technical specification, quotation, or supply commitment.
        </TermsSection>
        <TermsSection title="Natural variation">
          Natural stone varies in colour, tone, mineral structure, texture, markings, and veining. Digital images and screens cannot reproduce every material characteristic. Final selection should be based on current samples and confirmed project documentation.
        </TermsSection>
        <TermsSection title="Project confirmation">
          Dimensions, thicknesses, tolerances, performance requirements, quantities, packing, production timing, delivery, and installation suitability must be confirmed in writing for the selected material and project before an order is placed.
        </TermsSection>
        <TermsSection title="Image use">
          Application imagery may illustrate design possibilities. An image represents a Viaza Stone supply reference only where that relationship is expressly stated.
        </TermsSection>
        <TermsSection title="Website use">
          You may use this website to review the collection and contact Viaza Stone. You may not misuse the website, interfere with its operation, or reproduce its content for commercial use without permission.
        </TermsSection>
        <TermsSection title="Contact">
          Questions about this website may be sent to hello@viazastone.com or discussed by calling +212 665 256 463.
        </TermsSection>
      </div>
    </article>
  )
}

function TermsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-3xl text-[#292b2c]">{title}</h2>
      <p className="mt-3">{children}</p>
    </section>
  )
}
