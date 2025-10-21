"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Eye, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { VideoArticle } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"

interface VideoCardProps {
  video: VideoArticle
}

export function VideoCard({ video }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [views] = useState(Math.floor(Math.random() * 100000) + 1000)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: video.title,
          text: video.description,
          url: video.videoUrl,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    }
  }

  return (
    <div className="group overflow-hidden rounded-xl bg-card shadow-md hover-lift transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {isPlaying ? (
          <iframe
            src={video.videoUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src={video.thumbnail || "/placeholder.svg?height=360&width=640"}
              alt={video.title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-300 group-hover:bg-black/50">
              <button
                onClick={() => setIsPlaying(true)}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 transition-all duration-300 hover:scale-110 hover:bg-white shadow-lg"
              >
                <Play className="ml-1 h-8 w-8 text-primary" fill="currentColor" />
              </button>
            </div>
            <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/80 px-2 py-1 text-xs text-white backdrop-blur-sm">
              <Clock className="h-3 w-3" />
              {video.duration}
            </div>
            <div className="absolute top-2 left-2 flex items-center gap-1 rounded-md bg-black/80 px-2 py-1 text-xs text-white backdrop-blur-sm">
              <Eye className="h-3 w-3" />
              {views.toLocaleString()}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <Badge className="bg-primary hover:bg-primary/90 transition-colors duration-200">{video.category}</Badge>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-110"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        <h3 className="mb-2 font-bold leading-tight line-clamp-2 transition-colors duration-200 group-hover:text-primary">
          {video.title}
        </h3>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2 transition-colors duration-200 group-hover:text-foreground">
          {video.description}
        </p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium">{video.source}</span>
          <span>{formatDistanceToNow(new Date(video.publishedAt), { addSuffix: true })}</span>
        </div>
      </div>
    </div>
  )
}
