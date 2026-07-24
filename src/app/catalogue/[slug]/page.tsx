import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductCard } from '@/components/product-card'
import { getProductBySlug, products, type StoneDetailIcon } from '@/data/products'

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
          <div className="mt-7 grid items-start gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
            <div>
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                <Image data-no-translate src={product.image} alt={product.name} fill priority sizes="(max-width: 1024px) 100vw, 58vw" className={product.largeHeroImage ? 'scale-110 object-cover' : 'object-cover'} />
              </div>
            {product.gallery.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {product.gallery.map((image, index) => (
                  <div key={image} className="relative aspect-[3/2] overflow-hidden bg-stone-200">
                    <Image src={image} alt={`${product.name} detail ${index + 1}`} fill sizes="(max-width: 1024px) 50vw, 29vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
            </div>
            <div className="lg:pt-4">
              <p className="text-[0.68rem] font-bold tracking-[0.18em] text-[#282828] uppercase">{product.type} · {product.material}</p>
              <h1 data-no-translate className="font-display mt-4 text-5xl leading-tight text-[#292b2c] sm:text-6xl">{product.name}</h1>
              {product.detailHeading && <p className="mt-6 text-[0.68rem] font-bold tracking-[0.16em] text-[#8d8067]">{product.detailHeading}</p>}
              <p className="mt-5 max-w-xl text-base leading-7 text-stone-700">{product.description}</p>
              {product.stoneDetails ? (
                <section className="mt-8 border-t border-stone-300 pt-6" aria-labelledby="stone-details-heading">
                  <h2 id="stone-details-heading" className="text-[0.68rem] font-bold tracking-[0.16em] text-[#292b2c] uppercase">Stone details</h2>
                  <dl className="mt-5 grid gap-x-5 gap-y-5 sm:grid-cols-2">
                    {product.stoneDetails.map((detail) => <DetailItem key={detail.label} {...detail} />)}
                  </dl>
                </section>
              ) : (
                <>
                  <p className="mt-6 inline-flex border-y border-stone-300 py-3 text-sm font-semibold text-[#282828]">{product.availability}</p>
                  <dl className="mt-8 grid gap-x-7 gap-y-5 border-t border-stone-300 pt-6 sm:grid-cols-2">
                    <DetailItem label="Material" value={product.material} icon="material" />
                    <DetailItem label="Colour direction" value={product.color} icon="finish" />
                    <DetailItem label="Collection origin" value={product.origin} icon="origin" />
                    <DetailItem label="Availability" value={product.availability} icon="availability" />
                  </dl>
                </>
              )}
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
            <p className="eyebrow">{product.applicationEyebrow ?? 'Stone in application'}</p>
            <h2 className="font-display mt-3 text-4xl leading-tight text-[#292b2c] sm:text-5xl">{product.applicationTitle ?? `See ${product.name} in context.`}</h2>
            <p className="mt-5 max-w-md leading-7 text-stone-600">{product.applicationDescription ?? 'A visual direction for how this material can bring surface, scale, and natural character to an architectural project.'}</p>
          </div>
          <div className={`relative aspect-[4/3] overflow-hidden ${product.applicationImageFit === 'contain' ? 'bg-[#101010]' : 'bg-stone-300'}`}>
            <Image src={product.applicationImage} alt={`${product.name} used in an architectural application`} fill sizes="(max-width: 1024px) 100vw, 58vw" className={product.applicationImageFit === 'contain' ? 'object-contain' : 'object-cover'} />
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

function DetailItem({ label, value, icon }: { label: string; value: string; icon: StoneDetailIcon }) {
  return (
    <div className="flex gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#e8e2d7] text-[#6e624f]" aria-hidden="true">
        <DetailIcon icon={icon} />
      </span>
      <div>
        <dt className="text-[0.63rem] font-bold tracking-[0.15em] text-stone-500 uppercase">{label}</dt>
        <dd className="mt-1 text-sm leading-6 text-[#292b2c]">{value}</dd>
      </div>
    </div>
  )
}

function DetailIcon({ icon }: { icon: StoneDetailIcon }) {
  const paths: Record<StoneDetailIcon, React.ReactNode> = {
    material: <path d="m12 3 7 4v10l-7 4-7-4V7l7-4Zm0 4.1L8.5 9 12 11l3.5-2L12 7.1Zm-5 5.3v2.3l4 2.3v-2.4l-4-2.2Zm6 4.6 4-2.3v-2.3l-4 2.2v2.4Z" />,
    origin: <><path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" /><circle cx="12" cy="10" r="2" /></>,
    finish: <path d="M6 18c5-1 8-5 12-12M5 13c2.5-.2 4.6.5 6.4 2.1M12.5 7c1.7 1.2 3.8 1.8 6.3 1.7" />,
    dimensions: <><path d="M5 5h14v14H5z" /><path d="M8 8h8M8 12h5M8 16h8" /></>,
    thickness: <><path d="M6 7h12M6 12h12M6 17h12" /><path d="m9 5-2 2 2 2M15 15l2 2-2 2" /></>,
    availability: <><circle cx="12" cy="12" r="8" /><path d="m8.5 12 2.2 2.2 4.8-4.8" /></>,
  }

  return <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-[1.6]" strokeLinecap="round" strokeLinejoin="round">{paths[icon]}</svg>
}
