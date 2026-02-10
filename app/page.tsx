"use client"

import { useState, useEffect, useCallback } from "react"
import { AppShell } from "@/components/app-shell"
import { HomePage } from "@/components/pages/home-page"
import { TradePage } from "@/components/pages/trade-page"
import { TokenPage } from "@/components/pages/token-page"
import { CreatePage } from "@/components/pages/create-page"
import { RewardsPage } from "@/components/pages/rewards-page"
import { EarningsPage } from "@/components/pages/earnings-page"
import { EarningsCreatorPage } from "@/components/pages/earnings-creator-page"
import { EarningsDelegatedPage } from "@/components/pages/earnings-delegated-page"
import { EarningsTraderPage } from "@/components/pages/earnings-trader-page"
import { LeaderboardPage } from "@/components/pages/leaderboard-page"
import { EarningsHub } from "@/components/pages/earnings-hub"
import { ProfilePage } from "@/components/pages/profile-page"
import { EarningsToast } from "@/components/earnings-toast"
import { Footer } from "@/components/footer"

export default function Page() {
  const [showToast, setShowToast] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setShowToast(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleCloseToast = useCallback(() => {
    setShowToast(false)
  }, [])

  if (!mounted) return null

  return (
    <>
      <AppShell>
        {(ctx) => (
          <>
            {ctx.currentPage === "home" && <HomePage />}
            {ctx.currentPage === "trade" && <TradePage />}
            {ctx.currentPage === "token" && <TokenPage />}
            {ctx.currentPage === "create" && <CreatePage />}
            {ctx.currentPage === "rewards" && <RewardsPage />}
            {ctx.currentPage === "earnings" && <EarningsHub />}
            {ctx.currentPage === "earnings" && <EarningsPage />}
            {ctx.currentPage === "earnings-creator" && <EarningsCreatorPage />}
            {ctx.currentPage === "earnings-delegated" && <EarningsDelegatedPage />}
            {ctx.currentPage === "earnings-trader" && <EarningsTraderPage />}
            {ctx.currentPage === "leaderboard" && <LeaderboardPage />}
            {ctx.currentPage === "profile" && <ProfilePage />}
            <Footer />
          </>
        )}
      </AppShell>
      <EarningsToast
        amount={47.23}
        show={showToast}
        onClose={handleCloseToast}
      />
    </>
  )
}
