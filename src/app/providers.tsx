import { Toaster } from '@/components/shadcn/sonner'
import { ThemeProvider } from '@/components/theme/provider'

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  )
}
