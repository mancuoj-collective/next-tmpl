'use server'

import { headers } from 'next/headers'

import { auth } from '.'

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}

export async function listSessions() {
  const sessions = await auth.api.listSessions({
    headers: await headers(),
  })
  return sessions
}

export async function getProviderId(userId: string) {
  const ctx = await auth.$context
  const account = await ctx.internalAdapter.findAccountByUserId(userId)
  if (account.length === 0) {
    return ''
  }
  return account[0].providerId
}
