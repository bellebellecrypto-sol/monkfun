"use client"

import { useState } from "react"
import { Coins, Search, Filter, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EarningsTabsLayout } from "@/components/earnings-tabs-layout"
import { ClaimModal } from "@/components/claim-modal"
import { cn } from "@/lib/utils"

/* ── Mock data ── */
const DELEGATED_SUMMARY = {
  claimableSOL: 0.0652,
  totalUSD: 9.73,
}

const DELEGATED_TABLE = [
  {
    source: "validator-a.sol",
    token: "MONK",
    earned: 0.025,
    currency: "SOL",
    usdValue: 3.75,
    epoch: "Epoch 584",
    status: "claimable" as const,
  },
  {
    source: "stake-pool-b.sol",
    token: null,
    earned: 0.0202,
    currency: "SOL",
    usdValue: 3.03,
    epoch: "Epoch 584",
    status: "claimable" as const,
  },
  {
    source: "validator-a.sol",
    token: "MONK",
    earned: 0.020,
    currency: "SOL",
    usdValue: 2.95,
    epoch: "Epoch 583",
    status: "claimed" as const,
  },
  {
    source: "stake-pool-c.sol",
    token: null,
    earned: 0.015,
    currency: "SOL",
    usdValue: 2.25,
    epoch: "Epoch 582",
    status: "claimed" as const,
  },
  {
    source: "validator-a.sol",
    token: "PEPE2",
    earned: 0.010,
    currency: "SOL",
    usdValue: 1.50,
    epoch: "Epoch 581",
    status: "claimed" as const,
  },
]

type FilterMode = "all" | "eligible"

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

export function EarningsDelegatedPage() {
  const [filter, setFilter] = useState<FilterMode>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [claimOpen, setClaimOpen] = useState(false)

  const filtered = DELEGATED_TABLE.filter((row) => {
    if (filter === "eligible" && row.status !== "claimable") return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return (
        row.source.toLowerCase().includes(q) ||
        (row.token && row.token.toLowerCase().includes(q))
      )
    }
    return true
  })

  return (
    <EarningsTabsLayout activeTab="earnings-delegated">
      {/* Page Title */}
      <h2 className="text-xl font-bold text-foreground mb-1">Delegated Fees</h2>
      <p className="text-sm text-muted-foreground mb-5">
        Fees earned from delegated positions
      </p>

      {/* Summary Module */}
      <div className="glass rounded-2xl p-4 sm:p-5 mb-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Claimable SOL</p>
              <p className="text-lg font-bold font-mono text-foreground">
                {DELEGATED_SUMMARY.claimableSOL.toFixed(4)}{" "}
                <span className="text-xs text-muted-foreground">SOL</span>
              </p>
            </div>
            <div className="h-8 w-px bg-border/50 hidden sm:block" />
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Total USD</p>
              <p className="text-lg font-bold font-mono text-primary">
                ${DELEGATED_SUMMARY.totalUSD.toFixed(2)}
              </p>
            </div>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 self-start"
            onClick={() => setClaimOpen(true)}
          >
            <Coins className="h-4 w-4" />
            Claim Delegated Fees
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-lg border border-border/50 bg-muted/50 p-0.5 dark:bg-secondary/30 dark:border-transparent">
            {(["all", "eligible"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
                  filter === f
                    ? "bg-card text-foreground shadow-sm dark:bg-card"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f === "all" ? "All" : "Eligible only"}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search source or token..."
            className="w-full sm:w-56 rounded-lg border border-border bg-card py-2 pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                  Source
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground hidden sm:table-cell">
                  Token
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                  Earned
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground hidden md:table-cell">
                  USD Value
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground hidden md:table-cell">
                  Epoch / Cycle
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <Users className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        No matching delegated fees found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((row, i) => (
                  <tr
                    key={`${row.source}-${row.epoch}-${i}`}
                    className="border-b border-border/30 last:border-0 transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      <span className="font-medium text-foreground font-mono text-xs">
                        {row.source}
                      </span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {row.token ? (
                        <span className="text-foreground font-semibold text-xs">
                          {row.token}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-xs">--</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-foreground text-xs">
                      {row.earned.toFixed(4)}{" "}
                      <span className="text-muted-foreground">{row.currency}</span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-muted-foreground text-xs hidden md:table-cell">
                      ${row.usdValue.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs hidden md:table-cell">
                      {row.epoch}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ClaimModal
        open={claimOpen}
        onOpenChange={setClaimOpen}
        category="Delegated Fees"
        amount={DELEGATED_SUMMARY.totalUSD.toFixed(2)}
        currency="USD"
      />
    </EarningsTabsLayout>
  )
}
