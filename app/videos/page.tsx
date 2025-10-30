"use client"

import { useEffect, useState } from "react"
import { VideoCard } from "@/components/video-card"
import { SkeletonVideoCard } from "@/components/skeleton-video-card"
import { CategoryFilter } from "@/components/category-filter"
import { ErrorMessage } from "@/components/error-message"
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Play, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react"
import type { VideoArticle, Category } from "@/lib/types"

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoArticle[]>([])
  const [filteredVideos, setFilteredVideos] = useState<VideoArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<Category>("general")
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const videosPerPage = 12

  useEffect(() => {
    fetchVideos()
  }, [category, page])

  useEffect(() => {
    if (searchQuery) {
      const filtered = videos.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setFilteredVideos(filtered)
    } else {
      setFilteredVideos(videos)
    }
  }, [searchQuery, videos])

  const fetchVideos = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/videos?category=${category}&page=${page}&pageSize=${videosPerPage}`)

      if (!response.ok) {
        throw new Error("Failed to fetch videos")
      }

      const data = await response.json()
      setVideos(data.videos || [])
      setTotalResults(data.total || 0)
      setFilteredVideos(data.videos || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const totalPages = Math.ceil(totalResults / videosPerPage)

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
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary">
              <Play className="h-6 w-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-balance text-4xl font-bold tracking-tight">News Videos</h1>
              <p className="text-pretty text-muted-foreground">Watch the latest news in video format</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 transition-all duration-200 focus:scale-[1.01]"
              />
            </div>
            <Button
              variant="outline"
              className="gap-2 transition-all duration-200 hover:scale-105 bg-transparent"
              onClick={() => setCategory("general")}
            >
              <TrendingUp className="h-4 w-4" />
              Trending
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-500" style={{ animationDelay: "100ms" }}>
          <CategoryFilter
            selectedCategory={category}
            onCategoryChange={(cat) => {
              setCategory(cat)
              setPage(1)
            }}
          />
        </div>

        {/* Videos Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonVideoCard key={index} />
            ))}
          </div>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : filteredVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 animate-in fade-in duration-500">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
              <Play className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No videos found</h3>
            <p className="text-muted-foreground text-center max-w-md">
              {searchQuery
                ? `No videos match your search "${searchQuery}". Try different keywords.`
                : "No videos available in this category at the moment."}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between animate-in fade-in duration-300">
              <p className="text-sm text-muted-foreground">
                Showing {filteredVideos.length} {filteredVideos.length === 1 ? "video" : "videos"}
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredVideos.map((video, index) => (
                <div
                  key={video.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <VideoCard video={video} />
                </div>
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
      </main>
    </div>
  )
}
