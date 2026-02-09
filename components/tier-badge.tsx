"use client"

import { cn } from "@/lib/utils"

export type TierName =
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Diamond"
  | "Master"

interface TierConfig {
  name: TierName
  percent: number
  color: string
  bgClass: string
  borderClass: string
  glowClass: string
  icon: string
}

export const TIERS: TierConfig[] = [
  {
    name: "Bronze",
    percent: 0.02,
    color: "#CD7F32",
    bgClass: "bg-[#CD7F32]/20",
    borderClass: "border-[#CD7F32]/40",
    glowClass: "",
    icon: "B",
  },
  {
    name: "Silver",
    percent: 0.03,
    color: "#C0C0C0",
    bgClass: "bg-[#C0C0C0]/15",
    borderClass: "border-[#C0C0C0]/40",
    glowClass: "",
    icon: "S",
  },
  {
    name: "Gold",
    percent: 0.04,
    color: "#EAB308",
    bgClass: "bg-[#EAB308]/15",
    borderClass: "border-[#EAB308]/40",
    glowClass: "glow-gold",
    icon: "G",
  },
  {
    name: "Platinum",
    percent: 0.05,
    color: "#A0AEC0",
    bgClass: "bg-[#A0AEC0]/15",
    borderClass: "border-[#A0AEC0]/40",
    glowClass: "",
    icon: "P",
  },
  {
    name: "Diamond",
    percent: 0.06,
    color: "#38BDF8",
    bgClass: "bg-[#38BDF8]/15",
    borderClass: "border-[#38BDF8]/40",
    glowClass: "glow-diamond",
    icon: "D",
  },
  {
    name: "Master",
    percent: 0.07,
    color: "#F97316",
    bgClass: "bg-[#F97316]/15",
    borderClass: "border-[#F97316]/40",
    glowClass: "glow-orange",
    icon: "M",
  },
]

export function getTierByName(name: TierName): TierConfig {
  return TIERS.find((t) => t.name === name) || TIERS[0]
}

export function TierBadge({
  tier,
  size = "md",
  className,
}: {
  tier: TierName
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const config = getTierByName(tier)
  const sizeClasses = {
    sm: "h-6 w-6 text-[10px]",
    md: "h-9 w-9 text-xs",
    lg: "h-14 w-14 text-base",
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-xl border-2 font-bold",
        config.bgClass,
        config.borderClass,
        config.glowClass,
        sizeClasses[size],
        className
      )}
      style={{ color: config.color }}
    >
      {config.icon}
      {(tier === "Diamond" || tier === "Master") && (
        <div
          className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full"
          style={{ backgroundColor: config.color }}
        />
      )}
    </div>
  )
}

export function TierBadgeLabel({
  tier,
  showPercent = true,
  className,
}: {
  tier: TierName
  showPercent?: boolean
  className?: string
}) {
  const config = getTierByName(tier)

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <TierBadge tier={tier} />
      <div>
        <span className="text-sm font-semibold" style={{ color: config.color }}>
          {config.name}
        </span>
        {showPercent && (
          <span className="ml-1.5 text-xs text-muted-foreground">
            {config.percent}% rakeback
          </span>
        )}
      </div>
    </div>
  )
}
