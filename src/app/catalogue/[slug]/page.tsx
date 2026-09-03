import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  IconArrowAutofitHeight,
  IconArrowUpRight,
  IconCalendarCheck,
  IconLayersLinked,
  IconMapPin,
  IconRulerMeasure,
  IconSparkles,
} from '@tabler/icons-react'
import { ProductImageCarousel } from '@/components/product-image-carousel'
import { ProductImageMagnifier } from '@/components/product-image-magnifier'
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
  const descriptionParagraphs = Array.isArray(product.description) ? product.description : [product.description]
  const secondImage = product.gallery[0]
  const additionalImages = product.gallery.slice(1)
  const useApplicationCarousel = product.slug === 'viaza-beige-tumbled' && additionalImages.length > 0
  const applicationImages = useApplicationCarousel ? [product.applicationImage, ...additionalImages] : []
  const secondImageFit = product.galleryImageFit ?? product.imageFit
  const hasThreeImageStory = Boolean(secondImage)
  const heroImage = hasThreeImageStory ? product.image : product.thumbnail
  const heroImageFit = hasThreeImageStory ? product.imageFit : 'contain'
  const displayStoneDetails = product.stoneDetails ?? [
    { label: 'Material', value: product.material, icon: 'material' as const },
    { label: 'Collection origin', value: product.origin, icon: 'origin' as const },
    { label: 'Finish', value: product.finishes.join(', '), icon: 'finish' as const },
    { label: 'Tile Dimensions', value: product.formats.join(', '), icon: 'dimensions' as const },
    { label: 'Availability', value: product.availability, icon: 'availability' as const },
  ]

  return (
    <>
      <section className={hasThreeImageStory ? 'bg-white pt-20  lg:pt-24' : 'bg-white px-5 pb-6 pt-18 sm:px-8 lg:px-12 lg:pb-8 lg:pt-20'}>
        <div className={hasThreeImageStory ? 'grid lg:grid-cols-[minmax(0,1.14fr)_minmax(22rem,0.86fr)] lg:items-center' : 'mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[minmax(0,1.14fr)_minmax(22rem,0.86fr)] lg:items-center lg:gap-20'}>
          <div className={hasThreeImageStory ? 'relative min-h-[32rem] overflow-hidden bg-white sm:min-h-[44rem] lg:min-h-[58rem]' : 'relative aspect-[4/5] overflow-hidden bg-white'}>
            <ProductImageMagnifier
              src={heroImage}
              alt={product.name}
              priority
              sizes={hasThreeImageStory ? '(max-width: 1024px) 100vw, 58vw' : '(max-width: 1024px) 100vw, 58vw'}
              fit={heroImageFit}
              noTranslate
            />
          </div>
          <div className={hasThreeImageStory ? 'max-w-xl px-5 py-10 sm:px-8 lg:px-16 lg:py-6 xl:px-24' : 'max-w-xl lg:py-6'}>
            <Link href="/catalogue" className="inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.16em] text-stone-600 uppercase transition hover:text-[#292b2c]">
              Back to catalogue <IconArrowUpRight size={15} stroke={1.7} aria-hidden="true" />
            </Link>
            <p className="mt-8 text-[0.68rem] font-bold tracking-[0.19em] text-[#292b2c] uppercase">{product.type}</p>
            <h1 data-no-translate className="font-display mt-4 text-5xl leading-[1.02] text-[#292b2c] sm:text-6xl lg:text-7xl">{product.name}</h1>
            <p className="mt-5 text-lg leading-8 text-stone-600">{product.color} limestone in a {product.finishes.join(', ').toLowerCase()} finish.</p>
            {!hasThreeImageStory && <p className="mt-6 text-base leading-7 text-stone-700">{descriptionParagraphs[0]}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/contact?material=${encodeURIComponent(product.name)}&enquiry=Project%20quote`} className="button-primary">Contact / Request a Quote</Link>
              <Link href={`/contact?sample=${encodeURIComponent(product.name)}`} className="button-secondary">Request a sample</Link>
            </div>
          </div>
        </div>
      </section>

      {hasThreeImageStory && (
        <section className="border-y border-stone-200 bg-[#f5f5f2] px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
          <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <div>
              {product.detailHeading && <p className="text-sm font-semibold leading-6 text-[#8d8067]">{product.detailHeading}</p>}
              <h2 className="font-display mt-5 text-4xl leading-tight text-[#292b2c] sm:text-5xl">A surface with natural character.</h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-stone-700">
              {descriptionParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </section>
      )}

      <section id="stone-details" className="bg-white" aria-labelledby="stone-details-heading">
        <div className={`grid ${secondImage ? 'lg:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.92fr)]' : ''}`}>
          {secondImage && (
            <div className="relative min-h-[34rem] overflow-hidden bg-white sm:min-h-[42rem] lg:min-h-[42rem]">
              <ProductImageMagnifier
                src={secondImage}
                alt={`${product.name} material detail`}
                sizes="(max-width: 1024px) 100vw, 54vw"
                fit={secondImageFit}
              />
            </div>
          )}
          <div className={secondImage ? 'flex min-h-[34rem] items-center px-5 sm:min-h-[42rem] sm:px-10 lg:min-h-[43rem] lg:px-16 xl:px-24' : 'mx-auto w-full max-w-[1400px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16'}>
            <div className={`w-full ${secondImage ? 'max-w-xl' : ''}`}>
              <p className="text-[0.68rem] font-bold tracking-[0.19em] text-[#292b2c] uppercase">Material specifications</p>
              <h2 id="stone-details-heading" className="font-display mt-5 text-5xl leading-tight text-[#292b2c] sm:text-6xl">Stone details</h2>
              <dl className={`mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 ${secondImage ? '' : 'lg:grid-cols-3'}`}>
                {displayStoneDetails.map((detail) => <DetailItem key={detail.label} {...detail} />)}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {!useApplicationCarousel && additionalImages.map((image, index) => (
        <section key={image} className="border-t border-stone-200 bg-white" aria-label={`${product.name} additional material view ${index + 1}`}>
          <div className="relative min-h-[30rem] overflow-hidden bg-white sm:min-h-[40rem] lg:min-h-[52rem]">
            <ProductImageMagnifier
              src={image}
              alt={`${product.name} additional material view ${index + 1}`}
              sizes="100vw"
              fit={product.galleryImageFit ?? product.imageFit}
            />
          </div>
        </section>
      ))}

      <section className="border-y border-stone-200 bg-white">
        <div className="grid lg:grid-cols-[minmax(22rem,0.8fr)_minmax(0,1.2fr)]">
          <div className="flex items-center px-6 py-12 sm:px-12 lg:px-20 lg:py-14">
            <div className="max-w-md">
              <p className="text-[0.68rem] font-bold tracking-[0.19em] text-[#292b2c] uppercase">Natural material. Clear intent.</p>
              <h2 className="font-display mt-6 text-5xl leading-[1.04] text-[#292b2c] sm:text-6xl">Bring this stone into your project.</h2>
              <p className="mt-7 text-lg leading-8 text-stone-600">Explore application ideas, then speak with our team about samples, formats, and availability.</p>
              <Link href="/applications" className="button-secondary mt-10 w-fit">Explore applications <IconArrowUpRight size={16} stroke={1.7} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden bg-white lg:aspect-auto lg:min-h-[42rem]">
            {useApplicationCarousel ? (
              <ProductImageCarousel images={applicationImages} alt={`${product.name} used in an architectural application`} imageFit={product.applicationImageFit} />
            ) : (
              <ProductImageMagnifier
                src={product.applicationImage}
                alt={`${product.name} used in an architectural application`}
                sizes="(max-width: 1024px) 100vw, 60vw"
                fit={product.applicationImageFit}
              />
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f2] px-5 py-10 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-4xl leading-tight text-[#292b2c] sm:text-5xl">Continue exploring</h2>
            <Link href={`/catalogue?material=${encodeURIComponent(product.material)}`} className="button-secondary w-fit">More {product.material}</Link>
          </div>
          {relatedProducts.length > 0 && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((related) => <ProductCard key={related.slug} product={related} />)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

function DetailItem({ label, value, icon }: { label: string; value: string; icon: StoneDetailIcon }) {
  const Icon = detailIcons[icon]

  return (
    <div className="flex items-start gap-5">
      <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center border border-stone-300 text-[#8d8067]" aria-hidden="true">
        <Icon size={25} stroke={1.35} />
      </span>
      <div>
        <dt className="text-[0.68rem] font-bold tracking-[0.16em] text-stone-500 uppercase">{label}</dt>
        <dd className="mt-2 text-lg leading-7 text-[#292b2c]">{value}</dd>
      </div>
    </div>
  )
}

const detailIcons = {
  material: IconLayersLinked,
  origin: IconMapPin,
  finish: IconSparkles,
  dimensions: IconRulerMeasure,
  thickness: IconArrowAutofitHeight,
  availability: IconCalendarCheck,
} satisfies Record<StoneDetailIcon, typeof IconLayersLinked>
