'use client'

// react-scan must be imported before react
// eslint-disable-next-line simple-import-sort/imports
import { scan } from 'react-scan'
import type { JSX } from 'react'
import { useEffect } from 'react'

export function ReactScan(): JSX.Element {
  useEffect(() => {
    scan({
      enabled: true,
    })
  }, [])

  return <></>
}
