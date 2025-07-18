'use client'

import { useTheme } from 'next-themes'

import { Button } from '@/components/shadcn/button'
import { cn } from '@/lib/cn'

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()

  function switchTheme() {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  function toggleTheme() {
    if (!document.startViewTransition) {
      switchTheme()
    }
    document.startViewTransition(switchTheme)
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className={cn('flex', className)}>
      <span className="iconify size-4 carbon--sun scale-100 rotate-0 transition-transform duration-500  dark:scale-0 dark:-rotate-90" />
      <span className="absolute iconify size-4 carbon--moon scale-0 rotate-90 transition-transform duration-500  dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
