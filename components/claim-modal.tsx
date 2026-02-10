"use client"

import { useState } from "react"
import {
  CheckCircle2,
  Loader2,
  AlertTriangle,
  X,
  ArrowRight,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Check, Loader2, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type ClaimStep = "confirm" | "processing" | "success" | "error"

interface ClaimModalProps {
  open: boolean
  onClose: () => void
  title: string
  amount: string
  currency: string
  networkFee?: string
  onOpenChange: (open: boolean) => void
  category: string
  amount: string
  currency: string
  estimatedFee?: string
}

export function ClaimModal({
  open,
  onClose,
  title,
  amount,
  currency,
  networkFee = "~0.00005 SOL",
}: ClaimModalProps) {
  const [step, setStep] = useState<ClaimStep>("confirm")

  const handleConfirm = () => {
    setStep("processing")
    setTimeout(() => setStep("success"), 2200)
  }

  const handleClose = () => {
    setStep("confirm")
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="glass relative w-full max-w-sm rounded-2xl p-6 animate-slide-up">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {step === "confirm" && (
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-1 text-lg font-bold text-foreground">{title}</h3>
            <p className="mb-5 text-sm text-muted-foreground">
              Confirm to claim your earnings to your connected wallet.
            </p>

            <div className="mb-4 w-full space-y-2">
              <div className="flex items-center justify-between rounded-xl border border-border bg-muted/50 px-4 py-3 dark:bg-secondary/50">
                <span className="text-xs text-muted-foreground">Amount</span>
                <span className="font-mono text-sm font-bold text-foreground">
                  {amount} {currency}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border bg-muted/50 px-4 py-3 dark:bg-secondary/50">
                <span className="text-xs text-muted-foreground">
                  Network fee
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {networkFee}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border bg-muted/50 px-4 py-3 dark:bg-secondary/50">
                <span className="text-xs text-muted-foreground">
                  Destination
                </span>
                <span className="font-mono text-xs text-foreground">
                  8pe9...Am2d
                </span>
              </div>
            </div>

            <Button
              className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              onClick={handleConfirm}
            >
              Confirm Claim
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center py-6 text-center">
            <Loader2 className="mb-4 h-10 w-10 animate-spin text-primary" />
            <h3 className="mb-1 text-lg font-bold text-foreground">
              Processing...
            </h3>
            <p className="text-sm text-muted-foreground">
              Submitting your claim to the network.
            </p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center py-4 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neon-green/10">
              <CheckCircle2 className="h-7 w-7 text-neon-green" />
            </div>
            <h3 className="mb-1 text-lg font-bold text-foreground">
              Claim Successful
            </h3>
            <p className="mb-2 text-sm text-muted-foreground">
              {amount} {currency} has been sent to your wallet.
            </p>
            <p className="mb-5 font-mono text-xs text-muted-foreground">
              tx: 5KhR...mP4q
            </p>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={handleClose}
            >
              Done
            </Button>
          </div>
        )}

        {step === "error" && (
          <div className="flex flex-col items-center py-4 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-7 w-7 text-destructive" />
            </div>
            <h3 className="mb-1 text-lg font-bold text-foreground">
              Claim Failed
            </h3>
            <p className="mb-5 text-sm text-muted-foreground">
              Something went wrong. Please try again.
            </p>
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setStep("confirm")}
            >
              Retry
            </Button>
          </div>
        )}
      </div>
    </div>
  onOpenChange,
  category,
  amount,
  currency,
  estimatedFee = "~0.00025 SOL",
}: ClaimModalProps) {
  const [step, setStep] = useState<ClaimStep>("confirm")

  const handleClaim = () => {
    setStep("processing")
    setTimeout(() => {
      setStep("success")
    }, 2200)
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(() => setStep("confirm"), 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="glass-bright sm:max-w-md border-border/50">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {step === "success" ? "Claim Successful" : `Claim ${category}`}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {step === "confirm" && "Review your claim details before confirming."}
            {step === "processing" && "Your claim is being processed..."}
            {step === "success" && "Your earnings have been sent to your wallet."}
            {step === "error" && "Something went wrong. Please try again."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {/* Amount display */}
          <div className="rounded-xl border border-border/50 bg-muted/50 p-4 dark:bg-secondary/50 dark:border-transparent">
            <p className="text-xs text-muted-foreground mb-1">Amount to claim</p>
            <p className="text-2xl font-bold font-mono text-foreground">
              {amount}{" "}
              <span className="text-sm text-muted-foreground">{currency}</span>
            </p>
          </div>

          {/* Fee estimate */}
          {step === "confirm" && (
            <div className="flex items-center justify-between rounded-lg border border-border/30 bg-card px-3 py-2.5 text-sm">
              <span className="text-muted-foreground">Network fee</span>
              <span className="font-mono text-foreground text-xs">{estimatedFee}</span>
            </div>
          )}

          {/* Processing spinner */}
          {step === "processing" && (
            <div className="flex flex-col items-center gap-3 py-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Confirming transaction...
              </p>
            </div>
          )}

          {/* Success */}
          {step === "success" && (
            <div className="flex flex-col items-center gap-3 py-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neon-green/15">
                <Check className="h-6 w-6 text-neon-green" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                {amount} {currency} has been sent to your wallet.
              </p>
            </div>
          )}

          {/* Error */}
          {step === "error" && (
            <div className="flex flex-col items-center gap-3 py-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/15">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Transaction failed. Please try again.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            {step === "confirm" && (
              <>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleClaim}
                >
                  Confirm Claim
                </Button>
              </>
            )}
            {step === "success" && (
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleClose}>
                Done
              </Button>
            )}
            {step === "error" && (
              <>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleClaim}
                >
                  Retry
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
