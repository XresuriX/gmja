"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, X, Plus, Minus, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useOnClickOutside } from "@/hooks/use-click-outside"

interface BasketItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  color: string
}

export function BasketDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [basketItems, setBasketItems] = useState<BasketItem[]>([])
  const [basketCount, setBasketCount] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useOnClickOutside(dropdownRef, () => setIsOpen(false))

  // Mock data - in a real app, this would come from a state management store
  useEffect(() => {
    // Simulate fetching basket items
    const items = [
      {
        id: "1",
        name: "Premium Wireless Headphones",
        price: 299.99,
        image: "/placeholder.svg?height=80&width=80",
        quantity: 1,
        color: "Black",
      },
      {
        id: "2",
        name: "Noise Cancelling Earbuds",
        price: 199.99,
        image: "/placeholder.svg?height=80&width=80",
        quantity: 2,
        color: "White",
      },
      {
        id: "3",
        name: "Bluetooth Speaker",
        price: 149.99,
        image: "/placeholder.svg?height=80&width=80",
        quantity: 1,
        color: "Gold",
      },
    ]

    setBasketItems(items)
    setBasketCount(items.reduce((sum, item) => sum + item.quantity, 0))
  }, [])

  const subtotal = basketItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setBasketItems(basketItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    setBasketCount(
      basketItems
        .map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
        .reduce((sum, item) => sum + item.quantity, 0),
    )
  }

  const removeItem = (id: string) => {
    const updatedItems = basketItems.filter((item) => item.id !== id)
    setBasketItems(updatedItems)
    setBasketCount(updatedItems.reduce((sum, item) => sum + item.quantity, 0))
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Shopping cart"
      >
        <ShoppingCart className="h-5 w-5" />
        {basketCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-black">
            {basketCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border bg-background shadow-lg md:w-96">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Your Basket ({basketCount})</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>

          <Separator />

          {basketItems.length === 0 ? (
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Your basket is empty</p>
            </div>
          ) : (
            <>
              <ScrollArea className="h-[300px] p-4">
                <div className="space-y-4">
                  {basketItems.map((item) => (
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
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeItem(item.id)}>
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.color}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <span className="w-7 text-center text-xs">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                          <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <Separator />

              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    className="w-full bg-gold-500 text-black hover:bg-gold-600"
                    onClick={() => {
                      window.location.href = "/checkout"
                      setIsOpen(false)
                    }}
                  >
                    Checkout
                  </Button>
                  <Button variant="outline" className="w-full" asChild onClick={() => setIsOpen(false)}>
                    <Link href="/basket" className="flex items-center justify-center">
                      View Basket
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
