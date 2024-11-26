import type { InferSelectModel } from 'drizzle-orm'
import { index, integer, sqliteTableCreator, text } from 'drizzle-orm/sqlite-core'

export const createTable = sqliteTableCreator(name => `tmpl_${name}`)

export const userTable = createTable('user', {
  id: integer('id').notNull().primaryKey(),
  githubId: integer('github_id').notNull().unique(),
  email: text('email').notNull(),
  username: text('username').notNull(),
}, table => ({
  githubIdx: index('github_idx').on(table.githubId),
}))

export const sessionTable = createTable('session', {
  id: text('id').notNull().primaryKey(),
  userId: integer('user_id').notNull().references(() => userTable.id),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
})

export type User = InferSelectModel<typeof userTable>
export type Session = InferSelectModel<typeof sessionTable>
