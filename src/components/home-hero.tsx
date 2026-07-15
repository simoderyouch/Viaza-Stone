'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type HeroSlide =
  | { kind: 'video'; video: string; poster: string; label: string; eyebrow: string; title: string; description: string }
  | { kind: 'image'; image: string; label: string; eyebrow: string; title: string; description: string }

const slides: HeroSlide[] = [
  {
    kind: 'video', video: '/images/hero/viaza-bathroom-hero.mp4', poster: '/images/hero/viaza-bathroom-hero.jpg', label: 'Natural stone bathroom',
    eyebrow: 'Viaza Stone', title: 'Stone with a sense of place.',
    description: 'Moroccan natural stone brings quiet depth, texture, and lasting character to refined interior spaces.',
  },
  {
    kind: 'video', video: '/images/hero/viaza-fireplace-hero.mp4', poster: '/images/hero/viaza-fireplace-hero.jpg', label: 'Natural stone fireplace',
    eyebrow: 'Natural warmth', title: 'Material character, made to last.',
    description: 'From fireplaces and feature surfaces to full architectural schemes, Viaza Stone connects natural material with considered design.',
  },
  {
    kind: 'image', image: '/images/hero/cover-landing.webp', label: 'Viaza Stone material interior',
    eyebrow: 'Born in Taza', title: 'Crafted for architecture.',
    description: 'Explore Viaza limestone and premium Moroccan marbles, selected for enduring residential, hospitality, and architectural projects.',
  },
]

export function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])
  const { scrollY } = useScroll()
  const mediaScale = useTransform(scrollY, [0, 850], [1, 1.12])
  const contentY = useTransform(scrollY, [0, 700], [0, 92])
  const contentOpacity = useTransform(scrollY, [0, 560], [1, 0])
  const activeContent = slides[activeSlide]

  useEffect(() => {
    const slider = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 9000)
    return () => window.clearInterval(slider)
  }, [])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return

      video.defaultPlaybackRate = 0.65
      video.playbackRate = 0.65

      if (index === activeSlide) {
        video.currentTime = 0
        void video.play().catch(() => undefined)
      } else {
        video.pause()
        video.currentTime = 0
      }
    })
  }, [activeSlide])

  return (
    <section className="relative isolate h-[87vh] min-h-160 overflow-hidden bg-stone-950">
      {slides.map((slide, index) => (
        <motion.div key={slide.label} style={{ scale: mediaScale }} className={`absolute -inset-8 transition-opacity duration-700 ${index === activeSlide ? 'opacity-100' : 'opacity-0'}`} aria-hidden={index !== activeSlide}>
          {slide.kind === 'video' ? (
            <video
              ref={(element) => { videoRefs.current[index] = element }}
              muted
              loop
              playsInline
              preload={index === 0 ? 'auto' : 'metadata'}
              poster={slide.poster}
              className="size-full object-cover"
            >
              <source src={slide.video} type="video/mp4" />
            </video>
          ) : (
            <motion.div
              className="size-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              animate={{ scale: index === activeSlide ? 1.08 : 1.02 }}
              transition={{ duration: 7, ease: 'linear' }}
            />
          )}
          <div className="absolute inset-0 bg-black/48" />
        </motion.div>
      ))}
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative mx-auto flex h-full max-w-7xl items-center px-5 pt-32 pb-10 lg:px-8 lg:pt-34">
        <div className="max-w-xl text-white">
          <AnimatePresence mode="wait">
            <motion.div key={activeContent.label} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <p className="text-[0.7rem] font-bold tracking-[0.19em] text-[#d4c5aa] uppercase">{activeContent.eyebrow}</p>
              <h1 className="font-display mt-4 text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">{activeContent.title}</h1>
              <p className="mt-7 max-w-lg text-base leading-7 text-stone-100">{activeContent.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="button-primary">Contact / Request a Quote</Link>
                <Link href="/catalogue" className="button-secondary text-white">Explore collections</Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      <div className="absolute inset-x-0 bottom-7 z-10 flex justify-center gap-2.5" aria-label="Hero slides">
        {slides.map((slide, index) => (
          <button
            key={slide.label}
            type="button"
            aria-label={`Go to slide ${index + 1}: ${slide.label}`}
            aria-pressed={index === activeSlide}
            onClick={() => setActiveSlide(index)}
            className={`size-2 rounded-full border border-white transition ${index === activeSlide ? 'bg-white' : 'bg-transparent'}`}
          />
        ))}
      </div>
      <motion.div aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ delay: 0.8, duration: 0.6 }} className="absolute bottom-6 left-7 hidden items-center gap-3 text-[0.62rem] font-light tracking-[0.16em] text-white uppercase lg:flex">
        <span>Scroll to explore</span>
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>↓</motion.span>
      </motion.div>
    </section>
  )
}
