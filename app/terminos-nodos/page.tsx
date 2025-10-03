import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TerminosNodos() {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-[#F3F4F6]">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#FBBF24] hover:text-[#FBBF24]/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <h1 className="text-4xl font-extrabold mb-8 text-[#FBBF24]">
          Términos y Condiciones – FinalX Nodes
        </h1>

        <div className="space-y-6 text-[#9CA3AF] leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Precio y Escalado</h2>
            <p>
              El precio inicial de cada FinalX Node es de 500 USDT.
              El precio aumenta 50 USDT cada 50 nodos vendidos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Marketplace P2P</h2>
            <p>
              El marketplace P2P se activa al alcanzar 1000 nodos vendidos.
              El precio mínimo de reventa debe ser igual al precio original +10%.
              Se aplica un fee del 5% sobre cada venta.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Participación en Ingresos</h2>
            <p>
              Los holders de nodos tienen derecho a participación proporcional en los ingresos del ecosistema
              (streaming, store, sorteos y alianzas).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Comisión por Referidos</h2>
            <p>
              Los holders reciben 15% de comisión por cada invitación directa que resulte en la primera compra de un nodo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Riesgos</h2>
            <p>
              La compra de nodos implica riesgos. El valor puede fluctuar y no hay garantía de retorno.
              Cada usuario debe evaluar su situación financiera antes de invertir.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">No Asesoría Financiera</h2>
            <p>
              Nada en este sitio constituye asesoría financiera, legal o de inversión.
              Los usuarios deben consultar con profesionales antes de tomar decisiones.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Propiedad Intelectual</h2>
            <p>
              Los derechos de marca, logos y contenido son propiedad exclusiva de FinalX.
              Los holders de nodos no adquieren derechos sobre la propiedad intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Modificaciones y Contacto</h2>
            <p>
              FinalX podrá modificar estos términos en cualquier momento. Los cambios serán notificados en canales oficiales.
            </p>
            <p className="mt-3">
              📩{" "}
              <a
                href="mailto:soporte@finalx.app"
                className="text-[#FBBF24] hover:underline"
              >
                soporte@finalx.app
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
