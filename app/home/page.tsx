"use client"

import { useEffect, useState } from "react"
import { NewsCard } from "@/components/news-card"
import { CategoryFilter } from "@/components/category-filter"
import { ErrorMessage } from "@/components/error-message"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Article } from "@/lib/types"
import { FeaturedArticle } from "@/components/featured-article"
import { SkeletonCard } from "@/components/skeleton-card"
import { sendBreakingNewsNotification } from "@/lib/notifications"

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState("business")
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [lastNotifiedArticle, setLastNotifiedArticle] = useState<string | null>(null)

  useEffect(() => {
    fetchNews()
  }, [category, page])

  useEffect(() => {
    const notificationsEnabled = localStorage.getItem("newsapp_notifications") === "true"
    if (notificationsEnabled && articles.length > 0 && page === 1) {
      const firstArticle = articles[0]
      if (firstArticle.url !== lastNotifiedArticle) {
        sendBreakingNewsNotification({
          title: firstArticle.title,
          description: firstArticle.description,
          image: firstArticle.urlToImage,
          url: firstArticle.url,
        })
        setLastNotifiedArticle(firstArticle.url)
      }
    }
  }, [articles, page, lastNotifiedArticle])

  const fetchNews = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/news?category=${category}&page=${page}`)

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        if (response.status === 500 && data.message?.includes("NEWS_API_KEY")) {
          throw new Error(
            "API key not configured. Please add your NewsAPI key to the environment variables. Get a free key at https://newsapi.org",
          )
        }
        if (response.status === 500 && data.message?.includes("Invalid NewsAPI key")) {
          throw new Error(
            "Invalid API key. Please check your NewsAPI key in the environment variables. Get a free key at https://newsapi.org",
          )
        }
        throw new Error(data.message || "Failed to fetch news")
      }

      const data = await response.json()
      setArticles(data.articles || [])
      setTotalResults(data.totalResults || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const pageSize = 20
  const totalPages = Math.ceil(totalResults / pageSize)
  const featuredArticle = articles[0]
  const gridArticles = articles.slice(1, 9)

  return (
    <div className="container mx-auto px-4 py-6 lg:px-6">
      {/* Category Filter */}
      <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
        <CategoryFilter
          selectedCategory={category}
          onCategoryChange={(cat) => {
            setCategory(cat)
            setPage(1)
          }}
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-8">
          {/* Featured Skeleton */}
          <div className="h-96 rounded-xl bg-muted animate-pulse" />

          {/* Grid Skeletons */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="space-y-4">
          <ErrorMessage title="Unable to Load News" message={error} />
          {error.includes("API key") && (
            <div className="mx-auto max-w-2xl rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
              <p className="font-semibold mb-2">How to fix this:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Go to{" "}
                  <a
                    href="https://newsapi.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-semibold"
                  >
                    newsapi.org
                  </a>{" "}
                  and sign up for a free API key
                </li>
                <li>Copy your API key</li>
                <li>Click the "Vars" button in the v0 sidebar</li>
                <li>
                  Add a new variable: <code className="bg-white px-2 py-1 rounded">NEWS_API_KEY</code> with your API key
                  value
                </li>
                <li>Refresh this page</li>
              </ol>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Featured Article */}
          {featuredArticle && (
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <FeaturedArticle article={featuredArticle} />
            </div>
          )}

          {/* Articles Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gridArticles.map((article, index) => (
              <div
                key={article.url}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <NewsCard article={article} index={index} />
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2 animate-in fade-in duration-300">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPage((p) => Math.max(1, p - 1))
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                disabled={page === 1}
                className="gap-1 transition-all duration-200 hover:scale-105"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{page}</span>
                <span>/</span>
                <span>{totalPages}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPage((p) => Math.min(totalPages, p + 1))
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }}
                disabled={page === totalPages}
                className="gap-1 transition-all duration-200 hover:scale-105"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
