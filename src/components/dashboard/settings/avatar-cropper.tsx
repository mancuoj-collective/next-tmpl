'use client'

import type { User } from 'better-auth'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn/avatar'

interface AvatarCropperProps {
  user: User
}

export function AvatarCropper({ user }: AvatarCropperProps) {
  return (
    <div className="flex justify-between items-center gap-2.5 p-4 md:px-6 border-b">
      <span className="text-xs md:text-sm ml-0.5">Avatar</span>
      <div className="flex items-center gap-2.5">
        <Avatar className="size-9 md:size-10 rounded-full border-2 border-dashed select-none">
          <AvatarImage src={user.image || undefined} alt={user.name || 'Avatar'} />
          <AvatarFallback className="text-xs md:text-sm">{user.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
