"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import type { Product } from "./product-form"
import { 
  AlertTriangle, 
  Zap, 
  CheckCircle2, 
  XCircle,
  TrendingDown,
  ArrowRight,
  RefreshCcw
} from "lucide-react"

interface EmergencyAuditProps {
  products: Product[]
}

interface AuditStep {
  id: number
  title: string
  description: string
  action: string
  priority: "high" | "medium" | "low"
  status: "pending" | "completed"
}

export function EmergencyAudit({ products }: EmergencyAuditProps) {
  const [isAuditing, setIsAuditing] = useState(false)
  const [auditSteps, setAuditSteps] = useState<AuditStep[]>([])
  const [showResults, setShowResults] = useState(false)

  const generateAuditSteps = (): AuditStep[] => {
    const steps: AuditStep[] = []
    const lowMarginProducts = products.filter(p => {
      const margin = ((p.sellPrice - p.costPrice) / p.sellPrice) * 100
      return margin < 20
    })
    const lowStockProducts = products.filter(p => p.stock < 10)
    const noImageProducts = products.filter(p => !p.image)

    if (lowMarginProducts.length > 0) {
      steps.push({
        id: 1,
        title: "Review Harga Produk Margin Rendah",
        description: `${lowMarginProducts.length} produk memiliki margin di bawah 20%. Pertimbangkan untuk menaikkan harga atau negosiasi ulang dengan supplier.`,
        action: `Produk: ${lowMarginProducts.slice(0, 3).map(p => p.name).join(", ")}${lowMarginProducts.length > 3 ? "..." : ""}`,
        priority: "high",
        status: "pending"
      })
    }

    if (lowStockProducts.length > 0) {
      steps.push({
        id: 2,
        title: "Restok Produk Segera",
        description: `${lowStockProducts.length} produk memiliki stok di bawah 10 unit. Segera lakukan restok untuk menghindari kehabisan stok.`,
        action: `Produk: ${lowStockProducts.slice(0, 3).map(p => `${p.name} (${p.stock})`).join(", ")}`,
        priority: "high",
        status: "pending"
      })
    }

    if (noImageProducts.length > 0) {
      steps.push({
        id: 3,
        title: "Tambahkan Foto Produk",
        description: `${noImageProducts.length} produk belum memiliki foto. Produk dengan foto memiliki conversion rate 40% lebih tinggi.`,
        action: "Upload foto berkualitas untuk setiap produk yang belum memiliki gambar",
        priority: "medium",
        status: "pending"
      })
    }

    steps.push({
      id: 4,
      title: "Audit Channel Marketing",
      description: "Review performa setiap channel marketing. Fokuskan budget pada channel dengan ROAS tertinggi.",
      action: "Hentikan iklan di platform dengan performa buruk selama 7 hari, alihkan ke platform terbaik",
      priority: "medium",
      status: "pending"
    })

    steps.push({
      id: 5,
      title: "Kumpulkan Feedback Pelanggan",
      description: "Hubungi 10 pelanggan terakhir untuk mendapatkan insight tentang hambatan pembelian.",
      action: "Kirim survey singkat via WhatsApp dengan insentif diskon 10% untuk pembelian berikutnya",
      priority: "low",
      status: "pending"
    })

    return steps.slice(0, 5)
  }

  const runAudit = () => {
    setIsAuditing(true)
    setShowResults(false)
    setTimeout(() => {
      const steps = generateAuditSteps()
      setAuditSteps(steps)
      setIsAuditing(false)
      setShowResults(true)
    }, 2000)
  }

  const toggleStepStatus = (id: number) => {
    setAuditSteps(steps => 
      steps.map(step => 
        step.id === id 
          ? { ...step, status: step.status === "pending" ? "completed" : "pending" }
          : step
      )
    )
  }

  const completedSteps = auditSteps.filter(s => s.status === "completed").length
  const progress = auditSteps.length > 0 ? (completedSteps / auditSteps.length) * 100 : 0

  const priorityColors: Record<string, string> = {
    high: "bg-red-500/20 text-red-400 border-red-500/30",
    medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  }

  return (
    <div className="space-y-6">
      {/* Emergency Button */}
      <div className={`relative rounded-3xl glass-card overflow-hidden transition-all duration-500 ${isAuditing ? "shadow-lg shadow-red-500/10" : ""}`}>
        {isAuditing && (
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 animate-pulse" />
        )}
        <div className="p-5 sm:p-6 relative">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className={`relative rounded-2xl p-4 ${isAuditing ? "bg-red-500/20" : "bg-red-500/10"}`}>
              {isAuditing ? (
                <RefreshCcw className="h-7 sm:h-8 w-7 sm:w-8 text-red-400 animate-spin" />
              ) : (
                <AlertTriangle className="h-7 sm:h-8 w-7 sm:w-8 text-red-400" />
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-bold text-foreground">Tombol Darurat Anti-Stagnant</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {isAuditing 
                  ? "Lagi scanning bisnis kamu, sabar ya..."
                  : "Bisnis terasa melambat? Dapatkan 5 langkah audit kilat sekarang"
                }
              </p>
            </div>
            <button
              onClick={runAudit}
              disabled={isAuditing || products.length === 0}
              className="btn-pill bg-red-500 text-white font-bold text-sm px-6 py-3 w-full sm:w-auto inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none hover:bg-red-600"
            >
              {isAuditing ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Scanning...
                </span>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Audit Kilat
                </>
              )}
            </button>
          </div>

          {products.length === 0 && (
            <p className="mt-4 text-sm text-amber-400 text-center">
              Tambahkan produk terlebih dahulu untuk menjalankan audit
            </p>
          )}
        </div>
      </div>

      {/* Audit Results */}
      {showResults && auditSteps.length > 0 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Progress Bar */}
          <div className="rounded-3xl glass-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Progress Audit</span>
              <span className="text-sm font-bold text-foreground">{completedSteps}/{auditSteps.length} selesai</span>
            </div>
            <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-green-400 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Audit Steps */}
          <div className="rounded-3xl glass-card overflow-hidden">
            <div className="p-5 sm:p-6 pb-3">
              <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
                <TrendingDown className="h-5 w-5 text-red-400" />
                5 Langkah Audit Kilat
              </h3>
            </div>
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-4">
              {auditSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    step.status === "completed" 
                      ? "bg-green-500/10 border-green-500/30" 
                      : "bg-secondary/30 border-border/50 hover:border-primary/30"
                  }`}
                  onClick={() => toggleStepStatus(step.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === "completed" ? "bg-green-500/20" : "bg-secondary"
                    }`}>
                      {step.status === "completed" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      ) : (
                        <span className="text-sm font-bold text-muted-foreground">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className={`font-bold ${step.status === "completed" ? "text-green-400 line-through" : "text-foreground"}`}>
                          {step.title}
                        </h4>
                        <Badge variant="outline" className={`${priorityColors[step.priority]} rounded-full text-xs`}>
                          {step.priority === "high" ? "Urgent" : step.priority === "medium" ? "Penting" : "Nice to have"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-background/50">
                        <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground">{step.action}</span>
                      </div>
                    </div>
                    {step.status === "completed" && (
                      <XCircle className="h-5 w-5 text-muted-foreground shrink-0" />
                    )}
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
