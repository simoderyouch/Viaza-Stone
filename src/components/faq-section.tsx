type FaqItem = {
  question: string
  answer: string
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-stone-300 border-y border-stone-300">
      {items.map((item, index) => (
        <details key={item.question} className="group py-5" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-lg font-semibold text-[#282828] marker:content-none">
            {item.question}
            <span aria-hidden="true" className="text-2xl font-light transition group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-3xl pt-4 pr-10 text-sm leading-7 text-stone-600">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}
