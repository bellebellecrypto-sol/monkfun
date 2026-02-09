"use client"

import { useState } from "react"
import {
  Trophy,
  Clock,
  Zap,
  Users,
  DollarSign,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { TierBadge, type TierName } from "@/components/tier-badge"
import { cn } from "@/lib/utils"

type FilterType = "all" | "axiom" | "friends"

interface LeaderboardEntry {
  rank: number
  prevRank: number
  wallet: string
  cashback: number
  tier: TierName
  isYou?: boolean
  axiomBoost?: boolean
}

const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { rank: 1, prevRank: 1, wallet: "7xKp...mR4d", cashback: 4821.5, tier: "Master", axiomBoost: true },
  { rank: 2, prevRank: 3, wallet: "3bNf...qL7w", cashback: 3247.8, tier: "Diamond", axiomBoost: true },
  { rank: 3, prevRank: 2, wallet: "9cYt...jP2x", cashback: 2890.3, tier: "Diamond" },
  { rank: 4, prevRank: 5, wallet: "5dRm...kN8v", cashback: 2134.6, tier: "Platinum", axiomBoost: true },
  { rank: 5, prevRank: 4, wallet: "8pe9...Am2d", cashback: 1876.2, tier: "Gold", isYou: true },
  { rank: 6, prevRank: 7, wallet: "2fWs...hT3z", cashback: 1542.9, tier: "Gold" },
  { rank: 7, prevRank: 6, wallet: "6gXn...eU5c", cashback: 1201.4, tier: "Silver", axiomBoost: true },
  { rank: 8, prevRank: 9, wallet: "4hVp...fS9b", cashback: 987.6, tier: "Silver" },
  { rank: 9, prevRank: 8, wallet: "1iZq...gR6a", cashback: 756.3, tier: "Bronze" },
  { rank: 10, prevRank: 10, wallet: "0jAr...dM4e", cashback: 523.1, tier: "Bronze" },
  { rank: 11, prevRank: 12, wallet: "Kx8r...pQ3w", cashback: 412.7, tier: "Bronze" },
  { rank: 12, prevRank: 11, wallet: "Lm4n...hR9s", cashback: 387.2, tier: "Bronze" },
]

function getRankStyle(rank: number) {
  if (rank === 1) return "text-[#EAB308] bg-[#EAB308]/10 border-[#EAB308]/30"
  if (rank === 2) return "text-[#C0C0C0] bg-[#C0C0C0]/10 border-[#C0C0C0]/30"
  if (rank === 3) return "text-[#CD7F32] bg-[#CD7F32]/10 border-[#CD7F32]/30"
  return "text-muted-foreground bg-secondary border-border"
}

function RankChange({ current, previous }: { current: number; previous: number }) {
  const diff = previous - current
  if (diff === 0) return <span className="text-[10px] text-muted-foreground">--</span>
  if (diff > 0) {
    return (
      <span className="flex items-center gap-0.5 text-[10px] font-semibold text-neon-green animate-slide-up">
        <ArrowUp className="h-3 w-3" />
        {diff}
      </span>
    )
  }
  return (
    <span className="flex items-center gap-0.5 text-[10px] font-semibold text-destructive">
      <ArrowDown className="h-3 w-3" />
      {Math.abs(diff)}
    </span>
  )
}

export function LeaderboardPage() {
  const [filter, setFilter] = useState<FilterType>("all")

  const filteredData =
    filter === "axiom"
      ? LEADERBOARD_DATA.filter((e) => e.axiomBoost)
      : LEADERBOARD_DATA

  const totalPaid = LEADERBOARD_DATA.reduce((acc, e) => acc + e.cashback, 0)

  return (
    <div className="mx-auto max-w-5xl px-4 py-5 lg:px-6">
      {/* Paid banner */}
      <div className="glass relative mb-5 overflow-hidden rounded-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent dark:from-primary/10" />
        <div className="relative flex flex-col items-center gap-2 px-4 py-6 text-center sm:flex-row sm:justify-between sm:px-8 sm:text-left">
          <div>
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <Trophy className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-bold text-foreground sm:text-xl">
                Rakeback Leaderboard
              </h1>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Ranked by cashback/rakeback earned, NOT P&L. Resets every 3 days.
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-end">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              This cycle we paid
            </p>
            <p className="text-2xl font-bold text-primary font-mono text-glow-orange">
              ${totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>

      {/* Filters + meta */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {(
            [
              { id: "all" as const, label: "All Traders", icon: Users },
              { id: "axiom" as const, label: "Axiom Boost", icon: Zap },
              { id: "friends" as const, label: "Friends", icon: Users },
            ] as const
          ).map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
                filter === f.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              <f.icon className="h-3.5 w-3.5" />
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>Resets in 2d 04h</span>
          <span className="mx-1 text-border">|</span>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 animate-pulse rounded-full bg-neon-green" />
            <span className="font-medium text-neon-green">Live</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl p-4 sm:p-5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 text-left">
                <th className="pb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Rank
                </th>
                <th className="pb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Trader
                </th>
                <th className="hidden pb-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
                  Change
                </th>
                <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <span className="flex items-center justify-end gap-1">
                    <DollarSign className="h-3 w-3" />
                    Cashback
                  </span>
                </th>
                <th className="hidden pb-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
                  Tier
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, i) => (
                <tr
                  key={entry.rank}
                  className={cn(
                    "border-b border-border/20 transition-colors hover:bg-secondary/30",
                    entry.isYou && "bg-primary/5 border-primary/20 hover:bg-primary/8"
                  )}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <td className="py-3 pr-3">
                    <div
                      className={cn(
                        "flex h-7 w-7 items-center justify-center rounded-md border text-xs font-bold",
                        getRankStyle(entry.rank)
                      )}
                    >
                      {entry.rank}
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-foreground">
                        {entry.wallet}
                      </span>
                      {entry.isYou && (
                        <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold text-primary">
                          YOU
                        </span>
                      )}
                      {entry.axiomBoost && (
                        <span className="hidden items-center gap-0.5 rounded-full bg-neon-green/10 px-1.5 py-0.5 text-[10px] font-semibold text-neon-green sm:inline-flex">
                          <Zap className="h-2.5 w-2.5" />
                          Axiom
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="hidden py-3 text-center sm:table-cell">
                    <RankChange
                      current={entry.rank}
                      previous={entry.prevRank}
                    />
                  </td>
                  <td className="py-3 text-right">
                    <span className="font-mono text-sm font-semibold text-foreground">
                      $
                      {entry.cashback.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </td>
                  <td className="hidden py-3 sm:table-cell">
                    <div className="flex justify-end">
                      <TierBadge tier={entry.tier} size="sm" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
