import Image from 'next/image'
import Link from 'next/link'

type MaterialCardProps = {
  name: string
  tagline: string
  description?: string
  image: string
  href?: string
  index?: number
}

export function MaterialCard({ name, tagline, description, image, href = '/products', index, className = '' }: MaterialCardProps & { className?: string }) {
  return (
    <Link href={href} className={`group relative block min-h-80 overflow-hidden bg-stone-900 ${className}`}>
      <Image
        src={image}
        alt={`${name} surface`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/5 transition-colors duration-500 group-hover:from-black/85 group-hover:via-black/20" />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-7 text-[0.65rem] font-bold tracking-[0.18em] text-[#e5d6b9] uppercase sm:p-8">
        <span>Collection</span>
        {index && <span>0{index}</span>}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-8">
        <p className="text-[0.68rem] font-bold tracking-[0.15em] text-[#e5d6b9] uppercase">{tagline}</p>
        <h3 className="font-display mt-3 text-4xl leading-none sm:text-5xl">{name}</h3>
        {description && <p className="mt-4 max-w-md text-sm leading-6 text-stone-200">{description}</p>}
        <span className="mt-6 inline-flex items-center gap-3 text-[0.66rem] font-bold tracking-[0.15em] uppercase">Explore material <span className="text-lg font-normal leading-none transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span></span>
      </div>
    </Link>
  )
}
