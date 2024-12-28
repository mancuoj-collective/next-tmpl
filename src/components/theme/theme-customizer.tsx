'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { useConfig } from '@/hooks/use-config'
import { useDark } from '@/hooks/use-dark'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { cn } from '@/lib/utils'

import type { BaseColor } from './base-colors'
import { baseColors, builtinColors, builtinRadiuses } from './base-colors'

function getActiveColor(theme: BaseColor['name'], isDark = false) {
  return `hsl(${baseColors.find(t => t.name === theme)?.activeColor[isDark ? 'dark' : 'light']})`
}

export function ThemeCustomizer() {
  const [config, setConfig] = useConfig()
  const { isDark, toggleDark } = useDark()
  const isMobile = useIsMobile()

  useEffect(() => {
    document.documentElement.classList.remove(
      ...builtinColors.map(theme => `theme-${theme}`),
    )
    document.documentElement.classList.add(`theme-${config.color}`)
  }, [config.color])

  useEffect(() => {
    document.documentElement.style.setProperty('--radius', `${config.radius}rem`)
  }, [config.radius])

  return (
    <div className="grid gap-5">
      <div className="space-y-2">
        <h2 className="text-sm font-medium">Color</h2>
        <div className="grid grid-cols-3 gap-1.5 md:gap-2.5">
          {builtinColors.map((color) => {
            const isActive = config.color === color
            return (
              <Button
                variant="outline"
                key={color}
                size={isMobile ? 'sm' : 'default'}
                onClick={() => setConfig({ ...config, color })}
                className={cn('justify-start', isActive && 'border-2 border-primary')}
              >
                <span
                  className="flex size-4 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: getActiveColor(color, isDark) }}
                >
                  {isActive && <span className="i-mingcute-check-line size-3.5 text-white" />}
                </span>
                <span className="capitalize">{color}</span>
              </Button>
            )
          })}
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-sm font-medium">Radius</h2>
        <div className="grid grid-cols-5 gap-1 md:gap-2.5">
          {builtinRadiuses.map((radius) => {
            const isActive = config.radius === radius
            return (
              <Button
                key={radius}
                variant="outline"
                size={isMobile ? 'sm' : 'default'}
                onClick={() => setConfig({ ...config, radius })}
                className={cn(isActive && 'border-2 border-primary')}
              >
                {radius}
              </Button>
            )
          })}
        </div>
      </div>
      <div className="space-y-2">
        <h2 className="text-sm font-medium">Mode</h2>
        <div className="grid grid-cols-3 gap-1 md:gap-2.5">
          <Button
            variant="outline"
            size={isMobile ? 'sm' : 'default'}
            onClick={() => { isDark && toggleDark() }}
            className={cn('justify-start', !isDark && 'border-2 border-primary')}
          >
            <span className="i-carbon-sun" />
            Light
          </Button>
          <Button
            variant="outline"
            size={isMobile ? 'sm' : 'default'}
            onClick={() => { !isDark && toggleDark() }}
            className={cn('justify-start', isDark && 'border-2 border-primary')}
          >
            <span className="i-carbon-moon" />
            Dark
          </Button>
        </div>
      </div>
    </div>
  )
}
