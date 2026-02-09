"use client"

import { useState, createContext, useContext, type ReactNode } from "react"
import {
  Home,
  ArrowLeftRight,
  Coins,
  PlusCircle,
  Gift,
  Trophy,
  User,
  Search,
  Zap,
  Clock,
  X,
  Menu,
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

const NAV_ITEMS: { id: PageId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "trade", label: "Trade", icon: ArrowLeftRight },
  { id: "create", label: "Create", icon: PlusCircle },
  { id: "rewards", label: "Rewards", icon: Gift },
  { id: "leaderboard", label: "Leaderboard", icon: Trophy },
]

const USER_TIER: TierName = "Gold"
const CYCLE_CASHBACK = "$1,876"
const RESET_LABEL = "2d 04h"

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

function TopBar({
  currentPage,
  setPage,
}: {
  currentPage: PageId
  setPage: (page: PageId) => void
}) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="flex items-center justify-between px-4 py-2.5 lg:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
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
        </div>

        {/* Search */}
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
          <Button
            size="sm"
            className="hidden bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5 lg:flex"
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
          <button
            type="button"
            className="flex items-center justify-center rounded-md p-2 text-muted-foreground lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="border-t border-border/30 px-4 py-2 md:hidden">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-2 text-sm text-muted-foreground">
          <Search className="h-4 w-4" />
          <span>Search tokens...</span>
        </div>
      </div>

      {/* Mobile dropdown nav */}
      {mobileMenuOpen && (
        <div className="border-t border-border/50 px-4 pb-4 lg:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setPage(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    currentPage === item.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              )
            })}
            <div className="mt-2 flex items-center gap-2 px-3">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function DesktopSidebar({
  currentPage,
  setPage,
}: {
  currentPage: PageId
  setPage: (page: PageId) => void
}) {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-border/50 lg:block">
      <nav className="sticky top-[57px] flex flex-col gap-1 p-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setPage(item.id)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                currentPage === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          )
        })}
        <div className="mt-4 border-t border-border/50 pt-4">
          <button
            type="button"
            onClick={() => setPage("profile")}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              currentPage === "profile"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            <User className="h-4 w-4" />
            Profile
          </button>
        </div>
      </nav>
    </aside>
  )
}

function MobileBottomNav({
  currentPage,
  setPage,
}: {
  currentPage: PageId
  setPage: (page: PageId) => void
}) {
  const bottomItems = NAV_ITEMS.slice(0, 5)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/50 lg:hidden">
      <div className="flex items-center justify-around px-1 py-1.5">
        {bottomItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setPage(item.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5",
                  isActive && item.id === "create" && "text-primary"
                )}
              />
              {item.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export function AppShell({ children }: { children: (ctx: NavigationContextValue) => ReactNode }) {
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
          <main className="flex-1 pb-20 lg:pb-0">
            {children(ctx)}
          </main>
        </div>
        <MobileBottomNav currentPage={currentPage} setPage={setPage} />
      </div>
    </NavigationContext.Provider>
  )
}
