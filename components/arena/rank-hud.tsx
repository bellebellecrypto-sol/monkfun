"use client"

import { useState, useEffect, useRef } from "react"
import { Flame, Snowflake, TrendingUp, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

function SpeedometerGauge({ velocity, maxVelocity = 100 }: { velocity: number; maxVelocity?: number }) {
  const percentage = Math.min(velocity / maxVelocity, 1)
  const circumference = 2 * Math.PI * 70
  const strokeDashoffset = circumference * (1 - percentage * 0.75)
  const isFire = percentage > 0.7
  const isWarm = percentage > 0.4

  return (
    <div className="relative mx-auto flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
      <svg
        viewBox="0 0 160 160"
        className="h-full w-full -rotate-[135deg]"
        aria-label={`Velocity gauge showing ${velocity} out of ${maxVelocity}`}
      >
        {/* Background arc */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * 0.25}
          strokeLinecap="round"
          className="opacity-30"
        />
        {/* Value arc */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke={
            isFire
              ? "url(#fire-gradient)"
              : isWarm
                ? "hsl(var(--jackpot))"
                : "hsl(var(--muted-foreground))"
          }
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn(
            "transition-all duration-1000 ease-out",
            isFire && "animate-fire-border"
          )}
        />
        <defs>
          <linearGradient id="fire-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--inferno))" />
            <stop offset="100%" stopColor="hsl(var(--jackpot))" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-extrabold tabular-nums text-foreground sm:text-4xl">
          {velocity}
        </span>
        <span className="text-xs text-muted-foreground">velocity</span>
        {isFire && (
          <Flame className="mt-1 h-4 w-4 animate-pulse text-inferno" />
        )}
      </div>
    </div>
  )
}

export function RankHUD() {
  const [velocity, setVelocity] = useState(72)
  const [isInactive, setIsInactive] = useState(false)
  const lastActivityRef = useRef(0)

  // Initialize lastActivity on mount
  useEffect(() => {
    lastActivityRef.current = Date.now()
  }, [])

  // Simulate velocity changes
  useEffect(() => {
    const interval = setInterval(() => {
      setVelocity((prev) => {
        const change = Math.floor(Math.random() * 11) - 4
        return Math.max(0, Math.min(100, prev + change))
      })
      lastActivityRef.current = Date.now()
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Inactivity detection (simulate cooling)
  useEffect(() => {
    const checkInactivity = setInterval(() => {
      if (Date.now() - lastActivityRef.current > 15000) {
        setIsInactive(true)
      } else {
        setIsInactive(false)
      }
    }, 5000)
    return () => clearInterval(checkInactivity)
  }, [])

  const isFire = velocity > 70

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-xl">
      {/* Cracked Ice overlay */}
      {isInactive && (
        <div className="pointer-events-none absolute inset-0 z-10 animate-cracked-ice rounded-xl bg-gradient-to-b from-diamond/5 to-diamond/10">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-1 rounded-lg bg-background/80 px-3 py-2 backdrop-blur-sm">
              <Snowflake className="h-5 w-5 text-diamond" />
              <span className="text-[10px] font-bold text-diamond">COOLING DOWN</span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border/30 px-4 py-3">
        <Trophy className="h-4 w-4 text-jackpot" />
        <h3 className="text-sm font-bold text-foreground">Global Rank HUD</h3>
        {isFire && (
          <span className="ml-auto flex items-center gap-1 rounded-full bg-inferno/10 px-2 py-0.5 text-[10px] font-bold text-inferno">
            <Flame className="h-3 w-3" /> ON FIRE
          </span>
        )}
      </div>

      {/* Gauge */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-4">
        <SpeedometerGauge velocity={velocity} />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-px border-t border-border/30 bg-border/10">
        <div className="flex flex-col items-center gap-0.5 bg-card/80 px-2 py-3">
          <span className="text-[10px] text-muted-foreground">Rank</span>
          <span className="text-sm font-extrabold tabular-nums text-foreground">#847</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 bg-card/80 px-2 py-3">
          <span className="text-[10px] text-muted-foreground">Streak</span>
          <span className="text-sm font-extrabold tabular-nums text-jackpot">12d</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 bg-card/80 px-2 py-3">
          <span className="text-[10px] text-muted-foreground">24h Vol</span>
          <div className="flex items-center gap-0.5">
            <TrendingUp className="h-3 w-3 text-toxic" />
            <span className="text-sm font-extrabold tabular-nums text-toxic">+18%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
