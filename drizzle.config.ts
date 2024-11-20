import type { Config } from 'drizzle-kit'

import { env } from '@/config/env'

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: 'tmpl_*',
} satisfies Config
