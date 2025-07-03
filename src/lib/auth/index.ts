import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'

import { env } from '@/config/env'
import { db } from '@/lib/db'
import * as schema from '@/lib/db/schema'
import { resend } from '@/lib/resend'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 72,
    autoSignIn: false,
    resetPasswordTokenExpiresIn: 60 * 10, // 10 minutes
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: env.RESEND_EMAIL_FROM,
        to: user.email,
        subject: 'Reset your password',
        // TODO: react email template
        html: `<a href="${url}">Reset your password</a>`,
      })
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 10, // 10 minutes
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: env.RESEND_EMAIL_FROM,
        to: user.email,
        subject: 'Confirm your email address',
        // TODO: react email template
        html: `<a href="${url}">Confirm your email address</a>`,
      })
    },
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  user: {
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await resend.emails.send({
          from: env.RESEND_EMAIL_FROM,
          to: user.email,
          subject: 'Verify your account deletion',
          // TODO: react email template
          html: `<a href="${url}">Click to verify your account deletion</a>`,
        })
      },
    },
  },
  account: {
    accountLinking: {
      enabled: false,
    },
  },
  plugins: [nextCookies()],
})
