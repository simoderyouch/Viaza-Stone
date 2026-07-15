'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'

export type SelectOption = {
  label: string
  value: string
  detail?: string
}

export function CustomSelect({
  options,
  value,
  onChange,
  name,
  placeholder = 'Select an option',
  invalid = false,
}: {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  name?: string
  placeholder?: string
  invalid?: boolean
}) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const selected = options.find((option) => option.value === value)

  useEffect(() => {
    if (!open) return

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsideClick)
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return (
    <div ref={root} className="relative">
      {name && <input type="hidden" name={name} value={value} />}
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-haspopup="listbox"
        aria-invalid={invalid || undefined}
        onClick={() => setOpen((isOpen) => !isOpen)}
        className={`flex min-h-12 w-full items-center justify-between border bg-[#f7f5f0] px-4 py-3 text-left text-sm transition ${invalid ? 'border-red-700' : open ? 'border-[#282828]' : 'border-stone-300'} hover:border-[#282828]`}
      >
        <span className={selected ? 'text-[#292b2c]' : 'text-stone-500'}>{selected?.label || placeholder}</span>
        <span className={`ml-4 grid size-5 shrink-0 place-items-center border border-stone-300 text-[#282828] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true">
          <svg width="9" height="6" viewBox="0 0 10 6" fill="none"><path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.2" /></svg>
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            id={listboxId}
            role="listbox"
            className="viaza-dropdown-scrollbar absolute z-30 mt-2 max-h-64 w-full overflow-y-auto border border-stone-300 bg-[#f7f5f0] py-1.5 shadow-xl shadow-stone-900/15"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {options.map((option) => {
              const isSelected = option.value === value
              return (
                <li key={option.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value)
                      setOpen(false)
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-stone-200 ${isSelected ? 'bg-[#e8e6df]' : ''}`}
                  >
                    <span className={`size-1.5 shrink-0 rounded-full ${isSelected ? 'bg-[#a0937b]' : 'bg-stone-400'}`} aria-hidden="true" />
                    <span>
                      <span className="block text-sm text-[#292b2c]">{option.label}</span>
                      {option.detail && <span className="mt-0.5 block text-xs text-stone-500">{option.detail}</span>}
                    </span>
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
