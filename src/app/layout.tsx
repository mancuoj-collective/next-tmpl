import '@/globals.css'

import type { Metadata } from 'next'
import { DM_Sans, Inter, Lora } from 'next/font/google'

import { cn } from '@/lib/utils'

import { AppProvider } from './provider'

export const metadata: Metadata = {
  title: 'Next',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })
const dm = DM_Sans({ subsets: ['latin'], variable: '--font-dm' })

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', inter.variable, lora.variable, dm.variable)}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
