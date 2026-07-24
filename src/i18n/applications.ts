import type { Locale } from '@/i18n/config'
import { applicationGroups, applicationImages } from '@/data/applications'

const copy = {
  en: {
    eyebrow: 'Application gallery',
    title: 'Natural stone for every architectural surface.',
    description: 'From timeless limestone flooring and Crazy Paving to wall cladding and enduring facades, Viaza Stone adapts naturally to interior and exterior architecture.',
    ctaEyebrow: 'Project enquiry',
    ctaTitle: 'Have a stone application in mind?',
    cta: 'Contact / Request a Quote',
    groups: applicationGroups,
  },
  fr: {
    eyebrow: 'Galerie d’applications',
    title: 'La pierre naturelle au service de chaque surface architecturale.',
    description: 'Des sols en calcaire et du Crazy Paving aux habillages muraux et façades durables, Viaza Stone s’intègre naturellement aux projets intérieurs comme extérieurs.',
    ctaEyebrow: 'Demande de projet',
    ctaTitle: 'Vous avez une application pierre en tête ?',
    cta: 'Contact / Demander un devis',
    groups: [
      { title: 'Sols & escaliers', description: 'Une beauté intemporelle pensée pour durer. Le calcaire Viaza apporte des tonalités naturelles raffinées, une texture organique et une réelle profondeur aux sols, terrasses, escaliers et abords de piscine.' },
      { title: 'Crazy Paving', description: 'Une irrégularité naturelle, une composition sans limite. Les pièces de pierre aux formes libres créent des surfaces singulières, riches de relief et profondément liées au paysage.' },
      { title: 'Murs & façades', description: 'Faire de la pierre naturelle une surface architecturale. Les revêtements Viaza donnent texture, profondeur et caractère durable aux intérieurs, salles de bains, murs signatures et élévations extérieures.' },
    ],
  },
  ar: {
    eyebrow: 'معرض التطبيقات',
    title: 'حجر طبيعي لكل سطح معماري.',
    description: 'من أرضيات الحجر الجيري الخالدة والرصف الحر إلى كسوة الجدران والواجهات المتينة، تتكيف فيازا ستون بسلاسة مع العمارة الداخلية والخارجية.',
    ctaEyebrow: 'استفسار عن مشروع',
    ctaTitle: 'هل لديك تطبيق حجري في ذهنك؟',
    cta: 'تواصل معنا / اطلب عرض سعر',
    groups: [
      { title: 'الأرضيات والسلالم', description: 'جمال خالد صُمم ليدوم. يمنح حجر فيازا الجيري درجات طبيعية راقية وملمسًا عضويًا وعمقًا ماديًا للأرضيات والتراسات والسلالم ومحيط المسابح.' },
      { title: 'الرصف الحر', description: 'عفوية طبيعية وتكوين بلا حدود. تصنع قطع الحجر غير المنتظمة أسطحًا فريدة، غنية بالشكل والملمس ومرتبطة أصالةً بالطبيعة.' },
      { title: 'الجدران والواجهات', description: 'تحويل الحجر الطبيعي إلى سطح معماري. تضيف كسوات فيازا الملمس والعمق والطابع الدائم إلى المساحات الداخلية والحمامات والجدران المميزة والواجهات الخارجية.' },
    ],
  },
} as const

export function getApplicationsCopy(locale: Locale) {
  return copy[locale]
}

export function getLocalizedApplicationImages(locale: Locale) {
  if (locale === 'en') return applicationImages
  const labels = locale === 'fr'
    ? ['Sol de salon contemporain', 'Sol en dalles de pierre', 'Sol géométrique en pierre', 'Escalier en pierre sombre', 'Escalier dans un intérieur végétal', 'Sol en pierre intérieur-extérieur', 'Sol de salon en pierre', 'Sol d’un intérieur marocain', 'Sol de cour de riad', 'Couloir en Crazy Paving', 'Bord de piscine en Crazy Paving', 'Mur intérieur en pierre', 'Façade extérieure contemporaine', 'Façade en pierre massive', 'Habillage mural intérieur', 'Habillage mural de salle de bains', 'Habillage sombre de salle de bains', 'Mur signature avec baignoire', 'Habillage de bibliothèque', 'Façade de cinéma en pierre']
    : ['أرضية غرفة معيشة عصرية', 'أرضية من بلاط الحجر', 'أرضية حجرية هندسية', 'درج من الحجر الداكن', 'درج في مساحة خضراء', 'أرضية حجرية داخلية وخارجية', 'أرضية غرفة معيشة حجرية', 'أرضية داخل مغربي', 'أرضية فناء رياض', 'ممر رصف حر', 'رصف حر بجانب المسبح', 'جدار حجري داخلي مميز', 'واجهة خارجية عصرية', 'واجهة حجرية كتلية', 'كسوة جدارية داخلية', 'كسوة جدار حمام', 'كسوة حمام داكنة', 'جدار مميز مع حوض استحمام', 'كسوة جدار مكتبة', 'واجهة سينما حجرية']

  return applicationImages.map((image, index) => ({ ...image, title: labels[index] }))
}
