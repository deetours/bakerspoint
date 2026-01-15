"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ConfirmationPage() {
  const [showSteps, setShowSteps] = useState(false)
  const [showFooter, setShowFooter] = useState(false)

  useEffect(() => {
    const stepsTimer = setTimeout(() => setShowSteps(true), 500)
    const footerTimer = setTimeout(() => setShowFooter(true), 2000)
    return () => {
      clearTimeout(stepsTimer)
      clearTimeout(footerTimer)
    }
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="max-w-2xl w-full text-center space-y-20">
        {/* SCENE 1: Arrival - relief and satisfaction */}
        <div className="space-y-12 animate-fade-in-slow">
          <h1 className="text-5xl md:text-6xl font-heading font-light text-balance">Your order is in the oven.</h1>
          <p className="text-xl font-light text-muted-foreground">That felt good.</p>
        </div>

        {/* SCENE 2: What happens next - gentle steps */}
        {showSteps && (
          <div className="space-y-8 animate-fade-in-slow">
            <p className="text-sm text-muted-foreground font-light uppercase tracking-wide">What happens next</p>

            <div className="space-y-6">
              {["We're baking your order.", "We'll notify you when it's ready."].map((step, index) => (
                <p
                  key={index}
                  className="text-lg font-light text-muted-foreground animate-fade-in-slow"
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  {step}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* SCENE 3: Gentle goodbye - optional thank you */}
        {showFooter && (
          <div className="space-y-12 animate-fade-in-slow pt-12 border-t border-border/40">
            <p className="text-lg font-light text-muted-foreground italic">
              Thank you for trusting us with your morning.
            </p>

            <Link href="/menu">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 px-8 text-lg font-light transition-all duration-500 shadow-lg hover:shadow-xl"
              >
                Back to today's bakes
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
