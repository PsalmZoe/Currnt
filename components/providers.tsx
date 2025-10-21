"use client"
import type { ReactNode } from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { FavoritesProvider } from "@/contexts/favorites-context"
import { ThemeProvider } from "@/contexts/theme-context"
import { SettingsProvider } from "@/contexts/settings-context"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SettingsProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </SettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
