'use client'

import { useDark } from '@/hooks/use-dark'
import { cn } from '@/lib/utils'

export function DarkModeToggle({ className }: { className?: string }) {
  const { toggleDark } = useDark()

  return (
    <button
      aria-label="toggle dark mode"
      title="toggle dark mode"
      type="button"
      onClick={toggleDark}
      className={cn('inline-flex items-center justify-center', className)}
    >
      <div
        role="img"
        aria-hidden="true"
        className="sun i-mingcute-sun-line size-5 rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0"
      />
      <div
        role="img"
        aria-hidden="true"
        className="moon i-mingcute-moon-stars-line absolute size-5 rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100"
      />
    </button>
  )
}
