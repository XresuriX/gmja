import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ProductViewer3D } from "@/components/product-viewer-3d"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductRating } from "@/components/product-rating"
import { ProductReviewsList } from "@/components/product-reviews-list"
import { getProductDetails } from "@/app/actions/product-actions"
// Import the WishlistButton component
import { WishlistButton } from "@/components/wishlist-button"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  // In a real app, you would fetch this data from an API
  const productDetails = await getProductDetails(params.id)

  const product = productDetails || {
    id: params.id,
    name: "Premium Wireless Headphones",
    price: 299.99,
    description:
      "Experience premium sound quality with our wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for all-day listening.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium comfort",
      "High-resolution audio",
      "Bluetooth 5.0",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 Ohm",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      Weight: "250g",
    },
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    colors: ["Black", "White", "Gold"],
    averageRating: 4.5,
    reviewCount: 128,
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-8">
            <Link href="/products" className="text-sm text-muted-foreground hover:text-gold-500">
              ← Back to products
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-lg bg-muted">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.images.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-md bg-muted">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Image ${index + 1}`}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="mt-2 flex items-center gap-2">
                  <ProductRating rating={product.averageRating} reviewCount={product.reviewCount} />
                  <Link href="#reviews" className="text-sm text-gold-500 hover:underline">
                    Read reviews
                  </Link>
                </div>
                <p className="mt-2 text-2xl font-bold text-gold-500">${product.price.toFixed(2)}</p>
              </div>
              <p className="text-muted-foreground">{product.description}</p>
              <div>
                <h3 className="mb-2 font-medium">Color</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className="h-8 w-8 rounded-full border border-muted-foreground"
                      style={{
                        backgroundColor: color.toLowerCase() === "gold" ? "#D4AF37" : color.toLowerCase(),
                      }}
                      aria-label={color}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <Button className="flex-1 bg-gold-500 text-black hover:bg-gold-600">Add to Cart</Button>
                <WishlistButton
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    category: "headphones", // You would get this from the product data
                    brand: "sony", // You would get this from the product data
                    averageRating: product.averageRating,
                    reviewCount: product.reviewCount,
                  }}
                  showText
                  variant="outline"
                  className="flex-1"
                />
              </div>
              <Tabs defaultValue="features">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                  <TabsTrigger value="3d-view">3D View</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="mt-4">
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-gold-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="specifications" className="mt-4">
                  <div className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b pb-2">
                        <span className="font-medium">{key}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="3d-view" className="mt-4">
                  <div className="aspect-square overflow-hidden rounded-md bg-muted">
                    <ProductViewer3D productId={product.id} />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div id="reviews" className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">Customer Reviews</h2>
            <ProductReviewsList
              productId={product.id}
              initialAverageRating={product.averageRating}
              initialReviewCount={product.reviewCount}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
