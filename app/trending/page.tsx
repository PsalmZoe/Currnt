"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { NewsCard } from "@/components/news-card"
import { SkeletonCard } from "@/components/skeleton-card"
import { ErrorMessage } from "@/components/error-message"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Flame, Clock, Eye, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react"
import type { Article } from "@/lib/types"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TrendingTopic {
  id: number
  name: string
  count: string
  change: number
  category: string
}

export default function TrendingPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState<"today" | "week" | "month">("today")
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const trendingTopics: TrendingTopic[] = [
    { id: 1, name: "Climate Summit", count: "12.5k", change: 45, category: "science" },
    { id: 2, name: "Tech Innovation", count: "8.2k", change: 32, category: "technology" },
    { id: 3, name: "Sports Finals", count: "6.8k", change: 28, category: "sports" },
    { id: 4, name: "Economic Policy", count: "5.4k", change: 15, category: "business" },
    { id: 5, name: "Health Research", count: "4.9k", change: 22, category: "health" },
    { id: 6, name: "Entertainment Awards", count: "4.2k", change: 18, category: "entertainment" },
  ]

  useEffect(() => {
    fetchTrendingNews()
  }, [timeRange, page])

  const fetchTrendingNews = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/news?category=general&page=${page}&pageSize=100`)

      if (!response.ok) {
        throw new Error("Failed to fetch trending news")
      }

      const data = await response.json()
      setArticles(data.articles || [])
      setTotalResults(data.totalResults || 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching trending news")
    } finally {
      setLoading(false)
    }
  }

  const pageSize = 100
  const totalPages = Math.ceil(totalResults / pageSize)

  const scrollToTop = () => {
    if (typeof window === "undefined") return
    try {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (err) {
      console.error("Error scrolling:", err)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-balance text-4xl font-bold tracking-tight">Trending Now</h1>
              <p className="text-pretty text-muted-foreground">Discover what's making headlines around the world</p>
            </div>
          </div>
        </div>

        {/* Time Range Tabs */}
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500" style={{ animationDelay: "100ms" }}>
          <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as typeof timeRange)}>
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="today" className="gap-2">
                <Clock className="h-4 w-4" />
                Today
              </TabsTrigger>
              <TabsTrigger value="week" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                This Week
              </TabsTrigger>
              <TabsTrigger value="month" className="gap-2">
                <Eye className="h-4 w-4" />
                This Month
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div>
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : error ? (
              <ErrorMessage message={error} />
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between animate-in fade-in duration-300">
                  <h2 className="text-2xl font-bold">Trending Articles</h2>
                  <p className="text-sm text-muted-foreground">{articles.length} articles</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {articles.map((article, index) => (
                    <NewsCard key={article.url} article={article} index={index} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2 animate-in fade-in duration-300">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setPage((p) => Math.max(1, p - 1))
                        scrollToTop()
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
                        scrollToTop()
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

          {/* Trending Topics Sidebar */}
          <aside className="space-y-6">
            <div
              className="rounded-xl border bg-card p-6 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500"
              style={{ animationDelay: "200ms" }}
            >
              <div className="mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold">Top Topics</h2>
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div
                    key={topic.id}
                    className="group flex items-center justify-between rounded-lg p-3 transition-all duration-200 hover:bg-muted cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium leading-none group-hover:text-primary transition-colors duration-200">
                          {topic.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{topic.count} mentions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium text-green-600">
                      <ArrowUp className="h-3 w-3" />
                      {topic.change}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-xl border bg-card p-6 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500"
              style={{ animationDelay: "300ms" }}
            >
              <h3 className="mb-4 font-bold">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {["Technology", "Business", "Sports", "Health", "Science", "Entertainment"].map((category) => (
                  <Badge
                    key={category}
                    variant="secondary"
                    className="cursor-pointer transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:scale-105"
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div
              className="rounded-xl border bg-gradient-to-br from-primary to-secondary p-6 text-white shadow-lg animate-in fade-in slide-in-from-right-4 duration-500"
              style={{ animationDelay: "400ms" }}
            >
              <Flame className="h-8 w-8 mb-3" />
              <h3 className="mb-2 text-lg font-bold">Stay Updated</h3>
              <p className="mb-4 text-sm opacity-90">Get notifications for breaking news and trending stories</p>
              <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90">
                Enable Notifications
              </Button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
