"use client"

import { Pause, Play } from "lucide-react"
import { useState } from "react"
import { useReduceMotion } from "@/components/reduce-motion-provider"
import { cn } from "@/lib/utils"

const TICKER_ITEMS = [
  { wallet: "7xKp...mR4d", amount: 82.4, action: "earned" },
  { wallet: "3bNf...qL7w", amount: 51.2, action: "earned" },
  { wallet: "9cYt...jP2x", amount: 34.8, action: "earned" },
  { wallet: "5dRm...kN8v", amount: 28.1, action: "claimed" },
  { wallet: "2fWs...hT3z", amount: 19.6, action: "earned" },
  { wallet: "6gXn...eU5c", amount: 15.3, action: "earned" },
  { wallet: "4hVp...fS9b", amount: 12.7, action: "claimed" },
  { wallet: "1iZq...gR6a", amount: 9.4, action: "earned" },
]

export function LiveTicker({ className }: { className?: string }) {
  const { reduceMotion } = useReduceMotion()
  const [paused, setPaused] = useState(false)
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]

  // If reduce motion, show static list
  if (reduceMotion) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-border/50 bg-card/50",
          className
        )}
      >
        <div className="flex items-center">
          <div className="flex shrink-0 items-center gap-2 border-r border-border/50 bg-secondary/40 px-3 py-2">
            <div className="h-1.5 w-1.5 rounded-full bg-neon-green" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Live
            </span>
          </div>
          <div className="flex items-center gap-4 overflow-x-auto px-4 py-2">
            {TICKER_ITEMS.slice(0, 3).map((item, i) => (
              <span
                key={`${item.wallet}-${i}`}
                className="inline-flex shrink-0 items-center gap-1.5 text-xs"
              >
                <span className="font-mono text-muted-foreground">
                  {item.wallet}
                </span>
                <span className="text-muted-foreground">{item.action}</span>
                <span className="font-mono font-semibold text-primary">
                  ${item.amount.toFixed(2)}
                </span>
                <span className="text-muted-foreground">rakeback</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border/50 bg-card/50",
        className
      )}
    >
      <div className="flex items-center">
        <div className="flex shrink-0 items-center gap-2 border-r border-border/50 bg-secondary/40 px-3 py-2">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-green" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Live
          </span>
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            className={cn(
              "flex items-center gap-6 whitespace-nowrap px-4 py-2",
              !paused && "animate-ticker"
            )}
            style={paused ? { animationPlayState: "paused" } : undefined}
          >
            {items.map((item, i) => (
              <span
                key={`${item.wallet}-${i}`}
                className="inline-flex items-center gap-1.5 text-xs"
              >
                <span className="font-mono text-muted-foreground">
                  {item.wallet}
                </span>
                <span className="text-muted-foreground">{item.action}</span>
                <span className="font-mono font-semibold text-primary">
                  ${item.amount.toFixed(2)}
                </span>
                <span className="text-muted-foreground">rakeback</span>
                <span className="mx-2 text-border">|</span>
              </span>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          className="shrink-0 border-l border-border/50 px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={paused ? "Resume ticker" : "Pause ticker"}
        >
          {paused ? (
            <Play className="h-3 w-3" />
          ) : (
            <Pause className="h-3 w-3" />
          )}
        </button>
      </div>
    </div>
  )
}
