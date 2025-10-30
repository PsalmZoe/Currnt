export interface Article {
  source: {
    id: string | null
    name: string
  }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

export interface NewsAPIResponse {
  status: string
  totalResults: number
  articles: Article[]
}

export type Category = "general" | "business" | "entertainment" | "health" | "science" | "sports" | "technology"

export interface VideoArticle {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
  source: string
  publishedAt: string
  duration: string
  category: string
}
