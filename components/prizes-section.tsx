import { Button } from "@/components/ui/button"
import { Gift, Sparkles } from "lucide-react"

export default function PrizesSection() {
  return (
    <section className="relative z-10 py-32 px-4 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full mb-6">
            <Gift className="w-5 h-5 text-primary" />
            <span className="text-primary font-bold">Rifa Activa</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Premios & Rifas</h2>
          <p className="text-xl text-muted-foreground">Participa y gana premios increíbles cada mes</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-primary/50 rounded-2xl p-8 md:p-12 neon-border">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="inline-block bg-primary/20 px-4 py-2 rounded-lg">
                  <span className="text-primary font-bold">Premio del Mes</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold">iPhone 17 Pro Max</h3>
                <p className="text-muted-foreground text-pretty">
                  Participa automáticamente al acumular tokens FNX. Cada token es una entrada para la rifa mensual.
                </p>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold glow-gold"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Participa en la rifa
                </Button>
              </div>

              {/* iPhone placeholder */}
              <div className="flex justify-center">
                <div className="w-64 h-80 bg-secondary border border-primary/30 rounded-3xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Gift className="w-20 h-20 text-primary mx-auto" />
                    <p className="text-primary font-bold">iPhone 17</p>
                    <p className="text-sm text-muted-foreground px-4">Imagen del premio</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
