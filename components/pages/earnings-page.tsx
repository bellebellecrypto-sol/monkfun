"use client"

import { useState } from "react"
import {
  Coins,
  Paintbrush,
  Users,
  ArrowLeftRight,
  ArrowRight,
  Clock,
  Wallet,
  HelpCircle,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ClaimModal } from "@/components/claim-modal"
import { useNavigation, type PageId } from "@/components/app-shell"
import { cn } from "@/lib/utils"

/* ── Mock data ── */
const EARNINGS_DATA = {
  totalClaimableUSD: 47.23,
  creator: {
    claimableUSD: 18.50,
    claimableSOL: 0.1234,
    claimableUSDC: 12.30,
    lastClaim: "2026-02-08T14:30:00Z",
    status: "eligible" as const,
  },
  delegated: {
    claimableUSD: 9.73,
    claimableSOL: 0.0652,
    lastClaim: "2026-02-06T09:15:00Z",
    status: "eligible" as const,
  },
  trader: {
    claimableUSD: 19.00,
    claimableSOL: 0.1271,
    lastClaim: "2026-02-07T18:00:00Z",
    status: "eligible" as const,
  },
}

type EarningsStatus = "eligible" | "locked" | "requires_action"

function StatusPill({ status }: { status: EarningsStatus }) {
  const config = {
    eligible: {
      label: "Eligible",
      className: "bg-neon-green/15 text-neon-green border-neon-green/30",
    },
    locked: {
      label: "Locked",
      className: "bg-muted text-muted-foreground border-border",
    },
    requires_action: {
      label: "Requires action",
      className: "bg-gold/15 text-gold border-gold/30",
    },
  }
  const c = config[status]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold",
        c.className
      )}
    >
      {c.label}
    </span>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/* ── Earnings Category Card ── */
function EarningsCategoryCard({
  title,
  icon: Icon,
  claimableUSD,
  claimableDetail,
  lastClaim,
  status,
  onClaim,
  onViewDetails,
}: {
  title: string
  icon: typeof Coins
  claimableUSD: number
  claimableDetail: string
  lastClaim: string
  status: EarningsStatus
  onClaim: () => void
  onViewDetails: () => void
}) {
  return (
    <div className="glass rounded-2xl p-4 sm:p-5 relative overflow-hidden group">
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-4.5 w-4.5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          </div>
          <StatusPill status={status} />
        </div>

        {/* Amount */}
        <div className="mb-1">
          <p className="text-2xl font-bold font-mono text-foreground">
            ${claimableUSD.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{claimableDetail}</p>
        </div>

        {/* Last claim */}
        <div className="flex items-center gap-1.5 mb-4 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span>Last claim: {formatDate(lastClaim)}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
            onClick={onClaim}
            disabled={status === "locked" || claimableUSD === 0}
          >
            Claim
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 gap-1.5 bg-transparent text-xs"
            onClick={onViewDetails}
          >
            View details
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ── Right Rail / Sidebar Info ── */
function EarningsInfoPanel() {
  return (
    <div className="space-y-4">
      {/* Payout method */}
      <div className="glass rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <Wallet className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Payout Method</h3>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-muted/50 px-3 py-2.5 dark:bg-secondary/50 dark:border-transparent">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <Wallet className="h-3.5 w-3.5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">
              Connected Wallet
            </p>
            <p className="text-[11px] text-muted-foreground font-mono truncate">
              8pe9Am...dK3x
            </p>
          </div>
        </div>
      </div>

      {/* Network fees */}
      <div className="glass rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <Coins className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Fee Estimate</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Network fee</span>
            <span className="font-mono text-xs text-foreground">~0.00025 SOL</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Priority</span>
            <span className="font-mono text-xs text-foreground">Standard</span>
          </div>
        </div>
      </div>

      {/* Help */}
      <a
        href="#"
        className="glass rounded-2xl p-4 sm:p-5 flex items-center gap-3 transition-colors hover:border-primary/20 group/help"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted dark:bg-secondary">
          <HelpCircle className="h-4.5 w-4.5 text-muted-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">How earnings work</p>
          <p className="text-xs text-muted-foreground">
            Learn about creator fees, delegation, and rakeback
          </p>
        </div>
        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover/help:text-primary transition-colors" />
      </a>
    </div>
  )
}

/* ── Main Earnings Page ── */
export function EarningsPage() {
  const { setPage } = useNavigation()
  const [claimModal, setClaimModal] = useState<{
    open: boolean
    category: string
    amount: string
    currency: string
  }>({ open: false, category: "", amount: "", currency: "" })

  const data = EARNINGS_DATA

  const openClaim = (
    category: string,
    amount: string,
    currency: string
  ) => {
    setClaimModal({ open: true, category, amount, currency })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-5 lg:px-6">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground text-balance">
            Earnings
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Total claimable:{" "}
            <span className="font-bold text-primary font-mono">
              ${data.totalClaimableUSD.toFixed(2)}
            </span>
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 animate-pulse-glow self-start"
                onClick={() =>
                  openClaim(
                    "All Earnings",
                    data.totalClaimableUSD.toFixed(2),
                    "USD"
                  )
                }
                disabled={data.totalClaimableUSD === 0}
              >
                <Coins className="h-4 w-4" />
                Claim All
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Claim all pending earnings to your wallet</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Main Layout */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Category Cards */}
        <div className="space-y-4 lg:col-span-2">
          <EarningsCategoryCard
            title="Creator Fees"
            icon={Paintbrush}
            claimableUSD={data.creator.claimableUSD}
            claimableDetail={`${data.creator.claimableSOL.toFixed(4)} SOL + ${data.creator.claimableUSDC.toFixed(2)} USDC`}
            lastClaim={data.creator.lastClaim}
            status={data.creator.status}
            onClaim={() =>
              openClaim(
                "Creator Fees",
                data.creator.claimableUSD.toFixed(2),
                "USD"
              )
            }
            onViewDetails={() => setPage("earnings-creator")}
          />
          <EarningsCategoryCard
            title="Delegated Fees"
            icon={Users}
            claimableUSD={data.delegated.claimableUSD}
            claimableDetail={`${data.delegated.claimableSOL.toFixed(4)} SOL`}
            lastClaim={data.delegated.lastClaim}
            status={data.delegated.status}
            onClaim={() =>
              openClaim(
                "Delegated Fees",
                data.delegated.claimableUSD.toFixed(2),
                "USD"
              )
            }
            onViewDetails={() => setPage("earnings-delegated")}
          />
          <EarningsCategoryCard
            title="Trader Earnings (Rakeback)"
            icon={ArrowLeftRight}
            claimableUSD={data.trader.claimableUSD}
            claimableDetail={`${data.trader.claimableSOL.toFixed(4)} SOL`}
            lastClaim={data.trader.lastClaim}
            status={data.trader.status}
            onClaim={() =>
              openClaim(
                "Trader Earnings",
                data.trader.claimableUSD.toFixed(2),
                "USD"
              )
            }
            onViewDetails={() => setPage("earnings-trader")}
          />
        </div>

        {/* Right Rail (desktop) / Collapsible (mobile) */}
        <div className="lg:col-span-1">
          <details className="lg:hidden group/details" open>
            <summary className="mb-3 flex cursor-pointer items-center gap-2 text-sm font-medium text-muted-foreground list-none">
              <span className="group-open/details:rotate-90 transition-transform">
                <ArrowRight className="h-4 w-4" />
              </span>
              Payout Info
            </summary>
            <EarningsInfoPanel />
          </details>
          <div className="hidden lg:block">
            <EarningsInfoPanel />
          </div>
        </div>
      </div>

      {/* Claim Modal */}
      <ClaimModal
        open={claimModal.open}
        onOpenChange={(open) =>
          setClaimModal((prev) => ({ ...prev, open }))
        }
        category={claimModal.category}
        amount={claimModal.amount}
        currency={claimModal.currency}
      />
    </div>
  )
}
