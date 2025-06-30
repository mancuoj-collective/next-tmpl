'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { redirect, useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type z from 'zod'

import { Button } from '@/components/shadcn/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/form'
import { Input } from '@/components/shadcn/input'
import { resetPassword } from '@/lib/auth/client'

import { resetPasswordSchema } from './schema'

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
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    {...field}
                  />
                </FormControl>
                {fieldState.invalid && (
                  <span className="absolute top-1/2 right-2 iconify size-5 -translate-y-1/2 text-destructive tabler--alert-circle" />
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="iconify size-4 animate-spin tabler--loader-2" />
              <span>Saving...</span>
            </>
          ) : (
            <span>Save New Password</span>
          )}
        </Button>
      </form>
    </Form>
  )
}
