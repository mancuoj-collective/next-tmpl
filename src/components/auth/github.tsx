'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/shadcn/button'
import { signIn } from '@/lib/auth/client'
import { cn } from '@/lib/cn'

export function Github() {
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
            onError: (ctx) => {
              toast.error(ctx.error.message || 'Unknown error.')
              setIsLoading(false)
            },
          },
        )
      }}
      disabled={isLoading}
    >
      <span
        className={cn(
          'iconify size-4',
          isLoading ? 'animate-spin tabler--loader' : 'carbon--logo-github',
        )}
      />
      Continue with GitHub
    </Button>
  )
}
