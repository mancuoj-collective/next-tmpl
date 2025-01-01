'use server'

import { AuthError } from 'next-auth'

import { signIn } from '@/lib/auth'

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
