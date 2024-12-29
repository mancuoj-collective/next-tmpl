import '@/styles/globals.css'

import type { Metadata } from 'next'
import { DM_Sans, Inter, Lora } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

import { Header } from '@/components/header'
import { site } from '@/config/site'
import { cn } from '@/lib/utils'

import { AppProvider } from './provider'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: site.keywords,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    title: site.name,
    description: site.description,
    siteName: site.name,
    images: '/og.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    images: '/twitter.png',
    site: site.url,
    creator: site.author,
  },
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })
const dm = DM_Sans({ subsets: ['latin'], variable: '--font-dm' })

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn('font-dm antialiased', inter.variable, lora.variable, dm.variable)}>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){var e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,t=localStorage.getItem("use-dark")||'"system"';('"dark"'===t||e&&'"light"'!==t)&&document.documentElement.classList.toggle("dark",!0)}();`,
          }}
        />
        <NextIntlClientProvider messages={messages}>
          <AppProvider>
            <div className="relative flex min-h-svh flex-col">
              <Header />
              <main className="wrapper grid-bg flex flex-1">{children}</main>
            </div>
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
