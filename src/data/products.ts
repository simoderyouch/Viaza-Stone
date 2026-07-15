import type { ProductType } from '@/data/collections'

export type { ProductType } from '@/data/collections'

export type Product = {
  name: string
  slug: string
  type: ProductType
  material: string
  color: string
  origin: string
  image: string
  thumbnail: string
  applicationImage: string
  gallery: string[]
  description: string
  availability: string
  finishes: string[]
  formats: string[]
  applications: string[]
  note: string
}

const isViazaProduct = (slug: string) => slug.startsWith('viaza-')
const originalViazaImageSlugs = new Set([
  'viaza-beige-striated',
  'viaza-beige-tumbled-lbr',
  'viaza-beige-tumbled',
  'viaza-beige-atlas-tmr',
  'viaza-grey-atlas-tbr',
])
const viazaImageVersion = (slug: string) => originalViazaImageSlugs.has(slug) ? 'v1' : 'v2'
const detailImage = (slug: string) => `/images/products/${isViazaProduct(slug) ? `${viazaImageVersion(slug)}/detail` : 'premium/detail'}/${slug}.webp`
const thumbnailImage = (slug: string) => `/images/products/${isViazaProduct(slug) ? `${viazaImageVersion(slug)}/thumb` : 'premium/thumb'}/${slug}.webp`
const applicationImage = (slug: string) => `/images/products/applications/${slug}.webp`

const beigeApplications = ['Flooring', 'Wall cladding', 'Terrace landscaping', 'Exterior facades', 'Refined interiors']
const greyApplications = ['Building facades', 'Wall cladding', 'Flooring', 'Gardens', 'Walkways', 'Swimming pool surroundings']
const marbleApplications = ['Feature walls', 'Flooring', 'Architectural interiors']

function createProduct({
  name,
  slug,
  type,
  material,
  color,
  description,
  finish,
  applications,
  image,
  thumbnail,
}: {
  name: string
  slug: string
  type: ProductType
  material: string
  color: string
  description: string
  finish: string
  applications: string[]
  image?: string
  thumbnail?: string
}): Product {
  const selectionNote = name.startsWith('Viaza Beige')
    ? 'Viaza Beige is a noble, robust Moroccan limestone prized for luminous tones, timeless elegance, high density, and excellent weather resistance. Confirm the selected sample, finish, and format before final approval.'
    : name.startsWith('Viaza Grey')
      ? 'Viaza Grey is a premium Moroccan limestone recognised for durable refined grey tones, resistance to moisture and changing weather, and low-maintenance performance. Confirm the selected sample, finish, and format before final approval.'
      : 'Every premium Moroccan stone is shaped by geological forces over millions of years. Natural pigment, mineral structure, veining, and tone vary from slab to slab; confirm the selected material before final approval.'

  return {
    name,
    slug,
    type,
    material,
    color,
    origin: type === 'Viaza Limestone' ? 'Taza, Morocco' : 'Morocco',
    image: image ?? detailImage(slug),
    thumbnail: thumbnail ?? thumbnailImage(slug),
    applicationImage: applicationImage(slug),
    gallery: [],
    description,
    availability: 'Enquire for availability',
    finishes: [finish],
    formats: ['Tiles', 'Slabs', 'Wall cladding', 'Cut-to-size'],
    applications,
    note: selectionNote,
  }
}

export const products: Product[] = [
  createProduct({ name: 'Viaza Beige Bush-Hammered', slug: 'viaza-beige-bush-hammered', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Bush-Hammered', applications: beigeApplications, description: 'High-density Viaza Beige limestone with a textured bush-hammered finish that adds grip and depth.' }),
  createProduct({ name: 'Viaza Beige Raw', slug: 'viaza-beige-raw', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Raw', applications: beigeApplications, description: 'High-density Viaza Beige limestone in an untreated finish that preserves its authentic natural texture.' }),
  createProduct({ name: 'Viaza Beige Polished', slug: 'viaza-beige-polished', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Polished', applications: beigeApplications, description: 'High-density Viaza Beige limestone in a polished finish that highlights its luminous colour and natural movement.' }),
  createProduct({ name: 'Viaza Beige Rustic', slug: 'viaza-beige-rustic', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Rustic', applications: beigeApplications, description: 'High-density Viaza Beige limestone with a naturally textured rustic finish and warm, timeless character.' }),
  createProduct({ name: 'Viaza Beige Light Bush-Ham', slug: 'viaza-beige-light-bush-ham', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Light Bush-Ham', applications: beigeApplications, description: 'High-density Viaza Beige limestone with a gently textured finish for soft grip and an elegant natural look.' }),
  createProduct({ name: 'Viaza Beige Zola', slug: 'viaza-beige-zola', type: 'Viaza Limestone', material: 'Limestone', color: 'Greige Beige', finish: 'Zola', applications: beigeApplications, description: 'A fine-grained Viaza Beige limestone in the versatile greige Zola finish.' }),
  createProduct({ name: 'Viaza Beige Striated', slug: 'viaza-beige-striated', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Striated', applications: beigeApplications, description: 'Viaza Beige limestone with continuous parallel lines that add depth and a modern architectural texture.' }),
  createProduct({ name: 'Viaza Beige Tumbled LBR', slug: 'viaza-beige-tumbled-lbr', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Tumbled LBR', applications: beigeApplications, description: 'Viaza Beige limestone in a tumbled LBR finish for a softly weathered material expression.' }),
  createProduct({ name: 'Viaza Beige Tumbled', slug: 'viaza-beige-tumbled', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Tumbled', applications: beigeApplications, description: 'Viaza Beige limestone in a tumbled finish with an easy, tactile character.' }),
  createProduct({ name: 'Viaza Beige Atlas-TMR', slug: 'viaza-beige-atlas-tmr', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Atlas-TMR', applications: beigeApplications, description: 'High-density Viaza Beige limestone in the Atlas-TMR finish.' }),
  createProduct({ name: 'Viaza Beige Sandblasted-BRP', slug: 'viaza-beige-sandblasted-brp', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Sandblasted-BRP', applications: beigeApplications, image: '/images/products/v2/detail/viaza-beige-sandblasted-brp.png', thumbnail: '/images/products/v2/thumb/viaza-beige-sandblasted-brp.png', description: 'High-density Viaza Beige limestone in a sandblasted finish with a refined textured surface.' }),
  createProduct({ name: 'Viaza Grey Polished', slug: 'viaza-grey-polished', type: 'Viaza Limestone', material: 'Limestone', color: 'Refined Grey', finish: 'Polished', applications: greyApplications, description: 'Durable Viaza Grey limestone in a polished finish that brings out its refined grey tone.' }),
  createProduct({ name: 'Viaza Grey Rustic', slug: 'viaza-grey-rustic', type: 'Viaza Limestone', material: 'Limestone', color: 'Refined Grey', finish: 'Rustic', applications: greyApplications, description: 'Durable Viaza Grey limestone with a naturally textured rustic finish.' }),
  createProduct({ name: 'Viaza Grey Light Bush-Ham', slug: 'viaza-grey-light-bush-ham', type: 'Viaza Limestone', material: 'Limestone', color: 'Refined Grey', finish: 'Light Bush-Ham', applications: greyApplications, description: 'Durable Viaza Grey limestone in a lightly textured finish with a soft natural appearance.' }),
  createProduct({ name: 'Viaza Grey Rustic-Aldo', slug: 'viaza-grey-rustic-aldo', type: 'Viaza Limestone', material: 'Limestone', color: 'Refined Grey', finish: 'Rustic-Aldo', applications: greyApplications, description: 'Durable Viaza Grey limestone in the tactile Rustic-Aldo finish.' }),
  createProduct({ name: 'Viaza Grey Tuda Light', slug: 'viaza-grey-tuda-light', type: 'Viaza Limestone', material: 'Limestone', color: 'Refined Grey', finish: 'Tuda Light', applications: greyApplications, description: 'Durable Viaza Grey limestone in the Tuda Light finish for interior and exterior projects.' }),
  createProduct({ name: 'Viaza Grey Rustic Tuda', slug: 'viaza-grey-rustic-tuda', type: 'Viaza Limestone', material: 'Limestone', color: 'Refined Grey', finish: 'Rustic Tuda', applications: greyApplications, description: 'Durable Viaza Grey limestone in the expressive Rustic Tuda finish.' }),
  createProduct({ name: 'Viaza Grey Cosmic Tuda', slug: 'viaza-grey-cosmic-tuda', type: 'Viaza Limestone', material: 'Limestone', color: 'Refined Grey', finish: 'Cosmic Tuda', applications: greyApplications, description: 'Durable Viaza Grey limestone in the distinctive Cosmic Tuda finish.' }),
  createProduct({ name: 'Viaza Grey Aldo-BHB', slug: 'viaza-grey-aldo-bhb', type: 'Viaza Limestone', material: 'Limestone', color: 'Refined Grey', finish: 'Aldo-BHB', applications: greyApplications, description: 'Durable Viaza Grey limestone in the Aldo-BHB finish.' }),
  createProduct({ name: 'Viaza Grey-TMR', slug: 'viaza-grey-tmr', type: 'Viaza Limestone', material: 'Limestone', color: 'Refined Grey', finish: 'Grey-TMR', applications: greyApplications, description: 'Durable Viaza Grey limestone in the Grey-TMR finish.' }),
  createProduct({ name: 'Viaza Grey Atlas-TBR', slug: 'viaza-grey-atlas-tbr', type: 'Viaza Limestone', material: 'Limestone', color: 'Refined Grey', finish: 'Grey Atlas-TBR', applications: greyApplications, description: 'Durable Viaza Grey limestone in the Grey Atlas-TBR finish.' }),
  createProduct({ name: 'Travertine Atlas', slug: 'travertine-atlas', type: 'Moroccan Marble', material: 'Travertine', color: 'Warm Beige', finish: 'Enquire for available finishes', applications: marbleApplications, description: 'Premium Moroccan travertine with a warm, natural stone character.' }),
  createProduct({ name: 'Travertine Desert', slug: 'travertine-desert', type: 'Moroccan Marble', material: 'Travertine', color: 'Desert Beige', finish: 'Enquire for available finishes', applications: marbleApplications, description: 'Premium Moroccan travertine with a warm desert-toned expression.' }),
  createProduct({ name: 'Yellow Atlantic', slug: 'yellow-atlantic', type: 'Moroccan Marble', material: 'Marble', color: 'Golden Yellow', finish: 'Enquire for available finishes', applications: marbleApplications, description: 'Premium Moroccan marble with a naturally warm golden-yellow palette.' }),
  createProduct({ name: 'Limane Grey-Purple', slug: 'limane-grey-purple', type: 'Moroccan Marble', material: 'Marble', color: 'Grey & Purple', finish: 'Enquire for available finishes', applications: marbleApplications, description: 'Premium Moroccan marble with a distinctive grey-purple colour direction.' }),
  createProduct({ name: 'Limane Grey-Lido', slug: 'limane-grey-lido', type: 'Moroccan Marble', material: 'Marble', color: 'Grey', finish: 'Enquire for available finishes', applications: marbleApplications, description: 'Premium Moroccan marble with a calm, refined grey expression.' }),
  createProduct({ name: 'Grey Flifel', slug: 'grey-flifel', type: 'Moroccan Marble', material: 'Marble', color: 'Grey', finish: 'Enquire for available finishes', applications: marbleApplications, description: 'Premium Moroccan marble with an architectural grey tone.' }),
  createProduct({ name: 'Atlas Black', slug: 'atlas-black', type: 'Moroccan Marble', material: 'Marble', color: 'Black', finish: 'Enquire for available finishes', applications: marbleApplications, description: 'Premium Moroccan black marble for strong, dramatic material statements.' }),
  createProduct({ name: 'Atlas Absolute Black', slug: 'atlas-absolute-black', type: 'Moroccan Marble', material: 'Marble', color: 'Absolute Black', finish: 'Enquire for available finishes', applications: marbleApplications, description: 'Premium Moroccan marble with an absolute black colour direction.' }),
]

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}
