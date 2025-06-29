import z from 'zod'

const emailSchema = z.string()
  .min(1, 'Email is required')
  .email('Must be a valid email')

const passwordSchema = z.string()
  .min(1, 'Password is required')
  .min(8, 'Password must be at least 8 characters')
  .max(72, 'Password cannot exceed 72 characters')
  .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
  .regex(/\d/, 'Password must contain at least 1 number')
  .regex(/[^\w\s]/, 'Password must contain at least 1 symbol')

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
})

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const resetPasswordSchema = z.object({
  password: passwordSchema,
})

export const forgotPasswordSchema = z.object({
  email: emailSchema,
})
