"use client"

import { useState } from "react"
import {
  Coins,
  ArrowRight,
  Clock,
  Search,
  ExternalLink,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ClaimModal } from "@/components/claim-modal"
import { cn } from "@/lib/utils"

type Segment = "post" | "pre"

interface CreatorFeeRow {
  token: string
  ticker: string
  feesEarned: number
  currency: string
  timeRange: string
  status: "claimable" | "claimed" | "pending"
}

const POST_MIGRATION_DATA: CreatorFeeRow[] = [
  { token: "MONKDOG", ticker: "$MDOG", feesEarned: 0.8234, currency: "SOL", timeRange: "Feb 1 - Feb 9", status: "claimable" },
  { token: "ShibMonk", ticker: "$SHBM", feesEarned: 0.2411, currency: "SOL", timeRange: "Feb 1 - Feb 9", status: "claimable" },
  { token: "MonkCat", ticker: "$MCAT", feesEarned: 0.14, currency: "SOL", timeRange: "Jan 28 - Feb 1", status: "claimed" },
  { token: "MONKDOG", ticker: "$MDOG", feesEarned: 0.612, currency: "SOL", timeRange: "Jan 28 - Feb 1", status: "claimed" },
  { token: "ApeMonk", ticker: "$APEM", feesEarned: 0.034, currency: "SOL", timeRange: "Jan 25 - Jan 28", status: "claimed" },
]

const PRE_MIGRATION_DATA: CreatorFeeRow[] = [
  { token: "MONKDOG (v1)", ticker: "$MDOG", feesEarned: 2.341, currency: "SOL", timeRange: "Dec 2025", status: "claimed" },
  { token: "OldMonk", ticker: "$OLD", feesEarned: 0.12, currency: "SOL", timeRange: "Nov 2025", status: "claimed" },
]

function StatusBadge({ status }: { status: CreatorFeeRow["status"] }) {
  const styles = {
    claimable: "bg-neon-green/10 text-neon-green border-neon-green/30",
    claimed: "bg-muted text-muted-foreground border-border",
    pending: "bg-primary/10 text-primary border-primary/30",
  }
  return (
    <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-semibold", styles[status])}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="ml-auto h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export function EarningsCreatorContent() {
  const [segment, setSegment] = useState<Segment>("post")
  const [search, setSearch] = useState("")
  const [claimModal, setClaimModal] = useState(false)
  const [loading] = useState(false)

  const data = segment === "post" ? POST_MIGRATION_DATA : PRE_MIGRATION_DATA
  const filtered = data.filter(
    (r) =>
      r.token.toLowerCase().includes(search.toLowerCase()) ||
      r.ticker.toLowerCase().includes(search.toLowerCase())
  )

  const claimableTotal = data
    .filter((r) => r.status === "claimable")
    .reduce((s, r) => s + r.feesEarned, 0)

  return (
    <div className="space-y-5">
      {/* Summary card */}
      <div className="glass rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAB308]/10">
              <Coins className="h-5 w-5 text-[#EAB308]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Creator Fees
              </h3>
              <p className="text-xs text-muted-foreground">
                Fees from tokens you created
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Claimable</p>
              <p className="text-lg font-bold font-mono text-[#EAB308]">
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

      {/* Segment toggle + search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center rounded-lg border border-border p-0.5">
          {(
            [
              { id: "post", label: "Post-migration (CPMM)" },
              { id: "pre", label: "Pre-migration" },
            ] as const
          ).map((seg) => (
            <button
              key={seg.id}
              type="button"
              onClick={() => setSegment(seg.id)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                segment === seg.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {seg.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tokens..."
              className="h-8 w-48 rounded-lg border border-border bg-card pl-8 pr-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="glass overflow-hidden rounded-2xl">
        {loading ? (
          <div className="p-5">
            <TableSkeleton />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-12 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
              <Coins className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">
              No creator fees found
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {search
                ? "Try a different search term."
                : "Create a token to start earning fees."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Token
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Fees Earned
                  </th>
                  <th className="hidden px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
                    Period
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr
                    key={`${row.token}-${row.timeRange}-${i}`}
                    className="border-b border-border/30 last:border-0 transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                          {row.ticker.replace("$", "").slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {row.token}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {row.ticker}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-mono text-sm font-medium text-foreground">
                        {row.feesEarned.toFixed(4)}
                      </span>
                      <span className="ml-1 text-[10px] text-muted-foreground">
                        {row.currency}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-right sm:table-cell">
                      <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {row.timeRange}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <StatusBadge status={row.status} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`View ${row.token}`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
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
        title="Claim Creator Fees"
        amount={claimableTotal.toFixed(4)}
        currency="SOL"
      />
    </div>
  )
}
