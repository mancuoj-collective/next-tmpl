'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { Button } from '@/components/shadcn/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/form'
import { Input } from '@/components/shadcn/input'
import { requestPasswordReset } from '@/lib/auth/client'

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Must be a valid email'),
})

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
        toast(
          'Reset your password',
          {
            description: 'If you registered using your email and password, you will receive a password reset email. The password reset link expires in 10 minutes.',
            duration: 15 * 1000, // 15 seconds
            closeButton: true,
            richColors: false,
          },
        )
        router.push('/sign-in')
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || 'Unknown error')
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 text-sm">
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Email</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
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
              <span>Sending...</span>
            </>
          ) : (
            <span>Send Reset Email</span>
          )}
        </Button>
      </form>
    </Form>
  )
}
