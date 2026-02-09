"use client"

import { useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  HelpCircle,
  Rocket,
  Zap,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigation } from "@/components/app-shell"
import { cn } from "@/lib/utils"

const STEPS = [
  { label: "Details", description: "Name & symbol" },
  { label: "Launch Type", description: "Fee structure" },
  { label: "Review", description: "Confirm & launch" },
]

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((step, i) => (
        <div key={step.label} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-colors",
                i < currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : i === currentStep
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground"
              )}
            >
              {i < currentStep ? (
                <Check className="h-4 w-4" />
              ) : (
                i + 1
              )}
            </div>
            <div className="hidden sm:block">
              <p className={cn(
                "text-xs font-semibold",
                i <= currentStep ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.label}
              </p>
              <p className="text-[10px] text-muted-foreground">{step.description}</p>
            </div>
          </div>
          {i < STEPS.length - 1 && (
            <div className={cn(
              "h-px w-6 sm:w-10",
              i < currentStep ? "bg-primary" : "bg-border"
            )} />
          )}
        </div>
      ))}
    </div>
  )
}

function PreviewCard({
  name,
  symbol,
  launchType,
}: {
  name: string
  symbol: string
  launchType: "classic" | "bonkers"
}) {
  return (
    <div className="glass rounded-2xl p-5 border border-primary/20">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Preview
        </span>
      </div>
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
          {(symbol || "??").slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="text-base font-bold text-foreground">
            {name || "Your Token"}
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            ${symbol || "SYMBOL"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-muted/50 px-3 py-2 dark:bg-secondary/30">
          <p className="text-[10px] text-muted-foreground">Market Cap</p>
          <p className="text-sm font-bold font-mono text-foreground">$0.00</p>
        </div>
        <div className="rounded-lg bg-muted/50 px-3 py-2 dark:bg-secondary/30">
          <p className="text-[10px] text-muted-foreground">Launch Type</p>
          <p className="text-sm font-bold text-foreground capitalize">{launchType}</p>
        </div>
        <div className="rounded-lg bg-muted/50 px-3 py-2 dark:bg-secondary/30">
          <p className="text-[10px] text-muted-foreground">Creator Fee</p>
          <p className="text-sm font-bold font-mono text-foreground">
            {launchType === "classic" ? "0%" : "2%"}
          </p>
        </div>
        <div className="rounded-lg bg-muted/50 px-3 py-2 dark:bg-secondary/30">
          <p className="text-[10px] text-muted-foreground">Holder Rakeback</p>
          <p className="text-sm font-bold font-mono text-foreground">
            {launchType === "classic" ? "Standard" : "Boosted"}
          </p>
        </div>
      </div>
    </div>
  )
}

export function CreatePage() {
  const { setPage } = useNavigation()
  const [step, setStep] = useState(0)
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [description, setDescription] = useState("")
  const [launchType, setLaunchType] = useState<"classic" | "bonkers">("classic")

  const canProceed = step === 0 ? name.length > 0 && symbol.length > 0 : true

  return (
    <div className="mx-auto max-w-5xl px-4 py-5 lg:px-6">
      {/* Back */}
      <button
        type="button"
        onClick={() => step > 0 ? setStep(step - 1) : setPage("home")}
        className="mb-5 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {step > 0 ? "Back" : "Home"}
      </button>

      {/* Stepper */}
      <div className="mb-6">
        <Stepper currentStep={step} />
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        {/* Main form */}
        <div className="lg:col-span-3">
          {step === 0 && (
            <div className="glass rounded-2xl p-5 sm:p-6 space-y-5">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-1">
                  Token Details
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose a name and symbol for your token.
                </p>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Token Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dark Horse"
                  className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Symbol
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <input
                    type="text"
                    value={symbol}
                    onChange={(e) =>
                      setSymbol(e.target.value.toUpperCase().slice(0, 10))
                    }
                    placeholder="DARKHORSE"
                    className="w-full rounded-lg border border-border bg-card py-2.5 pl-7 pr-3 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Description (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell people about your token..."
                  rows={3}
                  className="w-full resize-none rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="glass rounded-2xl p-5 sm:p-6 space-y-5">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-1">
                  Launch Type
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose how your token generates revenue.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {/* Classic */}
                <button
                  type="button"
                  onClick={() => setLaunchType("classic")}
                  className={cn(
                    "flex flex-col items-start rounded-xl border-2 p-5 text-left transition-all",
                    launchType === "classic"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Rocket className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm font-bold text-foreground mb-1">Classic</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    Zero creator fees. Maximum community trust. Standard holder
                    rakeback rates apply.
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <HelpCircle className="h-3 w-3" />
                    Best for community coins
                  </div>
                </button>

                {/* Bonkers */}
                <button
                  type="button"
                  onClick={() => setLaunchType("bonkers")}
                  className={cn(
                    "flex flex-col items-start rounded-xl border-2 p-5 text-left transition-all",
                    launchType === "bonkers"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  )}
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10">
                    <Zap className="h-5 w-5 text-gold" />
                  </div>
                  <p className="text-sm font-bold text-foreground mb-1">Bonkers</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    2% creator fee with higher long-term revshare. Boosted
                    rakeback for holders.
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <HelpCircle className="h-3 w-3" />
                    Best for creator revenue
                  </div>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="glass rounded-2xl p-5 sm:p-6 space-y-5">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-1">
                  Review & Launch
                </h2>
                <p className="text-sm text-muted-foreground">
                  Confirm your token details before launching.
                </p>
              </div>
              <div className="divide-y divide-border/50 rounded-xl border border-border">
                {[
                  { label: "Name", value: name },
                  { label: "Symbol", value: `$${symbol}` },
                  { label: "Launch Type", value: launchType === "classic" ? "Classic (0% creator fee)" : "Bonkers (2% creator fee)" },
                  { label: "Description", value: description || "None" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <span className="text-xs text-muted-foreground">{row.label}</span>
                    <span className="text-sm font-medium text-foreground">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <Button
                className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold animate-pulse-glow"
                onClick={() => setPage("home")}
              >
                <Rocket className="h-4 w-4" />
                Launch Token
              </Button>
            </div>
          )}

          {/* Navigation buttons */}
          {step < 2 && (
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Preview sidebar */}
        <div className="lg:col-span-2">
          <div className="sticky top-[105px]">
            <PreviewCard
              name={name}
              symbol={symbol}
              launchType={launchType}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
