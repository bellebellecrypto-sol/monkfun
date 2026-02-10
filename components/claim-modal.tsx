"use client"

import { useState } from "react"
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
  onOpenChange: (open: boolean) => void
  category: string
  amount: string
  currency: string
  estimatedFee?: string
}

export function ClaimModal({
  open,
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
