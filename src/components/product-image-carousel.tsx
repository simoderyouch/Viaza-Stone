'use client'

import Image from 'next/image'
import { useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { ProductImageMagnifier } from '@/components/product-image-magnifier'

type ProductImageCarouselProps = {
  images: string[]
  alt: string
  imageFit?: 'cover' | 'contain'
}

export function ProductImageCarousel({ images, alt, imageFit = 'cover' }: ProductImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex]
  const hasMultipleImages = images.length > 1

  if (!activeImage) return null

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + images.length) % images.length)
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % images.length)
  }

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="relative min-h-[30rem] flex-1 overflow-hidden sm:min-h-[40rem] lg:min-h-[42rem]">
        <ProductImageMagnifier
          key={activeImage}
          src={activeImage}
          alt={`${alt}, image ${activeIndex + 1} of ${images.length}`}
          sizes="(max-width: 1024px) 100vw, 54vw"
          fit={imageFit}
        />

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Show previous image"
              className="absolute left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-stone-300 bg-white/95 text-[#292b2c] transition hover:border-[#292b2c] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#8d8067]"
            >
              <IconChevronLeft size={21} stroke={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Show next image"
              className="absolute right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-stone-300 bg-white/95 text-[#292b2c] transition hover:border-[#292b2c] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#8d8067]"
            >
              <IconChevronRight size={21} stroke={1.5} aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {hasMultipleImages && (
        <div className="flex gap-3 overflow-x-auto border-t border-stone-200 px-5 py-4 sm:px-8" aria-label="Product image selector">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative h-16 w-20 shrink-0 overflow-hidden border bg-white transition focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#8d8067] ${index === activeIndex ? 'border-[#292b2c]' : 'border-stone-300 opacity-65 hover:opacity-100'}`}
              aria-label={`Show image ${index + 1}`}
              aria-pressed={index === activeIndex}
            >
              <Image src={image} alt="" fill sizes="80px" className={imageFit === 'contain' ? 'object-contain' : 'object-cover'} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
