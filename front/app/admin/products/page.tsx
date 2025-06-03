"use client"

import { useState } from "react"
import Link from "next/link"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ProductsTable } from "@/components/admin/products-table"
import { ProductFilters } from "@/components/admin/product-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <AdminLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Products</h1>
          <Button asChild className="bg-gold-500 text-black hover:bg-gold-600">
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="py-4">
                  <h2 className="mb-6 text-lg font-medium">Filters</h2>
                  <ProductFilters className="flex flex-col gap-6" />
                </div>
              </SheetContent>
            </Sheet>
            <Button variant="outline">Bulk Actions</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="hidden md:block">
            <div className="rounded-lg border p-4">
              <h2 className="mb-6 text-lg font-medium">Filters</h2>
              <ProductFilters className="flex flex-col gap-6" />
            </div>
          </div>
          <div className="md:col-span-3">
            <ProductsTable searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
