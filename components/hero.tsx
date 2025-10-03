"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Sparkles, TrendingUp, Coins } from "lucide-react"

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-10-31T23:59:59").getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
              <span className="text-[#FFC533] text-glow-gold">Streaming que paga.</span>{" "}
              <span className="text-[#F5F7FA]">Comunidad que crece.</span>
            </h1>

            <p className="text-xl text-[#9CA3AF] leading-relaxed">
              Mira o haz streaming y gana tokens, premios y experiencias. Si inviertes, los FinalX Nodes te dan
              participación en los ingresos del ecosistema.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#rifa"
                className="px-6 py-4 bg-[#18C37D] text-[#05130C] rounded-xl font-bold text-lg hover:bg-[#18C37D]/90 transition-all neon-border-success text-center"
              >
                Unirme al Sorteo
              </Link>
              <Link
                href="https://nodes.finalx.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-gradient-to-r from-[#F5A623] to-[#FFC533] text-[#1f1402] rounded-xl font-bold text-lg hover:opacity-90 transition-all glow-gold text-center"
              >
                Comprar Nodo
              </Link>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#121821] rounded-xl border border-[#1e2633]">
                <Coins className="w-5 h-5 text-[#FFC533]" />
                <span className="text-sm font-semibold text-[#F5F7FA]">Tokens & Premios</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#121821] rounded-xl border border-[#1e2633]">
                <TrendingUp className="w-5 h-5 text-[#18C37D]" />
                <span className="text-sm font-semibold text-[#F5F7FA]">Comisiones 5–50%</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-[#121821] rounded-xl border border-[#1e2633]">
                <Sparkles className="w-5 h-5 text-[#FFC533]" />
                <span className="text-sm font-semibold text-[#F5F7FA]">Nodos Limitados</span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-6">
            {/* Countdown Card */}
            <div className="bg-[#121821] rounded-2xl p-6 border border-[#FFC533]/30 neon-border-gold">
              <h3 className="text-lg font-bold text-[#FFC533] mb-4">Sorteo termina en:</h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "Días", value: timeLeft.days },
                  { label: "Horas", value: timeLeft.hours },
                  { label: "Min", value: timeLeft.minutes },
                  { label: "Seg", value: timeLeft.seconds },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="text-3xl font-extrabold text-[#FFC533]">{String(item.value).padStart(2, "0")}</div>
                    <div className="text-xs text-[#9CA3AF] mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Xerena Image */}
            <div className="relative rounded-2xl overflow-hidden border border-[#1e2633]">
              <Image
                src="/xerena-hero.png"
                alt="Xerena AI Avatar"
                width={600}
                height={700}
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
