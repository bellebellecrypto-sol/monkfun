"use client"

import { useEffect, useState } from "react"
import { DollarSign, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface EarningsToastProps {
  amount: number
  show: boolean
  onClose: () => void
}

export function EarningsToast({ amount, show, onClose }: EarningsToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setTimeout(onClose, 300)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show && !visible) return null

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-primary/20 bg-card px-4 py-3 shadow-lg transition-all duration-300 dark:shadow-2xl glow-orange-sm",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0"
      )}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
        <DollarSign className="h-5 w-5 text-primary" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">You earned today</p>
        <p className="text-base font-bold text-primary font-mono animate-count-up">
          ${amount.toFixed(2)}
        </p>
      </div>
      <button
        type="button"
        onClick={() => {
          setVisible(false)
          setTimeout(onClose, 300)
        }}
        className="ml-2 text-muted-foreground hover:text-foreground"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
