import { useAtom } from 'jotai'
import { atomDark } from 'jotai-dark'

const isDarkAtom = atomDark({
  storageKey: 'next-tmpl-theme',
  disableTransition: true,
  disableTransitionExclude: ['.sun', '.moon'],
})

export function useTheme() {
  const [isDark, setIsDark] = useAtom(isDarkAtom)
  return {
    isDark,
    toggleDark: setIsDark as () => void,
    theme: (isDark ? 'dark' : 'light') as 'dark' | 'light',
  }
}
