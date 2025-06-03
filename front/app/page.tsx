import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProductGrid } from "@/components/product-grid"
import { CategorySection } from "@/components/category-section"
import { InstagramSection } from "@/components/instagram-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProductGrid title="New Arrivals" />
        <CategorySection />
        <ProductGrid title="Best Seller" />
        <InstagramSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
