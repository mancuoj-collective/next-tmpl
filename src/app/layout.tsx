import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Geist_Mono, Inter, Lora } from 'next/font/google'

import { cn } from '@/lib/utils'

import { AppProvider } from './provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' })

export const metadata: Metadata = {
  title: 'Next Tmpl',
  description: 'Next Generation Next.js Starter Template',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(inter.variable, geistMono.variable, lora.variable)}>
      <body className={cn('font-sans antialiased')}>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){var e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,t=localStorage.getItem("use-dark")||'"system"';('"dark"'===t||e&&'"light"'!==t)&&document.documentElement.classList.toggle("dark",!0)}();`,
          }}
        />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
