'use client'

import { useEffect } from 'react'
import { useLocale } from '@/components/locale-provider'

type TranslationTarget = {
  text: string
  apply: (translation: string) => void
}

const ignoredSelector = '[data-no-translate], script, style, code, pre, svg'

function shouldTranslate(text: string) {
  const value = text.trim()
  return value.length > 1 && /[A-Za-z]{2}/.test(value) && !/^https?:\/\//.test(value) && !/^\S+@\S+\.\S+$/.test(value)
}

function collectTargets() {
  const targets: TranslationTarget[] = []
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  let node = walker.nextNode()

  while (node) {
    const textNode = node as Text
    const parent = textNode.parentElement
    const original = textNode.data.trim()
    if (parent && !parent.closest(ignoredSelector) && shouldTranslate(original)) {
      targets.push({
        text: original,
        apply: (translation) => {
          if (textNode.data.trim() === original) textNode.data = textNode.data.replace(original, translation)
        },
      })
    }
    node = walker.nextNode()
  }

  document.querySelectorAll<HTMLElement>('[placeholder], [aria-label], [title], img[alt]').forEach((element) => {
    if (element.closest(ignoredSelector)) return
    for (const attribute of ['placeholder', 'aria-label', 'title', 'alt']) {
      const original = element.getAttribute(attribute)?.trim()
      if (!original || !shouldTranslate(original)) continue
      targets.push({
        text: original,
        apply: (translation) => {
          if (element.getAttribute(attribute)?.trim() === original) element.setAttribute(attribute, translation)
        },
      })
    }
  })

  return targets
}

export function ContentLocalizer() {
  const { locale } = useLocale()

  useEffect(() => {
    if (locale === 'en') return
    let cancelled = false
    let timeout: ReturnType<typeof setTimeout> | undefined
    let translating = false

    async function localizePage() {
      if (translating) return
      translating = true
      const targets = collectTargets()
      const grouped = new Map<string, TranslationTarget[]>()
      targets.forEach((target) => grouped.set(target.text, [...(grouped.get(target.text) ?? []), target]))
      const entries = [...grouped.entries()]

      for (let index = 0; index < entries.length && !cancelled; index += 30) {
        const batch = entries.slice(index, index + 30)
        try {
          const response = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ locale, texts: batch.map(([text]) => text) }),
          })
          if (!response.ok) continue
          const data = await response.json() as { translations: string[] }
          batch.forEach(([, batchTargets], batchIndex) => {
            const translation = data.translations[batchIndex]
            if (translation && translation !== batch[batchIndex][0]) batchTargets.forEach((target) => target.apply(translation))
          })
        } catch {
          // Keep the server-rendered copy if the fallback service is unavailable.
        }
      }
      translating = false
    }

    const frame = window.requestAnimationFrame(() => void localizePage())
    const observer = new MutationObserver(() => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => void localizePage(), 220)
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelled = true
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      if (timeout) clearTimeout(timeout)
    }
  }, [locale])

  return null
}
