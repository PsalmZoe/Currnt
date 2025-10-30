"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { NewsGrid } from "@/components/news-grid"
import { ErrorMessage } from "@/components/error-message"
import { Loader } from "@/components/loader"
import { FloatingActionButton } from "@/components/floating-action-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react"
import type { Article, Category } from "@/lib/types"

const CATEGORIES: Category[] = ["technology", "business", "sports", "entertainment", "science", "health"]

export default function ForYouPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [preferences, setPreferences] = useState<Category[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const articlesPerPage = 12

  useEffect(() => {
    if (!authLoading) {
      try {
        const stored = localStorage.getItem("newsapp_preferences")
        if (stored) {
          setPreferences(JSON.parse(stored))
        } else {
          const defaultPrefs: Category[] = ["technology", "business"]
          setPreferences(defaultPrefs)
          localStorage.setItem("newsapp_preferences", JSON.stringify(defaultPrefs))
        }
      } catch (err) {
        console.error("Error accessing localStorage:", err)
        setPreferences(["technology", "business"])
      }
    }
  }, [authLoading])

  useEffect(() => {
    if (isAuthenticated && preferences.length > 0) {
      fetchPersonalizedNews()
    }
  }, [isAuthenticated, preferences, currentPage])

  const fetchPersonalizedNews = async () => {
    setLoading(true)
    setError(null)

    try {
      const category = preferences[Math.floor(Math.random() * preferences.length)]
      const params = new URLSearchParams({
        category,
        page: currentPage.toString(),
        pageSize: articlesPerPage.toString(),
      })

      const response = await fetch(`/api/news?${params}`)

      if (!response.ok) {
        throw new Error("Failed to fetch personalized news")
      }

      const data = await response.json()
      setArticles(data.articles || [])
      setTotalResults(data.totalResults || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching news")
    } finally {
      setLoading(false)
    }
  }

  const togglePreference = (category: Category) => {
    const newPreferences = preferences.includes(category)
      ? preferences.filter((c) => c !== category)
      : [...preferences, category]

    if (newPreferences.length === 0) return

    setPreferences(newPreferences)
    try {
      localStorage.setItem("newsapp_preferences", JSON.stringify(newPreferences))
    } catch (err) {
      console.error("Error saving preferences:", err)
    }
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(totalResults / articlesPerPage)

  if (authLoading) {
    return null
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <ErrorMessage
            title="Authentication Required"
            message="Please log in to access your personalized news feed."
          />
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-balance text-4xl font-bold tracking-tight">For You</h1>
          </div>
          <p className="text-pretty text-muted-foreground">
            Personalized news based on your interests. Customize your feed by selecting your favorite topics below.
          </p>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Badge
                key={category}
                variant={preferences.includes(category) ? "default" : "outline"}
                className="cursor-pointer capitalize transition-all hover:scale-105"
                onClick={() => togglePreference(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && (
          <>
            <NewsGrid articles={articles} />

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2 animate-in fade-in">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentPage(currentPage - 1)
                    try {
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    } catch (err) {
                      console.error("Error scrolling:", err)
                    }
                  }}
                  disabled={currentPage === 1}
                  className="gap-1 bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{currentPage}</span>
                  <span>/</span>
                  <span>{totalPages}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentPage(currentPage + 1)
                    try {
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    } catch (err) {
                      console.error("Error scrolling:", err)
                    }
                  }}
                  disabled={currentPage === totalPages}
                  className="gap-1 bg-transparent"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </main>
      <FloatingActionButton />
    </div>
  )
}
