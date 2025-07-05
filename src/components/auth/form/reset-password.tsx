'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { redirect, useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type z from 'zod'

import { FormPasswordInput } from '@/components/form/password-input'
import { FormSubmitButton } from '@/components/form/submit-button'
import { Form } from '@/components/shadcn/form'
import { resetPassword } from '@/lib/auth/client'

import { resetPasswordSchema } from './schema'

export function ResetPasswordForm() {
  const router = useRouter()
  const [token] = useQueryState('token', { defaultValue: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
    },
    mode: 'onTouched',
  })

  if (!token) {
    return redirect('/')
  }

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    await resetPassword({
      newPassword: values.password,
      token,
    }, {
      onRequest: () => {
        setIsSubmitting(true)
      },
      onSuccess: () => {
        // TODO: auto sign in
        router.push('/sign-in')
        toast.success('New password saved successfully!')
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
        <FormPasswordInput
          form={form}
          name="password"
          placeholder="••••••••"
        />
        <FormSubmitButton isSubmitting={isSubmitting} submittingText="Saving...">
          Save New Password
        </FormSubmitButton>
      </form>
    </Form>
  )
}
