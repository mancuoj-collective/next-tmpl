import type { User } from 'better-auth'

import { SettingsCard } from '@/components/dashboard/settings/card'
import { Button } from '@/components/shadcn/button'
import { getProviderId, getSession } from '@/lib/auth/utils'

export async function AccountIdentities() {
  const session = await getSession()
  if (!session?.user.id) {
    return null
  }

  const providerId = await getProviderId(session.user.id)
  if (!providerId) {
    return null
  }

  return (
    <SettingsCard title="Account Identities">
      {providerId === 'credential' && <EmailIdentity user={session.user} />}
      {providerId === 'github' && <GithubIdentity user={session.user} />}
    </SettingsCard>
  )
}

function EmailIdentity({ user }: { user: User }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="iconify carbon--email size-7 md:size-8 text-muted-foreground" />
        <div className="flex flex-col gap-1">
          <p className="text-sm">Email</p>
          <p className="text-muted-foreground text-xs">{user.email}</p>
        </div>
      </div>
      <Button variant="outline" size="xs">
        Reset password
      </Button>
    </div>
  )
}

function GithubIdentity({ user }: { user: User }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <span className="iconify carbon--logo-github size-7 md:size-8 text-muted-foreground" />
        <div className="flex flex-col gap-1">
          <p className="text-sm">GitHub</p>
          <p className="text-muted-foreground text-xs">{user.name} • {user.email}</p>
        </div>
      </div>
    </div>
  )
}
