import { AuthCard } from '@/components/auth/card'
import { AuthFooter } from '@/components/auth/footer'
import { SignUpForm } from '@/components/auth/form/sign-up'
import { AuthSocial } from '@/components/auth/social'

export default function SignUpPage() {
  return (
    <AuthCard title="Get started" description="Create a new account">
      <AuthSocial />
      <SignUpForm />
      <AuthFooter mode="sign-up" />
    </AuthCard>
  )
}
