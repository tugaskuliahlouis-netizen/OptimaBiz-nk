"use client"

import { useState, useEffect } from "react"
import { 
  Brain, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Target,
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Rocket
} from "lucide-react"
import { Product } from "./product-form"

type UserLevel = "beginner" | "intermediate" | "expert"

interface ROASData {
  adSpend: number
  revenue: number
  roas: number
  status: "excellent" | "good" | "poor"
}

interface AIRecommendation {
  id: string
  type: "creative" | "targeting" | "budget" | "timing"
  title: string
  description: string
  impact: "high" | "medium" | "low"
  implemented: boolean
}

interface ExpertAIPartnerProps {
  products: Product[]
}

const LEVEL_CONFIG = {
  beginner: {
    label: "Beginner",
    icon: <GraduationCap className="h-5 w-5" />,
    color: "text-blue-400",
    bg: "bg-blue-500/20",
    description: "Baru mulai bisnis online"
  },
  intermediate: {
    label: "Growing",
    icon: <TrendingUp className="h-5 w-5" />,
    color: "text-accent",
    bg: "bg-accent/20",
    description: "Sudah ada penjualan rutin"
  },
  expert: {
    label: "Expert",
    icon: <Rocket className="h-5 w-5" />,
    color: "text-primary",
    bg: "bg-primary/20",
    description: "Scale up dengan ads & CRM"
  }
}

export function ExpertAIPartner({ products }: ExpertAIPartnerProps) {
  const [userLevel, setUserLevel] = useState<UserLevel>("beginner")
  const [roasData, setRoasData] = useState<ROASData>({
    adSpend: 0,
    revenue: 0,
    roas: 0,
    status: "poor"
  })
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])
  const [showLevelSelector, setShowLevelSelector] = useState(false)

  // Load saved level
  useEffect(() => {
    const saved = localStorage.getItem("optimabiz_user_level")
    if (saved) {
      setUserLevel(saved as UserLevel)
    }
  }, [])

  // Generate recommendations based on level
  useEffect(() => {
    const baseRecs: AIRecommendation[] = []

    if (userLevel === "beginner") {
      baseRecs.push(
        {
          id: "1",
          type: "creative",
          title: "Mulai dengan foto produk berkualitas",
          description: "Foto dengan background putih dan pencahayaan natural meningkatkan CTR hingga 40%",
          impact: "high",
          implemented: false
        },
        {
          id: "2",
          type: "targeting",
          title: "Target audience lokal dulu",
          description: "Fokus ke kota/kabupaten terdekat untuk kurangi ongkir dan build trust",
          impact: "medium",
          implemented: false
        },
        {
          id: "3",
          type: "timing",
          title: "Post di jam prime time",
          description: "Upload produk jam 19.00-21.00 untuk reach maksimal",
          impact: "medium",
          implemented: false
        }
      )
    } else if (userLevel === "intermediate") {
      baseRecs.push(
        {
          id: "1",
          type: "creative",
          title: "Buat video pendek produk",
          description: "Video 15-30 detik untuk TikTok Shop dan Reels meningkatkan conversion 2x",
          impact: "high",
          implemented: false
        },
        {
          id: "2",
          type: "budget",
          title: "Alokasi budget ads 10-15% revenue",
          description: "Sweet spot untuk scaling tanpa over-spending",
          impact: "high",
          implemented: false
        },
        {
          id: "3",
          type: "targeting",
          title: "Retargeting cart abandoners",
          description: "Target ulang visitor yang sudah add to cart tapi belum checkout",
          impact: "medium",
          implemented: false
        }
      )
    } else {
      baseRecs.push(
        {
          id: "1",
          type: "creative",
          title: "A/B Test creative secara sistematis",
          description: "Test 3-5 variasi headline dan visual per campaign untuk optimasi CTR",
          impact: "high",
          implemented: false
        },
        {
          id: "2",
          type: "targeting",
          title: "Bangun Lookalike Audience",
          description: "Upload customer list untuk create LAL 1-2% di Meta Ads",
          impact: "high",
          implemented: false
        },
        {
          id: "3",
          type: "budget",
          title: "Implement CBO (Campaign Budget Optimization)",
          description: "Biarkan platform alokasi budget ke ad set terbaik secara otomatis",
          impact: "medium",
          implemented: false
        },
        {
          id: "4",
          type: "creative",
          title: "UGC Content Strategy",
          description: "Kumpulkan review video dari customer untuk social proof yang kuat",
          impact: "high",
          implemented: false
        }
      )
    }

    setRecommendations(baseRecs)
  }, [userLevel])

  const calculateROAS = (spend: number, revenue: number) => {
    const roas = spend > 0 ? revenue / spend : 0
    let status: "excellent" | "good" | "poor" = "poor"
    if (roas >= 4) status = "excellent"
    else if (roas >= 2) status = "good"

    setRoasData({ adSpend: spend, revenue, roas, status })
  }

  const changeLevel = (level: UserLevel) => {
    setUserLevel(level)
    localStorage.setItem("optimabiz_user_level", level)
    setShowLevelSelector(false)
  }

  const toggleImplemented = (id: string) => {
    setRecommendations(prev => prev.map(r => 
      r.id === id ? { ...r, implemented: !r.implemented } : r
    ))
  }

  const totalMargin = products.length > 0 
    ? products.reduce((acc, p) => acc + ((p.sellPrice - p.costPrice) / p.sellPrice) * 100, 0) / products.length
    : 0

  const config = LEVEL_CONFIG[userLevel]

  return (
    <div className="space-y-6">
      {/* Level Selector */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${config.bg}`}>
              <Brain className={`h-6 w-6 ${config.color}`} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Expert AI Partner</h3>
              <p className="text-sm text-muted-foreground">Rekomendasi berbasis level bisnis kamu</p>
            </div>
          </div>
        </div>

        {/* Current Level Display */}
        <button
          onClick={() => setShowLevelSelector(!showLevelSelector)}
          className={`w-full flex items-center justify-between p-4 rounded-xl border ${config.bg} border-border/30 hover:border-primary/30 transition-all`}
        >
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-background/50 ${config.color}`}>
              {config.icon}
            </div>
            <div className="text-left">
              <p className={`text-sm font-bold ${config.color}`}>Level: {config.label}</p>
              <p className="text-xs text-muted-foreground">{config.description}</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Level Selector Dropdown */}
        {showLevelSelector && (
          <div className="mt-3 p-3 rounded-xl bg-secondary/50 border border-border/30 space-y-2">
            {(Object.keys(LEVEL_CONFIG) as UserLevel[]).map((level) => {
              const levelConfig = LEVEL_CONFIG[level]
              return (
                <button
                  key={level}
                  onClick={() => changeLevel(level)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    userLevel === level 
                      ? `${levelConfig.bg} border border-primary/30` 
                      : "hover:bg-secondary/80"
                  }`}
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${levelConfig.bg} ${levelConfig.color}`}>
                    {levelConfig.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-foreground">{levelConfig.label}</p>
                    <p className="text-xs text-muted-foreground">{levelConfig.description}</p>
                  </div>
                  {userLevel === level && (
                    <CheckCircle2 className="h-5 w-5 text-primary ml-auto" />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* ROAS Calculator - Only for Expert Level */}
      {userLevel === "expert" && (
        <div className="glass-card rounded-2xl p-6 neon-glow-cyan">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">ROAS Calculator</h3>
              <p className="text-sm text-muted-foreground">Return on Ad Spend tracking</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className="text-xs text-muted-foreground block mb-2">Ad Spend (Rp)</label>
              <input
                type="number"
                value={roasData.adSpend || ""}
                onChange={(e) => calculateROAS(Number(e.target.value), roasData.revenue)}
                placeholder="1000000"
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-2">Revenue dari Ads (Rp)</label>
              <input
                type="number"
                value={roasData.revenue || ""}
                onChange={(e) => calculateROAS(roasData.adSpend, Number(e.target.value))}
                placeholder="5000000"
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border/50 text-foreground focus:border-primary outline-none"
              />
            </div>
          </div>

          {roasData.adSpend > 0 && (
            <div className={`p-5 rounded-xl border ${
              roasData.status === "excellent" 
                ? "bg-[#00FF88]/10 border-[#00FF88]/30" 
                : roasData.status === "good"
                ? "bg-primary/10 border-primary/30"
                : "bg-destructive/10 border-destructive/30"
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Your ROAS</p>
                  <p className={`text-4xl font-bold ${
                    roasData.status === "excellent" 
                      ? "text-[#00FF88]" 
                      : roasData.status === "good"
                      ? "text-primary"
                      : "text-destructive"
                  }`}>
                    {roasData.roas.toFixed(2)}x
                  </p>
                </div>
                <div className={`flex h-14 w-14 items-center justify-center rounded-full ${
                  roasData.status === "excellent" 
                    ? "bg-[#00FF88]/20" 
                    : roasData.status === "good"
                    ? "bg-primary/20"
                    : "bg-destructive/20"
                }`}>
                  {roasData.status === "poor" ? (
                    <TrendingDown className="h-7 w-7 text-destructive" />
                  ) : (
                    <TrendingUp className={`h-7 w-7 ${roasData.status === "excellent" ? "text-[#00FF88]" : "text-primary"}`} />
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                {roasData.status === "excellent" 
                  ? "Excellent! Pertahankan dan scale up budget secara bertahap"
                  : roasData.status === "good"
                  ? "Good performance! Optimasi creative untuk push ke 4x+"
                  : "ROAS < 2x perlu perbaikan. Cek targeting dan creative."}
              </p>
            </div>
          )}
        </div>
      )}

      {/* AI Recommendations */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 neon-glow-purple">
            <Lightbulb className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Smart Recommendations</h3>
            <p className="text-sm text-muted-foreground">Disesuaikan untuk level {config.label}</p>
          </div>
        </div>

        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div 
              key={rec.id}
              className={`p-4 rounded-xl border transition-all ${
                rec.implemented 
                  ? "bg-[#00FF88]/5 border-[#00FF88]/30" 
                  : "bg-secondary/30 border-border/30 hover:border-primary/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleImplemented(rec.id)}
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all shrink-0 mt-0.5 ${
                    rec.implemented 
                      ? "bg-[#00FF88] border-[#00FF88]" 
                      : "border-muted-foreground/50 hover:border-primary"
                  }`}
                >
                  {rec.implemented && <CheckCircle2 className="h-4 w-4 text-background" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`text-sm font-semibold ${rec.implemented ? "text-muted-foreground line-through" : "text-foreground"}`}>
                      {rec.title}
                    </h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      rec.impact === "high" 
                        ? "bg-primary/20 text-primary" 
                        : rec.impact === "medium"
                        ? "bg-accent/20 text-accent"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {rec.impact}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{rec.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-5 pt-5 border-t border-border/20">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-foreground">
              {recommendations.filter(r => r.implemented).length}/{recommendations.length} completed
            </span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-secondary/50 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all"
              style={{ 
                width: `${(recommendations.filter(r => r.implemented).length / recommendations.length) * 100}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
