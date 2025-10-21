"use client"

import { Button } from "@/components/ui/button"
import type { Category } from "@/lib/types"

const categories: { value: Category; label: string }[] = [
  { value: "general", label: "All" },
  { value: "business", label: "Business" },
  { value: "entertainment", label: "Entertainment" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
  { value: "sports", label: "Sports" },
  { value: "technology", label: "Technology" },
]

interface CategoryFilterProps {
  selectedCategory: Category
  onCategoryChange: (category: Category) => void
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={selectedCategory === category.value ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.value)}
          className="text-sm transition-transform hover:scale-105"
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}
