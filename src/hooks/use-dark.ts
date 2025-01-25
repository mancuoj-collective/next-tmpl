import { useTheme } from 'next-themes'
import { useCallback } from 'react'

export function useDark() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const isDark = resolvedTheme === 'dark'

  const toggleDark = useCallback(() => {
    if (theme === 'system') {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }
  }, [theme, resolvedTheme, setTheme])

  return { resolvedTheme, isDark, toggleDark }
}
