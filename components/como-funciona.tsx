import { Gift, Zap, TrendingUp } from "lucide-react"

export default function ComoFunciona() {
  const sections = [
    {
      title: "Usuarios",
      icon: Gift,
      items: [
        "Participa en rifas mensuales",
        "Cada acción suma puntos de Airdrop FNX",
        "Aunque no ganes, tus tickets se convierten en tokens",
      ],
    },
    {
      title: "Streamers",
      icon: Zap,
      items: [
        "FinalX te da premios para rifar y crecer",
        "Comisiones del Store del 5%–50%",
        "Retos y visibilidad oficial de la marca",
      ],
    },
    {
      title: "Inversores (Nodos)",
      icon: TrendingUp,
      items: [
        "Participación en ingresos del ecosistema",
        "Precio sube +$50 cada 50 ventas",
        "15% por invitación directa (primera compra)",
      ],
    },
  ]

  return (
    <section id="como-funciona" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center mb-16 text-glow-gold">
          En FinalX <span className="text-[#FFC533]">todos ganan</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <div
                key={section.title}
                className="bg-[#121821] rounded-2xl p-8 border border-[#1e2633] hover:border-[#FFC533]/50 transition-all card-hover"
              >
                <div className="w-14 h-14 bg-[#FFC533]/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#FFC533]" />
                </div>
                <h3 className="text-2xl font-bold mb-6 text-[#F5F7FA]">{section.title}</h3>
                <ul className="space-y-4">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-[#FFC533] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-[#9CA3AF] leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
