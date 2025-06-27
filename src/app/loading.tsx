'use client'

import { useSpinDelay } from 'spin-delay'

import { WaveSpinner } from '@/components/wave-spinner'

export default function Loading() {
  const showSpinner = useSpinDelay(true, { delay: 10, minDuration: 200 })

  if (!showSpinner) {
    return null
  }

  return (
    <div className="flex h-svh flex-col items-center justify-center">
      <WaveSpinner className="size-16" />
    </div>
  )
}
