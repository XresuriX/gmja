"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ProductRating } from "@/components/product-rating"
import { WishlistButton } from "@/components/wishlist-button"

interface ProductGridProps {
  title: string
  searchQuery?: string
  categoryFilter?: string
  brandFilter?: string
  priceRange?: [number, number]
  sortOrder?: string
}

interface Product {
  id: string
  name: string
  price: number
  image: string
  color: string
  category: string
  brand: string
  averageRating: number
  reviewCount: number
}

export function ProductGrid({
  title,
  searchQuery,
  categoryFilter,
  brandFilter,
  priceRange,
  sortOrder = "featured",
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Mock product data
  const allProducts: Product[] = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 299.99,
      image: "/placeholder.svg?height=300&width=300",
      color: "White",
      category: "headphones",
      brand: "sony",
      averageRating: 4.5,
      reviewCount: 128,
    },
    {
      id: "2",
      name: "Studio Pro Headphones",
      price: 349.99,
      image: "/placeholder.svg?height=300&width=300",
      color: "Black",
      category: "headphones",
      brand: "bose",
      averageRating: 4.2,
      reviewCount: 95,
    },
    {
      id: "3",
      name: "Noise Cancelling Earbuds",
      price: 199.99,
      image: "/placeholder.svg?height=300&width=300",
      color: "Gold",
      category: "earbuds",
      brand: "apple",
      averageRating: 4.7,
      reviewCount: 203,
    },
    {
      id: "4",
      name: "DJ Professional Headset",
      price: 249.99,
      image: "/placeholder.svg?height=300&width=300",
      color: "Black",
      category: "headphones",
      brand: "jbl",
      averageRating: 4.0,
      reviewCount: 76,
    },
    {
      id: "5",
      name: "Wireless Gaming Headset",
      price: 179.99,
      image: "/placeholder.svg?height=300&width=300",
      color: "White",
      category: "headphones",
      brand: "logitech",
      averageRating: 4.3,
      reviewCount: 112,
    },
    {
      id: "6",
      name: "Premium Sound Earphones",
      price: 129.99,
      image: "/placeholder.svg?height=300&width=300",
      color: "Green",
      category: "earbuds",
      brand: "samsung",
      averageRating: 3.9,
      reviewCount: 64,
    },
    {
      id: "7",
      name: "Audiophile Headphones",
      price: 399.99,
      image: "/placeholder.svg?height=300&width=300",
      color: "Silver",
      category: "headphones",
      brand: "sony",
      averageRating: 4.8,
      reviewCount: 156,
    },
    {
      id: "8",
      name: "Bluetooth Sports Earbuds",
      price: 149.99,
      image: "/placeholder.svg?height=300&width=300",
      color: "Black",
      category: "earbuds",
      brand: "jbl",
      averageRating: 4.1,
      reviewCount: 89,
    },
    {
      id: "9",
      name: "Portable Bluetooth Speaker",
      price: 89.99,
      image: "/placeholder.svg?height=300&width=300",
      color: "Blue",
      category: "speakers",
      brand: "jbl",
      averageRating: 4.4,
      reviewCount: 132,
    },
    {
      id: "10",
      name: "Smart Home Speaker",
      price: 199.99,
      image: "/placeholder.svg?height=300&width=300",
      color: "Black",
      category: "speakers",
      brand: "bose",
      averageRating: 4.6,
      reviewCount: 178,
    },
    {
      id: "11",
      name: "Waterproof Bluetooth Speaker",
      price: 129.99,
      image: "/placeholder.svg?height=300&width=300",
      color: "Red",
      category: "speakers",
      brand: "sony",
      averageRating: 4.2,
      reviewCount: 97,
    },
    {
      id: "12",
      name: "Headphone Carrying Case",
      price: 29.99,
      image: "/placeholder.svg?height=300&width=300",
      color: "Black",
      category: "accessories",
      brand: "generic",
      averageRating: 3.8,
      reviewCount: 45,
    },
  ]

  useEffect(() => {
    // Simulate API call with filtering
    setLoading(true)

    // Filter by search query
    let filteredProducts = [...allProducts]

    if (searchQuery) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (categoryFilter) {
      const categories = categoryFilter.split(",")
      filteredProducts = filteredProducts.filter((product) => categories.includes(product.category))
    }

    // Filter by brand
    if (brandFilter) {
      const brands = brandFilter.split(",")
      filteredProducts = filteredProducts.filter((product) => brands.includes(product.brand))
    }

    // Filter by price range
    if (priceRange) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= priceRange[0] && product.price <= priceRange[1],
      )
    }

    // Sort products
    switch (sortOrder) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "newest":
        // In a real app, you would sort by date
        filteredProducts.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
        break
      case "rating-desc":
        filteredProducts.sort((a, b) => b.averageRating - a.averageRating)
        break
      default:
        // 'featured' - no specific sorting
        break
    }

    setProducts(filteredProducts)
    setLoading(false)
  }, [searchQuery, categoryFilter, brandFilter, priceRange, sortOrder])

  if (loading) {
    return <p>Loading products...</p>
  }

  if (products.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <h2 className="text-xl font-medium">No products found</h2>
        <p className="mt-2 text-muted-foreground">
          Try adjusting your search or filter criteria to find what you're looking for.
        </p>
      </div>
    )
  }

  return (
    <section>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="h-full overflow-hidden transition-all hover:shadow-md group relative">
              <div className="absolute right-2 top-2 z-10">
                <WishlistButton product={product} size="sm" />
              </div>
              <CardContent className="p-4">
                <div className="aspect-square overflow-hidden rounded-md bg-muted">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4 pt-0">
                <h3 className="line-clamp-2 text-sm font-medium">{product.name}</h3>
                <ProductRating
                  rating={product.averageRating}
                  reviewCount={product.reviewCount}
                  size="sm"
                  className="my-1"
                />
                <p className="text-xs text-muted-foreground">{product.color}</p>
                <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
