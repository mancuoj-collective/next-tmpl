import { AuthCard } from '@/components/auth/card'
import { AuthFooter } from '@/components/auth/footer'
import { ChangePasswordForm } from '@/components/auth/form/change-password'

export default function ChangePasswordPage() {
  return (
    <AuthCard title="Change Your Password" description="Changing your password will log you out of all other active sessions">
      <ChangePasswordForm />
      <AuthFooter mode="change-password" />
    </AuthCard>
  )
}
