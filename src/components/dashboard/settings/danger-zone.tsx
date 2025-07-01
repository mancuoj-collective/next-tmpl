'use client'

import type { User } from 'better-auth'
import { useState } from 'react'
import { toast } from 'sonner'

import { SettingsCard } from '@/components/dashboard/settings/card'
import { Button } from '@/components/shadcn/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/shadcn/drawer'
import { Input } from '@/components/shadcn/input'
import { Separator } from '@/components/shadcn/separator'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/cn'

interface DangerZoneProps {
  user: User
}

export function DangerZone({ user }: DangerZoneProps) {
  return (
    <SettingsCard title="Danger Zone">
      <div className="p-4 md:px-6">
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
  const isMobile = useIsMobile()
  const [value, setValue] = useState('')

  function handleSubmit() {
    setValue('')
    toast('test')
  }

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="alert" size="xs" className="ml-11">
            Request to delete account
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col gap-4 p-0">
          <DrawerTitle className="px-6 pt-4 flex gap-2 items-baseline">
            Delete account
            <span className="text-xs text-muted-foreground font-normal">Are you sure?</span>
          </DrawerTitle>
          <Separator className="w-full" />
          <DrawerDescription className="px-6 text-sm text-muted-foreground">
            This action <span className="text-foreground">cannot</span> be undone. This will permanently delete the <span className="text-foreground">{user.name}'s account</span> and all of its contents from the platform.
          </DrawerDescription>
          <Separator className="w-full" />
          <div className="px-6 flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              Please type
              {' '}
              <span className="font-bold text-foreground">{user.email}</span>
              {' '}
              to confirm
            </p>
            <Input value={value} onChange={e => setValue(e.target.value)} className="h-8" />
          </div>
          <Separator className="w-full" />
          <DrawerFooter className="px-6 pt-0 pb-6">
            <DrawerClose asChild>
              <Button
                type="submit"
                variant="destructive"
                size="sm"
                className="w-full"
                disabled={value !== user.email}
                onClick={handleSubmit}
              >
                Submit request for account deletion
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="alert" size="xs" className="ml-11">
          Request to delete account
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogTitle className="px-6 pt-4 flex gap-2 items-baseline">
          Delete account
          <span className="text-xs text-muted-foreground font-normal">Are you sure?</span>
        </DialogTitle>
        <Separator className="w-full" />
        <DialogDescription className="px-6 text-sm text-muted-foreground">
          This action <span className="text-foreground">cannot</span> be undone. This will permanently delete the <span className="text-foreground">{user.name}'s account</span> and all of its contents from the platform.
        </DialogDescription>
        <Separator className="w-full" />
        <div className="px-6 flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Please type
            {' '}
            <span className="font-bold text-foreground">{user.email}</span>
            {' '}
            to confirm
          </p>
          <Input value={value} onChange={e => setValue(e.target.value)} className="h-8" />
        </div>
        <Separator className="w-full" />
        <DialogFooter className="px-6 pb-4">
          <DialogClose asChild>
            <Button
              type="submit"
              variant="destructive"
              size="sm"
              className="w-full"
              disabled={value !== user.email}
              onClick={handleSubmit}
            >
              Submit request for account deletion
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
