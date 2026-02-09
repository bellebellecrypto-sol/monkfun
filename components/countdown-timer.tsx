"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

function getTimeLeft(endDate: Date) {
  const now = new Date()
  const diff = endDate.getTime() - now.getTime()

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds, total: diff }
}

export function CountdownTimer({
  endDate,
  className,
}: {
  endDate: Date
  className?: string
}) {
  const [time, setTime] = useState(getTimeLeft(endDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft(endDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [endDate])

  const blocks = [
    { value: time.days, label: "Days" },
    { value: time.hours, label: "Hrs" },
    { value: time.minutes, label: "Min" },
    { value: time.seconds, label: "Sec" },
  ]

  return (
    <div className={cn("flex items-center gap-1.5 sm:gap-2", className)}>
      {blocks.map((block, i) => (
        <div key={block.label} className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex flex-col items-center">
            <div className="glass-bright flex h-10 w-10 items-center justify-center rounded-lg text-base font-bold tabular-nums text-foreground sm:h-12 sm:w-12 sm:text-lg">
              {String(block.value).padStart(2, "0")}
            </div>
            <span className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
              {block.label}
            </span>
          </div>
          {i < blocks.length - 1 && (
            <span className="mb-4 text-lg font-bold text-muted-foreground/50">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
