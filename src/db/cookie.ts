import { cookies } from 'next/headers'
import { cache } from 'react'

import { env } from '@/config/env'

import type { SessionValidationResult } from './session'
import { validateSessionToken } from './session'

export async function setSessionTokenCookie(token: string, expiresAt: Date) {
  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    expires: expiresAt,
    secure: env.NODE_ENV === 'production',
  })
}

export async function deleteSessionTokenCookie() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export const getCurrentSession = cache(async (): Promise<SessionValidationResult> => {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value ?? null
  if (token === null) {
    return { session: null, user: null }
  }
  const result = await validateSessionToken(token)
  return result
})
