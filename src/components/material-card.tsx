import Image from 'next/image'
import Link from 'next/link'

type MaterialCardProps = {
  name: string
  tagline: string
  image: string
  href?: string
}

export function MaterialCard({ name, tagline, image, href = '/products', className = '' }: MaterialCardProps & { className?: string }) {
  return (
    <Link href={href} className={`group relative block min-h-80 overflow-hidden bg-stone-900 ${className}`}>
      <Image
        src={image}
        alt={`${name} surface`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/15 to-black/10" />
      <div className="absolute inset-x-0 bottom-0 p-7 text-white">
        <h3 className="font-display text-3xl">{name}</h3>
        <p className="mt-1 text-sm text-stone-200">{tagline}</p>
        <span className="mt-5 inline-block text-[0.66rem] font-bold tracking-[0.15em] uppercase">Explore material →</span>
      </div>
    </Link>
  )
}
