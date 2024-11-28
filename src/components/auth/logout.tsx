'use client'

import { useActionState } from 'react'

import { logoutAction } from '@/app/actions'

export function Logout() {
  const [_, action] = useActionState(logoutAction, {
    message: '',
  })

  return (
    <form action={action}>
      <button type="submit" title="Logout" className="i-mingcute-exit-line size-5 hover:text-destructive/90" />
    </form>
  )
}
