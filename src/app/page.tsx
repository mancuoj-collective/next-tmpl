'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <>
      <h1 className="mb-10 font-lora text-3xl font-semibold">Next.js Starter Template</h1>
      <Button asChild>
        <Link href="/login">
          <div className="i-mingcute-github-line size-4" />
          Sign in with GitHub
        </Link>
      </Button>
    </>
  )
}
