"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  MapPin, 
  Target, 
  Users, 
  CheckCircle2,
  Sparkles
} from "lucide-react"

export interface BrandProfile {
  businessName: string
  businessType: string
  targetMarket: "lokal" | "nasional" | "internasional"
  description: string
  location: string
  targetAudience: string
  uniqueValue: string
}

interface BrandProfileFormProps {
  onSave: (profile: BrandProfile) => void
  initialProfile?: BrandProfile | null
}

const businessTypes = [
  "Kuliner & F&B",
  "Fashion & Apparel",
  "Kecantikan & Skincare",
  "Kerajinan & Handmade",
  "Elektronik & Gadget",
  "Kesehatan & Wellness",
  "Jasa & Service",
  "Retail & Toko",
  "Lainnya"
]

export function BrandProfileForm({ onSave, initialProfile }: BrandProfileFormProps) {
  const [profile, setProfile] = useState<BrandProfile>({
    businessName: "",
    businessType: "",
    targetMarket: "lokal",
    description: "",
    location: "",
    targetAudience: "",
    uniqueValue: ""
  })
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (initialProfile) {
      setProfile(initialProfile)
    }
  }, [initialProfile])

  const handleSave = () => {
    onSave(profile)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const isComplete = profile.businessName && profile.businessType && profile.targetMarket

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-border/50">
        <div className="rounded-xl bg-primary/10 p-3">
          <Building2 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Profil Merek</h3>
          <p className="text-sm text-muted-foreground">Identitas bisnis dan target pasar Anda</p>
        </div>
      </div>

      <div className="grid gap-5">
        <div className="space-y-2">
          <Label htmlFor="businessName" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Nama Bisnis/Merek
          </Label>
          <Input
            id="businessName"
            value={profile.businessName}
            onChange={(e) => setProfile({ ...profile, businessName: e.target.value })}
            placeholder="Contoh: Warung Makan Bu Rani"
            className="bg-secondary/50"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="businessType">Jenis Bisnis</Label>
            <Select 
              value={profile.businessType} 
              onValueChange={(value) => setProfile({ ...profile, businessType: value })}
            >
              <SelectTrigger className="bg-secondary/50">
                <SelectValue placeholder="Pilih jenis bisnis" />
              </SelectTrigger>
              <SelectContent>
                {businessTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Lokasi
            </Label>
            <Input
              id="location"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              placeholder="Contoh: Jakarta Selatan"
              className="bg-secondary/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            Target Pasar
          </Label>
          <div className="flex flex-wrap gap-2">
            {(["lokal", "nasional", "internasional"] as const).map((market) => (
              <Badge
                key={market}
                variant={profile.targetMarket === market ? "default" : "outline"}
                className={`cursor-pointer transition-all px-4 py-2 text-sm capitalize ${
                  profile.targetMarket === market 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-transparent hover:bg-primary/10"
                }`}
                onClick={() => setProfile({ ...profile, targetMarket: market })}
              >
                {market}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="targetAudience" className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            Target Audiens
          </Label>
          <Input
            id="targetAudience"
            value={profile.targetAudience}
            onChange={(e) => setProfile({ ...profile, targetAudience: e.target.value })}
            placeholder="Contoh: Ibu rumah tangga usia 25-45 tahun"
            className="bg-secondary/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Deskripsi Bisnis</Label>
          <Textarea
            id="description"
            value={profile.description}
            onChange={(e) => setProfile({ ...profile, description: e.target.value })}
            placeholder="Ceritakan tentang bisnis Anda, produk unggulan, dan keunikannya..."
            rows={3}
            className="bg-secondary/50 resize-none"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="uniqueValue">Unique Value Proposition</Label>
          <Input
            id="uniqueValue"
            value={profile.uniqueValue}
            onChange={(e) => setProfile({ ...profile, uniqueValue: e.target.value })}
            placeholder="Apa yang membuat bisnis Anda berbeda dari kompetitor?"
            className="bg-secondary/50"
          />
        </div>
      </div>

      <Button 
        onClick={handleSave}
        disabled={!isComplete}
        className="w-full bg-primary hover:bg-primary/90"
      >
        {isSaved ? (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Tersimpan!
          </>
        ) : (
          "Simpan Profil"
        )}
      </Button>
    </div>
  )
}
