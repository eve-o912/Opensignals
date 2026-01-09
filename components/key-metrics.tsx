"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, BarChart3, Zap } from "lucide-react"

export function KeyMetrics() {
  const metrics = [
    {
      label: "Total Volume (24h)",
      value: "$2.8M",
      change: "+12.5%",
      icon: TrendingUp,
      color: "text-secondary",
    },
    {
      label: "Success Rate",
      value: "99.7%",
      change: "↑ 0.2%",
      icon: BarChart3,
      color: "text-primary",
    },
    {
      label: "Avg Gas Savings",
      value: "15%",
      change: "vs market",
      icon: Zap,
      color: "text-secondary",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon
        return (
          <Card key={idx} className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <p className={`text-xs ${metric.color}`}>{metric.change}</p>
                </div>
                <Icon className={`w-8 h-8 ${metric.color} opacity-20`} />
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
