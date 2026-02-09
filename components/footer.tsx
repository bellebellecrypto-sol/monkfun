import { Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 dark:bg-card/30">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row lg:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
            <Zap className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-foreground">
            BONK<span className="text-primary">fun</span>
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">
            Home
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Advanced
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-foreground transition-colors">
            Privacy
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          {"2026 Let's BONK! All Rights Reserved."}
        </p>
      </div>
    </footer>
  )
}
