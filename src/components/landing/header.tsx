'use client'

import Link from 'next/link'

import { DarkModeToggle } from '@/components/theme'

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
      <div className="flex h-20 items-center justify-between gap-2 px-6 md:px-16 lg:px-28">
        <Link href="/" className="i-simple-icons-nextdotjs size-6" />
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <a href="https://github.com/mancuoj-collective/next-tmpl" className="i-mingcute-github-line size-5" target="_blank" rel="noreferrer" />
        </div>
      </div>
    </header>
  )
}
