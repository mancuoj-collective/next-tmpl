import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import Script from 'next/script'

import { env } from '@/config/env'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { AppProvider } from './provider'

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  metadataBase: new URL(siteConfig.url),
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(inter.variable, lora.variable)}>
      <body className={cn('font-sans antialiased')}>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){var e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,t=localStorage.getItem("use-dark")||'"system"';('"dark"'===t||e&&'"light"'!==t)&&document.documentElement.classList.toggle("dark",!0)}();`,
          }}
        />
        {env.NODE_ENV === 'production' && (
          <Script src={siteConfig.umamiUrl} data-website-id={siteConfig.umamiId} />
        )}
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
