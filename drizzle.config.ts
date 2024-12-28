import type { Config } from 'drizzle-kit'

import { env } from '@/config/env'

export default {
  dialect: 'turso',
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dbCredentials: {
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
  tablesFilter: ['tmpl_*'],
} satisfies Config
