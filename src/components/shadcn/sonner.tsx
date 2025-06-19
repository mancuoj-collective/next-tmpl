'use client'

import type { ToasterProps } from 'sonner'
import { Toaster as Sonner } from 'sonner'

import { useDark } from '@/hooks/use-dark'

function Toaster({ ...props }: ToasterProps) {
  const { theme } = useDark()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
