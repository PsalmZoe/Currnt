"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { NewsCard } from "@/components/news-card"
import { ErrorMessage } from "@/components/error-message"
import { SkeletonCard } from "@/components/skeleton-card"
import type { Article } from "@/lib/types"

function SearchContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!query.trim()) {
      setLoading(false)
      return
    }

    const fetchSearchResults = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)

        if (!response.ok) {
          const data = await response.json().catch(() => ({}))
          throw new Error(data.message || "Failed to search articles")
        }

        const data = await response.json()
        setArticles(data.articles || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while searching")
      } finally {
        setLoading(false)
      }
    }

    fetchSearchResults()
  }, [query])

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-6 lg:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
          {query && <p className="text-muted-foreground mt-2">Results for "{query}"</p>}
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : error ? (
          <ErrorMessage title="Search Error" message={error} />
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found for "{query}"</p>
            <p className="text-muted-foreground text-sm mt-2">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articles.map((article, index) => (
              <div
                key={article.url}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <NewsCard article={article} index={index} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}
