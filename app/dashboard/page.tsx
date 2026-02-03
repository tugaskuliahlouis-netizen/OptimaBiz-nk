"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function OptimaBiz() {
  const [products, setProducts] = useState<Product[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null)
  const [activeTab, setActiveTab] = useState("produk")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  // Load products and brand profile from localStorage on mount
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

  // Save products to localStorage whenever they change
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

  // Calculate stats
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
    <div className="min-h-screen bg-background">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/50 blur-xl rounded-full" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/50">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">OptimaBiz</h1>
                  <p className="text-xs text-muted-foreground">Enterprise Navigator</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsSettingsOpen(true)}
                  className="bg-transparent border-border/50 hover:bg-secondary h-9 w-9 sm:h-10 sm:w-10"
                >
                  <Settings className="h-4 sm:h-5 w-4 sm:w-5" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => setIsDialogOpen(true)}
                  className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 text-xs sm:text-sm"
                >
                  <Plus className="mr-1 sm:mr-2 h-4 w-4" />
                  <span className="hidden xs:inline">Tambah</span> Produk
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="bg-card/50 border border-border/50 p-1 h-auto flex flex-wrap gap-1 w-full sm:w-auto">
              <TabsTrigger value="produk" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 sm:gap-2 text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 flex-1 sm:flex-none">
                <Package className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                <span className="hidden xs:inline">Produk</span>
              </TabsTrigger>
              <TabsTrigger value="strategi" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 sm:gap-2 text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 flex-1 sm:flex-none">
                <Zap className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                <span className="hidden xs:inline">Strategi</span>
              </TabsTrigger>
              <TabsTrigger value="analitik" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 sm:gap-2 text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 flex-1 sm:flex-none">
                <BarChart3 className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                <span className="hidden xs:inline">Analitik</span>
              </TabsTrigger>
              <TabsTrigger value="darurat" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-1.5 sm:gap-2 text-xs sm:text-sm px-2.5 sm:px-3 py-1.5 sm:py-2 flex-1 sm:flex-none">
                <AlertTriangle className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                <span className="hidden xs:inline">Darurat</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab: Produk */}
            <TabsContent value="produk" className="mt-6">
              {/* Stats Cards */}
              <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
                <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-card to-card/50 p-3 sm:p-5 border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="rounded-lg sm:rounded-xl bg-primary/10 p-2 sm:p-2.5">
                        <Package className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">Total Produk</p>
                        <p className="text-lg sm:text-2xl font-bold text-foreground">{totalProducts}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-card to-card/50 p-3 sm:p-5 border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="rounded-lg sm:rounded-xl bg-blue-500/10 p-2 sm:p-2.5">
                        <LayoutGrid className="h-4 sm:h-5 w-4 sm:w-5 text-blue-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">Total Stok</p>
                        <p className="text-lg sm:text-2xl font-bold text-foreground">{totalStock.toLocaleString("id-ID")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-card to-card/50 p-3 sm:p-5 border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="rounded-lg sm:rounded-xl bg-green-500/10 p-2 sm:p-2.5">
                        <DollarSign className="h-4 sm:h-5 w-4 sm:w-5 text-green-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">Nilai Inventaris</p>
                        <p className="text-base sm:text-2xl font-bold text-foreground truncate">
                          Rp {totalValue.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-card to-card/50 p-3 sm:p-5 border border-border/50 hover:border-primary/30 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="rounded-lg sm:rounded-xl bg-yellow-500/10 p-2 sm:p-2.5">
                        <TrendingUp className="h-4 sm:h-5 w-4 sm:w-5 text-yellow-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">Rata-rata Margin</p>
                        <p className="text-lg sm:text-2xl font-bold text-foreground">{avgMargin.toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 sm:py-20 px-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" />
                    <div className="relative rounded-full bg-gradient-to-br from-card to-secondary p-6 sm:p-8 border border-border/50">
                      <Package className="h-12 sm:h-16 w-12 sm:w-16 text-muted-foreground/50" />
                    </div>
                  </div>
                  <h3 className="mt-4 sm:mt-6 text-lg sm:text-xl font-semibold text-foreground text-center">Belum ada produk</h3>
                  <p className="mt-2 text-sm sm:text-base text-muted-foreground text-center max-w-md">
                    Mulai tambahkan produk Anda untuk mengelola inventaris dan mendapatkan rekomendasi strategi bisnis.
                  </p>
                  <Button
                    onClick={() => setIsDialogOpen(true)}
                    className="mt-4 sm:mt-6 bg-primary hover:bg-primary/90"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Tambah Produk Pertama
                  </Button>
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
            </TabsContent>

            {/* Tab: Strategi */}
            <TabsContent value="strategi" className="mt-6">
              <AIStrategyEngine 
                products={products}
                brandProfile={brandProfile}
                onGenerateStrategy={() => {}}
              />
            </TabsContent>

            {/* Tab: Analitik */}
            <TabsContent value="analitik" className="mt-6">
              <GrowthChart 
                totalProducts={totalProducts}
                avgMargin={avgMargin}
                totalValue={totalValue}
              />
            </TabsContent>

            {/* Tab: Darurat */}
            <TabsContent value="darurat" className="mt-6">
              <EmergencyAudit products={products} />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-card border-border/50 p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">
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
        <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-card border-border/50 p-4 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl flex items-center gap-2">
              <Building2 className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
              Pengaturan Bisnis
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
