import Link from 'next/link'
import type { InputHTMLAttributes } from 'react'
import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/form'
import { Input } from '@/components/shadcn/input'
import { cn } from '@/lib/cn'

interface FormPasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'form' | 'type'> {
  form: UseFormReturn<any>
  name: string
  label?: string
  forgotPasswordLink?: string
  showToggleButton?: boolean
}

export function FormPasswordInput({
  form,
  name,
  label = 'Password',
  forgotPasswordLink,
  showToggleButton = false,
  ...props
}: FormPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            {label && <FormLabel className="text-muted-foreground">{label}</FormLabel>}
            {forgotPasswordLink && (
              <Link href={forgotPasswordLink} tabIndex={-1} className="text-sm text-muted-foreground/75 tracking-tight leading-none select-none">
                Forgot Password?
              </Link>
            )}
          </div>
          <div className="relative">
            <FormControl>
              <Input
                type={showPassword ? 'text' : 'password'}
                {...field}
                {...props}
              />
            </FormControl>
            {fieldState.invalid && (
              <span className={cn(
                'absolute top-1/2 iconify size-5 -translate-y-1/2 text-destructive tabler--alert-circle',
                showToggleButton ? 'right-12' : 'right-2',
              )}
              />
            )}
            {showToggleButton && (
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
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
