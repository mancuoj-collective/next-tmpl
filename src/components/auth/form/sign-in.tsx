'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

import { Form } from '@/components/shadcn/form'
import { signIn } from '@/lib/auth/client'

import { FormInput } from './input'
import { FormPasswordInput } from './password-input'
import { signInSchema } from './schema'
import { FormSubmitButton } from './submit-button'

export function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  })

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    await signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: '/dashboard',
    }, {
      onRequest: () => {
        setIsSubmitting(true)
      },
      onError: (ctx) => {
        setIsSubmitting(false)
        if (ctx.error.status === 403) {
          toast.error(
            'Please check your email for a confirmation link, expires in 10 minutes.',
            {
              duration: 15 * 1000, // 15 seconds
              closeButton: true,
            },
          )
        }
        else {
          toast.error(ctx.error.message || 'Unknown error.')
        }
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 text-sm">
        <FormInput
          form={form}
          name="email"
          label="Email"
          placeholder="you@example.com"
        />

        <FormPasswordInput
          form={form}
          name="password"
          label="Password"
          placeholder="••••••••"
          forgotPasswordLink="/forgot-password"
        />

        <FormSubmitButton isSubmitting={isSubmitting} submittingText="Sign In">
          Sign In
        </FormSubmitButton>
      </form>
    </Form>
  )
}
