import { AuthCard } from '@/components/auth/card'
import { AuthFooter } from '@/components/auth/footer'
import { ForgotPasswordForm } from '@/components/auth/forms/forgot-password'

export default function ForgotPasswordPage() {
  return (
    <AuthCard title="Reset Your Password" description="Type in your email and we'll send you a link to reset your password">
      <ForgotPasswordForm />
      <AuthFooter mode="forgot-password" />
    </AuthCard>
  )
}
