'use client'

import { Provider } from 'jotai'
import Script from 'next/script'
import { SessionProvider } from 'next-auth/react'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import { TwScreenIndicator } from '@/components/theme'
import { Toaster } from '@/components/ui/sonner'

export function AppProvider({ children }: React.PropsWithChildren) {
  return (
    <SessionProvider>
      <NuqsAdapter>
        <Provider>
          {/* TODO: remove it if not needed */}
          {process.env.NODE_ENV === 'production' && (
            <Script defer src="https://a.mancuoj.me/script.js" data-website-id="0ea3ffdc-bfbd-426c-b293-e163ae9ea8ce" />
          )}
          {children}
          <TwScreenIndicator />
          <Toaster richColors />
        </Provider>
      </NuqsAdapter>
    </SessionProvider>
  )
}
