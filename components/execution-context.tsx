"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface ExecutionState {
  tokenIn: string
  tokenOut: string
  amountIn: string
  minOutput: string
  slippage: number
  selectedLP: string
  maxGasPrice: string
  deadline: number
  status: "idle" | "confirming" | "executing" | "success" | "failed"
  txHash: string | null
  errorMessage: string | null

  estimatedGasNeeded: string
  userHasEnoughGas: boolean
  gasSubsidyAmount: string
  platformFeeUSDT: number
  defiWithdrawalLimit: string
  cefiWithdrawalLimit: string
  topUpAmountNeeded: string
}

interface ExecutionContextType {
  state: ExecutionState
  updateIntentField: (field: keyof ExecutionState, value: unknown) => void
  executeTransaction: () => Promise<void>
  resetExecution: () => void
  calculateFees: () => void
}

const ExecutionContext = createContext<ExecutionContextType | undefined>(undefined)

const initialState: ExecutionState = {
  tokenIn: "ETH",
  tokenOut: "USDC",
  amountIn: "1.5",
  minOutput: "2400",
  slippage: 0.5,
  selectedLP: "uniswap-v3",
  maxGasPrice: "50",
  deadline: 600,
  status: "idle",
  txHash: null,
  errorMessage: null,

  estimatedGasNeeded: "0.025",
  userHasEnoughGas: true,
  gasSubsidyAmount: "0",
  platformFeeUSDT: 0.25,
  defiWithdrawalLimit: "1000",
  cefiWithdrawalLimit: "500",
  topUpAmountNeeded: "0",
}

export function ExecutionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ExecutionState>(initialState)

  const calculateFees = () => {
    const amountOut = Number.parseFloat(state.minOutput)
    const defiLimit = Number.parseFloat(state.defiWithdrawalLimit)
    const cefiLimit = Number.parseFloat(state.cefiWithdrawalLimit)
    const totalLimit = defiLimit + cefiLimit

    // Calculate top-up needed
    const topUpNeeded = amountOut > totalLimit ? 0 : totalLimit - amountOut

    // Simulate gas subsidy (if user doesn't have enough gas, we cover it)
    const gasSubsidy = state.userHasEnoughGas ? 0 : Number.parseFloat(state.estimatedGasNeeded)

    setState((prev) => ({
      ...prev,
      topUpAmountNeeded: topUpNeeded.toFixed(2),
      gasSubsidyAmount: gasSubsidy.toFixed(6),
    }))
  }

  const updateIntentField = (field: keyof ExecutionState, value: unknown) => {
    setState((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const executeTransaction = async () => {
    setState((prev) => ({ ...prev, status: "confirming", errorMessage: null }))

    try {
      // Simulate wallet confirmation delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setState((prev) => ({ ...prev, status: "executing" }))

      // Simulate execution
      await new Promise((resolve) => setTimeout(resolve, 3000))

      const txHash = `0x${Math.random().toString(16).slice(2)}`
      setState((prev) => ({
        ...prev,
        status: "success",
        txHash,
      }))

      // Reset after success
      setTimeout(() => {
        setState(initialState)
      }, 5000)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Transaction failed"
      setState((prev) => ({
        ...prev,
        status: "failed",
        errorMessage: message,
      }))
    }
  }

  const resetExecution = () => {
    setState(initialState)
  }

  return (
    <ExecutionContext.Provider value={{ state, updateIntentField, executeTransaction, resetExecution, calculateFees }}>
      {children}
    </ExecutionContext.Provider>
  )
}

export function useExecution() {
  const context = useContext(ExecutionContext)
  if (!context) {
    throw new Error("useExecution must be used within ExecutionProvider")
  }
  return context
}
