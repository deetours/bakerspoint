"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function PaymentPage() {
  const router = useRouter()
  const [expandAlternative, setExpandAlternative] = useState(false)
  const [showPaymentButton, setShowPaymentButton] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowPaymentButton(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  const handlePaymentComplete = () => {
    router.push("/confirmation")
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header - back navigation */}
      <header className="fixed top-0 right-0 z-40 p-6 animate-fade-in-slow">
        <Link href="/checkout">
          <p className="text-sm font-light hover:text-primary transition-colors">← Back</p>
        </Link>
      </header>

      {/* SCENE 1: Arrival - calm handover */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
        <div className="max-w-2xl w-full space-y-20">
          {/* Arrival message */}
          <div className="space-y-6 animate-slide-in-product text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-light text-balance">Almost there.</h1>
            <p className="text-lg font-light text-muted-foreground">Choose how you'd like to pay.</p>
          </div>

          {/* SCENE 2: Order Recap - quiet reassurance */}
          <div
            className="space-y-6 animate-fade-in-slow bg-card/40 backdrop-blur-sm border border-border/40 rounded-2xl p-8 md:p-12"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="text-center text-sm font-light text-muted-foreground uppercase tracking-wide">
              Your order, just as you chose it.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 border-b border-border/20">
              <div className="text-left">
                <p className="text-sm text-muted-foreground font-light">Order details</p>
                <p className="text-foreground font-light mt-1">Fresh bakes · Today</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-heading font-light text-primary">₹499</p>
              </div>
            </div>
          </div>

          {/* SCENE 3: Payment Method - UPI (Primary) */}
          <div className="space-y-12 animate-fade-in-slow" style={{ animationDelay: "0.4s" }}>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-heading font-light">Pay using UPI</h2>
                <p className="text-sm font-light text-muted-foreground">Scan the code using any UPI app.</p>
              </div>

              {/* QR Code Container - physical and grounded */}
              <div className="flex justify-center py-8">
                <div className="w-64 h-64 bg-white rounded-2xl border border-border shadow-lg shadow-primary/10 flex items-center justify-center relative overflow-hidden">
                  {/* Subtle inner shadow for depth */}
                  <div className="absolute inset-0 rounded-2xl shadow-inset opacity-50 pointer-events-none"></div>

                  {/* Placeholder for QR code */}
                  <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                    <svg
                      className="w-24 h-24 text-muted-foreground/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M7 4v16h10V4H7zm4 2h2v2H11V6zm6 0h2v2h-2V6zm-6 4h2v2h-2v-2zm6 0h2v2h-2v-2zm-6 4h2v2h-2v-2zm6 0h2v2h-2v-2z"
                      />
                    </svg>
                    <p className="text-xs text-muted-foreground text-center font-light">UPI QR will appear here</p>
                  </div>
                </div>
              </div>

              {/* Trust reinforcement */}
              <p className="text-center text-xs text-muted-foreground font-light tracking-wide">
                Secure. Direct. No redirects.
              </p>
            </div>

            {/* SCENE 5: Alternative Option - collapsed */}
            <div className="pt-8 border-t border-border/20 space-y-4">
              <button
                onClick={() => setExpandAlternative(!expandAlternative)}
                className="flex items-center justify-center gap-2 text-sm font-light text-muted-foreground hover:text-foreground transition-colors w-full py-4"
              >
                <span>Prefer another method?</span>
                <span className={`transition-transform duration-300 ${expandAlternative ? "rotate-180" : ""}`}>▼</span>
              </button>

              {/* Alternative payment methods */}
              {expandAlternative && (
                <div className="space-y-3 pt-4 animate-slide-up-slow">
                  <button className="w-full px-4 py-3 border border-border rounded-lg text-sm font-light text-foreground hover:bg-muted/20 transition-colors">
                    Credit / Debit Card
                  </button>
                  <button className="w-full px-4 py-3 border border-border rounded-lg text-sm font-light text-foreground hover:bg-muted/20 transition-colors">
                    Digital Wallet
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* SCENE 6: Payment Action - gentle commitment */}
          {showPaymentButton && (
            <div className="space-y-4 pt-8 animate-fade-in-slow" style={{ animationDelay: "0.6s" }}>
              <Button
                onClick={handlePaymentComplete}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-8 text-lg font-light transition-all duration-500 shadow-lg hover:shadow-xl"
              >
                I've completed the payment
              </Button>
              <p className="text-center text-sm text-muted-foreground font-light">We'll confirm and start baking.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
