"use client"

import type { Product } from "./product-form"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
    <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        {product.image ? (
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package className="h-16 w-16 text-muted-foreground/30" />
          </div>
        )}
        <Badge 
          className="absolute left-3 top-3 bg-background/80 text-foreground backdrop-blur-sm"
        >
          {product.category}
        </Badge>
        <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-background/80 backdrop-blur-sm"
            onClick={() => onEdit(product)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            className="h-8 w-8"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
          {product.description || "Tidak ada deskripsi"}
        </p>
        
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Harga Jual</p>
            <p className="text-lg font-bold text-foreground">
              Rp {product.sellPrice.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              Margin
            </div>
            <p className={`text-sm font-semibold ${Number(margin) >= 30 ? "text-green-400" : Number(margin) >= 15 ? "text-yellow-400" : "text-red-400"}`}>
              {margin}%
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-lg bg-secondary/50 px-2 sm:px-3 py-2">
          <div className="text-center flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs text-muted-foreground">Stok</p>
            <p className="text-sm sm:text-base font-semibold text-foreground">{product.stock}</p>
          </div>
          <div className="h-6 sm:h-8 w-px bg-border shrink-0" />
          <div className="text-center flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs text-muted-foreground">Modal</p>
            <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
              {product.costPrice.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="h-6 sm:h-8 w-px bg-border shrink-0" />
          <div className="text-center flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs text-muted-foreground">Profit</p>
            <p className="text-xs sm:text-sm font-semibold text-green-400 truncate">
              {profit.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
