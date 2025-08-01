import type { ReactNode } from 'react'

interface SettingsCardProps {
  title: string
  children: ReactNode
}

export function SettingsCard({ title, children }: SettingsCardProps) {
  return (
    <div className="mb-6 md:mb-8 rounded-md border shadow-xs overflow-hidden bg-sidebar">
      <div className="font-medium border-b flex items-center p-4 md:px-6 text-sm md:text-base">
        {title}
      </div>
      {children}
    </div>
  )
}
