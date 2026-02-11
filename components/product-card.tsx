"use client"

import type { Product } from "./product-form"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit2, TrendingUp, Package } from "lucide-react"

interface ProductCardProps {
  product: Product
  onDelete: (id: string) => void
  onEdit: (product: Product) => void
}

export function ProductCard({ product, onDelete, onEdit }: ProductCardProps) {
  const margin = (((product.sellPrice - product.costPrice) / product.sellPrice) * 100).toFixed(1)
  const profit = product.sellPrice - product.costPrice

  return (
    <div className="group overflow-hidden rounded-3xl glass-card-white hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
      <div className="relative aspect-square overflow-hidden bg-card-foreground/5">
        {product.image ? (
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package className="h-16 w-16 text-card-foreground/15" />
          </div>
        )}
        <Badge className="absolute left-3 top-3 bg-card-foreground/80 text-card backdrop-blur-sm border-0 rounded-full px-3">
          {product.category}
        </Badge>
        <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            className="h-8 w-8 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center text-card-foreground hover:bg-card transition-colors"
            onClick={() => onEdit(product)}
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            className="h-8 w-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-card-foreground truncate">{product.name}</h3>
        <p className="mt-1 text-sm text-card-foreground/50 line-clamp-1">
          {product.description || "Tidak ada deskripsi"}
        </p>
        
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs text-card-foreground/50">Harga Jual</p>
            <p className="text-lg font-extrabold text-card-foreground">
              Rp {product.sellPrice.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-xs text-card-foreground/50">
              <TrendingUp className="h-3 w-3" />
              Margin
            </div>
            <p className={`text-sm font-bold ${Number(margin) >= 30 ? "text-green-500" : Number(margin) >= 15 ? "text-amber-500" : "text-red-500"}`}>
              {margin}%
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-2xl bg-card-foreground/5 px-3 py-2.5">
          <div className="text-center flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs text-card-foreground/50">Stok</p>
            <p className="text-sm sm:text-base font-bold text-card-foreground">{product.stock}</p>
          </div>
          <div className="h-6 sm:h-8 w-px bg-card-foreground/10 shrink-0" />
          <div className="text-center flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs text-card-foreground/50">Modal</p>
            <p className="text-xs sm:text-sm font-bold text-card-foreground truncate">
              {product.costPrice.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="h-6 sm:h-8 w-px bg-card-foreground/10 shrink-0" />
          <div className="text-center flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs text-card-foreground/50">Profit</p>
            <p className="text-xs sm:text-sm font-bold text-green-500 truncate">
              {profit.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
