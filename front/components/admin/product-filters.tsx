"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

interface ProductFiltersProps {
  className?: string
}

export function ProductFilters({ className }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 1000])

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

  const stockStatus = [
    { id: "in-stock", label: "In Stock" },
    { id: "low-stock", label: "Low Stock" },
    { id: "out-of-stock", label: "Out of Stock" },
  ]

  return (
    <div className={className}>
      <div className="space-y-4">
        <h3 className="font-medium">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox id={`category-${category.id}`} />
              <Label htmlFor={`category-${category.id}`}>{category.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox id={`brand-${brand.id}`} />
              <Label htmlFor={`brand-${brand.id}`}>{brand.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Price Range</h3>
        <Slider defaultValue={priceRange} min={0} max={1000} step={10} onValueChange={setPriceRange} className="py-4" />
        <div className="flex items-center justify-between">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Stock Status</h3>
        <RadioGroup defaultValue="in-stock">
          {stockStatus.map((status) => (
            <div key={status.id} className="flex items-center space-x-2">
              <RadioGroupItem value={status.id} id={`status-${status.id}`} />
              <Label htmlFor={`status-${status.id}`}>{status.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <Button className="w-full bg-gold-500 text-black hover:bg-gold-600">Apply Filters</Button>
        <Button variant="outline" className="w-full">
          Reset
        </Button>
      </div>
    </div>
  )
}
