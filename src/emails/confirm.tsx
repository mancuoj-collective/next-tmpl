import { Link } from '@react-email/components'

import { TemplateEmail } from './teamplate'

interface ConfirmEmailProps {
  project?: string
  email: string
  link: string
}

export function ConfirmEmail({
  project = '⚡️ Next Tmpl',
  email,
  link,
}: ConfirmEmailProps) {
  return (
    <TemplateEmail
      title="⚡️ Confirm your email address"
      btnText="Confirm email address"
      btnLink={link}
    >
      You can start building with
      {' '}
      {project}
      {' '}
      right away once you've confirmed that
      {' '}
      <Link href={`mailto:${email}`}>{email}</Link>
      {' '}
      is your email. Click the button below to confirm.
    </TemplateEmail>
  )
}
