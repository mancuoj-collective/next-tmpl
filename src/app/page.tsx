'use client'

import { LandingHeader } from '@/components/landing'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <LandingHeader />
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="mb-10 font-lora text-3xl font-semibold">Next.js Starter Template</h1>
        <div className="flex items-center gap-3">
          <Button>
            Get Started
          </Button>
          <Button variant="outline" asChild>
            <a href="https://github.com/mancuoj-collective/next-tmpl" target="_blank" rel="noreferrer">
              <div className="i-mingcute-github-line size-4" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
