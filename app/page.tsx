"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  Package,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  ArrowRight,
  CheckCircle2,
  Users,
  ShieldCheck,
  ChevronRight,
} from "lucide-react"

const features = [
  {
    icon: Package,
    title: "Kelola Produk",
    description: "Input produk dengan foto, harga modal & jual, stok, dan kategori dalam satu tempat.",
  },
  {
    icon: TrendingUp,
    title: "Analisis Margin",
    description: "Hitung margin keuntungan otomatis dan dapatkan insight tentang profitabilitas produk.",
  },
  {
    icon: BarChart3,
    title: "Dashboard Statistik",
    description: "Pantau total produk, stok, nilai inventaris, dan rata-rata margin secara real-time.",
  },
  {
    icon: Target,
    title: "Strategi Bisnis",
    description: "Dapatkan rekomendasi aksi nyata berdasarkan data produk untuk meningkatkan profit.",
  },
]

const benefits = [
  "Gratis selamanya untuk UMKM",
  "Tanpa kartu kredit",
  "Data tersimpan aman",
  "Akses dari mana saja",
]

export default function LandingPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-primary/15 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative">
        {/* Header/Navbar */}
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
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  onClick={() => router.push("/register")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Masuk
                </Button>
                <Button
                  onClick={() => router.push("/register")}
                  className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25"
                >
                  Daftar Gratis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 lg:py-32">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Real-Action Tool untuk UMKM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Ubah Data Produk Menjadi{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                Rencana Aksi Nyata
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              OptimaBiz adalah asisten strategis yang membantu UMKM mengelola produk, menganalisis margin, dan mendapatkan
              rekomendasi bisnis berbasis data.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={() => router.push("/register")}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 text-lg px-8 py-6"
              >
                Mulai Sekarang - Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="w-full sm:w-auto bg-transparent border-border/50 hover:bg-secondary/50 text-lg px-8 py-6"
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Semua yang Anda Butuhkan
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Fitur lengkap untuk mengelola dan mengoptimalkan bisnis UMKM Anda
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-card/50 p-6 border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="rounded-xl bg-primary/10 p-3 w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it Works Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Cara Kerja</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Tiga langkah mudah untuk mengoptimalkan bisnis Anda
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Daftar Akun",
                description: "Buat akun gratis dalam hitungan detik. Tidak perlu kartu kredit.",
              },
              {
                step: "02",
                title: "Input Produk",
                description: "Tambahkan produk dengan foto, harga, dan detail lengkap.",
              },
              {
                step: "03",
                title: "Dapatkan Insight",
                description: "Lihat analisis margin dan rekomendasi strategi bisnis otomatis.",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-primary/10 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                {index < 2 && (
                  <ChevronRight className="hidden md:block absolute right-0 top-8 h-8 w-8 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="rounded-3xl bg-gradient-to-br from-card to-card/50 border border-border/50 p-8 sm:p-12">
            <div className="grid gap-8 md:grid-cols-3 text-center">
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-4xl font-bold text-foreground">1,000+</div>
                <div className="text-muted-foreground mt-1">UMKM Terdaftar</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div className="text-4xl font-bold text-foreground">50,000+</div>
                <div className="text-muted-foreground mt-1">Produk Dikelola</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div className="text-4xl font-bold text-foreground">99.9%</div>
                <div className="text-muted-foreground mt-1">Uptime Terjamin</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 p-8 sm:p-12 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Siap Mengoptimalkan Bisnis Anda?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Bergabung dengan ribuan UMKM yang sudah menggunakan OptimaBiz untuk mengelola dan mengembangkan bisnis
                mereka.
              </p>
              <Button
                size="lg"
                onClick={() => router.push("/register")}
                className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 text-lg px-8 py-6"
              >
                Daftar Sekarang - Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/50">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-semibold text-foreground">OptimaBiz</span>
              </div>
              <p className="text-sm text-muted-foreground">
                2024 OptimaBiz. Dibuat untuk UMKM Indonesia.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
