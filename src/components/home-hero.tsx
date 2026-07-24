'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'
import { useLocale } from '@/components/locale-provider'

function getHeroMessageIndex(currentTime: number) {
  if (currentTime < 9) return 0
  if (currentTime < 13) return 1
  return 2
}

export function HomeHero() {
  const { scrollY } = useScroll()
  const { t } = useLocale()
  const [messageIndex, setMessageIndex] = useState(0)
  const mediaScale = useTransform(scrollY, [0, 850], [1, 1.12])
  const contentY = useTransform(scrollY, [0, 700], [0, 92])
  const contentOpacity = useTransform(scrollY, [0, 560], [1, 0])

  const updateHeroMessage = (currentTime: number) => {
    const nextMessageIndex = getHeroMessageIndex(currentTime)
    setMessageIndex((currentIndex) => currentIndex === nextMessageIndex ? currentIndex : nextMessageIndex)
  }

  const heroMessages = [t('hero.message1'), t('hero.message2'), t('hero.message3')]

  return (
    <section className="relative isolate h-[97vh] min-h-160 overflow-hidden bg-stone-950">
      <motion.div style={{ scale: mediaScale }} className="absolute -inset-8" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedMetadata={(event) => updateHeroMessage(event.currentTarget.currentTime)}
          onTimeUpdate={(event) => updateHeroMessage(event.currentTarget.currentTime)}
          className="size-full object-cover"
        >
          <source src="/images/hero/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-linear-to-r from-black/30 via-transparent to-black/10" />
      </motion.div>
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative mx-auto flex h-full max-w-7xl items-center px-5 py-10 lg:px-8">
        <div className="w-full max-w-2xl text-white">
          <p className="text-[0.7rem] font-bold tracking-[0.19em] text-[#d4c5aa] uppercase">{t('hero.brand')}</p>
          <div className="mt-5" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.h1
                key={messageIndex}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.55, ease: 'easeOut' }}
                className="font-display max-w-2xl text-3xl leading-[1.12] tracking-[-0.018em] [text-shadow:0_6px_26px_rgba(0,0,0,0.55)] sm:text-4xl lg:text-[3.35rem]"
              >
                {heroMessages[messageIndex]}
              </motion.h1>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contact" className="button-primary">{t('hero.contact')}</Link>
            <Link href="/catalogue" className="button-secondary text-white">{t('hero.explore')}</Link>
          </div>
        </div>
      </motion.div>
      <motion.div aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ delay: 0.8, duration: 0.6 }} className="absolute bottom-6 left-7 hidden items-center gap-3 text-[0.62rem] font-light tracking-[0.16em] text-white uppercase lg:flex">
        <span>{t('hero.scroll')}</span>
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}>↓</motion.span>
      </motion.div>
    </section>
  )
}
