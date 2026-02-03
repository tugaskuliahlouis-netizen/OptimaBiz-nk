"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "./product-form"
import type { BrandProfile } from "./brand-profile"
import { 
  Sparkles, 
  Zap, 
  Target, 
  Calendar,
  CheckCircle2,
  ArrowRight,
  Store,
  Smartphone,
  ShoppingBag,
  Utensils,
  Palette,
  Heart,
  Cpu,
  Hammer,
  Briefcase
} from "lucide-react"

interface AIStrategyEngineProps {
  products: Product[]
  brandProfile: BrandProfile | null
  onGenerateStrategy: () => void
}

interface Strategy {
  platforms: { name: string; icon: React.ReactNode; reason: string }[]
  timeline: { week: string; phase: string; tasks: string[] }[]
  tactics: { category: string; actions: string[] }[]
}

const platformDatabase: Record<string, { name: string; icon: React.ReactNode; reason: string }[]> = {
  "Kuliner": [
    { name: "TikTok", icon: <Smartphone className="h-4 w-4" />, reason: "Konten makanan viral, jangkauan luas untuk Gen Z & Milenial" },
    { name: "GoFood", icon: <Utensils className="h-4 w-4" />, reason: "Platform delivery makanan terbesar di Indonesia" },
    { name: "GrabFood", icon: <Utensils className="h-4 w-4" />, reason: "Jangkauan luas dengan promo menarik" },
    { name: "Instagram", icon: <Smartphone className="h-4 w-4" />, reason: "Visual makanan yang menarik untuk brand awareness" }
  ],
  "Fashion": [
    { name: "Shopee", icon: <ShoppingBag className="h-4 w-4" />, reason: "Marketplace fashion terbesar dengan fitur live streaming" },
    { name: "Tokopedia", icon: <Store className="h-4 w-4" />, reason: "Traffic tinggi dengan program official store" },
    { name: "Instagram", icon: <Smartphone className="h-4 w-4" />, reason: "Platform visual ideal untuk fashion lookbook" },
    { name: "TikTok Shop", icon: <Smartphone className="h-4 w-4" />, reason: "Konten OOTD viral dan shopping langsung" }
  ],
  "Kecantikan": [
    { name: "Shopee", icon: <ShoppingBag className="h-4 w-4" />, reason: "Kategori beauty terlaris dengan flash sale" },
    { name: "TikTok", icon: <Smartphone className="h-4 w-4" />, reason: "Tutorial makeup dan review produk viral" },
    { name: "Instagram", icon: <Smartphone className="h-4 w-4" />, reason: "Influencer beauty marketing yang efektif" },
    { name: "Sociolla", icon: <Heart className="h-4 w-4" />, reason: "Platform khusus beauty dengan komunitas loyal" }
  ],
  "Elektronik": [
    { name: "Tokopedia", icon: <Store className="h-4 w-4" />, reason: "Kategori elektronik terpercaya dengan garansi" },
    { name: "Shopee", icon: <ShoppingBag className="h-4 w-4" />, reason: "Flash sale elektronik dengan cicilan 0%" },
    { name: "Blibli", icon: <Cpu className="h-4 w-4" />, reason: "Official store elektronik dengan after-sales terbaik" },
    { name: "YouTube", icon: <Smartphone className="h-4 w-4" />, reason: "Review dan unboxing untuk build trust" }
  ],
  "Kerajinan": [
    { name: "Etsy", icon: <Palette className="h-4 w-4" />, reason: "Marketplace global untuk produk handmade" },
    { name: "Instagram", icon: <Smartphone className="h-4 w-4" />, reason: "Showcase proses kreatif dan behind the scenes" },
    { name: "Tokopedia", icon: <Store className="h-4 w-4" />, reason: "Pasar lokal dengan kategori kerajinan" },
    { name: "TikTok", icon: <Smartphone className="h-4 w-4" />, reason: "Konten ASMR crafting dan proses pembuatan" }
  ],
  "Jasa": [
    { name: "Google Business", icon: <Store className="h-4 w-4" />, reason: "Visibilitas di pencarian lokal" },
    { name: "Instagram", icon: <Smartphone className="h-4 w-4" />, reason: "Portfolio dan testimoni visual" },
    { name: "LinkedIn", icon: <Briefcase className="h-4 w-4" />, reason: "Networking B2B dan professional branding" },
    { name: "WhatsApp Business", icon: <Smartphone className="h-4 w-4" />, reason: "Komunikasi langsung dengan katalog" }
  ],
  "Kesehatan": [
    { name: "Halodoc", icon: <Heart className="h-4 w-4" />, reason: "Platform kesehatan terpercaya" },
    { name: "Tokopedia", icon: <Store className="h-4 w-4" />, reason: "Kategori kesehatan dengan verifikasi" },
    { name: "Instagram", icon: <Smartphone className="h-4 w-4" />, reason: "Edukasi kesehatan dan wellness tips" },
    { name: "TikTok", icon: <Smartphone className="h-4 w-4" />, reason: "Konten health tips yang engaging" }
  ],
  "Lainnya": [
    { name: "Shopee", icon: <ShoppingBag className="h-4 w-4" />, reason: "Marketplace serba ada dengan traffic tinggi" },
    { name: "Tokopedia", icon: <Store className="h-4 w-4" />, reason: "Platform e-commerce terpercaya" },
    { name: "Instagram", icon: <Smartphone className="h-4 w-4" />, reason: "Brand awareness dan engagement" },
    { name: "TikTok", icon: <Smartphone className="h-4 w-4" />, reason: "Jangkauan viral untuk semua kategori" }
  ]
}

const generateTimeline = (category: string): { week: string; phase: string; tasks: string[] }[] => {
  return [
    {
      week: "Minggu 1-2",
      phase: "Setup",
      tasks: [
        "Buat akun di platform yang direkomendasikan",
        "Siapkan foto produk profesional",
        "Tulis deskripsi produk yang menarik dengan SEO",
        "Setup katalog dan pricing strategy"
      ]
    },
    {
      week: "Minggu 3-4",
      phase: "Growth",
      tasks: [
        "Mulai posting konten secara konsisten (3-5x/minggu)",
        "Jalankan promo launching (diskon 10-15%)",
        "Engage dengan komunitas dan calon pelanggan",
        "Kumpulkan review dari early adopters"
      ]
    },
    {
      week: "Minggu 5-8",
      phase: "Scaling",
      tasks: [
        "Analisis performa dan optimasi strategi",
        "Tingkatkan budget iklan pada platform terbaik",
        "Kolaborasi dengan micro-influencer",
        "Expand ke platform sekunder"
      ]
    }
  ]
}

const generateTactics = (category: string, targetMarket: string): { category: string; actions: string[] }[] => {
  const baseTactics = [
    {
      category: "Content Strategy",
      actions: [
        "Buat content calendar mingguan",
        "Mix konten: 40% edukatif, 30% promosi, 30% entertainment",
        "Gunakan trending audio dan hashtag",
        "Post di prime time: 11-13 & 19-21"
      ]
    },
    {
      category: "Pricing Strategy",
      actions: [
        "Terapkan psychological pricing (Rp99.000 vs Rp100.000)",
        "Bundle products untuk increase AOV",
        "Flash sale mingguan untuk urgency",
        "Loyalty program untuk repeat customers"
      ]
    },
    {
      category: "Customer Acquisition",
      actions: [
        targetMarket === "lokal" ? "Fokus pada geo-targeting area sekitar" : "Expand jangkauan dengan ads nasional",
        "Referral program: diskon untuk yang invite teman",
        "Kolaborasi dengan bisnis komplementer",
        "Testimoni dan UGC sebagai social proof"
      ]
    }
  ]

  return baseTactics
}

export function AIStrategyEngine({ products, brandProfile, onGenerateStrategy }: AIStrategyEngineProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [strategy, setStrategy] = useState<Strategy | null>(null)
  const [displayedText, setDisplayedText] = useState("")
  const [currentSection, setCurrentSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const dominantCategory = products.length > 0
    ? products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    : {}

  const topCategory = Object.entries(dominantCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || "Lainnya"

  const generateStrategy = () => {
    setIsGenerating(true)
    setStrategy(null)
    setDisplayedText("")
    setCurrentSection(0)

    // Simulate AI thinking
    setTimeout(() => {
      const platforms = platformDatabase[topCategory] || platformDatabase["Lainnya"]
      const timeline = generateTimeline(topCategory)
      const tactics = generateTactics(topCategory, brandProfile?.targetMarket || "lokal")

      setStrategy({ platforms, timeline, tactics })
      setIsGenerating(false)
      onGenerateStrategy()
    }, 3000)
  }

  // Typewriter effect for intro text
  useEffect(() => {
    if (strategy && currentSection === 0) {
      const introText = `Berdasarkan analisis ${products.length} produk dalam kategori ${topCategory} dan target pasar ${brandProfile?.targetMarket || "lokal"}, berikut strategi yang direkomendasikan untuk ${brandProfile?.businessName || "bisnis Anda"}:`
      let index = 0
      const interval = setInterval(() => {
        if (index < introText.length) {
          setDisplayedText(introText.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
          setTimeout(() => setCurrentSection(1), 500)
        }
      }, 20)
      return () => clearInterval(interval)
    }
  }, [strategy, currentSection, products.length, topCategory, brandProfile])

  useEffect(() => {
    if (currentSection > 0 && currentSection < 4) {
      const timer = setTimeout(() => setCurrentSection(currentSection + 1), 800)
      return () => clearTimeout(timer)
    }
  }, [currentSection])

  const canGenerate = products.length > 0

  return (
    <div className="space-y-6">
      {/* Generate Button with Glowing Effect */}
      <div className="relative">
        {isGenerating && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-primary/50 to-primary animate-pulse blur-xl" />
        )}
        <Card className={`relative overflow-hidden transition-all duration-500 ${isGenerating ? "border-primary shadow-lg shadow-primary/25" : "border-border/50"}`}>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className={`relative rounded-xl sm:rounded-2xl p-3 sm:p-4 ${isGenerating ? "bg-primary/20" : "bg-primary/10"}`}>
                {isGenerating ? (
                  <div className="relative">
                    <Sparkles className="h-6 sm:h-8 w-6 sm:w-8 text-primary animate-pulse" />
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                  </div>
                ) : (
                  <Zap className="h-6 sm:h-8 w-6 sm:w-8 text-primary" />
                )}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-base sm:text-lg font-semibold text-foreground">Decision Engine AI</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {isGenerating 
                    ? "Menganalisis data produk dan menghasilkan strategi..."
                    : "Generate rekomendasi platform dan strategi berdasarkan data produk Anda"
                  }
                </p>
              </div>
              <Button
                onClick={generateStrategy}
                disabled={!canGenerate || isGenerating}
                className="bg-primary hover:bg-primary/90 min-w-[140px] sm:min-w-[160px] text-sm sm:text-base w-full sm:w-auto"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Strategi
                  </>
                )}
              </Button>
            </div>

            {!canGenerate && (
              <p className="mt-4 text-sm text-yellow-500 text-center">
                Tambahkan minimal 1 produk untuk generate strategi
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Strategy Output with Typewriter Effect */}
      {strategy && (
        <div ref={containerRef} className="space-y-6">
          {/* Intro Text */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <p className="text-foreground leading-relaxed">
                {displayedText}
                {currentSection === 0 && <span className="animate-pulse">|</span>}
              </p>
            </CardContent>
          </Card>

          {/* Platform Recommendations */}
          {currentSection >= 1 && (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="h-5 w-5 text-primary" />
                  Platform yang Direkomendasikan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {strategy.platforms.map((platform, index) => (
                  <div 
                    key={platform.name}
                    className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      {platform.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{platform.name}</span>
                        <Badge variant="outline" className="text-xs">Recommended</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{platform.reason}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          {currentSection >= 2 && (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  Timeline Rencana Aksi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                  <div className="space-y-6">
                    {strategy.timeline.map((item, index) => (
                      <div key={item.week} className="relative pl-10">
                        <div className={`absolute left-2 w-5 h-5 rounded-full border-2 ${
                          index === 0 ? "bg-primary border-primary" : "bg-card border-primary/50"
                        }`}>
                          {index === 0 && <div className="absolute inset-1 rounded-full bg-primary-foreground" />}
                        </div>
                        <div className="p-4 rounded-xl bg-secondary/30">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge className="bg-primary/20 text-primary hover:bg-primary/30">{item.week}</Badge>
                            <span className="font-semibold text-foreground">{item.phase}</span>
                          </div>
                          <ul className="space-y-2">
                            {item.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tactical Matrix */}
          {currentSection >= 3 && (
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Hammer className="h-5 w-5 text-primary" />
                  Matriks Taktis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-3">
                  {strategy.tactics.map((tactic, index) => (
                    <div key={tactic.category} className="p-3 sm:p-4 rounded-xl bg-secondary/30 space-y-2 sm:space-y-3">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-primary" />
                        {tactic.category}
                      </h4>
                      <ul className="space-y-2">
                        {tactic.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
