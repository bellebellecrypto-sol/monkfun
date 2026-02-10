"use client"

import { type ReactNode } from "react"
import { ArrowLeft, Paintbrush, Users, ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigation, type PageId } from "@/components/app-shell"
import { cn } from "@/lib/utils"

const TABS: { id: PageId; label: string; icon: typeof Paintbrush }[] = [
  { id: "earnings-creator", label: "Creator", icon: Paintbrush },
  { id: "earnings-delegated", label: "Delegated", icon: Users },
  { id: "earnings-trader", label: "Trader", icon: ArrowLeftRight },
]

interface EarningsTabsLayoutProps {
  activeTab: PageId
  children: ReactNode
}

export function EarningsTabsLayout({
  activeTab,
  children,
}: EarningsTabsLayoutProps) {
  const { setPage } = useNavigation()

  return (
    <div className="mx-auto max-w-6xl px-4 py-5 lg:px-6">
      {/* Back + Title */}
      <div className="mb-5 flex items-center gap-3">
        <Button
          size="sm"
          variant="ghost"
          className="gap-1.5 text-muted-foreground hover:text-foreground"
          onClick={() => setPage("earnings")}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Earnings</span>
        </Button>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex items-center gap-1 rounded-xl border border-border/50 bg-muted/50 p-1 dark:bg-secondary/30 dark:border-transparent">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setPage(tab.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                isActive
                  ? "bg-card text-foreground shadow-sm dark:bg-card"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Content */}
      {children}
    </div>
  )
}
