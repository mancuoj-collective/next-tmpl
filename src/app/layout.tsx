import '@/styles/globals.css'

import type { Metadata } from 'next'

import { fontMono, fontSans, fontSerif } from '@/config/font'
import { cn } from '@/lib/cn'

import { RootProvider } from './providers'

export const metadata: Metadata = {
  title: 'Next',
  description: 'Next.js template',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
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
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
