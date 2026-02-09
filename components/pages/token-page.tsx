"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Copy,
  Check,
  ExternalLink,
  Users,
  Activity,
  Info,
  ArrowLeftRight,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { TierBadge, getTierByName, type TierName } from "@/components/tier-badge"
import { useNavigation } from "@/components/app-shell"
import { cn } from "@/lib/utils"

const USER_TIER: TierName = "Gold"

const TOKEN_INFO = {
  name: "Dark Horse",
  symbol: "DARKHORSE",
  contract: "7xKp...mR4dAbCdEfGhIjKlMnOpQrSt",
  contractShort: "7xKp...QrSt",
  marketCap: "$2.6M",
  price: "$0.0026",
  change24h: 142,
  volume24h: "$1.2M",
  holders: 4821,
  liquidity: "$340K",
  creator: "3bNf...qL7w",
  createdAt: "2d ago",
}

const HOLDER_DATA = [
  { wallet: "7xKp...mR4d", pct: 8.2, label: "Creator" },
  { wallet: "3bNf...qL7w", pct: 5.1 },
  { wallet: "9cYt...jP2x", pct: 3.8 },
  { wallet: "5dRm...kN8v", pct: 2.4 },
  { wallet: "8pe9...Am2d", pct: 1.9, label: "You" },
]

const RECENT_TRADES = [
  { wallet: "7xKp...mR4d", type: "buy" as const, amount: "$420", time: "2m ago", tokens: "161K" },
  { wallet: "3bNf...qL7w", type: "sell" as const, amount: "$280", time: "5m ago", tokens: "107K" },
  { wallet: "9cYt...jP2x", type: "buy" as const, amount: "$150", time: "8m ago", tokens: "57K" },
  { wallet: "5dRm...kN8v", type: "buy" as const, amount: "$89", time: "12m ago", tokens: "34K" },
  { wallet: "2fWs...hT3z", type: "sell" as const, amount: "$55", time: "15m ago", tokens: "21K" },
]

function TradePanel() {
  const [side, setSide] = useState<"buy" | "sell">("buy")
  const [amount, setAmount] = useState("0.1")
  const tierConfig = getTierByName(USER_TIER)
  const numAmount = Number.parseFloat(amount) || 0
  const rakebackEstimate = (numAmount * 87.97 * (tierConfig.percent / 100)).toFixed(4)

  return (
    <div className="glass rounded-2xl p-4 sm:p-5">
      <div className="mb-4 flex items-center gap-2">
        <ArrowLeftRight className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold text-foreground">Trade</h3>
      </div>

      {/* Buy/Sell tabs */}
      <div className="mb-4 flex rounded-lg border border-border p-0.5">
        <button
          type="button"
          onClick={() => setSide("buy")}
          className={cn(
            "flex-1 rounded-md py-2 text-sm font-semibold transition-colors",
            side === "buy"
              ? "bg-neon-green/15 text-neon-green"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Buy
        </button>
        <button
          type="button"
          onClick={() => setSide("sell")}
          className={cn(
            "flex-1 rounded-md py-2 text-sm font-semibold transition-colors",
            side === "sell"
              ? "bg-destructive/15 text-destructive"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          Sell
        </button>
      </div>

      {/* Amount */}
      <div className="mb-3">
        <label className="mb-1.5 block text-xs text-muted-foreground">
          Amount (SOL)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-lg border border-border bg-card px-3 py-2.5 font-mono text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
        />
        <div className="mt-2 flex gap-1.5">
          {["0.01", "0.1", "0.5", "1", "5"].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setAmount(v)}
              className={cn(
                "flex-1 rounded-md border py-1.5 text-xs font-medium transition-colors",
                amount === v
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Rakeback preview */}
      <div className="mb-4 flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <TierBadge tier={USER_TIER} size="sm" />
          <span className="text-xs text-muted-foreground">
            {"You'll earn ~"}
          </span>
        </div>
        <span className="font-mono text-sm font-bold text-primary">
          ${rakebackEstimate} rakeback
        </span>
      </div>

      <Button
        className={cn(
          "w-full gap-2 font-semibold",
          side === "buy"
            ? "bg-neon-green/90 text-white hover:bg-neon-green dark:bg-neon-green dark:hover:bg-neon-green/90"
            : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
        )}
      >
        {side === "buy" ? "Buy" : "Sell"} {TOKEN_INFO.symbol}
      </Button>
    </div>
  )
}

export function TokenPage() {
  const { setPage } = useNavigation()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-5 lg:px-6">
      {/* Back button */}
      <button
        type="button"
        onClick={() => setPage("home")}
        className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Left: Token info + tabs */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Hero stats */}
          <div className="glass rounded-2xl p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
                  {TOKEN_INFO.symbol.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-foreground">
                      {TOKEN_INFO.name}
                    </h1>
                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      ${TOKEN_INFO.symbol}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="flex items-center gap-1 rounded-md border border-border bg-card px-2 py-0.5 text-xs font-mono text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {TOKEN_INFO.contractShort}
                      {copied ? (
                        <Check className="h-3 w-3 text-neon-green" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                    <span className="flex items-center gap-1 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                      <Zap className="h-2.5 w-2.5" />
                      Creator: {TOKEN_INFO.creator}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div>
                  <p className="text-2xl font-bold text-foreground font-mono">
                    {TOKEN_INFO.price}
                  </p>
                  <p className={cn(
                    "text-sm font-semibold font-mono",
                    TOKEN_INFO.change24h >= 0 ? "text-neon-green" : "text-destructive"
                  )}>
                    {TOKEN_INFO.change24h >= 0 ? "+" : ""}{TOKEN_INFO.change24h}% (24h)
                  </p>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: "Market Cap", value: TOKEN_INFO.marketCap },
                { label: "24h Volume", value: TOKEN_INFO.volume24h },
                { label: "Holders", value: TOKEN_INFO.holders.toLocaleString() },
                { label: "Liquidity", value: TOKEN_INFO.liquidity },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5 dark:bg-secondary/30"
                >
                  <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                  <p className="text-sm font-bold font-mono text-foreground">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="activity" className="glass rounded-2xl p-4 sm:p-5">
            <TabsList className="w-full justify-start bg-transparent gap-1 p-0 h-auto">
              {[
                { value: "activity", label: "Activity", icon: Activity },
                { value: "holders", label: "Holders", icon: Users },
                { value: "about", label: "About", icon: Info },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="gap-1.5 rounded-lg data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none px-3 py-2"
                >
                  <tab.icon className="h-3.5 w-3.5" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="activity" className="mt-4">
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
                      <span className="text-sm font-mono text-foreground">
                        {trade.wallet}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold font-mono text-foreground">
                        {trade.amount}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {trade.tokens} tokens &middot; {trade.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="holders" className="mt-4">
              <div className="divide-y divide-border/30">
                {HOLDER_DATA.map((holder, i) => (
                  <div
                    key={holder.wallet}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-muted-foreground w-5">
                        {i + 1}
                      </span>
                      <span className="text-sm font-mono text-foreground">
                        {holder.wallet}
                      </span>
                      {holder.label && (
                        <span className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          holder.label === "You"
                            ? "bg-primary/15 text-primary"
                            : "bg-neon-green/10 text-neon-green"
                        )}>
                          {holder.label}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-semibold font-mono text-foreground">
                      {holder.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-4">
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  {TOKEN_INFO.name} (${TOKEN_INFO.symbol}) was created {TOKEN_INFO.createdAt} using
                  MONKfun Classic launch mode with zero creator fees.
                </p>
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 bg-transparent"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View on Explorer
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right: Trade panel */}
        <div className="lg:order-2">
          <div className="sticky top-[105px]">
            <TradePanel />
          </div>
        </div>
      </div>
    </div>
  )
}
