import Image from 'next/image'
import Link from 'next/link'
import { footerCollectionLinks, footerCompanyLinks } from '@/data/collections'

export function Footer() {
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
            Material-led stone sourcing for distinctive architectural projects.
          </p>
        </div>
        <FooterColumn title="Explore" links={footerCollectionLinks} />
        <FooterColumn title="Viaza Stone" links={footerCompanyLinks} />
        <div>
          <h2 className="text-[0.68rem] font-bold tracking-[0.18em] text-white uppercase">Connect</h2>
          <p className="mt-4 text-sm leading-6 text-stone-300">Share a brief, material request, or project question with the Viaza Stone team.</p>
          <a href="mailto:hello@viazastone.com" className="mt-3 block text-sm text-stone-300 hover:text-white">
            hello@viazastone.com
          </a>
          <Link href="/contact" className="button-secondary mt-6 border-stone-500 text-white hover:border-white">
            Get in touch
          </Link>
        </div>
      </div>
      <div className="border-t border-stone-700 px-5 py-5 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} Viaza Stone. All rights reserved.
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
