'use client'

import { Provider } from 'jotai'
import * as React from 'react'

import { Toaster } from '@/components/ui/sonner'

export function AppProvider({ children }: React.PropsWithChildren) {
  return (
    <Provider>
      {children}
      <Toaster richColors />
    </Provider>
  )
}
