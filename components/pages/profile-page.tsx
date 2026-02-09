"use client"

import {
  User,
  Copy,
  Check,
  ExternalLink,
  Activity,
  TrendingUp,
  Coins,
  Wallet,
  Zap,
  Bell,
  Moon,
  Sun,
  Eye,
  HelpCircle,
  Clock,
} from "lucide-react"
import { useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { TierBadge, getTierByName } from "@/components/tier-badge"
import type { TierName } from "@/components/tier-badge"
import { useReduceMotion } from "@/components/reduce-motion-provider"
import { cn } from "@/lib/utils"

const USER_TIER: TierName = "Gold"

const HOLDINGS = [
  { name: "DARKHORSE", amount: "161K", value: "$418.60" },
  { name: "QX", amount: "48K", value: "$427.20" },
  { name: "DONT", amount: "220K", value: "$242.00" },
  { name: "LIBERTAS", amount: "95K", value: "$40.85" },
]

const CLAIM_HISTORY = [
  { cycle: "Cycle 47", amount: "$128.35", date: "Feb 7, 2026", status: "Claimed" },
  { cycle: "Cycle 46", amount: "$89.50", date: "Feb 4, 2026", status: "Claimed" },
  { cycle: "Cycle 45", amount: "$142.20", date: "Feb 1, 2026", status: "Claimed" },
  { cycle: "Cycle 44", amount: "$76.80", date: "Jan 29, 2026", status: "Claimed" },
  { cycle: "Cycle 43", amount: "$201.40", date: "Jan 26, 2026", status: "Claimed" },
]

const HISTORY = [
  { action: "Claimed", amount: "$47.23", type: "rakeback", time: "2h ago" },
  { action: "Bought", amount: "161K DARKHORSE", type: "trade", time: "3h ago" },
  { action: "Earned", amount: "$12.80", type: "rakeback", time: "5h ago" },
  { action: "Sold", amount: "50K QX", type: "trade", time: "1d ago" },
  { action: "Claimed", amount: "$89.50", type: "rakeback", time: "2d ago" },
]

/* ── Toggle Switch ── */
function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 rounded-full transition-colors",
        checked ? "bg-primary" : "bg-border"
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-card shadow transition-transform",
          checked && "translate-x-5"
        )}
      />
    </button>
  )
}

/* ── Main ── */
export function ProfilePage() {
  const [copied, setCopied] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const { resolvedTheme, setTheme } = useTheme()
  const { reduceMotion, setReduceMotion } = useReduceMotion()
  const config = getTierByName(USER_TIER)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-5 lg:px-6">
      {/* Profile header */}
      <div className="glass mb-5 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <h1 className="text-xl font-bold text-foreground">
                8pe9Am...2d
              </h1>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 rounded-md border border-border bg-card px-2 py-0.5 text-xs font-mono text-muted-foreground transition-colors hover:text-foreground"
              >
                8pe9Am...QrSt
                {copied ? (
                  <Check className="h-3 w-3 text-neon-green" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
            <div className="mt-2 flex items-center justify-center gap-3 sm:justify-start">
              <div className="flex items-center gap-1.5">
                <TierBadge tier={USER_TIER} size="sm" />
                <span
                  className="text-sm font-semibold"
                  style={{ color: config.color }}
                >
                  {USER_TIER}
                </span>
                <span className="text-xs text-muted-foreground">
                  {config.percent}% rakeback
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 bg-transparent"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Explorer
          </Button>
        </div>

        {/* Quick stats */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            {
              label: "Cycle Cashback",
              value: "$1,876.20",
              icon: Coins,
              color: "#F97316",
            },
            {
              label: "24h Volume",
              value: "$42,850",
              icon: Activity,
              color: "#22C55E",
            },
            {
              label: "Lifetime Earned",
              value: "$8,234.50",
              icon: Wallet,
              color: "#EAB308",
            },
            {
              label: "Rank",
              value: "#5",
              icon: TrendingUp,
              color: "#38BDF8",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border/50 bg-muted/30 px-3 py-2.5 dark:bg-secondary/30"
            >
              <div className="mb-1 flex items-center gap-1.5">
                <stat.icon
                  className="h-3 w-3"
                  style={{ color: stat.color }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {stat.label}
                </span>
              </div>
              <p className="text-sm font-bold font-mono text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Left column */}
        <div className="flex flex-col gap-5">
          {/* Axiom Boost Status */}
          <div className="glass rounded-2xl p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-neon-green" />
              <h2 className="text-base font-bold text-foreground">
                Axiom Boost
              </h2>
              <span className="rounded-full bg-neon-green/10 px-2 py-0.5 text-[10px] font-semibold text-neon-green">
                Linked
              </span>
            </div>
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
              Your Axiom account is linked. You receive a higher rakeback payout
              rate on all trades. Post-migration Axiom users automatically
              qualify for boosted rewards.
            </p>
            <div className="flex items-center gap-2 rounded-lg border border-neon-green/20 bg-neon-green/5 px-3 py-2.5">
              <Zap className="h-4 w-4 text-neon-green" />
              <span className="text-xs font-medium text-foreground">
                Axiom Boost active
              </span>
              <span className="ml-auto text-xs font-mono font-bold text-neon-green">
                +15% rakeback
              </span>
            </div>
          </div>

          {/* Settings */}
          <div className="glass rounded-2xl p-4 sm:p-5">
            <h2 className="mb-4 text-base font-bold text-foreground">
              Settings
            </h2>
            <div className="divide-y divide-border/30">
              {/* Theme */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  {resolvedTheme === "dark" ? (
                    <Moon className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Sun className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Dark Mode
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Switch between light and dark theme
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={resolvedTheme === "dark"}
                  onChange={(v) => setTheme(v ? "dark" : "light")}
                />
              </div>
              {/* Reduce motion */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Reduce Motion
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Disable animations and auto-scrolling
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={reduceMotion}
                  onChange={setReduceMotion}
                />
              </div>
              {/* Notifications */}
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Notifications
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      Rakeback toasts and activity alerts
                    </p>
                  </div>
                </div>
                <ToggleSwitch
                  checked={notifications}
                  onChange={setNotifications}
                />
              </div>
            </div>
          </div>

          {/* Holdings */}
          <div className="glass rounded-2xl p-4 sm:p-5">
            <h2 className="mb-4 text-base font-bold text-foreground">
              Holdings
            </h2>
            <div className="divide-y divide-border/30">
              {HOLDINGS.map((h) => (
                <div
                  key={h.name}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                      {h.name.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {h.name}
                      </p>
                      <p className="text-[10px] font-mono text-muted-foreground">
                        {h.amount} tokens
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold font-mono text-foreground">
                    {h.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">
          {/* Cycle Claim History */}
          <div className="glass rounded-2xl p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <h2 className="text-base font-bold text-foreground">
                Cycle History
              </h2>
            </div>
            <div className="divide-y divide-border/30">
              {CLAIM_HISTORY.map((c) => (
                <div
                  key={c.cycle}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {c.cycle}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {c.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold font-mono text-foreground">
                      {c.amount}
                    </p>
                    <span className="rounded-full bg-neon-green/10 px-2 py-0.5 text-[10px] font-semibold text-neon-green">
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass rounded-2xl p-4 sm:p-5">
            <h2 className="mb-4 text-base font-bold text-foreground">
              Recent Activity
            </h2>
            <div className="divide-y divide-border/30">
              {HISTORY.map((h, i) => (
                <div
                  key={`${h.action}-${i}`}
                  className="flex items-center justify-between py-3"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "rounded-md px-2 py-0.5 text-[10px] font-bold",
                        h.type === "rakeback"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary text-foreground"
                      )}
                    >
                      {h.action}
                    </span>
                    <span className="text-sm font-mono text-foreground">
                      {h.amount}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {h.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
