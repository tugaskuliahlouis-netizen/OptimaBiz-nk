"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ProductForm, type Product } from "@/components/product-form"
import { ProductCard } from "@/components/product-card"
import { BrandProfileForm, type BrandProfile } from "@/components/brand-profile"
import { AIStrategyEngine } from "@/components/ai-strategy-engine"
import { GrowthChart } from "@/components/growth-chart"
import { EmergencyAudit } from "@/components/emergency-audit"
import {
  Plus,
  Package,
  TrendingUp,
  DollarSign,
  LayoutGrid,
  Sparkles,
  Settings,
  Zap,
  BarChart3,
  AlertTriangle,
  Building2,
} from "lucide-react"

const sidebarItems = [
  { id: "produk", label: "Produk", icon: Package },
  { id: "strategi", label: "Spill Strategi", icon: Zap },
  { id: "analitik", label: "Analitik", icon: BarChart3 },
  { id: "darurat", label: "Anti-Stagnant", icon: AlertTriangle },
]

export default function OptimaBiz() {
  const [products, setProducts] = useState<Product[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null)
  const [activeTab, setActiveTab] = useState("produk")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  useEffect(() => {
    const savedProducts = localStorage.getItem("optimabiz_products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }
    const savedProfile = localStorage.getItem("optimabiz_brand_profile")
    if (savedProfile) {
      setBrandProfile(JSON.parse(savedProfile))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("optimabiz_products", JSON.stringify(products))
  }, [products])

  const handleAddProduct = (product: Product) => {
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? product : p)))
      setEditingProduct(null)
    } else {
      setProducts([product, ...products])
    }
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingProduct(null)
  }

  const handleSaveBrandProfile = (profile: BrandProfile) => {
    setBrandProfile(profile)
    localStorage.setItem("optimabiz_brand_profile", JSON.stringify(profile))
  }

  const totalProducts = products.length
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0)
  const totalValue = products.reduce((acc, p) => acc + p.sellPrice * p.stock, 0)
  const avgMargin =
    products.length > 0
      ? products.reduce((acc, p) => {
          const margin = ((p.sellPrice - p.costPrice) / p.sellPrice) * 100
          return acc + margin
        }, 0) / products.length
      : 0

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Ambient gold glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/12 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 fixed inset-y-0 left-0 z-40 bg-sidebar border-r border-sidebar-border">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-sidebar-foreground tracking-tight">OptimaBiz</h1>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Navigator</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 p-4 space-y-1.5">
            {sidebarItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 space-y-2 border-t border-sidebar-border">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all"
            >
              <Settings className="h-5 w-5" />
              Atur Strategi
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 pb-24 lg:pb-8">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 border-b border-border/30 bg-background/60 backdrop-blur-2xl">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
              {/* Mobile Logo */}
              <div className="flex items-center gap-3 lg:hidden">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-extrabold text-foreground tracking-tight">OptimaBiz</span>
              </div>

              {/* Desktop Title */}
              <div className="hidden lg:block">
                <h2 className="text-xl font-extrabold text-foreground tracking-tight">
                  {activeTab === "produk" ? "Cek Vibes" : 
                   activeTab === "strategi" ? "Spill Strategi" : 
                   activeTab === "analitik" ? "Analitik" : "Anti-Stagnant"}
                </h2>
                <p className="text-xs text-muted-foreground">Dashboard bisnis kamu</p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Emergency Button - small neon red */}
                <button
                  onClick={() => setActiveTab("darurat")}
                  className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
                    activeTab === "darurat" 
                      ? "bg-red-500/20 border-red-500/50 text-red-400" 
                      : "border-red-500/20 text-red-400/60 hover:border-red-500/40 hover:text-red-400"
                  }`}
                >
                  <AlertTriangle className="h-4 w-4" />
                  <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                </button>

                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                >
                  <Settings className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="btn-pill bg-primary text-primary-foreground font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 inline-flex items-center gap-1.5"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Tambah</span> Produk
                </button>
              </div>
            </div>
          </header>

          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Tab: Produk */}
            {activeTab === "produk" && (
              <div>
                {/* Stats Cards - Glassmorphism White */}
                <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
                  <div className="group rounded-3xl glass-card-white p-4 sm:p-5 hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="rounded-2xl bg-primary/10 p-2 sm:p-2.5">
                        <Package className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs text-card-foreground/60 truncate">Total Produk</p>
                        <p className="text-lg sm:text-2xl font-extrabold text-card-foreground">{totalProducts}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group rounded-3xl glass-card-white p-4 sm:p-5 hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="rounded-2xl bg-blue-500/10 p-2 sm:p-2.5">
                        <LayoutGrid className="h-4 sm:h-5 w-4 sm:w-5 text-blue-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs text-card-foreground/60 truncate">Total Stok</p>
                        <p className="text-lg sm:text-2xl font-extrabold text-card-foreground">{totalStock.toLocaleString("id-ID")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="group rounded-3xl glass-card-white p-4 sm:p-5 hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="rounded-2xl bg-green-500/10 p-2 sm:p-2.5">
                        <DollarSign className="h-4 sm:h-5 w-4 sm:w-5 text-green-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs text-card-foreground/60 truncate">Nilai Inventaris</p>
                        <p className="text-base sm:text-2xl font-extrabold text-card-foreground truncate">
                          Rp {totalValue.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="group rounded-3xl glass-card-white p-4 sm:p-5 hover:scale-[1.02] transition-all duration-300">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="rounded-2xl bg-amber-500/10 p-2 sm:p-2.5">
                        <TrendingUp className="h-4 sm:h-5 w-4 sm:w-5 text-amber-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] sm:text-xs text-card-foreground/60 truncate">Rata-rata Margin</p>
                        <p className="text-lg sm:text-2xl font-extrabold text-card-foreground">{avgMargin.toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                {products.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                      <div className="relative rounded-full glass-card p-8 sm:p-10">
                        <Package className="h-14 sm:h-20 w-14 sm:w-20 text-muted-foreground/40" />
                      </div>
                    </div>
                    <h3 className="mt-6 sm:mt-8 text-lg sm:text-xl font-bold text-foreground text-center">Belum ada produk</h3>
                    <p className="mt-2 text-sm sm:text-base text-muted-foreground text-center max-w-md">
                      Mulai tambahkan produk kamu untuk mengelola inventaris dan dapatkan rekomendasi strategi bisnis.
                    </p>
                    <button
                      onClick={() => setIsDialogOpen(true)}
                      className="btn-pill mt-6 bg-primary text-primary-foreground font-bold text-sm px-6 py-3 inline-flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Tambah Produk Pertama
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onDelete={handleDeleteProduct}
                        onEdit={handleEditProduct}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab: Strategi */}
            {activeTab === "strategi" && (
              <AIStrategyEngine 
                products={products}
                brandProfile={brandProfile}
                onGenerateStrategy={() => {}}
              />
            )}

            {/* Tab: Analitik */}
            {activeTab === "analitik" && (
              <GrowthChart 
                totalProducts={totalProducts}
                avgMargin={avgMargin}
                totalValue={totalValue}
              />
            )}

            {/* Tab: Darurat */}
            {activeTab === "darurat" && (
              <EmergencyAudit products={products} />
            )}
          </div>
        </main>
      </div>

      {/* Mobile Floating Bottom Dock */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
        <nav className="flex items-center justify-around gap-1 rounded-[28px] bg-secondary/90 backdrop-blur-2xl border border-border/30 px-2 py-2 shadow-2xl shadow-background/80">
          {sidebarItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-all duration-200 min-w-0 flex-1 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className={`h-5 w-5 ${item.id === "darurat" && !isActive ? "text-red-400/60" : ""}`} />
                <span className={`text-[10px] font-semibold truncate ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`}>
                  {item.id === "strategi" ? "Strategi" : 
                   item.id === "darurat" ? "Darurat" : item.label}
                </span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-popover border-border/50 p-4 sm:p-6 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-extrabold">
              {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
            </DialogTitle>
          </DialogHeader>
          <ProductForm
            key={editingProduct?.id || "new"}
            onAddProduct={handleAddProduct}
            onClose={handleCloseDialog}
          />
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-popover border-border/50 p-4 sm:p-6 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-extrabold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Atur Strategi
            </DialogTitle>
          </DialogHeader>
          <BrandProfileForm
            onSave={handleSaveBrandProfile}
            initialProfile={brandProfile}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
