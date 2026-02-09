"use client"

import { useState } from "react"
import { Gift, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ClaimCardProps {
  claimableSOL: number
  claimableUSD1: number
  onClaim?: () => void
  className?: string
}

export function ClaimCard({
  claimableSOL,
  claimableUSD1,
  onClaim,
  className,
}: ClaimCardProps) {
  const [claiming, setClaiming] = useState(false)

  const handleClaim = () => {
    setClaiming(true)
    onClaim?.()
    setTimeout(() => setClaiming(false), 2000)
  }

  return (
    <div
      className={cn(
        "glass rounded-2xl p-4 sm:p-6 relative overflow-hidden",
        className
      )}
    >
      {/* Glow accent */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
            <Gift className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">
            Claimable Rakeback
          </h3>
        </div>

        <div className="mb-5 space-y-3">
          <div className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3">
            <div>
              <p className="text-xs text-muted-foreground">SOL Rakeback</p>
              <p className="text-lg font-bold text-foreground font-mono">
                {claimableSOL.toFixed(4)}{" "}
                <span className="text-xs text-muted-foreground">SOL</span>
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary bg-transparent"
              onClick={handleClaim}
              disabled={claiming || claimableSOL === 0}
            >
              Claim
            </Button>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-secondary/50 px-4 py-3">
            <div>
              <p className="text-xs text-muted-foreground">USD1 Rakeback</p>
              <p className="text-lg font-bold text-foreground font-mono">
                {claimableUSD1.toFixed(2)}{" "}
                <span className="text-xs text-muted-foreground">USD1</span>
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary bg-transparent"
              onClick={handleClaim}
              disabled={claiming || claimableUSD1 === 0}
            >
              Claim
            </Button>
          </div>
        </div>

        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 animate-pulse-glow gap-2 text-sm font-semibold"
          onClick={handleClaim}
          disabled={claiming}
        >
          {claiming ? (
            "Claiming..."
          ) : (
            <>
              Claim All Rakeback
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
