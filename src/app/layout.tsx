import '@/styles/globals.css'

import type { Metadata } from 'next'
import { Inter, Lora } from 'next/font/google'
import Script from 'next/script'

import { cn } from '@/lib/utils'

import { AppProvider } from './provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
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
    <html lang="en" suppressHydrationWarning className={cn(inter.variable, lora.variable)}>
      <body className={cn('font-sans antialiased')}>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){var e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,t=localStorage.getItem("use-dark")||'"system"';('"dark"'===t||e&&'"light"'!==t)&&document.documentElement.classList.toggle("dark",!0)}();`,
          }}
        />
        <AppProvider>{children}</AppProvider>
        <Script src="https://umami.mancuoj.me/script.js" data-website-id="9cde861b-be6c-4678-81f5-0bb142d1da23" />
      </body>
    </html>
  )
}
