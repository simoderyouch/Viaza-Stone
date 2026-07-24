'use client'

import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'
import { localeDetails, type Locale } from '@/i18n/config'
import { messages, type MessageKey } from '@/i18n/messages'

type LocaleContextValue = {
  locale: Locale
  t: (key: MessageKey) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = localeDetails[locale].direction
  }, [locale])

  const value = useMemo(() => ({
    locale,
    t: (key: MessageKey) => messages[locale][key],
  }), [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useLocale must be used within LocaleProvider')
  return value
}
