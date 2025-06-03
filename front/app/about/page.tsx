"use client"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import App from "@/components/newscene"
export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <App></App>
        <section className="bg-gold-500 py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold text-black md:text-5xl">About GrandMarketJa</h1>
              <p className="mt-4 text-lg text-black">
                Your premier destination for high-quality products in Jamaica and beyond.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-3xl font-bold">Our Story</h2>
                <p className="mt-4 text-muted-foreground">
                  Founded in 2020, GrandMarketJa started with a simple mission: to provide Jamaicans with access to
                  high-quality products at affordable prices. What began as a small online store has grown into
                  Jamaica's premier e-commerce platform.
                </p>
                <p className="mt-4 text-muted-foreground">
                  Our team is passionate about curating the best products from around the world and making them
                  accessible to our customers. We believe in the power of technology to transform commerce in Jamaica
                  and the wider Caribbean region.
                </p>
              </div>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Our team"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-black py-16 text-white">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold text-gold-500">Our Values</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-green-900 p-6">
                <h3 className="mb-4 text-xl font-bold">Quality</h3>
                <p>
                  We are committed to offering only the highest quality products. Each item in our catalog is carefully
                  selected and tested to ensure it meets our standards.
                </p>
              </div>
              <div className="rounded-lg bg-green-900 p-6">
                <h3 className="mb-4 text-xl font-bold">Customer Service</h3>
                <p>
                  Our customers are at the heart of everything we do. We strive to provide exceptional service and
                  support at every step of your shopping journey.
                </p>
              </div>
              <div className="rounded-lg bg-green-900 p-6">
                <h3 className="mb-4 text-xl font-bold">Innovation</h3>
                <p>
                  We continuously innovate to improve our platform and services. From our website to our delivery
                  methods, we're always looking for ways to enhance your experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold">Our Team</h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <div className="mx-auto mb-4 h-40 w-40 overflow-hidden rounded-full">
                    <Image
                      src="/placeholder.svg?height=160&width=160"
                      alt={`Team member ${i}`}
                      width={160}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Co-Founder & CEO</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
