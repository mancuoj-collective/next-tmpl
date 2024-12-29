// https://github.com/amannn/next-intl/blob/main/examples/example-app-router-without-i18n-routing/src/services/locale.ts
'use server'

import { cookies } from 'next/headers'

import type { Locale } from '@/i18n/config'
import { defaultLocale } from '@/i18n/config'

const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale() {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value || defaultLocale
}

export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, locale)
}
