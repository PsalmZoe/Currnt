"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Article } from "@/lib/types"

interface FavoritesContextType {
  favorites: Article[]
  addFavorite: (article: Article) => Promise<void>
  removeFavorite: (url: string) => Promise<void>
  isFavorite: (url: string) => boolean
  isLoading: boolean
  isAuthenticated: boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("newsapp_user")
    setIsAuthenticated(!!storedUser)

    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    setIsLoading(true)
    try {
      const stored = localStorage.getItem("newsapp_favorites")
      if (stored) {
        setFavorites(JSON.parse(stored))
      }
    } catch (error) {
      console.error("Error loading favorites:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const addFavorite = async (article: Article) => {
    try {
      const newFavorites = [...favorites, article]
      setFavorites(newFavorites)
      localStorage.setItem("newsapp_favorites", JSON.stringify(newFavorites))
    } catch (error) {
      console.error("Error adding favorite:", error)
      throw error
    }
  }

  const removeFavorite = async (url: string) => {
    try {
      const newFavorites = favorites.filter((fav) => fav.url !== url)
      setFavorites(newFavorites)
      localStorage.setItem("newsapp_favorites", JSON.stringify(newFavorites))
    } catch (error) {
      console.error("Error removing favorite:", error)
      throw error
    }
  }

  const isFavorite = (url: string) => {
    return favorites.some((fav) => fav.url === url)
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite, isLoading, isAuthenticated }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
