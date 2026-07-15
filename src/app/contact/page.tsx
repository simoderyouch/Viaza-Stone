import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact & Request a Quote',
  description: 'Contact Viaza Stone or request a quote for your next natural stone project.',
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ material?: string; sample?: string; enquiry?: string }>
}) {
  const { material, sample, enquiry } = await searchParams

  return (
    <>
      <section className="relative isolate overflow-hidden bg-stone-900 px-5 pb-16 pt-42 lg:px-8 lg:pb-20 lg:pt-48">
        <video autoPlay muted loop playsInline preload="metadata" poster="/images/hero/viaza-bathroom-hero.jpg" className="absolute inset-0 size-full object-cover" aria-hidden="true">
          <source src="/images/hero/viaza-bathroom-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/62" />
        <div className="relative mx-auto max-w-7xl text-white">
          <p className="text-[0.7rem] font-bold tracking-[0.19em] text-[#d4c5aa] uppercase">Contact & request a quote</p>
          <h1 className="font-display mt-4 text-5xl sm:text-6xl">Start with the project brief.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-100">Tell us the material, finish, format, quantity, destination, and intended application. We will help shape the right next step.</p>
        </div>
      </section>

      <section className="px-5 py-18 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="eyebrow">Contact or quote request</p>
            <h2 className="font-display mt-3 text-4xl sm:text-5xl">Let&apos;s make the next step useful.</h2>
            <div className="mt-8 max-w-2xl"><ContactForm material={material} sample={sample} initialEnquiryType={enquiry} /></div>
          </div>
          <aside className="h-fit bg-[#e8e6df] p-7 lg:mt-10" aria-label="Other ways to connect">
            <h2 className="font-display text-3xl">What helps us help you</h2>
            <div className="mt-7 space-y-7">
              <div className="border-b border-stone-300 pb-6">
                <h3 className="font-semibold">Material, finish & format</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">Share a catalogue reference or visual direction, alongside the intended format, finish, and application.</p>
                <Link href="/catalogue" className="mt-3 inline-block text-[0.68rem] font-bold tracking-[0.14em] text-[#282828] uppercase">View catalogue →</Link>
              </div>
              <div className="border-b border-stone-300 pb-6">
                <h3 className="font-semibold">Scale & destination</h3>
                <p className="mt-2 text-sm text-stone-600">For a quote, include quantities, drawing references, project timing, and the final delivery location.</p>
              </div>
              <div className="border-b border-stone-300 pb-6">
                <h3 className="font-semibold">Email the brief</h3>
                <p className="mt-2 text-sm text-stone-600">Prefer to write directly or attach drawings and references?</p>
                <a href="mailto:hello@viazastone.com" className="mt-3 inline-block text-base text-[#282828]">hello@viazastone.com</a>
              </div>
              <div>
                <h3 className="font-semibold">Plan your project</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">Viaza Stone supports different types of project enquiries, from early material research to detailed export specifications.</p>
                <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-[#282828]">
                  <li>Architects</li>
                  <li>Design studios</li>
                  <li>Importers</li>
                  <li>Distributors</li>
                  <li>Developers</li>
                  <li>Contractors</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
