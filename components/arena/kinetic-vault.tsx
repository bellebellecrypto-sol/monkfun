"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { Coins, Lock, Unlock, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const CLAIM_AMOUNT = 47.23
const UNLOCK_THRESHOLD = 0.88

export function KineticVault() {
  const [unlocked, setUnlocked] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const handleSize = 56

  const x = useMotionValue(0)
  const maxDrag = containerWidth - handleSize - 8

  const progress = useTransform(x, [0, maxDrag > 0 ? maxDrag : 1], [0, 1])
  const bgWidth = useTransform(x, [0, maxDrag > 0 ? maxDrag : 1], ["0%", "100%"])
  const handleOpacity = useTransform(progress, [0, 0.5, 1], [1, 0.8, 0])
  const textOpacity = useTransform(progress, [0, 0.3], [1, 0])

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const handleDragEnd = () => {
    const currentProgress = maxDrag > 0 ? x.get() / maxDrag : 0
    if (currentProgress >= UNLOCK_THRESHOLD) {
      animate(x, maxDrag, { type: "spring", stiffness: 300, damping: 30 })
      setUnlocked(true)
    } else {
      animate(x, 0, { type: "spring", stiffness: 600, damping: 40 })
    }
  }

  const reset = () => {
    animate(x, 0, { type: "spring", stiffness: 400, damping: 30 })
    setUnlocked(false)
  }

  return (
    <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/30 px-4 py-3">
        <div className="flex items-center gap-2">
          <Coins className="h-4 w-4 text-jackpot" />
          <h3 className="text-sm font-bold text-foreground">Kinetic Vault</h3>
        </div>
        <span className="text-lg font-extrabold tabular-nums text-jackpot">
          ${CLAIM_AMOUNT.toFixed(2)}
        </span>
      </div>

      {/* Slider */}
      <div className="px-4 py-4">
        {unlocked ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3 rounded-xl bg-toxic/10 py-5 glow-toxic"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-toxic/20">
              <Unlock className="h-6 w-6 text-toxic" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-toxic">Vault Unlocked!</p>
              <p className="text-2xl font-extrabold tabular-nums text-foreground">
                ${CLAIM_AMOUNT.toFixed(2)} claimed
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="mt-1 rounded-lg bg-muted px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary"
            >
              Reset Demo
            </button>
          </motion.div>
        ) : (
          <div
            ref={containerRef}
            className="relative h-14 overflow-hidden rounded-xl border-2 border-border/30 bg-background/80"
          >
            {/* Gold fill background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-jackpot/20 via-jackpot/10 to-transparent"
              style={{ width: bgWidth }}
            />

            {/* Text label */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center gap-2 select-none"
              style={{ opacity: textOpacity }}
            >
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm font-bold text-muted-foreground">
                Slide to claim ${CLAIM_AMOUNT.toFixed(2)}
              </span>
              <motion.div
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </motion.div>
            </motion.div>

            {/* Draggable handle */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: maxDrag > 0 ? maxDrag : 0 }}
              dragElastic={0}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
              style={{ x, opacity: handleOpacity }}
              className="absolute left-1 top-1 z-10 flex h-12 w-12 cursor-grab items-center justify-center rounded-lg bg-gradient-to-r from-inferno to-[#ff4d2e] active:cursor-grabbing glow-inferno"
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5" style={{ color: "#ffffff" }} />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}
