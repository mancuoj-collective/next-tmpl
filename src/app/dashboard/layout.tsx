'use client'

import { DashboardSidebar } from '@/components/dashboard/sidebar'
import { UserMenu } from '@/components/dashboard/user-menu'
import { Button } from '@/components/shadcn/button'
import { SidebarProvider, SidebarTrigger } from '@/components/shadcn/sidebar'
import { siteConfig } from '@/config/site'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/cn'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex-1 flex flex-col">
        <header className={cn(
          'flex h-16 items-center justify-end px-4 border-b sticky top-0 z-10',
          isMobile && 'justify-between border-none',
        )}
        >
          {isMobile && <SidebarTrigger />}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="text-xs rounded-full" asChild>
              <a href={`${siteConfig.repo}/issues/new`} target="_blank" rel="noopener noreferrer">
                Feedback
              </a>
            </Button>
            <UserMenu />
          </div>
        </header>
        <div className="flex-1 min-h-0 overflow-y-auto">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
