import type { User } from 'better-auth'
import { redirect } from 'next/navigation'

import { SettingsCard } from '@/components/dashboard/settings/card'
import { Button } from '@/components/shadcn/button'
import { getProviderId } from '@/lib/auth/utils'

interface AccountIdentitiesProps {
  user: User
}

export async function AccountIdentities({ user }: AccountIdentitiesProps) {
  const providerId = await getProviderId(user.id)
  if (!providerId) {
    return redirect('/sign-in')
  }

  return (
    <SettingsCard title="Account Identities">
      <div className="p-4 md:px-6">
        {providerId === 'credential' && <EmailIdentity user={user} />}
        {providerId === 'github' && <GithubIdentity user={user} />}
      </div>
    </SettingsCard>
  )
}

function EmailIdentity({ user }: { user: User }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5 md:gap-4">
        <span className="iconify carbon--email size-7 md:size-8 text-muted-foreground" />
        <div className="flex flex-col gap-1">
          <p className="text-xs md:text-sm">Email</p>
          <p className="text-muted-foreground text-xs truncate">{user.email}</p>
        </div>
      </div>
      <Button variant="outline" size="xs">
        Change password
      </Button>
    </div>
  )
}

function GithubIdentity({ user }: { user: User }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5 md:gap-4">
        <span className="iconify carbon--logo-github size-7 md:size-8 text-muted-foreground" />
        <div className="flex flex-col gap-1">
          <p className="text-xs md:text-sm">GitHub</p>
          <p className="text-muted-foreground text-xs truncate">{user.name} • {user.email}</p>
        </div>
      </div>
    </div>
  )
}
