import { cn } from '@/lib/cn'

import { Button } from '../shadcn/button'
import { SettingCard } from './setting-card'

export function DangerZone() {
  return (
    <SettingCard title="Danger Zone">
      <div className={cn(
        'w-full rounded-lg p-4 text-sm space-y-4',
        'bg-destructive/3 dark:bg-destructive/8 border border-destructive/20 dark:border-destructive/40',
      )}
      >
        <div className="flex gap-4">
          <div className={cn(
            'flex items-center justify-center size-7 rounded shrink-0 mt-0.5',
            'bg-destructive dark:bg-destructive/50',
          )}
          >
            <span className="iconify tabler--alert-triangle-filled size-4 text-background/80" />
          </div>
          <div className="flex flex-col gap-1">
            <p>Request for account deletion</p>
            <p className="text-muted-foreground text-xs">
              Permanently remove your account and all of its contents from the platform. This action is not reversible, so please continue with caution.
            </p>
          </div>
        </div>
        <DeleteAccountButton />
      </div>
    </SettingCard>
  )
}

function DeleteAccountButton() {
  return (
    <Button variant="destructive" size="xs" className="ml-12">
      Request to delete account
    </Button>
  )
}
