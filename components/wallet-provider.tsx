"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

interface Account {
  address: string
  balance: string
  chainId: number
  connected: boolean
}

interface WalletContextType {
  account: Account | null
  isConnecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  // Wallet connection with proper error handling
  const connect = async () => {
    setIsConnecting(true)
    try {
      // Check if MetaMask is installed
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
          // Request account access
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
          const chainId = await window.ethereum.request({ method: "eth_chainId" })
          
          setAccount({
            address: accounts[0],
            balance: "2.547", // Would fetch real balance in production
            chainId: parseInt(chainId, 16),
            connected: true,
          })
        } catch (err: unknown) {
          if (err && typeof err === 'object' && 'code' in err && err.code === 4001) {
            console.log("User rejected the connection request")
          } else {
            console.error("MetaMask error:", err)
          }
          throw err
        }
      } else {
        // Fallback to simulated connection for demo
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setAccount({
          address: "0x742d35Cc6634C0532925a3b844Bc3e704594f124",
          balance: "2.547",
          chainId: 1,
          connected: true,
        })
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setAccount(null)
  }

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect()
        } else if (account) {
          setAccount({ ...account, address: accounts[0] })
        }
      }

      const handleChainChanged = (chainId: string) => {
        if (account) {
          setAccount({ ...account, chainId: parseInt(chainId, 16) })
        }
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [account])

  return (
    <WalletContext.Provider value={{ account, isConnecting, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

// Type declaration for window.ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}
