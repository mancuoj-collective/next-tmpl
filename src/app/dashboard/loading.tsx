import { Spinner } from '@/components/spinner'

export default function Loading() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Spinner className="size-12" />
    </div>
  )
}
