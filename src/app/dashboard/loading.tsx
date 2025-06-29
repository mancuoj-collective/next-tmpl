import { WaveSpinner } from '@/components/wave-spinner'

export default function Loading() {
  return (
    <div className="flex h-svh flex-col items-center justify-center">
      <WaveSpinner className="size-14" />
    </div>
  )
}
