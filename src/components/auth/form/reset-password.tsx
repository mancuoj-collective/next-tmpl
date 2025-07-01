'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { redirect, useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type z from 'zod'

import { Form } from '@/components/shadcn/form'
import { resetPassword } from '@/lib/auth/client'

import { FormPasswordInput } from './password-input'
import { resetPasswordSchema } from './schema'
import { FormSubmitButton } from './submit-button'

export function ResetPasswordForm() {
  const router = useRouter()
  const [token] = useQueryState('token', {
    defaultValue: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
    },
    mode: 'onTouched',
  })

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    const promise = resetPassword({
      newPassword: values.password,
      token,
    }, {
      onRequest: () => {
        setIsSubmitting(true)
      },
      onSuccess: () => {
        // TODO: auto sign in
        router.push('/sign-in')
      },
      onError: () => {
        setIsSubmitting(false)
      },
    })

    toast.promise(promise, {
      loading: 'Saving new password...',
      success: 'New password saved successfully!',
      error: error => error.message || 'Unknown error.',
    })
  }

  if (!token) {
    return redirect('/sign-in')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 text-sm">
        <FormPasswordInput
          form={form}
          name="password"
          placeholder="••••••••"
          showToggleButton={false}
        />
        <FormSubmitButton isSubmitting={isSubmitting} submittingText="Saving...">
          Save New Password
        </FormSubmitButton>
      </form>
    </Form>
  )
}
