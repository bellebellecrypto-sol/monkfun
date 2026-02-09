"use client"

import { useState } from "react"
import {
  DollarSign,
  Coins,
  Users,
  TrendingUp,
  ArrowRight,
  Clock,
  ExternalLink,
  Wallet,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ClaimModal } from "@/components/claim-modal"
import { cn } from "@/lib/utils"

/* ── Sub-page type for internal tabs ── */
export type EarningsTab = "overview" | "creator" | "delegated" | "trader"

/* ── Shared mock data ── */
const CREATOR_CLAIMABLE = { sol: 1.2045, usd1: 312.8, lastClaim: "2d ago" }
const DELEGATED_CLAIMABLE = { sol: 0.0, usd1: 0.0, lastClaim: "Never" }
const TRADER_CLAIMABLE = { sol: 0.4521, usd1: 128.35, lastClaim: "12h ago" }

function totalUSD() {
  const solPrice = 150
  return (
    (CREATOR_CLAIMABLE.sol + DELEGATED_CLAIMABLE.sol + TRADER_CLAIMABLE.sol) *
      solPrice +
    CREATOR_CLAIMABLE.usd1 +
    DELEGATED_CLAIMABLE.usd1 +
    TRADER_CLAIMABLE.usd1
  )
}

/* ── Status pill ── */
function StatusPill({
  status,
}: {
  status: "eligible" | "locked" | "action"
}) {
  const styles = {
    eligible:
      "bg-neon-green/10 text-neon-green border-neon-green/30",
    locked:
      "bg-muted text-muted-foreground border-border",
    action:
      "bg-primary/10 text-primary border-primary/30",
  }
  const labels = {
    eligible: "Eligible",
    locked: "Locked",
    action: "Requires action",
  }
  return (
    <span
      className={cn(
        "rounded-full border px-2 py-0.5 text-[10px] font-semibold",
        styles[status]
      )}
    >
      {labels[status]}
    </span>
  )
}

/* ── Earnings Overview ── */
export function EarningsOverviewContent({
  onNavigate,
}: {
  onNavigate: (tab: EarningsTab) => void
}) {
  const [claimModal, setClaimModal] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const total = totalUSD()

  const cards = [
    {
      id: "creator" as EarningsTab,
      title: "Creator Fees",
      description: "Fees earned from tokens created in your honor",
      icon: Coins,
      solAmount: CREATOR_CLAIMABLE.sol,
      usd1Amount: CREATOR_CLAIMABLE.usd1,
      lastClaim: CREATOR_CLAIMABLE.lastClaim,
      status: "eligible" as const,
      color: "#EAB308",
    },
    {
      id: "delegated" as EarningsTab,
      title: "Delegated Fees",
      description: "Fees delegated to you from other creators",
      icon: Users,
      solAmount: DELEGATED_CLAIMABLE.sol,
      usd1Amount: DELEGATED_CLAIMABLE.usd1,
      lastClaim: DELEGATED_CLAIMABLE.lastClaim,
      status: "locked" as const,
      color: "#A0AEC0",
    },
    {
      id: "trader" as EarningsTab,
      title: "Trader Rakeback",
      description: "Cashback earned from your trading volume",
      icon: TrendingUp,
      solAmount: TRADER_CLAIMABLE.sol,
      usd1Amount: TRADER_CLAIMABLE.usd1,
      lastClaim: TRADER_CLAIMABLE.lastClaim,
      status: "eligible" as const,
      color: "#F97316",
    },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-5 lg:px-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Earnings</h1>
          <p className="text-sm text-muted-foreground">
            Manage and claim all your MONKfun earnings in one place.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total claimable</p>
            <p className="text-xl font-bold text-foreground font-mono">
              ${total.toFixed(2)}
            </p>
          </div>
          <Button
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            onClick={() => setClaimModal(true)}
            disabled={total === 0}
          >
            Claim All
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Left: 3 earning cards (2 cols) */}
        <div className="space-y-4 lg:col-span-2">
          {cards.map((card) => {
            const Icon = card.icon
            const cardTotal = card.solAmount * 150 + card.usd1Amount
            return (
              <div
                key={card.id}
                className="glass rounded-2xl p-4 sm:p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${card.color}15` }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: card.color }}
                      />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="text-sm font-bold text-foreground">
                          {card.title}
                        </h3>
                        <StatusPill status={card.status} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {card.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:gap-1">
                    <p
                      className="text-lg font-bold font-mono"
                      style={{ color: card.color }}
                    >
                      ${cardTotal.toFixed(2)}
                    </p>
                    <p className="text-[10px] text-muted-foreground sm:text-right">
                      {card.solAmount.toFixed(4)} SOL + {card.usd1Amount.toFixed(2)}{" "}
                      USD1
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Last claim: {card.lastClaim}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1 text-xs bg-transparent"
                      onClick={() => onNavigate(card.id)}
                    >
                      View details
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      className="h-8 gap-1 bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                      disabled={cardTotal === 0}
                      onClick={() => setClaimModal(true)}
                    >
                      Claim
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right rail */}
        <div className="space-y-4">
          {/* Payout method */}
          <div className="glass rounded-2xl p-4">
            <div className="mb-3 flex items-center gap-2">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <h4 className="text-xs font-semibold text-foreground">
                Payout Method
              </h4>
            </div>
            <div className="rounded-xl border border-border bg-muted/50 px-3 py-2.5 dark:bg-secondary/50">
              <p className="text-xs text-muted-foreground">Connected wallet</p>
              <p className="font-mono text-sm font-medium text-foreground">
                8pe9Am...2d
              </p>
            </div>
          </div>

          {/* Network fee estimate */}
          <div className="glass rounded-2xl p-4">
            <div className="mb-3 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <h4 className="text-xs font-semibold text-foreground">
                Fee Estimate
              </h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Network fee</span>
                <span className="font-mono text-foreground">~0.00005 SOL</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Priority fee</span>
                <span className="font-mono text-foreground">~0.0001 SOL</span>
              </div>
            </div>
          </div>

          {/* Help */}
          <button
            type="button"
            onClick={() => setInfoOpen(!infoOpen)}
            className="glass w-full rounded-2xl p-4 text-left transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary" />
                <h4 className="text-xs font-semibold text-foreground">
                  How earnings work
                </h4>
              </div>
              {infoOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            {infoOpen && (
              <div className="mt-3 space-y-2 border-t border-border/50 pt-3 text-xs text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Creator Fees</strong>{" "}
                  -- Earned when someone trades a token created in your name.
                </p>
                <p>
                  <strong className="text-foreground">Delegated Fees</strong>{" "}
                  -- Shared fees from creators who delegate part of their
                  earnings to you.
                </p>
                <p>
                  <strong className="text-foreground">Trader Rakeback</strong>{" "}
                  -- Cashback based on your trading volume and tier (0.02-0.07%).
                </p>
              </div>
            )}
          </button>
        </div>
      </div>

      <ClaimModal
        open={claimModal}
        onClose={() => setClaimModal(false)}
        title="Claim All Earnings"
        amount={total.toFixed(2)}
        currency="USD"
      />
    </div>
  )
}
