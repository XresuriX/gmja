"use client"

import { Suspense, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductSearch } from "@/components/product-search"
import { ProductFiltersSidebar } from "@/components/product-filters-sidebar"
import { ProductGrid } from "@/components/product-grid"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Filter, ArrowUpDown } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { MobileFilterDrawer } from "@/components/mobile-filter-drawer"
import { MobileSortDrawer } from "@/components/mobile-sort-drawer"

interface ProductsPageProps {
  searchParams: {
    q?: string
    categories?: string
    brands?: string
    minPrice?: string
    maxPrice?: string
    sort?: string
    ratings?: string
  }
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const { q, categories, brands, minPrice, maxPrice, sort, ratings } = searchParams
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false)

  // Build a filter summary for display
  const hasFilters = q || categories || brands || minPrice || maxPrice || ratings

  // Count active filters for badge
  const getActiveFilterCount = () => {
    let count = 0
    if (q) count++
    if (categories) count++
    if (brands) count++
    if ((minPrice && minPrice !== "0") || (maxPrice && maxPrice !== "1000")) count++
    if (ratings) count++
    return count
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="mb-8 text-3xl font-bold">All Products</h1>

          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <ProductSearch />
            </div>
            <div className="flex items-center gap-2">
              {/* Mobile filter and sort buttons */}
              <div className="flex w-full gap-2 md:hidden">
                <Button variant="outline" className="flex-1" onClick={() => setIsMobileFilterOpen(true)}>
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-1 rounded-full bg-gold-500 px-1.5 py-0.5 text-xs text-black">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setIsMobileSortOpen(true)}>
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Sort
                  {sort && <span className="ml-1 rounded-full bg-gold-500 px-1.5 py-0.5 text-xs text-black">1</span>}
                </Button>
              </div>

              {/* Desktop filter button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden hidden">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="py-4">
                    <h2 className="mb-6 text-lg font-medium">Filters</h2>
                    <ProductFiltersSidebar />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Desktop sort dropdown */}
              <select
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hidden md:block"
                value={sort || "featured"}
                onChange={(e) => {
                  const url = new URL(window.location.href)
                  if (e.target.value !== "featured") {
                    url.searchParams.set("sort", e.target.value)
                  } else {
                    url.searchParams.delete("sort")
                  }
                  window.location.href = url.toString()
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating-desc">Highest Rated</option>
              </select>
            </div>
          </div>

          {hasFilters && (
            <div className="mb-6 rounded-md bg-muted p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">Active Filters:</span>
                {q && <span className="rounded-full bg-background px-3 py-1 text-xs">Search: {q}</span>}
                {categories && (
                  <span className="rounded-full bg-background px-3 py-1 text-xs">
                    Categories: {categories.split(",").join(", ")}
                  </span>
                )}
                {brands && (
                  <span className="rounded-full bg-background px-3 py-1 text-xs">
                    Brands: {brands.split(",").join(", ")}
                  </span>
                )}
                {minPrice && maxPrice && (
                  <span className="rounded-full bg-background px-3 py-1 text-xs">
                    Price: ${minPrice} - ${maxPrice}
                  </span>
                )}
                {ratings && (
                  <span className="rounded-full bg-background px-3 py-1 text-xs">
                    Rating:{" "}
                    {ratings
                      .split(",")
                      .map((r) => `${r}★ & up`)
                      .join(", ")}
                  </span>
                )}
                <Button
                  variant="link"
                  className="ml-auto text-xs"
                  onClick={() => {
                    window.location.href = "/products"
                  }}
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="hidden md:block">
              <div className="sticky top-20 rounded-lg border p-4">
                <h2 className="mb-6 text-lg font-medium">Filters</h2>
                <ProductFiltersSidebar />
              </div>
            </div>
            <div className="md:col-span-3">
              <Suspense fallback={<ProductGridSkeleton />}>
                <ProductGrid
                  title="Products"
                  searchQuery={q}
                  categoryFilter={categories}
                  brandFilter={brands}
                  priceRange={minPrice && maxPrice ? [Number.parseInt(minPrice), Number.parseInt(maxPrice)] : undefined}
                  sortOrder={sort}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Mobile filter drawer */}
      <MobileFilterDrawer isOpen={isMobileFilterOpen} onClose={() => setIsMobileFilterOpen(false)} />

      {/* Mobile sort drawer */}
      <MobileSortDrawer isOpen={isMobileSortOpen} onClose={() => setIsMobileSortOpen(false)} />
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-lg border p-4">
          <Skeleton className="aspect-square w-full rounded-md" />
          <Skeleton className="mt-4 h-4 w-3/4" />
          <Skeleton className="mt-2 h-4 w-1/2" />
          <Skeleton className="mt-4 h-4 w-1/4" />
        </div>
      ))}
    </div>
  )
}
