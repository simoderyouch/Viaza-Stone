'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  distance?: number
  as?: 'div' | 'li'
  hover?: boolean
}

export function ScrollReveal({ children, className, delay = 0, distance = 38, as = 'div', hover = false }: RevealProps) {
  const animation = {
    initial: { opacity: 0, y: distance, scale: 0.985 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }

  if (as === 'li') {
    return <motion.li className={className} whileHover={hover ? { y: -7, transition: { duration: 0.22 } } : undefined} {...animation}>{children}</motion.li>
  }

  return (
    <motion.div className={className} whileHover={hover ? { y: -7, transition: { duration: 0.22 } } : undefined} {...animation}>{children}</motion.div>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 28, restDelta: 0.001 })

  return <motion.div aria-hidden="true" className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[#d4c5aa]" style={{ scaleX }} />
}

export function ParallaxFrame({ children, className, distance = 52 }: { children: ReactNode; className: string; distance?: number }) {
  const frame = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance])

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute -inset-y-16 inset-x-0" style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}
