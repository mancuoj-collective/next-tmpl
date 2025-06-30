import type { User } from 'better-auth'

import { SettingsCard } from '@/components/dashboard/settings/card'
import { Input } from '@/components/shadcn/input'

interface ProfileInformationProps {
  user: User
}

export function ProfileInformation({ user }: ProfileInformationProps) {
  return (
    <SettingsCard title="Profile Information">
      <div className="grid md:grid-cols-12 items-center gap-2.5">
        <span className="col-span-4 text-sm text-muted-foreground">Display Name</span>
        <Input
          defaultValue={user.name}
          className="col-span-8 h-8 text-sm focus-visible:ring-2 focus-visible:ring-accent"
        />
      </div>
    </SettingsCard>
  )
}
