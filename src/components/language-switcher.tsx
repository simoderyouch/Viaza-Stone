'use client'

import { useEffect, useRef, useState } from 'react'
import { localeDetails, locales, type Locale } from '@/i18n/config'
import { useLocale } from '@/components/locale-provider'

const languageOptions: Locale[] = ['ar', 'fr', 'en']

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, t } = useLocale()
  const [isOpen, setIsOpen] = useState(false)
  const switcherRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!switcherRef.current?.contains(event.target as Node)) setIsOpen(false)
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    return () => document.removeEventListener('mousedown', closeOnOutsideClick)
  }, [])

  function changeLanguage(nextLocale: Locale) {
    if (nextLocale === locale) {
      setIsOpen(false)
      return
    }

    setIsOpen(false)
    const pathSegments = window.location.pathname.split('/').filter(Boolean)
    const pathWithoutLocale = locales.includes(pathSegments[0] as Locale) ? pathSegments.slice(1) : pathSegments
    const path = pathWithoutLocale.length > 0 ? `/${pathWithoutLocale.join('/')}` : ''
    window.location.assign(`/${nextLocale}${path}${window.location.search}${window.location.hash}`)
  }

  return (
    <div ref={switcherRef} dir="ltr" data-no-translate className={`relative ${compact ? '' : 'inline-flex'}`}>
      <button
        type="button"
        aria-label={t('language.label')}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={`inline-flex items-center gap-1.5 border border-white/35 px-2.5 py-2 text-[0.64rem] font-bold tracking-[0.12em] text-white uppercase transition hover:border-[#d4c5aa] hover:text-[#d4c5aa] ${compact ? 'min-w-20 justify-between' : ''}`}
      >
        <GlobeIcon />
        {locale.toUpperCase()}
      </button>
      {isOpen && (
        <div role="menu" className="absolute right-0 top-full z-30 mt-2 flex min-w-31 gap-1 border border-stone-200 bg-[#faf9f6] p-1.5 text-[#292b2c] shadow-xl shadow-black/15">
          {languageOptions.map((availableLocale) => (
            <button
              key={availableLocale}
              type="button"
              role="menuitem"
              title={localeDetails[availableLocale].nativeLabel}
              aria-label={localeDetails[availableLocale].label}
              onClick={() => changeLanguage(availableLocale)}
              className={`grid size-9 place-items-center text-[0.63rem] font-bold tracking-[0.08em] transition ${locale === availableLocale ? 'bg-[#282828] text-white' : 'hover:bg-stone-200'}`}
            >
              {availableLocale.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function GlobeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1.9 8h12.2M8 1.75c1.65 1.72 2.48 3.8 2.48 6.25S9.65 12.53 8 14.25C6.35 12.53 5.52 10.45 5.52 8S6.35 3.47 8 1.75Z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}
