"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  category: string
  brand: string
  averageRating: number
  reviewCount: number
  dateAdded: string
}

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  addToWishlist: (product: Omit<WishlistItem, "dateAdded">) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
  wishlistCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const { toast } = useToast()

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("grandmarketja-wishlist")
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist))
      }
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error)
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("grandmarketja-wishlist", JSON.stringify(wishlistItems))
    } catch (error) {
      console.error("Error saving wishlist to localStorage:", error)
    }
  }, [wishlistItems])

  const addToWishlist = (product: Omit<WishlistItem, "dateAdded">) => {
    const existingItem = wishlistItems.find((item) => item.id === product.id)

    if (existingItem) {
      toast({
        title: "Already in wishlist",
        description: "This product is already in your wishlist.",
        variant: "destructive",
      })
      return
    }

    const newItem: WishlistItem = {
      ...product,
      dateAdded: new Date().toISOString(),
    }

    setWishlistItems((prev) => [...prev, newItem])

    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    })
  }

  const removeFromWishlist = (productId: string) => {
    const item = wishlistItems.find((item) => item.id === productId)

    setWishlistItems((prev) => prev.filter((item) => item.id !== productId))

    if (item) {
      toast({
        title: "Removed from wishlist",
        description: `${item.name} has been removed from your wishlist.`,
      })
    }
  }

  const isInWishlist = (productId: string) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  const clearWishlist = () => {
    setWishlistItems([])
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    })
  }

  const value: WishlistContextType = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount: wishlistItems.length,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
