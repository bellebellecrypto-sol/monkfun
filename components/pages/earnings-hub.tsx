"use client"

import { useState } from "react"
import {
  DollarSign,
  Coins,
  Users,
  TrendingUp,
  ChevronLeft,
} from "lucide-react"
import { useNavigation } from "@/components/app-shell"
import { EarningsOverviewContent, type EarningsTab } from "@/components/pages/earnings-page"
import { EarningsCreatorContent } from "@/components/pages/earnings-creator-page"
import { EarningsDelegatedContent } from "@/components/pages/earnings-delegated-page"
import { EarningsTraderContent } from "@/components/pages/earnings-trader-page"
import { cn } from "@/lib/utils"

const TABS: { id: EarningsTab; label: string; icon: typeof DollarSign }[] = [
  { id: "overview", label: "Overview", icon: DollarSign },
  { id: "creator", label: "Creator", icon: Coins },
  { id: "delegated", label: "Delegated", icon: Users },
  { id: "trader", label: "Trader", icon: TrendingUp },
]

export function EarningsHub() {
  const [activeTab, setActiveTab] = useState<EarningsTab>("overview")
  const { setPage } = useNavigation()

  const handleNavigate = (tab: EarningsTab) => {
    setActiveTab(tab)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-5 lg:px-6">
      {/* Tab navigation (visible on sub-pages) */}
      {activeTab !== "overview" && (
        <div className="mb-5">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className="mb-3 flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Back to Earnings
          </button>
        </div>
      )}

      {/* Tab bar */}
      <div className="mb-5 flex items-center gap-1 overflow-x-auto rounded-xl border border-border bg-muted/50 p-1 dark:bg-secondary/30">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleNavigate(tab.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "bg-card text-foreground shadow-sm dark:bg-card"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content */}
      {activeTab === "overview" && (
        <EarningsOverviewContent onNavigate={handleNavigate} />
      )}
      {activeTab === "creator" && <EarningsCreatorContent />}
      {activeTab === "delegated" && <EarningsDelegatedContent />}
      {activeTab === "trader" && <EarningsTraderContent />}
    </div>
  )
}
