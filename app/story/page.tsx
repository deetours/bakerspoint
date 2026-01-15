"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function StoryPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 right-0 z-40 p-6 animate-fade-in-slow">
        <Link href="/">
          <p className="text-sm font-light hover:text-primary transition-colors">← Home</p>
        </Link>
      </header>

      {/* Story Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full space-y-16 animate-slide-in-product">
          <h1 className="text-4xl md:text-5xl font-heading font-light text-balance">Our Story</h1>

          <div className="space-y-8">
            <p className="text-lg font-light leading-relaxed text-muted-foreground">
              We started baking because mornings felt rushed.
            </p>

            <p className="text-lg font-light leading-relaxed text-muted-foreground">
              This was our way of slowing them down.
            </p>

            <p className="text-lg font-light leading-relaxed text-muted-foreground italic pt-8">
              Every pastry, every croissant, every cup of coffee—it's an invitation to pause. To breathe. To taste
              something made with care.
            </p>

            <p className="text-lg font-light leading-relaxed text-muted-foreground pt-8">
              We bake in small batches because we believe quality matters more than quantity. We use butter, flour, and
              time. No shortcuts. No compromises.
            </p>

            <p className="text-lg font-light leading-relaxed text-muted-foreground pt-8">
              This is Bakers Point. A quiet rebellion against rushed mornings.
            </p>
          </div>

          <div className="pt-12 border-t border-border/40">
            <Link href="/">
              <p className="text-primary font-light hover:text-primary/80 transition-colors">← Back to home</p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
