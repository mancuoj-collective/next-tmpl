import { DarkModeToggle } from '@/components/theme'
import { Button } from '@/components/ui/button'

export default async function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-5">
      <div className="font-dm text-2xl font-semibold">Next - Tmpl</div>
      <div className="space-x-2">
        <Button variant="outline" size="icon" asChild className="rounded-full">
          <a href="https://github.com/mancuoj-collective/next-tmpl">
            <span className="i-carbon-logo-github" />
          </a>
        </Button>
        <DarkModeToggle className="rounded-full" />
      </div>
    </div>
  )
}
