import type { Metadata } from 'next'
import { Footer } from '@/components/footer'
import { ContentLocalizer } from '@/components/content-localizer'
import { FloatingWhatsApp } from '@/components/floating-whatsapp'
import { LocaleProvider } from '@/components/locale-provider'
import { SiteHeader } from '@/components/site-header'
import { localeDetails } from '@/i18n/config'
import { getRequestLocale } from '@/i18n/server'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Viaza Stone | Moroccan Limestone & Marble',
    template: '%s | Viaza Stone',
  },
  description:
    'Explore Moroccan limestone, travertine, and marble surfaces presented by Viaza Stone for architectural and interior projects.',
  icons: {
    icon: '/images/brand/viaza-stone-logo.png',
  },
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getRequestLocale()

  return (
    <html lang={locale} dir={localeDetails[locale].direction} suppressHydrationWarning>
      <body>
        <LocaleProvider locale={locale}>
          <SiteHeader />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <ContentLocalizer />
        </LocaleProvider>
      </body>
    </html>
  )
}
