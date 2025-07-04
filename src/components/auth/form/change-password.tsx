'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type z from 'zod'

import { Form } from '@/components/shadcn/form'
import { Skeleton } from '@/components/shadcn/skeleton'
import { changePassword, useSession } from '@/lib/auth/client'

import { FormPasswordInput } from './password-input'
import { changePasswordSchema } from './schema'
import { FormSubmitButton } from './submit-button'

export function ChangePasswordForm() {
  const { data: session, isPending } = useSession()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
    mode: 'onTouched',
  })

  if (isPending) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="w-full h-14.5" />
        <Skeleton className="w-full h-14.5" />
        <Skeleton className="w-full h-9" />
      </div>
    )
  }

  if (!session) {
    return redirect('/')
  }

  async function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    await changePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      revokeOtherSessions: true,
    }, {
      onRequest: () => {
        setIsSubmitting(true)
      },
      onSuccess: () => {
        router.push('/dashboard')
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
          name="currentPassword"
          label="Current password"
          placeholder="••••••••"
          showToggleButton={false}
        />
        <FormPasswordInput
          form={form}
          name="newPassword"
          label="New password"
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
