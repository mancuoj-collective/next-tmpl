'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/shadcn/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/form'
import { Input } from '@/components/shadcn/input'
import { signIn } from '@/lib/auth/client'

const signInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Must be a valid email'),
  password: z.string().min(1, 'Password is required'),
})

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
          toast.error(ctx.error.message || 'Unknown error')
        }
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 text-sm">
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
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-muted-foreground">Password</FormLabel>
                <Link href="/forgot-password" className="text-sm text-muted-foreground/70 tracking-tight leading-none font-medium select-none">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
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
          {isSubmitting && <span className="iconify size-4 animate-spin tabler--loader-2" />}
          <span>Sign In</span>
        </Button>
      </form>
    </Form>
  )
}
