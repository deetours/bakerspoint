"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const products = {
  sweet: [
    {
      id: 1,
      name: "Butter Croissant",
      price: "₹120",
      image: "/fresh-croissant-baking-morning-light.jpg",
      tagline: "Layers you can hear.",
      scarcity: true,
    },
    {
      id: 2,
      name: "Almond Croissant",
      price: "₹140",
      image: "/almond-croissant-buttery.jpg",
      tagline: "Crisp edges. Soft middle.",
    },
    {
      id: 3,
      name: "Pain au Chocolat",
      price: "₹130",
      image: "/chocolate-pain-au-chocolat.jpg",
      tagline: "Pairs well with a slow morning.",
    },
    {
      id: 4,
      name: "Raspberry Danish",
      price: "₹120",
      image: "/raspberry-danish-pastry.jpg",
      tagline: "Best eaten warm.",
    },
  ],
  savoury: [
    {
      id: 5,
      name: "Cheese & Herb Croissant",
      price: "₹130",
      image: "/cheese-herb-croissant-savory.jpg",
      tagline: "Soft butter. Herbaceous.",
    },
    {
      id: 6,
      name: "Spinach & Feta Soufflé",
      price: "₹125",
      image: "/spinach-feta-souffl-.jpg",
      tagline: "Light. Fluffy. Pure.",
      scarcity: true,
    },
    {
      id: 7,
      name: "Everything Bagel",
      price: "₹100",
      image: "/everything-bagel-seeds.jpg",
      tagline: "Toasted & crispy.",
    },
  ],
  warm: [
    {
      id: 8,
      name: "Single Origin Espresso",
      price: "₹80",
      image: "/espresso-coffee-cup-latte.jpg",
      tagline: "Intense. Honest. Pure.",
    },
    {
      id: 9,
      name: "Oat Milk Cappuccino",
      price: "₹100",
      image: "/cappuccino-oat-milk-latte-art.jpg",
      tagline: "Creamy. Textured. Perfect.",
    },
    {
      id: 10,
      name: "Seasonal Chai",
      price: "₹90",
      image: "/chai-tea-spiced-warm-cup.jpg",
      tagline: "Warming. Spiced. Comforting.",
    },
  ],
}

interface CartItem {
  id: number
  name: string
  price: string
}

export default function MenuPage() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }
  }, [])

  const addToCart = (product: { id: number; name: string; price: string }) => {
    setCartItems([...cartItems, product])
    setCartCount(cartCount + 1)
  }

  const ProductCard = ({
    product,
    index,
    delayOffset = 0,
  }: {
    product: (typeof products.sweet)[0]
    index: number
    delayOffset?: number
  }) => (
    <Link href={`/product/${product.id}`}>
      <div
        className="group cursor-pointer space-y-8"
        onMouseEnter={() => setHoveredId(product.id)}
        onMouseLeave={() => setHoveredId(null)}
        style={{
          animation: `slideInProduct 1s ease-out forwards`,
          animationDelay: `${index * 0.2 + delayOffset}s`,
          opacity: 0,
        }}
      >
        <div
          className="overflow-hidden rounded-lg relative group/image transition-all duration-500"
          style={{
            opacity: hoveredId === null || hoveredId === product.id ? 1 : 0.4,
          }}
        >
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-80 md:h-96 object-cover transition-all duration-700 group-hover:scale-105"
          />

          {/* Warm glow on hover */}
          {hoveredId === product.id && (
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          <h3 className="text-xl md:text-2xl font-heading font-light">{product.name}</h3>
          <p className="text-base md:text-lg text-muted-foreground font-light">{product.price}</p>

          {hoveredId === product.id && (
            <p className="text-sm text-muted-foreground font-light animate-fade-in-slow italic">{product.tagline}</p>
          )}

          {product.scarcity && hoveredId === product.id && (
            <p className="text-xs text-muted-foreground font-light pt-2">Only a few left.</p>
          )}
        </div>

        {hoveredId === product.id && (
          <button
            onClick={(e) => {
              e.preventDefault()
              addToCart(product)
            }}
            className="text-primary font-light hover:text-primary/80 transition-colors text-sm animate-fade-in-slow"
          >
            Add to order →
          </button>
        )}
      </div>
    </Link>
  )

  const CategorySection = ({
    emotion,
    items,
    categoryTitle,
    delayOffset = 0,
  }: {
    emotion: string
    items: (typeof products.sweet)[]
    categoryTitle: string
    delayOffset?: number
  }) => (
    <section id={categoryTitle} className="py-24 md:py-32 space-y-16 md:space-y-20">
      {/* Emotional category label */}
      <h2
        className="text-2xl md:text-3xl font-heading font-light text-muted-foreground"
        style={{
          animation: `slideUpSlow 1s ease-out forwards`,
          animationDelay: `${delayOffset}s`,
          opacity: 0,
        }}
      >
        {emotion}
      </h2>

      {/* Products with staggered reveal */}
      <div className="space-y-24 md:space-y-32">
        {items.map((product, index) => (
          <div key={product.id} className="max-w-3xl">
            <ProductCard product={product} index={index} delayOffset={delayOffset + 0.2} />
          </div>
        ))}
      </div>

      <div className="py-12">
        <p className="text-center text-sm text-muted-foreground italic font-light">
          {categoryTitle === "Something sweet"
            ? "Baked before most alarms go off."
            : categoryTitle === "Something savoury"
              ? "We stop baking when it feels right."
              : "Warmth in every sip."}
        </p>
      </div>
    </section>
  )

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 bg-background/95 backdrop-blur z-40 border-b border-border/50 animate-fade-in-slow">
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/">
            <p className="text-sm font-light hover:text-primary transition-colors">← Bakers Point</p>
          </Link>
          <h1 className="text-lg md:text-xl font-heading font-light">Today's Bakes</h1>

          {cartCount > 0 && (
            <Link href="/cart">
              <div className="relative cursor-pointer group">
                <svg
                  className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4l1-12z"
                  />
                </svg>
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-light">
                  {cartCount}
                </span>
                <p className="absolute top-full mt-2 text-xs font-light whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Your order is waiting.
                </p>
              </div>
            </Link>
          )}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-20 md:py-24">
        <div className="space-y-8 mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-heading font-light leading-tight text-balance animate-slide-up-slow">
            What came out of the oven today.
          </h2>
          <p
            className="text-lg font-light text-muted-foreground animate-slide-up-slow"
            style={{ animationDelay: "0.3s" }}
          >
            Baked in small batches. Never rushed.
          </p>
        </div>

        <div className="space-y-0">
          {/* Something Sweet */}
          <CategorySection
            emotion="Something sweet"
            items={products.sweet}
            categoryTitle="Something sweet"
            delayOffset={0.5}
          />

          {/* Something Savoury */}
          <CategorySection
            emotion="Something savoury"
            items={products.savoury}
            categoryTitle="Something savoury"
            delayOffset={1.5}
          />

          {/* Something Warm to Hold */}
          <CategorySection
            emotion="Something warm to hold"
            items={products.warm}
            categoryTitle="Something warm to hold"
            delayOffset={2.5}
          />

          {cartCount > 0 && (
            <section className="py-24 md:py-32 space-y-12 text-center">
              <p className="text-2xl md:text-3xl font-heading font-light">Almost ready?</p>

              <Link href="/cart">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-7 px-12 text-lg font-light transition-all duration-500 shadow-lg hover:shadow-xl"
                >
                  Review my order
                </Button>
              </Link>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
