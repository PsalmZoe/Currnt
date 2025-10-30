"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { RefreshCw } from "lucide-react"

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: ReactNode
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const startY = useRef(0)
  const isPulling = useRef(false)

  const threshold = 80

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY
      isPulling.current = true
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling.current || isRefreshing) return

    const currentY = e.touches[0].clientY
    const distance = currentY - startY.current

    if (distance > 0 && window.scrollY === 0) {
      setPullDistance(Math.min(distance, threshold * 1.5))
    }
  }

  const handleTouchEnd = async () => {
    if (!isPulling.current || isRefreshing) return

    isPulling.current = false

    if (pullDistance >= threshold) {
      setIsRefreshing(true)
      await onRefresh()
      setIsRefreshing(false)
    }

    setPullDistance(0)
  }

  const rotation = (pullDistance / threshold) * 360

  return (
    <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-50 flex items-center justify-center transition-all"
        style={{
          height: `${pullDistance}px`,
          opacity: pullDistance / threshold,
        }}
      >
        <div className="rounded-full bg-background p-2 shadow-lg">
          <RefreshCw
            className="h-6 w-6 text-primary"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isRefreshing ? "transform 0.5s linear" : "none",
              animation: isRefreshing ? "spin 1s linear infinite" : "none",
            }}
          />
        </div>
      </div>
      {children}
    </div>
  )
}
