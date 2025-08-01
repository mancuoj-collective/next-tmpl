import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    // Better Auth
    BETTER_AUTH_URL: z.string().min(1).url(),
    BETTER_AUTH_SECRET: z.string().min(1),

    // Turso DB
    TURSO_DATABASE_URL: z.string().min(1).url(),
    TURSO_AUTH_TOKEN: z.string().min(1),

    // Social Providers
    GITHUB_CLIENT_ID: z.string().min(1),
    GITHUB_CLIENT_SECRET: z.string().min(1),

    // Resend
    RESEND_API_KEY: z.string().min(1),
    RESEND_EMAIL_FROM: z.string().min(1),
  },
  client: {},
  experimental__runtimeEnv: {},
  emptyStringAsUndefined: true,
})
