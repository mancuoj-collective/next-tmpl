import '@/styles/globals.css'

import type { Metadata } from 'next'

import { fontMono, fontSans, fontSerif } from '@/config/font'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'

import { RootProvider } from './providers'

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  creator: siteConfig.author,
  metadataBase: new URL(siteConfig.origin),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.origin,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: siteConfig.og,
        alt: siteConfig.name,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.og],
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
