import { Star, StarHalf } from "lucide-react"

interface ProductRatingProps {
  rating: number
  reviewCount?: number
  size?: "sm" | "md" | "lg"
  showCount?: boolean
  className?: string
}

export function ProductRating({
  rating,
  reviewCount,
  size = "md",
  showCount = true,
  className = "",
}: ProductRatingProps) {
  // Calculate full and half stars
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  // Determine star size based on the size prop
  const starSize = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }[size]

  // Determine text size based on the size prop
  const textSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  }[size]

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex">
        {/* Render full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className={`${starSize} fill-gold-500 text-gold-500`} />
        ))}

        {/* Render half star if needed */}
        {hasHalfStar && <StarHalf className={`${starSize} fill-gold-500 text-gold-500`} />}

        {/* Render empty stars */}
        {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map((_, i) => (
          <Star key={`empty-${i}`} className={`${starSize} text-muted-foreground`} />
        ))}
      </div>

      {showCount && reviewCount !== undefined && (
        <span className={`ml-2 ${textSize} text-muted-foreground`}>({reviewCount})</span>
      )}
    </div>
  )
}
