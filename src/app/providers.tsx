import { ThemeProvider } from 'next-themes'

import { Toaster } from '@/components/shadcn/sonner'

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      storageKey="next-tmpl-theme"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
  )
}
