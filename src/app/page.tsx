import Image from 'next/image'
import Link from 'next/link'
import { FaqSection } from '@/components/faq-section'
import { HomeHero } from '@/components/home-hero'
import { MaterialCard } from '@/components/material-card'
import { ParallaxFrame, ScrollProgress, ScrollReveal } from '@/components/motion-effects'
import { SectionHeading } from '@/components/section-heading'
import { materialCollections } from '@/data/collections'

const experienceSteps = [
  { number: '01', title: 'Define', text: 'Start with the setting, design direction, application, and quantity you need.', image: '/images/showcase/1.jpg' },
  { number: '02', title: 'Curate', text: 'Narrow the stone, surface finish, and format that fit the brief.', image: '/images/showcase/2.jpg' },
  { number: '03', title: 'Specify', text: 'Align material details with drawings, samples, and project expectations.', image: '/images/showcase/3.jpg' },
  { number: '04', title: 'Prepare', text: 'Coordinate the selected material for the production and packing stage.', image: '/images/showcase/4.jpg' },
  { number: '05', title: 'Deliver', text: 'Move forward with a clear handover for your team and project timeline.', image: '/images/showcase/5.jpg' },
]

const inspirationImages = [
  { src: '/images/showcase/389_1781628581.jpg', alt: 'Taj Mahal quartzite in a kitchen' },
  { src: '/images/showcase/ns-featured-06.jpg', alt: 'Cloudy White natural stone interior' },
  { src: '/images/showcase/ns-featured-03.jpg', alt: 'Luce Di Luna natural stone interior' },
  { src: '/images/showcase/05-saratoga-inspiration.jpg', alt: 'Saratoga natural stone interior' },
]

const viazaPillars = [
  { number: '01', title: 'Moroccan origin', text: 'A curated approach to Moroccan natural stone for architectural projects.' },
  { number: '02', title: 'Custom specification', text: 'Stone selections, finishes, and formats shaped around the needs of each project.' },
  { number: '03', title: 'Export-ready support', text: 'A clear route from material selection to packing and shipment coordination.' },
  { number: '04', title: 'Project partnership', text: 'A responsive partner for architects, importers, distributors, and developers.' },
]

const projectApplications = [
  {
    title: 'Hotels & resorts',
    text: 'Natural stone finishes for welcoming, durable hospitality environments.',
    image: '/images/applications/08_page_21_moroccan_interior_flooring.webp',
  },
  {
    title: 'Villas & residences',
    text: 'Material character for kitchens, bathrooms, living spaces, and exterior details.',
    image: '/images/applications/05_page_19_staircase_green_interior.webp',
  },
  {
    title: 'Facades & outdoor spaces',
    text: 'Stone solutions for walls, paving, landscape, and architectural exterior work.',
    image: '/images/applications/11_page_24_crazy_paving_poolside.webp',
  },
]

const specificationServices = [
  { number: '01', title: 'Material selection', text: 'Select the right stone, color variation, finish, and application for your brief.' },
  { number: '02', title: 'Custom finishing', text: 'Plan formats and surface treatments to suit the intended architectural result.' },
  { number: '03', title: 'Packing & shipment', text: 'Coordinate a clear export path from order confirmation to project delivery.' },
]

const finishes = [
  { title: 'Polished', text: 'A reflective finish that brings out colour, depth, and natural movement.', image: '/images/finishes/polished-stone.png' },
  { title: 'Raw', text: 'An untreated finish that preserves the stone’s authentic natural texture.', image: '/images/finishes/raw-stone.png' },
  { title: 'Brushed & textured', text: 'Tactile surface character for exterior and architectural applications.', image: '/images/finishes/brushed-textured-stone.png' },
  { title: 'Custom formats', text: 'Tiles, slabs, cladding, stairs, and project-specific cuts.', image: '/images/finishes/custom-formats-stone.png' },
]

const exportSteps = [
  { number: '01', title: 'Review the brief', text: 'Share your material, finish, format, quantity, and destination requirements.' },
  { number: '02', title: 'Confirm the selection', text: 'Align on the appropriate stone, color variation, and technical specification.' },
  { number: '03', title: 'Prepare the order', text: 'Coordinate cutting, finishing, quality review, and protective packing.' },
  { number: '04', title: 'Plan dispatch', text: 'Organize the shipment details and supporting information for your order.' },
]

const whyViaza = [
  { title: 'Material-led sourcing', text: 'A curated focus on natural stone chosen for its architectural potential.' },
  { title: 'Custom project support', text: 'Specification guidance from the first material conversation onward.' },
  { title: 'Export-minded process', text: 'A clear workflow for international buyers and project teams.' },
  { title: 'Direct communication', text: 'Responsive support for enquiries, samples, and project details.' },
]

const faqItems = [
  { question: 'Which finishes can I specify?', answer: 'Viaza Stone can help you select polished, honed, brushed, textured, and other finish directions according to the material and intended application.' },
  { question: 'Can I request custom sizes and formats?', answer: 'Yes. Share your drawings, dimensions, finish, quantity, and application so the team can review the right format for your project.' },
  { question: 'Can I request samples before ordering?', answer: 'Yes. Use the contact form to describe the materials and finishes you would like to evaluate for your project.' },
  { question: 'Do you support international project enquiries?', answer: 'Yes. Viaza Stone is positioned to support architects, importers, distributors, contractors, and project developers with export-focused enquiries.' },
  { question: 'How do I begin an enquiry?', answer: 'Start with the catalogue, then send your material preferences and project requirements through the contact page for a tailored response.' },
]

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <HomeHero />

      <section className="bg-white px-5 py-18 lg:px-8">
        <div className="mx-auto max-w-[1800px]">
          <ScrollReveal><SectionHeading eyebrow="Material library" title="Find the character of your project" centered /></ScrollReveal>
          <div className="mt-11 grid gap-5 md:grid-cols-2">
            {materialCollections.map((material, index) => (
              <ScrollReveal key={material.name} delay={index * 0.07} hover className="h-full"><MaterialCard {...material} index={index + 1} className="min-h-[32rem] sm:min-h-[36rem]" /></ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#242424] px-5 py-16 text-white lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="z-10 self-start lg:sticky lg:top-28">
            <ScrollReveal distance={24}>
              <div className="bg-[#f3f0e9] p-7 text-[#292b2c] sm:p-10">
                <p className="eyebrow">Stone in context</p>
                <h2 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">See what the material can make possible.</h2>
                <p className="mt-5 leading-7 text-stone-600">Move beyond a single slab. Consider how tone, finish, scale, and light work together across the rooms and details of a project.</p>
                <Link href="/products" className="button-primary mt-8">Explore project uses</Link>
              </div>
            </ScrollReveal>
          </div>
          <div className="grid gap-5">
            {inspirationImages.map((image, index) => (
              <ScrollReveal key={image.src} className="relative aspect-[1.28] overflow-hidden sm:aspect-[1.42]" distance={52}>
                {index === 0 ? (
                  <ParallaxFrame className="h-full w-full" distance={48}>
                    <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 64vw" className="object-cover" />
                  </ParallaxFrame>
                ) : (
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1024px) 100vw, 64vw" className="object-cover transition duration-700 hover:scale-105" />
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e8e6df] px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal><SectionHeading eyebrow="Applications" title="Stone for spaces that need to perform beautifully" description="Viaza Stone supports material-led projects across residential, hospitality, commercial, and exterior applications." centered /></ScrollReveal>
          <div className="mt-11 grid gap-5 md:grid-cols-3">
            {projectApplications.map((application, index) => (
              <ScrollReveal key={application.title} delay={index * 0.1} hover className="h-full"><article className="group relative min-h-105 overflow-hidden bg-stone-900">
                <Image src={application.image} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <h3 className="font-display text-3xl">{application.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-100">{application.text}</p>
                </div>
              </article></ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-18 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Made for specification"
              title="A clearer route from material to project"
              description="Whether you are sourcing for a single villa or a larger development, Viaza Stone helps organize the material decisions that matter."
            />
            <Link href="/contact" className="button-primary mt-8">Discuss your project</Link>
          </ScrollReveal>
          <div className="grid gap-px bg-stone-200 sm:grid-cols-3">
            {specificationServices.map((service, index) => (
              <ScrollReveal key={service.number} delay={index * 0.1} hover className="h-full"><article className="h-full bg-[#f7f5f0] p-7">
                <span className="font-display text-3xl text-stone-500">{service.number}</span>
                <h3 className="mt-6 text-lg font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{service.text}</p>
              </article></ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e8e6df] px-5 py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal><SectionHeading eyebrow="Our approach" title="From first brief to final material" centered /></ScrollReveal>
          <ol className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-5">
            {experienceSteps.map((step, index) => (
              <ScrollReveal key={step.number} as="li" delay={index * 0.08} className="text-center">
                <span className="font-display text-3xl text-[#282828]">{step.number}</span>
                <div className="relative mx-auto mt-4 aspect-square w-full max-w-40 overflow-hidden rounded-full">
                  <Image src={step.image} alt="" fill sizes="168px" className="object-cover" />
                </div>
                <h3 className="mt-5 font-bold">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-48 text-sm leading-6 text-stone-600">{step.text}</p>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#e8e6df] px-5 py-18 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ParallaxFrame className="min-h-[28rem] sm:min-h-[36rem]" distance={62}>
            <Image src="/images/showcase/54236a81-1884-43a8-b8ff-cb672d2bbb5a-topaz-wonder.jpg" alt="Moroccan natural stone in an architectural setting" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
          </ParallaxFrame>
          <ScrollReveal className="self-center">
            <p className="eyebrow">About Viaza Stone</p>
            <h2 className="font-display mt-3 max-w-xl text-4xl leading-tight sm:text-5xl">Moroccan natural stone, prepared for international projects.</h2>
            <p className="mt-6 max-w-2xl leading-7 text-stone-700">
              Viaza Stone curates, processes, and distributes Morocco&apos;s finest natural stone. By working with leading Moroccan quarries, we connect authentic craftsmanship with the requirements of contemporary architecture, construction, and interior design projects.
            </p>
            <div className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {viazaPillars.map((pillar) => (
                <article key={pillar.number} className="border-t border-[#282828] pt-4">
                  <span className="font-display text-2xl text-stone-500">{pillar.number}</span>
                  <h3 className="mt-3 text-base font-semibold text-[#282828]">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{pillar.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/catalogue" className="button-primary">Request catalogue</Link>
              <Link href="/contact" className="button-secondary">Contact / Request a Quote</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-white px-5 py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal><SectionHeading eyebrow="Finishes & formats" title="Specify every surface detail" description="Choose a finish and format that supports the material, the setting, and the architectural intent of your project." centered /></ScrollReveal>
          <div className="mt-11 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {finishes.map((finish, index) => (
              <ScrollReveal key={finish.title} delay={index * 0.07} hover className="h-full"><article className="h-full overflow-hidden border border-stone-200 bg-[#f7f5f0]">
                <div className="relative aspect-[4/3]">
                  <Image src={finish.image} alt={`${finish.title} stone finish`} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl">{finish.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-stone-600">{finish.text}</p>
                </div>
              </article></ScrollReveal>
            ))}
          </div>
          <div className="mt-9 text-center"><Link href="/catalogue" className="button-secondary">Explore materials</Link></div>
        </div>
      </section>

      <section className="bg-[#282828] px-5 py-18 text-white lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal><SectionHeading eyebrow="Quality & export process" title="Organized around the details that matter" description="A simple export-oriented workflow for turning a material brief into a prepared stone order." centered inverse /></ScrollReveal>
          <ol className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {exportSteps.map((step, index) => (
              <ScrollReveal key={step.number} as="li" delay={index * 0.1} className="h-full border-t border-white/60 pt-5">
                <span className="font-display text-3xl text-[#d4c5aa]">{step.number}</span>
                <h3 className="mt-5 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-300">{step.text}</p>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white px-5 py-18 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal><SectionHeading eyebrow="Why Viaza Stone" title="A more confident way to source stone" centered /></ScrollReveal>
          <div className="mt-11 grid gap-px bg-stone-200 sm:grid-cols-2 lg:grid-cols-4">
            {whyViaza.map((reason, index) => (
              <ScrollReveal key={reason.title} delay={index * 0.08} hover className="h-full"><article className="h-full bg-white p-7">
                <span className="font-display text-3xl text-stone-400">0{index + 1}</span>
                <h3 className="mt-6 text-lg font-semibold">{reason.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{reason.text}</p>
              </article></ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden px-5 py-22 text-white lg:px-8">
        <Image src="/images/products/v2/detail/viaza-grey-polished.webp" alt="Viaza Grey polished stone sample" fill loading="eager" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/75" />
        <ScrollReveal className="relative mx-auto max-w-2xl text-center" distance={18}>
          <p className="text-[0.7rem] font-bold tracking-[0.19em] text-[#d4c5aa] uppercase">Material samples</p>
          <h2 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">Begin with a surface you can see and feel.</h2>
          <p className="mt-5 leading-7 text-stone-100">Share the atmosphere, finish, and application you have in mind. We will help narrow the right material direction.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="button-primary">Start a sample request</Link>
            <Link href="/catalogue" className="button-secondary text-white">View material library</Link>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-[#f7f5f0] px-5 py-18 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <ScrollReveal><SectionHeading eyebrow="Project guidance" title="The practical details, made simple" description="A few useful answers for teams planning a stone enquiry, a sample request, or a custom specification." /></ScrollReveal>
          <ScrollReveal delay={0.1}><FaqSection items={faqItems} /></ScrollReveal>
        </div>
      </section>

      <section className="bg-[#282828] px-5 py-20 text-white lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl">Have a project in mind?</h2>
            <p className="mt-3 text-lg text-stone-300">Let&apos;s turn the brief into a material direction.</p>
          </div>
          <Link href="/contact" className="button-primary">Talk to Viaza Stone</Link>
        </div>
      </section>
    </>
  )
}
