"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2, Filter, Grid, List } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWishlist } from "@/contexts/wishlist-context"
import { ProductRating } from "@/components/product-rating"
import { WishlistButton } from "@/components/wishlist-button"

export default function WishlistPage() {
  const { wishlistItems, clearWishlist, wishlistCount } = useWishlist()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("dateAdded")
  const [filterBy, setFilterBy] = useState("all")

  // Get unique categories for filtering
  const categories = Array.from(new Set(wishlistItems.map((item) => item.category)))

  // Filter and sort wishlist items
  const filteredAndSortedItems = wishlistItems
    .filter((item) => filterBy === "all" || item.category === filterBy)
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "rating":
          return b.averageRating - a.averageRating
        case "dateAdded":
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      }
    })

  const handleAddToCart = (productId: string) => {
    // In a real app, you would add the product to the cart
    console.log("Adding product to cart:", productId)
  }

  const handleAddAllToCart = () => {
    // In a real app, you would add all wishlist items to the cart
    console.log("Adding all wishlist items to cart")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Wishlist</h1>
              <p className="text-muted-foreground">
                {wishlistCount} {wishlistCount === 1 ? "item" : "items"} saved for later
              </p>
            </div>
            {wishlistCount > 0 && (
              <div className="flex gap-2">
                <Button onClick={handleAddAllToCart} className="bg-gold-500 text-black hover:bg-gold-600">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add All to Cart
                </Button>
                <Button variant="outline" onClick={clearWishlist}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Wishlist
                </Button>
              </div>
            )}
          </div>

          {wishlistCount === 0 ? (
            <div className="rounded-lg border p-12 text-center">
              <Heart className="mx-auto h-16 w-16 text-muted-foreground" />
              <h2 className="mt-4 text-xl font-medium">Your wishlist is empty</h2>
              <p className="mt-2 text-muted-foreground">Discover amazing products and save your favorites for later.</p>
              <Button asChild className="mt-6 bg-gold-500 text-black hover:bg-gold-600">
                <Link href="/products">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <Select value={filterBy} onValueChange={setFilterBy}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Filter by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dateAdded">Date Added</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {filteredAndSortedItems.map((item) => (
                    <Card key={item.id} className="group relative overflow-hidden">
                      <div className="absolute right-2 top-2 z-10">
                        <WishlistButton product={item} size="sm" />
                      </div>
                      <CardContent className="p-4">
                        <Link href={`/products/${item.id}`}>
                          <div className="aspect-square overflow-hidden rounded-md bg-muted">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={200}
                              height={200}
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                        </Link>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start p-4 pt-0">
                        <Link href={`/products/${item.id}`} className="w-full">
                          <h3 className="line-clamp-2 text-sm font-medium hover:text-gold-500">{item.name}</h3>
                        </Link>
                        <ProductRating
                          rating={item.averageRating}
                          reviewCount={item.reviewCount}
                          size="sm"
                          className="my-1"
                        />
                        <div className="flex w-full items-center justify-between">
                          <p className="font-bold text-gold-500">${item.price.toFixed(2)}</p>
                          <Button
                            size="sm"
                            className="bg-gold-500 text-black hover:bg-gold-600"
                            onClick={() => handleAddToCart(item.id)}
                          >
                            <ShoppingCart className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Added {new Date(item.dateAdded).toLocaleDateString()}
                        </p>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAndSortedItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="flex gap-4 p-4">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                          <Link href={`/products/${item.id}`}>
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={96}
                              height={96}
                              className="h-full w-full object-cover transition-transform hover:scale-105"
                            />
                          </Link>
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <Link href={`/products/${item.id}`}>
                                <h3 className="font-medium hover:text-gold-500">{item.name}</h3>
                              </Link>
                              <ProductRating
                                rating={item.averageRating}
                                reviewCount={item.reviewCount}
                                size="sm"
                                className="my-1"
                              />
                              <p className="text-sm text-muted-foreground">
                                {item.category.charAt(0).toUpperCase() + item.category.slice(1)} • {item.brand}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <p className="text-lg font-bold text-gold-500">${item.price.toFixed(2)}</p>
                              <WishlistButton product={item} size="sm" />
                            </div>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              Added on {new Date(item.dateAdded).toLocaleDateString()}
                            </p>
                            <Button
                              className="bg-gold-500 text-black hover:bg-gold-600"
                              onClick={() => handleAddToCart(item.id)}
                            >
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
