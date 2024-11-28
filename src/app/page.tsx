import { redirect } from 'next/navigation'

import { Logout } from '@/components/auth/logout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { getCurrentSession } from '@/db/cookie'
import { globalGETRateLimit } from '@/db/rate-limit'

export default async function Page() {
  const ok = await globalGETRateLimit()
  if (!ok) {
    return 'Too many requests'
  }

  const { user } = await getCurrentSession()
  if (user === null) {
    return redirect('/login')
  }

  return (
    <Card className="w-full max-w-[350px] px-3 md:max-w-lg">
      <CardContent className="relative flex items-center gap-4 py-5">
        <Avatar className="size-14 md:size-16">
          <AvatarImage src={`https://avatars.githubusercontent.com/u/${user.githubId}`} alt="GitHub avatar" />
          <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="space-y-1 md:space-y-2">
          <h2 className="truncate text-base font-semibold md:text-xl">{user.username}</h2>
          <p className="truncate text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="absolute right-3 top-5">
          <Logout />
        </div>
      </CardContent>
    </Card>
  )
}
