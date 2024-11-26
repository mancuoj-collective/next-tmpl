import { generateState } from 'arctic'
import { cookies } from 'next/headers'

import { env } from '@/config/env'
import { github } from '@/db/oauth'

export async function GET(): Promise<Response> {
  const state = generateState()
  const url = github.createAuthorizationURL(state, ['user:email'])
  const cookieStore = await cookies()

  cookieStore.set('github_oauth_state', state, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 10,
    secure: env.NODE_ENV === 'production',
  })

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  })
}
