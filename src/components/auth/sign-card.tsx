'use client'

import Link from 'next/link'

import { Github } from '@/components/auth/github'
import { SignInForm } from '@/components/auth/sign-in-form'
import { SignUpForm } from '@/components/auth/sign-up-form'
import { Separator } from '@/components/shadcn/separator'

export function SignCard({
  title,
  description,
  mode,
}: {
  title: string
  description: string
  mode: 'sign-in' | 'sign-up'
}) {
  const isSignIn = mode === 'sign-in'

  return (
    <div className="flex w-[333px] flex-col">
      <div className="mt-8 mb-10 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold lg:text-3xl">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col gap-5">
        <Github />
        <div className="flex w-full items-center justify-center overflow-hidden">
          <Separator />
          <span className="px-2 text-sm text-muted-foreground">or</span>
          <Separator />
        </div>
        {isSignIn ? <SignInForm /> : <SignUpForm />}
      </div>
      <div className="my-8 text-center text-sm">
        {isSignIn ? (
          <>
            <span className="text-foreground/70">
              Don't have an account?{' '}
            </span>
            <Link href="/sign-up" className="underline hover:text-muted-foreground">
              Sign Up Now
            </Link>
          </>
        ) : (
          <>
            <span className="text-foreground/70">
              Already have an account?{' '}
            </span>
            <Link href="/sign-in" className="underline hover:text-muted-foreground">
              Sign In Now
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
