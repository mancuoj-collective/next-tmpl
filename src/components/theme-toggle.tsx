'use client'

import { Button } from '@/components/ui/button'
import { useDark } from '@/hooks/use-dark'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { toggleDark } = useDark()

  return (
    <Button variant="outline" size="icon" onClick={toggleDark} className={cn('flex', className)}>
      <span className="iconify carbon--sun scale-100 dark:scale-0 transition-transform duration-500 rotate-0 dark:-rotate-90" />
      <span className="iconify carbon--moon absolute scale-0 dark:scale-100 transition-transform duration-500 rotate-90 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
