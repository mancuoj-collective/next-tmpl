import Link from 'next/link'

import { Button } from '@/components/shadcn/button'
import { ThemeToggle } from '@/components/theme-toggle'

export default function Home() {
  return (
    <div className="flex h-svh flex-col items-center justify-center">
      <div className="mt-10 flex items-center gap-2.5">
        <Button asChild variant="outline">
          <Link href="/sign-in">
            Sign in
          </Link>
        </Button>
        <Button asChild variant="outline">
          <a
            href="https://github.com/mancuoj-collective/next-tmpl"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </Button>
        <ThemeToggle />
      </div>
    </div>
  )
}
