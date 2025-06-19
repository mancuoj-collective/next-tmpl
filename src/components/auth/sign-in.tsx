'use client'

import { useState } from 'react'

import { Button } from '@/components/shadcn/button'
import { signIn } from '@/lib/auth/client'
import { cn } from '@/lib/cn'

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Button
      variant="outline"
      onClick={async () => {
        await signIn.social(
          { provider: 'github', callbackURL: '/dashboard' },
          {
            onRequest: () => {
              setIsLoading(true)
            },
          },
        )
      }}
      disabled={isLoading}
    >
      <span
        className={cn(
          'iconify',
          isLoading ? 'animate-spin tabler--loader' : 'tabler--brand-github',
        )}
      />
      Continue with GitHub
    </Button>
  )
}
