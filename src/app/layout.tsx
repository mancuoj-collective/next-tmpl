import '@/styles/globals.css'

import type { Metadata } from 'next'
import { DM_Sans, Inter, Lora } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'

import { Header } from '@/components/header'
import { cn } from '@/lib/utils'

import { AppProvider } from './provider'

export const metadata: Metadata = {
  title: 'Next',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
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
