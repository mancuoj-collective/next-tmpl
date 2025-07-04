import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient()

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  requestPasswordReset,
  resetPassword,
  updateUser,
  changePassword,
  deleteUser,
  revokeSession,
} = authClient
