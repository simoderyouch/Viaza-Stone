type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
  inverse?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  inverse = false,
}: SectionHeadingProps) {
  const alignment = centered ? 'mx-auto text-center' : ''
  const titleColor = inverse ? 'text-white' : 'text-[#292b2c]'
  const copyColor = inverse ? 'text-stone-200' : 'text-stone-600'

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && <p className={inverse ? 'text-[0.7rem] font-bold tracking-[0.19em] text-[#d4c5aa] uppercase' : 'eyebrow'}>{eyebrow}</p>}
      <h2 className={`font-display mt-3 text-4xl leading-tight sm:text-5xl ${titleColor}`}>{title}</h2>
      <div className={`mt-5 h-0.5 w-12 bg-[#282828] ${centered ? 'mx-auto' : ''}`} />
      {description && <p className={`mt-5 text-base leading-7 ${copyColor}`}>{description}</p>}
    </div>
  )
}
