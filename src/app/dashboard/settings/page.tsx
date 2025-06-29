import { AccountIdentities } from '@/components/dashboard/account-identities'
import { DangerZone } from '@/components/dashboard/danger-zone'

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full p-6 lg:p-8 xl:p-10">
      <h1 className="text-2xl mb-4 md:mb-8">Settings</h1>
      <AccountIdentities />
      <DangerZone />
    </div>
  )
}
