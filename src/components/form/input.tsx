import type { InputHTMLAttributes } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/shadcn/form'
import { Input } from '@/components/shadcn/input'

interface FormInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'form'> {
  form: UseFormReturn<any>
  name: string
  label?: string
}

export function FormInput({
  form,
  name,
  label,
  ...props
}: FormInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel className="text-muted-foreground">{label}</FormLabel>}
          <div className="relative">
            <FormControl>
              <Input {...field} {...props} />
            </FormControl>
            {fieldState.invalid && (
              <span className="absolute top-1/2 right-2 iconify size-5 -translate-y-1/2 text-destructive tabler--alert-circle" />
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
