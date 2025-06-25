import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { Toaster } from '@/components/shadcn/sonner'
import { ThemeProvider } from '@/components/theme/provider'

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <NuqsAdapter>
        {children}
      </NuqsAdapter>
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  )
}
