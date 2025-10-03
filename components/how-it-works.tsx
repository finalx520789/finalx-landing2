import { Eye, Radio, Users } from "lucide-react"

const steps = [
  {
    icon: Eye,
    title: "Mira streamings",
    description: "Gana tokens FNX mientras disfrutas de tu contenido favorito",
  },
  {
    icon: Radio,
    title: "Haz streaming",
    description: "Avanza en arenas, desbloquea premios y crece tu comunidad",
  },
  {
    icon: Users,
    title: "Invita personas",
    description: "Más recompensas por cada miembro que traes al ecosistema",
  },
]

export default function HowItWorks() {
  return (
    <section className="relative z-10 py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">¿Cómo funciona?</h2>
          <p className="text-xl text-muted-foreground">Tres formas simples de ganar en FinalX</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-8 hover:border-primary transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-pretty">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
