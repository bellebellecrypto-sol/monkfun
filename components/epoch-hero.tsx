"use client"

import { useEffect, useState } from "react"
import { CountdownTimer } from "@/components/countdown-timer"
import { TierBadgeLabel } from "@/components/tier-badge"
import type { TierName } from "@/components/tier-badge"
import { cn } from "@/lib/utils"
import { Clock } from "lucide-react"

function getResetLabel(endDate: Date) {
  const now = new Date()
  const diff = endDate.getTime() - now.getTime()
  if (diff <= 0) return "Resetting..."
  const d = Math.floor(diff / (1000 * 60 * 60 * 24))
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
  return `Resets in ${d}d ${String(h).padStart(2, "0")}h`
}

interface EpochHeroProps {
  currentTier: TierName
  epochEnd: Date
  epochNumber: number
  className?: string
}

export function EpochHero({
  currentTier,
  epochEnd,
  epochNumber,
  className,
}: EpochHeroProps) {
  const [resetLabel, setResetLabel] = useState(getResetLabel(epochEnd))

  useEffect(() => {
    const interval = setInterval(() => {
      setResetLabel(getResetLabel(epochEnd))
    }, 60000)
    return () => clearInterval(interval)
  }, [epochEnd])

  return (
    <section
      className={cn(
        "glass relative overflow-hidden rounded-2xl",
        className
      )}
    >
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent dark:from-primary/8" />
      <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-diamond/5 blur-3xl" />

      <div className="relative flex flex-col items-center gap-6 px-4 py-8 sm:px-8 sm:py-10 lg:flex-row lg:justify-between">
        {/* Left: Title + tier */}
        <div className="text-center lg:text-left">
          <div className="mb-3 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <span className="rounded-md bg-primary/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
              Epoch {epochNumber}
            </span>
            <span className="flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              <Clock className="h-3 w-3" />
              {resetLabel}
            </span>
            <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[10px] text-muted-foreground">
              3-day cycle
            </span>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-foreground text-balance sm:text-3xl lg:text-4xl">
            Rakeback{" "}
            <span className="text-primary text-glow-orange">Rewards</span>
          </h1>
          <p className="mb-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            Earn cashback on every trade, regardless of P&L. Volume-based
            rewards paid every epoch cycle.
          </p>
          <TierBadgeLabel tier={currentTier} showPercent />
        </div>

        {/* Right: Countdown */}
        <div className="flex flex-col items-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Epoch ends in
          </p>
          <CountdownTimer endDate={epochEnd} />
        </div>
      </div>
    </section>
  )
}
