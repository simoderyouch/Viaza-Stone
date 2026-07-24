import Image from 'next/image'
import Link from 'next/link'
import { localizeProduct } from '@/i18n/products'
import { getRequestLocale } from '@/i18n/server'
import type { Product } from '@/data/products'

export async function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const locale = await getRequestLocale()
  const localizedProduct = localizeProduct(product, locale)
  const viewLabel = locale === 'fr' ? 'Voir la pierre' : locale === 'ar' ? 'عرض الحجر' : 'View material'
  const typeLabel = product.type === 'Viaza Limestone'
    ? (locale === 'fr' ? 'Calcaire Viaza' : locale === 'ar' ? 'حجر فيازا الجيري' : product.type)
    : (locale === 'fr' ? 'Marbre marocain' : locale === 'ar' ? 'رخام مغربي' : product.type)
  const materialLabel = product.material === 'Limestone'
    ? (locale === 'fr' ? 'Calcaire' : locale === 'ar' ? 'حجر جيري' : product.material)
    : product.material === 'Travertine'
      ? (locale === 'fr' ? 'Travertin' : locale === 'ar' ? 'ترافرتين' : product.material)
      : (locale === 'fr' ? 'Marbre' : locale === 'ar' ? 'رخام' : product.material)

  return (
    <article className="group overflow-hidden border border-stone-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className={compact ? 'relative aspect-[4/3] overflow-hidden' : 'relative aspect-[5/4] overflow-hidden'}>
        <Image
          data-no-translate
          src={localizedProduct.thumbnail}
          alt={localizedProduct.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-[0.64rem] font-bold tracking-[0.13em] text-[#282828] uppercase">
          {typeLabel} · {materialLabel}
        </p>
        <h3 data-no-translate className="font-display mt-2 text-2xl text-[#292b2c]">{localizedProduct.name}</h3>
        {!compact && <p className="mt-2 text-sm leading-6 text-stone-600">{localizedProduct.description}</p>}
        <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-xs text-stone-500">
          <span>{localizedProduct.color}</span>
          <span className="font-semibold text-[#282828]">{localizedProduct.availability}</span>
        </div>
        <Link href={`/catalogue/${localizedProduct.slug}`} className="mt-4 inline-flex text-[0.66rem] font-bold tracking-[0.14em] text-[#282828] uppercase transition hover:text-stone-500">
          {viewLabel} <span className="ml-2 text-base leading-none" aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
