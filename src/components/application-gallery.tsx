'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { ApplicationImage } from '@/data/applications'

export function ApplicationGallery({ images }: { images: ApplicationImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const selectedImage = selectedIndex === null ? null : images[selectedIndex]

  useEffect(() => {
    if (selectedIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedIndex(null)
      if (event.key === 'ArrowRight') setSelectedIndex((index) => index === null ? null : (index + 1) % images.length)
      if (event.key === 'ArrowLeft') setSelectedIndex((index) => index === null ? null : (index - 1 + images.length) % images.length)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [images.length, selectedIndex])

  const showPrevious = () => setSelectedIndex((index) => index === null ? null : (index - 1 + images.length) % images.length)
  const showNext = () => setSelectedIndex((index) => index === null ? null : (index + 1) % images.length)

  return (
    <>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((application, index) => (
          <button
            key={application.image}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden bg-stone-900 text-left"
            aria-label={`View ${application.title} larger`}
          >
            <Image src={application.image} alt={application.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && selectedIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedImage.title} image viewer`}
            className="fixed inset-0 z-[80] grid place-items-center bg-black/90 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button type="button" onClick={() => setSelectedIndex(null)} className="absolute right-5 top-5 z-10 grid size-11 place-items-center border border-white/50 text-2xl text-white transition hover:border-white sm:right-8 sm:top-8" aria-label="Close image viewer">×</button>
            <button type="button" onClick={showPrevious} className="absolute left-3 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center border border-white/50 text-3xl text-white transition hover:border-white sm:left-8" aria-label="Previous image">←</button>
            <motion.div
              key={selectedImage.image}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="relative h-[78vh] w-full max-w-6xl"
            >
              <Image src={selectedImage.image} alt={selectedImage.title} fill priority sizes="(max-width: 1280px) 100vw, 1200px" className="object-contain" />
            </motion.div>
            <button type="button" onClick={showNext} className="absolute right-3 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center border border-white/50 text-3xl text-white transition hover:border-white sm:right-8" aria-label="Next image">→</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
