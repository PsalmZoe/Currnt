import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")

  if (!query || query.trim() === "") {
    return NextResponse.json({ articles: [] })
  }

  const apiKey = process.env.NEWS_API_KEY

  if (!apiKey) {
    return NextResponse.json({ message: "NEWS_API_KEY environment variable is not set" }, { status: 500 })
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=20&apiKey=${apiKey}`,
    )

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      if (data.code === "apiKeyInvalid") {
        return NextResponse.json(
          { message: "Invalid NewsAPI key. Please check your API key or get a new one at https://newsapi.org" },
          { status: 500 },
        )
      }
      throw new Error(data.message || "Failed to fetch search results")
    }

    const data = await response.json()
    return NextResponse.json({
      articles: data.articles || [],
      totalResults: data.totalResults || 0,
    })
  } catch (error) {
    console.error("[v0] Error searching news:", error)
    return NextResponse.json({ message: "Failed to search articles" }, { status: 500 })
  }
}
