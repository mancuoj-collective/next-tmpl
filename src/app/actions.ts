'use server'

import { redirect } from 'next/navigation'

import { deleteSessionTokenCookie, getCurrentSession } from '@/db/cookie'
import { globalPOSTRateLimit } from '@/db/rate-limit'
import { invalidateSession } from '@/db/session'

export async function logoutAction() {
  const ok = await globalPOSTRateLimit()
  if (!ok) {
    return {
      message: 'Rate limit exceeded',
    }
  }

  const { session } = await getCurrentSession()
  if (session === null) {
    return {
      message: 'Not authenticated',
    }
  }

  await invalidateSession(session.id)
  await deleteSessionTokenCookie()
  return redirect('/login')
}
