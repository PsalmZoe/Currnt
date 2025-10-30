"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Loader2 } from "lucide-react"
import type { Article } from "@/lib/types"
import Link from "next/link"

export function TrendingSidebar() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTrendingArticles()
  }, [])

  const fetchTrendingArticles = async () => {
    try {
      const response = await fetch("/api/news?category=general&page=1&pageSize=5")
      if (response.ok) {
        const data = await response.json()
        setArticles(data.articles?.slice(0, 5) || [])
      }
    } catch (error) {
      console.error("Failed to fetch trending articles:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hidden lg:block fixed right-0 top-16 w-80 h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted/30 border-l border-border overflow-y-auto">
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-bold text-lg">Trending Topics</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : articles.length > 0 ? (
          <div className="space-y-3">
            {articles.map((article, index) => (
              <Link
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-3 rounded-lg hover:bg-muted transition-all duration-200 border border-transparent hover:border-primary/20"
              >
                <div className="flex gap-3">
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage || "/placeholder.svg"}
                      alt={article.title}
                      className="h-16 w-16 rounded object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded flex-shrink-0">
                        #{index + 1}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-200 mt-1">
                      {article.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{article.source.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground text-sm">
            <p>No trending articles available</p>
            <p className="text-xs mt-2">Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
