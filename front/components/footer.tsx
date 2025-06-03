import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold text-gold-500">GrandMarketJa</h3>
            <p className="text-sm text-gray-400">
              Your premier destination for high-quality products in Jamaica and beyond.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/products" className="hover:text-gold-500">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=headphones" className="hover:text-gold-500">
                  Headphones
                </Link>
              </li>
              <li>
                <Link href="/products?category=speakers" className="hover:text-gold-500">
                  Speakers
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="hover:text-gold-500">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-gold-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-500">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-gold-500">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-gold-500">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Connect</h3>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="hover:text-gold-500">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://twitter.com" className="hover:text-gold-500">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://instagram.com" className="hover:text-gold-500">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://youtube.com" className="hover:text-gold-500">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} GrandMarketJa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
