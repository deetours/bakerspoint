"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const sampleCart = [
  {
    id: 1,
    name: "Almond Croissant",
    price: "₹140",
    quantity: 1,
    image: "/almond-croissant-buttery.jpg",
  },
  {
    id: 2,
    name: "Pain au Chocolat",
    price: "₹130",
    quantity: 1,
    image: "/chocolate-pain-au-chocolat.jpg",
  },
]

export default function CartPage() {
  const [cart, setCart] = useState(sampleCart)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const total = cart.reduce((sum, item) => {
    const price = Number.parseInt(item.price.replace("₹", ""))
    return sum + price * item.quantity
  }, 0)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(cart.filter((item) => item.id !== id))
    } else {
      setCart(cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 right-0 z-40 p-6 animate-fade-in-slow">
        <Link href="/menu">
          <p className="text-sm font-light hover:text-primary transition-colors">← Back to browsing</p>
        </Link>
      </header>

      {/* SCENE 1: Entrance - Cart slides in */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-2xl w-full space-y-20 animate-slide-in-product">
          {/* Top copy */}
          <h1 className="text-4xl md:text-5xl font-heading font-light text-balance">Your order, so far.</h1>

          {/* SCENE 2: Items as moments */}
          <div className="space-y-16">
            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground font-light py-12">
                Your tray is empty. Let's change that.
              </p>
            ) : (
              cart.map((item, index) => (
                <div
                  key={item.id}
                  className="space-y-6 pb-12 border-b border-border/40 animate-fade-in-slow"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Item visual */}
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-64 md:h-80 object-cover transition-transform duration-500 hover:scale-102"
                    />
                  </div>

                  {/* Item details */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-heading font-light">{item.name}</h3>
                    <p className="text-lg text-muted-foreground font-light">{item.price}</p>

                    {/* Emotional micro-copy */}
                    <p className="text-sm text-muted-foreground font-light italic">Baked today.</p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-4 pt-4">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light px-3 py-2 rounded hover:bg-muted/20"
                      >
                        −
                      </button>
                      <span className="text-sm font-light min-w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light px-3 py-2 rounded hover:bg-muted/20"
                      >
                        +
                      </button>
                      <div className="flex-1" />
                      <p className="text-lg font-light">
                        ₹{Number.parseInt(item.price.replace("₹", "")) * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <>
              {/* SCENE 3: Emotional reassurance */}
              <p className="text-center text-muted-foreground font-light italic pt-8">
                We bake only what we can perfect.
              </p>

              {/* SCENE 4: Total - quiet confidence */}
              <div className="space-y-8 border-t border-border/40 pt-12">
                <div className="space-y-2 text-center">
                  <p className="text-sm text-muted-foreground font-light">Total</p>
                  <p className="text-4xl font-heading font-light">₹{total}</p>
                </div>

                {/* SCENE 5: Exit CTA - no rush */}
                <Link href="/checkout">
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-8 text-lg font-light transition-all duration-500 shadow-lg hover:shadow-xl"
                  >
                    Continue when ready
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
