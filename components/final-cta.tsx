import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export default function FinalCTA() {
  return (
    <section className="relative z-10 py-32 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <div className="bg-card border border-primary/50 rounded-3xl p-12 md:p-16 neon-border relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />

          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-balance">
              Sé parte del futuro del <span className="text-primary text-glow-gold">streaming</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Únete a miles de usuarios que ya están ganando mientras disfrutan de su contenido favorito. El futuro es
              ahora.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg glow-gold"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Únete a la lista blanca
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 font-bold text-lg neon-border bg-transparent"
              >
                Compra tu Nodo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* AI Bot placeholder */}
            <div className="pt-8">
              <div className="inline-block bg-secondary border border-primary/30 rounded-xl p-6">
                <p className="text-sm text-muted-foreground mb-2">Espacio para Bot IA</p>
                <p className="text-primary font-bold">Xerena está lista para ayudarte</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
