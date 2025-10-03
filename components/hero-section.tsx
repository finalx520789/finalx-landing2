import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            {/* Logo placeholder */}
            <div className="inline-block">
              <div className="w-48 h-16 bg-secondary neon-border rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-2xl">FinalX</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
              Streaming que paga. <span className="text-primary text-glow-gold">Comunidad que crece.</span>
            </h1>

            <p className="text-xl text-muted-foreground text-pretty max-w-xl">
              El ecosistema revolucionario donde ver y hacer streaming te recompensa con criptomonedas, premios
              exclusivos y experiencias únicas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
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
              </Button>
            </div>
          </div>

          {/* Right side - AI Avatar placeholder */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 md:w-96 md:h-96 bg-secondary neon-border rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="text-center space-y-4 p-8">
                  <div className="w-32 h-32 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-16 h-16 text-primary" />
                  </div>
                  <p className="text-primary font-bold text-xl">Xerena AI</p>
                  <p className="text-sm text-muted-foreground">Tu asistente inteligente</p>
                </div>
              </div>
              {/* Decorative glow */}
              <div className="absolute inset-0 bg-primary/10 blur-3xl -z-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
