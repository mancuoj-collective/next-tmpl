import { AuthCard } from '@/components/auth/card'
import { AuthFooter } from '@/components/auth/footer'
import { SignInForm } from '@/components/auth/forms/sign-in'
import { AuthSocial } from '@/components/auth/social'

export default function SignInPage() {
  return (
    <AuthCard title="Welcome back" description="Sign in to your account">
      <AuthSocial />
      <SignInForm />
      <AuthFooter mode="sign-in" />
    </AuthCard>
  )
}
