'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { type FormEvent, useEffect, useState } from 'react'
import {
  primaryNavigation as primaryLinks,
  utilityNavigation,
} from '@/data/collections'

const floatingLinks = [
  ...primaryLinks,
  ...utilityNavigation,
]

export function SiteHeader() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 96)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    if (!mobileOpen && !searchOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        setSearchOpen(false)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [mobileOpen, searchOpen])

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const query = searchQuery.trim()
    router.push(query ? `/catalogue?q=${encodeURIComponent(query)}` : '/catalogue')
    setSearchOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 text-white">
      <nav
        aria-label="Primary navigation"
        className={`hidden bg-[#282828]/[.65] backdrop-blur-[0.08px] transition-all duration-300 lg:block ${isScrolled ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}
      >
        <div className="mx-auto max-w-7xl ">
          <div className="grid h-[96px] grid-cols-[1fr_auto_1fr] items-center px-8">
            <div className="flex items-center justify-center gap-7 text-[15px] font-light leading-[20px]">
              {primaryLinks.slice(0, 2).map((link) => <NavLink key={link.label} href={link.href}>{link.label}</NavLink>)}
            </div>
            <Link href="/" aria-label="Viaza Stone home" className="justify-self-center">
              <Image src="/images/brand/viaza-stone-logo-white.png" alt="Viaza Stone" width={1992} height={521} priority className="h-auto w-[250px]" />
            </Link>
            <div className="flex items-center justify-center gap-7 text-[15px] font-light leading-[20px]">
              {floatingLinks.slice(2).map((link) => <NavLink key={link.label} href={link.href}>{link.label}</NavLink>)}
              <button type="button" aria-label="Search the collection" onClick={() => setSearchOpen(true)} className="transition hover:text-[#d4c5aa]">
                <SearchIcon />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <nav
        aria-label="Compact navigation"
        className={`absolute inset-x-0 top-0 hidden h-[96px] bg-[#282828]/[.52] backdrop-blur-[0.08px] transition-transform duration-300 lg:block ${isScrolled ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center gap-10 px-8">
          <Link href="/" aria-label="Viaza Stone home" className="shrink-0">
            <Image src="/images/brand/viaza-stone-logo-white.png" alt="Viaza Stone" width={1992} height={521} className="h-auto w-54" />
          </Link>
          <ul className="flex flex-1 items-center justify-end gap-9 text-[17px] font-light">
            {floatingLinks.map((link) => (
              <li key={link.label}><NavLink href={link.href}>{link.label}</NavLink></li>
            ))}
            <li><button type="button" aria-label="Search the collection" onClick={() => setSearchOpen(true)} className="transition hover:text-[#d4c5aa]"><SearchIcon /></button></li>
          </ul>
        </div>
      </nav>

      <nav aria-label="Mobile navigation" className={`border-b border-white/15 transition-colors lg:hidden ${isScrolled || mobileOpen ? 'bg-[#282828]' : 'bg-black/40'}`}>
        <div className="flex h-20 items-center justify-between px-5">
          <Link href="/" aria-label="Viaza Stone home">
            <Image src="/images/brand/viaza-stone-logo-white.png" alt="Viaza Stone" width={1992} height={521} priority className="h-auto w-44" />
          </Link>
          <button
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="grid size-10 place-items-center border border-white/60"
          >
            <span className="sr-only">Menu</span>
            <span className="grid gap-1.5">
              <span className={`h-px w-5 bg-white transition ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`h-px w-5 bg-white transition ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`h-px w-5 bg-white transition ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 top-20 -z-10 bg-black/55 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="absolute inset-x-3 top-22 overflow-hidden rounded-sm border border-white/20 bg-[#1a1a1a] shadow-2xl shadow-black/50 lg:hidden"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="border-b border-white/15 bg-linear-to-r from-white/8 to-transparent px-6 py-5">
                <p className="text-[0.62rem] font-light tracking-[0.2em] text-[#d4c5aa] uppercase">Viaza Stone</p>
                <p className="mt-2 font-display text-2xl text-white">Natural stone for distinctive projects.</p>
              </div>
              <motion.ul
                className="px-6 py-3"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } }, hidden: {} }}
              >
                {floatingLinks.map((link) => (
                  <motion.li
                    key={link.label}
                    variants={{ hidden: { opacity: 0, x: -14 }, visible: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-white/10 last:border-0"
                  >
                    <Link href={link.href} onClick={() => setMobileOpen(false)} className="flex items-center justify-between py-4 text-[0.8rem] font-light tracking-[0.14em] text-white uppercase transition hover:pl-1 hover:text-[#d4c5aa]">
                      {link.label}<span aria-hidden="true" className="text-lg font-light">→</span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="border-t border-white/15 bg-white/5 p-6">
                <p className="text-sm leading-6 text-stone-300">Have plans, drawings, or a material direction? Start an enquiry with our team.</p>
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="button-primary mt-5 w-full">Contact / Request a Quote</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="catalogue-search-title"
            className="fixed inset-0 z-[70] grid place-items-start bg-[#171717]/85 px-5 pt-28 backdrop-blur-sm sm:place-items-center sm:pt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-2xl border border-white/20 bg-[#282828] p-6 text-white shadow-2xl sm:p-9"
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.985 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-[0.63rem] font-light tracking-[0.2em] text-[#d4c5aa] uppercase">Material search</p>
                  <h2 id="catalogue-search-title" className="font-display mt-2 text-3xl sm:text-4xl">Find a surface</h2>
                </div>
                <button type="button" onClick={() => setSearchOpen(false)} className="grid size-10 shrink-0 place-items-center border border-white/40 text-xl transition hover:border-white" aria-label="Close search">×</button>
              </div>
              <form onSubmit={submitSearch} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <label className="sr-only" htmlFor="catalogue-search">Search the catalogue</label>
                <input
                  id="catalogue-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search a stone, colour, or material"
                  autoFocus
                  className="min-w-0 flex-1 border border-white/35 bg-white px-4 py-3 text-sm text-[#292b2c] placeholder:text-stone-500"
                />
                <button type="submit" className="button-primary bg-[#a0937b] hover:bg-[#8b806d]">Search catalogue</button>
              </form>
              <p className="mt-5 text-sm leading-6 text-stone-300">Try “marble”, “travertine”, “white”, or a material name from the collection.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="transition hover:text-[#d4c5aa]">{children}</Link>
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M15.55 7.78A7.78 7.78 0 1 1 7.78 0a7.78 7.78 0 0 1 7.77 7.78Zm-1.56 0a6.22 6.22 0 1 0-12.44 0 6.22 6.22 0 0 0 12.44 0Zm-1.3 6.02L18.88 20 20 18.88l-6.2-6.2-1.1 1.12Z" fill="currentColor" />
    </svg>
  )
}
