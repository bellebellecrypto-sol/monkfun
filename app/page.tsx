"use client"

import { useState, useEffect, useCallback } from "react"
import { Header } from "@/components/header"
import { EpochHero } from "@/components/epoch-hero"
import { StatsRow } from "@/components/stats-row"
import { RakebackLeaderboard } from "@/components/rakeback-leaderboard"
import { TierProgress } from "@/components/tier-progress"
import { ClaimCard } from "@/components/claim-card"
import { VipLounge } from "@/components/vip-lounge"
import { StreakCard } from "@/components/streak-card"
import { Confetti } from "@/components/confetti"
import { EarningsToast } from "@/components/earnings-toast"
import { Footer } from "@/components/footer"

// 3-day epoch end from now
function getEpochEnd(): Date {
  const now = new Date()
  const end = new Date(now)
  end.setDate(end.getDate() + 2)
  end.setHours(23, 59, 59, 999)
  return end
}

export default function Page() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Show earnings toast after 2s
    const timer = setTimeout(() => setShowToast(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleClaim = useCallback(() => {
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 100)
  }, [])

  const handleCloseToast = useCallback(() => {
    setShowToast(false)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-6 lg:px-6 lg:py-8">
        {/* Epoch Hero */}
        <EpochHero
          currentTier="Gold"
          epochEnd={getEpochEnd()}
          epochNumber={47}
          className="mb-6"
        />

        {/* Stats Row */}
        <StatsRow className="mb-6" />

        {/* Main Grid: Leaderboard + Sidebar */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Leaderboard - 2 cols */}
          <div className="lg:col-span-2">
            <RakebackLeaderboard />
          </div>

          {/* Sidebar - 1 col */}
          <div className="flex flex-col gap-6">
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
        </div>

        {/* Bottom Row: Streaks + VIP */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <StreakCard
            currentStreak={5}
            bestStreak={12}
            streakDays={[true, true, true, true, true, false, false]}
          />
          <VipLounge isVip={false} />
        </div>
      </main>

      <Footer />

      {/* Overlays */}
      <Confetti trigger={showConfetti} />
      <EarningsToast
        amount={47.23}
        show={showToast}
        onClose={handleCloseToast}
      />
    </div>
  )
}
