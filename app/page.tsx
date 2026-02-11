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
    title: "Dashboard Cuan",
    description: "Pantau total produk, stok, nilai inventaris, dan rata-rata margin secara real-time.",
  },
  {
    icon: Target,
    title: "Strategi AI",
    description: "Dapatkan rekomendasi aksi nyata berdasarkan data produk untuk scale up profit.",
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
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Ambient gold glow effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-60 -right-60 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-primary/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative">
        {/* Header/Navbar */}
        <header className="border-b border-border/30 bg-background/60 backdrop-blur-2xl sticky top-0 z-50">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-primary">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-extrabold text-foreground tracking-tight">OptimaBiz</h1>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Enterprise Navigator</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/register")}
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  Masuk
                </Button>
                <button
                  onClick={() => router.push("/register")}
                  className="btn-pill bg-primary text-primary-foreground font-bold text-sm px-5 py-2.5 inline-flex items-center gap-2"
                >
                  <span className="hidden sm:inline">Daftar Gratis</span>
                  <span className="sm:hidden">Daftar</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-32">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Real-Action Tool untuk UMKM</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] text-balance tracking-tight">
              Aksi Nyata,{" "}
              <span className="text-primary">
                Bukan Teori
              </span>
            </h1>

            <p className="mt-5 sm:mt-7 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty px-2 leading-relaxed">
              OptimaBiz mengubah data produk jadi rencana aksi nyata. Kelola inventaris, analisis margin, dan
              dapatkan strategi bisnis berbasis AI -- semua dalam satu platform.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
              <button
                onClick={() => router.push("/register")}
                className="btn-pill w-full sm:w-auto bg-primary text-primary-foreground font-bold text-base sm:text-lg px-8 py-4 sm:py-5 inline-flex items-center justify-center gap-2"
              >
                Mulai Sekarang - Gratis
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="btn-pill w-full sm:w-auto border border-border/50 text-foreground font-semibold text-base sm:text-lg px-8 py-4 sm:py-5 inline-flex items-center justify-center bg-transparent hover:bg-secondary/50"
              >
                Pelajari Lebih Lanjut
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 sm:mt-14 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-3 sm:gap-6 px-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <CheckCircle2 className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-primary shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
              Semua yang Kamu Butuhkan
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Fitur lengkap yang bikin bisnis UMKM-mu naik level
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl glass-card-white p-6 sm:p-7 hover:scale-[1.02] transition-all duration-300"
              >
                <div className="relative">
                  <div className="rounded-2xl bg-primary/10 p-3 w-fit mb-5">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-card-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-card-foreground/70 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it Works Section */}
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">Cara Kerja</h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Tiga langkah simpel buat boost bisnismu
            </p>
          </div>

          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Daftar Akun",
                description: "Buat akun gratis dalam hitungan detik. Tanpa ribet, tanpa kartu kredit.",
              },
              {
                step: "02",
                title: "Input Produk",
                description: "Tambahkan produk dengan foto, harga, dan detail lengkap. Drag & drop aja.",
              },
              {
                step: "03",
                title: "Dapatkan Insight",
                description: "Lihat analisis margin dan rekomendasi strategi bisnis dari AI engine kami.",
              },
            ].map((item, index) => (
              <div key={index} className="relative text-center md:text-left">
                <div className="text-5xl sm:text-6xl font-extrabold text-primary/15 mb-3 sm:mb-4">{item.step}</div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.description}</p>
                {index < 2 && (
                  <ChevronRight className="hidden md:block absolute right-0 top-8 h-8 w-8 text-primary/30" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="rounded-3xl glass-card-white p-6 sm:p-8 lg:p-12">
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-3 text-center">
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-card-foreground">1,000+</div>
                <div className="text-sm sm:text-base text-card-foreground/60 mt-1">UMKM Terdaftar</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Package className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-card-foreground">50,000+</div>
                <div className="text-sm sm:text-base text-card-foreground/60 mt-1">Produk Dikelola</div>
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <ShieldCheck className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-card-foreground">99.9%</div>
                <div className="text-sm sm:text-base text-card-foreground/60 mt-1">Uptime Terjamin</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="relative overflow-hidden rounded-3xl bg-primary p-8 sm:p-10 lg:p-16 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-foreground/5 to-transparent" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-foreground mb-3 sm:mb-4 tracking-tight">
                Siap Scale Up Bisnismu?
              </h2>
              <p className="text-base sm:text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
                Bergabung dengan ribuan UMKM yang sudah pakai OptimaBiz buat manage dan grow bisnis mereka.
              </p>
              <button
                onClick={() => router.push("/register")}
                className="btn-pill bg-primary-foreground text-primary font-bold text-base sm:text-lg px-8 py-4 sm:py-5 w-full sm:w-auto inline-flex items-center justify-center gap-2"
              >
                Gaspol Sekarang - Gratis
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/30 bg-background/60 backdrop-blur-2xl">
          <div className="container mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">OptimaBiz</span>
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
