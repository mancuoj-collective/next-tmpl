'use client'

import type { ReactNode } from 'react'

interface AuthCardProps {
  title: string
  description: string
  children: ReactNode
}

export function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <div className="flex w-[333px] flex-col md:w-[400px]">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="-m-0.5 text-2xl font-semibold lg:text-3xl">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  )
}
