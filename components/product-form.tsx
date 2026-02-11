"use client"

import React from "react"
import { useState, useRef, type ChangeEvent, type DragEvent } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X, ImageIcon } from "lucide-react"

export interface Product {
  id: string
  name: string
  category: string
  costPrice: number
  sellPrice: number
  stock: number
  description: string
  image: string | null
  createdAt: string
}

interface ProductFormProps {
  onAddProduct: (product: Product) => void
  onClose: () => void
}

const categories = [
  "Kuliner",
  "Fashion",
  "Elektronik",
  "Kecantikan",
  "Kesehatan",
  "Kerajinan",
  "Jasa",
  "Lainnya",
]

export function ProductForm({ onAddProduct, onClose }: ProductFormProps) {
  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [costPrice, setCostPrice] = useState("")
  const [sellPrice, setSellPrice] = useState("")
  const [stock, setStock] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const margin = costPrice && sellPrice 
    ? (((Number(sellPrice) - Number(costPrice)) / Number(sellPrice)) * 100).toFixed(1)
    : "0"

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImageUpload(file)
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleImageUpload(file)
  }

  const removeImage = () => {
    setImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const product: Product = {
      id: Date.now().toString(),
      name,
      category,
      costPrice: Number(costPrice),
      sellPrice: Number(sellPrice),
      stock: Number(stock),
      description,
      image,
      createdAt: new Date().toISOString(),
    }
    onAddProduct(product)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Image Upload */}
      <div className="space-y-2">
        <Label>Foto Produk</Label>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative cursor-pointer rounded-3xl border-2 border-dashed transition-all duration-300
            ${isDragging 
              ? "border-primary bg-primary/10 scale-[1.02]" 
              : "border-border hover:border-primary/50 hover:bg-secondary/30"
            }
            ${image ? "p-2" : "p-8"}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          {image ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
              <img
                src={image || "/placeholder.svg"}
                alt="Preview"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeImage()
                }}
                className="absolute right-2 top-2 rounded-full bg-red-500 p-1.5 text-white shadow-lg transition-transform hover:scale-110"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="absolute bottom-2 left-2 rounded-full bg-popover/80 px-3 py-1 text-xs font-medium text-popover-foreground backdrop-blur-sm">
                Klik untuk ganti foto
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-bold text-popover-foreground">
                  Drag & drop foto produk di sini
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  atau klik untuk memilih file (PNG, JPG, max 5MB)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="name">Nama Produk</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Contoh: Nasi Goreng Spesial"
            required
            className="bg-secondary/50 rounded-2xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Kategori</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger className="bg-secondary/50 rounded-2xl">
              <SelectValue placeholder="Pilih kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stock">Stok</Label>
          <Input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="0"
            min="0"
            required
            className="bg-secondary/50 rounded-2xl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="costPrice">Harga Modal</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
            <Input
              id="costPrice"
              type="number"
              value={costPrice}
              onChange={(e) => setCostPrice(e.target.value)}
              placeholder="0"
              min="0"
              required
              className="bg-secondary/50 pl-10 rounded-2xl"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sellPrice">Harga Jual</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
            <Input
              id="sellPrice"
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              placeholder="0"
              min="0"
              required
              className="bg-secondary/50 pl-10 rounded-2xl"
            />
          </div>
        </div>
      </div>

      {/* Margin Calculator */}
      {costPrice && sellPrice && (
        <div className="rounded-3xl bg-primary/10 p-4 border border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-sm text-popover-foreground/70">Margin Keuntungan</span>
            <span className={`text-2xl font-extrabold ${Number(margin) >= 30 ? "text-green-400" : Number(margin) >= 15 ? "text-amber-400" : "text-red-400"}`}>
              {margin}%
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
            <div 
              className={`h-full transition-all duration-500 ${Number(margin) >= 30 ? "bg-green-400" : Number(margin) >= 15 ? "bg-amber-400" : "bg-red-400"}`}
              style={{ width: `${Math.min(Number(margin), 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-popover-foreground/60">
            {Number(margin) >= 30 
              ? "Margin sangat baik! Produk ini berpotensi profit tinggi."
              : Number(margin) >= 15 
                ? "Margin cukup. Pertimbangkan untuk meningkatkan harga jual."
                : "Margin rendah. Evaluasi harga modal atau harga jual kamu."}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi Produk</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Jelaskan keunggulan produk kamu..."
          rows={3}
          className="bg-secondary/50 resize-none rounded-2xl"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button type="button" onClick={onClose} className="btn-pill flex-1 border border-border/50 text-popover-foreground font-semibold py-3 bg-transparent hover:bg-secondary/50">
          Batal
        </button>
        <button 
          type="submit" 
          className="btn-pill flex-1 bg-primary text-primary-foreground font-bold py-3 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
          disabled={!name || !category || !costPrice || !sellPrice || !stock}
        >
          <ImageIcon className="h-4 w-4" />
          Gaspol!
        </button>
      </div>
    </form>
  )
}
