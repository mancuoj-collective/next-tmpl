'use client'

import type { User } from 'better-auth'
import { useState } from 'react'
import { toast } from 'sonner'

import { SettingsCard } from '@/components/dashboard/settings/card'
import { Button } from '@/components/shadcn/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/dialog'
import { Input } from '@/components/shadcn/input'
import { Separator } from '@/components/shadcn/separator'
import { useIsMobile } from '@/hooks/use-mobile'
import { deleteUser } from '@/lib/auth/client'
import { cn } from '@/lib/cn'

interface DangerZoneProps {
  user: User
}

export function DangerZone({ user }: DangerZoneProps) {
  return (
    <SettingsCard title="Danger Zone">
      <div className="p-4 md:px-6">
        <div className={cn(
          'w-full rounded-lg p-4 text-xs md:text-sm space-y-4',
          'bg-destructive/3 dark:bg-destructive/8 border border-destructive/20 dark:border-destructive/40',
        )}
        >
          <div className="flex gap-2.5 md:gap-4">
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
                Permanently remove your account and all of its contents from the platform. Make sure you have made a backup if you want to keep your data. This action is not reversible, so please continue with caution.
              </p>
            </div>
          </div>
          <DeleteAccountButton user={user} />
        </div>
      </div>
    </SettingsCard>
  )
}

function DeleteAccountButton({ user }: { user: User }) {
  const [value, setValue] = useState('')
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isMobile = useIsMobile()

  async function handleSubmit() {
    await deleteUser({
      fetchOptions: {
        onRequest: () => {
          setIsSubmitting(true)
        },
        onResponse: () => {
          setIsSubmitting(false)
          setOpen(false)
          setValue('')
        },
        onSuccess: () => {
          toast('Account deletion request submitted', {
            description: 'If you registered using your email and password, you will receive an email with a link to delete your account.',
            duration: 15 * 1000, // 15 seconds
            closeButton: true,
            richColors: false,
          })
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || 'Unknown error.')
        },
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="alert" size="xs" className="ml-11">
          Request to delete account
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 gap-2.5 md:gap-4">
        <DialogHeader className="pt-4 gap-2.5 md:gap-4">
          <DialogTitle className="px-6 flex gap-2.5 items-baseline">
            <span className="text-sm md:text-base tracking-wider">Delete account</span>
            <span className="text-xs text-muted-foreground font-normal">Are you sure?</span>
          </DialogTitle>
          <Separator />
          <DialogDescription className="px-6 text-left text-xs md:text-sm">
            This action <span className="text-foreground font-medium">cannot</span> be undone. This will permanently delete the <span className="text-foreground font-medium">{user.name}'s account</span> and all of its contents from the platform.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="px-6 space-y-2">
          <p className="text-xs md:text-sm text-muted-foreground">
            Please type
            {' '}
            <span className="font-medium text-foreground">{user.email}</span>
            {' '}
            to confirm
          </p>
          <Input value={value} onChange={e => setValue(e.target.value)} className="h-6.5 md:h-8 px-2 md:px-3 text-xs" />
        </div>
        <Separator />
        <DialogFooter className="pb-4 px-6">
          <Button
            type="submit"
            variant="destructive"
            size={isMobile ? 'xs' : 'sm'}
            className="w-full"
            disabled={value !== user.email || isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting && <span className="iconify size-4 animate-spin tabler--loader-2" />}
            <span>{isSubmitting ? 'Submitting...' : 'Submit request for account deletion'}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
