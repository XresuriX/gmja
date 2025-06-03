"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X, ArrowLeft, Clock, TrendingUpIcon as Trending, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { trackSearchQuery, getPopularSearchTerms } from "@/lib/analytics"

interface MobileSearchProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileSearch({ isOpen, onClose }: MobileSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [popularSearches, setPopularSearches] = useState<{ term: string; count: number }[]>([])
  const [activeTab, setActiveTab] = useState<"suggestions" | "history" | "trending">("suggestions")
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Load search history from localStorage
  useEffect(() => {
    if (isOpen) {
      try {
        const history = JSON.parse(localStorage.getItem("searchHistory") || "[]")
        setSearchHistory(
          Array.from(new Set(history.map((item: { query: string }) => item.query)))
            .slice(0, 5)
            .reverse(),
        )

        // Get popular searches
        const popular = getPopularSearchTerms().slice(0, 5)
        setPopularSearches(popular)
      } catch (error) {
        console.error("Error loading search history:", error)
      }
    }
  }, [isOpen])

  // Handle autocomplete suggestions
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([])
      return
    }

    // In a real app, you would fetch suggestions from an API
    // For now, we'll use mock data
    const mockProducts = [
      "Wireless Headphones",
      "Bluetooth Earbuds",
      "Noise Cancelling Headphones",
      "Wireless Speakers",
      "Gaming Headset",
      "Portable Speaker",
      "Waterproof Earbuds",
      "Smart Speaker",
      "DJ Headphones",
      "Surround Sound System",
    ]

    const filtered = mockProducts.filter((product) => product.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    setSuggestions(filtered)
  }, [query])

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    // Track the search query
    trackSearchQuery(searchQuery)

    // Navigate to search results
    router.push(`/products?q=${encodeURIComponent(searchQuery)}`)
    onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const clearSearch = () => {
    setQuery("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background" ref={containerRef}>
      <div className="border-b p-2">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Button type="button" variant="ghost" size="icon" onClick={onClose}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="pl-10 pr-10"
            />
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
          <Button type="submit" className="bg-gold-500 text-black hover:bg-gold-600">
            Search
          </Button>
        </form>
      </div>

      <div className="flex border-b">
        <Button
          variant={activeTab === "suggestions" ? "default" : "ghost"}
          className={`flex-1 rounded-none ${
            activeTab === "suggestions" ? "bg-gold-500 text-black hover:bg-gold-600" : ""
          }`}
          onClick={() => setActiveTab("suggestions")}
        >
          <Search className="mr-2 h-4 w-4" />
          Suggestions
        </Button>
        <Button
          variant={activeTab === "history" ? "default" : "ghost"}
          className={`flex-1 rounded-none ${activeTab === "history" ? "bg-gold-500 text-black hover:bg-gold-600" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          <History className="mr-2 h-4 w-4" />
          History
        </Button>
        <Button
          variant={activeTab === "trending" ? "default" : "ghost"}
          className={`flex-1 rounded-none ${
            activeTab === "trending" ? "bg-gold-500 text-black hover:bg-gold-600" : ""
          }`}
          onClick={() => setActiveTab("trending")}
        >
          <Trending className="mr-2 h-4 w-4" />
          Trending
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {activeTab === "suggestions" && (
          <div className="p-4">
            {query.trim() === "" ? (
              <div className="flex h-32 items-center justify-center text-muted-foreground">
                <p>Start typing to see suggestions</p>
              </div>
            ) : suggestions.length > 0 ? (
              <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>
                    <Button variant="ghost" className="w-full justify-start" onClick={() => handleSearch(suggestion)}>
                      <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                      {suggestion}
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex h-32 items-center justify-center text-muted-foreground">
                <p>No suggestions found</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="p-4">
            {searchHistory.length > 0 ? (
              <ul className="space-y-2">
                {searchHistory.map((term, index) => (
                  <li key={index}>
                    <Button variant="ghost" className="w-full justify-start" onClick={() => handleSearch(term)}>
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      {term}
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex h-32 items-center justify-center text-muted-foreground">
                <p>No search history</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "trending" && (
          <div className="p-4">
            {popularSearches.length > 0 ? (
              <ul className="space-y-2">
                {popularSearches.map((item, index) => (
                  <li key={index}>
                    <Button variant="ghost" className="w-full justify-start" onClick={() => handleSearch(item.term)}>
                      <Trending className="mr-2 h-4 w-4 text-muted-foreground" />
                      {item.term}
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex h-32 items-center justify-center text-muted-foreground">
                <p>No trending searches</p>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
