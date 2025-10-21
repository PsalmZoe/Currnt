"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type ReadingMode = "compact" | "comfortable" | "spacious"
export type FontSize = "small" | "medium" | "large"
export type ViewMode = "grid" | "list"

interface SettingsContextType {
  fontSize: FontSize
  setFontSize: (size: FontSize) => void
  readingMode: ReadingMode
  setReadingMode: (mode: ReadingMode) => void
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
  autoRefresh: boolean
  setAutoRefresh: (enabled: boolean) => void
  autoRefreshInterval: number
  setAutoRefreshInterval: (interval: number) => void
  dataSavingMode: boolean
  setDataSavingMode: (enabled: boolean) => void
  showReadingTime: boolean
  setShowReadingTime: (enabled: boolean) => void
  clearCache: () => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSize>("medium")
  const [readingMode, setReadingModeState] = useState<ReadingMode>("comfortable")
  const [viewMode, setViewModeState] = useState<ViewMode>("grid")
  const [autoRefresh, setAutoRefreshState] = useState(false)
  const [autoRefreshInterval, setAutoRefreshIntervalState] = useState(300000) // 5 minutes
  const [dataSavingMode, setDataSavingModeState] = useState(false)
  const [showReadingTime, setShowReadingTimeState] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load all settings from localStorage
    const storedFontSize = localStorage.getItem("newsapp_fontSize") as FontSize
    const storedReadingMode = localStorage.getItem("newsapp_readingMode") as ReadingMode
    const storedViewMode = localStorage.getItem("newsapp_viewMode") as ViewMode
    const storedAutoRefresh = localStorage.getItem("newsapp_autoRefresh")
    const storedAutoRefreshInterval = localStorage.getItem("newsapp_autoRefreshInterval")
    const storedDataSavingMode = localStorage.getItem("newsapp_dataSavingMode")
    const storedShowReadingTime = localStorage.getItem("newsapp_showReadingTime")

    if (storedFontSize) setFontSizeState(storedFontSize)
    if (storedReadingMode) setReadingModeState(storedReadingMode)
    if (storedViewMode) setViewModeState(storedViewMode)
    if (storedAutoRefresh) setAutoRefreshState(JSON.parse(storedAutoRefresh))
    if (storedAutoRefreshInterval) setAutoRefreshIntervalState(Number(storedAutoRefreshInterval))
    if (storedDataSavingMode) setDataSavingModeState(JSON.parse(storedDataSavingMode))
    if (storedShowReadingTime) setShowReadingTimeState(JSON.parse(storedShowReadingTime))
  }, [])

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size)
    localStorage.setItem("newsapp_fontSize", size)
  }

  const setReadingMode = (mode: ReadingMode) => {
    setReadingModeState(mode)
    localStorage.setItem("newsapp_readingMode", mode)
  }

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode)
    localStorage.setItem("newsapp_viewMode", mode)
  }

  const setAutoRefresh = (enabled: boolean) => {
    setAutoRefreshState(enabled)
    localStorage.setItem("newsapp_autoRefresh", JSON.stringify(enabled))
  }

  const setAutoRefreshInterval = (interval: number) => {
    setAutoRefreshIntervalState(interval)
    localStorage.setItem("newsapp_autoRefreshInterval", interval.toString())
  }

  const setDataSavingMode = (enabled: boolean) => {
    setDataSavingModeState(enabled)
    localStorage.setItem("newsapp_dataSavingMode", JSON.stringify(enabled))
  }

  const setShowReadingTime = (enabled: boolean) => {
    setShowReadingTimeState(enabled)
    localStorage.setItem("newsapp_showReadingTime", JSON.stringify(enabled))
  }

  const clearCache = () => {
    // Clear all cached data except user preferences
    const keysToKeep = [
      "newsapp_theme",
      "newsapp_fontSize",
      "newsapp_readingMode",
      "newsapp_viewMode",
      "newsapp_autoRefresh",
      "newsapp_autoRefreshInterval",
      "newsapp_dataSavingMode",
      "newsapp_showReadingTime",
      "newsapp_notifications",
      "newsapp_user",
      "newsapp_favorites",
      "newsapp_preferences",
    ]

    Object.keys(localStorage).forEach((key) => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key)
      }
    })
  }

  return (
    <SettingsContext.Provider
      value={{
        fontSize,
        setFontSize,
        readingMode,
        setReadingMode,
        viewMode,
        setViewMode,
        autoRefresh,
        setAutoRefresh,
        autoRefreshInterval,
        setAutoRefreshInterval,
        dataSavingMode,
        setDataSavingMode,
        showReadingTime,
        setShowReadingTime,
        clearCache,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
