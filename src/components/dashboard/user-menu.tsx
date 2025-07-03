'use client'

import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu'
import { Skeleton } from '@/components/shadcn/skeleton'
import { signOut, useSession } from '@/lib/auth/client'

export function UserMenu() {
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const { theme, setTheme } = useTheme()

  if (isPending) {
    return <Skeleton className="size-8 rounded-full" />
  }

  if (!session) {
    return null
  }

  const { user } = session
  const isRegisteredByEmail = user.name === user.email

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="size-8 rounded-full border shadow select-none">
          <AvatarImage src={user.image || undefined} alt={user.name || 'Avatar'} />
          <AvatarFallback className="text-sm">{user.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-54" align="end" sideOffset={8}>
        <DropdownMenuLabel>
          {isRegisteredByEmail ? (
            <p className="font-medium text-xs text-foreground">{user.name}</p>
          ) : (
            <>
              <p className="font-medium text-sm text-foreground">{user.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{user.email}</p>
            </>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs">Theme</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem className="text-xs" value="light">
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="text-xs" value="dark">
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="text-xs" value="system">
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-xs"
          onClick={async () => {
            const promise = signOut({
              fetchOptions: {
                onSuccess: () => {
                  router.push('/')
                  router.refresh()
                },
              },
            })
            toast.promise(promise, {
              loading: 'Logging out...',
              success: 'Logged out successfully!',
              error: err => err.message || 'Failed to logout.',
            })
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
