'use client'

import { useTranslations } from 'next-intl'

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

import { ThemeCustomizer } from './theme-customizer'

export function ThemeDialog() {
  const t = useTranslations('theme')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="i-carbon-color-palette" />
      </DialogTrigger>
      <DialogContent className="w-96 rounded-lg md:w-[450px]">
        <DialogTitle>
          {t('title')}
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogTitle>
        <ThemeCustomizer />
      </DialogContent>
    </Dialog>
  )
}
