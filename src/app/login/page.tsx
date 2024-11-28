import Link from 'next/link'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { getCurrentSession } from '@/db/cookie'
import { globalGETRateLimit } from '@/db/rate-limit'

export default async function Page() {
  const ok = await globalGETRateLimit()
  if (!ok) {
    return 'Too many requests'
  }

  const { user } = await getCurrentSession()
  if (user !== null) {
    return redirect('/')
  }

  return (
    <>
      <h1 className="mb-10 font-lora text-3xl font-semibold">Next.js Starter Template</h1>
      <Button asChild>
        <Link href="/login/github">
          <div className="i-mingcute-github-line size-4" />
          Sign in with GitHub
        </Link>
      </Button>
    </>
  )
}
