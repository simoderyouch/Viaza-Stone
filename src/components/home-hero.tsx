'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
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
  const reduceMotion = useReducedMotion()
  const [messageIndex, setMessageIndex] = useState(0)
  const mediaScale = useTransform(scrollY, [0, 850], [1, 1.12])
  const contentY = useTransform(scrollY, [0, 700], [0, 92])
  const contentOpacity = useTransform(scrollY, [0, 560], [1, 0])

  const updateHeroMessage = (currentTime: number) => {
    const nextMessageIndex = getHeroMessageIndex(currentTime)
    setMessageIndex((currentIndex) => currentIndex === nextMessageIndex ? currentIndex : nextMessageIndex)
  }

  const heroMessages = [t('hero.message1'), t('hero.message2'), t('hero.message3')]
  const contentVariants = {
    hidden: {},
    visible: { transition: { delayChildren: 0.12, staggerChildren: 0.14 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
  }

  return (
    <section className="relative isolate min-h-[100dvh] overflow-hidden bg-stone-950">
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
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative mx-auto flex min-h-[100dvh] max-w-7xl items-center px-5 pb-16 pt-28 lg:px-8 lg:pb-20 lg:pt-32">
        <motion.div
          className="w-full max-w-4xl text-white"
          variants={contentVariants}
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? undefined : 'visible'}
        >
          <motion.p variants={itemVariants} className="border-l border-[#d4c5aa] pl-4 text-[0.7rem] font-bold tracking-[0.22em] text-[#d4c5aa] uppercase">{t('hero.brand')}</motion.p>
          <motion.div variants={itemVariants} className="mt-7" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.h1
                key={messageIndex}
                initial={reduceMotion || messageIndex === 0 ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-display max-w-4xl text-4xl leading-[1.02] tracking-[-0.035em] [text-shadow:0_8px_30px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-[clamp(3.65rem,5.25vw,5.9rem)]"
              >
                {heroMessages[messageIndex]}
              </motion.h1>
            </AnimatePresence>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-9 flex flex-wrap gap-3">
            <Link href="/contact" className="button-primary">{t('hero.contact')}</Link>
            <Link href="/catalogue" className="button-secondary text-white">{t('hero.explore')}</Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
