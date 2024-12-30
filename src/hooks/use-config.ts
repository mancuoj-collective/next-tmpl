import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import type { builtinColors, builtinRadiuses } from '@/components/theme'

type Config = {
  color: typeof builtinColors[number]
  radius: typeof builtinRadiuses[number]
}

export const defaultConfig: Config = {
  color: 'zinc',
  radius: 0.5,
}

const configAtom = atomWithStorage<Config>('use-config', defaultConfig)

export function useConfig() {
  return useAtom(configAtom)
}
