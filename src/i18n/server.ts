import { headers } from 'next/headers'
import { isLocale, type Locale } from '@/i18n/config'

export async function getRequestLocale(): Promise<Locale> {
  const locale = (await headers()).get('x-viaza-locale') ?? undefined
  if (isLocale(locale)) return locale
  return 'en'
}
