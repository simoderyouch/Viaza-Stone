import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductCard } from '@/components/product-card'
import { SectionHeading } from '@/components/section-heading'
import { getCollectionPage } from '@/data/collections'
import { products } from '@/data/products'

type CollectionPageProps = {
  params: Promise<{ collection: string }>
}

function getMatchingProducts(collection: NonNullable<ReturnType<typeof getCollectionPage>>) {
  if ('productNamePrefix' in collection) {
    return products.filter((product) => product.name.startsWith(collection.productNamePrefix))
  }

  return products.filter((product) => product.material === collection.material)
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { collection: slug } = await params
  const collection = getCollectionPage(slug)

  if (!collection) return {}

  return {
    title: collection.title,
    description: collection.description,
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collection: slug } = await params
  const collection = getCollectionPage(slug)

  if (!collection) notFound()

  const collectionProducts = getMatchingProducts(collection)

  return (
    <>
      <section className="relative isolate overflow-hidden bg-stone-900 px-5 pb-16 pt-42 lg:px-8 lg:pb-20 lg:pt-48">
        <Image src={collection.image} alt={`${collection.title} natural stone`} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative mx-auto max-w-7xl text-white">
          <p className="text-[0.7rem] font-bold tracking-[0.19em] text-[#d4c5aa] uppercase">{collection.eyebrow}</p>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">{collection.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-100">{collection.description}</p>
        </div>
      </section>

      <section className="px-5 py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow={collection.eyebrow}
            title="Find your own finish"
            description={`Explore the available ${collection.title.toLowerCase()} finishes and choose the material expression that best fits your project.`}
          />
          <div className="mt-10 flex items-center border-y border-stone-200 py-5">
            <p className="text-sm text-stone-600">
              <strong className="text-[#292b2c]">{collectionProducts.length}</strong> available finishes
            </p>
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {collectionProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
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
