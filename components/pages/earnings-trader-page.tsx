"use client"

import { useState, useEffect } from "react"
import { Coins, Clock, Zap, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TierBadge, getTierByName, type TierName } from "@/components/tier-badge"
import { EarningsTabsLayout } from "@/components/earnings-tabs-layout"
import { ClaimModal } from "@/components/claim-modal"
import { cn } from "@/lib/utils"

/* ── Mock data ── */
const TRADER_DATA = {
  currentTier: "Gold" as TierName,
  rakebackPercent: 0.04,
  cycleEnd: (() => {
    const d = new Date()
    d.setDate(d.getDate() + 2)
    d.setHours(d.getHours() + 4)
    return d
  })(),
  claimableSOL: 0.1271,
  claimableUSD: 19.00,
  axiomEligible: true,
  history: [
    { cycle: 47, period: "Feb 7 - Feb 10", amount: 0.1271, usd: 19.0, status: "claimable" as const },
    { cycle: 46, period: "Feb 4 - Feb 7", amount: 0.098, usd: 14.7, status: "claimed" as const },
    { cycle: 45, period: "Feb 1 - Feb 4", amount: 0.112, usd: 16.8, status: "claimed" as const },
    { cycle: 44, period: "Jan 29 - Feb 1", amount: 0.085, usd: 12.75, status: "claimed" as const },
    { cycle: 43, period: "Jan 26 - Jan 29", amount: 0.092, usd: 13.8, status: "claimed" as const },
    { cycle: 42, period: "Jan 23 - Jan 26", amount: 0.076, usd: 11.4, status: "claimed" as const },
  ],
}

/* ── Countdown ── */
function CycleCountdown({ endDate }: { endDate: Date }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const diff = endDate.getTime() - Date.now()
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      }
    }
    setTime(calc())
    const iv = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(iv)
  }, [endDate])

  const blocks = [
    { value: time.days, label: "D" },
    { value: time.hours, label: "H" },
    { value: time.minutes, label: "M" },
    { value: time.seconds, label: "S" },
  ]

  return (
    <div className="flex items-center gap-1">
      {blocks.map((b, i) => (
        <div key={b.label} className="flex items-center gap-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-sm font-bold tabular-nums text-foreground sm:h-10 sm:w-10">
            {String(b.value).padStart(2, "0")}
          </div>
          <span className="text-[10px] text-muted-foreground">{b.label}</span>
          {i < blocks.length - 1 && (
            <span className="text-muted-foreground/40 font-bold mx-px">:</span>
          )}
        </div>
      ))}
    </div>
  )
}

function StatusBadge({ status }: { status: "claimable" | "claimed" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold",
        status === "claimable"
          ? "bg-neon-green/15 text-neon-green border-neon-green/30"
          : "bg-muted text-muted-foreground border-border"
      )}
    >
      {status === "claimable" ? "Claimable" : "Claimed"}
    </span>
  )
}

export function EarningsTraderPage() {
  const [claimOpen, setClaimOpen] = useState(false)
  const tierConfig = getTierByName(TRADER_DATA.currentTier)

  return (
    <EarningsTabsLayout activeTab="earnings-trader">
      {/* Page Title */}
      <h2 className="text-xl font-bold text-foreground mb-1">
        Trader Earnings (Rakeback)
      </h2>
      <p className="text-sm text-muted-foreground mb-5">
        Earn cashback on every trade based on your volume tier
      </p>

      {/* Top Section: Tier + Cycle + Claim */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-5">
        {/* Current Tier */}
        <div className="glass rounded-2xl p-4 sm:p-5">
          <p className="text-xs text-muted-foreground mb-3">Current Tier</p>
          <div className="flex items-center gap-3">
            <TierBadge tier={TRADER_DATA.currentTier} size="lg" />
            <div>
              <p
                className="text-lg font-bold"
                style={{ color: tierConfig.color }}
              >
                {tierConfig.name}
              </p>
              <p className="text-sm text-muted-foreground">
                {TRADER_DATA.rakebackPercent}% rakeback
              </p>
            </div>
          </div>

          {/* Axiom Boost */}
          {TRADER_DATA.axiomEligible && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="mt-3 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 cursor-help">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-semibold text-primary">
                      Axiom Boost Active
                    </span>
                    <Info className="h-3 w-3 text-primary/60 ml-auto" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs text-xs">
                    You qualify for Axiom Boost, which provides an additional
                    multiplier on your rakeback earnings.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {/* Cycle Countdown */}
        <div className="glass rounded-2xl p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">3-Day Cycle Ends In</p>
          </div>
          <CycleCountdown endDate={TRADER_DATA.cycleEnd} />
          <p className="text-[11px] text-muted-foreground mt-3">
            Cycle #47 {" -- "} Rakeback is calculated and distributed at the end of each
            3-day cycle.
          </p>
        </div>

        {/* Claimable This Cycle */}
        <div className="glass rounded-2xl p-4 sm:p-5 sm:col-span-2 lg:col-span-1 relative overflow-hidden">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          <div className="relative">
            <p className="text-xs text-muted-foreground mb-2">
              Claimable This Cycle
            </p>
            <p className="text-2xl font-bold font-mono text-foreground mb-1">
              {TRADER_DATA.claimableSOL.toFixed(4)}{" "}
              <span className="text-sm text-muted-foreground">SOL</span>
            </p>
            <p className="text-sm font-mono text-primary mb-4">
              ${TRADER_DATA.claimableUSD.toFixed(2)}
            </p>
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              onClick={() => setClaimOpen(true)}
            >
              <Coins className="h-4 w-4" />
              Claim Rakeback
            </Button>
          </div>
        </div>
      </div>

      {/* Cycle History */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border/50">
          <h3 className="text-sm font-semibold text-foreground">Cycle History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                  Cycle
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground hidden sm:table-cell">
                  Period
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                  Amount
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground hidden sm:table-cell">
                  USD Value
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {TRADER_DATA.history.map((row) => (
                <tr
                  key={row.cycle}
                  className="border-b border-border/30 last:border-0 transition-colors hover:bg-muted/30"
                >
                  <td className="px-4 py-3">
                    <span className="font-semibold text-foreground">
                      #{row.cycle}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs hidden sm:table-cell">
                    {row.period}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-foreground text-xs">
                    {row.amount.toFixed(4)}{" "}
                    <span className="text-muted-foreground">SOL</span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-muted-foreground text-xs hidden sm:table-cell">
                    ${row.usd.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ClaimModal
        open={claimOpen}
        onOpenChange={setClaimOpen}
        category="Trader Rakeback"
        amount={TRADER_DATA.claimableSOL.toFixed(4)}
        currency="SOL"
      />
    </EarningsTabsLayout>
  )
}
