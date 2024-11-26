'use client'

import { useActionState } from 'react'

import { logoutAction } from '@/app/actions'

export function Logout() {
  const [_, action] = useActionState(logoutAction, {
    message: '',
  })

  return (
    <form action={action}>
      <button type="submit" title="Logout" className="i-mingcute-power-line size-5 text-destructive hover:text-destructive/90" />
    </form>
  )
}
