export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-svh items-center justify-center">
      {children}
    </div>
  )
}
