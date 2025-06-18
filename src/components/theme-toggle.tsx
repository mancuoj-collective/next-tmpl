'use client'

import { Button } from '@/components/ui/button'
import { useDark } from '@/hooks/use-dark'
import { cn } from '@/lib/cn'

export function ThemeToggle({ className }: { className?: string }) {
  const { toggleDark } = useDark()

  return (
    <Button variant="outline" size="icon" onClick={toggleDark} className={cn('flex', className)}>
      <span className="iconify scale-100 rotate-0 transition-transform duration-500 carbon--sun dark:scale-0 dark:-rotate-90" />
      <span className="absolute iconify scale-0 rotate-90 transition-transform duration-500 carbon--moon dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
