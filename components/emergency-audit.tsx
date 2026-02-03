"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    
    // Analyze products and generate relevant audit steps
    const lowMarginProducts = products.filter(p => {
      const margin = ((p.sellPrice - p.costPrice) / p.sellPrice) * 100
      return margin < 20
    })

    const lowStockProducts = products.filter(p => p.stock < 10)
    const noImageProducts = products.filter(p => !p.image)
    const avgMargin = products.length > 0 
      ? products.reduce((acc, p) => acc + ((p.sellPrice - p.costPrice) / p.sellPrice) * 100, 0) / products.length
      : 0

    // Step 1: Margin Analysis
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

    // Step 2: Stock Check
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

    // Step 3: Visual Content
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

    // Step 4: Marketing Review
    steps.push({
      id: 4,
      title: "Audit Channel Marketing",
      description: "Review performa setiap channel marketing. Fokuskan budget pada channel dengan ROAS tertinggi.",
      action: "Hentikan iklan di platform dengan performa buruk selama 7 hari, alihkan ke platform terbaik",
      priority: "medium",
      status: "pending"
    })

    // Step 5: Customer Feedback
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

  const priorityColors = {
    high: "bg-red-500/20 text-red-400 border-red-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30"
  }

  return (
    <div className="space-y-6">
      {/* Emergency Button */}
      <Card className={`relative overflow-hidden transition-all duration-500 border-border/50 ${isAuditing ? "border-red-500/50 shadow-lg shadow-red-500/10" : ""}`}>
        {isAuditing && (
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 animate-pulse" />
        )}
        <CardContent className="p-6 relative">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className={`relative rounded-2xl p-4 ${isAuditing ? "bg-red-500/20" : "bg-red-500/10"}`}>
              {isAuditing ? (
                <div className="relative">
                  <RefreshCcw className="h-8 w-8 text-red-400 animate-spin" />
                </div>
              ) : (
                <AlertTriangle className="h-8 w-8 text-red-400" />
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-foreground">Tombol Darurat Anti-Stagnant</h3>
              <p className="text-sm text-muted-foreground">
                {isAuditing 
                  ? "Menganalisis bisnis Anda dan mencari masalah..."
                  : "Dapatkan 5 langkah audit kilat jika bisnis terasa melambat"
                }
              </p>
            </div>
            <Button
              onClick={runAudit}
              disabled={isAuditing || products.length === 0}
              variant="destructive"
              className="min-w-[160px]"
            >
              {isAuditing ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Scanning...
                </span>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Audit Kilat
                </>
              )}
            </Button>
          </div>

          {products.length === 0 && (
            <p className="mt-4 text-sm text-yellow-500 text-center">
              Tambahkan produk terlebih dahulu untuk menjalankan audit
            </p>
          )}
        </CardContent>
      </Card>

      {/* Audit Results */}
      {showResults && auditSteps.length > 0 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Progress Bar */}
          <Card className="border-border/50 bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Progress Audit</span>
                <span className="text-sm font-semibold text-foreground">{completedSteps}/{auditSteps.length} selesai</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-green-400 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Audit Steps */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingDown className="h-5 w-5 text-red-400" />
                5 Langkah Audit Kilat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {auditSteps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
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
                        <span className="text-sm font-semibold text-muted-foreground">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h4 className={`font-semibold ${step.status === "completed" ? "text-green-400 line-through" : "text-foreground"}`}>
                          {step.title}
                        </h4>
                        <Badge variant="outline" className={priorityColors[step.priority]}>
                          {step.priority === "high" ? "Urgent" : step.priority === "medium" ? "Penting" : "Nice to have"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                      <div className="flex items-start gap-2 p-2 rounded-lg bg-background/50">
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
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
