"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, X, ShoppingCart, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useOnClickOutside } from "@/hooks/use-click-outside"
import { useWishlist } from "@/contexts/wishlist-context"
import { ProductRating } from "@/components/product-rating"

export function WishlistDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { wishlistItems, removeFromWishlist, wishlistCount } = useWishlist()

  // Close dropdown when clicking outside
  useOnClickOutside(dropdownRef, () => setIsOpen(false))

  const handleAddToCart = (productId: string) => {
    // In a real app, you would add the product to the cart
    console.log("Adding product to cart:", productId)
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(productId)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(!isOpen)} aria-label="Wishlist">
        <Heart className="h-5 w-5" />
        {wishlistCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {wishlistCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border bg-background shadow-lg md:w-96">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Your Wishlist ({wishlistCount})</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>

          <Separator />

          {wishlistItems.length === 0 ? (
            <div className="p-4 text-center">
              <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">Your wishlist is empty</p>
              <p className="text-sm text-muted-foreground">Save products you love for later</p>
            </div>
          ) : (
            <>
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <Link
                            href={`/products/${item.id}`}
                            className="text-sm font-medium hover:text-gold-500"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        <ProductRating
                          rating={item.averageRating}
                          reviewCount={item.reviewCount}
                          size="sm"
                          className="my-1"
                        />
                        <div className="mt-auto flex items-center justify-between">
                          <p className="text-sm font-medium text-gold-500">${item.price.toFixed(2)}</p>
                          <Button
                            size="sm"
                            className="h-7 bg-gold-500 text-black hover:bg-gold-600"
                            onClick={() => handleAddToCart(item.id)}
                          >
                            <ShoppingCart className="mr-1 h-3 w-3" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <Separator />

              <div className="p-4">
                <Button variant="outline" className="w-full" asChild onClick={() => setIsOpen(false)}>
                  <Link href="/wishlist" className="flex items-center justify-center">
                    View All Wishlist Items
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
