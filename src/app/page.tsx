import { UserDropdown } from '@/components/user-dropdown'
import { auth } from '@/lib/auth'

export default async function Page() {
  const session = await auth()

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <UserDropdown session={session} />
    </div>
  )
}
