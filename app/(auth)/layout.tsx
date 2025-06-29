import { Toaster } from "@/components/ui/sonner"

type AuthLayoutProps = {
  children: React.ReactNode
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="h-screen w-screen flex items-center justify-center px-4 md:px-0">
        {children}
      <Toaster/>
    </main>
  )
}

export default AuthLayout
