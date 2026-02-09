"use client"

import { useState, useEffect, useCallback } from "react"
import { Header } from "@/components/header"
import { EpochHero } from "@/components/epoch-hero"
import { StatsRow } from "@/components/stats-row"
import { LiveTicker } from "@/components/live-ticker"
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
    const timer = setTimeout(() => setShowToast(true), 2500)
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
    <div className="min-h-screen bg-background transition-colors">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-5 lg:px-6 lg:py-8">
        {/* Live Activity Ticker */}
        <LiveTicker className="mb-5" />

        {/* Epoch Hero */}
        <EpochHero
          currentTier="Gold"
          epochEnd={getEpochEnd()}
          epochNumber={47}
          className="mb-5"
        />

        {/* Stats Row */}
        <StatsRow className="mb-5" />

        {/* Main Grid: Mobile stacked, Desktop 2-col (Tier/Claim left, Leaderboard right) */}
        <div className="grid gap-5 lg:grid-cols-3">
          {/* Left Sidebar - Tier + Claim (shown first on mobile) */}
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

          {/* Leaderboard - 2 cols (shown second on mobile, right on desktop) */}
          <div className="lg:order-2 lg:col-span-2">
            <RakebackLeaderboard />
          </div>
        </div>

        {/* Bottom Row: Streaks + VIP */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
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
