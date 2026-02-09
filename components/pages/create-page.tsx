"use client"

import { useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  HelpCircle,
  ImagePlus,
  Link2,
  Rocket,
  Settings,
  Sparkles,
  Upload,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigation } from "@/components/app-shell"
import { cn } from "@/lib/utils"

const STEPS = [
  { label: "Basics", description: "Name & symbol" },
  { label: "Media", description: "Image & links" },
  { label: "Settings", description: "Supply & options" },
  { label: "Review", description: "Confirm details" },
  { label: "Launch", description: "Go live" },
]

/* ── Stepper ── */
function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
      {STEPS.map((step, i) => (
        <div key={step.label} className="flex items-center gap-1.5">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-colors",
                i < currentStep
                  ? "border-primary bg-primary text-primary-foreground"
                  : i === currentStep
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground"
              )}
            >
              {i < currentStep ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <div className="hidden sm:block">
              <p
                className={cn(
                  "text-xs font-semibold",
                  i <= currentStep ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </p>
              <p className="text-[10px] text-muted-foreground">{step.description}</p>
            </div>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={cn(
                "h-px w-4 sm:w-8 shrink-0",
                i < currentStep ? "bg-primary" : "bg-border"
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Preview Card ── */
function PreviewCard({
  name,
  symbol,
  launchType,
  imagePreview,
  website,
  twitter,
  initialSupply,
}: {
  name: string
  symbol: string
  launchType: "classic" | "bonkers"
  imagePreview: string | null
  website: string
  twitter: string
  initialSupply: string
}) {
  return (
    <div className="glass rounded-2xl border border-primary/20 p-5">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Preview
        </span>
      </div>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-primary/10 text-sm font-bold text-primary">
          {imagePreview ? (
            <div className="h-full w-full bg-primary/20 flex items-center justify-center">
              <ImagePlus className="h-5 w-5 text-primary/50" />
            </div>
          ) : (
            (symbol || "??").slice(0, 2).toUpperCase()
          )}
        </div>
        <div>
          <p className="text-base font-bold text-foreground">
            {name || "Your Token"}
          </p>
          <p className="text-xs font-mono text-muted-foreground">
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
          <p className="text-sm font-bold capitalize text-foreground">
            {launchType}
          </p>
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
        {initialSupply && (
          <div className="col-span-2 rounded-lg bg-muted/50 px-3 py-2 dark:bg-secondary/30">
            <p className="text-[10px] text-muted-foreground">Initial Supply</p>
            <p className="text-sm font-bold font-mono text-foreground">
              {Number(initialSupply).toLocaleString()} tokens
            </p>
          </div>
        )}
      </div>
      {(website || twitter) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {website && (
            <span className="flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
              <Link2 className="h-2.5 w-2.5" /> Website
            </span>
          )}
          {twitter && (
            <span className="flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
              <Link2 className="h-2.5 w-2.5" /> Twitter
            </span>
          )}
        </div>
      )}
    </div>
  )
}

/* ── Tooltip ── */
function Tooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex">
      <HelpCircle className="h-3.5 w-3.5 cursor-help text-muted-foreground" />
      <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 text-[11px] text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100">
        {text}
      </span>
    </span>
  )
}

/* ── Main Page ── */
export function CreatePage() {
  const { setPage } = useNavigation()
  const [step, setStep] = useState(0)

  // Step 1: Basics
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [description, setDescription] = useState("")

  // Step 2: Media
  const [website, setWebsite] = useState("")
  const [twitter, setTwitter] = useState("")
  const [telegram, setTelegram] = useState("")

  // Step 3: Settings
  const [launchType, setLaunchType] = useState<"classic" | "bonkers">("classic")
  const [initialSupply, setInitialSupply] = useState("1000000000")
  const [mintAuthRevoked, setMintAuthRevoked] = useState(true)

  // Step 5: Launch
  const [launched, setLaunched] = useState(false)

  const canProceed =
    step === 0
      ? name.length > 0 && symbol.length > 0
      : true

  return (
    <div className="mx-auto max-w-5xl px-4 py-5 lg:px-6">
      {/* Back */}
      <button
        type="button"
        onClick={() => (step > 0 ? setStep(step - 1) : setPage("home"))}
        className="mb-5 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {step > 0 ? "Back" : "Home"}
      </button>

      {/* Stepper */}
      <div className="mb-6">
        <Stepper currentStep={step} />
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        {/* Main form area */}
        <div className="lg:col-span-3">
          {/* Step 0: Basics */}
          {step === 0 && (
            <div className="glass rounded-2xl p-5 sm:p-6 space-y-5">
              <div>
                <h2 className="mb-1 text-lg font-bold text-foreground">
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

          {/* Step 1: Media */}
          {step === 1 && (
            <div className="glass rounded-2xl p-5 sm:p-6 space-y-5">
              <div>
                <h2 className="mb-1 text-lg font-bold text-foreground">
                  Media & Links
                </h2>
                <p className="text-sm text-muted-foreground">
                  Add an image and social links for your token.
                </p>
              </div>
              {/* Image upload area */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Token Image
                </label>
                <div className="flex h-36 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border transition-colors hover:border-primary/40 hover:bg-primary/5">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Upload className="h-8 w-8" />
                    <span className="text-sm font-medium">
                      Click or drag to upload
                    </span>
                    <span className="text-[11px]">PNG, JPG, GIF up to 5MB</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-foreground">
                  Website (optional)
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourtoken.com"
                  className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">
                    Twitter (optional)
                  </label>
                  <input
                    type="text"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    placeholder="@yourtoken"
                    className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-foreground">
                    Telegram (optional)
                  </label>
                  <input
                    type="text"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    placeholder="t.me/yourtoken"
                    className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Settings */}
          {step === 2 && (
            <div className="glass rounded-2xl p-5 sm:p-6 space-y-5">
              <div>
                <h2 className="mb-1 text-lg font-bold text-foreground">
                  Launch Settings
                </h2>
                <p className="text-sm text-muted-foreground">
                  Choose your launch type and configure token settings.
                </p>
              </div>

              {/* Launch type selection */}
              <div>
                <div className="mb-2 flex items-center gap-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Launch Type
                  </label>
                  <Tooltip text="Classic has 0% creator fees. Bonkers gives you 2% creator fee with higher long-term revshare." />
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
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
                    <p className="mb-1 text-sm font-bold text-foreground">
                      Classic
                    </p>
                    <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                      Zero creator fees. Maximum community trust. Standard
                      holder rakeback rates.
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <HelpCircle className="h-3 w-3" />
                      Best for community coins
                    </div>
                  </button>

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
                    <p className="mb-1 text-sm font-bold text-foreground">
                      Bonkers
                    </p>
                    <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
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

              {/* Supply */}
              <div>
                <div className="mb-1.5 flex items-center gap-1.5">
                  <label className="text-xs font-medium text-foreground">
                    Initial Supply
                  </label>
                  <Tooltip text="The total number of tokens created at launch." />
                </div>
                <input
                  type="text"
                  value={initialSupply}
                  onChange={(e) =>
                    setInitialSupply(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="w-full rounded-lg border border-border bg-card px-3 py-2.5 font-mono text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                />
              </div>

              {/* Revoke mint authority */}
              <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3">
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Revoke Mint Authority
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      No new tokens can ever be minted
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMintAuthRevoked(!mintAuthRevoked)}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    mintAuthRevoked ? "bg-primary" : "bg-border"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-card shadow transition-transform",
                      mintAuthRevoked && "translate-x-5"
                    )}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="glass rounded-2xl p-5 sm:p-6 space-y-5">
              <div>
                <h2 className="mb-1 text-lg font-bold text-foreground">
                  Review & Confirm
                </h2>
                <p className="text-sm text-muted-foreground">
                  Double-check your token details before launching.
                </p>
              </div>
              <div className="divide-y divide-border/50 rounded-xl border border-border">
                {[
                  { label: "Name", value: name },
                  { label: "Symbol", value: `$${symbol}` },
                  {
                    label: "Launch Type",
                    value:
                      launchType === "classic"
                        ? "Classic (0% creator fee)"
                        : "Bonkers (2% creator fee)",
                  },
                  {
                    label: "Supply",
                    value: Number(initialSupply).toLocaleString(),
                  },
                  {
                    label: "Mint Authority",
                    value: mintAuthRevoked ? "Revoked" : "Active",
                  },
                  { label: "Description", value: description || "None" },
                  { label: "Website", value: website || "None" },
                  { label: "Twitter", value: twitter || "None" },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <span className="text-xs text-muted-foreground">
                      {row.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Launch */}
          {step === 4 && (
            <div className="glass rounded-2xl p-5 sm:p-6 space-y-5">
              {!launched ? (
                <>
                  <div className="flex flex-col items-center gap-3 py-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 animate-pulse-glow">
                      <Rocket className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground">
                      Ready to Launch
                    </h2>
                    <p className="max-w-sm text-sm text-muted-foreground">
                      Your token <strong>{name}</strong> (${symbol}) is ready.
                      Once launched, it will be live and tradeable on MONKfun.
                    </p>
                  </div>
                  <Button
                    className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold animate-pulse-glow"
                    onClick={() => setLaunched(true)}
                  >
                    <Rocket className="h-4 w-4" />
                    Launch Token
                  </Button>
                </>
              ) : (
                <div className="flex flex-col items-center gap-4 py-10 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neon-green/10">
                    <Check className="h-8 w-8 text-neon-green" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground">
                    Token Launched!
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    <strong>{name}</strong> (${symbol}) is now live.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => setPage("token")}
                    >
                      View Token
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-transparent"
                      onClick={() => setPage("home")}
                    >
                      Back to Home
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation buttons */}
          {step < 4 && (
            <div className="mt-4 flex justify-between">
              {step > 0 ? (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="gap-2 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {step === 3 ? "Proceed to Launch" : "Continue"}
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
              imagePreview={null}
              website={website}
              twitter={twitter}
              initialSupply={initialSupply}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
