import { useAtom } from 'jotai'
import { atomDark } from 'jotai-dark'

const isDarkAtom = atomDark({
  disableTransition: true,
  disableTransitionExclude: ['.carbon--sun', '.carbon--moon'],
})

export function useDark() {
  const [isDark, setIsDark] = useAtom(isDarkAtom)

  function toggleDark() {
    if (!document.startViewTransition) {
      setIsDark()
    }
    document.startViewTransition(setIsDark)
  }
  
  return {
    isDark,
    toggleDark,
    theme: (isDark ? 'dark' : 'light') as 'dark' | 'light',
  }
}
