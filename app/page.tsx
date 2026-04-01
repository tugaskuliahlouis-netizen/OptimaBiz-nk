"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Sparkles,
  Package,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  ArrowRight,
  Play,
  ChevronRight,
  Menu,
  X,
  Link2,
  Trophy,
  Brain,
  Layers,
} from "lucide-react"

const features = [
  {
    icon: Package,
    title: "Kelola Produk",
    description: "Input produk dengan foto, harga modal & jual, stok, dan kategori dalam satu tempat.",
    color: "#00F3FF",
  },
  {
    icon: Link2,
    title: "Omnichannel Sync",
    description: "Sinkronisasi stok real-time ke semua marketplace: Shopee, Tokopedia, TikTok Shop.",
    color: "#BC00FF",
  },
  {
    icon: Trophy,
    title: "SAW Engine",
    description: "Ranking produk terbaik untuk boost ads dengan Simple Additive Weighting.",
    color: "#FFD700",
  },
  {
    icon: Brain,
    title: "AI Partner",
    description: "Rekomendasi strategi berbasis level bisnis: Beginner, Growing, atau Expert.",
    color: "#00FF88",
  },
  {
    icon: Layers,
    title: "Sector Strategy",
    description: "Taktik modern sesuai kategori: Fashion, F&B, Elektronik, dan lainnya.",
    color: "#FF69B4",
  },
  {
    icon: Target,
    title: "ROAS Tracker",
    description: "Hitung Return on Ad Spend dan dapatkan rekomendasi optimasi iklan.",
    color: "#00F3FF",
  },
]

const navLinks = ["Fitur", "Cara Kerja", "Statistik", "Kontak"]

export default function LandingPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-x-hidden font-sans">
      {/* Ambient neon glow background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 -left-40 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full" />
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-primary neon-glow-cyan">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </div>
                </div>
                <span className="text-xl font-extrabold text-foreground tracking-tight neon-text-cyan">OptimaBiz</span>
              </div>

              {/* Desktop nav links */}
              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => {
                      const id = link.toLowerCase().replace(" ", "-")
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                  >
                    {link}
                  </button>
                ))}
              </nav>

              {/* CTA + hamburger */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push("/register")}
                  className="btn-pill bg-primary text-primary-foreground font-bold text-sm px-5 py-2.5 inline-flex items-center gap-2"
                >
                  <span className="hidden sm:inline">Mulai Gratis</span>
                  <span className="sm:hidden">Start</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 text-foreground"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-background/95 backdrop-blur-2xl border-t border-border/20 py-4">
              <nav className="container mx-auto px-6 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    key={link}
                    onClick={() => {
                      const id = link.toLowerCase().replace(" ", "-")
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
                      setMobileMenuOpen(false)
                    }}
                    className="text-left text-base text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                  >
                    {link}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* Hero Section with Wave Divider */}
        <section ref={heroRef} className="pt-20 sm:pt-24 min-h-screen flex items-center relative wave-divider">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left side - Text content */}
              <div
                className={`transition-all duration-1000 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                {/* Tagline badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    AI-Powered Business Tool
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.05] tracking-tight">
                  Scale Up
                  <br />
                  <span className="text-primary neon-text-cyan">Bisnismu</span>
                </h1>

                <p className="mt-5 sm:mt-7 text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
                  OptimaBiz mengubah data produk jadi strategi nyata. Omnichannel sync, SAW ranking, 
                  dan AI Partner untuk UMKM Indonesia.
                </p>

                {/* CTA row */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => router.push("/register")}
                    className="btn-pill bg-primary text-primary-foreground font-bold text-base px-7 py-4 inline-flex items-center gap-2"
                  >
                    Mulai Sekarang
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => document.getElementById("fitur")?.scrollIntoView({ behavior: "smooth" })}
                    className="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-primary transition-colors font-medium group"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 group-hover:border-primary/60 group-hover:bg-primary/10 transition-all">
                      <Play className="h-5 w-5 text-primary ml-0.5" />
                    </div>
                    Lihat Fitur
                  </button>
                </div>

                {/* Stats preview */}
                <div className="mt-12 sm:mt-16 flex items-center gap-8">
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-foreground">200+</div>
                    <p className="text-xs text-muted-foreground mt-1">UMKM Active</p>
                  </div>
                  <div className="w-px h-10 bg-border/30" />
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-foreground">50K+</div>
                    <p className="text-xs text-muted-foreground mt-1">Products</p>
                  </div>
                  <div className="w-px h-10 bg-border/30" />
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-foreground">99.9%</div>
                    <p className="text-xs text-muted-foreground mt-1">Uptime</p>
                  </div>
                </div>
              </div>

              {/* Right side - Visual */}
              <div
                className={`relative transition-all duration-1000 delay-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
              >
                {/* Neon circles */}
                <div className="absolute -top-8 -right-8 w-64 h-64 rounded-full bg-primary/20 blur-sm" />
                <div className="absolute top-12 right-12 w-48 h-48 rounded-full bg-accent/30 blur-sm" />
                
                {/* Feature cards preview */}
                <div className="relative z-10 grid grid-cols-2 gap-4 p-4">
                  {[
                    { icon: Link2, label: "Omnichannel", color: "#BC00FF" },
                    { icon: Trophy, label: "SAW Engine", color: "#FFD700" },
                    { icon: Brain, label: "AI Partner", color: "#00FF88" },
                    { icon: Target, label: "ROAS Tracker", color: "#00F3FF" },
                  ].map((item, i) => (
                    <div 
                      key={i}
                      className="glass-card rounded-2xl p-5 hover:scale-[1.02] transition-all"
                      style={{ borderColor: `${item.color}30` }}
                    >
                      <div 
                        className="flex h-11 w-11 items-center justify-center rounded-xl mb-3"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <item.icon className="h-5 w-5" style={{ color: item.color }} />
                      </div>
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="w-px h-10 bg-primary/30 animate-pulse" />
          </div>
        </section>

        {/* Features Section */}
        <section id="fitur" className="py-20 sm:py-28 lg:py-32 relative bg-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            {/* Section header */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-4">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  Fitur Lengkap
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
                Semua yang Kamu Butuhkan
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Tools modern untuk scale up bisnis UMKM tanpa ribet
              </p>
            </div>

            {/* Feature cards grid */}
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl glass-card p-6 hover:scale-[1.02] transition-all duration-300"
                  style={{ borderColor: `${feature.color}20` }}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div 
                    className="flex h-14 w-14 items-center justify-center rounded-2xl mb-5 transition-all"
                    style={{ 
                      backgroundColor: `${feature.color}20`,
                      boxShadow: activeFeature === index ? `0 0 30px ${feature.color}30` : undefined
                    }}
                  >
                    <feature.icon className="h-7 w-7" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  
                  {/* Hover accent line */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-1 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"
                    style={{ backgroundColor: feature.color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="cara-kerja" className="py-20 sm:py-28 lg:py-32 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left - heading */}
              <div className="lg:sticky lg:top-32">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Cara Kerja
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                  Tiga Langkah
                  <br />
                  <span className="text-primary neon-text-cyan">Simpel</span>
                </h2>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-sm leading-relaxed">
                  Mulai dari nol sampai punya strategi bisnis yang jelas. Semua dalam hitungan menit.
                </p>

                <button
                  onClick={() => router.push("/register")}
                  className="btn-pill mt-8 sm:mt-10 bg-primary text-primary-foreground font-bold text-base px-7 py-4 inline-flex items-center gap-2"
                >
                  Mulai Sekarang
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              {/* Right - steps */}
              <div className="flex flex-col gap-6 sm:gap-8">
                {[
                  {
                    step: "01",
                    title: "Daftar Akun",
                    description: "Buat akun gratis dalam hitungan detik. Tanpa kartu kredit.",
                    color: "#00F3FF",
                  },
                  {
                    step: "02",
                    title: "Input Produk",
                    description: "Tambahkan produk dengan foto, harga, dan detail. Drag & drop.",
                    color: "#BC00FF",
                  },
                  {
                    step: "03",
                    title: "Dapatkan Insight",
                    description: "Lihat SAW ranking, AI recommendations, dan sector strategy.",
                    color: "#00FF88",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group relative flex gap-6 p-6 rounded-2xl glass-card hover:scale-[1.01] transition-all duration-300"
                    style={{ borderColor: `${item.color}20` }}
                  >
                    <div 
                      className="shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-extrabold"
                      style={{ backgroundColor: `${item.color}20`, color: item.color }}
                    >
                      {item.step}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                    <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="statistik" className="py-20 sm:py-28 lg:py-32 relative bg-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { value: "200+", label: "UMKM Active", color: "#00F3FF" },
                { value: "50K+", label: "Products Managed", color: "#BC00FF" },
                { value: "99.9%", label: "System Uptime", color: "#00FF88" },
                { value: "4.9/5", label: "User Rating", color: "#FFD700" },
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="glass-card rounded-2xl p-6 sm:p-8 text-center hover:scale-[1.02] transition-all"
                >
                  <p 
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-2"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-28 lg:py-32 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 text-center neon-glow-cyan">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  Start Free Today
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                Siap Scale Up Bisnismu?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Gabung dengan 200+ UMKM yang sudah pakai OptimaBiz untuk optimize profit dan grow bisnis mereka.
              </p>
              <button
                onClick={() => router.push("/register")}
                className="btn-pill bg-primary text-primary-foreground font-bold text-lg px-10 py-5 inline-flex items-center gap-3"
              >
                Mulai Gratis Sekarang
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="kontak" className="py-12 border-t border-border/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-extrabold text-foreground">OptimaBiz</span>
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
