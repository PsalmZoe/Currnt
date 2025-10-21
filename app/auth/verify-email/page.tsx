import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail } from "lucide-react"

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] p-6">
      <div className="w-full max-w-md">
        <Card className="border-none shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E40AF] to-[#3B82F6]">
              <Mail className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">Check Your Email</CardTitle>
            <CardDescription className="text-base">We've sent you a verification link</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              Please check your email and click the verification link to activate your account.
            </p>
            <Button asChild className="w-full bg-[#1E40AF] hover:bg-[#1E40AF]/90">
              <Link href="/auth/login">Back to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
