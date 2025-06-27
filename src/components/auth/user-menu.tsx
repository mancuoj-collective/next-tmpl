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
  const { data, isPending } = useSession()
  const { theme, setTheme } = useTheme()

  if (isPending) {
    return <Skeleton className="size-8 rounded-full" />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="size-8 rounded-full select-none">
          <AvatarImage src={data?.user.image || undefined} alt={data?.user.name || 'Avatar'} />
          <AvatarFallback>{data?.user.name?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-54" align="end" sideOffset={8}>
        <DropdownMenuLabel>
          <p className="text-sm font-medium text-foreground">{data?.user.name}</p>
          <p className="mt-1 text-xs text-muted-foreground/80">{data?.user.email}</p>
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
              success: 'Logged out successfully',
              error: err => err.message || 'Failed to logout',
            })
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
