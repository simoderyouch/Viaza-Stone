'use client'

import Image from 'next/image'
import { useRef } from 'react'

type ProductImageMagnifierProps = {
  src: string
  alt: string
  sizes: string
  priority?: boolean
  fit?: 'contain' | 'cover'
  noTranslate?: boolean
}

export function ProductImageMagnifier({
  src,
  alt,
  sizes,
  priority = false,
  fit = 'cover',
  noTranslate = false,
}: ProductImageMagnifierProps) {
  const lensRef = useRef<HTMLDivElement>(null)
  const magnifiedImageRef = useRef<HTMLDivElement>(null)

  function updateLens(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse' || !lensRef.current || !magnifiedImageRef.current) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    const zoom = 2.4
    const lensSize = lensRef.current.offsetWidth

    lensRef.current.style.opacity = '1'
    lensRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`
    magnifiedImageRef.current.style.width = `${bounds.width * zoom}px`
    magnifiedImageRef.current.style.height = `${bounds.height * zoom}px`
    magnifiedImageRef.current.style.left = `${(lensSize / 2) - (x * zoom)}px`
    magnifiedImageRef.current.style.top = `${(lensSize / 2) - (y * zoom)}px`
  }

  function hideLens() {
    if (lensRef.current) lensRef.current.style.opacity = '0'
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden lg:cursor-none"
      onPointerMove={updateLens}
      onPointerLeave={hideLens}
    >
      <Image
        data-no-translate={noTranslate ? '' : undefined}
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={fit === 'contain' ? 'object-contain' : 'object-cover'}
      />
      <div
        ref={lensRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 hidden size-44 overflow-hidden rounded-full border-2 border-white bg-white opacity-0 shadow-[0_10px_30px_rgb(41_43_44_/_0.28)] transition-opacity duration-150 lg:block"
      >
        <div ref={magnifiedImageRef} className="absolute overflow-hidden">
          <Image src={src} alt="" fill sizes="176px" className={fit === 'contain' ? 'object-contain' : 'object-cover'} />
        </div>
      </div>
    </div>
  )
}
