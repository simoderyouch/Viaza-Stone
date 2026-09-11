import { IconBrandWhatsapp } from '@tabler/icons-react'

const whatsappNumber = '212665256463'
const whatsappMessage = encodeURIComponent('Hello Viaza Stone, I would like to discuss a natural stone project.')

export function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Viaza Stone on WhatsApp"
      className="group fixed right-5 z-50 flex items-center gap-3 sm:right-7"
      style={{ bottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-sm bg-[#282828] px-3 py-2 text-xs font-semibold whitespace-nowrap text-white opacity-0 shadow-lg transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
      <span className="grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_rgba(0,0,0,0.24)] transition duration-200 group-hover:-translate-y-0.5 group-hover:bg-[#20bd5a] group-focus-visible:-translate-y-0.5 group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-[#25D366]">
        <IconBrandWhatsapp size={30} stroke={1.8} aria-hidden="true" />
      </span>
    </a>
  )
}
