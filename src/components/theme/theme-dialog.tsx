'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useConfig } from '@/hooks/use-config'
import { useDark } from '@/hooks/use-dark'
import { cn } from '@/lib/utils'

import { ThemeCustomizer } from './theme-customizer'

export function ThemeDialog() {
  const [config] = useConfig()
  const { isDark } = useDark()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="i-carbon-color-palette" />
      </DialogTrigger>
      <DialogContent
        className={cn('w-96 rounded-lg md:w-[450px]', `theme-${config.color}`, { dark: isDark })}
        style={{ '--radius': `${config.radius}rem` } as React.CSSProperties}
      >
        <DialogTitle>
          Customize
          <DialogDescription>
            Pick a style for the template.
          </DialogDescription>
        </DialogTitle>
        <ThemeCustomizer />
      </DialogContent>
    </Dialog>
  )
}
