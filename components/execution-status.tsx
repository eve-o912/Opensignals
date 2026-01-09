"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertCircle } from "lucide-react"

interface Execution {
  id: string
  status: "pending" | "executing" | "success" | "failed"
  tokenIn: string
  tokenOut: string
  amountIn: string
  amountOut: string
  executedPrice: number
  timestamp: string
  txHash: string
  gasUsed: string
}

const mockExecutions: Execution[] = [
  {
    id: "exec-001",
    status: "success",
    tokenIn: "ETH",
    tokenOut: "USDC",
    amountIn: "2.5",
    amountOut: "3987.50",
    executedPrice: 1595,
    timestamp: "2 mins ago",
    txHash: "0x742d35Cc6634C0532925a3b844Bc3e704594f124",
    gasUsed: "0.015 ETH",
  },
  {
    id: "exec-002",
    status: "executing",
    tokenIn: "USDC",
    tokenOut: "DAI",
    amountIn: "5000",
    amountOut: "4998.75",
    executedPrice: 0.9998,
    timestamp: "Just now",
    txHash: "0x9876543210abcdef1234567890abcdef12345678",
    gasUsed: "0.008 ETH",
  },
  {
    id: "exec-003",
    status: "pending",
    tokenIn: "WBTC",
    tokenOut: "ETH",
    amountIn: "0.5",
    amountOut: "12.5",
    executedPrice: 25000,
    timestamp: "Pending...",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef12",
    gasUsed: "Est. 0.012 ETH",
  },
]

function getStatusIcon(status: string) {
  switch (status) {
    case "success":
      return <CheckCircle2 className="w-5 h-5 text-secondary" />
    case "executing":
      return <Clock className="w-5 h-5 text-primary animate-spin" />
    case "failed":
      return <AlertCircle className="w-5 h-5 text-destructive" />
    default:
      return <Clock className="w-5 h-5 text-muted-foreground" />
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "success":
      return <Badge className="bg-secondary/10 text-secondary border-secondary/30 border">Completed</Badge>
    case "executing":
      return <Badge className="bg-primary/10 text-primary border-primary/30 border animate-pulse">Executing</Badge>
    case "failed":
      return <Badge className="bg-destructive/10 text-destructive border-destructive/30 border">Failed</Badge>
    default:
      return <Badge className="bg-muted text-muted-foreground border-muted-foreground/30 border">Pending</Badge>
  }
}

export function ExecutionStatus() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Execution History</h2>
        <Badge variant="outline" className="text-xs">
          {mockExecutions.length} executions
        </Badge>
      </div>

      <div className="space-y-3">
        {mockExecutions.map((execution) => (
          <Card key={execution.id} className="bg-card border-border hover:border-border/80 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div className="pt-1">{getStatusIcon(execution.status)}</div>

                {/* Main Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {execution.amountIn} {execution.tokenIn} → {execution.amountOut} {execution.tokenOut}
                        </p>
                        <p className="text-xs text-muted-foreground">{execution.timestamp}</p>
                      </div>
                    </div>
                    {getStatusBadge(execution.status)}
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground">Executed Price</p>
                      <p className="text-sm font-mono font-semibold text-foreground">
                        {execution.executedPrice.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Gas Used</p>
                      <p className="text-sm font-mono font-semibold text-foreground">{execution.gasUsed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">TX Hash</p>
                      <a href={`#`} className="text-sm font-mono text-secondary hover:underline break-all">
                        {execution.txHash.slice(0, 10)}...
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
