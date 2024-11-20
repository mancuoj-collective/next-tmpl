import { sql } from 'drizzle-orm'
import {
  int,
  sqliteTableCreator,
  text,
} from 'drizzle-orm/sqlite-core'

export const createTable = sqliteTableCreator(name => `tmpl_${name}`)

export const users = createTable('user', {
  id: text('id', { length: 255 }).notNull().primaryKey(),
  name: text('name', { length: 255 }),
  email: text('email', { length: 255 }).notNull(),
  emailVerified: int('email_verified', { mode: 'timestamp' }).default(sql`(unixepoch())`),
  image: text('image'),
})
