import type { Locale } from '@/i18n/config'
import { applicationGroups, applicationImages } from '@/data/applications'

const copy = {
  en: {
    eyebrow: 'Application gallery',
    title: 'Natural stone for every architectural surface.',
    description: 'From refined limestone flooring and terraces to expressive interior walls and enduring facades, Viaza Stone adapts naturally to every architectural surface.',
    ctaEyebrow: 'Project enquiry',
    ctaTitle: 'Have a stone application in mind?',
    cta: 'Contact / Request a Quote',
    groups: applicationGroups,
  },
  fr: {
    eyebrow: 'Galerie d’applications',
    title: 'La pierre naturelle au service de chaque surface architecturale.',
    description: 'Des sols et terrasses en calcaire aux murs intérieurs expressifs et façades durables, Viaza Stone s’intègre naturellement à chaque surface architecturale.',
    ctaEyebrow: 'Demande de projet',
    ctaTitle: 'Vous avez une application pierre en tête ?',
    cta: 'Contact / Demander un devis',
    groups: [
      { id: 'flooring', title: 'Sols & terrasses', description: 'La pierre naturelle apporte un caractère durable aux intérieurs raffinés, espaces d’accueil, terrasses, abords de piscine et seuils soigneusement détaillés.' },
      { id: 'travertine', title: 'Travertin', description: 'Le travertin apporte un mouvement minéral chaleureux et un caractère tactile aux murs intérieurs, éléments hôteliers, habillages extérieurs et architectures monumentales.' },
      { id: 'interior-walls', title: 'Murs intérieurs & éléments signatures', description: 'Le travertin, le calcaire et les pierres texturées apportent profondeur aux murs signatures, cheminées, espaces hôteliers et détails architecturaux éclairés.' },
      { id: 'facades', title: 'Façades & extérieurs', description: 'Le parement en pierre donne aux architectures résidentielles, commerciales et culturelles une présence extérieure durable, façonnée par la texture, l’échelle et les tons naturels.' },
    ],
  },
  ar: {
    eyebrow: 'معرض التطبيقات',
    title: 'حجر طبيعي لكل سطح معماري.',
    description: 'من أرضيات وتراسات الحجر الجيري الراقية إلى الجدران الداخلية التعبيرية والواجهات المتينة، تتكيف فيازا ستون مع كل سطح معماري.',
    ctaEyebrow: 'استفسار عن مشروع',
    ctaTitle: 'هل لديك تطبيق حجري في ذهنك؟',
    cta: 'تواصل معنا / اطلب عرض سعر',
    groups: [
      { id: 'flooring', title: 'الأرضيات والتراسات', description: 'تضيف الأرضيات الحجرية طابعًا متينًا إلى المساحات الداخلية الراقية والضيافة والتراسات ومحيط المسابح وتفاصيل المداخل.' },
      { id: 'travertine', title: 'الترافرتين', description: 'يمنح الترافرتين حركة معدنية دافئة وطابعًا ملمسيًا للجدران الداخلية والعناصر الفندقية والكسوات الخارجية والعمارة المميزة.' },
      { id: 'interior-walls', title: 'الجدران الداخلية والعناصر المميزة', description: 'يمنح الترافرتين والحجر الجيري والحجر المزخرف عمقًا للجدران المميزة والمدافئ والمساحات الفندقية والتفاصيل المعمارية المضاءة.' },
      { id: 'facades', title: 'الواجهات والمساحات الخارجية', description: 'تمنح الكسوة الحجرية العمارة السكنية والتجارية والثقافية حضورًا خارجيًا دائمًا، يتشكل بالملمس والمقياس والدرجات الطبيعية.' },
    ],
  },
} as const

export function getApplicationsCopy(locale: Locale) {
  return copy[locale]
}

export function getLocalizedApplicationImages(locale: Locale) {
  if (locale === 'en') return applicationImages
  const labels = locale === 'fr'
    ? ['Sol en calcaire dans un intérieur raffiné', 'Sol en calcaire dans un espace commercial', 'Détail de sol en pierre vieillie', 'Terrasse repas en calcaire', 'Terrasse en calcaire vieilli', 'Terrasse de piscine en pierre naturelle', 'Seuil de porte en calcaire', 'Habillage intérieur en travertin', 'Mur en travertin éclairé', 'Mur signature d’hôtel', 'Mur de cheminée en pierre texturée', 'Mur intérieur en carreaux de pierre', 'Façade de cinéma en pierre', 'Habillage extérieur en travertin', 'Architecture contemporaine revêtue de pierre', 'Résidence habillée de pierre', 'Extérieur commercial en pierre', 'Façade en pierre grise']
    : ['أرضية من الحجر الجيري في مساحة راقية', 'أرضية من الحجر الجيري في مساحة تجارية', 'تفاصيل أرضية من حجر معتق', 'تراس لتناول الطعام من الحجر الجيري', 'تراس من الحجر الجيري المعتق', 'تراس مسبح من الحجر الطبيعي', 'تفاصيل عتبة من الحجر الجيري', 'كسوة داخلية من الترافرتين', 'جدار ترافرتين مضاء', 'جدار مميز في فندق', 'مدفأة من حجر مزخرف', 'جدار داخلي من بلاطات الحجر', 'واجهة سينما حجرية', 'كسوة خارجية من الترافرتين', 'عمارة معاصرة مكسوة بالحجر', 'منزل مكسو بالحجر', 'واجهة تجارية حجرية', 'واجهة من الحجر الرمادي']

  return applicationImages.map((image, index) => ({ ...image, title: labels[index] }))
}
