import type React from "react"
import { Award, Coins, Globe, TrendingUp, Trophy, Zap, Sparkles } from "lucide-react"

const streamerBenefits = [
  {
    icon: Trophy,
    title: "Rifas exclusivas",
    description: "Acceso a sorteos premium para creadores",
  },
  {
    icon: TrendingUp,
    title: "Mayor visibilidad",
    description: "Destaca en la plataforma y crece tu audiencia",
  },
  {
    icon: Award,
    title: "Premios por logros",
    description: "Recompensas al alcanzar nuevas arenas",
  },
]

const userBenefits = [
  {
    icon: Coins,
    title: "Tokens FNX",
    description: "Gana criptomonedas viendo contenido",
  },
  {
    icon: Sparkles,
    title: "Productos exclusivos",
    description: "Canjea tokens por productos reales",
  },
  {
    icon: Globe,
    title: "Viajes y experiencias",
    description: "Accede a sorteos de viajes increíbles",
  },
]

function Gift(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  )
}

export default function BenefitsSection() {
  return (
    <section className="relative z-10 py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Beneficios para todos</h2>
          <p className="text-xl text-muted-foreground">Streamers y usuarios ganan en FinalX</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Streamers */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <Zap className="w-8 h-8 text-primary" />
              <h3 className="text-3xl font-bold">Para Streamers</h3>
            </div>
            <div className="space-y-4">
              {streamerBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{benefit.title}</h4>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Users */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-8 h-8 text-primary" />
              <h3 className="text-3xl font-bold">Para Usuarios</h3>
            </div>
            <div className="space-y-4">
              {userBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{benefit.title}</h4>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
