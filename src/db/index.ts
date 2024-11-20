import type { Client } from '@libsql/client'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

import { env } from '@/config/env'

const globalForDb = globalThis as unknown as {
  client: Client | undefined
}

const client = globalForDb.client ?? createClient({ url: env.DATABASE_URL })
if (env.NODE_ENV !== 'production') {
  globalForDb.client = client
}

export const db = drizzle({ client })
