import { AuthCard } from '@/components/auth/auth-card'
import { AuthFooter } from '@/components/auth/auth-footer'
import { SignUpForm } from '@/components/auth/sign-up-form'
import { SocialAuth } from '@/components/auth/social-auth'

export default function SignUpPage() {
  return (
    <AuthCard title="Get started" description="Create a new account">
      <SocialAuth />
      <SignUpForm />
      <AuthFooter mode="sign-up" />
    </AuthCard>
  )
}
