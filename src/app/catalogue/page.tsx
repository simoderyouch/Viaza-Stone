import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ProductCard } from '@/components/product-card'
import { SectionHeading } from '@/components/section-heading'
import { collectionPages, materialCollections } from '@/data/collections'
import { products } from '@/data/products'

export const metadata: Metadata = {
  title: 'Catalogue',
  description: 'Search the Viaza Stone collection of Taza limestone and premium Moroccan marble.',
}

export default function CataloguePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-stone-900 px-5 pb-16 pt-42 lg:px-8 lg:pb-20 lg:pt-48">
        <Image src="/images/viaza-biege-header-image.jpeg" alt="Viaza Beige natural stone" fill priority sizes="100vw" className="object-cover" />
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
            title="Find your own finish"
            description="Explore the complete Viaza Stone range by material type, then open a surface to view its finishes, applications, and enquiry details."
          />
          <div className="mt-12 space-y-18">
            {materialCollections.map((materialCollection) => {
              const collectionSlug = materialCollection.href.split('/').pop()
              const collection = collectionPages.find((page) => page.slug === collectionSlug)

              if (!collection) return null

              const collectionProducts = 'productNamePrefix' in collection
                ? products.filter((product) => product.name.startsWith(collection.productNamePrefix))
                : products.filter((product) => product.material === collection.material)

              return (
                <section key={materialCollection.name} className="border-t border-stone-200 pt-8 sm:pt-10">
                  <div className="max-w-2xl">
                    <p className="text-[0.7rem] font-bold tracking-[0.19em] text-[#a0937b] uppercase">Collection</p>
                    <h2 className="font-display mt-3 text-3xl leading-tight text-[#292b2c] sm:text-4xl">{materialCollection.name}</h2>
                    <p className="mt-3 leading-7 text-stone-600">{materialCollection.description}</p>
                  </div>
                  <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {collectionProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
                  </div>
                </section>
              )
            })}
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
