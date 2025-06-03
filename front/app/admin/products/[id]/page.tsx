"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { ProductForm } from "@/components/admin/product-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const productId = params.id
  const isNewProduct = productId === "new"

  // In a real app, you would fetch the product data from an API
  const productData = isNewProduct
    ? undefined
    : {
        id: productId,
        name: "Premium Wireless Headphones",
        sku: "HDP-001",
        price: "299.99",
        compareAtPrice: "349.99",
        cost: "150.00",
        description:
          "Experience premium sound quality with our wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for all-day listening.",
        category: "headphones",
        brand: "sony",
        stock: "45",
        images: ["/placeholder.svg?height=200&width=200", "/placeholder.svg?height=200&width=200"],
        isActive: true,
        isFeatured: true,
        attributes: [
          { name: "Color", value: "Black" },
          { name: "Connectivity", value: "Bluetooth 5.0" },
          { name: "Battery Life", value: "30 hours" },
        ],
        variants: [
          { id: "1", name: "Black", price: "299.99", stock: "30" },
          { id: "2", name: "White", price: "299.99", stock: "15" },
        ],
      }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href="/admin/products">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">{isNewProduct ? "Add Product" : "Edit Product"}</h1>
          </div>
        </div>

        <ProductForm initialData={productData} isNew={isNewProduct} />
      </div>
    </AdminLayout>
  )
}
