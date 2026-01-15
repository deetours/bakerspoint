"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0)
  const [showNav, setShowNav] = useState(false)
  const [showSecondary, setShowSecondary] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      if (window.scrollY > 300) {
        setShowNav(true)
      }
    }

    const secondaryTimer = setTimeout(() => setShowSecondary(true), 1500)
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(secondaryTimer)
    }
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {showNav && (
        <nav className="fixed top-0 right-0 z-50 p-6 animate-fade-in-slow">
          <div className="flex gap-6 text-sm">
            <Link href="/menu" className="hover:text-primary transition-colors">
              Today's Bakes
            </Link>
            <Link href="/story" className="hover:text-primary transition-colors">
              Our Story
            </Link>
            <Link href="/cart" className="hover:text-primary transition-colors">
              Cart
            </Link>
          </div>
        </nav>
      )}

      {/* SCENE 1: OPENING FRAME */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              background: `radial-gradient(circle at ${50 + scrollY * 0.1}% ${50 + scrollY * 0.15}%, rgba(224, 122, 63, 0.08) 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* Main Copy */}
        <div className="relative z-10 text-center space-y-6 max-w-2xl animate-fade-in-slow">
          <h1 className="text-5xl md:text-7xl font-heading font-light leading-tight text-balance">
            It starts
            <br />
            before the city does.
          </h1>
        </div>

        {showSecondary && (
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center animate-fade-in-secondary">
            <p className="text-lg md:text-xl font-light text-muted-foreground">Hand-baked pastries, every morning.</p>
          </div>
        )}

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* SCENE 2: THE SENSORY MOMENT */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/almond-croissant-buttery.jpg"
            alt=""
            className="w-full h-full object-cover blur-2xl"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          />
        </div>

        <div className="relative z-10 max-w-xl text-center space-y-6">
          <p className="text-2xl md:text-4xl font-heading font-light leading-relaxed">
            The smell that makes you slow down.
          </p>
          <p className="text-lg font-light text-muted-foreground">Even on busy days.</p>
        </div>
      </section>

      {/* SCENE 3: FIRST REVEAL */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
        <div className="max-w-2xl w-full space-y-12">
          <div className="group cursor-pointer">
            <div className="overflow-hidden rounded-lg animate-slide-in-product">
              <img
                src="/almond-croissant-buttery.jpg"
                alt="Almond Croissant"
                className="w-full h-96 md:h-[500px] object-cover transition-all duration-700 group-hover:scale-105 group-hover:animate-lift-hover animate-subtle-glow"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-light">Almond Croissant</h2>
            <p className="text-sm md:text-base tracking-widest text-muted-foreground uppercase">
              Rolled. Rested. Baked at sunrise.
            </p>
          </div>

          <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <Link href="/menu">
              <p className="text-lg font-light text-primary hover:text-primary/80 transition-colors">Add to order →</p>
            </Link>
          </div>
        </div>
      </section>

      {/* SCENE 4: RHYTHM & ABUNDANCE */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 space-y-20">
        <div className="max-w-2xl w-full space-y-24">
          {/* Product 1 */}
          <div className="animate-slide-in-product" style={{ animationDelay: "0s" }}>
            <div className="group cursor-pointer space-y-6">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/chocolate-pain-au-chocolat.jpg"
                  alt="Pain au Chocolat"
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-heading font-light">Pain au Chocolat</h3>
                <p className="text-sm text-muted-foreground">₹130</p>
              </div>
            </div>
          </div>

          <p className="text-center text-muted-foreground italic font-light">Baked in small batches. Always.</p>

          {/* Product 2 */}
          <div className="animate-slide-in-product" style={{ animationDelay: "0.3s" }}>
            <div className="group cursor-pointer space-y-6">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/raspberry-danish-pastry.jpg"
                  alt="Raspberry Danish"
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-heading font-light">Raspberry Danish</h3>
                <p className="text-sm text-muted-foreground">₹120</p>
              </div>
            </div>
          </div>

          <p className="text-center text-muted-foreground italic font-light">We stop baking when it feels right.</p>

          {/* Product 3 */}
          <div className="animate-slide-in-product" style={{ animationDelay: "0.6s" }}>
            <div className="group cursor-pointer space-y-6">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="/cheese-herb-croissant-savory.jpg"
                  alt="Cheese & Herb Croissant"
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-heading font-light">Cheese & Herb Croissant</h3>
                <p className="text-sm text-muted-foreground">₹130</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCENE 5: HUMAN PROOF */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full space-y-8 text-center">
          <p className="text-lg font-light text-muted-foreground animate-fade-in-slow">
            Sold out by 11:47 AM yesterday.
          </p>

          <div className="h-12" />

          <p
            className="text-lg font-light text-muted-foreground animate-fade-in-slow"
            style={{ animationDelay: "0.5s" }}
          >
            Some regulars come in before we open.
          </p>

          <div className="h-12" />

          <p
            className="text-sm font-light text-muted-foreground italic animate-fade-in-slow"
            style={{ animationDelay: "1s" }}
          >
            These moments are whispers, not ads.
          </p>
        </div>
      </section>

      {/* SCENE 6: THE INVITATION */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-md w-full space-y-12 text-center">
          <p className="text-2xl md:text-3xl font-heading font-light">This is what we baked today.</p>

          <Link href="/menu">
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-8 text-lg font-light transition-all duration-500 shadow-lg hover:shadow-xl"
            >
              See today's bakes
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
