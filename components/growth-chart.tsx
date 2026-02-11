"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, DollarSign, Target } from "lucide-react"

interface GrowthChartProps {
  totalProducts: number
  avgMargin: number
  totalValue: number
}

export function GrowthChart({ totalProducts, avgMargin, totalValue }: GrowthChartProps) {
  const [marketingBudget, setMarketingBudget] = useState(500000)
  const [conversionRate, setConversionRate] = useState(3)

  const projectedData = useMemo(() => {
    const baseRevenue = totalValue * 0.3
    const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"]
    
    return months.map((month, index) => {
      const budgetMultiplier = 1 + (marketingBudget / 1000000) * 0.15
      const conversionMultiplier = 1 + (conversionRate / 100) * 0.5
      const growthFactor = Math.pow(budgetMultiplier * conversionMultiplier, index * 0.3)
      
      const revenue = Math.round(baseRevenue * growthFactor * (1 + index * 0.08))
      const adSpend = Math.round(marketingBudget * (1 + index * 0.1))
      const profit = Math.round(revenue * (avgMargin / 100) - adSpend)
      const roas = adSpend > 0 ? (revenue / adSpend).toFixed(2) : "0"

      return {
        month,
        revenue,
        profit: Math.max(profit, 0),
        adSpend,
        roas: parseFloat(roas)
      }
    })
  }, [marketingBudget, conversionRate, totalValue, avgMargin])

  const totalProjectedRevenue = projectedData.reduce((sum, d) => sum + d.revenue, 0)
  const totalProjectedProfit = projectedData.reduce((sum, d) => sum + d.profit, 0)
  const avgROAS = (projectedData.reduce((sum, d) => sum + d.roas, 0) / 12).toFixed(2)

  const goldColor = "#eab308"
  const greenColor = "#22c55e"
  const blueColor = "#3b82f6"

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `Rp${(value / 1000000).toFixed(1)}jt`
    if (value >= 1000) return `Rp${(value / 1000).toFixed(0)}rb`
    return `Rp${value}`
  }

  return (
    <div className="space-y-6">
      {/* Budget Controls */}
      <div className="rounded-3xl glass-card p-5 sm:p-6">
        <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-5">
          <DollarSign className="h-5 w-5 text-primary" />
          Simulasi Anggaran Marketing
        </h3>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Budget Bulanan</Label>
              <span className="text-sm font-bold text-primary">
                Rp {marketingBudget.toLocaleString("id-ID")}
              </span>
            </div>
            <Slider
              value={[marketingBudget]}
              onValueChange={(value) => setMarketingBudget(value[0])}
              min={100000}
              max={5000000}
              step={100000}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Rp100rb</span>
              <span>Rp5jt</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Target Conversion Rate</Label>
              <span className="text-sm font-bold text-primary">{conversionRate}%</span>
            </div>
            <Slider
              value={[conversionRate]}
              onValueChange={(value) => setConversionRate(value[0])}
              min={1}
              max={10}
              step={0.5}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1%</span>
              <span>10%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Projection Stats */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="rounded-3xl glass-card-white p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-2.5">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-card-foreground/50">Proyeksi Revenue (12 bln)</p>
              <p className="text-base sm:text-xl font-extrabold text-card-foreground truncate">
                Rp {totalProjectedRevenue.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl glass-card-white p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-green-500/10 p-2.5">
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-card-foreground/50">Proyeksi Profit (12 bln)</p>
              <p className="text-base sm:text-xl font-extrabold text-green-600 truncate">
                Rp {totalProjectedProfit.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl glass-card-white p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-blue-500/10 p-2.5">
              <Target className="h-5 w-5 text-blue-500" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs text-card-foreground/50">Rata-rata ROAS</p>
              <p className="text-base sm:text-xl font-extrabold text-blue-600">{avgROAS}x</p>
            </div>
          </div>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="rounded-3xl glass-card overflow-hidden">
        <div className="p-5 sm:p-6 pb-3">
          <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <TrendingUp className="h-5 w-5 text-primary" />
            Proyeksi Pertumbuhan 12 Bulan
          </h3>
        </div>
        <div className="px-3 sm:px-6 pb-5 sm:pb-6">
          <div className="h-[280px] sm:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={goldColor} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={goldColor} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={greenColor} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={greenColor} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAdSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={blueColor} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={blueColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  stroke="#888" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#888" 
                  fontSize={12}
                  tickFormatter={formatCurrency}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    border: "1px solid #333",
                    borderRadius: "16px",
                    color: "#fff"
                  }}
                  formatter={(value: number, name: string) => [
                    `Rp ${value.toLocaleString("id-ID")}`,
                    name === "revenue" ? "Revenue" : name === "profit" ? "Profit" : "Ad Spend"
                  ]}
                />
                <Legend 
                  formatter={(value: string) => 
                    value === "revenue" ? "Revenue" : value === "profit" ? "Profit" : "Ad Spend"
                  }
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke={goldColor}
                  strokeWidth={2}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke={greenColor}
                  strokeWidth={2}
                  fill="url(#colorProfit)"
                />
                <Area
                  type="monotone"
                  dataKey="adSpend"
                  stroke={blueColor}
                  strokeWidth={2}
                  fill="url(#colorAdSpend)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
