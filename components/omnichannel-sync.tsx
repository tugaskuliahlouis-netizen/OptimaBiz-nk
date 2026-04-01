"use client"

import { useState, useEffect } from "react"
import { 
  RefreshCw, 
  Link2, 
  AlertTriangle, 
  CheckCircle2, 
  ShoppingBag,
  Package,
  Bell,
  TrendingDown,
  Loader2
} from "lucide-react"
import { Product } from "./product-form"

interface MarketplaceConnection {
  id: string
  name: string
  icon: string
  connected: boolean
  lastSync: string | null
  productCount: number
  color: string
}

interface StockAlert {
  productId: string
  productName: string
  currentStock: number
  avgDailySales: number
  daysUntilEmpty: number
  severity: "critical" | "warning" | "info"
}

interface OmnichannelSyncProps {
  products: Product[]
  onUpdateProducts: (products: Product[]) => void
}

const MARKETPLACES: MarketplaceConnection[] = [
  { id: "shopee", name: "Shopee", icon: "🛒", connected: false, lastSync: null, productCount: 0, color: "#EE4D2D" },
  { id: "tokopedia", name: "Tokopedia", icon: "🟢", connected: false, lastSync: null, productCount: 0, color: "#42B549" },
  { id: "tiktok", name: "TikTok Shop", icon: "🎵", connected: false, lastSync: null, productCount: 0, color: "#000000" },
  { id: "lazada", name: "Lazada", icon: "🛍️", connected: false, lastSync: null, productCount: 0, color: "#0F146D" },
  { id: "bukalapak", name: "Bukalapak", icon: "🔴", connected: false, lastSync: null, productCount: 0, color: "#E31E52" },
  { id: "gofood", name: "GoFood", icon: "🍔", connected: false, lastSync: null, productCount: 0, color: "#00AA13" },
]

export function OmnichannelSync({ products, onUpdateProducts }: OmnichannelSyncProps) {
  const [marketplaces, setMarketplaces] = useState<MarketplaceConnection[]>(MARKETPLACES)
  const [stockAlerts, setStockAlerts] = useState<StockAlert[]>([])
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncLog, setSyncLog] = useState<string[]>([])

  // Load saved connections
  useEffect(() => {
    const saved = localStorage.getItem("optimabiz_marketplaces")
    if (saved) {
      setMarketplaces(JSON.parse(saved))
    }
  }, [])

  // Calculate low stock alerts
  useEffect(() => {
    const alerts: StockAlert[] = products
      .filter(p => p.stock > 0)
      .map(p => {
        // Simulate average daily sales (would come from real analytics)
        const avgDailySales = Math.max(1, Math.floor(Math.random() * 5) + 1)
        const daysUntilEmpty = Math.floor(p.stock / avgDailySales)
        
        let severity: "critical" | "warning" | "info" = "info"
        if (daysUntilEmpty <= 2) severity = "critical"
        else if (daysUntilEmpty <= 5) severity = "warning"
        
        return {
          productId: p.id,
          productName: p.name,
          currentStock: p.stock,
          avgDailySales,
          daysUntilEmpty,
          severity
        }
      })
      .filter(a => a.daysUntilEmpty <= 7)
      .sort((a, b) => a.daysUntilEmpty - b.daysUntilEmpty)
    
    setStockAlerts(alerts)
  }, [products])

  const toggleConnection = (marketplaceId: string) => {
    setMarketplaces(prev => {
      const updated = prev.map(m => {
        if (m.id === marketplaceId) {
          const connected = !m.connected
          return {
            ...m,
            connected,
            lastSync: connected ? new Date().toISOString() : null,
            productCount: connected ? products.length : 0
          }
        }
        return m
      })
      localStorage.setItem("optimabiz_marketplaces", JSON.stringify(updated))
      return updated
    })
  }

  const simulateSync = async () => {
    setIsSyncing(true)
    setSyncLog([])
    
    const connectedMarketplaces = marketplaces.filter(m => m.connected)
    
    for (const marketplace of connectedMarketplaces) {
      setSyncLog(prev => [...prev, `Syncing with ${marketplace.name}...`])
      await new Promise(resolve => setTimeout(resolve, 800))
      setSyncLog(prev => [...prev, `${marketplace.name}: ${products.length} products updated`])
    }
    
    setSyncLog(prev => [...prev, "Checking stock conflicts..."])
    await new Promise(resolve => setTimeout(resolve, 500))
    setSyncLog(prev => [...prev, "All platforms synchronized successfully!"])
    
    // Update last sync time
    setMarketplaces(prev => {
      const updated = prev.map(m => ({
        ...m,
        lastSync: m.connected ? new Date().toISOString() : m.lastSync,
        productCount: m.connected ? products.length : m.productCount
      }))
      localStorage.setItem("optimabiz_marketplaces", JSON.stringify(updated))
      return updated
    })
    
    setIsSyncing(false)
  }

  const connectedCount = marketplaces.filter(m => m.connected).length
  const criticalAlerts = stockAlerts.filter(a => a.severity === "critical").length

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/20">
              <Link2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Connected</p>
              <p className="text-2xl font-bold text-foreground">{connectedCount}</p>
            </div>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20">
              <Package className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total SKU</p>
              <p className="text-2xl font-bold text-foreground">{products.length}</p>
            </div>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00FF88]/20">
              <CheckCircle2 className="h-5 w-5 text-[#00FF88]" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Synced</p>
              <p className="text-2xl font-bold text-foreground">{connectedCount > 0 ? "100%" : "0%"}</p>
            </div>
          </div>
        </div>
        
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${criticalAlerts > 0 ? "bg-destructive/20" : "bg-primary/20"}`}>
              <Bell className={`h-5 w-5 ${criticalAlerts > 0 ? "text-destructive" : "text-primary"}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Low Stock</p>
              <p className="text-2xl font-bold text-foreground">{stockAlerts.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Marketplace Connections */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-foreground">Marketplace Connections</h3>
            <p className="text-sm text-muted-foreground">Connect your stores for real-time stock sync</p>
          </div>
          <button
            onClick={simulateSync}
            disabled={isSyncing || connectedCount === 0}
            className="btn-pill bg-primary text-primary-foreground font-semibold text-sm px-5 py-2.5 inline-flex items-center gap-2 disabled:opacity-50"
          >
            {isSyncing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Sync All
              </>
            )}
          </button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {marketplaces.map((marketplace) => (
            <button
              key={marketplace.id}
              onClick={() => toggleConnection(marketplace.id)}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                marketplace.connected 
                  ? "border-primary/50 bg-primary/10" 
                  : "border-border/50 bg-secondary/30 hover:border-primary/30"
              }`}
            >
              {marketplace.connected && (
                <div className="absolute top-2 right-2">
                  <div className="h-2 w-2 rounded-full bg-[#00FF88] animate-pulse" />
                </div>
              )}
              <span className="text-2xl">{marketplace.icon}</span>
              <span className="text-xs font-medium text-foreground">{marketplace.name}</span>
              {marketplace.connected && (
                <span className="text-[10px] text-muted-foreground">{marketplace.productCount} items</span>
              )}
            </button>
          ))}
        </div>
        
        {/* Sync Log */}
        {syncLog.length > 0 && (
          <div className="mt-5 p-4 rounded-xl bg-secondary/50 border border-border/30">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Sync Log</p>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {syncLog.map((log, i) => (
                <p key={i} className="text-xs text-foreground/80 font-mono">{log}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Low Stock Alerts */}
      {stockAlerts.length > 0 && (
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/20">
              <TrendingDown className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Low Stock Prediction</h3>
              <p className="text-sm text-muted-foreground">Products yang akan habis dalam 7 hari</p>
            </div>
          </div>
          
          <div className="space-y-3">
            {stockAlerts.map((alert) => (
              <div 
                key={alert.productId}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  alert.severity === "critical" 
                    ? "border-destructive/30 bg-destructive/10" 
                    : alert.severity === "warning"
                    ? "border-orange-500/30 bg-orange-500/10"
                    : "border-border/30 bg-secondary/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    alert.severity === "critical" 
                      ? "bg-destructive/20" 
                      : alert.severity === "warning"
                      ? "bg-orange-500/20"
                      : "bg-primary/20"
                  }`}>
                    <AlertTriangle className={`h-4 w-4 ${
                      alert.severity === "critical" 
                        ? "text-destructive" 
                        : alert.severity === "warning"
                        ? "text-orange-500"
                        : "text-primary"
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{alert.productName}</p>
                    <p className="text-xs text-muted-foreground">
                      Stok: {alert.currentStock} | Avg Sales: {alert.avgDailySales}/hari
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    alert.severity === "critical" 
                      ? "text-destructive" 
                      : alert.severity === "warning"
                      ? "text-orange-500"
                      : "text-primary"
                  }`}>
                    {alert.daysUntilEmpty} hari
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase">hingga habis</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
