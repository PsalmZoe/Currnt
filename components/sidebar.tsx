"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Home, Heart, User, Settings, Info, Sparkles, TrendingUp, Video } from "lucide-react"
import { cn } from "@/lib/utils"
import { DidYouKnowFacts } from "@/components/did-you-know-facts"

export function Sidebar() {
  const pathname = usePathname()
  const { theme } = useTheme()

  const navItems = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/videos", label: "Videos", icon: Video },
    { href: "/trending", label: "Trending", icon: TrendingUp },
    { href: "/for-you", label: "For You", icon: Sparkles },
    { href: "/favorites", label: "Favorites", icon: Heart },
    { href: "/profile", label: "Profile", icon: User },
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/about", label: "About", icon: Info },
  ]

  const logoSrc = theme === "dark" ? "/logo-white.png" : "/logo-blue.png"

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-16 lg:w-64 bg-[#1E40AF] border-r border-[#1E40AF]/20 transition-all duration-300 flex flex-col">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-center lg:justify-start lg:px-6 border-b border-white/10">
          <Link href="/home" className="flex items-center gap-3 transition-all duration-300 hover:scale-105">
            <Image
              src={logoSrc || "/placeholder.svg"}
              alt="Currnt Logo"
              width={28}
              height={28}
              className="h-7 w-auto"
            />
            <span className="hidden text-lg font-bold text-white lg:block">Currnt</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 p-2 lg:p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  "lg:justify-start justify-center relative overflow-hidden group",
                  isActive
                    ? "bg-[#3B82F6] text-white shadow-lg"
                    : "text-white/70 hover:bg-white/10 hover:text-white hover:scale-105",
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform duration-500",
                    "translate-x-[-100%] group-hover:translate-x-[100%]",
                  )}
                />
                <Icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0 relative z-10 transition-transform duration-200",
                    isActive && "scale-110",
                    "group-hover:scale-110",
                  )}
                />
                <span className="hidden lg:block relative z-10">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="hidden lg:flex flex-1 flex-col min-h-0 mt-4 bg-white/5 rounded-lg overflow-hidden">
          <DidYouKnowFacts />
        </div>
      </div>
    </aside>
  )
}
