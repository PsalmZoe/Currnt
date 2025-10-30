import { NextResponse } from "next/server"
import type { VideoArticle } from "@/lib/types"

// Mock video data - in production, this would fetch from a real video news API
const mockVideos: VideoArticle[] = [
  {
    id: "1",
    title: "Breaking: Major Economic Policy Changes Announced",
    description: "Government announces sweeping changes to economic policy affecting millions of citizens nationwide",
    thumbnail: "/economic-policy-government.jpg",
    videoUrl: "https://www.youtube.com/embed/jfKfPfyJRdk", // BBC News sample
    source: "News Network",
    publishedAt: new Date().toISOString(),
    duration: "5:32",
    category: "business",
  },
  {
    id: "2",
    title: "Tech Giants Unveil Revolutionary AI Technology",
    description:
      "Leading technology companies showcase groundbreaking artificial intelligence advancements at annual conference",
    thumbnail: "/artificial-intelligence-technology.png",
    videoUrl: "https://www.youtube.com/embed/aircAruvnKk", // AI explanation video
    source: "Tech Today",
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    duration: "8:15",
    category: "technology",
  },
  {
    id: "3",
    title: "Championship Finals: Thrilling Match Recap",
    description:
      "Highlights from today's championship match with stunning plays and dramatic moments that kept fans on edge",
    thumbnail: "/sports-championship-celebration.png",
    videoUrl: "https://www.youtube.com/embed/EngW7tLk6R8", // Sports highlights
    source: "Sports Central",
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    duration: "12:45",
    category: "sports",
  },
  {
    id: "4",
    title: "Medical Breakthrough: New Treatment Shows Promise",
    description:
      "Researchers announce significant progress in treating chronic diseases with innovative medical approach",
    thumbnail: "/medical-research-lab.png",
    videoUrl: "https://www.youtube.com/embed/RrAg6hNvS_4", // Medical research video
    source: "Health News",
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    duration: "6:20",
    category: "health",
  },
  {
    id: "5",
    title: "Climate Summit: World Leaders Reach Historic Agreement",
    description: "International climate conference concludes with unprecedented commitments to reduce carbon emissions",
    thumbnail: "/climate-summit-leaders.png",
    videoUrl: "https://www.youtube.com/embed/ipVxxxqwBQw", // Climate change video
    source: "Global News",
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    duration: "10:30",
    category: "science",
  },
  {
    id: "6",
    title: "Entertainment Awards: Red Carpet Highlights",
    description:
      "Stars shine at annual entertainment awards ceremony with memorable performances and emotional speeches",
    thumbnail: "/red-carpet-awards-ceremony.jpg",
    videoUrl: "https://www.youtube.com/embed/TcMBFSGVi1c", // Entertainment news
    source: "Entertainment Tonight",
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    duration: "15:45",
    category: "entertainment",
  },
  {
    id: "7",
    title: "Space Exploration: New Mission to Mars Announced",
    description:
      "Space agency reveals ambitious plans for next-generation Mars exploration mission with advanced technology",
    thumbnail: "/mars-mission-space-exploration.jpg",
    videoUrl: "https://www.youtube.com/embed/P6MOnehCOUw", // Space exploration video
    source: "Science Daily",
    publishedAt: new Date(Date.now() - 21600000).toISOString(),
    duration: "7:55",
    category: "science",
  },
  {
    id: "8",
    title: "Stock Market Update: Markets Reach New Heights",
    description: "Financial markets continue upward trend as investors respond positively to economic indicators",
    thumbnail: "/stock-market-trading-floor.png",
    videoUrl: "https://www.youtube.com/embed/p7HKvqRI_Bo", // Stock market news
    source: "Financial Times",
    publishedAt: new Date(Date.now() - 25200000).toISOString(),
    duration: "4:30",
    category: "business",
  },
  {
    id: "9",
    title: "Olympic Qualifiers: Athletes Compete for Glory",
    description: "Top athletes from around the world compete in intense qualifying rounds for upcoming Olympic games",
    thumbnail: "/olympic-athletes-competition.jpg",
    videoUrl: "https://www.youtube.com/embed/WXiMmFV4W_8", // Olympic sports video
    source: "Sports Network",
    publishedAt: new Date(Date.now() - 28800000).toISOString(),
    duration: "11:20",
    category: "sports",
  },
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category") || "general"

  try {
    // Filter videos by category
    const filteredVideos = category === "general" ? mockVideos : mockVideos.filter((v) => v.category === category)

    return NextResponse.json({
      videos: filteredVideos,
      total: filteredVideos.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching videos:", error)
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
}
