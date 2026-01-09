"use client"
import { WalletButton } from "@/components/wallet-button"
import { Menu } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="OpenSignals" width={48} height={48} className="w-12 h-12" priority />
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-foreground">OpenSignals</h1>
            <p className="text-xs text-muted-foreground">Executor Protocol</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <WalletButton />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 hover:bg-muted rounded-md transition-colors"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </header>
  )
}
