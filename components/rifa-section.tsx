"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const WIDGET_ID = "93877-y45qrt8o"; // <-- tu ID de SweepWidget

export default function RifaSection() {
  const steps = [
    "Síguenos en Instagram y X",
    "Like + comenta el post fijado (etiqueta 3 amigos)",
    "Sube un reel invitando con #FinalXLive y etiquétanos",
    "Usa tu link único para invitar amigos (más tickets)",
  ];

  // Cargar el script de SweepWidget en cliente
  useEffect(() => {
    // evita cargarlo dos veces
    if (!document.querySelector('script[src="https://sweepwidget.com/w/j/w_init.js"]')) {
      const s = document.createElement("script");
      s.src = "https://sweepwidget.com/w/j/w_init.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  const scrollToWidget = () => {
    const el = document.getElementById(WIDGET_ID);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="rifa" className="py-20 px-4 bg-[#0B0F14]">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">
            Sorteo del mes: <span className="text-[#FFC533] text-glow-gold">iPhone 17 Pro Max</span>
          </h2>
          <p className="text-xl text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed">
            Sigue, comparte, invita. Cada acción suma entradas en el Sorteo y puntos de Airdrop FNX. Aunque no ganes el
            premio, tu progreso cuenta.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Izquierda: pasos + CTA */}
          <div className="space-y-8">
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-[#121821] rounded-xl p-5 border border-[#1e2633]">
                  <div className="w-8 h-8 bg-[#FFC533]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-[#FFC533] font-bold">{idx + 1}</span>
                  </div>
                  <p className="text-[#F5F7FA] leading-relaxed pt-1">{step}</p>
                </div>
              ))}
            </div>

            {/* Transparencia */}
            <div className="bg-[#18C37D]/10 rounded-xl p-6 border border-[#18C37D]/30">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#18C37D] flex-shrink-0 mt-0.5" />
                <p className="text-[#F5F7FA] leading-relaxed">
                  <span className="font-bold">Transparencia total:</span> Publicamos ranking semanal (Top 10 → Sorteos
                  $50/$100 en vivo).
                </p>
              </div>
            </div>

            <button
              onClick={scrollToWidget}
              className="w-full px-6 py-4 bg-[#18C37D] text-[#05130C] rounded-xl font-bold text-lg hover:bg-[#18C37D]/90 transition-all neon-border-success text-center"
            >
              Participar Ahora
            </button>
          </div>

          {/* Derecha: imagen + widget */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#FFC533]/30">
              <Image
                src="/prize-iphone17.png"
                alt="iPhone 17 Pro Max"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* AQUÍ SE CARGA EL WIDGET */}
            <div
              id={WIDGET_ID}
              className="sw_container bg-[#121821] rounded-2xl p-4 border border-[#1e2633] min-h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
