import { AuthCard } from '@/components/auth/card'
import { AuthFooter } from '@/components/auth/footer'
import { ResetPasswordForm } from '@/components/auth/forms/reset-password'

export default function ResetPasswordPage() {
  return (
    <AuthCard title="Reset Your Password" description="Type in a new secure password and press save to update your password">
      <ResetPasswordForm />
      <AuthFooter mode="forgot-password" />
    </AuthCard>
  )
}
