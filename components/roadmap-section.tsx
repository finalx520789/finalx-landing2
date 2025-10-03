import { Calendar, TrendingUp, Zap, ShoppingBag } from "lucide-react"

export default function RoadmapSection() {
  const roadmapItems = [
    {
      quarter: "Q4 2025",
      title: "Rifas & Comunidad",
      description: "iPhone 17, rankings semanales, alianzas.",
      icon: Calendar,
    },
    {
      quarter: "Q4 2025",
      title: "Venta 1.000 nodos",
      description: "Valorización de precio c/50 ventas.",
      icon: TrendingUp,
    },
    {
      quarter: "Q1 2026",
      title: "Arenas & Minería",
      description: "Ver streaming = ganar FNX.",
      icon: Zap,
    },
    {
      quarter: "Q1 2026",
      title: "Marketplace P2P",
      description: "Reventa ≥ compra +10%.",
      icon: ShoppingBag,
    },
  ]

  return (
    <section id="roadmap" className="py-20 px-4 bg-[#0B0F14]">
      <div className="container mx-auto">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center mb-16">
          <span className="text-[#FFC533] text-glow-gold">Roadmap</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {roadmapItems.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="bg-[#121821] rounded-2xl p-6 border border-[#1e2633] hover:border-[#FFC533]/50 transition-all group card-hover"
              >
                <div className="w-12 h-12 bg-[#FFC533]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FFC533]/20 transition-all">
                  <Icon className="w-6 h-6 text-[#FFC533]" />
                </div>
                <div className="text-sm font-bold text-[#FFC533] mb-2">{item.quarter}</div>
                <h3 className="text-xl font-bold mb-3 text-[#F5F7FA]">{item.title}</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
