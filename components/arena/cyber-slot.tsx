"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Rocket, Moon, Gem, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Confetti } from "@/components/confetti"

type SlotIcon = "rocket" | "moon" | "pepe" | "gem"

const ICONS: SlotIcon[] = ["rocket", "moon", "pepe", "gem"]

function SlotIconDisplay({ icon, className }: { icon: SlotIcon; className?: string }) {
  const iconMap: Record<SlotIcon, React.ReactNode> = {
    rocket: <Rocket className={cn("h-8 w-8 text-inferno", className)} />,
    moon: <Moon className={cn("h-8 w-8 text-jackpot", className)} />,
    pepe: <Zap className={cn("h-8 w-8 text-toxic", className)} />,
    gem: <Gem className={cn("h-8 w-8 text-diamond", className)} />,
  }
  return <>{iconMap[icon]}</>
}

function ReelColumn({
  spinning,
  finalIcon,
  delay,
}: {
  spinning: boolean
  finalIcon: SlotIcon
  delay: number
}) {
  const [displayedIcons, setDisplayedIcons] = useState<SlotIcon[]>([finalIcon])
  const [isSpinning, setIsSpinning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (spinning) {
      setIsSpinning(true)
      intervalRef.current = setInterval(() => {
        setDisplayedIcons([ICONS[Math.floor(Math.random() * ICONS.length)]])
      }, 80)

      const stopTimer = setTimeout(() => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayedIcons([finalIcon])
        setIsSpinning(false)
      }, 1200 + delay)

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
        clearTimeout(stopTimer)
      }
    }
  }, [spinning, finalIcon, delay])

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={cn(
          "flex h-24 w-24 items-center justify-center rounded-xl border-2 transition-all duration-200 sm:h-28 sm:w-28",
          isSpinning
            ? "border-inferno/40 bg-inferno/5 shadow-[0_0_30px_rgba(255,114,94,0.2)]"
            : "border-border/30 bg-card/80 backdrop-blur-sm"
        )}
      >
        <div
          className={cn(
            "transition-all duration-150",
            isSpinning && "blur-[2px] scale-90 opacity-70"
          )}
        >
          <SlotIconDisplay
            icon={displayedIcons[0]}
            className={cn(
              isSpinning ? "h-10 w-10 sm:h-12 sm:w-12" : "h-10 w-10 sm:h-12 sm:w-12"
            )}
          />
        </div>
      </div>
    </div>
  )
}

export function CyberSlot() {
  const [spinning, setSpinning] = useState(false)
  const [reels, setReels] = useState<SlotIcon[]>(["rocket", "gem", "moon"])
  const [isJackpot, setIsJackpot] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [lastResult, setLastResult] = useState<string | null>(null)

  const spin = useCallback(() => {
    if (spinning) return
    setIsJackpot(false)
    setLastResult(null)
    setSpinning(true)

    // 1 in 4 chance of jackpot for demo purposes
    const jackpot = Math.random() < 0.25
    let finalReels: SlotIcon[]

    if (jackpot) {
      const icon = ICONS[Math.floor(Math.random() * ICONS.length)]
      finalReels = [icon, icon, icon]
    } else {
      finalReels = Array.from({ length: 3 }, () => ICONS[Math.floor(Math.random() * ICONS.length)])
      // Ensure not all same accidentally
      if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
        finalReels[2] = ICONS[(ICONS.indexOf(finalReels[2]) + 1) % ICONS.length]
      }
    }

    setReels(finalReels)

    // Stop spinning after longest reel
    setTimeout(() => {
      setSpinning(false)
      if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
        setIsJackpot(true)
        setShowConfetti(true)
        setLastResult("JACKPOT! Token Launched!")
        setTimeout(() => setShowConfetti(false), 100)
      } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2]) {
        setLastResult("Close! Spin again...")
      } else {
        setLastResult("Try again!")
      }
    }, 1800)
  }, [spinning])

  return (
    <div className="flex h-full flex-col items-center justify-center rounded-xl border border-border/50 bg-card/50 backdrop-blur-xl">
      <Confetti trigger={showConfetti} />

      {/* Title */}
      <div className="mb-4 text-center sm:mb-6">
        <h3 className="text-lg font-bold text-foreground sm:text-xl">Token Launchpad</h3>
        <p className="text-xs text-muted-foreground">Match 3 to launch your coin</p>
      </div>

      {/* Reels */}
      <div
        className={cn(
          "mb-4 flex items-center gap-3 rounded-2xl border-2 p-4 transition-all duration-500 sm:mb-6 sm:gap-4 sm:p-6",
          isJackpot
            ? "animate-jackpot-pulse border-jackpot/60 bg-jackpot/5"
            : "border-border/20 bg-background/50"
        )}
      >
        {reels.map((icon, i) => (
          <ReelColumn
            key={i}
            spinning={spinning}
            finalIcon={icon}
            delay={i * 200}
          />
        ))}
      </div>

      {/* Result */}
      {lastResult && (
        <div
          className={cn(
            "mb-4 rounded-lg px-4 py-2 text-center text-sm font-bold sm:mb-6",
            isJackpot
              ? "bg-jackpot/15 text-jackpot glow-jackpot"
              : "bg-muted text-muted-foreground"
          )}
        >
          {lastResult}
        </div>
      )}

      {/* Spin Button */}
      <button
        type="button"
        onClick={spin}
        disabled={spinning}
        className={cn(
          "relative overflow-hidden rounded-xl px-8 py-3 text-base font-extrabold uppercase tracking-wider transition-all duration-200 sm:px-12 sm:py-4 sm:text-lg",
          spinning
            ? "cursor-not-allowed bg-muted text-muted-foreground"
            : "bg-gradient-to-r from-inferno to-[#ff4d2e] text-foreground hover:scale-[1.03] active:scale-95 glow-inferno"
        )}
        style={{
          color: spinning ? undefined : "#ffffff",
        }}
      >
        {spinning ? (
          <span className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground" />
            Spinning...
          </span>
        ) : (
          "SPIN TO LAUNCH"
        )}
        {/* Shimmer effect */}
        {!spinning && (
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        )}
      </button>
    </div>
  )
}
