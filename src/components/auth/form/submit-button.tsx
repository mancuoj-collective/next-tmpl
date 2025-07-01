import type { ComponentProps } from 'react'

import { Button } from '@/components/shadcn/button'

interface FormSubmitButtonProps extends ComponentProps<typeof Button> {
  isSubmitting?: boolean
  submittingText?: string
  children: React.ReactNode
}

export function FormSubmitButton({
  isSubmitting,
  submittingText,
  children,
  ...props
}: FormSubmitButtonProps) {
  return (
    <Button type="submit" disabled={isSubmitting} {...props}>
      {isSubmitting && <span className="iconify size-4 animate-spin tabler--loader-2" />}
      <span>{isSubmitting ? submittingText : children}</span>
    </Button>
  )
}
