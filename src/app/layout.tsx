import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import Link from 'next/link'
import Script from 'next/script'

import { DarkModeToggle } from '@/components/theme'
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
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', inter.variable, lora.variable)}>
        {env.NODE_ENV === 'production' && (
          <Script src={siteConfig.umamiUrl} data-website-id={siteConfig.umamiId} />
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){var e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,t=localStorage.getItem("use-dark")||'"system"';('"dark"'===t||e&&'"light"'!==t)&&document.documentElement.classList.toggle("dark",!0)}();`,
          }}
        />
        <AppProvider>
          <div className="relative flex min-h-svh flex-col">
            <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg">
              <div className="flex h-20 items-center justify-between gap-2 px-6 md:px-16 lg:px-28">
                <Link href="/" className="i-simple-icons-nextdotjs size-6" />
                <div className="flex items-center gap-3">
                  <DarkModeToggle />
                  <a href="https://github.com/mancuoj-collective/next-tmpl" className="i-mingcute-github-line size-5" target="_blank" rel="noreferrer" />
                </div>
              </div>
            </header>
            <div className="flex flex-1 flex-col items-center justify-center">
              {children}
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  )
}
