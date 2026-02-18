"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Activity, TrendingDown, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

function generatePrice(prev: number): number {
  const change = (Math.random() - 0.48) * 0.08
  return Math.max(0.01, prev * (1 + change))
}

function generateInitialData(count: number): number[] {
  const data: number[] = [1.0]
  for (let i = 1; i < count; i++) {
    data.push(generatePrice(data[i - 1]))
  }
  return data
}

export function EKGChart() {
  const [prices, setPrices] = useState<number[]>([])
  const [isDumping, setIsDumping] = useState(false)
  const [mounted, setMounted] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)

  // Generate initial data only on the client to avoid hydration mismatch
  useEffect(() => {
    setPrices(generateInitialData(60))
    setMounted(true)
  }, [])

  const latestPrice = prices.length > 0 ? prices[prices.length - 1] : 1.0
  const prevPrice = prices.length > 1 ? prices[prices.length - 2] : latestPrice
  const priceChange = prevPrice !== 0 ? ((latestPrice - prevPrice) / prevPrice) * 100 : 0
  const isUp = priceChange >= 0

  const addPrice = useCallback(() => {
    setPrices((prev) => {
      const last = prev[prev.length - 1]
      const next = generatePrice(last)
      const newPrices = [...prev.slice(-59), next]

      // Detect dump: 3+ consecutive drops
      const tail = newPrices.slice(-4)
      const consecutiveDrops = tail.every((val, i) => i === 0 || val < tail[i - 1])
      if (consecutiveDrops && tail.length >= 4) {
        setIsDumping(true)
        setTimeout(() => setIsDumping(false), 2000)
      }

      return newPrices
    })
  }, [])

  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(addPrice, 1200)
    return () => clearInterval(interval)
  }, [addPrice, mounted])

  // Build SVG path
  const width = 600
  const height = 120
  const max = Math.max(...prices)
  const min = Math.min(...prices)
  const range = max - min || 0.001
  const padding = 4

  const points = prices.map((price, i) => {
    const x = (i / (prices.length - 1)) * width
    const y = padding + ((max - price) / range) * (height - padding * 2)
    return { x, y }
  })

  const pathD = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`
      const prev = points[i - 1]
      const cpx1 = prev.x + (p.x - prev.x) * 0.5
      const cpy1 = prev.y
      const cpx2 = prev.x + (p.x - prev.x) * 0.5
      const cpy2 = p.y
      return `C ${cpx1} ${cpy1} ${cpx2} ${cpy2} ${p.x} ${p.y}`
    })
    .join(" ")

  // Area fill path
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-xl transition-all",
        isDumping && "animate-chromatic-glitch"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-inferno" />
          <h3 className="text-sm font-bold text-foreground">Heartbeat EKG</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="animate-breathe text-lg font-extrabold tabular-nums text-foreground">
            {mounted ? `$${latestPrice.toFixed(4)}` : "$-.----"}
          </span>
          <span
            className={cn(
              "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-bold",
              isUp ? "bg-toxic/10 text-toxic" : "bg-destructive/10 text-destructive"
            )}
          >
            {isUp ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {mounted ? `${isUp ? "+" : ""}${priceChange.toFixed(2)}%` : "--.--%" }
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative px-2 py-4">
        {prices.length > 1 ? (
          <svg
            ref={svgRef}
            viewBox={`0 0 ${width} ${height}`}
            className="h-32 w-full sm:h-40"
            preserveAspectRatio="none"
            aria-label="Price heartbeat chart"
          >
            <defs>
              <linearGradient id="ekg-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={isUp ? "hsl(var(--toxic))" : "hsl(var(--destructive))"}
                  stopOpacity="0.2"
                />
                <stop
                  offset="100%"
                  stopColor={isUp ? "hsl(var(--toxic))" : "hsl(var(--destructive))"}
                  stopOpacity="0"
                />
              </linearGradient>
              <filter id="neon-glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Area fill */}
            <path d={areaD} fill="url(#ekg-gradient)" />

            {/* Main line with glow */}
            <path
              d={pathD}
              fill="none"
              stroke={isUp ? "hsl(var(--toxic))" : "hsl(var(--destructive))"}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#neon-glow)"
              className="animate-breathe"
            />

            {/* Dot at latest point */}
            <circle
              cx={points[points.length - 1]?.x || 0}
              cy={points[points.length - 1]?.y || 0}
              r="4"
              fill={isUp ? "hsl(var(--toxic))" : "hsl(var(--destructive))"}
              className="animate-pulse"
            />
          </svg>
        ) : (
          <div className="flex h-32 w-full items-center justify-center sm:h-40">
            <span className="text-xs text-muted-foreground">Loading chart...</span>
          </div>
        )}

        {/* Dump flash overlay */}
        {isDumping && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-destructive/5 backdrop-blur-[1px]">
            <span className="rounded-lg bg-destructive/20 px-3 py-1 text-xs font-bold text-destructive">
              DUMP DETECTED
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
