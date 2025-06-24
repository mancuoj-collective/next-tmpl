'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/shadcn/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/form'
import { Input } from '@/components/shadcn/input'

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

  function onSubmit(values: z.infer<typeof signInSchema>) {
    // eslint-disable-next-line no-console
    console.log(values)

    setIsSubmitting(true)
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve(true) : reject(new Error('Invalid login credentials'))
      }, 1000)
    }).finally(() => {
      setIsSubmitting(false)
    })

    toast.promise(promise, {
      loading: 'Signing in...',
      success: 'Signed in successfully',
      error: error => error.message || 'Unknown error',
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
              <FormLabel className="text-muted-foreground">Password</FormLabel>
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
