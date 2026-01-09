"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Lock, Shield } from "lucide-react"

export function VaultInfo() {
  return (
    <div className="space-y-4">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-secondary" />
            Execution Vault
          </CardTitle>
          <CardDescription>Locked capital and escrow status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Locked</span>
              <span className="font-mono font-semibold text-foreground">$125,450.50</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-3/4"></div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>$125,450 / $167,000 capacity</span>
              <span>75%</span>
            </div>
          </div>

          <div className="pt-2 border-t border-border/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Active Executions</span>
              <Badge className="bg-primary/10 text-primary border-primary/30 border">3</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Success Rate</span>
              <span className="font-mono font-semibold text-secondary">99.7%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Executed</span>
              <span className="font-mono font-semibold text-foreground">$2.4M</span>
            </div>
          </div>

          <div className="pt-2 border-t border-border/50 flex items-center gap-2 px-3 py-2 bg-secondary/10 rounded-md">
            <Shield className="w-4 h-4 text-secondary flex-shrink-0" />
            <p className="text-xs text-secondary font-medium">Vault protected by multi-sig security</p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Avg Execution Time</span>
            <span className="font-mono font-semibold text-foreground">18.5s</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Avg Slippage</span>
            <span className="font-mono font-semibold text-foreground">0.04%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Daily Volume</span>
            <span className="font-mono font-semibold text-secondary">$450K</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Weekly Volume</span>
            <span className="font-mono font-semibold text-secondary">$2.8M</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
