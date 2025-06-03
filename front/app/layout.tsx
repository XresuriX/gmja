import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
// Import the WishlistProvider
import { WishlistProvider } from "@/contexts/wishlist-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GrandMarketJa | Your Premier Shopping Destination",
  description: "Shop the best products from Jamaica's premier online marketplace",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <WishlistProvider>
            {children}
            <Toaster />
          </WishlistProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
