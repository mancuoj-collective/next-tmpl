'use client'

import { useLocale } from 'next-intl'
import { useTransition } from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { Locale } from '@/i18n/config'
import { cn } from '@/lib/utils'
import { setUserLocale } from '@/services/locale'

export function LangSwitcher() {
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()

  function handleChange(value: string) {
    startTransition(() => {
      setUserLocale(value as Locale)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn('i-carbon-translate', isPending && 'text-muted-foreground')} />
      <DropdownMenuContent align="end" className="w-16">
        <DropdownMenuRadioGroup value={locale} onValueChange={handleChange}>
          <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="zh">简体中文</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
