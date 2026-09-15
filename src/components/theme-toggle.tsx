'use client'

type ThemeToggleProps = {
  isDark: boolean
  onToggle: () => void
  compact?: boolean
}

export function ThemeToggle({ isDark, onToggle, compact = false }: ThemeToggleProps) {
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className={compact
        ? 'flex w-full items-center justify-between border border-white/15 px-4 py-3 text-[0.68rem] font-light tracking-[0.13em] text-white uppercase transition hover:border-[#d4c5aa] hover:text-[#d4c5aa]'
        : 'grid size-9 place-items-center border border-white/40 text-white transition hover:border-[#d4c5aa] hover:text-[#d4c5aa] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#d4c5aa]'}
    >
      {compact && <span>{isDark ? 'Light mode' : 'Dark mode'}</span>}
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}

function SunIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 2.5v2.1M12 19.4v2.1M21.5 12h-2.1M4.6 12H2.5M18.72 5.28l-1.49 1.49M6.77 17.23l-1.49 1.49M18.72 18.72l-1.49-1.49M6.77 6.77 5.28 5.28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.6 15.35A8.9 8.9 0 0 1 8.65 3.4 8.9 8.9 0 1 0 20.6 15.35Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
