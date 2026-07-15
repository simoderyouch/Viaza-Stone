import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CatalogueBrowser } from '@/components/catalogue-browser'
import { SectionHeading } from '@/components/section-heading'
import { products } from '@/data/products'

export const metadata: Metadata = {
  title: 'Catalogue',
  description: 'Search the Viaza Stone collection of Taza limestone and premium Moroccan marble.',
}

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<{ material?: string; type?: string; q?: string }>
}) {
  const { material, type, q } = await searchParams

  return (
    <>
      <section className="relative isolate overflow-hidden bg-stone-900 px-5 pb-16 pt-42 lg:px-8 lg:pb-20 lg:pt-48">
        <Image src="/images/showcase/ns-featured-101.jpeg" alt="Natural stone slab detail" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative mx-auto max-w-7xl text-white">
          <p className="text-[0.7rem] font-bold tracking-[0.19em] text-[#d4c5aa] uppercase">Live collection</p>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">Surface catalogue</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-100">
            Browse Taza limestone and premium Moroccan marble by collection, material, or colour. Availability can vary, so our team is ready to help you see a surface in person.
          </p>
        </div>
      </section>

      <section className="px-5 py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Find the right surface"
            title="Browse the collection"
            description="Use the filters to narrow a material direction, then open each surface for its formats, finish directions, applications, and enquiry links."
          />
          <div className="mt-10">
            <CatalogueBrowser products={products} initialMaterial={material} initialType={type} initialQuery={q} />
          </div>
        </div>
      </section>

      <section className="bg-[#282828] px-5 py-14 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-[#d4c5aa]">See it in person</p>
            <h2 className="font-display mt-2 text-3xl">Found something you love?</h2>
          </div>
          <Link href="/contact" className="button-secondary w-fit border-white text-white">Request a slab viewing</Link>
        </div>
      </section>
    </>
  )
}
