'use client'

import * as React from 'react'

import { useTheme } from '@/hooks/use-theme'

export function DarkModeToggle() {
  const { toggleDark } = useTheme()

  return (
    <button
      aria-label="toggle dark mode"
      title="toggle dark mode"
      type="button"
      onClick={toggleDark}
      className="flex items-center justify-center"
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
