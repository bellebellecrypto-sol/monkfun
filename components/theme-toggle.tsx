"use client"

import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className={cn("h-9 w-[72px]", className)} />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex h-9 w-[72px] items-center rounded-full border border-border p-1 transition-colors",
        isDark ? "bg-secondary" : "bg-muted",
        className
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <Sun className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
      <Moon className="ml-auto mr-1 h-3.5 w-3.5 text-muted-foreground" />
      <span
        className={cn(
          "absolute flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform duration-200",
          isDark ? "translate-x-[36px]" : "translate-x-0"
        )}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5" />
        ) : (
          <Sun className="h-3.5 w-3.5" />
        )}
      </span>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
