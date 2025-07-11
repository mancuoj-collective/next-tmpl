import { Link } from '@react-email/components'

import { TemplateEmail } from './teamplate'

interface VerifyDeletionEmailProps {
  project?: string
  email: string
  link: string
}

export function VerifyDeletionEmail({
  project = '⚡️ Next Tmpl',
  email,
  link,
}: VerifyDeletionEmailProps) {
  return (
    <TemplateEmail
      title="⚡️ Verify your account deletion"
      btnText="Verify account deletion"
      btnLink={link}
    >
      We received a request to delete your
      {' '}
      {project}
      {' '}
      account associated with
      {' '}
      <Link href={`mailto:${email}`}>{email}</Link>
      . This action is irreversible, all your data will be deleted from our system. To verify your account deletion, click on the button below.
    </TemplateEmail>
  )
}
