import { AccountIdentities } from '@/components/dashboard/settings/account-identities'
import { ActiveSessions } from '@/components/dashboard/settings/active-sessions'
import { DangerZone } from '@/components/dashboard/settings/danger-zone'
import { ProfileInformation } from '@/components/dashboard/settings/profile-infomation'
import { getSession, listSessions } from '@/lib/auth/utils'

export default async function SettingsPage() {
  const [session, activeSessions] = await Promise.all([
    getSession(),
    listSessions(),
  ])

  if (!session || !activeSessions) {
    return null
  }

  return (
    <div className="flex flex-col p-6 lg:p-8 xl:p-10">
      <h1 className="text-2xl font-medium mb-6 md:mb-8">Settings</h1>
      <ProfileInformation user={session.user} />
      <AccountIdentities user={session.user} />
      <ActiveSessions currentSessionId={session.session.id} activeSessions={activeSessions} />
      <DangerZone user={session.user} />
    </div>
  )
}
