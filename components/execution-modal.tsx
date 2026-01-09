"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useExecution } from "@/components/execution-context"
import { CheckCircle2, AlertCircle, Loader } from "lucide-react"

export function ExecutionModal() {
  const { state, executeTransaction, resetExecution } = useExecution()

  const isOpen = state.status !== "idle"

  return (
    <Dialog open={isOpen} onOpenChange={resetExecution}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle>
            {state.status === "confirming" && "Confirm Transaction"}
            {state.status === "executing" && "Executing..."}
            {state.status === "success" && "Execution Successful"}
            {state.status === "failed" && "Execution Failed"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Confirming State */}
          {state.status === "confirming" && (
            <>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 border border-border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">From</span>
                    <span className="font-mono font-semibold text-foreground">
                      {state.amountIn} {state.tokenIn}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">To</span>
                    <span className="font-mono font-semibold text-secondary">
                      ~{state.minOutput} {state.tokenOut}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-sm text-muted-foreground">Selected LP</span>
                    <span className="font-semibold text-foreground">{state.selectedLP}</span>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex gap-2">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-primary">
                    Please confirm this transaction in your wallet. Gas will be deducted from your account.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={resetExecution} variant="outline" className="flex-1 bg-transparent">
                  Cancel
                </Button>
                <Button
                  onClick={executeTransaction}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold"
                >
                  Confirm in Wallet
                </Button>
              </div>
            </>
          )}

          {/* Executing State */}
          {state.status === "executing" && (
            <>
              <div className="flex flex-col items-center gap-4">
                <Loader className="w-12 h-12 text-primary animate-spin" />
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold text-foreground">Processing your execution</p>
                  <p className="text-sm text-muted-foreground">
                    Your transaction is being routed through {state.selectedLP}...
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                  <span className="text-xs text-muted-foreground font-mono">Processing</span>
                </div>
              </div>
            </>
          )}

          {/* Success State */}
          {state.status === "success" && (
            <>
              <div className="flex flex-col items-center gap-4">
                <CheckCircle2 className="w-12 h-12 text-secondary" />
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold text-foreground">Execution Successful</p>
                  <p className="text-sm text-muted-foreground">Your cross-chain transaction is complete</p>
                </div>
              </div>

              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Transaction Hash</span>
                  <a
                    href={`https://etherscan.io/tx/${state.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-secondary hover:underline text-xs"
                  >
                    {state.txHash?.slice(0, 12)}...
                  </a>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className="bg-secondary/10 text-secondary border-secondary/30 border">Confirmed</Badge>
                </div>
              </div>

              <Button
                onClick={resetExecution}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold"
              >
                Execute Another
              </Button>
            </>
          )}

          {/* Failed State */}
          {state.status === "failed" && (
            <>
              <div className="flex flex-col items-center gap-4">
                <AlertCircle className="w-12 h-12 text-destructive" />
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold text-foreground">Execution Failed</p>
                  <p className="text-sm text-muted-foreground">{state.errorMessage}</p>
                </div>
              </div>

              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <p className="text-sm text-destructive">
                  Your transaction could not be completed. Please try again or contact support.
                </p>
              </div>

              <div className="flex gap-3">
                <Button onClick={resetExecution} variant="outline" className="flex-1 bg-transparent">
                  Close
                </Button>
                <Button
                  onClick={resetExecution}
                  className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold"
                >
                  Try Again
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
