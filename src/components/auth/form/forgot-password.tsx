'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type z from 'zod'

import { FormInput } from '@/components/form/input'
import { FormSubmitButton } from '@/components/form/submit-button'
import { Form } from '@/components/shadcn/form'
import { requestPasswordReset } from '@/lib/auth/client'

import { forgotPasswordSchema } from './schema'

export function ForgotPasswordForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
  })

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    await requestPasswordReset({
      email: values.email,
      redirectTo: '/reset-password',
    }, {
      onRequest: () => {
        setIsSubmitting(true)
      },
      onSuccess: () => {
        router.push('/sign-in')
        toast(
          'Reset your password',
          {
            description: 'If you registered using your email and password, you will receive a password reset email. The password reset link expires in 10 minutes.',
            duration: 15 * 1000, // 15 seconds
            closeButton: true,
            richColors: false,
          },
        )
      },
      onError: (ctx) => {
        setIsSubmitting(false)
        toast.error(ctx.error.message || 'Unknown error.')
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 text-sm">
        <FormInput
          form={form}
          name="email"
          label="Email"
          placeholder="you@example.com"
        />
        <FormSubmitButton isSubmitting={isSubmitting} submittingText="Sending...">
          Send Reset Email
        </FormSubmitButton>
      </form>
    </Form>
  )
}
