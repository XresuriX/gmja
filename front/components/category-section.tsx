import Link from "next/link"
import { Headphones, Music, Speaker, Mic } from "lucide-react"

export function CategorySection() {
  const categories = [
    {
      name: "Headphones",
      icon: Headphones,
      href: "/products?category=headphones",
    },
    {
      name: "Earbuds",
      icon: Music,
      href: "/products?category=earbuds",
    },
    {
      name: "Speakers",
      icon: Speaker,
      href: "/products?category=speakers",
    },
    {
      name: "Microphones",
      icon: Mic,
      href: "/products?category=microphones",
    },
  ]

  return (
    <section className="bg-black py-16">
      <div className="container">
        <h2 className="mb-8 text-center text-2xl font-bold text-white">Shop Categories</h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="flex flex-col items-center gap-3 rounded-lg p-6 text-center transition-colors hover:bg-green-900"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-500">
                <category.icon className="h-8 w-8 text-black" />
              </div>
              <span className="text-lg font-medium text-white">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
