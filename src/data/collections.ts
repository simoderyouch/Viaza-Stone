export const catalogueCategories = [
  {
    value: 'Viaza Limestone', label: 'Viaza Limestone', href: '/catalogue?type=Viaza%20Limestone',
    description: 'A curated collection of Moroccan limestone sourced from the mountains surrounding the historic city of Taza.',
  },
  {
    value: 'Moroccan Marble', label: 'Moroccan Marble', href: '/catalogue?type=Moroccan%20Marble',
    description: 'The Essence of Earth: premium Moroccan travertines and marbles shaped by time across the Atlas Mountains and ancient landscapes.',
  },
] as const

export type ProductType = (typeof catalogueCategories)[number]['value']

export const materialCollections = [
  { name: 'Viaza Beige', href: '/catalogue?type=Viaza%20Limestone&q=Viaza%20Beige', tagline: 'Luminous tones. Timeless natural elegance.', image: '/images/products/applications/viaza-beige-polished.webp', description: 'A noble, robust Moroccan limestone with high density and weather resistance for refined interiors and exterior architecture.' },
  { name: 'Viaza Grey', href: '/catalogue?type=Viaza%20Limestone&q=Viaza%20Grey', tagline: 'Refined grey tones. Strong architectural character.', image: '/images/products/applications/viaza-grey-polished.webp', description: 'A premium Moroccan limestone with sophisticated grey tones, low maintenance, and resistance to moisture and changing weather.' },
  { name: 'Travertine', href: '/catalogue?material=Travertine', tagline: 'The Essence of Earth.', image: '/images/products/applications/travertine-atlas.webp', description: 'Moroccan travertine shaped over millions of years, defined by warm tones, mineral structure, and natural individuality.' },
  { name: 'Moroccan Marble', href: '/catalogue?material=Marble', tagline: 'Sculpted by time. Designed for enduring spaces.', image: '/images/products/applications/limane-grey-purple.webp', description: 'Premium Moroccan marbles with distinctive mineral structures, organic patterns, rich pigmentation, and individual veining.' },
] as const

export const primaryNavigation = [
  { href: '/catalogue', label: 'Collections' },
  { href: '/applications', label: 'Applications' },
  { href: '/about', label: 'About Us' },
] as const

export const utilityNavigation = [
  { href: '/contact', label: 'Contact / Request a Quote' },
] as const

export const footerCollectionLinks = [
  { href: '/catalogue?type=Viaza%20Limestone', label: 'Viaza Limestone' },
  { href: '/catalogue?type=Moroccan%20Marble', label: 'Moroccan Marble' },
  { href: '/catalogue?material=Travertine', label: 'Travertine' },
  { href: '/catalogue', label: 'View Catalogue' },
] as const

export const footerCompanyLinks = [
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact / Request a Quote' },
] as const
