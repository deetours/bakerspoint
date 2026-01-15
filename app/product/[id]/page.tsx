"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"

const productData: Record<
  string,
  {
    name: string
    price: string
    image: string
    emotion: string
    details: string[]
    hint?: string
  }
> = {
  "1": {
    name: "Almond Croissant",
    price: "₹140",
    image: "/almond-croissant-buttery.jpg",
    emotion: "Crisp at the edges. Soft where it matters.",
    details: ["Baked today.", "Rolled by hand.", "No shortcuts."],
    hint: "Best eaten while the world is still quiet.",
  },
  "2": {
    name: "Pain au Chocolat",
    price: "₹130",
    image: "/chocolate-pain-au-chocolat.jpg",
    emotion: "Chocolate you can hear.",
    details: ["Baked today.", "Rolled by hand.", "No shortcuts."],
    hint: "Pairs well with a slow morning.",
  },
  "3": {
    name: "Raspberry Danish",
    price: "₹120",
    image: "/raspberry-danish-pastry.jpg",
    emotion: "Tart berries and butter.",
    details: ["Baked today.", "Rolled by hand.", "No shortcuts."],
    hint: "Best eaten warm.",
  },
  "4": {
    name: "Cheese & Herb Croissant",
    price: "₹130",
    image: "/cheese-herb-croissant-savory.jpg",
    emotion: "Soft butter. Herbaceous.",
    details: ["Baked today.", "Rolled by hand.", "No shortcuts."],
  },
  "5": {
    name: "Spinach & Feta Soufflé",
    price: "₹125",
    image: "/spinach-feta-souffl-.jpg",
    emotion: "Light. Fluffy. Pure.",
    details: ["Baked today.", "Rolled by hand.", "No shortcuts."],
    hint: "Only a few left.",
  },
  "6": {
    name: "Everything Bagel",
    price: "₹100",
    image: "/everything-bagel-seeds.jpg",
    emotion: "Chewy inside. Crispy outside.",
    details: ["Baked today.", "Rolled by hand.", "No shortcuts."],
  },
  "7": {
    name: "Single Origin Espresso",
    price: "₹80",
    image: "/espresso-coffee-cup-latte.jpg",
    emotion: "Intense. Honest. Pure.",
    details: ["Baked fresh.", "Single origin.", "No compromise."],
    hint: "Warming. Necessary.",
  },
  "8": {
    name: "Oat Milk Cappuccino",
    price: "₹100",
    image: "/cappuccino-oat-milk-latte-art.jpg",
    emotion: "Creamy. Textured. Perfect.",
    details: ["Baked fresh.", "Hand-poured.", "No compromise."],
    hint: "Best shared.",
  },
  "9": {
    name: "Seasonal Chai",
    price: "₹90",
    image: "/chai-tea-spiced-warm-cup.jpg",
    emotion: "Warming. Spiced. Comforting.",
    details: ["Brewed fresh.", "Spiced by hand.", "No shortcuts."],
    hint: "Sip slowly.",
  },
}

export default function ProductPage() {
  const params = useParams()
  const id = params.id as string
  const product = productData[id] || productData["1"]

  const [showAdded, setShowAdded] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleAddToCart = () => {
    setShowAdded(true)
    setTimeout(() => setShowAdded(false), 2500)
  }

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 right-0 z-40 p-6">
        <Link href="/menu">
          <p className="text-sm font-light hover:text-primary transition-colors">← Today's menu</p>
        </Link>
      </header>

      {/* SCENE 1: ARRIVAL - Full screen product focus */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
        <div className="max-w-3xl w-full">
          {/* Product Image - almost full screen */}
          <div className="relative overflow-hidden rounded-lg mb-12 animate-fade-in-slow">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-96 md:h-[600px] object-cover"
              style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            />
            {/* Soft shadow underneath */}
            <div className="absolute inset-x-0 -bottom-8 h-16 bg-gradient-to-b from-black/20 to-transparent blur-xl" />
          </div>

          {/* Scene 1: "This one." opener */}
          <div className="text-center animate-fade-in-secondary" style={{ animationDelay: "0.4s" }}>
            <p className="text-3xl md:text-4xl font-heading font-light text-balance">This one.</p>
          </div>
        </div>
      </section>

      {/* SCENE 2: Description - single emotional truth */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full text-center space-y-12">
          <p
            className="text-2xl md:text-3xl font-heading font-light leading-relaxed text-balance animate-fade-in-slow"
            style={{ animationDelay: "0s" }}
          >
            {product.emotion}
          </p>
          {product.hint && (
            <p
              className="text-lg font-light text-muted-foreground animate-fade-in-slow"
              style={{ animationDelay: "0.3s" }}
            >
              {product.hint}
            </p>
          )}
        </div>
      </section>

      {/* SCENE 3: Sensory micro-details */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-md w-full space-y-8 text-center">
          {product.details.map((detail, index) => (
            <p
              key={index}
              className="text-lg font-light text-muted-foreground animate-fade-in-slow"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {detail}
            </p>
          ))}
        </div>
      </section>

      {/* SCENE 4: Commitment moment - Add to cart */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="animate-fade-in-slow" style={{ animationDelay: "0.2s" }}>
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-8 px-8 text-lg font-light transition-all duration-500 shadow-lg hover:shadow-xl"
            >
              {showAdded ? "Added to your tray." : "Add to my order"}
            </Button>
          </div>

          <p
            className="text-sm text-muted-foreground font-light animate-fade-in-slow"
            style={{ animationDelay: "0.4s" }}
          >
            We'll start fresh when you order.
          </p>

          {/* SCENE 5: Gentle exit - confirmation message */}
          {showAdded && (
            <div className="animate-fade-in-slow">
              <p className="text-lg font-light text-primary">Added to your tray.</p>
              <Link href="/menu" className="inline-block mt-6">
                <p className="text-sm font-light hover:text-primary/80 transition-colors">Continue browsing →</p>
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
