import Link from 'next/link'

import { Button } from '@/components/shadcn/button'

export default function NotFound() {
  return (
    <div className="flex h-svh flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 Not Found</h1>
      <Button variant="outline" asChild className="mt-8">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  )
}
