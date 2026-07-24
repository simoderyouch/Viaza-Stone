import type { Locale } from '@/i18n/config'
import type { Product } from '@/data/products'

const frenchFinishes: Record<string, string> = {
  'Bush-Hammered': 'bouchardée', Raw: 'brute', Polished: 'polie', Rustic: 'rustique', 'Light Bush-Ham': 'bouchardée légère', Zola: 'Zola', Striated: 'striée', 'Tumbled LBR': 'vieillie LBR', Tumbled: 'vieillie', 'Atlas-TMR': 'Atlas-TMR', 'Sandblasted-BRP': 'sablée BRP', 'Rustic-Aldo': 'rustique Aldo', 'Tuda Light': 'Tuda clair', 'Rustic Tuda': 'rustique Tuda', 'Cosmic Tuda': 'Cosmic Tuda', 'Aldo-BHB': 'Aldo-BHB', 'Grey-TMR': 'gris TMR', 'Grey Atlas-TBR': 'gris Atlas-TBR', 'Enquire for available finishes': 'finition à définir selon disponibilité',
}

const arabicFinishes: Record<string, string> = {
  'Bush-Hammered': 'مطرقة خشنة', Raw: 'طبيعية', Polished: 'مصقولة', Rustic: 'ريفية', 'Light Bush-Ham': 'مطرقة خفيفة', Zola: 'زولا', Striated: 'مخططة', 'Tumbled LBR': 'معتّقة LBR', Tumbled: 'معتّقة', 'Atlas-TMR': 'أطلس TMR', 'Sandblasted-BRP': 'سفع رملي BRP', 'Rustic-Aldo': 'ريفية ألدو', 'Tuda Light': 'تودا فاتح', 'Rustic Tuda': 'تودا ريفي', 'Cosmic Tuda': 'تودا كوزميك', 'Aldo-BHB': 'ألدو BHB', 'Grey-TMR': 'رمادي TMR', 'Grey Atlas-TBR': 'رمادي أطلس TBR', 'Enquire for available finishes': 'التشطيبات حسب التوفر',
}

const frenchApplications: Record<string, string> = {
  Flooring: 'Sols', 'Wall cladding': 'Revêtements muraux', 'Terrace landscaping': 'Terrasses et aménagements paysagers', 'Exterior facades': 'Façades extérieures', 'Refined interiors': 'Intérieurs raffinés', 'Building facades': 'Façades de bâtiments', Gardens: 'Jardins', Walkways: 'Allées', 'Swimming pool surroundings': 'Abords de piscine', 'Feature walls': 'Murs décoratifs', 'Architectural interiors': 'Intérieurs architecturaux',
}

const arabicApplications: Record<string, string> = {
  Flooring: 'الأرضيات', 'Wall cladding': 'كسوة الجدران', 'Terrace landscaping': 'التراسات وتنسيق المساحات الخارجية', 'Exterior facades': 'الواجهات الخارجية', 'Refined interiors': 'الديكورات الداخلية الراقية', 'Building facades': 'واجهات المباني', Gardens: 'الحدائق', Walkways: 'الممرات', 'Swimming pool surroundings': 'محيط المسابح', 'Feature walls': 'الجدران المميزة', 'Architectural interiors': 'الديكورات المعمارية الداخلية',
}

function translatedDescription(product: Product, locale: Exclude<Locale, 'en'>, finish: string) {
  if (locale === 'fr') {
    if (product.name.startsWith('Viaza Beige')) return `Un calcaire marocain Viaza Beige, dense et lumineux, proposé ici dans une finition ${finish} pour apporter chaleur, relief et tenue durable aux projets intérieurs comme extérieurs.`
    if (product.name.startsWith('Viaza Grey')) return `Un calcaire marocain Viaza Grey à la tonalité minérale équilibrée, proposé dans une finition ${finish} pour une écriture architecturale sobre et durable.`
    if (product.material === 'Travertine') return `Un travertin marocain aux nuances chaudes et à la texture vivante, sélectionné pour apporter une présence naturelle et intemporelle aux espaces.`
    return `Un marbre marocain à la personnalité minérale affirmée, sélectionné pour ses veines, sa profondeur de couleur et son caractère architectural.`
  }

  if (product.name.startsWith('Viaza Beige')) return `حجر جيري مغربي من فيازا بيج، كثيف ومضيء، بهذه اللمسة ${finish} ليمنح الدفء والعمق والمتانة للمشاريع الداخلية والخارجية.`
  if (product.name.startsWith('Viaza Grey')) return `حجر جيري مغربي من فيازا غراي بدرجة معدنية متوازنة، بهذه اللمسة ${finish} لتعبير معماري هادئ يدوم طويلاً.`
  if (product.material === 'Travertine') return 'ترافرتين مغربي بدرجات دافئة وملمس حي، مختار ليمنح المساحات حضورًا طبيعيًا خالدًا.'
  return 'رخام مغربي بطابع معدني مميز، مختار لعروقه وعمق ألوانه وحضوره المعماري.'
}

export function localizeProduct(product: Product, locale: Locale): Product {
  if (locale === 'en') return product

  const isFrench = locale === 'fr'
  const finishMap = isFrench ? frenchFinishes : arabicFinishes
  const applicationMap = isFrench ? frenchApplications : arabicApplications
  const finish = finishMap[product.finishes[0]] ?? product.finishes[0]
  return {
    ...product,
    color: isFrench ? product.color.replace('Luminous Beige', 'Beige lumineux').replace('Refined Grey', 'Gris raffiné').replace('Warm Beige', 'Beige chaud').replace('Desert Beige', 'Beige désert').replace('Golden Yellow', 'Jaune doré').replace('Grey & Purple', 'Gris et violet').replace('Absolute Black', 'Noir absolu') : product.color.replace('Luminous Beige', 'بيج مضيء').replace('Refined Grey', 'رمادي راقٍ').replace('Warm Beige', 'بيج دافئ').replace('Desert Beige', 'بيج صحراوي').replace('Golden Yellow', 'أصفر ذهبي').replace('Grey & Purple', 'رمادي وبنفسجي').replace('Absolute Black', 'أسود داكن'),
    origin: isFrench ? product.origin.replace('Taza, Morocco', 'Taza, Maroc').replace('Morocco', 'Maroc') : product.origin.replace('Taza, Morocco', 'تازة، المغرب').replace('Morocco', 'المغرب'),
    description: translatedDescription(product, locale, finish),
    availability: isFrench ? 'Disponibilité sur demande' : 'التوفر عند الطلب',
    finishes: product.finishes.map((item) => finishMap[item] ?? item),
    formats: product.formats.map((item) => isFrench ? ({ Tiles: 'Dalles', Slabs: 'Tranches', 'Wall cladding': 'Revêtement mural', 'Cut-to-size': 'Découpe sur mesure' }[item] ?? item) : ({ Tiles: 'بلاطات', Slabs: 'ألواح', 'Wall cladding': 'كسوة جدارية', 'Cut-to-size': 'قص حسب المقاس' }[item] ?? item)),
    applications: product.applications.map((item) => applicationMap[item] ?? item),
    note: isFrench ? 'La pierre naturelle présente des variations de ton, de veinage et de texture. Validez toujours l’échantillon, la finition et le format retenus avant la confirmation finale.' : 'تختلف الأحجار الطبيعية في الدرجة والعروق والملمس. يرجى اعتماد العينة والتشطيب والمقاس المختار قبل التأكيد النهائي.',
  }
}
