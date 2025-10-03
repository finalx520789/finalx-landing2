"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "¿Cómo participo en la rifa?",
      answer:
        "Sigue nuestras redes sociales (Instagram y X), dale like y comenta el post fijado etiquetando a 3 amigos, sube un reel con #FinalXLive etiquetándonos, y usa tu link único para invitar amigos. Cada acción suma entradas.",
    },
    {
      question: "¿Qué gano con un nodo?",
      answer:
        "Los FinalX Nodes te dan participación en los ingresos del ecosistema (streaming, store, rifas, partners). El precio inicial es $500 y sube $50 cada 50 ventas. También recibes 15% de comisión por invitación directa en la primera compra.",
    },
    {
      question: "¿Cuándo abre el Marketplace?",
      answer:
        "El marketplace P2P se activa cuando se vendan 1000 nodos. La regla es que el precio mínimo de reventa debe ser tu precio de compra + 10%, con un fee de venta del 5%.",
    },
    {
      question: "¿Cómo se entregan los premios?",
      answer:
        "Los premios se entregan públicamente y anunciamos a los ganadores en nuestras redes sociales. Publicamos rankings semanales y los Top 10 participan en rifas adicionales de $50/$100 en vivo.",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-center mb-12">
          Preguntas <span className="text-[#FBBF24] text-glow-gold">Frecuentes</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#111] rounded-xl border border-[#333] overflow-hidden hover:border-[#FBBF24]/50 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left"
              >
                <span className="font-bold text-lg pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#FBBF24] flex-shrink-0 transition-transform ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-5">
                  <p className="text-[#9CA3AF] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
