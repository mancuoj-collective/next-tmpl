'use client'

import Link from 'next/link'
import { useEffect } from 'react'

import { Button } from '@/components/shadcn/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-svh flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">500 Server Error</h1>
      <div className="mt-8 flex items-center gap-2.5">
        <Button variant="outline" onClick={reset}>
          Refersh
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
