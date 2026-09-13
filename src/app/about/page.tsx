import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ParallaxFrame, ScrollReveal } from '@/components/motion-effects'
import { SectionHeading } from '@/components/section-heading'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Viaza Stone curates, processes, and distributes exceptional Moroccan natural stone for architecture and design.',
}

const quarryPrinciples = [
  {
    title: 'Precision in extraction',
    text: 'State-of-the-art equipment and carefully controlled cutting methods help preserve the stone’s natural qualities, optimise resources, and minimise material waste.',
  },
  {
    title: 'Safety without compromise',
    text: 'Regular staff training, personal protective equipment, machinery inspections, and rigorous risk assessments guide every stage from extraction to block loading.',
  },
  {
    title: 'Respect for the land',
    text: 'We reduce dust emissions, optimise water and energy use, recover stone residues, and plan for responsible site management and progressive land rehabilitation.',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-stone-900 px-5 pb-16 pt-42 lg:px-8 lg:pb-20 lg:pt-48">
        <Image src="/images/hero/about-viaza-stone.jpg" alt="Viaza Stone natural stone installation" fill priority sizes="100vw" className="object-cover object-top" />
        <div className="absolute inset-0 bg-[#0f0f0f]/80" />
        <div className="relative mx-auto max-w-7xl text-white">
          <p className="text-[0.7rem] font-bold tracking-[0.19em] text-[#d4c5aa] uppercase">About Viaza Stone</p>
          <h1 className="font-display mt-4 max-w-4xl text-5xl leading-tight sm:text-6xl">Moroccan Natural Stone, The ideal choice for your exceptional projects</h1>
        </div>
      </section>

      <section className="px-5 py-18 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <ScrollReveal className="max-w-2xl lg:order-2">
            <SectionHeading eyebrow="How it started" title="A story rooted in the mountains of Taza." />
            <div className="mt-7 space-y-5 text-base leading-8 text-stone-700">
              <p>Our story began in the mountains of Taza, where Moussa grew up surrounded by the remarkable landscapes that would later inspire his life&apos;s goal.</p>
              <p>On his way to school, he watched immense blocks of stone leave the surrounding quarries on heavy trucks. These renowned Taza quarries hold a noble natural material shaped over millions of years within one of the region&apos;s most impressive rock formations.</p>
              <p>That early connection grew into a profound passion for natural stone, its distinctive character, and its timeless beauty.</p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.08} className="lg:order-1">
            <ParallaxFrame className="min-h-[20rem] sm:min-h-[28rem]" distance={36}>
              <Image src="/images/about-taza-quarry.jpeg" alt="Aerial view of the Taza stone quarry" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" />
            </ParallaxFrame>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#292b2c] px-5 py-18 text-white lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <ScrollReveal>
            <p className="text-[0.7rem] font-bold tracking-[0.22em] text-[#d4c5aa] uppercase">The foundation</p>
            <blockquote className="font-display mt-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">“Noble material for noble client”</blockquote>
            <div className="mx-auto mt-9 max-w-3xl space-y-5 text-base leading-8 text-stone-300">
              <p>Driven by his passion, Moussa founded UNIVMAR, a Moroccan company specialising in the quarrying, processing, and distribution of marble and natural stone.</p>
              <p>Its sustained growth is built on accumulated expertise, technical know-how, and an unwavering commitment to quality—qualities that have made the company a distinctive and trusted name in the industry.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#e5e1d7] px-5 py-18 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <ScrollReveal>
            <p className="text-[0.7rem] font-bold tracking-[0.19em] text-stone-600 uppercase">The story of Viaza</p>
            <Image src="/images/brand/viaza-stone-logo.png" alt="Viaza Stone" width={500} height={152} className="mt-7 h-auto w-full max-w-xl lg:max-w-2xl" />
            <p className="mt-6 max-w-sm text-sm leading-7 text-stone-700">A path, a journey, a connection—joined to the final letters of Taza.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1} className="max-w-2xl">
            <SectionHeading title="A bridge from stone&apos;s origins to its finest expression." />
            <div className="mt-7 space-y-5 text-base leading-8 text-stone-700">
              <p>VIAZA was born from the meeting of history, natural stone, and Moroccan identity. It draws inspiration from ancient civilisations—particularly the Greeks, who elevated marble into an art form—and from Taza, a land renowned for its rich deposits and exceptional varieties of natural stone.</p>
              <p>The name celebrates the journey of stone, from its natural origins to its finest architectural expression.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-5 py-18 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal><SectionHeading eyebrow="Viaza quarry" title="A responsibility as enduring as the stone." description="In the heart of the Taza mountains, our quarry brings Morocco’s natural heritage together with advanced extraction technologies and disciplined site management." centered /></ScrollReveal>
          <div className="mt-12 grid gap-px bg-stone-300 md:grid-cols-3">
            {quarryPrinciples.map((principle, index) => (
              <ScrollReveal key={principle.title} delay={index * 0.1} className="h-full">
                <article className="h-full bg-white p-7 lg:p-9">
                  <span className="font-display text-3xl text-[#9f8660]">0{index + 1}</span>
                  <h3 className="mt-8 text-xl font-semibold text-[#292b2c]">{principle.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-stone-600">{principle.text}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#292b2c] px-5 py-18 text-white lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <ScrollReveal>
            <div className="relative aspect-[1.3/1] overflow-hidden">
              <Image src="/images/about-cut-stone-blocks.png" alt="Freshly cut natural stone blocks at the quarry" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading eyebrow="Our long-term vision" title="Protect our people. Preserve our land." description="At VIAZA, extracting a noble natural stone comes with an equally important responsibility: to respect the generations to come." inverse />
            <Link href="/contact" className="button-secondary mt-8 text-white">Discuss a project</Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
