import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const url = searchParams.get("url")

    if (!url) {
      return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
    }

    // In a real app, you might fetch additional article data here
    // For now, we'll return a simple response indicating the article URL
    // The client will handle displaying the article data it already has
    return NextResponse.json({
      article: {
        url: decodeURIComponent(url),
      },
    })
  } catch (error) {
    console.error("[v0] Error fetching article:", error)
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 })
  }
}
