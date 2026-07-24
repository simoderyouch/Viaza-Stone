import { NextResponse } from 'next/server'
import { isLocale } from '@/i18n/config'
import { materialCollections } from '@/data/collections'
import { products } from '@/data/products'

const translationCache = new Map<string, string>()
const protectedNames = [
  'Viaza Stone',
  ...materialCollections.map((collection) => collection.name),
  ...products.map((product) => product.name),
].sort((first, second) => second.length - first.length)

function protectNames(text: string) {
  const replacements: Array<{ token: string; value: string }> = []
  let protectedText = text

  protectedNames.forEach((name, index) => {
    if (!protectedText.includes(name)) return
    const token = `ZXQPN${index}QXZ`
    protectedText = protectedText.split(name).join(token)
    replacements.push({ token, value: name })
  })

  return { protectedText, replacements }
}

async function translateText(text: string, locale: 'fr' | 'ar') {
  const cacheKey = `${locale}:${text}`
  const cached = translationCache.get(cacheKey)
  if (cached) return cached

  const url = new URL('https://translate.googleapis.com/translate_a/single')
  url.searchParams.set('client', 'gtx')
  url.searchParams.set('sl', 'auto')
  url.searchParams.set('tl', locale)
  url.searchParams.set('dt', 't')
  const { protectedText, replacements } = protectNames(text)
  url.searchParams.set('q', protectedText)

  const response = await fetch(url, { next: { revalidate: 60 * 60 * 24 * 30 } })
  if (!response.ok) return text

  const payload = await response.json() as [Array<[string]>]
  let translated = payload[0]?.map((segment) => segment[0]).join('') || text
  replacements.forEach(({ token, value }) => {
    translated = translated.split(token).join(value)
  })
  translationCache.set(cacheKey, translated)
  return translated
}

export async function POST(request: Request) {
  const body = await request.json() as { locale?: string; texts?: unknown }
  if (!isLocale(body.locale) || body.locale === 'en' || !Array.isArray(body.texts)) {
    return NextResponse.json({ translations: [] }, { status: 400 })
  }

  const texts = body.texts
    .filter((text): text is string => typeof text === 'string')
    .map((text) => text.trim())
    .filter(Boolean)
    .slice(0, 30)

  const translations = await Promise.all(texts.map((text) => translateText(text, body.locale as 'fr' | 'ar')))
  return NextResponse.json({ translations })
}
