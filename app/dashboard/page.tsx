"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
import { OmnichannelSync } from "@/components/omnichannel-sync"
import { SAWEngine } from "@/components/saw-engine"
import { ExpertAIPartner } from "@/components/expert-ai-partner"
import { MultiSectorStrategy } from "@/components/multi-sector-strategy"
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
  LogOut,
  User,
  Link2,
  Brain,
  Layers,
  Trophy,
  Home,
  Menu,
  X
} from "lucide-react"

// Sidebar items with icons and colors
const sidebarItems = [
  { id: "home", label: "Home", icon: Home, color: "#00F3FF" },
  { id: "produk", label: "Produk", icon: Package, color: "#00F3FF" },
  { id: "omnichannel", label: "Omnichannel", icon: Link2, color: "#BC00FF" },
  { id: "saw", label: "SAW Engine", icon: Trophy, color: "#FFD700" },
  { id: "ai-partner", label: "AI Partner", icon: Brain, color: "#00FF88" },
  { id: "sector", label: "Sector Strategy", icon: Layers, color: "#FF69B4" },
  { id: "strategi", label: "Strategi", icon: Zap, color: "#00F3FF" },
  { id: "analitik", label: "Analitik", icon: BarChart3, color: "#BC00FF" },
  { id: "darurat", label: "Anti-Stagnant", icon: AlertTriangle, color: "#FF4444" },
]

// Mobile bottom nav items (simplified)
const bottomNavItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "produk", label: "Stok", icon: Package },
  { id: "ai-partner", label: "AI Partner", icon: Brain },
  { id: "analitik", label: "Reports", icon: BarChart3 },
]

export default function OptimaBiz() {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null)
  const [activeTab, setActiveTab] = useState("home")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [userName, setUserName] = useState("")
  const [userBusiness, setUserBusiness] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const savedProducts = localStorage.getItem("optimabiz_products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }
    const savedProfile = localStorage.getItem("optimabiz_brand_profile")
    if (savedProfile) {
      setBrandProfile(JSON.parse(savedProfile))
    }
    const savedUser = localStorage.getItem("optimabiz_user")
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUserName(user.name || "User")
      setUserBusiness(user.businessName || "")
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

  const handleLogout = () => {
    localStorage.removeItem("optimabiz_user")
    router.push("/")
  }

  const handleUpdateProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts)
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

  const getTabTitle = () => {
    switch (activeTab) {
      case "home": return "Dashboard"
      case "produk": return "Kelola Produk"
      case "omnichannel": return "Omnichannel Sync"
      case "saw": return "SAW Engine"
      case "ai-partner": return "Expert AI Partner"
      case "sector": return "Sector Strategy"
      case "strategi": return "Spill Strategi"
      case "analitik": return "Analitik"
      case "darurat": return "Anti-Stagnant"
      default: return "Dashboard"
    }
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Ambient neon glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative flex min-h-screen">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 fixed inset-y-0 left-0 z-40 bg-sidebar/95 backdrop-blur-xl border-r border-sidebar-border">
          {/* Logo */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary neon-glow-cyan">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-sidebar-foreground tracking-tight neon-text-cyan">OptimaBiz</h1>
              <p className="text-[10px] uppercase tracking-widest text-primary">Enterprise Navigator</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                  style={{
                    backgroundColor: isActive ? `${item.color}15` : undefined,
                    color: isActive ? item.color : undefined,
                    boxShadow: isActive ? `0 0 20px ${item.color}20` : undefined
                  }}
                >
                  <item.icon className="h-5 w-5" style={{ color: isActive ? item.color : undefined }} />
                  {item.label}
                  {item.id === "darurat" && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-destructive animate-pulse" />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 space-y-2 border-t border-sidebar-border">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all"
            >
              <Settings className="h-5 w-5" />
              Settings
            </button>

            {/* User Profile */}
            <div className="pt-2 border-t border-sidebar-border mt-2">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 shrink-0">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-sidebar-foreground truncate">{userName || "User"}</p>
                  {userBusiness && (
                    <p className="text-[10px] text-muted-foreground truncate">{userBusiness}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-all"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 pb-24 lg:pb-8">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 border-b border-border/30 bg-background/80 backdrop-blur-2xl">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
              {/* Mobile Logo & Menu */}
              <div className="flex items-center gap-3 lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 text-foreground"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary neon-glow-cyan">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-extrabold text-foreground tracking-tight">OptimaBiz</span>
                </div>
              </div>

              {/* Desktop Title */}
              <div className="hidden lg:block">
                <h2 className="text-xl font-extrabold text-foreground tracking-tight">{getTabTitle()}</h2>
                <p className="text-xs text-muted-foreground">Enterprise Navigator</p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Emergency Button */}
                <button
                  onClick={() => setActiveTab("darurat")}
                  className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all ${
                    activeTab === "darurat" 
                      ? "bg-destructive/20 border-destructive/50 text-destructive" 
                      : "border-destructive/20 text-destructive/60 hover:border-destructive/40 hover:text-destructive"
                  }`}
                >
                  <AlertTriangle className="h-5 w-5" />
                  <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-destructive animate-pulse" />
                </button>

                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                >
                  <Settings className="h-5 w-5" />
                </button>

                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="btn-pill bg-primary text-primary-foreground font-bold text-sm px-5 py-2.5 inline-flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Tambah</span> Produk
                </button>
              </div>
            </div>
          </header>

          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* Tab: Home - Dashboard Overview */}
            {activeTab === "home" && (
              <div className="space-y-6">
                {/* Welcome Banner */}
                <div className="glass-card rounded-2xl p-6 neon-glow-cyan">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20">
                      <Sparkles className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">
                        Selamat datang, {userName || "User"}!
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {userBusiness ? `${userBusiness} -` : ""} Dashboard bisnis kamu
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                  <div className="glass-card rounded-2xl p-5 hover:neon-glow-cyan transition-all">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Produk</p>
                        <p className="text-2xl font-bold text-foreground">{totalProducts}</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-5 hover:neon-glow-purple transition-all">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                        <LayoutGrid className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Stok</p>
                        <p className="text-2xl font-bold text-foreground">{totalStock.toLocaleString("id-ID")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00FF88]/20">
                        <DollarSign className="h-6 w-6 text-[#00FF88]" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Nilai Inventaris</p>
                        <p className="text-lg font-bold text-foreground truncate">
                          Rp {totalValue.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFD700]/20">
                        <TrendingUp className="h-6 w-6 text-[#FFD700]" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Rata-rata Margin</p>
                        <p className="text-2xl font-bold text-foreground">{avgMargin.toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                  {[
                    { id: "omnichannel", label: "Sync Stok", icon: Link2, color: "#BC00FF" },
                    { id: "saw", label: "SAW Ranking", icon: Trophy, color: "#FFD700" },
                    { id: "ai-partner", label: "AI Partner", icon: Brain, color: "#00FF88" },
                    { id: "sector", label: "Sector Strategy", icon: Layers, color: "#FF69B4" },
                  ].map((action) => (
                    <button
                      key={action.id}
                      onClick={() => setActiveTab(action.id)}
                      className="glass-card rounded-2xl p-5 hover:scale-[1.02] transition-all text-left"
                      style={{ borderColor: `${action.color}30` }}
                    >
                      <div 
                        className="flex h-11 w-11 items-center justify-center rounded-xl mb-3"
                        style={{ backgroundColor: `${action.color}20` }}
                      >
                        <action.icon className="h-5 w-5" style={{ color: action.color }} />
                      </div>
                      <p className="text-sm font-semibold text-foreground">{action.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">Tap to open</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Produk */}
            {activeTab === "produk" && (
              <div>
                {/* Stats Cards */}
                <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-6">
                  <div className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Produk</p>
                        <p className="text-2xl font-bold text-foreground">{totalProducts}</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20">
                        <LayoutGrid className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Total Stok</p>
                        <p className="text-2xl font-bold text-foreground">{totalStock.toLocaleString("id-ID")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00FF88]/20">
                        <DollarSign className="h-5 w-5 text-[#00FF88]" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Nilai Inventaris</p>
                        <p className="text-lg font-bold text-foreground truncate">
                          Rp {totalValue.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFD700]/20">
                        <TrendingUp className="h-5 w-5 text-[#FFD700]" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Rata-rata Margin</p>
                        <p className="text-2xl font-bold text-foreground">{avgMargin.toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                {products.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                      <div className="relative rounded-full glass-card p-10">
                        <Package className="h-16 w-16 text-muted-foreground/40" />
                      </div>
                    </div>
                    <h3 className="mt-8 text-xl font-bold text-foreground text-center">Belum ada produk</h3>
                    <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
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
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

            {/* Tab: Omnichannel */}
            {activeTab === "omnichannel" && (
              <OmnichannelSync 
                products={products} 
                onUpdateProducts={handleUpdateProducts}
              />
            )}

            {/* Tab: SAW Engine */}
            {activeTab === "saw" && (
              <SAWEngine products={products} />
            )}

            {/* Tab: AI Partner */}
            {activeTab === "ai-partner" && (
              <ExpertAIPartner products={products} />
            )}

            {/* Tab: Sector Strategy */}
            {activeTab === "sector" && (
              <MultiSectorStrategy products={products} />
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

      {/* Mobile Floating Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4">
        <nav className="flex items-center justify-around gap-1 rounded-2xl bg-secondary/95 backdrop-blur-2xl border border-border/30 px-2 py-3 shadow-2xl shadow-background/80">
          {bottomNavItems.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                  isActive
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
                <span className={`text-[10px] font-semibold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {item.label}
                </span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Mobile Full Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 py-4 border-b border-border/30">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary neon-glow-cyan">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-extrabold text-foreground">OptimaBiz</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  <item.icon className="h-5 w-5" style={{ color: isActive ? item.color : undefined }} />
                  {item.label}
                </button>
              )
            })}
          </nav>
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={() => {
                setShowLogoutConfirm(true)
                setIsMobileMenuOpen(false)
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl text-base font-semibold text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-popover border-border/50 p-4 sm:p-6 rounded-2xl">
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
        <DialogContent className="max-w-[95vw] sm:max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-popover border-border/50 p-4 sm:p-6 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-extrabold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Brand Profile
            </DialogTitle>
          </DialogHeader>
          <BrandProfileForm
            onSave={handleSaveBrandProfile}
            initialProfile={brandProfile}
          />
        </DialogContent>
      </Dialog>

      {/* Logout Confirmation Dialog */}
      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="max-w-[90vw] sm:max-w-sm bg-popover border-border/50 p-6 rounded-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 mb-4">
              <LogOut className="h-7 w-7 text-destructive" />
            </div>
            <h3 className="text-lg font-extrabold text-foreground">Yakin mau keluar?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Data produk kamu tetap tersimpan di browser ini.
            </p>
            <div className="flex gap-3 mt-6 w-full">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 btn-pill border border-border/50 text-foreground font-semibold py-3 bg-transparent hover:bg-secondary/50"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 btn-pill bg-destructive text-destructive-foreground font-semibold py-3"
              >
                Keluar
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
