'use client'

import { Github } from '@/components/auth/github'
import { Separator } from '@/components/shadcn/separator'

export function SocialAuth() {
  return (
    <>
      <Github />
      <div className="flex w-full items-center justify-center overflow-hidden my-4">
        <Separator />
        <span className="px-2 text-sm text-muted-foreground">or</span>
        <Separator />
      </div>
    </>
  )
}
