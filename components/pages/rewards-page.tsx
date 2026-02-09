"use client"

import { useState, useCallback } from "react"
import { DollarSign, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigation } from "@/components/app-shell"
import { EpochHero } from "@/components/epoch-hero"
import { StatsRow } from "@/components/stats-row"
import { TierProgress } from "@/components/tier-progress"
import { ClaimCard } from "@/components/claim-card"
import { VipLounge } from "@/components/vip-lounge"
import { StreakCard } from "@/components/streak-card"
import { Confetti } from "@/components/confetti"

function getEpochEnd(): Date {
  const now = new Date()
  const end = new Date(now)
  end.setDate(end.getDate() + 2)
  end.setHours(23, 59, 59, 999)
  return end
}

export function RewardsPage() {
  const [showConfetti, setShowConfetti] = useState(false)
  const { setPage } = useNavigation()

  const handleClaim = useCallback(() => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 100)
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-5 lg:px-6">
      {/* View Earnings shortcut */}
      <div className="mb-5 flex items-center justify-between rounded-2xl border border-neon-green/20 bg-neon-green/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neon-green/10">
            <DollarSign className="h-5 w-5 text-neon-green" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              $689.15 claimable earnings
            </p>
            <p className="text-xs text-muted-foreground">
              Creator fees, delegated fees & trader rakeback
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5 border-neon-green/30 text-neon-green hover:bg-neon-green/10 hover:text-neon-green bg-transparent"
          onClick={() => setPage("earnings")}
        >
          View Earnings
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Epoch Hero */}
      <EpochHero
        currentTier="Gold"
        epochEnd={getEpochEnd()}
        epochNumber={47}
        className="mb-5"
      />

      {/* Stats Row */}
      <StatsRow className="mb-5" />

      {/* Main Grid */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Left Sidebar */}
        <div className="flex flex-col gap-5 lg:order-1">
          <TierProgress
            currentTier="Gold"
            currentVolume={87500}
            nextTierVolume={150000}
          />
          <ClaimCard
            claimableSOL={0.4521}
            claimableUSD1={128.35}
            onClaim={handleClaim}
          />
        </div>

        {/* Right: Streaks + VIP */}
        <div className="flex flex-col gap-5 lg:order-2 lg:col-span-2">
          <StreakCard
            currentStreak={5}
            bestStreak={12}
            streakDays={[true, true, true, true, true, false, false]}
          />
          <VipLounge isVip={false} />
        </div>
      </div>

      <Confetti trigger={showConfetti} />
    </div>
  )
}
