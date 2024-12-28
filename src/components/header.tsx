'use client'

import Link from 'next/link'

import { DarkModeToggle, ThemeDialog } from '@/components/theme'

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background/80 px-12 backdrop-blur md:px-36">
      <Link href="/" className="i-simple-icons-nextdotjs text-xl" />
      <div className="flex items-center gap-3">
        <ThemeDialog />
        <DarkModeToggle />
        <a href="https://github.com/mancuoj-collective/next-tmpl" className="i-carbon-logo-github" />
      </div>
    </header>
  )
}
