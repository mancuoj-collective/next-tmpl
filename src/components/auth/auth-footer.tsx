import Link from 'next/link'

type AuthMode = 'sign-in' | 'sign-up' | 'forgot-password'

interface AuthFooterProps {
  mode: AuthMode
}

export function AuthFooter({ mode }: AuthFooterProps) {
  if (mode === 'sign-in') {
    return (
      <div className="my-8 text-center text-sm">
        <span className="text-foreground/70">Don't have an account? </span>
        <Link href="/sign-up" className="underline hover:text-muted-foreground">Sign Up Now</Link>
      </div>
    )
  }
  if (mode === 'sign-up') {
    return (
      <div className="my-8 text-center text-sm">
        <span className="text-foreground/70">Already have an account? </span>
        <Link href="/sign-in" className="underline hover:text-muted-foreground">Sign In Now</Link>
      </div>
    )
  }
  if (mode === 'forgot-password') {
    return (
      <div className="my-8 text-center text-sm">
        <span className="text-foreground/70">Already have an account? </span>
        <Link href="/sign-in" className="underline hover:text-muted-foreground">Sign In</Link>
      </div>
    )
  }
  return null
}
