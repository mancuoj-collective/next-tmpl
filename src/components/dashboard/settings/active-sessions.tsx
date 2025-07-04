'use client'

import { useTimeAgo } from '@shined/react-use'
import type { Session } from 'better-auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { UAParser } from 'ua-parser-js'

import { Badge } from '@/components/shadcn/badge'
import { Button } from '@/components/shadcn/button'
import { revokeSession } from '@/lib/auth/client'
import { cn } from '@/lib/cn'

import { SettingsCard } from './card'

interface ActiveSessionsProps {
  currentSessionId: string
  activeSessions: Session[]
}

export function ActiveSessions({ currentSessionId, activeSessions }: ActiveSessionsProps) {
  const sortedSessions = [...activeSessions].sort((a, b) => {
    if (a.id === currentSessionId)
      return -1
    if (b.id === currentSessionId)
      return 1
    return 0
  })

  return (
    <SettingsCard title="Active Sessions">
      {sortedSessions.map(session => (
        <SessionItem
          key={session.id}
          session={session}
          isCurrent={session.id === currentSessionId}
        />
      ))}
    </SettingsCard>
  )
}

function SessionItem({ session, isCurrent }: { session: Session, isCurrent: boolean }) {
  const { browser, os, device } = UAParser(session.userAgent || '')
  const updateTime = useTimeAgo(session.updatedAt)
  const [isRevoking, setIsRevoking] = useState(false)
  const router = useRouter()

  async function handleRevoke() {
    await revokeSession({
      token: session.token,
    }, {
      onRequest: () => {
        setIsRevoking(true)
      },
      onResponse: () => {
        setIsRevoking(false)
      },
      onSuccess: () => {
        router.refresh()
        toast.success('Session revoked successfully!')
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || 'Unknown error.')
      },
    })
  }

  return (
    <div className="flex items-center justify-between gap-4 border-b last:border-b-0 p-4 md:px-6">
      <div className="flex items-center gap-2.5 md:gap-4">
        <span className={cn(
          'iconify size-7 md:size-8 text-muted-foreground',
          device.type === 'mobile' ? 'carbon--mobile' : 'carbon--laptop',
        )}
        />
        <div className="flex flex-col gap-1">
          <p className="text-xs md:text-sm">
            {os.name}
            {' '}
            {os.version}
            {isCurrent && <Badge variant="outline" className="ml-2"><span className="iconify tabler--shield" />Current</Badge>}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {browser.name}
            {' '}
            {browser.version}
            {' • '}
            {updateTime}
          </p>
        </div>
      </div>
      {!isCurrent && (
        <Button variant="outline" size="xs" onClick={handleRevoke} disabled={isRevoking}>
          <span className={cn(
            'iconify size-4',
            isRevoking ? 'tabler--loader-2 animate-spin' : 'tabler--logout-2',
          )}
          />
          <span>Revoke</span>
        </Button>
      )}
    </div>
  )
}
