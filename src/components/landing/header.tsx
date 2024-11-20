'use client'

import Link from 'next/link'

import { DarkModeToggle } from '@/components/theme'

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
      <div className="flex h-16 items-center justify-between gap-2 px-4 md:px-12 lg:px-20">
        <Link href="/" className="flex items-center gap-2 font-serif text-lg font-semibold">
          <span className="i-simple-icons-nextdotjs text-xl" />
          Next Tmpl
        </Link>
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <a href="https://github.com/mancuoj-collective/next-tmpl" className="i-mingcute-github-line size-5" target="_blank" rel="noreferrer" />
        </div>
      </div>
    </header>
  )
}
