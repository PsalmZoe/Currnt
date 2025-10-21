import { createClient as createBrowserClient } from "@/lib/supabase/client"
import { createClient as createServerClient } from "@/lib/supabase/server"
import type { Article } from "@/lib/types"

export interface SavedArticle {
  id: string
  user_id: string
  article_url: string
  article_title: string
  article_description: string | null
  article_image_url: string | null
  article_source: string
  article_author: string | null
  article_published_at: string
  saved_at: string
}

function getSafeSupabaseClient() {
  try {
    const client = createBrowserClient()
    if (!client) {
      throw new Error("Supabase client not configured")
    }
    return client
  } catch (error) {
    console.warn("[v0] Supabase not available, using localStorage fallback")
    return null
  }
}

// Client-side functions
export async function saveArticle(article: Article) {
  const supabase = getSafeSupabaseClient()

  if (!supabase) {
    return null
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      throw new Error("You must be logged in to save articles")
    }

    const { data, error } = await supabase
      .from("saved_articles")
      .insert({
        user_id: user.id,
        article_url: article.url,
        article_title: article.title,
        article_description: article.description,
        article_image_url: article.urlToImage,
        article_source: article.source.name,
        article_author: article.author,
        article_published_at: article.publishedAt,
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.warn("[v0] Failed to save article to Supabase:", error)
    return null
  }
}

export async function unsaveArticle(articleUrl: string) {
  const supabase = getSafeSupabaseClient()

  if (!supabase) {
    return
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      throw new Error("You must be logged in to unsave articles")
    }

    const { error } = await supabase
      .from("saved_articles")
      .delete()
      .eq("user_id", user.id)
      .eq("article_url", articleUrl)

    if (error) throw error
  } catch (error) {
    console.warn("[v0] Failed to unsave article from Supabase:", error)
  }
}

export async function getSavedArticles() {
  const supabase = getSafeSupabaseClient()

  if (!supabase) {
    return []
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return []
    }

    const { data, error } = await supabase
      .from("saved_articles")
      .select("*")
      .eq("user_id", user.id)
      .order("saved_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.warn("[v0] Failed to get saved articles from Supabase:", error)
    return []
  }
}

export async function isArticleSaved(articleUrl: string): Promise<boolean> {
  const supabase = getSafeSupabaseClient()

  if (!supabase) {
    return false
  }

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return false
    }

    const { data, error } = await supabase
      .from("saved_articles")
      .select("id")
      .eq("user_id", user.id)
      .eq("article_url", articleUrl)
      .single()

    if (error && error.code !== "PGRST116") throw error
    return !!data
  } catch (error) {
    console.warn("[v0] Failed to check if article is saved:", error)
    return false
  }
}

// Server-side functions
export async function getSavedArticlesServer() {
  try {
    const supabase = await createServerClient()

    if (!supabase) {
      return []
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return []
    }

    const { data, error } = await supabase
      .from("saved_articles")
      .select("*")
      .eq("user_id", user.id)
      .order("saved_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.warn("[v0] Failed to get saved articles from server:", error)
    return []
  }
}
