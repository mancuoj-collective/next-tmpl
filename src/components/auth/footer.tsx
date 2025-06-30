'use client'

import Link from 'next/link'

type AuthMode = 'sign-in' | 'sign-up' | 'forgot-password'

interface AuthFooterProps {
  mode: AuthMode
}

const footerMap = {
  'sign-in': {
    text: 'Don\'t have an account?',
    link: '/sign-up',
    linkText: 'Sign Up Now',
  },
  'sign-up': {
    text: 'Have an account?',
    link: '/sign-in',
    linkText: 'Sign In Now',
  },
  'forgot-password': {
    text: 'Already have an account?',
    link: '/sign-in',
    linkText: 'Sign In',
  },
}

export function AuthFooter({ mode }: AuthFooterProps) {
  const { text, link, linkText } = footerMap[mode]
  return (
    <div className="my-8 text-center text-sm">
      <span className="text-foreground/70">{text}{' '}</span>
      <Link href={link} className="underline hover:text-muted-foreground">{linkText}</Link>
    </div>
  )
}
