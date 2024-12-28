// https://buildui.com/posts/global-progress-in-nextjs
'use client'

import { AnimatePresence, motion, useMotionTemplate, useSpring } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { ComponentProps, ReactNode } from 'react'
import { createContext, startTransition, useContext, useEffect, useState } from 'react'
import { useInterval } from 'usehooks-ts'

import { rand } from '@/lib/utils'

const ProgressBarContext = createContext<ReturnType<typeof useProgress> | null>(
  null,
)

export function useProgressBar() {
  const progress = useContext(ProgressBarContext)
  if (progress === null)
    throw new Error('Need to be inside provider')
  return progress
}

export function ProgressBar({ className, children }: { className: string, children: ReactNode }) {
  const progress = useProgress()
  const width = useMotionTemplate`${progress.value}%`

  return (
    <ProgressBarContext value={progress}>
      <GlobalProgressForBrowserNavigation />
      <AnimatePresence onExitComplete={progress.reset}>
        {progress.state !== 'complete' && (
          <motion.div
            style={{ width }}
            exit={{ opacity: 0 }}
            className={className}
          />
        )}
      </AnimatePresence>
      {children}
    </ProgressBarContext>
  )
}

export function ProgressBarLink({
  href,
  children,
  ...rest
}: ComponentProps<typeof Link>) {
  const progress = useProgressBar()
  const router = useRouter()

  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault()
        progress.start()

        startTransition(() => {
          progress.done()
          router.push(href.toString())
        })
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}

function GlobalProgressForBrowserNavigation() {
  const progress = useProgressBar()
  const pathname = usePathname()
  const [newPathname, setNewPathname] = useState<string>()
  const [didPopState, setDidPopState] = useState(false)

  useEffect(() => {
    if (didPopState && newPathname === pathname) {
      progress.done()
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
      setDidPopState(false)
    }
  }, [didPopState, newPathname, pathname, progress])

  useEffect(() => {
    function handlePopState() {
      startTransition(() => {
        progress.start()
        setDidPopState(true)
        setNewPathname(window.location.pathname)
      })
    }

    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [progress])

  return null
}

function useProgress() {
  const [state, setState] = useState<
    'initial' | 'in-progress' | 'completing' | 'complete'
  >('initial')

  const value = useSpring(0, {
    damping: 25,
    mass: 0.5,
    stiffness: 300,
    restDelta: 0.1,
  })

  useInterval(
    () => {
      // If we start progress but the bar is currently complete, reset it first.
      if (value.get() === 100) {
        value.jump(0)
      }

      const current = value.get()

      let diff
      if (current === 0) {
        diff = 15
      } else if (current < 50) {
        diff = rand(1, 10)
      } else {
        diff = rand(1, 5)
      }

      value.set(Math.min(current + diff, 99))
    },
    state === 'in-progress' ? 750 : null,
  )

  useEffect(() => {
    if (state === 'initial') {
      value.jump(0)
    } else if (state === 'completing') {
      value.set(100)
    }

    return value.on('change', (latest) => {
      if (latest === 100) {
        setState('complete')
      }
    })
  }, [value, state])

  function reset() {
    setState('initial')
  }

  function start() {
    setState('in-progress')
  }

  function done() {
    setState(state =>
      state === 'initial' || state === 'in-progress' ? 'completing' : state,
    )
  }

  return { state, value, start, done, reset }
}
