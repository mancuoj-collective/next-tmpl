'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/alert'
import { Button } from '@/components/shadcn/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/shadcn/form'
import { Input } from '@/components/shadcn/input'
import { signUp } from '@/lib/auth/client'
import { cn } from '@/lib/cn'

import { signUpSchema } from './schema'

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  })

  const password = form.watch('password')
  const passwordRequirements = [
    { label: 'Uppercase letter', isMet: /[A-Z]/.test(password), show: true },
    { label: 'Lowercase letter', isMet: /[a-z]/.test(password), show: true },
    { label: 'Number', isMet: /\d/.test(password), show: true },
    { label: 'Special character (e.g. !?<>@#$%)', isMet: /[^\w\s]/.test(password), show: true },
    { label: '8 characters or more', isMet: password.length >= 8, show: true },
    { label: '72 characters or less', isMet: password.length <= 72, show: password.length > 72 },
  ]

  function onSubmit(values: z.infer<typeof signUpSchema>) {
    const promise = signUp.email({
      email: values.email,
      password: values.password,
      name: values.email,
    }, {
      onRequest: () => {
        setIsSubmitting(true)
      },
      onSuccess: () => {
        setIsSubmitted(true)
      },
      onError: () => {
        setIsSubmitting(false)
      },
    })

    toast.promise(promise, {
      loading: 'Signing up...',
      success: 'Signed up successfully!',
      error: error => error.message || 'Unknown error.',
    })
  }

  if (isSubmitted) {
    return (
      <Alert>
        <CheckCircleIcon />
        <AlertTitle>Check your email to confirm</AlertTitle>
        <AlertDescription>
          You've successfully signed up. Please check your email to confirm your account before signing in to the dashboard. The confirmation link expires in 10 minutes.
        </AlertDescription>
      </Alert>
    )
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
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...field}
                    onFocus={() => setShowPasswordRequirements(true)}
                  />
                </FormControl>
                {fieldState.invalid && (
                  <span className="absolute top-1/2 right-12 iconify size-5 -translate-y-1/2 text-destructive tabler--alert-circle" />
                )}
                <button
                  type="button"
                  className="absolute top-1/2 right-2 z-5 inline-flex -translate-y-1/2 cursor-pointer items-center justify-center rounded border border-input px-2 py-1"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  aria-controls="password"
                >
                  {
                    showPassword
                      ? <span className="iconify size-4 tabler--eye" aria-hidden="true" />
                      : <span className="iconify size-4 tabler--eye-off" aria-hidden="true" />
                  }
                </button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {showPasswordRequirements && (
          <div className={cn(
            'animate-in duration-500 fade-in slide-in-from-top-3',
            'mb-2 flex flex-col gap-1 text-sm text-muted-foreground',
          )}
          >
            {passwordRequirements.map(({ label, isMet, show }) => (
              show && (
                <div key={label} className="flex items-center gap-1.5">
                  <span className={cn('flex size-3.5 items-center justify-center rounded-full border', isMet && 'bg-border', !show && 'bg-destructive/20')}>
                    {isMet && <span className="iconify size-2.5 tabler--check" />}
                  </span>
                  <span>{label}</span>
                </div>
              )
            ))}
          </div>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <span className="iconify size-4 animate-spin tabler--loader-2" />}
          <span>Sign Up</span>
        </Button>
      </form>
    </Form>
  )
}
