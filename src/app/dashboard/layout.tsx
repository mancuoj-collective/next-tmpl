'use client'

import { UserMenu } from '@/components/auth/user-menu'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { Button } from '@/components/shadcn/button'
import { SidebarProvider, SidebarTrigger } from '@/components/shadcn/sidebar'
import { siteConfig } from '@/config/site'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/cn'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 flex flex-col">
        <header className={cn(
          'flex h-16 items-center justify-end px-4 border-b static',
          isMobile && 'justify-between sticky top-0 z-10 border-none bg-background/80 backdrop-filter backdrop-blur-xl',
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
        <div className="flex-1 flex justify-center items-center">
          {children}
        </div>
      </main>
    </SidebarProvider>
  )
}
