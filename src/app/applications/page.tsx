import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ApplicationGallery } from '@/components/application-gallery'
import { SectionHeading } from '@/components/section-heading'
import { getApplicationsCopy, getLocalizedApplicationImages } from '@/i18n/applications'
import { getRequestLocale } from '@/i18n/server'

export const metadata: Metadata = {
  title: 'Applications',
  description: 'Explore Viaza Stone applications across flooring, paving, wall cladding, bathrooms, and exterior facades.',
}

export default async function ApplicationsPage() {
  const locale = await getRequestLocale()
  const copy = getApplicationsCopy(locale)
  const images = getLocalizedApplicationImages(locale)

  return (
    <>
      <section className="relative isolate overflow-hidden bg-stone-900 px-5 pb-16 pt-42 lg:px-8 lg:pb-20 lg:pt-48">
        <Image src="/images/applications/06_page_20_indoor_outdoor_flooring.webp" alt="Natural stone in an indoor-outdoor architectural setting" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto max-w-7xl text-white">
          <p className="text-[0.7rem] font-bold tracking-[0.19em] text-[#d4c5aa] uppercase">{copy.eyebrow}</p>
          <h1 className="font-display mt-4 max-w-2xl text-5xl leading-tight sm:text-6xl">{copy.title}</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-100">{copy.description}</p>
        </div>
      </section>

      {copy.groups.map((group, groupIndex) => {
        const groupImages = images.filter((image) => image.group === ['Flooring & stairs', 'Crazy paving', 'Walls & facades'][groupIndex])

        return (
          <section key={group.title} className={groupIndex % 2 === 0 ? 'bg-white px-5 py-18 lg:px-8' : 'bg-[#e8e6df] px-5 py-18 lg:px-8'}>
            <div className="mx-auto max-w-7xl">
              <SectionHeading eyebrow="Applications" title={group.title} description={group.description} />
              <ApplicationGallery images={groupImages} />
            </div>
          </section>
        )
      })}

      <section className="bg-[#282828] px-5 py-16 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-[0.66rem] font-bold tracking-[0.16em] text-[#d4c5aa] uppercase">{copy.ctaEyebrow}</p>
            <h2 className="font-display mt-2 text-3xl">{copy.ctaTitle}</h2>
          </div>
          <Link href="/contact" className="button-secondary w-fit border-white text-white">{copy.cta}</Link>
        </div>
      </section>
    </>
  )
}
