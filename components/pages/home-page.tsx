"use client"

import { ArrowRight, DollarSign, Flame, Plus, TrendingUp, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LiveTicker } from "@/components/live-ticker"
import { useNavigation } from "@/components/app-shell"
import { cn } from "@/lib/utils"

/* ── Data ── */
interface TokenCard {
  name: string
  symbol: string
  marketCap: string
  change: number
  heat: number
  sparkline: number[]
  isNew?: boolean
}

const TRENDING_TOKENS: TokenCard[] = [
  { name: "Dark Horse", symbol: "DARKHORSE", marketCap: "$2.6M", change: 142, heat: 95, sparkline: [20,35,25,60,55,80,90,95] },
  { name: "Quantum Exec", symbol: "QX", marketCap: "$211K", change: 67, heat: 82, sparkline: [10,15,30,25,50,45,70,82] },
  { name: "DisclaimerCoin", symbol: "DONT", marketCap: "$2.2M", change: 34, heat: 78, sparkline: [40,45,50,55,60,58,65,78] },
  { name: "The Alpha Eagle", symbol: "HAMLET", marketCap: "$4K", change: -12, heat: 65, sparkline: [80,75,60,55,50,45,40,35] },
  { name: "Libertas Americana", symbol: "LIBERTAS", marketCap: "$7.2K", change: 89, heat: 88, sparkline: [15,20,35,40,55,70,80,88] },
  { name: "Aurum", symbol: "AURUM", marketCap: "$1.7K", change: 23, heat: 55, sparkline: [30,35,40,38,45,50,52,55] },
]

const NEW_LAUNCHES: { name: string; symbol: string; time: string; mc: string }[] = [
  { name: "In Gay We Trust", symbol: "GAY", time: "just now", mc: "$3.1K" },
  { name: "Save America Act", symbol: "SAA", time: "7m ago", mc: "$4.1K" },
  { name: "MOLTOPOLY", symbol: "MOLTOPOLY", time: "7m ago", mc: "$3.1K" },
  { name: "US CTO", symbol: "US", time: "5m ago", mc: "$4K" },
  { name: "STEVE", symbol: "Steve", time: "16m ago", mc: "$3.1K" },
]

/* ── Sub-components ── */
function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const h = 28
  const w = 60
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w
      const y = h - ((v - min) / range) * h
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="shrink-0" aria-hidden="true">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "hsl(var(--neon-green))" : "hsl(var(--destructive))"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HeatMeter({ heat }: { heat: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted dark:bg-secondary">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${heat}%`,
            background:
              heat > 80
                ? "hsl(var(--primary))"
                : heat > 50
                  ? "hsl(var(--gold))"
                  : "hsl(var(--muted-foreground))",
          }}
        />
      </div>
      <span className="text-[10px] font-mono text-muted-foreground">{heat}</span>
    </div>
  )
}

function CyclePaidStrip() {
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2.5">
      <DollarSign className="h-4 w-4 text-primary" />
      <span className="text-xs text-muted-foreground">This cycle we paid</span>
      <span className="font-mono text-sm font-bold text-primary text-glow-orange">
        $284,219.47
      </span>
      <span className="text-xs text-muted-foreground">in rakeback</span>
    </div>
  )
}

function TokenCardSkeleton() {
  return (
    <div className="glass flex items-center gap-3 rounded-xl p-4 animate-pulse">
      <div className="h-10 w-10 rounded-lg bg-muted dark:bg-secondary" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-24 rounded bg-muted dark:bg-secondary" />
        <div className="h-3 w-16 rounded bg-muted dark:bg-secondary" />
        <div className="h-1.5 w-16 rounded-full bg-muted dark:bg-secondary" />
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className="h-7 w-[60px] rounded bg-muted dark:bg-secondary" />
        <div className="h-3 w-10 rounded bg-muted dark:bg-secondary" />
      </div>
    </div>
  )
}

function NewLaunchSkeleton() {
  return (
    <div className="flex items-center justify-between px-4 py-3 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-muted dark:bg-secondary" />
        <div className="space-y-1.5">
          <div className="h-3.5 w-28 rounded bg-muted dark:bg-secondary" />
          <div className="h-3 w-20 rounded bg-muted dark:bg-secondary" />
        </div>
      </div>
      <div className="space-y-1 text-right">
        <div className="ml-auto h-3.5 w-12 rounded bg-muted dark:bg-secondary" />
        <div className="ml-auto h-3 w-6 rounded bg-muted dark:bg-secondary" />
      </div>
    </div>
  )
}

/* ── Main Page ── */
export function HomePage() {
  const { setPage, setSelectedToken } = useNavigation()

  const handleTokenClick = (symbol: string) => {
    setSelectedToken(symbol)
    setPage("token")
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-5 lg:px-6">
      {/* Live Ticker */}
      <LiveTicker className="mb-5" />

      {/* Cycle paid strip */}
      <div className="mb-5">
        <CyclePaidStrip />
      </div>

      {/* Hero CTA */}
      <section className="glass relative mb-6 overflow-hidden rounded-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent dark:from-primary/10" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative flex flex-col items-center gap-4 px-4 py-10 text-center sm:px-8 sm:py-14">
          <span className="rounded-full bg-primary/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary">
            Launch your token
          </span>
          <h1 className="text-2xl font-bold text-foreground text-balance sm:text-3xl lg:text-4xl">
            Create a coin in{" "}
            <span className="text-primary text-glow-orange">seconds</span>
          </h1>
          <p className="max-w-lg text-sm text-muted-foreground leading-relaxed">
            Zero creator fees with Classic launch, or earn long-term revshare
            with Bonkers mode. Every trade generates rakeback for your holders.
          </p>
          <div className="flex items-center gap-3">
            <Button
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setPage("create")}
            >
              <Plus className="h-4 w-4" />
              Create Coin
            </Button>
            <Button
              variant="outline"
              className="gap-2 bg-transparent"
              onClick={() => setPage("trade")}
            >
              Start Trading
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trending Tokens */}
      <section className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Trending</h2>
          </div>
          <button
            type="button"
            onClick={() => setPage("trade")}
            className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
          >
            View all <ArrowRight className="h-3 w-3" />
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TRENDING_TOKENS.map((token) => (
            <button
              key={token.symbol}
              type="button"
              onClick={() => handleTokenClick(token.symbol)}
              className="glass flex items-center gap-3 rounded-xl p-4 text-left transition-all hover:shadow-md hover:border-primary/20"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                {token.symbol.slice(0, 2)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-semibold text-foreground">
                    {token.name}
                  </span>
                  {token.isNew && (
                    <span className="rounded bg-neon-green/15 px-1 py-0.5 text-[9px] font-bold text-neon-green">
                      NEW
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-mono">${token.symbol}</span>
                  <span>{token.marketCap}</span>
                </div>
                <HeatMeter heat={token.heat} />
              </div>
              <div className="flex flex-col items-end gap-1">
                <MiniSparkline data={token.sparkline} positive={token.change >= 0} />
                <span
                  className={cn(
                    "text-xs font-semibold font-mono",
                    token.change >= 0 ? "text-neon-green" : "text-destructive"
                  )}
                >
                  {token.change >= 0 ? "+" : ""}
                  {token.change}%
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* New Launches */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-gold" />
            <h2 className="text-lg font-bold text-foreground">New Launches</h2>
            <div className="flex items-center gap-1 rounded-full bg-neon-green/10 px-2 py-0.5">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-green" />
              <span className="text-[10px] font-semibold text-neon-green">Live</span>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl divide-y divide-border/30">
          {NEW_LAUNCHES.map((token) => (
            <button
              key={token.symbol}
              type="button"
              onClick={() => handleTokenClick(token.symbol)}
              className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-secondary/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                  {token.symbol.slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{token.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    ${token.symbol} &middot; {token.time}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground font-mono">{token.mc}</p>
                <p className="text-[10px] text-muted-foreground">MC</p>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
