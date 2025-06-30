import { AccountIdentities } from '@/components/dashboard/settings/account-identities'
import { DangerZone } from '@/components/dashboard/settings/danger-zone'
import { ProfileInformation } from '@/components/dashboard/settings/profile-infomation'
import { getSession } from '@/lib/auth/utils'

export default async function SettingsPage() {
  const session = await getSession()
  if (!session) {
    return null
  }

  return (
    <div className="flex flex-col h-full p-6 lg:p-8 xl:p-10">
      <h1 className="text-2xl mb-4 md:mb-8">Settings</h1>
      <ProfileInformation user={session.user} />
      <AccountIdentities user={session.user} />
      <DangerZone />
    </div>
  )
}
