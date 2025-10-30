"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, ExternalLink, User, Heart, Share2 } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader } from "@/components/loader"
import { ErrorMessage } from "@/components/error-message"
import { useFavorites } from "@/contexts/favorites-context"
import { cn } from "@/lib/utils"
import type { Article } from "@/lib/types"

function ArticleContent() {
  const searchParams = useSearchParams()
  const articleData = searchParams.get("data")
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  useEffect(() => {
    if (!articleData) {
      setError("No article data provided")
      setLoading(false)
      return
    }

    try {
      const decodedData = decodeURIComponent(articleData)
      const parsedArticle = JSON.parse(decodedData)
      setArticle(parsedArticle)
      setError(null)
    } catch (err) {
      setError("Failed to load article data")
    } finally {
      setLoading(false)
    }
  }, [articleData])

  const handleShare = async () => {
    if (!article) return

    // Check if Web Share API is available
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description || "",
          url: article.url,
        })
      } catch (err) {
        console.log("Share cancelled or failed")
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      // Fallback to clipboard API
      try {
        await navigator.clipboard.writeText(article.url)
        alert("Link copied to clipboard!")
      } catch (err) {
        console.error("Failed to copy to clipboard:", err)
        alert("Failed to copy link")
      }
    } else {
      // Final fallback: just alert the user
      alert("Sharing not supported. URL: " + article.url)
    }
  }

  const handleFavoriteToggle = () => {
    if (!article) return

    if (isFavorite(article.url)) {
      removeFavorite(article.url)
    } else {
      addFavorite(article)
    }
  }

  if (loading) return <Loader />
  if (error) return <ErrorMessage message={error} />
  if (!article) return <ErrorMessage message="Article not found" />

  const publishedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const isFav = isFavorite(article.url)

  return (
    <article className="mx-auto max-w-4xl animate-in fade-in slide-in-from-bottom-4">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to news
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleFavoriteToggle}
            className="transition-transform hover:scale-110 bg-transparent"
          >
            <Heart className={cn("h-4 w-4 transition-all", isFav && "fill-red-500 text-red-500")} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleShare}
            className="transition-transform hover:scale-110 bg-transparent"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Badge variant="secondary">{article.source.name}</Badge>
          <h1 className="font-sans text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {article.author && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={article.publishedAt}>{publishedDate}</time>
            </div>
          </div>
        </div>

        {article.urlToImage && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={article.urlToImage || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        )}

        {article.description && (
          <p className="text-pretty text-xl leading-relaxed text-muted-foreground">{article.description}</p>
        )}

        {article.content && (
          <div className="space-y-4 border-l-4 border-primary/20 pl-6 leading-relaxed">
            <p className="text-lg leading-relaxed">{article.content}</p>
          </div>
        )}

        <div className="rounded-lg border bg-muted/50 p-6">
          <p className="mb-3 text-sm text-muted-foreground">
            This is a preview. Read the complete article on the publisher's website:
          </p>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:underline"
          >
            Continue reading on {article.source.name}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  )
}

export default function ArticlePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<Loader />}>
          <ArticleContent />
        </Suspense>
      </main>
    </div>
  )
}
