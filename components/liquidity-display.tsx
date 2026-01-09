"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { CheckCircle2, Zap, TrendingUp } from "lucide-react"
import { getProvidersByType, getProviderById, type ProviderType } from "@/lib/providers-config"

interface LPProvider {
  id: string
  name: string
  logo: string
  tvl: string
  executionGap: string
  gasOptimized: boolean
  chain: string
  selected: boolean
  avgExecutionTime: string
  reliability: number
}

const lpProviders: LPProvider[] = [
  {
    id: "uniswap-v3",
    name: "Uniswap V3",
    logo: "U",
    tvl: "$2.4B",
    executionGap: "0.02%",
    gasOptimized: true,
    chain: "Ethereum",
    selected: true,
    avgExecutionTime: "12s",
    reliability: 99.9,
  },
  {
    id: "curve-finance",
    name: "Curve Finance",
    logo: "C",
    tvl: "$1.8B",
    executionGap: "0.05%",
    gasOptimized: false,
    chain: "Ethereum",
    selected: false,
    avgExecutionTime: "15s",
    reliability: 99.7,
  },
  {
    id: "balancer",
    name: "Balancer",
    logo: "B",
    tvl: "$920M",
    executionGap: "0.08%",
    gasOptimized: true,
    chain: "Ethereum",
    selected: false,
    avgExecutionTime: "18s",
    reliability: 99.5,
  },
  {
    id: "lido-st",
    name: "Lido stETH",
    logo: "L",
    tvl: "$15.2B",
    executionGap: "0.01%",
    gasOptimized: false,
    chain: "Ethereum",
    selected: false,
    avgExecutionTime: "8s",
    reliability: 99.95,
  },
]

function getStatusBadge(gap: string) {
  const gapNum = Number.parseFloat(gap)
  if (gapNum <= 0.02) {
    return (
      <Badge className="bg-secondary/10 text-secondary border-secondary/30 border text-xs">
        <Zap className="w-3 h-3 mr-1" />
        Optimal
      </Badge>
    )
  } else if (gapNum <= 0.08) {
    return <Badge className="bg-primary/10 text-primary border-primary/30 border text-xs">Excellent</Badge>
  } else {
    return <Badge className="bg-muted text-muted-foreground border-muted-foreground/30 border text-xs">Good</Badge>
  }
}

function getProviderTypeBadge(type: ProviderType) {
  return (
    <Badge
      className={`text-xs capitalize ${
        type === "defi"
          ? "bg-primary/10 text-primary border-primary/30"
          : "bg-secondary/10 text-secondary border-secondary/30"
      } border`}
    >
      {type === "defi" ? "DeFi" : "CeFi"}
    </Badge>
  )
}

export function LiquidityDisplay() {
  const [selectedLP, setSelectedLP] = useState("uniswap-v3")
  const [expandedLP, setExpandedLP] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<ProviderType | "all">("all")

  const allProviders =
    filterType === "all"
      ? getProvidersByType("defi").concat(getProvidersByType("cefi"))
      : getProvidersByType(filterType)

  const selected = getProviderById(selectedLP)

  if (!selected) return null

  return (
    <div className="space-y-4">
      {/* Selected Provider Info Card */}
      {selected && (
        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                  {selected.logo}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">{selected.name}</p>
                    {getProviderTypeBadge(selected.type)}
                  </div>
                  {selected.chain && <p className="text-xs text-muted-foreground">{selected.chain}</p>}
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-secondary" />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-primary/20">
              {selected.type === "defi" && selected.metrics.tvl && (
                <div>
                  <p className="text-xs text-muted-foreground">TVL</p>
                  <p className="text-sm font-semibold text-foreground">{selected.metrics.tvl}</p>
                </div>
              )}
              {selected.type === "cefi" && selected.metrics.volume24h && (
                <div>
                  <p className="text-xs text-muted-foreground">24h Volume</p>
                  <p className="text-sm font-semibold text-foreground">{selected.metrics.volume24h}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground">Execution Gap</p>
                <p className="text-sm font-mono font-semibold text-secondary">{selected.metrics.executionGap}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Time</p>
                <p className="text-sm font-semibold text-foreground">{selected.metrics.avgExecutionTime}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Reliability</p>
                <p className="text-sm font-semibold text-secondary">{selected.metrics.reliability}%</p>
              </div>
            </div>

            {selected.capabilities.gasOptimized && (
              <div className="mt-3 px-3 py-2 bg-secondary/10 border border-secondary/20 rounded-md flex items-center gap-2">
                <Zap className="w-4 h-4 text-secondary flex-shrink-0" />
                <p className="text-xs text-secondary font-medium">Gas optimized route available</p>
              </div>
            )}

            {selected.type === "cefi" && selected.config.requiresKYC && (
              <div className="mt-3 px-3 py-2 bg-primary/10 border border-primary/20 rounded-md flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-xs text-primary font-medium">KYC required for execution</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {["all", "defi", "cefi"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type as ProviderType | "all")}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
              filterType === type
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-muted/30 border-border text-muted-foreground hover:border-border/80"
            }`}
          >
            {type === "all" ? "All Providers" : type === "defi" ? "DeFi" : "CeFi"}
          </button>
        ))}
      </div>

      {/* Provider Selection List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Available Providers</CardTitle>
          <CardDescription>Select your preferred routing target</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {allProviders.map((provider) => (
            <div key={provider.id}>
              <button
                onClick={() => {
                  setSelectedLP(provider.id)
                  setExpandedLP(expandedLP === provider.id ? null : provider.id)
                }}
                className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedLP === provider.id
                    ? "bg-primary/10 border-primary/30"
                    : "bg-muted/30 border-border hover:border-border/80"
                }`}
              >
                <div className="flex items-center gap-3 flex-1 text-left">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {provider.logo}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{provider.name}</p>
                      {getProviderTypeBadge(provider.type)}
                    </div>
                    {provider.chain && <p className="text-xs text-muted-foreground">{provider.chain}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-mono font-semibold text-secondary">{provider.metrics.executionGap}</p>
                    <p className="text-xs text-muted-foreground">gap</p>
                  </div>
                  {getStatusBadge(provider.metrics.executionGap)}
                </div>
              </button>

              {/* Expanded Details */}
              {expandedLP === provider.id && (
                <div className="mt-2 ml-4 p-3 bg-muted/50 border border-border/50 rounded-lg space-y-2 animate-in fade-in-50 duration-200">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {provider.type === "defi" && provider.metrics.tvl && (
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">TVL</p>
                        <p className="font-mono font-semibold text-foreground">{provider.metrics.tvl}</p>
                      </div>
                    )}
                    {provider.type === "cefi" && provider.metrics.volume24h && (
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">24h Volume</p>
                        <p className="font-mono font-semibold text-foreground">{provider.metrics.volume24h}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Reliability</p>
                      <p className="font-mono font-semibold text-secondary">{provider.metrics.reliability}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Avg Exec Time</p>
                      <p className="font-mono font-semibold text-foreground">{provider.metrics.avgExecutionTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Type</p>
                      <p className="font-semibold text-foreground capitalize">{provider.type}</p>
                    </div>
                  </div>

                  {provider.type === "cefi" && provider.config.apiKeyRequired && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-xs text-muted-foreground mb-2">Requires API credentials & KYC verification</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Routing Capabilities Info */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-secondary mt-1.5 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-foreground">Multi-protocol routing</p>
                <p className="text-xs text-muted-foreground">Route across DeFi and CeFi providers</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-foreground">Flexible execution</p>
                <p className="text-xs text-muted-foreground">Choose providers based on your needs</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-secondary mt-1.5 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-foreground">Adaptive routing</p>
                <p className="text-xs text-muted-foreground">Automatically optimize for best execution</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
