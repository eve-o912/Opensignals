"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useExecution } from "@/components/execution-context"
import { useState, useEffect } from "react"
import { ChevronDown, TrendingUp } from "lucide-react"

export function ExecutionCard() {
  const { state, updateIntentField, executeTransaction, calculateFees } = useExecution()
  const [showAdvanced, setShowAdvanced] = useState(false)

  useEffect(() => {
    calculateFees()
  }, [state.minOutput, state.defiWithdrawalLimit, state.cefiWithdrawalLimit, state.userHasEnoughGas])

  const estimatedOutput = Number.parseFloat(state.minOutput) * (1 + state.slippage / 100)
  const totalCost = Number.parseFloat(state.estimatedGasNeeded) + state.platformFeeUSDT

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Execution Intent</CardTitle>
            <CardDescription>Define your cross-chain withdrawal parameters</CardDescription>
          </div>
          <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/30">
            Active
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Token Swap Section */}
        <div className="space-y-4">
          <label className="text-sm font-semibold text-foreground">Withdrawal Details</label>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-muted-foreground uppercase tracking-wide">From</label>
              <div className="flex items-center gap-3 bg-input border border-border rounded-lg px-4 py-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={state.amountIn}
                    onChange={(e) => updateIntentField("amountIn", e.target.value)}
                    className="w-full bg-transparent text-lg font-semibold text-foreground outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div className="text-sm font-medium text-secondary">{state.tokenIn}</div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-muted-foreground uppercase tracking-wide">To</label>
              <div className="flex items-center gap-3 bg-input border border-border rounded-lg px-4 py-3">
                <div className="flex-1">
                  <div className="text-lg font-semibold text-foreground">{estimatedOutput.toFixed(2)}</div>
                </div>
                <div className="text-sm font-medium text-secondary">{state.tokenOut}</div>
              </div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-center py-2">
            1 {state.tokenIn} ≈ {(estimatedOutput / Number.parseFloat(state.amountIn)).toFixed(2)} {state.tokenOut}
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-border">
          <label className="text-sm font-semibold text-foreground">Withdrawal Limits</label>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide">DeFi Limit</label>
              <input
                type="text"
                value={state.defiWithdrawalLimit}
                onChange={(e) => updateIntentField("defiWithdrawalLimit", e.target.value)}
                className="mt-2 w-full bg-input border border-border rounded-md px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-xs text-muted-foreground mt-1">Max withdrawal from DeFi</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide">CeFi Limit</label>
              <input
                type="text"
                value={state.cefiWithdrawalLimit}
                onChange={(e) => updateIntentField("cefiWithdrawalLimit", e.target.value)}
                className="mt-2 w-full bg-input border border-border rounded-md px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <p className="text-xs text-muted-foreground mt-1">Max withdrawal from CeFi</p>
            </div>
          </div>
        </div>

        {/* Execution Parameters */}
        <div className="space-y-4 pt-4 border-t border-border">
          <label className="text-sm font-semibold text-foreground">Execution Rules</label>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide">Min Output</label>
              <input
                type="text"
                value={state.minOutput}
                onChange={(e) => updateIntentField("minOutput", e.target.value)}
                className="mt-2 w-full bg-input border border-border rounded-md px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide">Max Slippage</label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  value={state.slippage}
                  onChange={(e) => updateIntentField("slippage", Number.parseFloat(e.target.value))}
                  className="flex-1 bg-input border border-border rounded-md px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  step="0.1"
                />
                <span className="text-sm font-medium text-muted-foreground">%</span>
              </div>
            </div>
          </div>
        </div>

        {Number.parseFloat(state.topUpAmountNeeded) > 0 && (
          <div className="px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-primary">Top-up Available</p>
              <p className="text-xs text-primary/80">
                We can add {state.topUpAmountNeeded} {state.tokenOut} to reach your limit
              </p>
            </div>
          </div>
        )}

        {/* Advanced Options */}
        <div className="pt-2 border-t border-border">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2 text-sm text-secondary hover:text-secondary/80 transition-colors"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
            Advanced Options
          </button>

          {showAdvanced && (
            <div className="mt-4 space-y-4 pt-4 border-t border-border/50">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Est. Gas (ETH)</label>
                <input
                  type="text"
                  value={state.estimatedGasNeeded}
                  onChange={(e) => updateIntentField("estimatedGasNeeded", e.target.value)}
                  className="mt-2 w-full bg-input border border-border rounded-md px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Max Fee (GWEI)</label>
                <input
                  type="text"
                  value={state.maxGasPrice}
                  onChange={(e) => updateIntentField("maxGasPrice", e.target.value)}
                  className="mt-2 w-full bg-input border border-border rounded-md px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Deadline (seconds)</label>
                <input
                  type="text"
                  value={state.deadline}
                  onChange={(e) => updateIntentField("deadline", Number.parseInt(e.target.value))}
                  className="mt-2 w-full bg-input border border-border rounded-md px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Has Gas Available</label>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={state.userHasEnoughGas}
                    onChange={(e) => updateIntentField("userHasEnoughGas", e.target.checked)}
                    className="w-4 h-4 rounded border-border bg-input"
                  />
                  <span className="text-sm text-foreground">User has enough gas to pay</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3 pt-4 border-t border-border bg-muted/40 rounded-lg p-4">
          <p className="text-sm font-semibold text-foreground">Fee Breakdown</p>

          {Number.parseFloat(state.gasSubsidyAmount) > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Gas Subsidy (Our Cost)</span>
              <span className="font-mono text-secondary">-{state.gasSubsidyAmount} ETH</span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Platform Fee</span>
            <span className="font-mono text-secondary">-${state.platformFeeUSDT.toFixed(2)}</span>
          </div>

          {Number.parseFloat(state.topUpAmountNeeded) > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Top-up Amount (Our Contribution)</span>
              <span className="font-mono text-primary">
                +{state.topUpAmountNeeded} {state.tokenOut}
              </span>
            </div>
          )}

          <div className="pt-2 border-t border-border/50 flex items-center justify-between text-sm">
            <span className="text-foreground font-medium">Total Cost to User</span>
            <span className="font-mono text-primary font-semibold">${state.platformFeeUSDT.toFixed(2)}</span>
          </div>
        </div>

        {/* Execution Summary */}
        <div className="space-y-3 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Withdrawal Method</span>
            <Badge className="bg-primary/10 text-primary border-primary/30 border capitalize">{state.selectedLP}</Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Estimated Time</span>
            <span className="font-mono text-foreground">12-45 seconds</span>
          </div>
        </div>

        {/* Execute Button */}
        <Button
          onClick={executeTransaction}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold h-12 text-base transition-all hover:shadow-lg hover:shadow-primary/20"
        >
          Execute Withdrawal
        </Button>

        <div className="text-xs text-muted-foreground text-center">
          By executing, you agree to the{" "}
          <a href="#" className="text-secondary hover:underline">
            execution terms
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
