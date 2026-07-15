import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ParallaxFrame, ScrollReveal } from '@/components/motion-effects'
import { SectionHeading } from '@/components/section-heading'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Viaza Stone curates, processes, and distributes exceptional Moroccan natural stone for architecture and design.',
}

const values = [
  { title: 'Curated at source', text: 'By collaborating with leading Moroccan quarries, we select high-grade natural stone for international construction, architecture, and interior design projects.' },
  { title: 'Crafted for architecture', text: 'We connect authentic Moroccan craftsmanship with contemporary architectural standards, from material selection through finish and format.' },
  { title: 'Project partnership', text: 'We work alongside architects, designers, contractors, developers, and stone professionals with a professional, client-focused approach.' },
]

const process = [
  { number: '01', title: 'Understand the project', text: 'Review the application, design direction, quantities, location, and timing requirements.' },
  { number: '02', title: 'Select the stone', text: 'Match suitable Moroccan stone, tones, finishes, formats, and technical performance to the architectural brief.' },
  { number: '03', title: 'Prepare the solution', text: 'Support the next steps for flooring, cladding, facades, terraces, pool surroundings, landscaping, or bespoke stonework.' },
]

const audiences = ['Architects & interior designers', 'Importers & distributors', 'Hospitality & residential developers', 'Contractors & fabricators']

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-stone-900 px-5 pb-16 pt-42 lg:px-8 lg:pb-20 lg:pt-48">
        <Image src="/images/showcase/05-saratoga-inspiration.jpg" alt="Interior designed with natural stone" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#0f0f0f]/80" />
        <div className="relative mx-auto max-w-7xl text-white">
          <p className="text-[0.7rem] font-bold tracking-[0.19em] text-[#d4c5aa] uppercase">About Viaza Stone</p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-tight sm:text-6xl">Moroccan natural stone, selected for exceptional architecture.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-100">Viaza Stone curates, processes, and distributes Morocco&apos;s finest natural stone for architectural, construction, and interior design projects.</p>
        </div>
      </section>

      <section className="px-5 py-18 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <ScrollReveal><SectionHeading eyebrow="Our approach" title="Authentic Moroccan craftsmanship, aligned with modern architecture." /></ScrollReveal>
          <ScrollReveal delay={0.08} className="max-w-2xl space-y-5 text-base leading-8 text-stone-700">
            <p>
              By collaborating with leading Moroccan quarries, we carefully source high-grade stone selected to meet the requirements of international construction, architecture, and interior design projects.
            </p>
            <p>
              We create a reliable bridge between Morocco&apos;s stone-working heritage and contemporary architectural standards. Our expertise spans elegant flooring, refined wall cladding, exterior facades, terraces, pool surroundings, landscaping, and bespoke large-scale stonework.
            </p>
            <p>
              Our team supports each project through the selection of suitable materials, finishes, formats, and natural stone solutions. Exceptional spaces begin with exceptional materials.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#e8e6df] px-5 py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal><SectionHeading eyebrow="What guides us" title="Noble material for noble client." centered /></ScrollReveal>
          <div className="mt-11 grid gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1} hover className="h-full"><article className="h-full border-t-2 border-[#282828] bg-[#f7f5f0] p-7">
                <span className="font-display text-3xl text-[#282828]">0{index + 1}</span>
                <h3 className="mt-6 text-xl font-bold">{value.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{value.text}</p>
              </article></ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-18 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <ParallaxFrame className="min-h-[25rem] sm:min-h-[34rem]" distance={60}>
            <Image src="/images/applications/18_page_28_feature_wall_bathtub.webp" alt="Natural stone used in a bathroom interior" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </ParallaxFrame>
          <ScrollReveal>
            <SectionHeading eyebrow="Who we support" title="Built around the people who turn materials into places." description="Viaza Stone supports architects, designers, contractors, developers, and stone professionals with authentic Moroccan materials selected for demanding projects." />
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {audiences.map((audience) => <li key={audience} className="border-t border-stone-300 py-3 text-sm font-semibold text-[#292b2c]">{audience}</li>)}
            </ul>
            <Link href="/contact" className="button-primary mt-8">Discuss a project</Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-[#282828] px-5 py-18 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal><SectionHeading eyebrow="How we work" title="A clear path from Moroccan stone to architectural application" description="Every project is different, but a considered sequence keeps material, finish, format, and technical decisions aligned from the beginning." centered inverse /></ScrollReveal>
          <ol className="mt-11 grid gap-6 md:grid-cols-3">
            {process.map((step, index) => (
              <ScrollReveal key={step.number} as="li" delay={index * 0.1} className="border-t border-white/50 pt-5">
                <span className="font-display text-3xl text-[#d4c5aa]">{step.number}</span>
                <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-300">{step.text}</p>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-5 py-18 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[5/4] overflow-hidden">
            <Image src="/images/applications/13_page_26_exterior_facade_modern.webp" alt="Viaza Stone architectural wall application" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <ScrollReveal><SectionHeading eyebrow="The Viaza experience" title="Natural materials for enduring spaces." /></ScrollReveal>
            <p className="mt-6 max-w-xl leading-7 text-stone-600">
              From the selection of the ideal material to its successful implementation, Viaza Stone provides expert guidance and personalised support at every stage of your project.
            </p>
            <Link href="/catalogue" className="button-primary mt-7">Explore the catalogue</Link>
          </div>
        </div>
      </section>
    </>
  )
}
