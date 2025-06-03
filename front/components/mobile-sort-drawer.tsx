"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"

interface MobileSortDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileSortDrawer({ isOpen, onClose }: MobileSortDrawerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sortOption, setSortOption] = useState("featured")

  // Initialize sort option from URL params
  useEffect(() => {
    if (isOpen) {
      const sort = searchParams.get("sort")
      if (sort) {
        setSortOption(sort)
      } else {
        setSortOption("featured")
      }
    }
  }, [isOpen, searchParams])

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest Arrivals" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "rating-desc", label: "Highest Rated" },
    { value: "bestselling", label: "Best Selling" },
  ]

  const applySort = () => {
    const params = new URLSearchParams(searchParams.toString())

    if (sortOption !== "featured") {
      params.set("sort", sortOption)
    } else {
      params.delete("sort")
    }

    router.push(`/products?${params.toString()}`)
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[50vh] p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="flex items-center">
            <ArrowUpDown className="mr-2 h-5 w-5" />
            Sort By
          </SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <RadioGroup value={sortOption} onValueChange={setSortOption}>
            <div className="space-y-4">
              {sortOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={`sort-${option.value}`} />
                  <Label htmlFor={`sort-${option.value}`}>{option.label}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <SheetFooter className="border-t p-4">
          <Button onClick={applySort} className="w-full bg-gold-500 text-black hover:bg-gold-600">
            Apply
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
