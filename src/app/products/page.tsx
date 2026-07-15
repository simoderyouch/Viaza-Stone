import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MaterialCard } from '@/components/material-card'
import { ScrollReveal } from '@/components/motion-effects'
import { ProductCard } from '@/components/product-card'
import { SectionHeading } from '@/components/section-heading'
import { materialCollections } from '@/data/collections'
import { products } from '@/data/products'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Explore Viaza Stone: Moroccan limestone sourced from Taza and a premium collection of Moroccan marbles for architecture.',
}

const applicationGroups = [
  { title: 'Interior surfaces', items: ['Flooring', 'Wall cladding', 'Stairs & architectural details'], image: '/images/applications/04_page_19_staircase_dark_stone.webp' },
  { title: 'Architectural details', items: ['Feature walls', 'Reception & retail', 'Custom stonework'], image: '/images/applications/20_page_29_cinema_exterior_wall.webp' },
  { title: 'Exterior stonework', items: ['Facades & cladding', 'Paving & landscape', 'Pool surrounds'], image: '/images/applications/11_page_24_crazy_paving_poolside.webp' },
]

const specificationSteps = [
  { number: '01', title: 'Choose the material family', text: 'Start with the feeling, application, and performance requirements of the project.' },
  { number: '02', title: 'Select finish and format', text: 'Align the surface treatment and dimensions with drawings and use conditions.' },
  { number: '03', title: 'Review the project brief', text: 'Share quantities, destination, timing, and details for a tailored material response.' },
]

export default function ProductsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-stone-900 px-5 pb-16 pt-42 lg:px-8 lg:pb-20 lg:pt-48">
        <Image src="/images/showcase/V1-2-2.jpg" alt="Detailed engineered surface" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto max-w-7xl text-white">
          <p className="text-[0.7rem] font-bold tracking-[0.19em] text-[#d4c5aa] uppercase">Born in Taza. Crafted for architecture.</p>
          <h1 className="font-display mt-4 max-w-2xl text-5xl leading-tight sm:text-6xl">Moroccan natural stone with lasting architectural character.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-stone-100">
            The Viaza collection brings together Moroccan natural limestone from Taza and premium Moroccan marbles, each selected for distinctive material character and architectural versatility.
          </p>
        </div>
      </section>

      <section className="px-5 py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal><SectionHeading eyebrow="Find your material" title="Start with the character of the stone" description="Every material carries a different scale, texture, and visual rhythm. Use the collection as a starting point, then build the exact finish and format around the project." centered /></ScrollReveal>
          <div className="mt-11 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {materialCollections.map((material) => (
              <ScrollReveal key={material.name} hover className="h-full"><MaterialCard
                key={material.name}
                {...material}
              /></ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e8e6df] px-5 py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal><SectionHeading eyebrow="Project uses" title="Made to work across the whole project" description="From intimate interiors to durable exterior details, the material direction changes with the space, climate, and intended use." centered /></ScrollReveal>
          <div className="mt-11 grid gap-5 md:grid-cols-3">
            {applicationGroups.map((group, index) => (
              <ScrollReveal key={group.title} delay={index * 0.08} hover className="h-full"><article className="h-full overflow-hidden bg-[#f7f5f0]">
                <div className="relative aspect-[5/3]">
                  <Image src={group.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="p-7">
                  <h3 className="font-display text-3xl">{group.title}</h3>
                  <ul className="mt-5 space-y-2 text-sm text-stone-600">
                    {group.items.map((item) => <li key={item} className="flex gap-3"><span className="text-[#a0937b]" aria-hidden="true">—</span>{item}</li>)}
                  </ul>
                </div>
              </article></ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-18 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <ScrollReveal>
            <SectionHeading eyebrow="Material specification" title="Move from moodboard to a workable stone brief." description="A useful enquiry gives the team enough information to match material, finish, format, and project needs from the start." />
            <Link href="/contact" className="button-primary mt-8">Start a material enquiry</Link>
          </ScrollReveal>
          <ol className="grid gap-px bg-stone-200 sm:grid-cols-3">
            {specificationSteps.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 0.1} hover className="h-full"><li className="h-full bg-[#f7f5f0] p-7">
                <span className="font-display text-3xl text-stone-500">{step.number}</span>
                <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{step.text}</p>
              </li></ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#e8e6df] px-5 py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <SectionHeading eyebrow="Catalogue preview" title="Start your material shortlist" description="Open any surface to see its specification guide and begin an enquiry with the material already selected." />
            <Link href="/catalogue" className="button-primary w-fit">Browse all products</Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product, index) => <ScrollReveal key={product.slug} delay={index * 0.06} hover className="h-full"><ProductCard product={product} /></ScrollReveal>)}
          </div>
        </div>
      </section>
    </>
  )
}
