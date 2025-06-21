import Link from 'next/link'

import { Button } from '@/components/shadcn/button'
import { ThemeToggle } from '@/components/theme/toggle'

export default function Home() {
  return (
    <div className="flex h-svh flex-col items-center justify-center">
      <div className="flex items-center gap-2.5">
        <Button asChild variant="outline">
          <Link href="/sign-in">
            Sign in
          </Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard">
            Start your project
          </Link>
        </Button>
        <ThemeToggle />
      </div>
    </div>
  )
}
