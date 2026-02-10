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
