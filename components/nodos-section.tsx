"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { TrendingUp, Lock, DollarSign } from "lucide-react"

export default function NodosSection() {
  const [nodesSold] = useState(47)
  const totalNodes = 1000
  const progress = (nodesSold / totalNodes) * 100

  const benefits = [
    "Escasez real: máximo 2000 nodos",
    "Precio progresa con la demanda",
    "Ingresos de múltiples líneas (streaming, store, rifas, partners)",
  ]

  return (
    <section id="nodos" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
            <span className="text-[#FFC533] text-glow-gold">FinalX Nodes</span> (NFT)
          </h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed">
            Activo digital escaso con participación en los ingresos del ecosistema. Precio inicial $500; sube $50 cada
            50 ventas. A los 1000 se activa el marketplace P2P.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Progress & Info */}
          <div className="space-y-8">
            {/* Progress Bar */}
            <div className="bg-[#121821] rounded-2xl p-8 border border-[#1e2633]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-[#F5F7FA]">Nodos vendidos</span>
                <span className="text-2xl font-extrabold text-[#FFC533]">
                  {nodesSold} / {totalNodes}
                </span>
              </div>
              <div className="w-full h-4 bg-[#0B0F14] rounded-full overflow-hidden border border-[#FFC533]/15">
                <div
                  className="h-full bg-gradient-to-r from-[#F5A623] to-[#FFC533] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-[#9CA3AF] mt-4">
                <span className="font-semibold text-[#F5F7FA]">Nota:</span> Regla del Marketplace: precio mínimo =
                compra + 10%. Fee de venta: 5%.
              </p>
            </div>

            {/* Why Now Card */}
            <div className="bg-[#121821] rounded-2xl p-8 border border-[#FFC533]/30 neon-border-gold">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-[#F5F7FA]">
                <TrendingUp className="w-6 h-6 text-[#FFC533]" />
                ¿Por qué ahora?
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-[#FFC533] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-[#F5F7FA] leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="https://nodes.finalx.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-4 bg-gradient-to-r from-[#F5A623] to-[#FFC533] text-[#1f1402] rounded-xl font-bold text-lg hover:opacity-90 transition-all glow-gold text-center"
            >
              Ir a la DApp de Nodos
            </Link>
          </div>

          {/* Right: DApp Preview */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#1e2633]">
              <Image
                src="/dapp-capture.png"
                alt="FinalX DApp"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#121821] rounded-xl p-5 border border-[#1e2633]">
                <Lock className="w-8 h-8 text-[#FFC533] mb-3" />
                <h4 className="font-bold mb-2 text-[#F5F7FA]">Escasez</h4>
                <p className="text-sm text-[#9CA3AF]">Máximo 2000 nodos</p>
              </div>
              <div className="bg-[#121821] rounded-xl p-5 border border-[#1e2633]">
                <DollarSign className="w-8 h-8 text-[#18C37D] mb-3" />
                <h4 className="font-bold mb-2 text-[#F5F7FA]">Ingresos</h4>
                <p className="text-sm text-[#9CA3AF]">Participación en el ecosistema</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
