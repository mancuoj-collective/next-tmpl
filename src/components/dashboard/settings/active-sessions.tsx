'use client'

import { useTimeAgo } from '@shined/react-use'
import type { Session } from 'better-auth'
import { UAParser } from 'ua-parser-js'

import { Badge } from '@/components/shadcn/badge'
import { Button } from '@/components/shadcn/button'
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
    <SettingsCard title="Active sessions">
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

  function handleRevoke() {}

  return (
    <div className="flex items-center justify-between gap-4 border-b last:border-b-0 p-4 md:px-6">
      <div className="flex items-center gap-4">
        <span className={cn(
          'iconify size-7 md:size-8 text-muted-foreground',
          device.type === 'mobile'
            ? 'carbon--mobile'
            : device.type === 'tablet'
              ? 'carbon--tablet'
              : 'carbon--laptop',
        )}
        />
        <div className="flex flex-col gap-1.5">
          <p className="text-sm font-medium">
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
        <Button variant="outline" size="xs" onClick={handleRevoke}>
          <span className="iconify tabler--logout-2" />
          Revoke
        </Button>
      )}
    </div>
  )
}
