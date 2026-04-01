"use client"

import { useState, useEffect } from "react"
import { 
  Shirt,
  Utensils,
  Smartphone,
  Sparkles as BeautyIcon,
  Home,
  Briefcase,
  Clock,
  TrendingUp,
  MessageSquare,
  AlertTriangle,
  Zap,
  Calendar,
  Target,
  Play
} from "lucide-react"
import { Product } from "./product-form"

interface SectorStrategy {
  sector: string
  icon: React.ReactNode
  color: string
  primeTime: string
  contentType: string
  platforms: string[]
  tactics: string[]
  autoTrigger: string
}

interface SentimentItem {
  keyword: string
  count: number
  sentiment: "positive" | "negative" | "neutral"
  recommendation: string
}

interface MultiSectorStrategyProps {
  products: Product[]
}

const SECTOR_STRATEGIES: Record<string, SectorStrategy> = {
  "Fashion": {
    sector: "Fashion",
    icon: <Shirt className="h-5 w-5" />,
    color: "#BC00FF",
    primeTime: "19:00 - 21:00",
    contentType: "Video transisi & OOTD",
    platforms: ["TikTok Shop", "Instagram", "Shopee"],
    tactics: [
      "Posting video transisi outfit di prime time TikTok",
      "Kolaborasi dengan micro-influencer fashion lokal",
      "Flash sale setiap akhir bulan untuk clear stock",
      "Bundle produk untuk tingkatkan AOV"
    ],
    autoTrigger: "Auto-schedule konten setiap 19:00 untuk reach maksimal"
  },
  "Makanan & Minuman": {
    sector: "Makanan & Minuman",
    icon: <Utensils className="h-5 w-5" />,
    color: "#00FF88",
    primeTime: "11:00 - 13:00 & 17:00 - 19:00",
    contentType: "Food photography & mukbang",
    platforms: ["GoFood", "GrabFood", "TikTok Shop"],
    tactics: [
      "Promo Happy Hour di jam sepi (14:00-16:00)",
      "Menu bundling untuk keluarga di weekend",
      "Challenge mukbang di TikTok dengan hashtag branded",
      "Free delivery radius 3km untuk order pertama"
    ],
    autoTrigger: "Auto-aktifkan promo di jam sepi berdasarkan data histori"
  },
  "Elektronik": {
    sector: "Elektronik",
    icon: <Smartphone className="h-5 w-5" />,
    color: "#00F3FF",
    primeTime: "20:00 - 22:00",
    contentType: "Comparison & unboxing",
    platforms: ["Tokopedia", "Shopee", "Bukalapak"],
    tactics: [
      "Generate tabel perbandingan spek vs kompetitor",
      "Video unboxing dan first impression",
      "Garansi toko tambahan sebagai USP",
      "Flash deal setiap tanggal gajian (25-1)"
    ],
    autoTrigger: "Auto-generate perbandingan spek dengan produk kompetitor"
  },
  "Kecantikan": {
    sector: "Kecantikan",
    icon: <BeautyIcon className="h-5 w-5" />,
    color: "#FF69B4",
    primeTime: "19:00 - 21:00",
    contentType: "Tutorial & before-after",
    platforms: ["TikTok Shop", "Shopee", "Instagram"],
    tactics: [
      "Tutorial makeup dengan produk untuk different occasions",
      "Before-after challenge dengan real customers",
      "Sample gratis untuk pembelian pertama",
      "Affiliate program dengan beauty blogger"
    ],
    autoTrigger: "Trigger campaign saat ada tren makeup baru"
  },
  "Rumah Tangga": {
    sector: "Rumah Tangga",
    icon: <Home className="h-5 w-5" />,
    color: "#FFD700",
    primeTime: "09:00 - 11:00 & 19:00 - 21:00",
    contentType: "Life hacks & home organization",
    platforms: ["Shopee", "Tokopedia", "TikTok Shop"],
    tactics: [
      "Video life hacks menggunakan produk rumah tangga",
      "Promo bundling untuk new home owners",
      "Flash sale di hari Minggu (cleaning day)",
      "Review jujur dari real customers"
    ],
    autoTrigger: "Notifikasi promo setiap Minggu pagi"
  },
  "Jasa": {
    sector: "Jasa",
    icon: <Briefcase className="h-5 w-5" />,
    color: "#8B5CF6",
    primeTime: "08:00 - 10:00 (weekday)",
    contentType: "Portfolio & testimonial",
    platforms: ["Instagram", "LinkedIn", "Google Business"],
    tactics: [
      "Showcase portfolio dan hasil kerja",
      "Testimonial video dari satisfied clients",
      "Paket bundling untuk repeat customers",
      "Referral program dengan insentif"
    ],
    autoTrigger: "Follow-up otomatis 3 hari setelah project selesai"
  }
}

// Simulated sentiment data
const SAMPLE_SENTIMENTS: SentimentItem[] = [
  { keyword: "cepat", count: 45, sentiment: "positive", recommendation: "Pertahankan kecepatan pengiriman" },
  { keyword: "murah", count: 38, sentiment: "positive", recommendation: "Highlight harga kompetitif di ads" },
  { keyword: "lambat", count: 12, sentiment: "negative", recommendation: "Review proses fulfillment" },
  { keyword: "rusak", count: 8, sentiment: "negative", recommendation: "Perbaiki packaging produk" },
  { keyword: "bagus", count: 67, sentiment: "positive", recommendation: "Gunakan sebagai social proof" },
  { keyword: "recommended", count: 52, sentiment: "positive", recommendation: "Tampilkan di landing page" },
]

export function MultiSectorStrategy({ products }: MultiSectorStrategyProps) {
  const [detectedSectors, setDetectedSectors] = useState<string[]>([])
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [sentiments, setSentiments] = useState<SentimentItem[]>(SAMPLE_SENTIMENTS)
  const [activeTab, setActiveTab] = useState<"strategy" | "sentiment">("strategy")

  // Detect sectors from products
  useEffect(() => {
    const categoryMap: Record<string, string> = {
      "Fashion": "Fashion",
      "Makanan & Minuman": "Makanan & Minuman",
      "Elektronik": "Elektronik",
      "Kecantikan": "Kecantikan",
      "Rumah Tangga": "Rumah Tangga",
      "Jasa": "Jasa"
    }

    const sectors = new Set<string>()
    products.forEach(p => {
      const mapped = categoryMap[p.category]
      if (mapped) sectors.add(mapped)
    })

    const sectorArray = Array.from(sectors)
    setDetectedSectors(sectorArray)
    if (sectorArray.length > 0 && !selectedSector) {
      setSelectedSector(sectorArray[0])
    }
  }, [products, selectedSector])

  const currentStrategy = selectedSector ? SECTOR_STRATEGIES[selectedSector] : null
  const negativeSentiments = sentiments.filter(s => s.sentiment === "negative")
  const positiveSentiments = sentiments.filter(s => s.sentiment === "positive")

  return (
    <div className="space-y-6">
      {/* Tab Selector */}
      <div className="flex gap-2 p-1 rounded-xl bg-secondary/50 w-fit">
        <button
          onClick={() => setActiveTab("strategy")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "strategy" 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sector Strategy
        </button>
        <button
          onClick={() => setActiveTab("sentiment")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "sentiment" 
              ? "bg-primary text-primary-foreground" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sentiment Analysis
        </button>
      </div>

      {activeTab === "strategy" && (
        <>
          {/* Sector Selector */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Detected Business Sectors</h3>
            
            {detectedSectors.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Tambahkan produk dengan kategori untuk melihat strategi sector</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-3">
                {detectedSectors.map((sector) => {
                  const strategy = SECTOR_STRATEGIES[sector]
                  return (
                    <button
                      key={sector}
                      onClick={() => setSelectedSector(sector)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                        selectedSector === sector
                          ? "border-primary/50 bg-primary/10"
                          : "border-border/30 bg-secondary/30 hover:border-primary/30"
                      }`}
                      style={{ 
                        borderColor: selectedSector === sector ? strategy?.color : undefined,
                        backgroundColor: selectedSector === sector ? `${strategy?.color}15` : undefined
                      }}
                    >
                      <div 
                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${strategy?.color}20`, color: strategy?.color }}
                      >
                        {strategy?.icon}
                      </div>
                      <span className="text-sm font-semibold text-foreground">{sector}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Strategy Details */}
          {currentStrategy && (
            <div className="glass-card rounded-2xl p-6" style={{ borderColor: `${currentStrategy.color}30` }}>
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${currentStrategy.color}20`, color: currentStrategy.color }}
                >
                  {currentStrategy.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{currentStrategy.sector} Strategy</h3>
                  <p className="text-sm text-muted-foreground">Modern tactics untuk {currentStrategy.sector.toLowerCase()}</p>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/20">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">Prime Time</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{currentStrategy.primeTime}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/20">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Play className="h-4 w-4" />
                    <span className="text-xs">Content Type</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{currentStrategy.contentType}</p>
                </div>
                <div className="col-span-2 p-4 rounded-xl bg-secondary/30 border border-border/20">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Target className="h-4 w-4" />
                    <span className="text-xs">Platforms</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentStrategy.platforms.map((platform) => (
                      <span 
                        key={platform} 
                        className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Auto Trigger */}
              <div 
                className="p-4 rounded-xl mb-6 border"
                style={{ 
                  backgroundColor: `${currentStrategy.color}10`, 
                  borderColor: `${currentStrategy.color}30` 
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4" style={{ color: currentStrategy.color }} />
                  <span className="text-xs font-semibold" style={{ color: currentStrategy.color }}>AUTO TRIGGER</span>
                </div>
                <p className="text-sm text-foreground">{currentStrategy.autoTrigger}</p>
              </div>

              {/* Tactics List */}
              <div>
                <h4 className="text-sm font-bold text-foreground mb-3">Recommended Tactics</h4>
                <div className="space-y-3">
                  {currentStrategy.tactics.map((tactic, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-border/20"
                    >
                      <div 
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold shrink-0"
                        style={{ backgroundColor: `${currentStrategy.color}20`, color: currentStrategy.color }}
                      >
                        {index + 1}
                      </div>
                      <p className="text-sm text-foreground">{tactic}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "sentiment" && (
        <div className="space-y-6">
          {/* Sentiment Overview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00FF88]/20">
                  <TrendingUp className="h-5 w-5 text-[#00FF88]" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Positive</p>
                  <p className="text-2xl font-bold text-[#00FF88]">{positiveSentiments.length}</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/20">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Negative</p>
                  <p className="text-2xl font-bold text-destructive">{negativeSentiments.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Negative Sentiments (Priority) */}
          {negativeSentiments.length > 0 && (
            <div className="glass-card rounded-2xl p-6 border-destructive/30">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/20">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Attention Required</h3>
                  <p className="text-sm text-muted-foreground">Keyword negatif dari review pelanggan</p>
                </div>
              </div>

              <div className="space-y-3">
                {negativeSentiments.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-destructive/5 border border-destructive/20"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-destructive">"{item.keyword}"</span>
                      <span className="text-xs text-muted-foreground">({item.count} mentions)</span>
                    </div>
                    <div className="text-right max-w-[200px]">
                      <p className="text-xs text-foreground">{item.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Positive Sentiments */}
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00FF88]/20">
                <MessageSquare className="h-6 w-6 text-[#00FF88]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Positive Feedback</h3>
                <p className="text-sm text-muted-foreground">Leverage untuk marketing</p>
              </div>
            </div>

            <div className="space-y-3">
              {positiveSentiments.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border/20"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-[#00FF88]">"{item.keyword}"</span>
                    <span className="text-xs text-muted-foreground">({item.count} mentions)</span>
                  </div>
                  <div className="text-right max-w-[200px]">
                    <p className="text-xs text-foreground">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
