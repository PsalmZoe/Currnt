"use client"

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import type { Article } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface FeaturedArticleProps {
  article: Article
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <Link
      href={`/article?url=${encodeURIComponent(article.url)}`}
      className="group block overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Image */}
        <div className="relative h-64 md:h-full overflow-hidden">
          <Image
            src={article.urlToImage || "/placeholder.svg?height=400&width=600"}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 flex gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <div className="h-2 w-2 rounded-full bg-gray-400" />
            <div className="h-2 w-2 rounded-full bg-gray-400" />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-6 md:p-8">
          <div className="mb-3 flex items-center gap-2">
            <Badge className="bg-[#3B82F6] hover:bg-[#3B82F6]/90">Category</Badge>
            <span className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
            </span>
          </div>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 line-clamp-3">{article.title}</h1>
          <p className="mb-4 text-base text-muted-foreground line-clamp-3">{article.description}</p>
          <div className="text-sm text-muted-foreground">
            {article.source.name} • {article.author || "Unknown"}
          </div>
        </div>
      </div>
    </Link>
  )
}
