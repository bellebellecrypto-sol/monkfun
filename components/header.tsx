"use client"

import { useState } from "react"
import { Menu, X, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Advanced", href: "#" },
  { label: "Create", href: "#" },
  { label: "Rakeback", href: "#", active: true },
  { label: "Rewards", href: "#" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">
            BONK<span className="text-primary">fun</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                link.active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Wallet */}
        <div className="flex items-center gap-3">
          <Button
            size="sm"
            className="hidden bg-primary text-primary-foreground hover:bg-primary/90 sm:flex"
          >
            8pe9Am...
          </Button>
          <button
            type="button"
            className="flex items-center justify-center rounded-md p-2 text-muted-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-border/50 px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  link.active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              size="sm"
              className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 sm:hidden"
            >
              8pe9Am...
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
