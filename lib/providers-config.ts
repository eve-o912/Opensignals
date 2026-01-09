export type ProviderType = "defi" | "cefi"
export type ProtocolType = "uniswap" | "curve" | "balancer" | "lido" | "coinbase" | "kraken" | "binance" | "custom"

export interface ProviderCapabilities {
  gasOptimized: boolean
  multiHop: boolean
  atomicExecution: boolean
  crossChain: boolean
  rateLimitPerSecond?: number
}

export interface ProviderMetrics {
  tvl?: string // Only for DeFi
  executionGap: string
  avgExecutionTime: string
  reliability: number
  latency?: number // For CeFi in ms
  volume24h?: string // For CeFi
}

export interface ProviderSpecificConfig {
  // DeFi-specific
  routerAddress?: string
  factoryAddress?: string
  slippageBuffer?: number

  // CeFi-specific
  apiEndpoint?: string
  apiKeyRequired?: boolean
  requiresKYC?: boolean
  settlementTime?: string
}

export interface ProviderConfig {
  id: string
  name: string
  type: ProviderType // "defi" or "cefi"
  protocol: ProtocolType
  logo: string
  chain?: string // Optional for CeFi
  capabilities: ProviderCapabilities
  metrics: ProviderMetrics
  config: ProviderSpecificConfig
  enabled: boolean
}

export const providersConfig: ProviderConfig[] = [
  // DeFi Providers
  {
    id: "uniswap-v3",
    name: "Uniswap V3",
    type: "defi",
    protocol: "uniswap",
    logo: "U",
    chain: "Ethereum",
    capabilities: {
      gasOptimized: true,
      multiHop: true,
      atomicExecution: true,
      crossChain: false,
    },
    metrics: {
      tvl: "$2.4B",
      executionGap: "0.02%",
      avgExecutionTime: "12s",
      reliability: 99.9,
    },
    config: {
      routerAddress: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
      factoryAddress: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
      slippageBuffer: 0.02,
    },
    enabled: true,
  },
  {
    id: "curve-finance",
    name: "Curve Finance",
    type: "defi",
    protocol: "curve",
    logo: "C",
    chain: "Ethereum",
    capabilities: {
      gasOptimized: false,
      multiHop: true,
      atomicExecution: true,
      crossChain: false,
    },
    metrics: {
      tvl: "$1.8B",
      executionGap: "0.05%",
      avgExecutionTime: "15s",
      reliability: 99.7,
    },
    config: {
      routerAddress: "0x16a7DA911EB74e1f6fF5f27DdE7dFFc2d916127da",
      slippageBuffer: 0.05,
    },
    enabled: true,
  },
  {
    id: "balancer",
    name: "Balancer",
    type: "defi",
    protocol: "balancer",
    logo: "B",
    chain: "Ethereum",
    capabilities: {
      gasOptimized: true,
      multiHop: true,
      atomicExecution: true,
      crossChain: false,
    },
    metrics: {
      tvl: "$920M",
      executionGap: "0.08%",
      avgExecutionTime: "18s",
      reliability: 99.5,
    },
    config: {
      routerAddress: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
      slippageBuffer: 0.08,
    },
    enabled: true,
  },
  {
    id: "lido-st",
    name: "Lido stETH",
    type: "defi",
    protocol: "lido",
    logo: "L",
    chain: "Ethereum",
    capabilities: {
      gasOptimized: false,
      multiHop: false,
      atomicExecution: true,
      crossChain: false,
    },
    metrics: {
      tvl: "$15.2B",
      executionGap: "0.01%",
      avgExecutionTime: "8s",
      reliability: 99.95,
    },
    config: {
      routerAddress: "0xae7ab96520DE3A18E5e111B5EaAc05501e11c3d6",
    },
    enabled: true,
  },

  // CeFi Providers
  {
    id: "coinbase",
    name: "Coinbase",
    type: "cefi",
    protocol: "custom",
    logo: "CB",
    capabilities: {
      gasOptimized: false,
      multiHop: false,
      atomicExecution: false,
      crossChain: false,
      rateLimitPerSecond: 10,
    },
    metrics: {
      executionGap: "0.15%",
      avgExecutionTime: "2-5m",
      reliability: 99.98,
      latency: 500,
      volume24h: "$42.5B",
    },
    config: {
      apiEndpoint: "https://api.coinbase.com/v1",
      apiKeyRequired: true,
      requiresKYC: true,
      settlementTime: "1-2 business days",
    },
    enabled: true,
  },
  {
    id: "kraken",
    name: "Kraken",
    type: "cefi",
    protocol: "custom",
    logo: "K",
    capabilities: {
      gasOptimized: false,
      multiHop: false,
      atomicExecution: false,
      crossChain: false,
      rateLimitPerSecond: 15,
    },
    metrics: {
      executionGap: "0.12%",
      avgExecutionTime: "1-3m",
      reliability: 99.96,
      latency: 300,
      volume24h: "$38.2B",
    },
    config: {
      apiEndpoint: "https://api.kraken.com",
      apiKeyRequired: true,
      requiresKYC: true,
      settlementTime: "1-2 business days",
    },
    enabled: true,
  },
  {
    id: "binance",
    name: "Binance",
    type: "cefi",
    protocol: "custom",
    logo: "BN",
    capabilities: {
      gasOptimized: false,
      multiHop: false,
      atomicExecution: false,
      crossChain: false,
      rateLimitPerSecond: 20,
    },
    metrics: {
      executionGap: "0.10%",
      avgExecutionTime: "30s-2m",
      reliability: 99.97,
      latency: 250,
      volume24h: "$68.5B",
    },
    config: {
      apiEndpoint: "https://api.binance.com/api",
      apiKeyRequired: true,
      requiresKYC: true,
      settlementTime: "1-2 business days",
    },
    enabled: true,
  },
]

export function getProvidersByType(type: ProviderType): ProviderConfig[] {
  return providersConfig.filter((p) => p.type === type && p.enabled)
}

export function getProviderById(id: string): ProviderConfig | undefined {
  return providersConfig.find((p) => p.id === id)
}

export function getAllEnabledProviders(): ProviderConfig[] {
  return providersConfig.filter((p) => p.enabled)
}
