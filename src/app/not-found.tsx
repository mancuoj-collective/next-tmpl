import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex h-svh flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-bold">404 Not Found</h1>
      <Button variant="outline" asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}
