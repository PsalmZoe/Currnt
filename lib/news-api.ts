import type { NewsAPIResponse, Category } from "./types"

const API_KEY = process.env.NEWS_API_KEY

const BASE_URL = "https://newsapi.org/v2"

if (!API_KEY) {
  console.warn(
    "⚠️ NEWS_API_KEY is not set. Please add it to your environment variables.\n" +
      "Get a free API key at https://newsapi.org",
  )
}

export async function fetchTopHeadlines(
  category?: Category,
  searchQuery?: string,
  page = 1,
  pageSize = 20,
): Promise<NewsAPIResponse> {
  if (!API_KEY) {
    throw new Error(
      "NEWS_API_KEY is not configured. Please add your NewsAPI key to environment variables. " +
        "Get a free key at https://newsapi.org",
    )
  }

  const params = new URLSearchParams({
    apiKey: API_KEY,
    country: "us",
    pageSize: pageSize.toString(),
    page: page.toString(),
  })

  if (category && category !== "general") {
    params.append("category", category)
  }

  if (searchQuery) {
    params.append("q", searchQuery)
  }

  const response = await fetch(`${BASE_URL}/top-headlines?${params}`, {
    next: { revalidate: 300 }, // Cache for 5 minutes
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const errorMessage = errorData.message || response.statusText

    if (response.status === 401) {
      throw new Error(
        `Invalid NewsAPI key. Please check your API key or get a new one at https://newsapi.org. Error: ${errorMessage}`,
      )
    }

    throw new Error(`Failed to fetch news (${response.status}): ${errorMessage}`)
  }

  return response.json()
}

export async function searchNews(query: string, page = 1, pageSize = 20): Promise<NewsAPIResponse> {
  if (!API_KEY) {
    throw new Error(
      "NEWS_API_KEY is not configured. Please add your NewsAPI key to environment variables. " +
        "Get a free key at https://newsapi.org",
    )
  }

  const params = new URLSearchParams({
    apiKey: API_KEY,
    q: query,
    sortBy: "publishedAt",
    pageSize: pageSize.toString(),
    page: page.toString(),
  })

  const response = await fetch(`${BASE_URL}/everything?${params}`, {
    next: { revalidate: 300 },
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const errorMessage = errorData.message || response.statusText

    if (response.status === 401) {
      throw new Error(
        `Invalid NewsAPI key. Please check your API key or get a new one at https://newsapi.org. Error: ${errorMessage}`,
      )
    }

    throw new Error(`Failed to search news (${response.status}): ${errorMessage}`)
  }

  return response.json()
}
