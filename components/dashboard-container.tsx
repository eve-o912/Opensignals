"use client"

import { ExecutionCard } from "@/components/execution-card"
import { LiquidityDisplay } from "@/components/liquidity-display"
import { ExecutionStatus } from "@/components/execution-status"
import { VaultInfo } from "@/components/vault-info"
import { KeyMetrics } from "@/components/key-metrics"
import { useWallet } from "@/components/wallet-provider"
import { Button } from "@/components/ui/button"

export function DashboardContainer() {
  const { account } = useWallet()

  if (!account?.connected) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 flex flex-col items-center justify-center text-center">
        <div className="max-w-md">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6">
            <span className="text-2xl">🔗</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Connect Your Wallet</h2>
          <p className="text-muted-foreground mb-8">
            To use the OpenSignals Executor Protocol, please connect your wallet to get started with cross-chain
            execution.
          </p>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-semibold h-11">
            Connect Wallet in Header
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 space-y-8">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Execution Dashboard</h2>
        <p className="text-muted-foreground">Manage your cross-chain execution intents with Fusion Plus routing</p>
      </div>

      {/* Key Metrics */}
      <KeyMetrics />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ExecutionCard />
        </div>
        <div>
          <LiquidityDisplay />
        </div>
      </div>

      {/* Bottom Section - Vault & Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ExecutionStatus />
        </div>
        <div>
          <VaultInfo />
        </div>
      </div>
    </div>
  )
}
