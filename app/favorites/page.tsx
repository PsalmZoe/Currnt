"use client"

import { Header } from "@/components/header"
import { NewsGrid } from "@/components/news-grid"
import { FloatingActionButton } from "@/components/floating-action-button"
import { useFavorites } from "@/contexts/favorites-context"
import { Heart, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function FavoritesPage() {
  const { favorites, isLoading, isAuthenticated } = useFavorites()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex min-h-[400px] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8 space-y-2 animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 fill-red-500 text-red-500" />
              <h1 className="text-balance text-4xl font-bold tracking-tight">Your Favorites</h1>
            </div>
          </div>

          <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed animate-in fade-in">
            <div className="text-center space-y-4">
              <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Sign in to save favorites</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Create an account or sign in to save your favorite articles and access them from any device
              </p>
              <div className="flex gap-2 justify-center">
                <Button onClick={() => router.push("/auth/login")}>Sign In</Button>
                <Button variant="outline" onClick={() => router.push("/auth/signup")}>
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </main>
        <FloatingActionButton />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-2 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 fill-red-500 text-red-500" />
            <h1 className="text-balance text-4xl font-bold tracking-tight">Your Favorites</h1>
          </div>
          <p className="text-pretty text-muted-foreground">
            {favorites.length === 0
              ? "You haven't saved any articles yet. Start exploring and save your favorites!"
              : `You have ${favorites.length} saved ${favorites.length === 1 ? "article" : "articles"}`}
          </p>
        </div>

        {favorites.length > 0 ? (
          <NewsGrid articles={favorites} />
        ) : (
          <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed animate-in fade-in">
            <div className="text-center">
              <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No favorites yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">Click the heart icon on any article to save it here</p>
            </div>
          </div>
        )}
      </main>
      <FloatingActionButton />
    </div>
  )
}
