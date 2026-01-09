"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/wallet-provider"
import { Copy, LogOut } from "lucide-react"
import { useState } from "react"

export function WalletButton() {
  const { account, isConnecting, connect, disconnect } = useWallet()
  const [copied, setCopied] = useState(false)

  if (!account?.connected) {
    return (
      <Button
        onClick={connect}
        disabled={isConnecting}
        className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground font-semibold"
      >
        {isConnecting ? "Connecting..." : "Connect Wallet"}
      </Button>
    )
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(account.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-sm font-mono transition-colors"
      >
        {account.address.slice(0, 6)}...{account.address.slice(-4)}
        <Copy className="w-4 h-4" />
      </button>
      <Button onClick={disconnect} variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  )
}
