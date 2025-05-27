import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { fontMono, fontSans, fontSerif } from '@/config/font'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Next',
  description: 'Next.js template lite version',
  icons: {
    icon: '/next.svg',
    shortcut: '/next.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          fontSans.variable,
          fontMono.variable,
          fontSerif.variable,
          'font-sans antialiased',
        )}
      >
        <ThemeProvider attribute="class" storageKey="next-tmpl-theme" disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
