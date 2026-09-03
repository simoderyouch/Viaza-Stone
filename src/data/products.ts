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
  imageFit?: 'cover' | 'contain'
  largeHeroImage?: boolean
  thumbnail: string
  applicationImage: string
  gallery: string[]
  galleryImageFit?: 'cover' | 'contain'
  detailHeading?: string
  stoneDetails?: { label: string; value: string; icon: StoneDetailIcon }[]
  applicationEyebrow?: string
  applicationTitle?: string
  applicationDescription?: string
  applicationImageFit?: 'cover' | 'contain'
  description: string | string[]
  availability: string
  finishes: string[]
  formats: string[]
  applications: string[]
  note: string
}

export type StoneDetailIcon = 'material' | 'origin' | 'finish' | 'dimensions' | 'thickness' | 'availability'

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

const extractedProductImage = (product: string, file: string) => `/images/products/extracted-2026-09-02/${product}/${file}`

const extractedStoneDetails = (finish: string): NonNullable<Product['stoneDetails']> => [
  { label: 'Material', value: 'Limestone', icon: 'material' },
  { label: 'Collection origin', value: 'Morocco', icon: 'origin' },
  { label: 'Finish', value: finish, icon: 'finish' },
  { label: 'Tile Dimensions', value: 'Made To Order', icon: 'dimensions' },
  { label: 'Thickness variation', value: '+/-  20-50 mm', icon: 'thickness' },
  { label: 'Availability', value: 'Enquire for availability', icon: 'availability' },
]

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
  largeHeroImage,
  thumbnail,
  gallery,
  galleryImageFit,
  applicationImage: productApplicationImage,
  applicationEyebrow,
  applicationTitle,
  applicationDescription,
  applicationImageFit,
  detailHeading,
  stoneDetails,
  imageFit,
}: {
  name: string
  slug: string
  type: ProductType
  material: string
  color: string
  description: Product['description']
  finish: string
  applications: string[]
  image?: string
  imageFit?: Product['imageFit']
  largeHeroImage?: boolean
  thumbnail?: string
  gallery?: string[]
  galleryImageFit?: Product['galleryImageFit']
  applicationImage?: string
  applicationEyebrow?: string
  applicationTitle?: string
  applicationDescription?: string
  applicationImageFit?: Product['applicationImageFit']
  detailHeading?: string
  stoneDetails?: Product['stoneDetails']
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
    imageFit,
    largeHeroImage,
    thumbnail: thumbnail ?? thumbnailImage(slug),
    applicationImage: productApplicationImage ?? applicationImage(slug),
    gallery: gallery ?? [],
    galleryImageFit,
    applicationEyebrow,
    applicationTitle,
    applicationDescription,
    applicationImageFit,
    detailHeading,
    stoneDetails,
    description,
    availability: 'Enquire for availability',
    finishes: [finish],
    formats: ['Tiles', 'Slabs', 'Wall cladding', 'Cut-to-size'],
    applications,
    note: selectionNote,
  }
}

const allProducts: Product[] = [
  createProduct({
    name: 'Viaza Beige Bush-Hammered',
    slug: 'viaza-beige-bush-hammered',
    type: 'Viaza Limestone',
    material: 'Limestone',
    color: 'Luminous Beige',
    finish: 'Bush-Hammered',
    applications: beigeApplications,
    image: extractedProductImage('beige-bush-hammered', 'main.png'),
    imageFit: 'contain',
    gallery: [extractedProductImage('beige-bush-hammered', 'detail.png')],
    galleryImageFit: 'contain',
    applicationImage: extractedProductImage('beige-bush-hammered', 'application.png'),
    applicationImageFit: 'contain',
    detailHeading: 'VIAZA Limestone – Bush-Hammered Finish',
    description: 'The Bush-Hammered finish reveals the bold and enduring character of VIAZA Limestone Beige through a finely textured surface that combines natural beauty with architectural performance. The carefully crafted relief enriches the stone with depth and character while preserving its authentic limestone appearance. Its textured finish provides excellent slip resistance and exceptional durability, making it particularly suitable for high-traffic areas and outdoor environments. Balancing refined aesthetics with lasting functionality, this finish is an excellent choice for plazas, walkways, staircases, façades, terraces, and contemporary architectural projects where texture, safety, and timeless elegance come together.',
    stoneDetails: extractedStoneDetails('BUSH-HAMMRED'),
  }),
  createProduct({
    name: 'Viaza Beige Raw',
    slug: 'viaza-beige-raw',
    type: 'Viaza Limestone',
    material: 'Limestone',
    color: 'Luminous Beige',
    finish: 'Raw',
    applications: beigeApplications,
    image: extractedProductImage('beige-raw', 'main.png'),
    imageFit: 'contain',
    gallery: [extractedProductImage('beige-raw', 'detail.png')],
    galleryImageFit: 'contain',
    applicationImage: extractedProductImage('beige-raw', 'application.png'),
    applicationImageFit: 'contain',
    detailHeading: 'VIAZA Limestone – Natural Finish',
    description: 'In its raw state, VIAZA Limestone Beige reveals the authentic beauty of Moroccan natural stone. Its original texture, soft tonal variations, and timeless character make it an exceptional choice for architectural projects seeking purity, durability, and natural elegance.',
    stoneDetails: extractedStoneDetails('Raw'),
  }),
  createProduct({
    name: 'Viaza Beige Polished', slug: 'viaza-beige-polished', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Polished', applications: beigeApplications,
    image: extractedProductImage('beige-polished', 'main.png'), imageFit: 'contain',
    gallery: [extractedProductImage('beige-polished', 'detail.png')], galleryImageFit: 'contain',
    applicationImage: extractedProductImage('beige-polished', 'application.png'), applicationImageFit: 'contain',
    description: 'The polished finish transforms VIAZA Limestone Beige into a refined and luminous architectural surface. Through meticulous polishing, the stone gains a smooth touch and an elegant sheen that intensifies its warm beige tones, reveals its subtle natural details, and enhances the surrounding light. When properly sealed, its smooth surface also facilitates routine maintenance and provides greater comfort for interior applications. Combining visual depth, durability, and timeless sophistication, it is particularly suited to prestigious floors, wall coverings, staircases, and decorative features.',
    detailHeading: 'VIAZA Limestone – Polished Finish',
    stoneDetails: extractedStoneDetails('Polished'),
  }),
  createProduct({
    name: 'Viaza Beige Rustic', slug: 'viaza-beige-rustic', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Rustic', applications: beigeApplications,
    image: extractedProductImage('beige-rustic', 'main.png'), imageFit: 'contain',
    gallery: [extractedProductImage('beige-rustic', 'detail.png')], galleryImageFit: 'contain',
    applicationImage: extractedProductImage('beige-rustic', 'application.png'), applicationImageFit: 'contain',
    description: 'The  Aged  enhances VIAZA Limestone Beige with a naturally weathered appearance, celebrating the authentic character of Moroccan limestone. Carefully treated to soften its edges and gently texture its surface, the stone acquires a warm, timeworn aesthetic that highlights its subtle tonal variations and natural depth. Its matte finish creates a welcoming atmosphere while offering excellent slip resistance, making it an ideal choice for both indoor and outdoor applications. Combining timeless charm, durability, and architectural authenticity, it is perfectly suited for terraces, courtyards, pool surrounds, heritage restorations, and elegant contemporary spaces seeking a genuine natural character.',
    detailHeading: 'VIAZA Limestone – RUSTIC Finish',
    stoneDetails: extractedStoneDetails('RUSTIC'),
  }),
  createProduct({ name: 'Viaza Beige Light Bush-Ham', slug: 'viaza-beige-light-bush-ham', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Light Bush-Ham', applications: beigeApplications, description: 'High-density Viaza Beige limestone with a gently textured finish for soft grip and an elegant natural look.' }),
  createProduct({
    name: 'Viaza Beige Zola', slug: 'viaza-beige-zola', type: 'Viaza Limestone', material: 'Limestone', color: 'Greige Beige', finish: 'Zola', applications: beigeApplications,
    image: extractedProductImage('beige-zola', 'main.png'), imageFit: 'contain',
    gallery: [extractedProductImage('beige-zola', 'detail.png')], galleryImageFit: 'contain',
    applicationImage: extractedProductImage('beige-zola', 'application.png'), applicationImageFit: 'contain',
    description: 'A fine-grained greige stone that combines timeless elegance with remarkable versatility. ZOLA Greige is distinguished by its soft beige-grey tones and subtle fossil character, evoking the quiet beauty of stone shaped by time. Its naturally muted surface lends itself particularly well to old-world and heritage-inspired architecture, where authenticity, warmth, and a sense of history define the space. Ideal for restorations as well as new projects seeking a traditional atmosphere, ZOLA Greige brings depth and character without appearing overly rustic. From courtyards and historic residences to façades, flooring, staircases, and classical interiors, it creates an enduring architectural mood rooted in tradition and natural elegance.',
    detailHeading: 'VIAZA Limestone – ZOLA Greige',
    stoneDetails: extractedStoneDetails('ZOLA GEIGE'),
  }),
  createProduct({ name: 'Viaza Beige Striated', slug: 'viaza-beige-striated', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Striated', applications: beigeApplications, description: 'Viaza Beige limestone with continuous parallel lines that add depth and a modern architectural texture.' }),
  createProduct({ name: 'Viaza Beige Tumbled LBR', slug: 'viaza-beige-tumbled-lbr', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Tumbled LBR', applications: beigeApplications, description: 'Viaza Beige limestone in a tumbled LBR finish for a softly weathered material expression.' }),
  createProduct({
    name: 'Viaza Beige Tumbled', slug: 'viaza-beige-tumbled', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Tumbled', applications: beigeApplications,
    image: extractedProductImage('beige-tumbled', 'main.png'), imageFit: 'contain',
    thumbnail: extractedProductImage('beige-tumbled', 'thumbnail.png'),
    gallery: [
      extractedProductImage('beige-tumbled', 'detail.png'),
      extractedProductImage('beige-tumbled', 'detail-two.png'),
      extractedProductImage('beige-tumbled', 'floor.png'),
    ],
    galleryImageFit: 'contain',
    applicationImage: extractedProductImage('beige-tumbled', 'application.png'), applicationImageFit: 'contain',
    detailHeading: 'VIAZA Limestone – Tumbled Finish',
    description: 'The Tumbled finish brings a soft, naturally aged character to VIAZA Limestone Beige, creating a surface that evokes the charm and authenticity of time-worn stone. Through a carefully controlled tumbling process, the edges are gently softened and the surface acquires subtle variations that enhance the limestone’s natural texture without losing its distinctive beige tones. This finish offers a warm, understated appearance while providing good slip resistance and durability, making it particularly well suited to both indoor and outdoor settings. Combining traditional character with architectural versatility, the Tumbled finish is an excellent choice for courtyards, terraces, pathways, pool surrounds, patios, and heritage-inspired projects where natural warmth, authenticity, and timeless elegance are essential.',
    stoneDetails: extractedStoneDetails('Tumbled'),
  }),
  createProduct({
    name: 'Viaza Beige Split-Face', slug: 'viaza-beige-split-face', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Split-Face', applications: beigeApplications,
    image: extractedProductImage('beige-split-face', 'main.jpg'), imageFit: 'contain',
    thumbnail: extractedProductImage('beige-split-face', 'detail.jpg'),
    gallery: [extractedProductImage('beige-split-face', 'detail.jpg')], galleryImageFit: 'contain',
    applicationImage: extractedProductImage('beige-split-face', 'application.jpeg'), applicationImageFit: 'contain',
    detailHeading: 'VIAZA Limestone – Split-Face Finish',
    description: 'The Split-Face finish brings out the raw and expressive character of VIAZA Limestone Beige through a naturally fractured surface rich in texture, depth, and subtle relief. Each piece reveals unique irregularities and tonal variations, emphasizing the authentic mineral identity of the stone and giving every installation a distinctive architectural presence. Its rugged texture creates a striking interplay of light and shadow while offering excellent durability for both interior and exterior applications. Combining natural strength with timeless aesthetics, this finish is particularly suited for façades, feature walls, boundary walls, fireplaces, landscaping, and architectural projects seeking a bold yet authentic connection to natural stone.',
    stoneDetails: extractedStoneDetails('Split-Face'),
  }),
  createProduct({ name: 'Viaza Beige Atlas-TMR', slug: 'viaza-beige-atlas-tmr', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Atlas-TMR', applications: beigeApplications, description: 'High-density Viaza Beige limestone in the Atlas-TMR finish.' }),
  createProduct({ name: 'Viaza Beige Sandblasted-BRP', slug: 'viaza-beige-sandblasted-brp', type: 'Viaza Limestone', material: 'Limestone', color: 'Luminous Beige', finish: 'Sandblasted-BRP', applications: beigeApplications, image: '/images/products/v2/detail/viaza-beige-sandblasted-brp.png', thumbnail: '/images/products/v2/thumb/viaza-beige-sandblasted-brp.png', description: 'High-density Viaza Beige limestone in a sandblasted finish with a refined textured surface.' }),
  createProduct({
    name: 'Viaza Grey Polished', slug: 'viaza-grey-polished', type: 'Viaza Limestone', material: 'Limestone', color: 'Refined Grey', finish: 'Polished', applications: greyApplications,
    image: extractedProductImage('grey-polished', 'main.jpg'), imageFit: 'contain', gallery: [extractedProductImage('grey-polished', 'detail.png')], galleryImageFit: 'contain',
    applicationImage: extractedProductImage('grey-polished', 'application.jpeg'), applicationImageFit: 'contain', detailHeading: 'VIAZA Limestone Grey – Polished Finish',
    description: 'The polished finish brings out the refined character of VIAZA Limestone Grey, transforming its naturally balanced grey tones into a smooth and sophisticated architectural surface. Through precise polishing, the stone develops an elegant sheen that enhances its subtle mineral variations, reveals the depth of its natural details, and interacts beautifully with surrounding light. Its sleek surface creates a sense of continuity and refinement while remaining durable and easy to maintain when properly sealed. Combining the authentic character of Moroccan limestone with a contemporary and prestigious appearance, this finish is particularly suited to elegant interior floors, wall cladding, staircases, reception areas, and distinctive architectural spaces where natural stone and modern sophistication come together.',
    stoneDetails: extractedStoneDetails('Polished'),
  }),
  createProduct({
    name: 'Viaza Grey Aged', slug: 'viaza-grey-rustic', type: 'Viaza Limestone', material: 'Limestone', color: 'Refined Grey', finish: 'Aged', applications: greyApplications,
    image: extractedProductImage('grey-aged', 'main.jpg'), imageFit: 'contain', gallery: [extractedProductImage('grey-aged', 'detail.png')], galleryImageFit: 'contain',
    applicationImage: extractedProductImage('grey-aged', 'application.png'), applicationImageFit: 'contain', detailHeading: 'VIAZA Limestone Grey – Aged Finish',
    description: 'The Aged finish reveals the timeless soul of VIAZA Limestone Grey, giving the stone the distinctive character of surfaces shaped naturally by time. Its gently weathered texture, softened appearance, and subtle grey tonal variations evoke the atmosphere of historic residences, traditional courtyards, old Mediterranean architecture, and carefully restored heritage spaces. The ageing process enhances the stone’s natural depth while preserving the authentic mineral character of Moroccan limestone, creating a surface that feels established rather than newly installed. Rich in character yet remarkably versatile, this finish blends naturally with both classical architecture and contemporary projects inspired by traditional materials. It is particularly suited to courtyards, terraces, entrance halls, heritage restorations, wall cladding, traditional residences, and architectural spaces seeking an authentic sense of history, permanence, and understated elegance.',
    stoneDetails: extractedStoneDetails('Aged'),
  }),
  createProduct({
    name: 'Viaza Grey Light Bush-Hammered', slug: 'viaza-grey-light-bush-ham', type: 'Viaza Limestone', material: 'Limestone', color: 'Refined Grey', finish: 'Light Bush-Hammered', applications: greyApplications,
    image: extractedProductImage('grey-light-bush-hammered', 'main.jpg'), imageFit: 'contain', gallery: [extractedProductImage('grey-light-bush-hammered', 'detail.png')], galleryImageFit: 'contain',
    applicationImage: extractedProductImage('grey-light-bush-hammered', 'application.jpg'), applicationImageFit: 'contain', detailHeading: 'VIAZA Limestone Grey – Light Bush-Hammered Finish',
    description: 'The Light Bush-Hammered finish enhances the natural character of VIAZA Limestone Grey through a finely textured surface that adds subtle depth while preserving the stone’s soft grey tones and authentic mineral variations. The delicate mechanical treatment creates a refined relief, giving the surface a more tactile and naturally matte appearance without overwhelming its original character. Its lightly textured finish improves grip and provides excellent durability, making it particularly suitable for areas where aesthetics and functionality must work together. Combining understated texture, architectural versatility, and the timeless appeal of Moroccan limestone, this finish is an excellent choice for terraces, walkways, pool surrounds, façades, staircases, and contemporary spaces seeking a refined yet naturally textured surface.',
    stoneDetails: extractedStoneDetails('Light Bush-Hammered'),
  }),
  createProduct({
    name: 'Viaza Aldo Grey', slug: 'viaza-grey-rustic-aldo', type: 'Viaza Limestone', material: 'Limestone', color: 'Refined Grey', finish: 'Rustic-Aldo', applications: greyApplications,
    image: extractedProductImage('grey-aldo', 'main.jpeg'), imageFit: 'contain', gallery: [extractedProductImage('grey-aldo', 'detail.png')], galleryImageFit: 'contain',
    applicationImage: extractedProductImage('grey-aldo', 'application.png'), applicationImageFit: 'contain', detailHeading: 'VIAZA Aldo Grey',
    description: [
      'VIAZA Aldo Grey is a distinctive Moroccan natural stone characterized by its refined grey tones, subtle mineral variations, and naturally expressive character. Its balanced appearance combines understated elegance with the authentic depth of natural stone, allowing each surface to reveal unique nuances and details.',
      'With its timeless grey palette and strong architectural versatility, Aldo Grey integrates seamlessly into both contemporary and traditional environments. Its neutral tones create a sophisticated foundation for minimalist interiors while equally complementing heritage-inspired and Mediterranean architecture.',
      'Combining natural beauty, durability, and architectural character, VIAZA Aldo Grey is particularly suited to flooring, wall cladding, façades, staircases, terraces, courtyards, and distinctive design features where authenticity, material depth, and timeless elegance are essential.',
    ],
    stoneDetails: extractedStoneDetails('Rustic'),
  }),
  createProduct({
    name: 'Viaza Blue Tuda', slug: 'viaza-grey-tuda-light', type: 'Viaza Limestone', material: 'Limestone', color: 'Refined Grey', finish: 'Tuda Light', applications: greyApplications,
    image: extractedProductImage('blue-tuda', 'main.png'), imageFit: 'contain', gallery: [extractedProductImage('blue-tuda', 'detail.png')], galleryImageFit: 'contain',
    applicationImage: extractedProductImage('blue-tuda', 'application.png'), applicationImageFit: 'contain', detailHeading: 'VIAZA Blue Tuda',
    description: [
      'Deep blue-grey hues and a distinctive mineral character give VIAZA Blue Tuda a remarkably contemporary identity. Naturally nuanced, its surface shifts subtly between cooler and deeper tones, creating visual movement while retaining the understated elegance of authentic Moroccan stone.',
      'Its architectural strength lies in this balance between character and simplicity. Blue Tuda can define a space without overpowering it, bringing depth to modern interiors, sophisticated façades, and outdoor environments. Its mineral palette pairs naturally with wood, glass, concrete, and metal, offering architects considerable freedom in combining materials and creating contrasts.',
      'Elegant, durable, and expressive, VIAZA Blue Tuda lends itself beautifully to floors, façades, wall cladding, staircases, terraces, and bespoke architectural elements. A stone with a strong identity, designed for projects where natural material becomes an essential part of the architectural expression.',
    ],
    stoneDetails: extractedStoneDetails('honed'),
  }),
  createProduct({
    name: 'Viaza Blue Tuda Rustic', slug: 'viaza-grey-rustic-tuda', type: 'Viaza Limestone', material: 'Limestone', color: 'Refined Grey', finish: 'Rustic Tuda', applications: greyApplications,
    image: extractedProductImage('blue-tuda-rustic', 'main.png'), imageFit: 'contain', gallery: [extractedProductImage('blue-tuda-rustic', 'detail.png')], galleryImageFit: 'contain',
    applicationImage: extractedProductImage('blue-tuda-rustic', 'application.png'), applicationImageFit: 'contain', detailHeading: 'VIAZA Blue Tuda – Rustic Finish',
    description: [
      'The Rustic finish reveals a more expressive side of VIAZA Blue Tuda, bringing its distinctive blue-grey palette to life through a naturally textured and timeworn surface. Subtle irregularities, softened details, and shifting mineral tones give the stone an authentic presence, as though it had evolved naturally within the architecture over time.',
      'Rich in texture yet balanced in appearance, this finish creates a strong connection between material and place. Its aged character works beautifully in Mediterranean and heritage-inspired settings, while the depth of its blue-grey tones offers an original contrast within contemporary architecture.',
      'With its combination of natural character, durability, and timeless appeal, VIAZA Blue Tuda – Rustic Finish is particularly suited to courtyards, terraces, pathways, façades, wall cladding, traditional residences, and architectural projects seeking the distinctive beauty of genuinely characterful Moroccan stone.',
    ],
    stoneDetails: extractedStoneDetails('Rustic'),
  }),
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

const productDisplayOrder = [
  'viaza-beige-raw',
  'viaza-beige-polished',
  'viaza-beige-bush-hammered',
  'viaza-beige-rustic',
  'viaza-beige-split-face',
  'viaza-beige-zola',
  'viaza-beige-tumbled',
  'viaza-grey-polished',
  'viaza-grey-light-bush-ham',
  'viaza-grey-rustic',
  'viaza-grey-rustic-aldo',
  'viaza-grey-tuda-light',
  'viaza-grey-rustic-tuda',
]

const productDisplayPriority = new Map(productDisplayOrder.map((slug, index) => [slug, index]))

// Viaza Limestone entries need the complete visual story before publishing.
// Travertine and Moroccan Marble retain their existing two-image product pages.
export const products = allProducts
  .filter((product) => product.gallery.length > 0 || product.type === 'Moroccan Marble')
  .sort((first, second) => (productDisplayPriority.get(first.slug) ?? Number.MAX_SAFE_INTEGER) - (productDisplayPriority.get(second.slug) ?? Number.MAX_SAFE_INTEGER))

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}
