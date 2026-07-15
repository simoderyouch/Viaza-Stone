import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/data/products'

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  return (
    <article className="group overflow-hidden border border-stone-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className={compact ? 'relative aspect-[4/3] overflow-hidden' : 'relative aspect-[5/4] overflow-hidden'}>
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <p className="text-[0.64rem] font-bold tracking-[0.13em] text-[#282828] uppercase">
          {product.type} · {product.material}
        </p>
        <h3 className="font-display mt-2 text-2xl text-[#292b2c]">{product.name}</h3>
        {!compact && <p className="mt-2 text-sm leading-6 text-stone-600">{product.description}</p>}
        <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-xs text-stone-500">
          <span>{product.color}</span>
          <span className="font-semibold text-[#282828]">{product.availability}</span>
        </div>
        <Link href={`/catalogue/${product.slug}`} className="mt-4 inline-flex text-[0.66rem] font-bold tracking-[0.14em] text-[#282828] uppercase transition hover:text-stone-500">
          View material <span className="ml-2 text-base leading-none" aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
