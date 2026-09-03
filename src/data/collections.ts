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
  { name: 'Viaza Beige', href: '/collections/viaza-beige', tagline: 'Luminous tones. Timeless natural elegance.', image: '/images/collections/viaza-beige-category.jpeg', description: 'A noble, robust Moroccan limestone with high density and weather resistance for refined interiors and exterior architecture.', lightText: true },
  { name: 'Viaza Grey', href: '/collections/viaza-grey', tagline: 'Refined grey tones. Strong architectural character.', image: '/images/collections/viaza-grey-category.png', description: 'A premium Moroccan limestone with sophisticated grey tones, low maintenance, and resistance to moisture and changing weather.', lightText: true },
  { name: 'Travertine', href: '/collections/travertine', tagline: 'The Essence of Earth.', image: '/images/collections/travertine-category.jpeg', description: 'Moroccan travertine shaped over millions of years, defined by warm tones, mineral structure, and natural individuality.', lightText: true },
  { name: 'Moroccan Marble', href: '/collections/moroccan-marble', tagline: 'Sculpted by time. Designed for enduring spaces.', image: '/images/products/applications/limane-grey-purple.webp', description: 'Premium Moroccan marbles with distinctive mineral structures, organic patterns, rich pigmentation, and individual veining.' },
] as const

export const collectionPages = [
  {
    slug: 'viaza-beige',
    eyebrow: 'Natural stone collection',
    title: 'Viaza Limestone Beige',
    description: 'A touch of golden beige, makes your space a meeting place of warmth and luxury.',
    image: '/images/viaza-biege-header-image.jpeg',
    productNamePrefix: 'Viaza Beige',
  },
  {
    slug: 'viaza-grey',
    eyebrow: 'Viaza Limestone',
    title: 'Viaza Grey',
    description: 'A measured grey expression that brings calm, depth, and lasting architectural character to every space.',
    image: '/images/products/applications/viaza-grey-polished.webp',
    productNamePrefixes: ['Viaza Grey', 'Viaza Aldo', 'Viaza Blue'],
  },
  {
    slug: 'travertine',
    eyebrow: 'Moroccan Travertine',
    title: 'Travertine',
    description: 'Warm mineral tones and organic texture create a timeless, grounded sense of place.',
    image: '/images/products/applications/travertine-atlas.webp',
    material: 'Travertine',
  },
  {
    slug: 'moroccan-marble',
    eyebrow: 'Moroccan Marble',
    title: 'Moroccan Marble',
    description: 'Distinctive veining and mineral colour shape bold, individual interiors with enduring presence.',
    image: '/images/products/applications/limane-grey-purple.webp',
    material: 'Marble',
  },
] as const

export function getCollectionPage(slug: string) {
  return collectionPages.find((collection) => collection.slug === slug)
}

type CollectionProduct = {
  name: string
  material: string
  type: ProductType
}

function hasProductsForCollection(
  collection: (typeof collectionPages)[number],
  products: readonly CollectionProduct[],
) {
  return products.some((product) => matchesCollectionProduct(collection, product))
}

export function matchesCollectionProduct(
  collection: (typeof collectionPages)[number],
  product: Pick<CollectionProduct, 'name' | 'material'>,
) {
  if ('productNamePrefixes' in collection) {
    return collection.productNamePrefixes.some((prefix) => product.name.startsWith(prefix))
  }

  if ('productNamePrefix' in collection) {
    return product.name.startsWith(collection.productNamePrefix)
  }

  return product.material === collection.material
}

export function getAvailableMaterialCollections(products: readonly CollectionProduct[]) {
  return materialCollections.filter((materialCollection) => {
    const collectionSlug = materialCollection.href.split('/').pop()
    const collection = collectionPages.find((page) => page.slug === collectionSlug)

    return collection ? hasProductsForCollection(collection, products) : false
  })
}

export function getAvailableCatalogueCategories(products: readonly CollectionProduct[]) {
  return catalogueCategories.filter((category) => products.some((product) => product.type === category.value))
}

export const primaryNavigation = [
  { href: '/catalogue', label: 'Collections' },
  { href: '/applications', label: 'Applications' },
  { href: '/about', label: 'About Us' },
] as const

export const utilityNavigation = [
  { href: '/contact', label: 'Contact / Request a Quote' },
] as const

export function getAvailableFooterCollectionLinks(products: readonly CollectionProduct[]) {
  const availableTypes = new Set(getAvailableCatalogueCategories(products).map((category) => category.value))
  const availableMaterials = new Set(products.map((product) => product.material))

  return [
    ...(availableTypes.has('Viaza Limestone') ? [{ href: '/catalogue?type=Viaza%20Limestone', label: 'Viaza Limestone' }] : []),
    ...(availableTypes.has('Moroccan Marble') ? [{ href: '/catalogue?type=Moroccan%20Marble', label: 'Moroccan Marble' }] : []),
    ...(availableMaterials.has('Travertine') ? [{ href: '/catalogue?material=Travertine', label: 'Travertine' }] : []),
    { href: '/catalogue', label: 'View Catalogue' },
  ]
}

export const footerCompanyLinks = [
  { href: '/about', label: 'Our Story' },
  { href: '/contact', label: 'Contact / Request a Quote' },
] as const
