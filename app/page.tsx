import Header from "@/components/header"
import Hero from "@/components/hero"
import ComoFunciona from "@/components/como-funciona"
import RifaSection from "@/components/rifa-section"
import NodosSection from "@/components/nodos-section"
import RoadmapSection from "@/components/roadmap-section"
import FAQSection from "@/components/faq-section"
import Footer from "@/components/footer"
import ParticlesBackground from "@/components/particles-background"
import AIWidget from "@/components/ai-widget"

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      <Header />
      <main className="relative min-h-screen">
        <Hero />
        <ComoFunciona />
        <RifaSection />
        <NodosSection />
        <RoadmapSection />
        <FAQSection />
      </main>
      <Footer />
      <AIWidget />
    </>
  )
}
