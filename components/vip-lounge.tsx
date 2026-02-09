"use client"

import { useState } from "react"
import { Crown, Lock, MessageCircle, Send, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const VIP_MESSAGES = [
  {
    wallet: "7xKp...mR4d",
    msg: "Just claimed 2.4 SOL rakeback. LFG!",
    time: "2m ago",
    tier: "Master",
  },
  {
    wallet: "3bNf...qL7w",
    msg: "Diamond tier unlocked this epoch. Feels good.",
    time: "5m ago",
    tier: "Diamond",
  },
  {
    wallet: "9cYt...jP2x",
    msg: "Who else farming the leaderboard today?",
    time: "12m ago",
    tier: "Diamond",
  },
  {
    wallet: "5dRm...kN8v",
    msg: "200k vol this week, coming for that Diamond badge",
    time: "18m ago",
    tier: "Platinum",
  },
]

export function VipLounge({
  isVip = false,
  className,
}: {
  isVip?: boolean
  className?: string
}) {
  const [message, setMessage] = useState("")

  return (
    <div
      className={cn(
        "glass rounded-2xl overflow-hidden relative",
        isVip ? "glow-diamond" : "",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-diamond" />
          <h3 className="text-sm font-bold text-foreground">
            Diamond+ VIP Lounge
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5" />
          <span>24 online</span>
        </div>
      </div>

      {/* Chat area */}
      <div className="relative">
        {!isVip && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-card/90 backdrop-blur-sm dark:bg-background/80">
            <Lock className="mb-2 h-6 w-6 text-muted-foreground" />
            <p className="mb-1 text-sm font-semibold text-foreground">
              VIP Access Required
            </p>
            <p className="mb-3 text-xs text-muted-foreground">
              Reach Diamond tier to unlock
            </p>
            <Button
              size="sm"
              variant="outline"
              className="border-diamond/30 text-diamond hover:bg-diamond/10 hover:text-diamond bg-transparent"
            >
              View Requirements
            </Button>
          </div>
        )}

        <div className="h-52 space-y-3 overflow-y-auto p-4 sm:px-6">
          {VIP_MESSAGES.map((msg, i) => (
            <div
              key={`${msg.wallet}-${i}`}
              className={cn(
                "animate-slide-up",
                !isVip && "blur-[2px] select-none"
              )}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start gap-2">
                <div
                  className={cn(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold",
                    msg.tier === "Master"
                      ? "bg-primary/20 text-primary"
                      : msg.tier === "Diamond"
                        ? "bg-diamond/20 text-diamond"
                        : "bg-[#A0AEC0]/20 text-[#A0AEC0]"
                  )}
                >
                  {msg.tier[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-foreground">
                      {msg.wallet}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {msg.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {msg.msg}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t border-border/50 p-3 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder={
                  isVip ? "Message VIP chat..." : "Unlock to chat..."
                }
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!isVip}
                className="w-full rounded-lg border border-border/50 bg-muted/50 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-transparent dark:bg-secondary/60"
              />
            </div>
            <Button
              size="icon"
              className="h-8 w-8 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={!isVip || !message}
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
