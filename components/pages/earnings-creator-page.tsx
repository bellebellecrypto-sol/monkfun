"use client"

import { useState } from "react"
import { Coins, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { EarningsTabsLayout } from "@/components/earnings-tabs-layout"
import { ClaimModal } from "@/components/claim-modal"
import { cn } from "@/lib/utils"

/* ── Mock data ── */
const CREATOR_SUMMARY = {
  claimableSOL: 0.1234,
  claimableUSDC: 12.30,
  totalUSD: 18.50,
}

const CREATOR_FEES_TABLE = [
  {
    token: "MONK",
    feesEarned: 0.045,
    currency: "SOL",
    usdValue: 6.75,
    timeRange: "Feb 1 - Feb 10",
    status: "claimable" as const,
  },
  {
    token: "PEPE2",
    feesEarned: 8.20,
    currency: "USDC",
    usdValue: 8.20,
    timeRange: "Feb 3 - Feb 10",
    status: "claimable" as const,
  },
  {
    token: "DOGE3",
    feesEarned: 0.023,
    currency: "SOL",
    usdValue: 3.45,
    timeRange: "Jan 28 - Feb 5",
    status: "claimed" as const,
  },
  {
    token: "SHIBA4",
    feesEarned: 4.10,
    currency: "USDC",
    usdValue: 4.10,
    timeRange: "Jan 25 - Feb 2",
    status: "claimed" as const,
  },
  {
    token: "BONK2",
    feesEarned: 0.008,
    currency: "SOL",
    usdValue: 1.20,
    timeRange: "Jan 20 - Jan 28",
    status: "claimed" as const,
  },
]

type Segment = "post-migration" | "pre-migration"

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

export function EarningsCreatorPage() {
  const [segment, setSegment] = useState<Segment>("post-migration")
  const [claimOpen, setClaimOpen] = useState(false)

  return (
    <EarningsTabsLayout activeTab="earnings-creator">
      {/* Page Title */}
      <h2 className="text-xl font-bold text-foreground mb-1">Creator Fees</h2>
      <p className="text-sm text-muted-foreground mb-5">
        Fees earned from tokens you created
      </p>

      {/* Segment Toggle */}
      <div className="mb-5 flex items-center gap-1 rounded-lg border border-border/50 bg-muted/50 p-0.5 w-fit dark:bg-secondary/30 dark:border-transparent">
        {(["post-migration", "pre-migration"] as const).map((seg) => (
          <button
            key={seg}
            type="button"
            onClick={() => setSegment(seg)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              segment === seg
                ? "bg-card text-foreground shadow-sm dark:bg-card"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {seg === "post-migration" ? "Post-Migration (CPMM)" : "Pre-Migration"}
          </button>
        ))}
      </div>

      {/* Summary Module */}
      <div className="glass rounded-2xl p-4 sm:p-5 mb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Claimable SOL</p>
              <p className="text-lg font-bold font-mono text-foreground">
                {CREATOR_SUMMARY.claimableSOL.toFixed(4)}{" "}
                <span className="text-xs text-muted-foreground">SOL</span>
              </p>
            </div>
            <div className="h-8 w-px bg-border/50 hidden sm:block" />
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Claimable USDC</p>
              <p className="text-lg font-bold font-mono text-foreground">
                {CREATOR_SUMMARY.claimableUSDC.toFixed(2)}{" "}
                <span className="text-xs text-muted-foreground">USDC</span>
              </p>
            </div>
            <div className="h-8 w-px bg-border/50 hidden sm:block" />
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Total USD</p>
              <p className="text-lg font-bold font-mono text-primary">
                ${CREATOR_SUMMARY.totalUSD.toFixed(2)}
              </p>
            </div>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 self-start"
            onClick={() => setClaimOpen(true)}
          >
            <Coins className="h-4 w-4" />
            Claim Creator Fees
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                  Token
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                  Fees Earned
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground hidden sm:table-cell">
                  USD Value
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground hidden md:table-cell">
                  Time Range
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                  <span className="sr-only">Action</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {CREATOR_FEES_TABLE.map((row, i) => (
                <tr
                  key={`${row.token}-${i}`}
                  className="border-b border-border/30 last:border-0 transition-colors hover:bg-muted/30"
                >
                  <td className="px-4 py-3">
                    <span className="font-semibold text-foreground">
                      {row.token}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-foreground">
                    {row.feesEarned}{" "}
                    <span className="text-xs text-muted-foreground">
                      {row.currency}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-muted-foreground hidden sm:table-cell">
                    ${row.usdValue.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs hidden md:table-cell">
                    {row.timeRange}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0 text-muted-foreground hover:text-primary"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span className="sr-only">View token</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State Placeholder (shown when no data for pre-migration) */}
      {segment === "pre-migration" && (
        <div className="glass rounded-2xl p-8 mt-5 flex flex-col items-center justify-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
            <Coins className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-1">
            No pre-migration fees
          </h3>
          <p className="text-xs text-muted-foreground max-w-xs">
            Pre-migration creator fees are no longer accruing. Any existing balances have been migrated to post-migration.
          </p>
        </div>
      )}

      <ClaimModal
        open={claimOpen}
        onOpenChange={setClaimOpen}
        category="Creator Fees"
        amount={CREATOR_SUMMARY.totalUSD.toFixed(2)}
        currency="USD"
      />
    </EarningsTabsLayout>
  )
}
