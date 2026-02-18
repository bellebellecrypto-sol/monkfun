"use client"

import { useState, useEffect, useCallback } from "react"
import { Waves, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

interface WhaleTx {
  id: string
  wallet: string
  action: "buy" | "launch"
  token: string
  amount: number
  time: string
}

const INITIAL_TXS: WhaleTx[] = [
  { id: "1", wallet: "7xKp...mR4d", action: "buy", token: "DARKHORSE", amount: 120.5, time: "just now" },
  { id: "2", wallet: "3bNf...qL7w", action: "launch", token: "MOONCAT", amount: 0, time: "12s ago" },
  { id: "3", wallet: "9cYt...jP2x", action: "buy", token: "QX", amount: 85.2, time: "28s ago" },
  { id: "4", wallet: "5dRm...kN8v", action: "buy", token: "LIBERTAS", amount: 67.8, time: "45s ago" },
  { id: "5", wallet: "2fWs...hT3z", action: "buy", token: "PEPE2", amount: 210.3, time: "1m ago" },
  { id: "6", wallet: "6gXn...eU5c", action: "launch", token: "COSMIC", amount: 0, time: "2m ago" },
  { id: "7", wallet: "4hVp...fS9b", action: "buy", token: "AURUM", amount: 42.1, time: "3m ago" },
  { id: "8", wallet: "1iZq...gR6a", action: "buy", token: "DONT", amount: 55.0, time: "4m ago" },
]

const NEW_TXS: WhaleTx[] = [
  { id: "n1", wallet: "8aQm...pK2d", action: "buy", token: "HAMLET", amount: 92.7, time: "just now" },
  { id: "n2", wallet: "0rBn...wE6f", action: "buy", token: "DARKHORSE", amount: 156.4, time: "just now" },
  { id: "n3", wallet: "4yTl...mC9h", action: "launch", token: "GIGABRAIN", amount: 0, time: "just now" },
  { id: "n4", wallet: "7dKs...jP1b", action: "buy", token: "QX", amount: 78.3, time: "just now" },
]

export function HighRollerLounge() {
  const [transactions, setTransactions] = useState<WhaleTx[]>(INITIAL_TXS)
  const [newIds, setNewIds] = useState<Set<string>>(new Set())

  const addRandomTx = useCallback(() => {
    const tx = NEW_TXS[Math.floor(Math.random() * NEW_TXS.length)]
    const newTx = { ...tx, id: `${tx.id}-${Date.now()}`, time: "just now" }
    setNewIds((prev) => new Set(prev).add(newTx.id))
    setTransactions((prev) => [newTx, ...prev.slice(0, 9)])
    setTimeout(() => {
      setNewIds((prev) => {
        const next = new Set(prev)
        next.delete(newTx.id)
        return next
      })
    }, 2000)
  }, [])

  useEffect(() => {
    const interval = setInterval(addRandomTx, 3500)
    return () => clearInterval(interval)
  }, [addRandomTx])

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border/30 px-4 py-3">
        <Waves className="h-4 w-4 text-inferno" />
        <h3 className="text-sm font-bold text-foreground">High Roller Lounge</h3>
        <div className="ml-auto flex items-center gap-1 rounded-full bg-toxic/10 px-2 py-0.5">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-toxic" />
          <span className="text-[10px] font-semibold text-toxic">LIVE</span>
        </div>
      </div>

      {/* Transaction Feed */}
      <div className="flex-1 overflow-y-auto">
        {transactions.map((tx) => {
          const isWhale = tx.amount > 50
          const isNew = newIds.has(tx.id)
          return (
            <div
              key={tx.id}
              className={cn(
                "flex items-center gap-3 border-b border-border/10 px-4 py-2.5 transition-all",
                isNew && "animate-slide-in-left",
                isWhale && tx.amount > 100 && "animate-jackpot-pulse bg-jackpot/5"
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                  tx.action === "launch"
                    ? "bg-jackpot/15 text-jackpot"
                    : isWhale
                      ? "bg-inferno/15 text-inferno"
                      : "bg-muted text-muted-foreground"
                )}
              >
                {tx.action === "launch" ? (
                  <Rocket className="h-3.5 w-3.5" />
                ) : (
                  <span className="font-mono text-[10px]">{tx.token.slice(0, 2)}</span>
                )}
              </div>

              {/* Details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate font-mono text-xs text-muted-foreground">
                    {tx.wallet}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded px-1 py-0.5 text-[9px] font-bold uppercase",
                      tx.action === "launch"
                        ? "bg-jackpot/15 text-jackpot"
                        : "bg-inferno/10 text-inferno"
                    )}
                  >
                    {tx.action === "launch" ? "Launched" : "Whale Buy"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="font-semibold text-foreground">${tx.token}</span>
                  {tx.amount > 0 && (
                    <span className="font-mono font-extrabold tabular-nums text-inferno">
                      {tx.amount.toFixed(1)} SOL
                    </span>
                  )}
                </div>
              </div>

              {/* Time */}
              <span className="shrink-0 text-[10px] text-muted-foreground">{tx.time}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
