"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import App from "./newscene"
export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gold-500 py-20 md:py-32">
      <div className="container relative z-10 flex flex-col items-start gap-6 md:w-2/3">
        <h1 className="text-4xl font-bold leading-tight text-black md:text-6xl">
          Listen to the <span className="text-green-800">amazing</span> music sound.
        </h1>
        <p className="text-lg text-black md:text-xl">
          Experience premium audio quality with our selection of high-end headphones and audio equipment.
        </p>
        <Button asChild className="bg-black text-white hover:bg-green-800">
          <Link href="/products">Shop Now</Link>
        </Button>
      </div>
      <div className="absolute right-0 top-0 h-full w-1/2 md:block">
        <App
        />
      </div>
    </section>
  )
}
