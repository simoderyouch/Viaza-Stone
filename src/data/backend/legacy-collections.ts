export const catalogueCategories = [
  {
    value: 'Natural Stone',
    label: 'Natural Stone',
    href: '/catalogue?type=Natural%20Stone',
    description: 'Marble, quartzite, granite, travertine, and other expressive natural surfaces.',
  },
  {
    value: 'Quartz',
    label: 'Engineered Stone',
    href: '/catalogue?type=Quartz',
    description: 'Controlled tone and reliable performance for demanding interior applications.',
  },
  {
    value: 'Porcelain',
    label: 'Porcelain',
    href: '/catalogue?type=Porcelain',
    description: 'Large-format, architectural surfaces for walls, floors, and custom details.',
  },
] as const

export type ProductType = (typeof catalogueCategories)[number]['value']

export const materialCollections = [
  {
    name: 'Quartzite',
    href: '/catalogue?material=Quartzite',
    tagline: 'Naturally expressive. Ready to perform.',
    image: '/images/showcase/quartzitecielo.webp',
    description: 'Natural movement with exceptional strength for distinctive spaces.',
  },
  {
    name: 'Marble',
    href: '/catalogue?material=Marble',
    tagline: 'Historic material. Contemporary detail.',
    image: '/images/showcase/bianco-carrara.webp',
    description: 'Timeless character and expressive veining sourced from nature.',
  },
  {
    name: 'Granite',
    href: '/catalogue?material=Granite',
    tagline: 'Grounded strength. Architectural presence.',
    image: '/images/showcase/virginia-mist.webp',
    description: 'A resilient natural surface made for hardworking, beautiful rooms.',
  },
  {
    name: 'Engineered Stone',
    href: '/catalogue?type=Quartz',
    tagline: 'Controlled tone. Reliable performance.',
    image: '/images/showcase/V1-2-2.jpg',
    description: 'Reliable performance and refined designs for everyday living.',
  },
  {
    name: 'Travertine',
    href: '/catalogue?material=Travertine',
    tagline: 'Soft texture. Mediterranean character.',
    image: '/images/showcase/05-saratoga-inspiration.jpg',
    description: 'Warm, tactile stone that brings quiet depth to interiors and exteriors.',
  },
  {
    name: 'Soapstone',
    href: '/catalogue?material=Soapstone',
    tagline: 'Quiet depth. Made to be touched.',
    image: '/images/showcase/Saratoga-Black-1st-Choice-2cm-soapstone-Mockup-New-1.jpg',
    description: 'A tactile natural material with a soft finish and enduring depth.',
  },
] as const

export const primaryNavigation = [
  { href: '/catalogue', label: 'Collections' },
  { href: '/catalogue?type=Natural%20Stone', label: 'Moroccan Stone' },
  { href: '/products', label: 'Custom Stone' },
] as const

export const utilityNavigation = [
  { href: '/quote', label: 'Request a Quote' },
  { href: '/contact', label: 'Contact Us' },
] as const

export const collectionMenuGroups = [
  {
    title: 'Stone families',
    links: [
      { href: '/catalogue?material=Marble', label: 'Marble', detail: 'Veining, depth & quiet drama', color: 'bg-[#d8d2c5]' },
      { href: '/catalogue?material=Quartzite', label: 'Quartzite', detail: 'Expressive movement & strength', color: 'bg-[#9ea3a2]' },
      { href: '/catalogue?material=Travertine', label: 'Travertine', detail: 'Warm texture for inside & out', color: 'bg-[#b89d76]' },
      { href: '/catalogue?material=Granite', label: 'Granite', detail: 'Grounded architectural presence', color: 'bg-[#555a59]' },
    ],
  },
  {
    title: 'Project pathways',
    links: [
      { href: '/products', label: 'Finishes & formats', detail: 'Polished, honed, textured & cut to size', color: 'bg-[#c5b99e]' },
      { href: '/products', label: 'Interior stone', detail: 'Kitchens, bathrooms & feature surfaces', color: 'bg-[#d8d4cd]' },
      { href: '/products', label: 'Exterior stonework', detail: 'Facades, paving & landscape details', color: 'bg-[#77776d]' },
      { href: '/quote', label: 'Custom project enquiry', detail: 'Share drawings, finishes & quantities', color: 'bg-[#927f61]' },
    ],
  },
] as const

export const footerCollectionLinks = [
  { href: '/catalogue?type=Natural%20Stone', label: 'Natural Stone' },
  { href: '/catalogue?type=Quartz', label: 'Engineered Stone' },
  { href: '/catalogue?type=Porcelain', label: 'Porcelain' },
  { href: '/catalogue', label: 'View Catalogue' },
] as const

export const footerCompanyLinks = [
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/quote', label: 'Request a Quote' },
] as const
