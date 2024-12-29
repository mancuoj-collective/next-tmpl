'use client'

import { useTranslations } from 'next-intl'

import { LoginForm } from '@/components/login-form'

export default function LoginPage() {
  const t = useTranslations('login')

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-semibold">
        {t('title')}
      </h1>
      <LoginForm />
    </div>
  )
}
