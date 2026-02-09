"use client"

import { TIERS, TierBadge, getTierByName, type TierName } from "@/components/tier-badge"
import { cn } from "@/lib/utils"

interface TierProgressProps {
  currentTier: TierName
  currentVolume: number
  nextTierVolume: number
  className?: string
}

const TIER_THRESHOLDS: Record<TierName, number> = {
  Bronze: 0,
  Silver: 10000,
  Gold: 50000,
  Platinum: 150000,
  Diamond: 500000,
  Master: 1500000,
}

export function TierProgress({
  currentTier,
  currentVolume,
  nextTierVolume,
  className,
}: TierProgressProps) {
  const config = getTierByName(currentTier)
  const currentIdx = TIERS.findIndex((t) => t.name === currentTier)
  const nextTier = currentIdx < TIERS.length - 1 ? TIERS[currentIdx + 1] : null
  const progress = nextTier
    ? Math.min(
        ((currentVolume - TIER_THRESHOLDS[currentTier]) /
          (nextTierVolume - TIER_THRESHOLDS[currentTier])) *
          100,
        100
      )
    : 100

  return (
    <div className={cn("glass rounded-2xl p-4 sm:p-6", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Your Tier</h3>
        <span className="text-xs text-muted-foreground">
          Vol: ${currentVolume.toLocaleString()}
        </span>
      </div>

      {/* Current Tier Display */}
      <div className="mb-5 flex items-center gap-3">
        <TierBadge tier={currentTier} size="lg" />
        <div>
          <div className="text-xl font-bold" style={{ color: config.color }}>
            {config.name}
          </div>
          <div className="text-sm text-muted-foreground">
            {config.percent}% rakeback
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {nextTier && (
        <div className="mb-3">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              Progress to{" "}
              <span style={{ color: nextTier.color }}>{nextTier.name}</span>
            </span>
            <span className="font-mono font-medium text-foreground">
              {progress.toFixed(1)}%
            </span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${config.color}, ${nextTier.color})`,
              }}
            />
            <div
              className="absolute inset-0 h-full rounded-full opacity-40 animate-shimmer"
              style={{
                background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
                backgroundSize: "200% 100%",
              }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
            <span>${TIER_THRESHOLDS[currentTier].toLocaleString()}</span>
            <span>${nextTierVolume.toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* All Tiers */}
      <div className="mt-4 border-t border-border/50 pt-4">
        <p className="mb-2.5 text-xs font-medium text-muted-foreground">
          All Tiers
        </p>
        <div className="flex flex-wrap gap-2">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs",
                t.name === currentTier
                  ? `${t.bgClass} ${t.borderClass} font-semibold`
                  : "border-border/30 bg-secondary/30 text-muted-foreground"
              )}
              style={t.name === currentTier ? { color: t.color } : undefined}
            >
              <span className="font-bold">{t.icon}</span>
              <span>{t.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
