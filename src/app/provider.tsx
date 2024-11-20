'use client'

import * as React from 'react'

import { Toaster } from '@/components/ui/sonner'

export function AppProvider({ children }: React.PropsWithChildren) {
  return (
    <div>
      {children}
      <Toaster richColors />
    </div>
  )
}
