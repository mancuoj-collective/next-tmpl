import type { User } from 'better-auth'

import { SettingsCard } from '@/components/dashboard/settings/card'
import { Button } from '@/components/shadcn/button'
import { Input } from '@/components/shadcn/input'

interface ProfileInformationProps {
  user: User
}

export function ProfileInformation({ user }: ProfileInformationProps) {
  return (
    <SettingsCard title="Profile Information">
      <div className="grid md:grid-cols-12 items-center gap-2.5 p-4 md:px-6 border-b">
        <span className="col-span-4 text-sm opacity-70">Display Name</span>
        <Input
          defaultValue={user.name}
          className="col-span-8 h-8 text-xs"
        />
      </div>
      <div className="flex items-center justify-end gap-2.5 p-4 md:px-6">
        <Button variant="outline" size="xs">Cancel</Button>
        <Button variant="default" size="xs">Save</Button>
      </div>
    </SettingsCard>
  )
}
