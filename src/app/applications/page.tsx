import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ApplicationGallery } from '@/components/application-gallery'
import { SectionHeading } from '@/components/section-heading'
import { applicationGroups, applicationImages } from '@/data/applications'

export const metadata: Metadata = {
  title: 'Applications',
  description: 'Explore Viaza Stone applications across flooring, paving, wall cladding, bathrooms, and exterior facades.',
}

export default function ApplicationsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-stone-900 px-5 pb-16 pt-42 lg:px-8 lg:pb-20 lg:pt-48">
        <Image src="/images/applications/13_page_26_exterior_facade_modern.webp" alt="Natural stone exterior facade" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto max-w-7xl text-white">
          <p className="text-[0.7rem] font-bold tracking-[0.19em] text-[#d4c5aa] uppercase">Application gallery</p>
          <h1 className="font-display mt-4 max-w-2xl text-5xl leading-tight sm:text-6xl">Natural stone for every architectural surface.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-100">From timeless limestone flooring and Crazy Paving to wall cladding and enduring facades, Viaza Stone adapts naturally to interior and exterior architecture.</p>
        </div>
      </section>

      {applicationGroups.map((group, groupIndex) => {
        const images = applicationImages.filter((image) => image.group === group.title)

        return (
          <section key={group.title} className={groupIndex % 2 === 0 ? 'bg-white px-5 py-18 lg:px-8' : 'bg-[#e8e6df] px-5 py-18 lg:px-8'}>
            <div className="mx-auto max-w-7xl">
              <SectionHeading eyebrow="Applications" title={group.title} description={group.description} />
              <ApplicationGallery images={images} />
            </div>
          </section>
        )
      })}

      <section className="bg-[#282828] px-5 py-16 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-[0.66rem] font-bold tracking-[0.16em] text-[#d4c5aa] uppercase">Project enquiry</p>
            <h2 className="font-display mt-2 text-3xl">Have a stone application in mind?</h2>
          </div>
          <Link href="/contact" className="button-secondary w-fit border-white text-white">Contact / Request a Quote</Link>
        </div>
      </section>
    </>
  )
}
