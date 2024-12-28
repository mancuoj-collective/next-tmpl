'use client'

import Link from 'next/link'

import { DarkModeToggle, ThemeDialog } from '@/components/theme'

export function Header() {
  return (
    <header className="border-b">
      <div className="wrapper flex h-16 items-center justify-between px-6">
        <Link href="/" className="i-simple-icons-nextdotjs text-xl" />
        <div className="flex items-center gap-3">
          <ThemeDialog />
          <DarkModeToggle />
          <a href="https://github.com/mancuoj-collective/next-tmpl" className="i-carbon-logo-github" />
        </div>
      </div>
    </header>
  )
}
