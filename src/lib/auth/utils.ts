import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

import { db } from '@/lib/db'
import { account } from '@/lib/db/schema'

import { auth } from '.'

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}

export async function getProviderId(userId: string) {
  const accounts = await db
    .select({
      providerId: account.providerId,
    })
    .from(account)
    .where(eq(account.userId, userId))
    .limit(1)

  if (accounts.length === 0) {
    return ''
  }

  return accounts[0].providerId
}
