export const locales = ['en', 'fr', 'ar'] as const

export type Locale = (typeof locales)[number]

export const localeDetails: Record<Locale, { label: string; nativeLabel: string; direction: 'ltr' | 'rtl' }> = {
  en: { label: 'English', nativeLabel: 'English', direction: 'ltr' },
  fr: { label: 'French', nativeLabel: 'Français', direction: 'ltr' },
  ar: { label: 'Arabic', nativeLabel: 'العربية', direction: 'rtl' },
}

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale))
}
