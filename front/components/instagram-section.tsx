import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"

export function InstagramSection() {
  const instagramPosts = [
    {
      id: "1",
      image: "/placeholder.svg?height=300&width=300",
      link: "https://instagram.com",
    },
    {
      id: "2",
      image: "/placeholder.svg?height=300&width=300",
      link: "https://instagram.com",
    },
    {
      id: "3",
      image: "/placeholder.svg?height=300&width=300",
      link: "https://instagram.com",
    },
    {
      id: "4",
      image: "/placeholder.svg?height=300&width=300",
      link: "https://instagram.com",
    },
  ]

  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-8 flex items-center justify-center gap-2">
          <Instagram className="h-6 w-6 text-gold-500" />
          <h2 className="text-2xl font-bold">Instagram</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {instagramPosts.map((post) => (
            <Link
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-md"
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt="Instagram post"
                width={300}
                height={300}
                className="aspect-square h-full w-full object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                <Instagram className="h-8 w-8 text-white" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
