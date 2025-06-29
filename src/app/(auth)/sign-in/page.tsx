import { AuthCard } from '@/components/auth/auth-card'
import { AuthFooter } from '@/components/auth/auth-footer'
import { SocialAuth } from '@/components/auth/social-auth'
import { SignInForm } from '@/components/forms/sign-in-form'

export default function SignInPage() {
  return (
    <AuthCard title="Welcome back" description="Sign in to your account">
      <SocialAuth />
      <SignInForm />
      <AuthFooter mode="sign-in" />
    </AuthCard>
  )
}
