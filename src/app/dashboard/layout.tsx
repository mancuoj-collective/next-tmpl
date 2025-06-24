import Link from 'next/link'

import { UserMenu } from '@/components/auth/user-menu'
import { Logo } from '@/components/logo'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-svh w-svw flex-col">
      <header className="flex h-12 items-center justify-between border-b px-4">
        <Link href="/">
          <Logo className="size-5" />
        </Link>
        <UserMenu />
      </header>
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
