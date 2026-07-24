'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from '@/components/locale-provider'
import { footerCollectionLinks, footerCompanyLinks } from '@/data/collections'

export function Footer() {
  const { t } = useLocale()

  return (
    <footer className="bg-[#282828] text-stone-200">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr] lg:px-8">
        <div>
          <Image
            src="/images/brand/viaza-stone-logo-white.png"
            alt="Viaza Stone"
            width={1992}
            height={521}
            className="h-auto w-58"
          />
          <p className="mt-5 max-w-xs text-sm leading-6 text-stone-300">
            {t('footer.description')}
          </p>
        </div>
        <FooterColumn title={t('footer.explore')} links={footerCollectionLinks} />
        <FooterColumn title={t('footer.company')} links={footerCompanyLinks} />
        <div>
          <h2 className="text-[0.68rem] font-bold tracking-[0.18em] text-white uppercase">{t('footer.connect')}</h2>
          <p className="mt-4 text-sm leading-6 text-stone-300">{t('footer.connectCopy')}</p>
          <a href="mailto:hello@viazastone.com" className="mt-3 block text-sm text-stone-300 hover:text-white">
            hello@viazastone.com
          </a>
          <Link href="/contact" className="button-secondary mt-6 border-stone-500 text-white hover:border-white">
            {t('footer.getInTouch')}
          </Link>
        </div>
      </div>
      <div className="border-t border-stone-700 px-5 py-5 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} Viaza Stone. {t('footer.rights')}
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="text-[0.68rem] font-bold tracking-[0.18em] text-white uppercase">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-stone-300 transition hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
