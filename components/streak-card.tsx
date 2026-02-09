"use client"

import { Flame, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface StreakCardProps {
  currentStreak: number
  bestStreak: number
  streakDays: boolean[]
  className?: string
}

export function StreakCard({
  currentStreak,
  bestStreak,
  streakDays,
  className,
}: StreakCardProps) {
  return (
    <div className={cn("glass rounded-2xl p-4 sm:p-6", className)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">
            Trading Streak
          </h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <TrendingUp className="h-3 w-3" />
          <span>Best: {bestStreak}d</span>
        </div>
      </div>

      {/* Big streak number */}
      <div className="mb-4 flex items-baseline gap-2">
        <span className="text-4xl font-bold text-primary text-glow-orange animate-streak-pulse">
          {currentStreak}
        </span>
        <span className="text-sm text-muted-foreground">day streak</span>
      </div>

      {/* Day indicators */}
      <div className="flex gap-1.5">
        {streakDays.map((active, i) => (
          <div key={`day-${i}`} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={cn(
                "h-2 w-full rounded-full transition-all",
                active
                  ? "bg-primary glow-orange-sm"
                  : "bg-secondary"
              )}
            />
            <span className="text-[9px] text-muted-foreground">
              {["M", "T", "W", "T", "F", "S", "S"][i]}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground">
        Trade daily to maintain your streak and earn bonus rakeback multipliers.
      </p>
    </div>
  )
}
