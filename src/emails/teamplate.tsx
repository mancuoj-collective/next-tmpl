import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

interface TemplateEmailProps {
  title: string
  btnText: string
  btnLink: string
  children: React.ReactNode
}

export function TemplateEmail({
  title,
  btnText,
  btnLink,
  children,
}: TemplateEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{title}</Preview>
      <Tailwind>
        <Body className="bg-[#fcfcfc] text-[#202020] font-sans">
          <Container className="mx-auto max-w-xl my-10 p-6">
            <Heading className="mb-7 font-semibold text-2xl">
              {title}
            </Heading>
            <Text className="text-base">
              {children}
            </Text>
            <Section className="my-6">
              <Button
                href={btnLink}
                className="bg-[#171717] text-[#fcfcfc] px-3 py-2 rounded text-sm"
              >
                {btnText}
              </Button>
            </Section>
            <Text className="text-base">
              If you didn't request for this, you can safely ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
