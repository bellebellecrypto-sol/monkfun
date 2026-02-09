"use client"

import { CountdownTimer } from "@/components/countdown-timer"
import { TierBadgeLabel } from "@/components/tier-badge"
import type { TierName } from "@/components/tier-badge"
import { cn } from "@/lib/utils"

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
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/50",
        className
      )}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-card" />
      <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-diamond/5 blur-3xl" />

      <div className="relative flex flex-col items-center gap-6 px-4 py-8 sm:px-8 sm:py-12 lg:flex-row lg:justify-between">
        {/* Left: Title + tier */}
        <div className="text-center lg:text-left">
          <div className="mb-2 flex items-center justify-center gap-2 lg:justify-start">
            <span className="rounded-md bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
              Epoch {epochNumber}
            </span>
            <span className="text-xs text-muted-foreground">3-day cycle</span>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-foreground text-balance sm:text-3xl lg:text-4xl">
            Rakeback{" "}
            <span className="text-primary text-glow-orange">Leaderboard</span>
          </h1>
          <p className="mb-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            Earn cashback on every trade. Climb the tiers, increase your
            rakeback %, and claim rewards every epoch.
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
