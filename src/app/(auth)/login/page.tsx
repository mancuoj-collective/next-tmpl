'use client'

import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'

import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const t = useTranslations('login')
  const [isPending, startTransition] = useTransition()

  const handleSignIn = (provider: string) => {
    startTransition(async () => {
      await signIn(provider, { callbackUrl: '/' })
    })
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-semibold">
        {t('title')}
      </h1>
      <Button disabled={isPending} onClick={() => { handleSignIn('github') }}>
        {
          isPending ? <span className="i-carbon-circle-dash animate-spin" /> : <span className="i-carbon-logo-github" />
        }
        {t('github')}
      </Button>
    </div>
  )
}
