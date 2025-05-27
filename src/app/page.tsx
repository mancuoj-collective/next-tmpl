import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-svh">
      <div className="flex items-center gap-2.5">
        <Button asChild variant="outline">
          <a
            href="https://github.com/mancuoj-collective/next-tmpl-lite"
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
