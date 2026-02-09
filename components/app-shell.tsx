"use client"

import { useState, createContext, useContext, useEffect, type ReactNode } from "react"
import {
  Home,
  ArrowLeftRight,
  PlusCircle,
  Gift,
  Trophy,
  User,
  Search,
  Zap,
  Clock,
  X,
  MoreHorizontal,
  Pin,
  PinOff,
  Coins,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { TierBadge, getTierByName, type TierName } from "@/components/tier-badge"
import { cn } from "@/lib/utils"

export type PageId =
  | "home"
  | "trade"
  | "token"
  | "create"
  | "rewards"
  | "earnings"
  | "leaderboard"
  | "profile"

interface NavigationContextValue {
  currentPage: PageId
  setPage: (page: PageId) => void
  selectedToken: string | null
  setSelectedToken: (token: string | null) => void
}

const NavigationContext = createContext<NavigationContextValue>({
  currentPage: "home",
  setPage: () => {},
  selectedToken: null,
  setSelectedToken: () => {},
})

export function useNavigation() {
  return useContext(NavigationContext)
}

/* ── Nav items ── */
const SIDEBAR_ITEMS: { id: PageId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "trade", label: "Trade", icon: ArrowLeftRight },
  { id: "create", label: "Create", icon: PlusCircle },
  { id: "rewards", label: "Rewards", icon: Gift },
  { id: "earnings", label: "Earnings", icon: Coins },
  { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  { id: "profile", label: "Profile", icon: User },
]

const BOTTOM_NAV_ITEMS: { id: PageId | "more"; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "trade", label: "Trade", icon: ArrowLeftRight },
  { id: "create", label: "Create", icon: PlusCircle },
  { id: "rewards", label: "Rewards", icon: Gift },
  { id: "more", label: "More", icon: MoreHorizontal },
]

const USER_TIER: TierName = "Gold"
const CYCLE_CASHBACK = "$1,876"
const RESET_LABEL = "2d 04h"
const CLAIMABLE_TOTAL = "$689"

/* ── Rewards Chip (header) ── */
function RewardsChip({ onClick }: { onClick: () => void }) {
  const config = getTierByName(USER_TIER)
  return (
    <button
      type="button"
      onClick={onClick}
      className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs transition-colors hover:border-primary/30 md:flex"
    >
      <TierBadge tier={USER_TIER} size="sm" />
      <span className="font-semibold" style={{ color: config.color }}>
        {USER_TIER}
      </span>
      <span className="text-muted-foreground">{CYCLE_CASHBACK}</span>
      <span className="flex items-center gap-0.5 text-muted-foreground">
        <Clock className="h-3 w-3" />
        {RESET_LABEL}
      </span>
    </button>
  )
}

/* ── Top Bar ── */
function TopBar({
  setPage,
}: {
  currentPage: PageId
  setPage: (page: PageId) => void
}) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="flex items-center justify-between px-4 py-2.5 lg:px-6">
        {/* Logo */}
        <button
          type="button"
          onClick={() => setPage("home")}
          className="flex items-center gap-2"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base font-bold text-foreground">
            MONK<span className="text-primary">fun</span>
          </span>
        </button>

        {/* Search (desktop) */}
        <div className="hidden flex-1 items-center justify-center px-6 md:flex">
          {searchOpen ? (
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tokens..."
                autoFocus
                className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                onBlur={() => setSearchOpen(false)}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex w-full max-w-md items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30"
            >
              <Search className="h-4 w-4" />
              <span>Search tokens...</span>
              <kbd className="ml-auto hidden rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground sm:inline-block">
                /
              </kbd>
            </button>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <RewardsChip onClick={() => setPage("rewards")} />
          {/* Claimable earnings chip */}
          <button
            type="button"
            onClick={() => setPage("earnings")}
            className="hidden items-center gap-1.5 rounded-full border border-neon-green/30 bg-neon-green/5 px-2.5 py-1.5 text-xs font-semibold text-neon-green transition-colors hover:bg-neon-green/10 md:flex"
          >
            <DollarSign className="h-3 w-3" />
            {CLAIMABLE_TOTAL}
          </button>
          <Button
            size="sm"
            className="hidden gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 lg:flex"
            onClick={() => setPage("create")}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            Create Coin
          </Button>
          <ThemeToggle className="hidden sm:flex" />
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs bg-transparent"
            onClick={() => setPage("profile")}
          >
            <User className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">8pe9Am...</span>
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="border-t border-border/30 px-4 py-2 md:hidden">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-2 text-sm text-muted-foreground">
          <Search className="h-4 w-4" />
          <span>Search tokens...</span>
        </div>
      </div>
    </header>
  )
}

/* ── Desktop Sidebar (collapsed, expands on hover, pinnable) ── */
function DesktopSidebar({
  currentPage,
  setPage,
}: {
  currentPage: PageId
  setPage: (page: PageId) => void
}) {
  const [pinned, setPinned] = useState(false)
  const [hovered, setHovered] = useState(false)
  const expanded = pinned || hovered

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-pinned")
    if (stored === "true") setPinned(true)
  }, [])

  const togglePin = () => {
    const next = !pinned
    setPinned(next)
    localStorage.setItem("sidebar-pinned", String(next))
  }

  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "hidden shrink-0 border-r border-border/50 transition-all duration-200 lg:block",
        expanded ? "w-52" : "w-[60px]"
      )}
    >
      <nav className="sticky top-[57px] flex flex-col gap-1 p-2">
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          return (
            <div key={item.id} className="relative group">
              <button
                type="button"
                onClick={() => setPage(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <span className="relative shrink-0">
                  <Icon className="h-4.5 w-4.5" />
                  {item.id === "earnings" && !expanded && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-primary px-0.5 text-[7px] font-bold text-primary-foreground">
                      $
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    "flex flex-1 items-center gap-2 truncate transition-opacity duration-200",
                    expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  {item.label}
                  {item.id === "earnings" && (
                    <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                      {CLAIMABLE_TOTAL}
                    </span>
                  )}
                </span>
              </button>
              {/* Tooltip when collapsed */}
              {!expanded && (
                <div className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1 text-xs font-medium text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                  {item.label}
                  {item.id === "earnings" && (
                    <span className="ml-1.5 text-primary">{CLAIMABLE_TOTAL} claimable</span>
                  )}
                </div>
              )}
            </div>
          )
        })}

        {/* Pin toggle */}
        <div className="mt-4 border-t border-border/50 pt-3">
          <button
            type="button"
            onClick={togglePin}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/50",
            )}
          >
            {pinned ? (
              <PinOff className="h-4 w-4 shrink-0" />
            ) : (
              <Pin className="h-4 w-4 shrink-0" />
            )}
            <span
              className={cn(
                "truncate transition-opacity duration-200",
                expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
              )}
            >
              {pinned ? "Unpin sidebar" : "Pin sidebar"}
            </span>
          </button>
        </div>
      </nav>
    </aside>
  )
}

/* ── Mobile Bottom Nav + More Sheet ── */
function MobileBottomNav({
  currentPage,
  setPage,
}: {
  currentPage: PageId
  setPage: (page: PageId) => void
}) {
  const [moreOpen, setMoreOpen] = useState(false)

  const handleNavClick = (id: PageId | "more") => {
    if (id === "more") {
      setMoreOpen(!moreOpen)
    } else {
      setPage(id)
      setMoreOpen(false)
    }
  }

  const isMoreActive = currentPage === "leaderboard" || currentPage === "profile" || currentPage === "earnings"
  const hasClaimable = true // mock: > 0

  return (
    <>
      {/* More sheet overlay */}
      {moreOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMoreOpen(false)}>
          <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
          <div
            className="absolute bottom-[60px] left-0 right-0 rounded-t-2xl border-t border-border bg-card p-4 shadow-xl animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
            <nav className="flex flex-col gap-1">
              {[
                { id: "earnings" as PageId, label: "Earnings", icon: Coins, badge: CLAIMABLE_TOTAL },
                { id: "leaderboard" as PageId, label: "Leaderboard", icon: Trophy, badge: null },
                { id: "profile" as PageId, label: "Profile & Settings", icon: User, badge: null },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-colors",
                      currentPage === item.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Bottom nav bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 lg:hidden">
        <div className="flex items-center justify-around px-1 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive =
              item.id === "more"
                ? isMoreActive || moreOpen
                : currentPage === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <span className="relative">
                  <Icon className="h-5 w-5" />
                  {item.id === "more" && hasClaimable && (
                    <span className="absolute -right-2.5 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-0.5 text-[7px] font-bold text-primary-foreground">
                      $
                    </span>
                  )}
                </span>
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}

/* ── App Shell ── */
export function AppShell({
  children,
}: {
  children: (ctx: NavigationContextValue) => ReactNode
}) {
  const [currentPage, setCurrentPage] = useState<PageId>("home")
  const [selectedToken, setSelectedToken] = useState<string | null>(null)

  const setPage = (page: PageId) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const ctx: NavigationContextValue = {
    currentPage,
    setPage,
    selectedToken,
    setSelectedToken,
  }

  return (
    <NavigationContext.Provider value={ctx}>
      <div className="flex min-h-screen flex-col bg-background transition-colors">
        <TopBar currentPage={currentPage} setPage={setPage} />
        <div className="flex flex-1">
          <DesktopSidebar currentPage={currentPage} setPage={setPage} />
          <main className="flex-1 pb-20 lg:pb-0">{children(ctx)}</main>
        </div>
        <MobileBottomNav currentPage={currentPage} setPage={setPage} />
      </div>
    </NavigationContext.Provider>
  )
}
