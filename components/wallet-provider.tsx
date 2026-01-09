"use client"

import { type ReactNode, useState } from "react"

export interface WalletAccount {
  address: string
  balance: string
  chainId: number
  connected: boolean
}

interface WalletContextType {
  account: WalletAccount | null
  isConnecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

import { createContext, useContext } from "react"
const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<WalletAccount | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  // Simulate MetaMask connection
  const connect = async () => {
    setIsConnecting(true)
    try {
      // Simulate wallet connection delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setAccount({
        address: "0x742d35Cc6634C0532925a3b844Bc3e704594f124",
        balance: "2.547",
        chainId: 1,
        connected: true,
      })
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setAccount(null)
  }

  return (
    <WalletContext.Provider value={{ account, isConnecting, connect, disconnect }}>{children}</WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider")
  }
  return context
}
