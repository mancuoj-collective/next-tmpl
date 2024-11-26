'use server'

import { redirect } from 'next/navigation'

import { deleteSessionTokenCookie, getCurrentSession } from '@/db/cookie'
import { invalidateSession } from '@/db/session'

export async function logoutAction() {
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
