import type { Metadata } from 'next'
import { Footer } from '@/components/footer'
import { SiteHeader } from '@/components/site-header'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Viaza Stone | Moroccan Limestone & Marble',
    template: '%s | Viaza Stone',
  },
  description:
    'Discover curated natural stone, premium quartz, and porcelain surfaces from Viaza Stone.',
  icons: {
    icon: '/images/brand/viaza-stone-logo.png',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
