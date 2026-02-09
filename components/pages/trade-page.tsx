"use client"

import { useState } from "react"
import {
  ArrowLeftRight,
  Flame,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { TierBadge, getTierByName, type TierName } from "@/components/tier-badge"
import { useNavigation } from "@/components/app-shell"
import { cn } from "@/lib/utils"

const USER_TIER: TierName = "Gold"

const HOT_PAIRS = [
  { name: "DARKHORSE/SOL", price: "$0.0026", change: 142, volume: "$1.2M" },
  { name: "QX/SOL", price: "$0.0089", change: 67, volume: "$820K" },
  { name: "DONT/SOL", price: "$0.0011", change: 34, volume: "$440K" },
  { name: "LIBERTAS/SOL", price: "$0.00043", change: 89, volume: "$260K" },
  { name: "AURUM/SOL", price: "$0.00012", change: 23, volume: "$150K" },
]

const RECENT_TRADES = [
  { pair: "DARKHORSE/SOL", type: "buy" as const, amount: "$420", time: "2m ago", wallet: "7xKp...mR4d" },
  { pair: "QX/SOL", type: "sell" as const, amount: "$280", time: "4m ago", wallet: "3bNf...qL7w" },
  { pair: "DONT/SOL", type: "buy" as const, amount: "$150", time: "7m ago", wallet: "9cYt...jP2x" },
  { pair: "DARKHORSE/SOL", type: "buy" as const, amount: "$89", time: "9m ago", wallet: "5dRm...kN8v" },
  { pair: "LIBERTAS/SOL", type: "sell" as const, amount: "$55", time: "12m ago", wallet: "2fWs...hT3z" },
  { pair: "AURUM/SOL", type: "buy" as const, amount: "$210", time: "15m ago", wallet: "6gXn...eU5c" },
]

function SwapModule() {
  const [fromAmount, setFromAmount] = useState("1")
  const [toToken, setToToken] = useState("DARKHORSE")
  const tierConfig = getTierByName(USER_TIER)
  const numAmount = Number.parseFloat(fromAmount) || 0
  const rakebackEstimate = (numAmount * 150 * (tierConfig.percent / 100)).toFixed(2)

  return (
    <div className="glass rounded-2xl p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <ArrowLeftRight className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-bold text-foreground">Quick Swap</h3>
      </div>

      {/* From */}
      <div className="mb-2">
        <label className="mb-1.5 block text-xs text-muted-foreground">
          You pay
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            className="flex-1 bg-transparent font-mono text-lg font-bold text-foreground outline-none"
          />
          <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary">
            SOL
          </span>
        </div>
      </div>

      {/* Swap icon */}
      <div className="flex justify-center py-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card">
          <ArrowLeftRight className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>

      {/* To */}
      <div className="mb-4">
        <label className="mb-1.5 block text-xs text-muted-foreground">
          You receive
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3">
          <span className="flex-1 font-mono text-lg font-bold text-foreground">
            {(numAmount * 384615).toLocaleString()}
          </span>
          <select
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
            className="rounded-md border border-border bg-muted px-2 py-1 text-xs font-bold text-foreground dark:bg-secondary"
          >
            {HOT_PAIRS.map((p) => (
              <option key={p.name} value={p.name.split("/")[0]}>
                {p.name.split("/")[0]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Rakeback estimate */}
      <div className="mb-4 flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <TierBadge tier={USER_TIER} size="sm" />
          <span className="text-xs text-muted-foreground">Rakeback</span>
        </div>
        <span className="font-mono text-sm font-bold text-primary">
          ~${rakebackEstimate}
        </span>
      </div>

      <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
        <Zap className="h-4 w-4" />
        Swap
      </Button>
    </div>
  )
}

export function TradePage() {
  const { setPage, setSelectedToken } = useNavigation()

  return (
    <div className="mx-auto max-w-6xl px-4 py-5 lg:px-6">
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Swap module */}
        <div className="lg:order-2">
          <div className="sticky top-[105px]">
            <SwapModule />
          </div>
        </div>

        {/* Left: Pairs + Recent */}
        <div className="lg:col-span-2 lg:order-1 flex flex-col gap-5">
          {/* Hot Pairs */}
          <div className="glass rounded-2xl p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-2">
              <Flame className="h-4 w-4 text-primary" />
              <h2 className="text-base font-bold text-foreground">
                Hot Pairs
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50 text-left">
                    <th className="pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Pair
                    </th>
                    <th className="pb-2 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Price
                    </th>
                    <th className="pb-2 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      24h
                    </th>
                    <th className="hidden pb-2 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground sm:table-cell">
                      Volume
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {HOT_PAIRS.map((pair) => (
                    <tr
                      key={pair.name}
                      className="border-b border-border/20 transition-colors hover:bg-secondary/30 cursor-pointer"
                      onClick={() => {
                        setSelectedToken(pair.name.split("/")[0])
                        setPage("token")
                      }}
                    >
                      <td className="py-3">
                        <span className="text-sm font-semibold text-foreground">
                          {pair.name}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <span className="font-mono text-sm text-foreground">
                          {pair.price}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={cn(
                            "font-mono text-xs font-semibold",
                            pair.change >= 0
                              ? "text-neon-green"
                              : "text-destructive"
                          )}
                        >
                          {pair.change >= 0 ? "+" : ""}
                          {pair.change}%
                        </span>
                      </td>
                      <td className="hidden py-3 text-right sm:table-cell">
                        <span className="text-xs text-muted-foreground font-mono">
                          {pair.volume}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Trades */}
          <div className="glass rounded-2xl p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-foreground">
                Recent Trades
              </h2>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 animate-pulse rounded-full bg-neon-green" />
                <span className="text-[10px] font-semibold text-neon-green">
                  Live
                </span>
              </div>
            </div>
            <div className="divide-y divide-border/30">
              {RECENT_TRADES.map((trade, i) => (
                <div
                  key={`${trade.wallet}-${i}`}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "rounded-md px-2 py-0.5 text-[10px] font-bold uppercase",
                        trade.type === "buy"
                          ? "bg-neon-green/10 text-neon-green"
                          : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {trade.type}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {trade.pair}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {trade.wallet}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold font-mono text-foreground">
                      {trade.amount}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {trade.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
