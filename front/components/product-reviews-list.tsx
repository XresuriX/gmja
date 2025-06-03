"use client"

import { useState, useEffect } from "react"
import { ProductRating } from "@/components/product-rating"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ProductReviewForm } from "@/components/product-review-form"
import { getProductReviews } from "@/app/actions/product-actions"

interface Review {
  id: string
  productId: string
  rating: number
  title: string
  review: string
  name: string
  date: string
  verified: boolean
}

interface ProductReviewsListProps {
  productId: string
  initialAverageRating?: number
  initialReviewCount?: number
}

export function ProductReviewsList({
  productId,
  initialAverageRating = 0,
  initialReviewCount = 0,
}: ProductReviewsListProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [averageRating, setAverageRating] = useState(initialAverageRating)
  const [reviewCount, setReviewCount] = useState(initialReviewCount)
  const [isLoading, setIsLoading] = useState(true)
  const [isWritingReview, setIsWritingReview] = useState(false)
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)

  const loadReviews = async () => {
    setIsLoading(true)
    try {
      const result = await getProductReviews(productId, ratingFilter)
      if (result.success) {
        setReviews(result.reviews)
        setAverageRating(result.averageRating)
        setReviewCount(result.totalCount)
      }
    } catch (error) {
      console.error("Failed to load reviews:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadReviews()
  }, [productId, ratingFilter])

  const handleReviewSubmitted = () => {
    setIsWritingReview(false)
    loadReviews()
  }

  // Calculate rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map(
    (rating) => reviews.filter((review) => Math.round(review.rating) === rating).length,
  )

  // If we have no reviews yet, use mock data
  const mockReviews: Review[] = [
    {
      id: "1",
      productId,
      rating: 5,
      title: "Excellent product!",
      review:
        "I'm extremely satisfied with this purchase. The sound quality is amazing and the battery life is impressive. Highly recommended!",
      name: "John D.",
      date: "2023-05-15",
      verified: true,
    },
    {
      id: "2",
      productId,
      rating: 4,
      title: "Great value for money",
      review:
        "These headphones offer excellent sound quality for the price. The noise cancellation works well in most environments. The only downside is that they're a bit heavy for extended use.",
      name: "Sarah M.",
      date: "2023-04-20",
      verified: true,
    },
    {
      id: "3",
      productId,
      rating: 5,
      title: "Perfect for my needs",
      review:
        "I've been using these for a month now and I'm very impressed. The sound is clear and balanced, and they're comfortable to wear for hours.",
      name: "Michael T.",
      date: "2023-03-10",
      verified: false,
    },
  ]

  const displayReviews = reviews.length > 0 ? reviews : mockReviews

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
              <ProductRating rating={averageRating} reviewCount={reviewCount} size="lg" />
            </div>
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = ratingCounts[5 - rating]
                const percentage = reviewCount > 0 ? (count / reviewCount) * 100 : 0
                return (
                  <div key={rating} className="flex items-center gap-2 text-sm">
                    <span className="w-2">{rating}</span>
                    <div className="h-2 flex-1 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-gold-500" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="w-8 text-right text-muted-foreground">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="mt-6">
            <Button
              onClick={() => setIsWritingReview(!isWritingReview)}
              className="bg-gold-500 text-black hover:bg-gold-600"
            >
              {isWritingReview ? "Cancel" : "Write a Review"}
            </Button>
          </div>
        </div>

        {isWritingReview && (
          <div>
            <h3 className="mb-4 text-lg font-medium">Write Your Review</h3>
            <ProductReviewForm productId={productId} onReviewSubmitted={handleReviewSubmitted} />
          </div>
        )}
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Customer Reviews</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filter:</span>
            <select
              className="rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={ratingFilter || ""}
              onChange={(e) => setRatingFilter(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="py-4 text-center text-muted-foreground">Loading reviews...</div>
        ) : displayReviews.length === 0 ? (
          <div className="py-4 text-center text-muted-foreground">
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          <div className="space-y-4">
            {displayReviews.map((review) => (
              <div key={review.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{review.title}</h4>
                  <ProductRating rating={review.rating} showCount={false} />
                </div>
                <p className="mt-2 text-sm">{review.review}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span>{review.name}</span>
                    {review.verified && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-800">Verified Purchase</span>
                    )}
                  </div>
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
