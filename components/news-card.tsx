"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Calendar, ExternalLink, Heart } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useFavorites } from "@/contexts/favorites-context"
import { useAuth } from "@/contexts/auth-context"
import type { Article } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface NewsCardProps {
  article: Article
  index: number
}

export function NewsCard({ article, index }: NewsCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const { isAuthenticated } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const isFav = isFavorite(article.url)

  const publishedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const encodedUrl = encodeURIComponent(article.url)

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save articles",
        variant: "destructive",
      })
      router.push("/auth/login")
      return
    }

    try {
      if (isFav) {
        await removeFavorite(article.url)
        toast({
          title: "Removed from favorites",
          description: "Article has been removed from your saved list",
        })
      } else {
        await addFavorite(article)
        toast({
          title: "Added to favorites",
          description: "Article has been saved to your favorites",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update favorites",
        variant: "destructive",
      })
    }
  }

  const articleData = encodeURIComponent(JSON.stringify(article))

  return (
    <Card
      className="group overflow-hidden hover-lift animate-in fade-in slide-in-from-bottom-4 duration-300"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Link href={`/article?data=${articleData}`}>
        <CardHeader className="p-0">
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            {article.urlToImage ? (
              <Image
                src={article.urlToImage || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                <span className="text-muted-foreground">No image available</span>
              </div>
            )}
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "absolute right-2 top-2 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110",
                isFav && "opacity-100",
              )}
              onClick={handleFavoriteClick}
            >
              <Heart
                className={cn("h-4 w-4 transition-all duration-300", isFav && "fill-red-500 text-red-500 scale-110")}
              />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <Badge
              variant="secondary"
              className="text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {article.source.name}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <time dateTime={article.publishedAt}>{publishedDate}</time>
            </div>
          </div>
          <h3 className="mb-2 line-clamp-2 text-balance text-lg font-semibold leading-tight transition-colors duration-200 group-hover:text-primary font-sans">
            {article.title}
          </h3>
          {article.description && (
            <p className="line-clamp-3 text-sm text-muted-foreground transition-colors duration-200 group-hover:text-foreground">
              {article.description}
            </p>
          )}
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center gap-1 text-sm text-primary transition-all duration-200 group-hover:gap-2">
            <span>Read more</span>
            <ExternalLink className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}
