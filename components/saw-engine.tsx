"use client"

import { useState, useEffect } from "react"
import { 
  Trophy, 
  TrendingUp, 
  DollarSign, 
  Star,
  Zap,
  Target,
  Settings2,
  ArrowUpRight,
  Sparkles,
  Award
} from "lucide-react"
import { Product } from "./product-form"
import { Slider } from "./ui/slider"

interface SAWCriteria {
  id: string
  name: string
  code: string
  weight: number
  type: "benefit" | "cost"
  icon: React.ReactNode
  description: string
}

interface ProductScore {
  product: Product
  scores: Record<string, number>
  normalizedScores: Record<string, number>
  finalScore: number
  rank: number
  badge: "winner" | "runner-up" | "potential" | null
}

interface SAWEngineProps {
  products: Product[]
}

const DEFAULT_CRITERIA: SAWCriteria[] = [
  { 
    id: "c1", 
    name: "Margin Profit", 
    code: "C1",
    weight: 0.4, 
    type: "benefit",
    icon: <DollarSign className="h-4 w-4" />,
    description: "Persentase keuntungan per produk"
  },
  { 
    id: "c2", 
    name: "Kecepatan Laku", 
    code: "C2",
    weight: 0.35, 
    type: "benefit",
    icon: <TrendingUp className="h-4 w-4" />,
    description: "Seberapa cepat produk terjual"
  },
  { 
    id: "c3", 
    name: "Rating Produk", 
    code: "C3",
    weight: 0.25, 
    type: "benefit",
    icon: <Star className="h-4 w-4" />,
    description: "Rating & review dari pembeli"
  },
]

export function SAWEngine({ products }: SAWEngineProps) {
  const [criteria, setCriteria] = useState<SAWCriteria[]>(DEFAULT_CRITERIA)
  const [productScores, setProductScores] = useState<ProductScore[]>([])
  const [focusMode, setFocusMode] = useState<"profit" | "turnover" | "balanced">("balanced")
  const [showSettings, setShowSettings] = useState(false)

  // Update weights based on focus mode
  useEffect(() => {
    switch (focusMode) {
      case "profit":
        setCriteria(prev => prev.map(c => ({
          ...c,
          weight: c.id === "c1" ? 0.6 : c.id === "c2" ? 0.25 : 0.15
        })))
        break
      case "turnover":
        setCriteria(prev => prev.map(c => ({
          ...c,
          weight: c.id === "c1" ? 0.2 : c.id === "c2" ? 0.6 : 0.2
        })))
        break
      case "balanced":
        setCriteria(prev => prev.map(c => ({
          ...c,
          weight: c.id === "c1" ? 0.4 : c.id === "c2" ? 0.35 : 0.25
        })))
        break
    }
  }, [focusMode])

  // Calculate SAW scores
  useEffect(() => {
    if (products.length === 0) {
      setProductScores([])
      return
    }

    // Generate raw scores for each product
    const rawScores = products.map(product => {
      const margin = ((product.sellPrice - product.costPrice) / product.sellPrice) * 100
      const turnoverRate = Math.random() * 5 + 1 // Simulated: would come from sales data
      const rating = Math.random() * 2 + 3 // Simulated: 3-5 star rating

      return {
        product,
        scores: {
          c1: margin,
          c2: turnoverRate,
          c3: rating
        }
      }
    })

    // Find max values for normalization
    const maxValues: Record<string, number> = {}
    criteria.forEach(c => {
      maxValues[c.id] = Math.max(...rawScores.map(r => r.scores[c.id] || 0))
    })

    // Normalize and calculate final scores
    const scoredProducts: ProductScore[] = rawScores.map(({ product, scores }) => {
      const normalizedScores: Record<string, number> = {}
      let finalScore = 0

      criteria.forEach(c => {
        const maxVal = maxValues[c.id] || 1
        if (c.type === "benefit") {
          normalizedScores[c.id] = scores[c.id] / maxVal
        } else {
          normalizedScores[c.id] = maxVal / scores[c.id]
        }
        finalScore += normalizedScores[c.id] * c.weight
      })

      return {
        product,
        scores,
        normalizedScores,
        finalScore,
        rank: 0,
        badge: null
      }
    })

    // Sort by final score and assign ranks
    scoredProducts.sort((a, b) => b.finalScore - a.finalScore)
    scoredProducts.forEach((p, i) => {
      p.rank = i + 1
      if (i === 0) p.badge = "winner"
      else if (i === 1) p.badge = "runner-up"
      else if (p.finalScore > 0.7) p.badge = "potential"
    })

    setProductScores(scoredProducts)
  }, [products, criteria])

  const updateWeight = (criteriaId: string, newWeight: number) => {
    setCriteria(prev => prev.map(c => 
      c.id === criteriaId ? { ...c, weight: newWeight } : c
    ))
    setFocusMode("balanced") // Reset to balanced when manually adjusting
  }

  const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0)
  const winningProducts = productScores.filter(p => p.badge === "winner" || p.badge === "runner-up")

  return (
    <div className="space-y-6">
      {/* Header with Focus Mode */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 neon-glow-purple">
              <Sparkles className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">SAW Decision Engine</h3>
              <p className="text-sm text-muted-foreground">Simple Additive Weighting untuk ranking produk</p>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="btn-pill border border-border/50 text-foreground font-semibold text-sm px-4 py-2 inline-flex items-center gap-2 bg-transparent hover:bg-secondary/50"
          >
            <Settings2 className="h-4 w-4" />
            {showSettings ? "Hide" : "Settings"}
          </button>
        </div>

        {/* Focus Mode Selector */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="text-xs text-muted-foreground py-2">Focus:</span>
          {[
            { id: "profit", label: "Max Profit", icon: <DollarSign className="h-3.5 w-3.5" /> },
            { id: "turnover", label: "Fast Turnover", icon: <Zap className="h-3.5 w-3.5" /> },
            { id: "balanced", label: "Balanced", icon: <Target className="h-3.5 w-3.5" /> },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setFocusMode(mode.id as typeof focusMode)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                focusMode === mode.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground"
              }`}
            >
              {mode.icon}
              {mode.label}
            </button>
          ))}
        </div>

        {/* Criteria Settings */}
        {showSettings && (
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/30 mb-5">
            <p className="text-xs font-semibold text-muted-foreground mb-4">
              Adjust Weights (Total: {(totalWeight * 100).toFixed(0)}%)
            </p>
            <div className="space-y-4">
              {criteria.map((c) => (
                <div key={c.id} className="flex items-center gap-4">
                  <div className="flex items-center gap-2 w-36">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                      {c.icon}
                    </div>
                    <span className="text-sm font-medium text-foreground">{c.code}</span>
                  </div>
                  <div className="flex-1">
                    <Slider
                      value={[c.weight * 100]}
                      onValueChange={([val]) => updateWeight(c.id, val / 100)}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <span className="text-sm font-mono text-primary w-12 text-right">
                    {(c.weight * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-3">
              C1: Margin Profit | C2: Kecepatan Laku | C3: Rating Produk
            </p>
          </div>
        )}

        {/* Criteria Display */}
        <div className="grid grid-cols-3 gap-3">
          {criteria.map((c) => (
            <div 
              key={c.id}
              className="flex flex-col items-center p-3 rounded-xl bg-secondary/30 border border-border/20"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 mb-2">
                {c.icon}
              </div>
              <span className="text-xs font-semibold text-foreground">{c.name}</span>
              <span className="text-lg font-bold text-primary">{(c.weight * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Winning Products */}
      {winningProducts.length > 0 && (
        <div className="glass-card rounded-2xl p-6 neon-glow-cyan">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Winning Products</h3>
              <p className="text-sm text-muted-foreground">Produk terbaik untuk disuntik budget iklan</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {winningProducts.map((item) => (
              <div 
                key={item.product.id}
                className={`relative p-5 rounded-xl border ${
                  item.badge === "winner" 
                    ? "border-primary/50 bg-primary/10" 
                    : "border-accent/30 bg-accent/5"
                }`}
              >
                {item.badge === "winner" && (
                  <div className="absolute -top-2 -right-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                      <Award className="h-4 w-4 text-primary-foreground" />
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/50 text-2xl font-bold text-primary">
                    #{item.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-foreground truncate">{item.product.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.product.category}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold text-primary">
                        {(item.finalScore * 100).toFixed(1)}
                      </span>
                      <span className="text-xs text-muted-foreground">SAW Score</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/20">
                  <div className="text-xs text-muted-foreground">
                    Margin: {((item.product.sellPrice - item.product.costPrice) / item.product.sellPrice * 100).toFixed(1)}%
                  </div>
                  <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                    Boost Ads <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Products Ranking */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Complete Ranking</h3>
        
        {productScores.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Tambahkan produk untuk melihat ranking SAW</p>
          </div>
        ) : (
          <div className="space-y-3">
            {productScores.map((item) => (
              <div 
                key={item.product.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border/20 hover:border-primary/30 transition-all"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold text-lg ${
                  item.rank <= 3 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-muted-foreground"
                }`}>
                  {item.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground truncate">{item.product.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-muted-foreground">
                      C1: {item.scores.c1?.toFixed(1)}%
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      C2: {item.scores.c2?.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      C3: {item.scores.c3?.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-primary">{(item.finalScore * 100).toFixed(1)}</span>
                  <p className="text-[10px] text-muted-foreground">Score</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
