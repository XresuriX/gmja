"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Filter, ArrowUpDown, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ProductRating } from "@/components/product-rating"
import { WishlistButton } from "@/components/wishlist-button"
import { trackSearchResultClick } from "@/lib/analytics"

interface MobileSearchResultsProps {
  searchQuery: string
  products: any[]
  totalResults: number
  onFilterClick: () => void
  onSortClick: () => void
}

export function MobileSearchResults({
  searchQuery,
  products,
  totalResults,
  onFilterClick,
  onSortClick,
}: MobileSearchResultsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Get sort option from URL
  const sortOption = searchParams.get("sort") || "featured"

  // Format sort option for display
  const formatSortOption = (option: string) => {
    switch (option) {
      case "price-asc":
        return "Price: Low to High"
      case "price-desc":
        return "Price: High to Low"
      case "newest":
        return "Newest"
      case "rating-desc":
        return "Highest Rated"
      default:
        return "Featured"
    }
  }

  const handleProductClick = (productId: string, position: number) => {
    // Track the click for analytics
    trackSearchResultClick(searchQuery, productId, position, "mobile")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {totalResults} results for <span className="font-medium">"{searchQuery}"</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" className="flex-1 h-10" onClick={onFilterClick}>
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" className="flex-1 h-10" onClick={onSortClick}>
          <ArrowUpDown className="mr-2 h-4 w-4" />
          {formatSortOption(sortOption)}
        </Button>
      </div>

      <Separator />

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-3">
          {products.map((product, index) => (
            <Card key={product.id} className="overflow-hidden">
              <Link
                href={`/products/${product.id}`}
                onClick={() => handleProductClick(product.id, index)}
                className="block"
              >
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-40 w-full object-cover"
                  />
                  <div className="absolute right-2 top-2">
                    <WishlistButton product={product} size="sm" />
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="line-clamp-2 text-sm font-medium">{product.name}</h3>
                  <ProductRating
                    rating={product.averageRating}
                    reviewCount={product.reviewCount}
                    size="sm"
                    className="my-1"
                  />
                  <p className="font-bold text-gold-500">${product.price.toFixed(2)}</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((product, index) => (
            <Card key={product.id} className="overflow-hidden">
              <Link
                href={`/products/${product.id}`}
                onClick={() => handleProductClick(product.id, index)}
                className="block"
              >
                <div className="flex gap-3 p-3">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="line-clamp-2 text-sm font-medium">{product.name}</h3>
                    <ProductRating
                      rating={product.averageRating}
                      reviewCount={product.reviewCount}
                      size="sm"
                      className="my-1"
                    />
                    <div className="mt-auto flex items-center justify-between">
                      <p className="font-bold text-gold-500">${product.price.toFixed(2)}</p>
                      <WishlistButton product={product} size="sm" />
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
