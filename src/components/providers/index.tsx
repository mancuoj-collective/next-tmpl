import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" storageKey="next-tmpl-theme" disableTransitionOnChange>
      {children}
      <Toaster />
    </ThemeProvider>
  )
}
