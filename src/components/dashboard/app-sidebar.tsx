'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Logo } from '@/components/logo'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from '@/components/shadcn/sidebar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/cn'

interface NavItem {
  title: string
  url: string
  icon: string
}

const navItems: NavItem[] = [
  {
    title: 'Overview',
    url: '/dashboard',
    icon: 'tabler--chart-bar',
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: 'tabler--settings',
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const isMobile = useIsMobile()

  return (
    <Sidebar>
      <SidebarHeader className={cn(
        'flex h-16 items-center justify-center border-b',
        isMobile && 'border-none',
      )}
      >
        <Link href="/">
          <Logo className="size-7" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className={cn(
          'mt-6 gap-2',
          isMobile && 'mt-0',
        )}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.url
            if (isMobile) {
              return <SidebarNavItemMobile key={item.title} item={item} isActive={isActive} />
            }
            return <SidebarNavItem key={item.title} item={item} isActive={isActive} />
          })}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

function SidebarNavItem({ item, isActive }: { item: NavItem, isActive: boolean }) {
  return (
    <SidebarGroupContent key={item.title} className="w-full flex items-center justify-center">
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={item.url}
            className={cn(
              'flex items-center justify-center size-10 hover:bg-accent',
              isActive && 'bg-accent',
            )}
          >
            <span className={`size-5 iconify ${item.icon}`} />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8} className="bg-background text-foreground px-3 py-2 border rounded-none">
          {item.title}
        </TooltipContent>
      </Tooltip>
    </SidebarGroupContent>
  )
}

function SidebarNavItemMobile({ item, isActive }: { item: NavItem, isActive: boolean }) {
  return (
    <SidebarGroupContent key={item.title} className="px-3 flex items-center justify-center">
      <Link
        href={item.url}
        className={cn(
          'flex items-center gap-1.5 p-2 hover:bg-accent w-full',
          isActive && 'bg-accent',
        )}
      >
        <span className={`size-4 iconify ${item.icon}`} />
        <span className="text-sm">{item.title}</span>
      </Link>
    </SidebarGroupContent>
  )
}
