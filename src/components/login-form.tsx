'use client'

import { useTranslations } from 'next-intl'
import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

import { loginGithub } from '@/actions/auth'

import { Button } from './ui/button'

export function LoginForm() {
  const t = useTranslations('LoginPage')
  const [error, formAction, isPending] = useActionState(loginGithub, undefined)

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return (
    <form action={formAction}>
      <Button disabled={isPending}>
        {
          isPending ? <span className="i-carbon-circle-dash animate-spin" /> : <span className="i-carbon-logo-github" />
        }
        {t('github')}
      </Button>
    </form>
  )
}
