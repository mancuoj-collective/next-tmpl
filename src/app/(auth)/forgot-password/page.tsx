import { AuthCard } from '@/components/auth/auth-card'
import { AuthFooter } from '@/components/auth/auth-footer'
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form'

export default function ForgotPasswordPage() {
  return (
    <AuthCard title="Reset Your Password" description="Type in your email and we'll send you a link to reset your password">
      <ForgotPasswordForm />
      <AuthFooter mode="forgot-password" />
    </AuthCard>
  )
}
