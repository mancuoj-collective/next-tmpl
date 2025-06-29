import type { ReactNode } from 'react'

interface SettingCardProps {
  title: string
  description?: string
  children: ReactNode
}

export function SettingCard({ title, description, children }: SettingCardProps) {
  return (
    <div className="mb-4 md:mb-8 rounded-md border shadow-xs overflow-hidden bg-sidebar">
      <div className="border-b flex items-center p-4 md:px-6">
        {title}
      </div>
      <div className="p-4 md:px-6">
        {children}
      </div>
      {description && (
        <div className="p-4 md:px-6 text-sm text-muted-foreground border-t">
          {description}
        </div>
      )}
    </div>
  )
}
