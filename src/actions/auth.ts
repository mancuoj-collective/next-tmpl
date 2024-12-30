'use server'

import { AuthError } from 'next-auth'

import { signIn } from '@/lib/auth'

// eslint-disable-next-line unused-imports/no-unused-vars
export async function loginGithub(prevState: string | undefined) {
  try {
    await signIn('github', { redirectTo: '/' })
  } catch (error) {
    if (error instanceof AuthError) {
      return error.message
    }
    throw error
  }
}
