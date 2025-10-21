"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Mail, Eye, EyeOff, UserPlus, Check } from "lucide-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { signup } = useAuth()

  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return { strength: 0, label: "" }
    if (pass.length < 6) return { strength: 1, label: "Weak" }
    if (pass.length < 10) return { strength: 2, label: "Medium" }
    if (pass.length >= 10 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) return { strength: 3, label: "Strong" }
    return { strength: 2, label: "Medium" }
  }

  const passwordStrength = getPasswordStrength(password)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      await signup(name, email, password)
      router.push("/home")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setError("Google sign-up will be available when Supabase is configured")
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-[#1E40AF] via-[#2563EB] to-[#3B82F6] p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-pulse-subtle" />
        <div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-pulse-subtle"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-white/5 blur-3xl animate-pulse-subtle"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
        <Card className="border-none shadow-2xl backdrop-blur-sm bg-white/95 dark:bg-card/95">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-6">
              <UserPlus className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] bg-clip-text text-transparent">
              Create Account
            </CardTitle>
            <CardDescription className="text-base">Join Currnt to get personalized news</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 transition-all duration-200 focus:scale-[1.02] placeholder:text-muted-foreground/60"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 transition-all duration-200 focus:scale-[1.02] placeholder:text-muted-foreground/60"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10 transition-all duration-200 focus:scale-[1.02] placeholder:text-muted-foreground/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {password && (
                  <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            level <= passwordStrength.strength
                              ? passwordStrength.strength === 1
                                ? "bg-red-500"
                                : passwordStrength.strength === 2
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">{passwordStrength.label} password</p>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-11 pr-10 transition-all duration-200 focus:scale-[1.02] placeholder:text-muted-foreground/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {confirmPassword && (
                  <div className="flex items-center gap-1 text-xs animate-in fade-in slide-in-from-top-2 duration-300">
                    {password === confirmPassword ? (
                      <>
                        <Check className="h-3 w-3 text-green-500" />
                        <span className="text-green-500">Passwords match</span>
                      </>
                    ) : (
                      <span className="text-red-500">Passwords do not match</span>
                    )}
                  </div>
                )}
              </div>
              {error && (
                <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400 animate-in fade-in slide-in-from-top-2 duration-300">
                  {error}
                </div>
              )}
              <Button
                type="submit"
                className="h-11 w-full bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] hover:from-[#1E40AF]/90 hover:to-[#3B82F6]/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-11 w-full bg-transparent transition-all duration-300 hover:scale-[1.02] hover:shadow-md"
              onClick={handleGoogleSignUp}
              disabled={isLoading}
            >
              <Mail className="mr-2 h-5 w-5" />
              Sign up with Google
            </Button>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-[#1E40AF] hover:underline transition-all duration-200 hover:text-[#3B82F6]"
              >
                Sign in
              </Link>
            </p>
          </CardContent>
        </Card>

        <div className="mt-8 space-y-3 text-white">
          {[
            "Personalized news feed based on your interests",
            "Save and organize your favorite articles",
            "Get real-time notifications for breaking news",
          ].map((benefit, index) => (
            <div
              key={index}
              className="flex items-start gap-3 animate-in fade-in slide-in-from-left-4 duration-500"
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 flex-shrink-0 mt-0.5">
                <Check className="h-4 w-4" />
              </div>
              <p className="text-sm opacity-90">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
