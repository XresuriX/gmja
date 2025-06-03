"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Percent, DollarSign, Package, Tag } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function BulkActionsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [actionType, setActionType] = useState("price")
  const [priceAction, setPriceAction] = useState("increase_percentage")
  const [priceValue, setPriceValue] = useState("")
  const [stockAction, setStockAction] = useState("set")
  const [stockValue, setStockValue] = useState("")
  const [categoryValue, setCategoryValue] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically call an API to perform the bulk action
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      let message = ""
      if (actionType === "price") {
        message = `Price ${priceAction.replace("_", " ")} by ${priceValue}${priceAction.includes("percentage") ? "%" : ""} applied successfully.`
      } else if (actionType === "stock") {
        message = `Stock ${stockAction} to ${stockValue} applied successfully.`
      } else if (actionType === "category") {
        message = `Category updated to ${categoryValue} successfully.`
      }

      toast({
        title: "Bulk action completed",
        description: message,
      })

      router.push("/admin/products")
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while performing the bulk action.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AdminLayout>
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/admin/products")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Bulk Actions</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Apply Bulk Actions</CardTitle>
            <CardDescription>
              Apply changes to multiple products at once. Select the action type and enter the values.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={actionType} onValueChange={setActionType}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="price">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Price
                </TabsTrigger>
                <TabsTrigger value="stock">
                  <Package className="mr-2 h-4 w-4" />
                  Stock
                </TabsTrigger>
                <TabsTrigger value="category">
                  <Tag className="mr-2 h-4 w-4" />
                  Category
                </TabsTrigger>
              </TabsList>

              <TabsContent value="price" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="priceAction">Price Action</Label>
                  <Select value={priceAction} onValueChange={setPriceAction}>
                    <SelectTrigger id="priceAction">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="increase_percentage">Increase by percentage</SelectItem>
                      <SelectItem value="decrease_percentage">Decrease by percentage</SelectItem>
                      <SelectItem value="increase_amount">Increase by amount</SelectItem>
                      <SelectItem value="decrease_amount">Decrease by amount</SelectItem>
                      <SelectItem value="set">Set to specific price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priceValue">Value</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      {priceAction.includes("percentage") ? (
                        <Percent className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <Input
                      id="priceValue"
                      value={priceValue}
                      onChange={(e) => setPriceValue(e.target.value)}
                      type="number"
                      min="0"
                      step={priceAction.includes("percentage") ? "1" : "0.01"}
                      className="pl-10"
                      placeholder={priceAction.includes("percentage") ? "Enter percentage" : "Enter amount"}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="stock" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="stockAction">Stock Action</Label>
                  <Select value={stockAction} onValueChange={setStockAction}>
                    <SelectTrigger id="stockAction">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="increase">Increase by</SelectItem>
                      <SelectItem value="decrease">Decrease by</SelectItem>
                      <SelectItem value="set">Set to specific quantity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stockValue">Value</Label>
                  <Input
                    id="stockValue"
                    value={stockValue}
                    onChange={(e) => setStockValue(e.target.value)}
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Enter quantity"
                  />
                </div>
              </TabsContent>

              <TabsContent value="category" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="categoryValue">Category</Label>
                  <Select value={categoryValue} onValueChange={setCategoryValue}>
                    <SelectTrigger id="categoryValue">
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
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => router.push("/admin/products")}>
                Cancel
              </Button>
              <Button
                className="bg-gold-500 text-black hover:bg-gold-600"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Applying..." : "Apply to Selected Products"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
