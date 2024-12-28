'use client'

import { signIn } from 'next-auth/react'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [isPending, startTransition] = useTransition()

  const handleSignIn = (provider: string) => {
    startTransition(async () => {
      await signIn(provider, { callbackUrl: '/' })
    })
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Button disabled={isPending} onClick={() => { handleSignIn('github') }}>
        {
          isPending ? <span className="i-carbon-circle-dash animate-spin" /> : <span className="i-carbon-logo-github" />
        }
        Countinue with GitHub
      </Button>
    </div>
  )
}