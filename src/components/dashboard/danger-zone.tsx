import { cn } from '@/lib/cn'

import { SettingCard } from './setting-card'

export function DangerZone() {
  return (
    <SettingCard title="Danger Zone">
      <div className={cn(
        'w-full rounded-lg p-4 text-sm text-card-foreground flex gap-3',
        'bg-destructive/3 dark:bg-destructive/8 border border-destructive/20 dark:border-destructive/40',
      )}
      >
        <div className={cn(
          'flex items-center justify-center size-6 rounded shrink-0',
          'bg-destructive dark:bg-destructive/50',
        )}
        >
          <span className="iconify tabler--alert-triangle size-4 text-background" />
        </div>
        <div className="flex flex-col">
          <p className="font-medium">Request for account deletion</p>
          <p className="text-muted-foreground text-xs mt-1">
            Permanently remove your account and all of its contents from the platform. This action is not reversible, so please continue with caution.
          </p>
          <button
            type="button"
            className={cn(
              'mt-2.5 text-xs w-42 py-1 border border-destructive/20 rounded text-foreground cursor-pointer',
              'bg-destructive/8 hover:bg-destructive/12 dark:bg-destructive/15 dark:hover:bg-destructive/20',
            )}
          >
            Request to delete account
          </button>
        </div>
      </div>
    </SettingCard>
  )
}
