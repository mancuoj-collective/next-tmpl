import { Link } from '@react-email/components'

import { TemplateEmail } from './teamplate'

interface ResetPasswordEmailProps {
  project?: string
  email: string
  link: string
}

export function ResetPasswordEmail({
  project = '⚡️ Next Tmpl',
  email,
  link,
}: ResetPasswordEmailProps) {
  return (
    <TemplateEmail
      title="⚡️ Reset your password"
      btnText="Reset your password"
      btnLink={link}
    >
      We received a request to reset your password for your
      {' '}
      {project}
      {' '}
      account associated with
      {' '}
      <Link href={`mailto:${email}`}>{email}</Link>
      .
      No changes have been made to your account yet. To reset your password, click on the button below.
    </TemplateEmail>
  )
}
