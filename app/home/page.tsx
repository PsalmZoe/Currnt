"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { NewsCard } from "@/components/news-card"
import { CategoryFilter } from "@/components/category-filter"
import { ErrorMessage } from "@/components/error-message"
import { ArrowUp } from "lucide-react"
import type { Article } from "@/lib/types"
import { FeaturedArticle } from "@/components/featured-article"
import { SkeletonCard } from "@/components/skeleton-card"
import { sendBreakingNewsNotification } from "@/lib/notifications"

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState("business")
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [lastNotifiedArticle, setLastNotifiedArticle] = useState<string | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const observerTarget = useRef<HTMLDivElement>(null)

  const fetchNews = useCallback(
    async (pageNum: number, append = false) => {
      if (append) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }
      setError(null)

      try {
        const response = await fetch(`/api/news?category=${category}&page=${pageNum}&pageSize=50`)

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
        const newArticles = data.articles || []

        if (append) {
          setArticles((prev) => [...prev, ...newArticles])
        } else {
          setArticles(newArticles)
        }

        setTotalResults(data.totalResults || 0)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        if (append) {
          setLoadingMore(false)
        } else {
          setLoading(false)
        }
      }
    },
    [category],
  )

  useEffect(() => {
    setPage(1)
    fetchNews(1, false)
  }, [category, fetchNews])

  useEffect(() => {
    if (typeof window === "undefined") return

    try {
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
    } catch (err) {
      console.error("Error accessing localStorage:", err)
    }
  }, [articles, page, lastNotifiedArticle])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && !loading && !error) {
          const pageSize = 50
          const currentPage = Math.floor(articles.length / pageSize) + 1

          // Check if there are more articles to load
          if (articles.length < totalResults) {
            setPage(currentPage)
            fetchNews(currentPage, true)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [articles.length, totalResults, loadingMore, loading, error, fetchNews])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    if (typeof window === "undefined") return

    try {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err) {
      console.error("Error scrolling:", err)
    }
  }

  const pageSize = 50
  const featuredArticle = articles[0]
  const gridArticles = articles.slice(1)

  return (
    <div className="container mx-auto px-4 py-6 lg:px-6">
      {/* Category Filter */}
      <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
        <CategoryFilter
          selectedCategory={category}
          onCategoryChange={(cat) => {
            setCategory(cat)
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

          {/* Loading More Indicator */}
          {loadingMore && (
            <div className="mt-8 flex justify-center">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
                {Array.from({ length: 8 }).map((_, index) => (
                  <SkeletonCard key={`loading-${index}`} />
                ))}
              </div>
            </div>
          )}

          {/* Infinite Scroll Observer Target */}
          <div ref={observerTarget} className="mt-8 h-10" />

          {/* End of Results Message */}
          {articles.length >= totalResults && articles.length > 0 && (
            <div className="mt-8 text-center text-muted-foreground animate-in fade-in">
              <p>You've reached the end of articles</p>
            </div>
          )}
        </>
      )}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 rounded-full bg-primary text-primary-foreground p-3 shadow-lg hover:bg-primary/90 transition-all duration-200 hover:scale-110 animate-in fade-in slide-in-from-bottom-4"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
