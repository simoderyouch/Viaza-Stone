import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductCard } from '@/components/product-card'
import { getProductBySlug, products } from '@/data/products'

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) return { title: 'Material not found' }

  return {
    title: product.name,
    description: `${product.name} is a ${product.material.toLowerCase()} surface in the Viaza Stone catalogue.`,
  }
}

export default async function CatalogueProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) notFound()

  const relatedProducts = products
    .filter((item) => item.material === product.material && item.slug !== product.slug)
    .concat(products.filter((item) => item.type === product.type && item.slug !== product.slug && item.material !== product.material))
    .slice(0, 3)

  return (
    <>
      <section className="bg-[#f7f5f0] px-5 pb-16 pt-32 lg:px-8 lg:pb-20 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <Link href="/catalogue" className="inline-flex text-[0.66rem] font-bold tracking-[0.15em] text-stone-600 uppercase transition hover:text-[#282828]">
            <span className="mr-2 text-base leading-none" aria-hidden="true">←</span> Back to catalogue
          </Link>
          <div className="mt-7 grid items-start gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
            <div className="relative aspect-[5/4] overflow-hidden bg-stone-200">
              <Image data-no-translate src={product.image} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
            </div>
            {product.gallery.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {product.gallery.map((image, index) => (
                  <div key={image} className="relative aspect-square overflow-hidden bg-stone-200">
                    <Image src={image} alt={`${product.name} detail ${index + 1}`} fill sizes="(max-width: 1024px) 33vw, 19vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
            <div className="lg:pt-4">
              <p className="text-[0.68rem] font-bold tracking-[0.18em] text-[#282828] uppercase">{product.type} · {product.material}</p>
              <h1 data-no-translate className="font-display mt-4 text-5xl leading-tight text-[#292b2c] sm:text-6xl">{product.name}</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-stone-700">{product.description}</p>
              <p className="mt-6 inline-flex border-y border-stone-300 py-3 text-sm font-semibold text-[#282828]">{product.availability}</p>
              <dl className="mt-8 grid gap-x-7 gap-y-5 border-t border-stone-300 pt-6 sm:grid-cols-2">
                <DetailItem label="Material" value={product.material} />
                <DetailItem label="Colour direction" value={product.color} />
                <DetailItem label="Collection origin" value={product.origin} />
                <DetailItem label="Availability" value={product.availability} />
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/contact?material=${encodeURIComponent(product.name)}&enquiry=Project%20quote`} className="button-primary">Contact / Request a Quote</Link>
                <Link href={`/contact?sample=${encodeURIComponent(product.name)}`} className="button-secondary">Request a sample</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e8e6df] px-5 py-18 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:gap-16">
          <div>
            <p className="eyebrow">Stone in application</p>
            <h2 className="font-display mt-3 text-4xl leading-tight text-[#292b2c] sm:text-5xl">See {product.name} in context.</h2>
            <p className="mt-5 max-w-md leading-7 text-stone-600">A visual direction for how this material can bring surface, scale, and natural character to an architectural project.</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-stone-300">
            <Image src={product.applicationImage} alt={`${product.name} used in an architectural application`} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-18 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow">Specification guide</p>
            <h2 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">Shape the material around the project.</h2>
            <p className="mt-5 max-w-md leading-7 text-stone-600">The available finish and format depend on the material, selected stock, technical use, and project quantities. Start with these directions, then share your brief for a tailored review.</p>
          </div>
          <div className="grid gap-px bg-stone-200 sm:grid-cols-2">
            <DetailList title="Finish directions" items={product.finishes} />
            <DetailList title="Format options" items={product.formats} />
            <DetailList title="Suitable applications" items={product.applications} />
            <article className="bg-[#f7f5f0] p-7">
              <p className="text-[0.65rem] font-bold tracking-[0.16em] text-stone-500 uppercase">Selection note</p>
              <p className="mt-4 text-sm leading-7 text-stone-700">{product.note}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f5f0] px-5 py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Continue exploring</p>
              <h2 className="font-display mt-3 text-4xl sm:text-5xl">Related material directions</h2>
            </div>
            <Link href={`/catalogue?material=${encodeURIComponent(product.material)}`} className="button-secondary w-fit">More {product.material}</Link>
          </div>
          {relatedProducts.length > 0 && (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((related) => <ProductCard key={related.slug} product={related} />)}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#282828] px-5 py-16 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-[0.66rem] font-bold tracking-[0.16em] text-[#d4c5aa] uppercase">Project enquiry</p>
            <h2 className="font-display mt-2 text-3xl">Need this surface in a particular finish or format?</h2>
          </div>
          <Link href={`/contact?material=${encodeURIComponent(product.name)}&enquiry=Project%20quote`} className="button-secondary w-fit border-white text-white">Talk to Viaza Stone</Link>
        </div>
      </section>
    </>
  )
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.63rem] font-bold tracking-[0.15em] text-stone-500 uppercase">{label}</dt>
      <dd className="mt-1 text-sm leading-6 text-[#292b2c]">{value}</dd>
    </div>
  )
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="bg-white p-7">
      <h3 className="font-display text-2xl text-[#292b2c]">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-stone-700">
        {items.map((item) => <li key={item} className="flex gap-3"><span className="text-[#a0937b]" aria-hidden="true">—</span>{item}</li>)}
      </ul>
    </article>
  )
}
