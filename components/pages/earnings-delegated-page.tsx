"use client"

import { useState } from "react"
import {
  Users,
  ArrowRight,
  Clock,
  Search,
  Filter,
  CalendarDays,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ClaimModal } from "@/components/claim-modal"
import { cn } from "@/lib/utils"

interface DelegatedRow {
  source: string
  sourceWallet: string
  token: string
  earned: number
  currency: string
  cycle: string
  status: "eligible" | "claimed" | "pending"
}

const DELEGATED_DATA: DelegatedRow[] = [
  { source: "CryptoWhale", sourceWallet: "3bNf...qL7w", token: "MONKDOG", earned: 0.0, currency: "SOL", cycle: "Cycle 47", status: "pending" },
]

function StatusBadge({ status }: { status: DelegatedRow["status"] }) {
  const styles = {
    eligible: "bg-neon-green/10 text-neon-green border-neon-green/30",
    claimed: "bg-muted text-muted-foreground border-border",
    pending: "bg-primary/10 text-primary border-primary/30",
  }
  return (
    <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-semibold", styles[status])}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export function EarningsDelegatedContent() {
  const [search, setSearch] = useState("")
  const [filterEligible, setFilterEligible] = useState(false)
  const [claimModal, setClaimModal] = useState(false)
  const [loading] = useState(false)

  const filtered = DELEGATED_DATA.filter((r) => {
    if (filterEligible && r.status !== "eligible") return false
    if (search) {
      const q = search.toLowerCase()
      return (
        r.source.toLowerCase().includes(q) ||
        r.token.toLowerCase().includes(q) ||
        r.sourceWallet.toLowerCase().includes(q)
      )
    }
    return true
  })

  const claimableTotal = DELEGATED_DATA.filter(
    (r) => r.status === "eligible"
  ).reduce((s, r) => s + r.earned, 0)

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="glass rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A0AEC0]/10">
              <Users className="h-5 w-5 text-[#A0AEC0]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Delegated Fees
              </h3>
              <p className="text-xs text-muted-foreground">
                Fees delegated to you from other creators
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Claimable</p>
              <p className="text-lg font-bold font-mono text-foreground">
                {claimableTotal.toFixed(4)} SOL
              </p>
            </div>
            <Button
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              onClick={() => setClaimModal(true)}
              disabled={claimableTotal === 0}
            >
              Claim
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterEligible(!filterEligible)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
              filterEligible
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            <Filter className="h-3 w-3" />
            Eligible only
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <CalendarDays className="h-3 w-3" />
            Date range
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search source or token..."
            className="h-8 w-56 rounded-lg border border-border bg-card pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
        </div>
      </div>

      {/* Table */}
      <div className="glass overflow-hidden rounded-2xl">
        {loading ? (
          <div className="space-y-3 p-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="ml-auto h-4 w-16" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">
              No delegated fees
            </p>
            <p className="mt-1 max-w-xs text-xs text-muted-foreground">
              {filterEligible
                ? "No eligible delegated fees right now. Try removing filters."
                : "No one has delegated creator fees to your wallet yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Source
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Token
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Earned
                  </th>
                  <th className="hidden px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
                    Cycle
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr
                    key={`${row.source}-${i}`}
                    className="border-b border-border/30 last:border-0 transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-foreground">
                        {row.source}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground">
                        {row.sourceWallet}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {row.token}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-mono text-sm font-medium text-foreground">
                        {row.earned.toFixed(4)}
                      </span>
                      <span className="ml-1 text-[10px] text-muted-foreground">
                        {row.currency}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-right text-xs text-muted-foreground sm:table-cell">
                      {row.cycle}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <StatusBadge status={row.status} />
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
        title="Claim Delegated Fees"
        amount={claimableTotal.toFixed(4)}
        currency="SOL"
      />
    </div>
  )
}
