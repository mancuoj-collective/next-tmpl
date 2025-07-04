'use client'

import type { User } from 'better-auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { SettingsCard } from '@/components/dashboard/settings/card'
import { Button } from '@/components/shadcn/button'
import { Input } from '@/components/shadcn/input'
import { updateUser } from '@/lib/auth/client'

import { AvatarCropper } from './avatar-cropper'

interface ProfileInformationProps {
  user: User
}

export function ProfileInformation({ user }: ProfileInformationProps) {
  const [displayName, setDisplayName] = useState(user.name)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSavedName, setLastSavedName] = useState(user.name)
  const router = useRouter()

  async function handleSubmit() {
    await updateUser({
      name: displayName,
    }, {
      onRequest: () => {
        setIsSubmitting(true)
      },
      onResponse: () => {
        setIsSubmitting(false)
      },
      onSuccess: () => {
        setLastSavedName(displayName)
        router.refresh()
        toast.success('Saved successfully!')
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || 'Unknown error.')
      },
    })
  }

  return (
    <SettingsCard title="Profile Information">
      <AvatarCropper user={user} />
      <div className="grid md:grid-cols-12 items-center gap-2.5 p-4 md:px-6 border-b">
        <span className="col-span-5 text-xs md:text-sm ml-0.5">Display Name</span>
        <Input
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          className="col-span-7 h-8 text-xs"
        />
      </div>
      <div className="flex items-center justify-end gap-2.5 p-4 md:px-6">
        <Button
          variant="outline"
          size="xs"
          onClick={() => setDisplayName(lastSavedName)}
          disabled={isSubmitting || displayName === lastSavedName}
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          size="xs"
          onClick={handleSubmit}
          disabled={isSubmitting || displayName === lastSavedName || displayName === ''}
        >
          {isSubmitting && <span className="iconify tabler--loader-2 animate-spin" />}
          <span>Save</span>
        </Button>
      </div>
    </SettingsCard>
  )
}
