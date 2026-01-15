"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CheckoutPage() {
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickupTime: "",
    deliveryType: "pickup",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/payment")
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 right-0 z-40 p-6 animate-fade-in-slow">
        <Link href="/cart">
          <p className="text-sm font-light hover:text-primary transition-colors">← Back</p>
        </Link>
      </header>

      {/* SCENE 1: Entry - calm reassurance */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
        <div className="max-w-2xl w-full space-y-16 animate-slide-in-product">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-heading font-light text-balance">We'll take care of the rest.</h1>
            <p className="text-lg font-light text-muted-foreground">Just the basics.</p>
          </div>

          {/* SCENE 2: Form - minimal and breathing */}
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Name Field */}
            <div className="space-y-4 animate-fade-in-slow" style={{ animationDelay: "0.3s" }}>
              <label htmlFor="name" className="block text-sm font-light text-muted-foreground">
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full px-4 py-4 bg-background border border-border rounded-lg focus:outline-none transition-all duration-300 font-light text-foreground placeholder:text-muted-foreground/50"
                style={{
                  boxShadow: focusedField === "name" ? "0 0 0 3px var(--primary) inset" : "none",
                }}
                placeholder="First and last"
              />
            </div>

            {/* Phone Field */}
            <div className="space-y-4 animate-fade-in-slow" style={{ animationDelay: "0.4s" }}>
              <label htmlFor="phone" className="block text-sm font-light text-muted-foreground">
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField("phone")}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full px-4 py-4 bg-background border border-border rounded-lg focus:outline-none transition-all duration-300 font-light text-foreground placeholder:text-muted-foreground/50"
                style={{
                  boxShadow: focusedField === "phone" ? "0 0 0 3px var(--primary) inset" : "none",
                }}
                placeholder="+91"
              />
            </div>

            {/* Delivery Type */}
            <div className="space-y-4 animate-fade-in-slow" style={{ animationDelay: "0.5s" }}>
              <label htmlFor="deliveryType" className="block text-sm font-light text-muted-foreground">
                Pickup or delivery
              </label>
              <select
                id="deliveryType"
                name="deliveryType"
                value={formData.deliveryType}
                onChange={handleChange}
                className="w-full px-4 py-4 bg-background border border-border rounded-lg focus:outline-none transition-all duration-300 font-light text-foreground"
              >
                <option value="pickup">I'll pick it up</option>
                <option value="delivery">Please deliver</option>
              </select>
            </div>

            {/* Pickup/Delivery Time */}
            <div className="space-y-4 animate-fade-in-slow" style={{ animationDelay: "0.6s" }}>
              <label htmlFor="pickupTime" className="block text-sm font-light text-muted-foreground">
                When do you want it
              </label>
              <input
                type="time"
                id="pickupTime"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                onFocus={() => setFocusedField("pickupTime")}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full px-4 py-4 bg-background border border-border rounded-lg focus:outline-none transition-all duration-300 font-light text-foreground"
                style={{
                  boxShadow: focusedField === "pickupTime" ? "0 0 0 3px var(--primary) inset" : "none",
                }}
              />
            </div>

            {/* SCENE 3: Reassurance beat */}
            <p
              className="text-center text-muted-foreground font-light italic py-6 animate-fade-in-slow"
              style={{ animationDelay: "0.7s" }}
            >
              Freshly baked. Just for you.
            </p>

            {/* SCENE 4: Final commitment button */}
            <div className="space-y-4 pt-8 animate-fade-in-slow" style={{ animationDelay: "0.8s" }}>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-8 text-lg font-light transition-all duration-500 shadow-lg hover:shadow-xl"
              >
                Bake this for me
              </Button>
              <p className="text-center text-sm text-muted-foreground font-light">We'll start once you confirm.</p>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
