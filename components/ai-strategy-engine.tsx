"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
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
  Briefcase,
  Check,
  X,
  Package,
  ChevronRight,
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

type EngineStep = "select" | "confirm" | "generating" | "result"

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

const generateTimeline = (category: string) => [
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

const generateTactics = (category: string, targetMarket: string) => [
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

export function AIStrategyEngine({ products, brandProfile, onGenerateStrategy }: AIStrategyEngineProps) {
  const [step, setStep] = useState<EngineStep>("select")
  const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(new Set())
  const [strategy, setStrategy] = useState<Strategy | null>(null)
  const [displayedText, setDisplayedText] = useState("")
  const [currentSection, setCurrentSection] = useState(0)
  const [introText, setIntroText] = useState("")
  const [resolvedCategory, setResolvedCategory] = useState("Lainnya")
  const [analysisProducts, setAnalysisProducts] = useState<Product[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const typewriterRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const selectedProducts = products.filter(p => selectedProductIds.has(p.id))

  const dominantCategory = selectedProducts.length > 0
    ? selectedProducts.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    : {}

  const topCategory = Object.entries(dominantCategory).sort((a, b) => b[1] - a[1])[0]?.[0] || "Lainnya"

  const toggleProduct = (id: string) => {
    setSelectedProductIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const selectAll = () => {
    if (selectedProductIds.size === products.length) {
      setSelectedProductIds(new Set())
    } else {
      setSelectedProductIds(new Set(products.map(p => p.id)))
    }
  }

  const handleConfirm = () => {
    // Snapshot selected products and category before transitioning
    const snapshotProducts = products.filter(p => selectedProductIds.has(p.id))
    const categoryCount = snapshotProducts.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    const category = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "Lainnya"

    setAnalysisProducts(snapshotProducts)
    setResolvedCategory(category)
    setStep("generating")
    setStrategy(null)
    setDisplayedText("")
    setCurrentSection(0)

    // Build the intro text now with stable values
    const productNames = snapshotProducts.map(p => p.name).join(", ")
    const text = `Berdasarkan analisis ${snapshotProducts.length} produk yang kamu pilih (${productNames}) dalam kategori ${category} dan target pasar ${brandProfile?.targetMarket || "lokal"}, berikut strategi yang direkomendasikan untuk ${brandProfile?.businessName || "bisnis kamu"}:`
    setIntroText(text)

    setTimeout(() => {
      const platforms = platformDatabase[category] || platformDatabase["Lainnya"]
      const timeline = generateTimeline(category)
      const tactics = generateTactics(category, brandProfile?.targetMarket || "lokal")
      setStrategy({ platforms, timeline, tactics })
      setStep("result")
      onGenerateStrategy()
    }, 3000)
  }

  const handleReset = () => {
    if (typewriterRef.current) {
      clearInterval(typewriterRef.current)
      typewriterRef.current = null
    }
    setStep("select")
    setSelectedProductIds(new Set())
    setStrategy(null)
    setDisplayedText("")
    setCurrentSection(0)
    setIntroText("")
    setAnalysisProducts([])
  }

  // Typewriter effect -- only runs once when strategy arrives
  useEffect(() => {
    if (strategy && step === "result" && currentSection === 0 && introText) {
      let index = 0
      if (typewriterRef.current) clearInterval(typewriterRef.current)

      typewriterRef.current = setInterval(() => {
        if (index < introText.length) {
          setDisplayedText(introText.slice(0, index + 1))
          index++
        } else {
          if (typewriterRef.current) clearInterval(typewriterRef.current)
          typewriterRef.current = null
          setTimeout(() => setCurrentSection(1), 500)
        }
      }, 20)

      return () => {
        if (typewriterRef.current) {
          clearInterval(typewriterRef.current)
          typewriterRef.current = null
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strategy, step])

  // Progressively reveal sections after typewriter finishes
  useEffect(() => {
    if (currentSection > 0 && currentSection < 4) {
      const timer = setTimeout(() => setCurrentSection(prev => prev + 1), 800)
      return () => clearTimeout(timer)
    }
  }, [currentSection])

  const canGenerate = products.length > 0

  return (
    <div className="space-y-6">
      {/* STEP 1: Product Selection */}
      {step === "select" && (
        <div className="space-y-5">
          {/* Header */}
          <div className="rounded-3xl glass-card p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="rounded-2xl bg-primary/10 p-3 sm:p-4">
                <Zap className="h-6 sm:h-8 w-6 sm:w-8 text-primary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-base sm:text-lg font-bold text-foreground">Spill Strategi - Pilih Produk</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Pilih produk mana saja yang ingin dianalisis. Kamu bisa pilih satu, beberapa, atau semua.
                </p>
              </div>
            </div>
          </div>

          {!canGenerate ? (
            <div className="rounded-3xl glass-card p-8 sm:p-12 flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <Package className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h4 className="text-base font-bold text-foreground">Belum ada produk</h4>
              <p className="mt-1 text-sm text-muted-foreground max-w-xs">
                Tambahkan minimal 1 produk di tab Produk sebelum bisa generate strategi.
              </p>
            </div>
          ) : (
            <>
              {/* Select All Toggle */}
              <div className="flex items-center justify-between px-1">
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">{selectedProductIds.size}</span> dari {products.length} produk dipilih
                </p>
                <button
                  onClick={selectAll}
                  className="text-xs font-bold text-primary hover:underline transition-all"
                >
                  {selectedProductIds.size === products.length ? "Batal Pilih Semua" : "Pilih Semua"}
                </button>
              </div>

              {/* Product List */}
              <div className="space-y-2">
                {products.map((product) => {
                  const isSelected = selectedProductIds.has(product.id)
                  const margin = ((product.sellPrice - product.costPrice) / product.sellPrice) * 100

                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => toggleProduct(product.id)}
                      className={`w-full rounded-2xl p-4 flex items-center gap-3 sm:gap-4 text-left transition-all duration-200 ${
                        isSelected
                          ? "glass-card border-primary/50 shadow-lg shadow-primary/10 ring-1 ring-primary/30"
                          : "glass-card hover:border-border/80"
                      }`}
                    >
                      {/* Checkbox */}
                      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-all ${
                        isSelected
                          ? "bg-primary border-primary"
                          : "border-border/60 bg-transparent"
                      }`}>
                        {isSelected && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
                      </div>

                      {/* Product Image */}
                      {product.image ? (
                        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl overflow-hidden shrink-0 border border-border/30">
                          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-secondary flex items-center justify-center shrink-0 border border-border/30">
                          <Package className="h-5 w-5 text-muted-foreground/50" />
                        </div>
                      )}

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-sm sm:text-base text-foreground truncate">{product.name}</p>
                          <Badge variant="outline" className="text-[10px] rounded-full border-primary/30 text-primary shrink-0 hidden sm:inline-flex">
                            {product.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="text-xs text-muted-foreground">Rp {product.sellPrice.toLocaleString("id-ID")}</span>
                          <span className="text-xs font-semibold text-green-400">Margin {margin.toFixed(0)}%</span>
                          <span className="text-xs text-muted-foreground">Stok: {product.stock}</span>
                        </div>
                      </div>

                      {/* Arrow hint */}
                      <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${isSelected ? "text-primary rotate-90" : "text-muted-foreground/30"}`} />
                    </button>
                  )
                })}
              </div>

              {/* Confirm Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  onClick={() => setStep("confirm")}
                  disabled={selectedProductIds.size === 0}
                  className="btn-pill w-full sm:w-auto bg-primary text-primary-foreground font-bold text-sm px-8 py-3.5 inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none"
                >
                  <Sparkles className="h-4 w-4" />
                  Lanjut ke Konfirmasi ({selectedProductIds.size})
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* STEP 2: Confirmation */}
      {step === "confirm" && (
        <div className="space-y-5">
          <div className="rounded-3xl glass-card p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="rounded-2xl bg-primary/10 p-3 sm:p-4">
                <Target className="h-6 sm:h-8 w-6 sm:w-8 text-primary" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-base sm:text-lg font-bold text-foreground">Konfirmasi Analisis</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Pastikan produk yang kamu pilih sudah benar sebelum generate strategi.
                </p>
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="rounded-3xl glass-card p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-foreground">Produk yang akan dianalisis:</h4>
              <Badge className="bg-primary/20 text-primary hover:bg-primary/30 rounded-full font-bold">
                {selectedProducts.length} produk
              </Badge>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {selectedProducts.map((product, index) => (
                <div key={product.id} className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/50">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-xs font-bold text-primary">{index + 1}</span>
                  {product.image ? (
                    <div className="h-9 w-9 rounded-lg overflow-hidden shrink-0">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Package className="h-4 w-4 text-muted-foreground/50" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{product.name}</p>
                    <p className="text-[10px] text-muted-foreground">{product.category} - Rp {product.sellPrice.toLocaleString("id-ID")}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Info */}
            <div className="rounded-2xl bg-primary/5 border border-primary/20 p-4">
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                AI akan menganalisis <span className="font-bold text-primary">{selectedProducts.length} produk</span> di kategori dominan <span className="font-bold text-primary">{topCategory}</span> untuk menghasilkan rekomendasi platform, timeline aksi, dan matriks taktis yang sesuai dengan bisnis kamu.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setStep("select")}
              className="btn-pill w-full sm:w-auto border border-border/50 text-foreground font-bold text-sm px-6 py-3 bg-transparent inline-flex items-center justify-center gap-2 hover:bg-secondary/50"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Ubah Pilihan
            </button>
            <button
              onClick={handleConfirm}
              className="btn-pill w-full sm:w-auto bg-primary text-primary-foreground font-bold text-sm px-8 py-3.5 inline-flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Generate Strategi Sekarang
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Generating (Loading) */}
      {step === "generating" && (
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-primary/50 to-primary animate-pulse blur-xl" />
          <div className="relative rounded-3xl glass-card p-8 sm:p-12 border-primary/50 shadow-lg shadow-primary/25">
            <div className="flex flex-col items-center text-center gap-5">
              <div className="relative rounded-2xl bg-primary/20 p-5">
                <Sparkles className="h-10 w-10 text-primary animate-pulse" />
                <div className="absolute inset-0 rounded-2xl bg-primary/30 animate-ping" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Lagi mikir strategi terbaik...</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Menganalisis {analysisProducts.length} produk di kategori {resolvedCategory} dan menyusun rencana aksi.
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Results (Strategy Output with Typewriter Effect) */}
      {step === "result" && strategy && (
        <div ref={containerRef} className="space-y-6">
          {/* Reset / Analyze Again */}
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-foreground">Hasil Analisis</h3>
            <button
              onClick={handleReset}
              className="btn-pill border border-border/50 text-foreground font-semibold text-xs px-4 py-2 bg-transparent inline-flex items-center gap-1.5 hover:bg-secondary/50"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              Analisis Ulang
            </button>
          </div>

          {/* Intro Text */}
          <div className="rounded-3xl glass-card p-5 sm:p-6">
            <p className="text-foreground leading-relaxed">
              {displayedText}
              {currentSection === 0 && <span className="animate-pulse text-primary">|</span>}
            </p>
          </div>

          {/* Platform Recommendations */}
          {currentSection >= 1 && (
            <div className="rounded-3xl glass-card overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-5 sm:p-6 pb-3">
                <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
                  <Target className="h-5 w-5 text-primary" />
                  Platform yang Direkomendasikan
                </h3>
              </div>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-3">
                {strategy.platforms.map((platform, index) => (
                  <div 
                    key={platform.name}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-secondary/50 hover:bg-secondary/80 transition-colors"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="rounded-xl bg-primary/10 p-2 text-primary">
                      {platform.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{platform.name}</span>
                        <Badge variant="outline" className="text-xs rounded-full border-primary/30 text-primary">Recommended</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{platform.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline */}
          {currentSection >= 2 && (
            <div className="rounded-3xl glass-card overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-5 sm:p-6 pb-3">
                <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
                  <Calendar className="h-5 w-5 text-primary" />
                  Timeline Rencana Aksi
                </h3>
              </div>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
                  <div className="space-y-6">
                    {strategy.timeline.map((item, index) => (
                      <div key={item.week} className="relative pl-10">
                        <div className={`absolute left-2 w-5 h-5 rounded-full border-2 ${
                          index === 0 ? "bg-primary border-primary" : "bg-popover border-primary/50"
                        }`}>
                          {index === 0 && <div className="absolute inset-1 rounded-full bg-primary-foreground" />}
                        </div>
                        <div className="p-4 rounded-2xl bg-secondary/50">
                          <div className="flex items-center gap-3 mb-3">
                            <Badge className="bg-primary/20 text-primary hover:bg-primary/30 rounded-full">{item.week}</Badge>
                            <span className="font-bold text-foreground">{item.phase}</span>
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
              </div>
            </div>
          )}

          {/* Tactical Matrix */}
          {currentSection >= 3 && (
            <div className="rounded-3xl glass-card overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-5 sm:p-6 pb-3">
                <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
                  <Hammer className="h-5 w-5 text-primary" />
                  Matriks Taktis
                </h3>
              </div>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                  {strategy.tactics.map((tactic, index) => (
                    <div key={tactic.category} className="p-4 rounded-2xl bg-secondary/50 space-y-3">
                      <h4 className="font-bold text-foreground flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-primary" />
                        {tactic.category}
                      </h4>
                      <ul className="space-y-2">
                        {tactic.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-1 shrink-0">&#8226;</span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
