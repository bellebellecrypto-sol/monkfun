"use client"

import { TierBadge, type TierName } from "@/components/tier-badge"
import { cn } from "@/lib/utils"
import { Zap } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  wallet: string
  cashback: number
  tier: TierName
  isYou?: boolean
  axiomBoost?: boolean
}

const LEADERBOARD_DATA: LeaderboardEntry[] = [
  { rank: 1, wallet: "7xKp...mR4d", cashback: 4821.5, tier: "Master", axiomBoost: true },
  { rank: 2, wallet: "3bNf...qL7w", cashback: 3247.8, tier: "Diamond", axiomBoost: true },
  { rank: 3, wallet: "9cYt...jP2x", cashback: 2890.3, tier: "Diamond" },
  { rank: 4, wallet: "5dRm...kN8v", cashback: 2134.6, tier: "Platinum", axiomBoost: true },
  { rank: 5, wallet: "8pe9...Am2d", cashback: 1876.2, tier: "Gold", isYou: true },
  { rank: 6, wallet: "2fWs...hT3z", cashback: 1542.9, tier: "Gold" },
  { rank: 7, wallet: "6gXn...eU5c", cashback: 1201.4, tier: "Silver", axiomBoost: true },
  { rank: 8, wallet: "4hVp...fS9b", cashback: 987.6, tier: "Silver" },
  { rank: 9, wallet: "1iZq...gR6a", cashback: 756.3, tier: "Bronze" },
  { rank: 10, wallet: "0jAr...dM4e", cashback: 523.1, tier: "Bronze" },
]

function getRankStyle(rank: number) {
  if (rank === 1)
    return "text-[#EAB308] bg-[#EAB308]/10 border-[#EAB308]/30"
  if (rank === 2) return "text-[#C0C0C0] bg-[#C0C0C0]/10 border-[#C0C0C0]/30"
  if (rank === 3) return "text-[#CD7F32] bg-[#CD7F32]/10 border-[#CD7F32]/30"
  return "text-muted-foreground bg-secondary border-border"
}

export function RakebackLeaderboard({ className }: { className?: string }) {
  return (
    <div className={cn("glass rounded-2xl p-4 sm:p-6", className)}>
      <div className="mb-4 flex flex-col gap-2 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-foreground sm:text-xl">
            Rakeback Leaderboard
          </h2>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Cashback earned, not P&L &middot; Post-migration only
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg bg-secondary/60 px-3 py-1.5">
            <div className="h-2 w-2 animate-pulse rounded-full bg-neon-green" />
            <span className="text-xs font-medium text-neon-green">Live</span>
          </div>
        </div>
      </div>

      {/* Table */}
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
              <th className="pb-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Cashback
              </th>
              <th className="hidden pb-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
                Tier
              </th>
            </tr>
          </thead>
          <tbody>
            {LEADERBOARD_DATA.map((entry, i) => (
              <tr
                key={entry.rank}
                className={cn(
                  "border-b border-border/20 transition-colors hover:bg-secondary/30",
                  entry.isYou &&
                    "bg-primary/5 border-primary/20 hover:bg-primary/8"
                )}
                style={{ animationDelay: `${i * 60}ms` }}
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
                <td className="py-3 text-right">
                  <span className="font-mono text-sm font-semibold text-foreground">
                    ${entry.cashback.toLocaleString(undefined, { minimumFractionDigits: 2 })}
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
  )
}
