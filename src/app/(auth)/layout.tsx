import Link from 'next/link'

import { Button } from '@/components/shadcn/button'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-svh items-center justify-center relative">
      <Button variant="ghost" size="sm" className="fixed z-10 top-4 left-4 rounded-xl" asChild>
        <Link href="/" className="flex items-center text-muted-foreground">
          <span className="iconify carbon--chevron-left size-3.5" />
          Home
        </Link>
      </Button>
      {children}
    </div>
  )
}
