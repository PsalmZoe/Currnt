"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Moon, Sun, User, Heart, Settings, LogOut, LogIn, Sparkles } from "lucide-react"
import { useTheme } from "@/contexts/theme-context"
import { useAuth } from "@/contexts/auth-context"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const { user, logout, isAuthenticated } = useAuth()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/for-you", label: "For You", icon: Sparkles, authRequired: true },
    { href: "/favorites", label: "Favorites" },
    { href: "/about", label: "About" },
  ]

  const handleLogout = async () => {
    await logout()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:opacity-80">
          {theme === "light" ? (
            <Image src="/logo-blue.png" alt="Currnt Logo" width={120} height={40} className="h-8 w-auto" />
          ) : (
            <Image src="/logo-white.png" alt="Currnt Logo" width={120} height={40} className="h-8 w-auto" />
          )}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            if (item.authRequired && !isAuthenticated) return null

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-all duration-200 hover:text-foreground relative group",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.icon && <item.icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />}
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="transition-all duration-300 hover:scale-110 hover:rotate-12"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 transition-transform duration-300" />
            ) : (
              <Sun className="h-5 w-5 transition-transform duration-300" />
            )}
          </Button>

          {isAuthenticated ? (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="transition-all duration-300 hover:scale-110">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="transition-colors duration-150">
                    <Link href="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="transition-colors duration-150">
                    <Link href="/for-you" className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      For You
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="transition-colors duration-150">
                    <Link href="/favorites" className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Favorites
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="transition-colors duration-150">
                    <Link href="/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-destructive transition-colors duration-150"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden md:flex transition-all duration-200 hover:scale-105"
            >
              <Link href="/auth/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </Button>
          )}

          <MobileNav />
        </div>
      </div>
    </header>
  )
}
