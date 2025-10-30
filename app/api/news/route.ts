import { type NextRequest, NextResponse } from "next/server"
import { fetchTopHeadlines } from "@/lib/news-api"
import type { Category } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = (searchParams.get("category") as Category) || "general"
    const search = searchParams.get("search") || undefined
    const page = Number.parseInt(searchParams.get("page") || "1")
    const pageSize = Number.parseInt(searchParams.get("pageSize") || "100")

    const data = await fetchTopHeadlines(category, search, page, pageSize)

    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching news:", error)

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"

    return NextResponse.json(
      {
        status: "error",
        articles: [],
        totalResults: 0,
        message: errorMessage,
      },
      { status: 500 },
    )
  }
}
