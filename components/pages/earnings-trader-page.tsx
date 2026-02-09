"use client"

import { useState, useEffect } from "react"
import {
  TrendingUp,
  ArrowRight,
  Clock,
  Zap,
  ChevronRight,
  History,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { TierBadge, getTierByName, type TierName } from "@/components/tier-badge"
import { ClaimModal } from "@/components/claim-modal"
import { cn } from "@/lib/utils"

const USER_TIER: TierName = "Gold"
const AXIOM_BOOST = true
const CLAIMABLE_SOL = 0.4521
const CLAIMABLE_USD1 = 128.35

interface CycleHistory {
  cycle: number
  dateRange: string
  volume: string
  rakeback: number
  currency: string
  claimed: boolean
}

const CYCLE_HISTORY: CycleHistory[] = [
  { cycle: 47, dateRange: "Feb 7 - Feb 9", volume: "$3.1M", rakeback: 0.4521, currency: "SOL", claimed: false },
  { cycle: 46, dateRange: "Feb 4 - Feb 7", volume: "$2.8M", rakeback: 0.392, currency: "SOL", claimed: true },
  { cycle: 45, dateRange: "Feb 1 - Feb 4", volume: "$3.4M", rakeback: 0.512, currency: "SOL", claimed: true },
  { cycle: 44, dateRange: "Jan 29 - Feb 1", volume: "$1.9M", rakeback: 0.287, currency: "SOL", claimed: true },
  { cycle: 43, dateRange: "Jan 26 - Jan 29", volume: "$2.2M", rakeback: 0.341, currency: "SOL", claimed: true },
  { cycle: 42, dateRange: "Jan 23 - Jan 26", volume: "$2.6M", rakeback: 0.398, currency: "SOL", claimed: true },
]

/* ── Countdown ── */
function MiniCountdown() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 })

  useEffect(() => {
    const end = new Date()
    end.setDate(end.getDate() + 2)
    end.setHours(23, 59, 59, 999)

    function tick() {
      const diff = Math.max(0, end.getTime() - Date.now())
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setTimeLeft({ h, m, s })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <div className="flex items-center gap-1 font-mono text-sm">
      <span className="rounded-md bg-muted px-1.5 py-0.5 text-foreground dark:bg-secondary">
        {pad(timeLeft.h)}
      </span>
      <span className="text-muted-foreground">:</span>
      <span className="rounded-md bg-muted px-1.5 py-0.5 text-foreground dark:bg-secondary">
        {pad(timeLeft.m)}
      </span>
      <span className="text-muted-foreground">:</span>
      <span className="rounded-md bg-muted px-1.5 py-0.5 text-foreground dark:bg-secondary">
        {pad(timeLeft.s)}
      </span>
    </div>
  )
}

export function EarningsTraderContent() {
  const [claimModal, setClaimModal] = useState(false)
  const [loading] = useState(false)
  const tierConfig = getTierByName(USER_TIER)
  const totalUsd = CLAIMABLE_SOL * 150 + CLAIMABLE_USD1

  return (
    <div className="space-y-5">
      {/* Tier + Rakeback summary */}
      <div className="glass rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <TierBadge tier={USER_TIER} size="lg" />
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h3
                  className="text-base font-bold"
                  style={{ color: tierConfig.color }}
                >
                  {USER_TIER} Tier
                </h3>
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  {tierConfig.percent}% rakeback
                </span>
                {AXIOM_BOOST && (
                  <span className="group relative inline-flex items-center gap-0.5 rounded-full bg-neon-green/10 px-2 py-0.5 text-[10px] font-semibold text-neon-green">
                    <Zap className="h-2.5 w-2.5" />
                    +15% Axiom Boost
                    <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 text-[11px] font-normal text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                      Post-migration Axiom user with higher payout rate
                    </span>
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Earn cashback on every trade based on your volume tier.
              </p>
            </div>
          </div>

          {/* Current cycle countdown */}
          <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/50 px-4 py-3 dark:bg-secondary/50">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Cycle 47 ends in
              </p>
              <MiniCountdown />
            </div>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Claimable this cycle */}
      <div className="glass rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Claimable This Cycle
              </h3>
              <p className="text-xs text-muted-foreground">
                Cycle 47 | Feb 7 - Feb 9, 2026
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total value</p>
              <p className="text-lg font-bold font-mono text-primary">
                ${totalUsd.toFixed(2)}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {CLAIMABLE_SOL.toFixed(4)} SOL + {CLAIMABLE_USD1.toFixed(2)} USD1
              </p>
            </div>
            <Button
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              onClick={() => setClaimModal(true)}
            >
              Claim
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Cycle history */}
      <div className="glass overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between border-b border-border/50 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-bold text-foreground">
              Cycle History
            </h3>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-6 w-10 rounded" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="ml-auto h-4 w-16" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px]">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Cycle
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Period
                  </th>
                  <th className="hidden px-4 py-2.5 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
                    Volume
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Rakeback
                  </th>
                  <th className="px-4 py-2.5 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {CYCLE_HISTORY.map((row) => (
                  <tr
                    key={row.cycle}
                    className={cn(
                      "border-b border-border/30 last:border-0 transition-colors hover:bg-muted/30",
                      !row.claimed && "bg-primary/[0.02]"
                    )}
                  >
                    <td className="px-4 py-3">
                      <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs font-bold text-foreground dark:bg-secondary">
                        #{row.cycle}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {row.dateRange}
                    </td>
                    <td className="hidden px-4 py-3 text-right font-mono text-xs text-muted-foreground sm:table-cell">
                      {row.volume}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-mono text-sm font-medium text-foreground">
                        {row.rakeback.toFixed(4)}
                      </span>
                      <span className="ml-1 text-[10px] text-muted-foreground">
                        {row.currency}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {row.claimed ? (
                        <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                          Claimed
                        </span>
                      ) : (
                        <span className="rounded-full border border-neon-green/30 bg-neon-green/10 px-2 py-0.5 text-[10px] font-semibold text-neon-green">
                          Claimable
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ClaimModal
        open={claimModal}
        onClose={() => setClaimModal(false)}
        title="Claim Trader Rakeback"
        amount={totalUsd.toFixed(2)}
        currency="USD"
      />
    </div>
  )
}
