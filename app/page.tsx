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

const navLinks = ["Fitur", "Cara Kerja", "Statistik", "Kontak"]

export default function LandingPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Floating star particles
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 3 + 2,
  }))

  return (
    <div className="min-h-screen bg-background overflow-x-hidden font-sans">
      {/* Star particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-foreground/20"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `pulse ${star.duration}s ease-in-out ${star.delay}s infinite`,
            }}
          />
        ))}
        {/* Ambient gold glow */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative">
        {/* Header - EVEY style: logo left, gold line, nav right */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/40 blur-xl rounded-full" />
                  <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-primary">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground" />
                  </div>
                </div>
                <span className="text-lg sm:text-xl font-extrabold text-foreground tracking-tight">OptimaBiz</span>
              </div>

              {/* Gold accent line - desktop */}
              <div className="hidden lg:flex items-center gap-3 flex-1 mx-8">
                <div className="h-px flex-1 bg-primary/30" />
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
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                  >
                    {link}
                  </button>
                ))}
              </nav>

              {/* CTA + hamburger */}
              <div className="flex items-center gap-3 ml-4 sm:ml-8">
                <button
                  onClick={() => router.push("/register")}
                  className="btn-pill bg-primary text-primary-foreground font-bold text-xs sm:text-sm px-4 sm:px-6 py-2 sm:py-2.5 inline-flex items-center gap-1.5"
                >
                  <span className="hidden sm:inline">Start Project</span>
                  <span className="sm:hidden">Mulai</span>
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
                    className="text-left text-base text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                  >
                    {link}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </header>

        {/* Hero Section - EVEY split layout: text left, visual right */}
        <section ref={heroRef} className="pt-20 sm:pt-24 min-h-screen flex items-center relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left side - Text content */}
              <div
                className={`transition-all duration-1000 delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                {/* Small gold accent line before tagline */}
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                  <div className="w-8 sm:w-12 h-0.5 bg-primary" />
                  <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest">
                    Real-Action Tool
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.05] tracking-tight">
                  Aksi Nyata,
                  <br />
                  <span className="text-primary">Bukan Teori</span>
                </h1>

                <p className="mt-5 sm:mt-7 text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
                  OptimaBiz mengubah data produk jadi rencana aksi nyata. Kelola inventaris, analisis margin, dan
                  dapatkan strategi bisnis berbasis AI.
                </p>

                {/* CTA row */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => router.push("/register")}
                    className="btn-pill bg-primary text-primary-foreground font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 inline-flex items-center gap-2"
                  >
                    Mulai Sekarang
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    onClick={() => document.getElementById("fitur")?.scrollIntoView({ behavior: "smooth" })}
                    className="inline-flex items-center gap-2 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors font-medium group"
                  >
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-primary/30 group-hover:border-primary/60 transition-colors">
                      <Play className="h-4 w-4 sm:h-5 sm:w-5 text-primary ml-0.5" />
                    </div>
                    Lihat Fitur
                  </button>
                </div>

                {/* Social links row - EVEY style bottom left icons */}
                <div className="mt-12 sm:mt-16 flex items-center gap-6">
                  <div className="w-12 sm:w-16 h-px bg-border/50" />
                  <div className="flex items-center gap-4">
                    {["Instagram", "Twitter", "LinkedIn"].map((social) => (
                      <span
                        key={social}
                        className="text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-colors cursor-pointer"
                      >
                        {social.slice(0, 2)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side - Large stat block + decorative elements */}
              <div
                className={`relative transition-all duration-1000 delay-500 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
              >
                {/* Gold circle accent - like EVEY moon/planet */}
                <div className="absolute -top-8 -right-8 sm:top-0 sm:right-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full bg-primary/15 blur-sm" />
                <div className="absolute top-4 right-4 sm:top-12 sm:right-12 w-32 h-32 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full bg-primary/25" />

                {/* Stat overlay card */}
                <div className="relative z-10 flex flex-col items-end justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] pr-4 sm:pr-8">
                  <div className="text-right">
                    <div className="text-6xl sm:text-8xl lg:text-9xl font-extrabold text-primary leading-none">
                      200
                      <span className="text-lg sm:text-2xl align-top text-foreground/60 ml-1">+</span>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3 max-w-[200px] ml-auto leading-relaxed">
                      UMKM telah scale up bisnisnya dengan OptimaBiz
                    </p>
                  </div>

                  {/* Secondary smaller stats */}
                  <div className="mt-8 sm:mt-12 flex items-center gap-6 sm:gap-8">
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-extrabold text-foreground">50K+</div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 uppercase tracking-wider">Produk</p>
                    </div>
                    <div className="w-px h-10 bg-border/50" />
                    <div className="text-right">
                      <div className="text-2xl sm:text-3xl font-extrabold text-foreground">99.9%</div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 uppercase tracking-wider">Uptime</p>
                    </div>
                  </div>
                </div>

                {/* Section number - EVEY style */}
                <div className="absolute bottom-0 left-0 sm:bottom-4 sm:left-4">
                  <span className="text-6xl sm:text-8xl font-extrabold text-foreground/5">01</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="w-px h-8 sm:h-12 bg-border/30 animate-pulse" />
          </div>
        </section>

        {/* Features Section - EVEY style with numbered cards */}
        <section id="fitur" className="py-20 sm:py-28 lg:py-32 relative">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            {/* Section header - left aligned like EVEY */}
            <div className="flex items-start gap-4 sm:gap-6 mb-12 sm:mb-16">
              <div className="flex flex-col items-center gap-2">
                <div className="w-px h-12 sm:h-16 bg-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">Fitur</span>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                  Semua yang
                  <br />
                  Kamu Butuhkan
                </h2>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-md">
                  Fitur lengkap yang bikin bisnis UMKM-mu naik level tanpa ribet.
                </p>
              </div>
            </div>

            {/* Feature cards grid */}
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl border border-border/30 bg-secondary/40 p-5 sm:p-7 hover:border-primary/40 transition-all duration-300"
                  onMouseEnter={() => setActiveSection(index)}
                >
                  {/* Number watermark */}
                  <span className="absolute top-3 right-4 text-5xl sm:text-6xl font-extrabold text-foreground/[0.03] leading-none select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="relative">
                    <div className={`rounded-2xl p-3 w-fit mb-5 transition-colors duration-300 ${
                      activeSection === index ? "bg-primary" : "bg-primary/10"
                    }`}>
                      <feature.icon className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors duration-300 ${
                        activeSection === index ? "text-primary-foreground" : "text-primary"
                      }`} />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>

                  {/* Gold bottom accent on hover */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-transform duration-300 origin-left ${
                    activeSection === index ? "scale-x-100" : "scale-x-0"
                  }`} />
                </div>
              ))}
            </div>
          </div>

          {/* Section number watermark */}
          <div className="absolute bottom-0 right-4 sm:right-10 pointer-events-none">
            <span className="text-[120px] sm:text-[200px] font-extrabold text-foreground/[0.02] leading-none select-none">02</span>
          </div>
        </section>

        {/* How it Works Section - EVEY style with left/right split */}
        <section id="cara-kerja" className="py-20 sm:py-28 lg:py-32 relative border-t border-border/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left - heading */}
              <div className="lg:sticky lg:top-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 sm:w-12 h-0.5 bg-primary" />
                  <span className="text-xs sm:text-sm font-semibold text-primary uppercase tracking-widest">
                    Cara Kerja
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                  Tiga Langkah
                  <br />
                  <span className="text-primary">Simpel</span>
                </h2>
                <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-sm leading-relaxed">
                  Mulai dari nol sampai punya strategi bisnis yang jelas. Semua bisa dilakukan dalam hitungan menit.
                </p>

                <button
                  onClick={() => router.push("/register")}
                  className="btn-pill mt-8 sm:mt-10 bg-primary text-primary-foreground font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 inline-flex items-center gap-2"
                >
                  Mulai Sekarang
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Right - steps */}
              <div className="flex flex-col gap-6 sm:gap-8">
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
                  <div
                    key={index}
                    className="group relative flex gap-4 sm:gap-6 p-5 sm:p-7 rounded-3xl border border-border/20 hover:border-primary/30 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300"
                  >
                    {/* Step number */}
                    <div className="shrink-0">
                      <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary/20 group-hover:text-primary/40 transition-colors leading-none">
                        {item.step}
                      </span>
                    </div>
                    <div className="pt-1 sm:pt-2">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-foreground mb-1 sm:mb-2">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/0 group-hover:text-primary/40 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - EVEY style: big numbers, black/gold */}
        <section id="statistik" className="py-20 sm:py-28 lg:py-32 relative border-t border-border/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border/10 rounded-3xl overflow-hidden border border-border/20">
              {[
                { value: "1,000+", label: "UMKM Terdaftar", sub: "di seluruh Indonesia" },
                { value: "50K+", label: "Produk Dikelola", sub: "dan terus bertambah" },
                { value: "99.9%", label: "Uptime Terjamin", sub: "server stabil 24/7" },
                { value: "5 Mnt", label: "Setup Awal", sub: "langsung bisa pakai" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-secondary/30 p-5 sm:p-8 lg:p-10 text-center hover:bg-secondary/50 transition-colors duration-300"
                >
                  <div className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-primary leading-none">{stat.value}</div>
                  <div className="text-xs sm:text-sm font-semibold text-foreground mt-2 sm:mt-3">{stat.label}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section number watermark */}
          <div className="absolute top-8 right-4 sm:right-10 pointer-events-none">
            <span className="text-[100px] sm:text-[160px] font-extrabold text-foreground/[0.02] leading-none select-none">04</span>
          </div>
        </section>

        {/* CTA Section - EVEY gold block style */}
        <section id="kontak" className="py-20 sm:py-28 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="relative overflow-hidden rounded-3xl bg-primary">
              {/* Decorative circle */}
              <div className="absolute -top-20 -right-20 w-60 h-60 sm:w-80 sm:h-80 rounded-full bg-primary-foreground/5" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 sm:w-60 sm:h-60 rounded-full bg-primary-foreground/5" />

              <div className="relative p-8 sm:p-12 lg:p-16">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-primary-foreground leading-tight tracking-tight">
                      Siap Scale Up
                      <br />
                      Bisnismu?
                    </h2>
                    <p className="mt-4 sm:mt-5 text-sm sm:text-base text-primary-foreground/60 max-w-md leading-relaxed">
                      Bergabung dengan ribuan UMKM yang sudah pakai OptimaBiz untuk manage dan grow bisnis mereka.
                    </p>
                  </div>
                  <div className="flex lg:justify-end">
                    <button
                      onClick={() => router.push("/register")}
                      className="btn-pill bg-primary-foreground text-primary font-bold text-sm sm:text-lg px-8 sm:px-10 py-4 sm:py-5 inline-flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                      Gaspol Sekarang
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - EVEY style minimal */}
        <footer className="border-t border-border/10 py-8 sm:py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-extrabold text-foreground">OptimaBiz</span>
              </div>

              {/* Gold accent line */}
              <div className="hidden sm:block flex-1 mx-8">
                <div className="h-px bg-border/20" />
              </div>

              {/* Social + copyright */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-4">
                  {["Ig", "Tw", "Li"].map((s) => (
                    <span key={s} className="text-[10px] uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-colors cursor-pointer font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  2024 OptimaBiz. Dibuat untuk UMKM Indonesia.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
