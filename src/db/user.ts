import { eq } from 'drizzle-orm'

import { db } from '.'
import { userTable } from './schema'

export async function createUser(githubId: number, email: string, username: string) {
  const user = await db.insert(userTable).values({
    githubId,
    email,
    username,
  }).returning()
  if (user[0] === null) {
    throw new Error('Unexpected error creating user')
  }
  return user[0]
}

export async function getUserByGithubId(githubId: number) {
  const user = await db.select().from(userTable).where(eq(userTable.githubId, githubId))
  return user[0] ?? null
}
