import { NewsCard } from "./news-card"
import { SkeletonCard } from "./skeleton-card"
import type { Article } from "@/lib/types"

interface NewsGridProps {
  articles: Article[]
  isLoading?: boolean
}

export function NewsGrid({ articles, isLoading = false }: NewsGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    )
  }

  if (articles.length === 0 && !isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center animate-in fade-in">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">No articles found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <NewsCard key={`${article.url}-${index}`} article={article} index={index} />
      ))}
    </div>
  )
}
