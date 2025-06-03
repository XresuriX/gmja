"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"

interface MobileFilterDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileFilterDrawer({ isOpen, onClose }: MobileFilterDrawerProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])

  // Initialize filters from URL params
  useEffect(() => {
    if (isOpen) {
      const minPrice = searchParams.get("minPrice")
      const maxPrice = searchParams.get("maxPrice")
      const categories = searchParams.get("categories")
      const brands = searchParams.get("brands")
      const ratings = searchParams.get("ratings")

      if (minPrice && maxPrice) {
        setPriceRange([Number.parseInt(minPrice), Number.parseInt(maxPrice)])
      } else {
        setPriceRange([0, 1000])
      }

      if (categories) {
        setSelectedCategories(categories.split(","))
      } else {
        setSelectedCategories([])
      }

      if (brands) {
        setSelectedBrands(brands.split(","))
      } else {
        setSelectedBrands([])
      }

      if (ratings) {
        setSelectedRatings(ratings.split(",").map(Number))
      } else {
        setSelectedRatings([])
      }
    }
  }, [isOpen, searchParams])

  const categories = [
    { id: "headphones", label: "Headphones" },
    { id: "earbuds", label: "Earbuds" },
    { id: "speakers", label: "Speakers" },
    { id: "accessories", label: "Accessories" },
  ]

  const brands = [
    { id: "sony", label: "Sony" },
    { id: "bose", label: "Bose" },
    { id: "apple", label: "Apple" },
    { id: "samsung", label: "Samsung" },
    { id: "jbl", label: "JBL" },
  ]

  const ratings = [
    { value: 4, label: "4★ & up" },
    { value: 3, label: "3★ & up" },
    { value: 2, label: "2★ & up" },
    { value: 1, label: "1★ & up" },
  ]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brandId])
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId))
    }
  }

  const handleRatingChange = (rating: number, checked: boolean) => {
    if (checked) {
      setSelectedRatings([...selectedRatings, rating])
    } else {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating))
    }
  }

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    // Price range
    params.set("minPrice", priceRange[0].toString())
    params.set("maxPrice", priceRange[1].toString())

    // Categories
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","))
    } else {
      params.delete("categories")
    }

    // Brands
    if (selectedBrands.length > 0) {
      params.set("brands", selectedBrands.join(","))
    } else {
      params.delete("brands")
    }

    // Ratings
    if (selectedRatings.length > 0) {
      params.set("ratings", selectedRatings.join(","))
    } else {
      params.delete("ratings")
    }

    router.push(`/products?${params.toString()}`)
    onClose()
  }

  const resetFilters = () => {
    setPriceRange([0, 1000])
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedRatings([])
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (priceRange[0] > 0 || priceRange[1] < 1000) count++
    count += selectedCategories.length > 0 ? 1 : 0
    count += selectedBrands.length > 0 ? 1 : 0
    count += selectedRatings.length > 0 ? 1 : 0
    return count
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[85vh] p-0">
        <SheetHeader className="border-b p-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filters
              {getActiveFilterCount() > 0 && (
                <span className="ml-2 rounded-full bg-gold-500 px-2 py-0.5 text-xs text-black">
                  {getActiveFilterCount()}
                </span>
              )}
            </SheetTitle>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Reset
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(85vh-140px)]">
          <div className="space-y-6 p-4">
            <div className="space-y-4">
              <h3 className="font-medium">Price Range</h3>
              <div className="space-y-4 px-1">
                <Slider
                  value={priceRange}
                  min={0}
                  max={1000}
                  step={10}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
                <div className="flex items-center justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                    />
                    <Label htmlFor={`category-${category.id}`}>{category.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Brands</h3>
              <div className="grid grid-cols-2 gap-2">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand.id}`}
                      checked={selectedBrands.includes(brand.id)}
                      onCheckedChange={(checked) => handleBrandChange(brand.id, checked as boolean)}
                    />
                    <Label htmlFor={`brand-${brand.id}`}>{brand.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium">Ratings</h3>
              <div className="space-y-2">
                {ratings.map((rating) => (
                  <div key={rating.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`rating-${rating.value}`}
                      checked={selectedRatings.includes(rating.value)}
                      onCheckedChange={(checked) => handleRatingChange(rating.value, checked as boolean)}
                    />
                    <Label htmlFor={`rating-${rating.value}`} className="flex items-center">
                      {rating.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="border-t p-4">
          <Button onClick={applyFilters} className="w-full bg-gold-500 text-black hover:bg-gold-600">
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
