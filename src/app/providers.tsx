import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { Toaster } from '@/components/shadcn/sonner'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme/provider'

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <NuqsAdapter>
        {children}
        <TailwindIndicator />
        <Toaster position="top-right" richColors />
      </NuqsAdapter>
    </ThemeProvider>
  )
}
