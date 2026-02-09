"use client"

import React from "react"

import { Activity, Coins, TrendingUp, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string
  subValue?: string
  icon: React.ReactNode
  accentColor?: string
  className?: string
}

function StatCard({
  label,
  value,
  subValue,
  icon,
  accentColor,
  className,
}: StatCardProps) {
  return (
    <div className={cn("glass rounded-xl p-4 transition-shadow hover:shadow-md", className)}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <div
          className="flex h-7 w-7 items-center justify-center rounded-md"
          style={{ backgroundColor: `${accentColor}15` }}
        >
          {icon}
        </div>
      </div>
      <p
        className="text-xl font-bold font-mono"
        style={{ color: accentColor || "hsl(var(--foreground))" }}
      >
        {value}
      </p>
      {subValue && (
        <p className="mt-0.5 text-[11px] text-muted-foreground">{subValue}</p>
      )}
    </div>
  )
}

export function StatsRow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 lg:grid-cols-4",
        className
      )}
    >
      <StatCard
        label="Total Rakeback"
        value="$1,876.20"
        subValue="This epoch"
        icon={<Coins className="h-3.5 w-3.5 text-primary" />}
        accentColor="#F97316"
      />
      <StatCard
        label="24h Volume"
        value="$42,850"
        subValue="+12.3% vs yesterday"
        icon={<Activity className="h-3.5 w-3.5 text-neon-green" />}
        accentColor="#22C55E"
      />
      <StatCard
        label="Lifetime Cashback"
        value="$8,234.50"
        subValue="Since Jul 2025"
        icon={<Wallet className="h-3.5 w-3.5 text-gold" />}
        accentColor="#EAB308"
      />
      <StatCard
        label="Leaderboard Rank"
        value="#5"
        subValue="Top 2% of traders"
        icon={<TrendingUp className="h-3.5 w-3.5 text-diamond" />}
        accentColor="#38BDF8"
      />
    </div>
  )
}
