'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CheckCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/alert'
import { Form } from '@/components/shadcn/form'
import { signUp } from '@/lib/auth/client'
import { cn } from '@/lib/cn'

import { FormInput } from './input'
import { FormPasswordInput } from './password-input'
import { signUpSchema } from './schema'
import { FormSubmitButton } from './submit-button'

export function SignUpForm() {
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
          onFocus={() => setShowPasswordRequirements(true)}
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

        <FormSubmitButton isSubmitting={isSubmitting} submittingText="Sign Up">
          Sign Up
        </FormSubmitButton>
      </form>
    </Form>
  )
}
