'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

export function HomeHero() {
  const { scrollY } = useScroll()
  const mediaScale = useTransform(scrollY, [0, 850], [1, 1.12])
  const contentY = useTransform(scrollY, [0, 700], [0, 92])
  const contentOpacity = useTransform(scrollY, [0, 560], [1, 0])

  return (
    <section className="relative isolate h-[97vh] min-h-160 overflow-hidden bg-stone-950">
      <motion.div style={{ scale: mediaScale }} className="absolute -inset-8" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="auto" className="size-full object-cover">
          <source src="/images/hero/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/48" />
      </motion.div>
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative mx-auto flex h-full max-w-7xl items-center px-5 pt-32 pb-10 lg:px-8 lg:pt-34">
        <div className="max-w-xl text-white">
          <p className="text-[0.7rem] font-bold tracking-[0.19em] text-[#d4c5aa] uppercase">Viaza Stone</p>
          <h1 className="font-display mt-4 text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">Stone with a sense of place.</h1>
          <p className="mt-7 max-w-lg text-base leading-7 text-stone-100">Moroccan natural stone brings quiet depth, texture, and lasting character to refined interior spaces.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="button-primary">Contact / Request a Quote</Link>
            <Link href="/catalogue" className="button-secondary text-white">Explore collections</Link>
          </div>
        </div>
      </motion.div>
      <motion.div aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ delay: 0.8, duration: 0.6 }} className="absolute bottom-6 left-7 hidden items-center gap-3 text-[0.62rem] font-light tracking-[0.16em] text-white uppercase lg:flex">
        <span>Scroll to explore</span>
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>↓</motion.span>
      </motion.div>
    </section>
  )
}
