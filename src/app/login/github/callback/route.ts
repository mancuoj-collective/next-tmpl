import type { OAuth2Tokens } from 'arctic'
import ky from 'ky'
import { cookies } from 'next/headers'

import { setSessionTokenCookie } from '@/db/cookie'
import { github } from '@/db/oauth'
import { globalGETRateLimit } from '@/db/rate-limit'
import { createSession, generateSessionToken } from '@/db/session'
import { createUser, getUserByGithubId } from '@/db/user'

export async function GET(request: Request): Promise<Response> {
  const ok = await globalGETRateLimit()
  if (!ok) {
    return new Response('Too many requests', { status: 429 })
  }

  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const cookieStore = await cookies()
  const storedState = cookieStore.get('github_oauth_state')?.value ?? null

  if (code === null || state === null || storedState === null || state !== storedState) {
    return new Response('Please restart the process.', { status: 400 })
  }

  let tokens: OAuth2Tokens
  try {
    tokens = await github.validateAuthorizationCode(code)
  }
  catch {
    return new Response('Please verify your GitHub account.', { status: 400 })
  }
  const githubAccessToken = tokens.accessToken()

  const { id: githubUserId, login: username } = await ky('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${githubAccessToken}`,
    },
  }).json<{ id: number, login: string }>()

  const existingUser = await getUserByGithubId(githubUserId)
  if (existingUser !== null) {
    const sessionToken = generateSessionToken()
    const session = await createSession(sessionToken, existingUser.id)
    await setSessionTokenCookie(sessionToken, session.expiresAt)
    return new Response(null, { status: 302, headers: { Location: '/' } })
  }

  const emailListResult = await ky('https://api.github.com/user/emails', {
    headers: {
      Authorization: `Bearer ${githubAccessToken}`,
    },
  }).json<{ email: string, primary: boolean, verified: boolean }[]>()
  const email = emailListResult.find(email => email.primary && email.verified)?.email ?? null
  if (email === null) {
    return new Response('Please verify your GitHub email address.', { status: 400 })
  }

  const user = await createUser(githubUserId, email, username)
  const sessionToken = generateSessionToken()
  const session = await createSession(sessionToken, user.id)
  await setSessionTokenCookie(sessionToken, session.expiresAt)
  return new Response(null, { status: 302, headers: { Location: '/' } })
}
