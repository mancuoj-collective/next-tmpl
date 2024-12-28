'use client'

import { DarkModeToggle, ThemeDialog } from '@/components/theme'

import { ProgressBar, ProgressBarLink } from './ui/progress-bar'

export function Header() {
  return (
    <ProgressBar className="fixed top-0 h-0.5 bg-primary">
      <header className="border-b">
        <div className="wrapper flex h-16 items-center justify-between px-6">
          <ProgressBarLink href="/" className="i-simple-icons-nextdotjs text-xl" />
          <div className="flex items-center gap-3">
            <ThemeDialog />
            <DarkModeToggle />
            <a href="https://github.com/mancuoj-collective/next-tmpl" className="i-carbon-logo-github" />
          </div>
        </div>
      </header>
    </ProgressBar>
  )
}
