import * as React from 'react'

import { cn } from '@/lib/cn'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30',
        'aria-invalid:bg-destructive/4 dark:aria-invalid:bg-destructive/7',
        'aria-invalid:placeholder:text-destructive/40 dark:aria-invalid:placeholder:text-destructive/50',
        'aria-invalid:border-destructive/80 dark:aria-invalid:border-destructive/60',
        'focus-visible:aria-invalid:border-border dark:focus-visible:aria-invalid:border-border',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
