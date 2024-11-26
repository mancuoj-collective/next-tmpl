import { GitHub } from 'arctic'

import { env } from '@/config/env'

export const github = new GitHub(
  env.GITHUB_CLIENT_ID,
  env.GITHUB_CLIENT_SECRET,
  env.NODE_ENV === 'production'
    ? env.CALLBACK_DOMAIN
    : 'http://localhost:3000/login/github/callback',
)
