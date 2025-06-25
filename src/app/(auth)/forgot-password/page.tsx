'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

import { Button } from '@/components/shadcn/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/form'
import { Input } from '@/components/shadcn/input'

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Must be a valid email'),
})

export default function ForgotPasswordPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
  })

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
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
      loading: 'Sending reset email...',
      success: 'Reset email sent successfully',
      error: error => error.message || 'Unknown error',
    })
  }

  return (
    <div className="flex w-[333px] flex-col md:w-[400px]">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="-m-0.5 text-2xl font-semibold lg:text-3xl">
          Reset Your Password
        </h1>
        <p className="text-sm text-muted-foreground">
          Type in your email and we&apos;ll send you a link to reset your password
        </p>
      </div>
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
      <div className="my-8 text-center text-sm">
        <span className="text-foreground/70">
          Already have an account?{' '}
        </span>
        <Link href="/sign-in" className="underline hover:text-muted-foreground">
          Sign In
        </Link>
      </div>
    </div>
  )
}
