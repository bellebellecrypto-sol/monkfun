"use client"

import { HighRollerLounge } from "@/components/arena/high-roller-lounge"
import { CyberSlot } from "@/components/arena/cyber-slot"
import { RankHUD } from "@/components/arena/rank-hud"
import { EKGChart } from "@/components/arena/ekg-chart"
import { KineticVault } from "@/components/arena/kinetic-vault"
import { Zap } from "lucide-react"

function ArenaHeader() {
  return (
    <div className="flex items-center justify-between px-1">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-inferno to-[#ff4d2e] glow-inferno">
          <Zap className="h-5 w-5" style={{ color: "#ffffff" }} />
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
            MONK<span className="text-inferno text-glow-orange">fun</span>
          </h1>
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            {"Creator's Trading Arena"}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-1 rounded-full border border-toxic/20 bg-toxic/5 px-3 py-1.5 sm:flex">
          <div className="h-2 w-2 animate-pulse rounded-full bg-toxic" />
          <span className="text-xs font-bold text-toxic">LIVE</span>
        </div>
        <div className="rounded-full border border-border/50 bg-card/50 px-3 py-1.5">
          <span className="font-mono text-xs text-muted-foreground">8pe9Am...dK3x</span>
        </div>
      </div>
    </div>
  )
}

export function ArenaDashboard() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background p-3 sm:p-4 lg:p-5">
      {/* Header */}
      <div className="mb-3 shrink-0 sm:mb-4">
        <ArenaHeader />
      </div>

      {/* Quad Grid - Desktop */}
      <div className="hidden flex-1 gap-3 overflow-hidden lg:grid lg:grid-cols-[1fr_1.8fr_1fr] lg:grid-rows-[1fr_auto]">
        {/* Top Left: High Roller Lounge */}
        <div className="min-h-0 overflow-hidden">
          <HighRollerLounge />
        </div>

        {/* Center: Cyber Slot */}
        <div className="min-h-0 overflow-hidden">
          <CyberSlot />
        </div>

        {/* Top Right: Rank HUD */}
        <div className="min-h-0 overflow-hidden">
          <RankHUD />
        </div>

        {/* Bottom Spanning - EKG + Vault */}
        <div className="col-span-2">
          <EKGChart />
        </div>
        <div>
          <KineticVault />
        </div>
      </div>

      {/* Tablet Grid */}
      <div className="hidden flex-1 flex-col gap-3 overflow-y-auto md:flex lg:hidden">
        <div className="grid grid-cols-2 gap-3">
          <div className="min-h-[320px]">
            <HighRollerLounge />
          </div>
          <div className="min-h-[320px]">
            <RankHUD />
          </div>
        </div>
        <div className="min-h-[400px]">
          <CyberSlot />
        </div>
        <EKGChart />
        <div className="sticky bottom-0 z-10">
          <KineticVault />
        </div>
      </div>

      {/* Mobile Stack */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto pb-20 md:hidden">
        {/* Slot first on mobile - main attraction */}
        <div className="min-h-[380px]">
          <CyberSlot />
        </div>

        <EKGChart />

        <div className="min-h-[280px]">
          <HighRollerLounge />
        </div>

        <div className="min-h-[320px]">
          <RankHUD />
        </div>
      </div>

      {/* Mobile: Pinned Kinetic Vault */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-background/80 p-3 backdrop-blur-xl md:hidden">
        <KineticVault />
      </div>
    </div>
  )
}
