import { AuthCard } from '@/components/auth/auth-card'
import { AuthFooter } from '@/components/auth/auth-footer'
import { ResetPasswordForm } from '@/components/forms/reset-password-form'

export default function ResetPasswordPage() {
  return (
    <AuthCard title="Reset Your Password" description="Type in a new secure password and press save to update your password">
      <ResetPasswordForm />
      <AuthFooter mode="forgot-password" />
    </AuthCard>
  )
}
