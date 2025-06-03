"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { X, Plus, Save } from "lucide-react"
import { type ProductFormData, createProduct, updateProduct } from "@/app/actions/product-actions"

interface ProductFormProps {
  initialData?: ProductFormData
  isNew?: boolean
}

export function ProductForm({ initialData, isNew = true }: ProductFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  const [product, setProduct] = useState<ProductFormData>(
    initialData || {
      name: "",
      sku: "",
      price: "",
      compareAtPrice: "",
      cost: "",
      description: "",
      category: "",
      brand: "",
      stock: "",
      images: [],
      isActive: true,
      isFeatured: false,
      attributes: [],
      variants: [],
    },
  )

  const [newAttribute, setNewAttribute] = useState({ name: "", value: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setProduct({ ...product, [name]: checked })
  }

  const handleSelectChange = (name: string, value: string) => {
    setProduct({ ...product, [name]: value })
  }

  const handleAddAttribute = () => {
    if (newAttribute.name && newAttribute.value) {
      setProduct({
        ...product,
        attributes: [...(product.attributes || []), { ...newAttribute }],
      })
      setNewAttribute({ name: "", value: "" })
    }
  }

  const handleRemoveAttribute = (index: number) => {
    const updatedAttributes = [...(product.attributes || [])]
    updatedAttributes.splice(index, 1)
    setProduct({ ...product, attributes: updatedAttributes })
  }

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...(product.images || [])]
    updatedImages.splice(index, 1)
    setProduct({ ...product, images: updatedImages })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = isNew ? await createProduct(product) : await updateProduct(product)

      if (result.success) {
        toast({
          title: isNew ? "Product created" : "Product updated",
          description: result.message,
        })

        if (isNew) {
          router.push("/admin/products")
        }
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              name="sku"
              value={product.sku}
              onChange={handleInputChange}
              placeholder="Enter product SKU"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                placeholder="0.00"
                type="number"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="compareAtPrice">Compare at Price</Label>
              <Input
                id="compareAtPrice"
                name="compareAtPrice"
                value={product.compareAtPrice}
                onChange={handleInputChange}
                placeholder="0.00"
                type="number"
                min="0"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cost">Cost</Label>
              <Input
                id="cost"
                name="cost"
                value={product.cost}
                onChange={handleInputChange}
                placeholder="0.00"
                type="number"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleInputChange}
              placeholder="0"
              type="number"
              min="0"
              step="1"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              rows={5}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={product.category} onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="headphones">Headphones</SelectItem>
                <SelectItem value="earbuds">Earbuds</SelectItem>
                <SelectItem value="speakers">Speakers</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Select value={product.brand} onValueChange={(value) => handleSelectChange("brand", value)}>
              <SelectTrigger id="brand">
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sony">Sony</SelectItem>
                <SelectItem value="bose">Bose</SelectItem>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="samsung">Samsung</SelectItem>
                <SelectItem value="jbl">JBL</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="isActive">Active</Label>
              <Switch
                id="isActive"
                checked={product.isActive}
                onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="isFeatured">Featured</Label>
              <Switch
                id="isFeatured"
                checked={product.isFeatured}
                onCheckedChange={(checked) => handleSwitchChange("isFeatured", checked)}
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Product Images</h3>
        <div className="flex flex-wrap gap-4">
          {(product.images || []).map((image, index) => (
            <div key={index} className="relative h-40 w-40 overflow-hidden rounded-md border">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product image ${index + 1}`}
                width={160}
                height={160}
                className="h-full w-full object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-6 w-6"
                onClick={() => handleRemoveImage(index)}
                type="button"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <div className="flex h-40 w-40 items-center justify-center rounded-md border border-dashed">
            <Button variant="outline" className="flex flex-col gap-1 h-full w-full" type="button">
              <Plus className="h-6 w-6" />
              <span>Add Image</span>
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Product Attributes</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="attributeName">Attribute Name</Label>
            <Input
              id="attributeName"
              value={newAttribute.name}
              onChange={(e) => setNewAttribute({ ...newAttribute, name: e.target.value })}
              placeholder="e.g., Color, Size, Material"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="attributeValue">Attribute Value</Label>
            <div className="flex gap-2">
              <Input
                id="attributeValue"
                value={newAttribute.value}
                onChange={(e) => setNewAttribute({ ...newAttribute, value: e.target.value })}
                placeholder="e.g., Red, Large, Cotton"
                className="flex-1"
              />
              <Button onClick={handleAddAttribute} disabled={!newAttribute.name || !newAttribute.value} type="button">
                Add
              </Button>
            </div>
          </div>
        </div>

        {(product.attributes || []).length > 0 && (
          <div className="space-y-2 mt-4">
            {(product.attributes || []).map((attr, index) => (
              <div key={index} className="flex items-center justify-between rounded-md border p-3">
                <div>
                  <span className="font-medium">{attr.name}: </span>
                  <span>{attr.value}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleRemoveAttribute(index)} type="button">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => router.push("/admin/products")} type="button">
          Cancel
        </Button>
        <Button className="bg-gold-500 text-black hover:bg-gold-600" type="submit" disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Product"}
        </Button>
      </div>
    </form>
  )
}
