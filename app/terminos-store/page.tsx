import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TerminosStore() {
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
          Términos y Condiciones – FinalX Store
        </h1>

        <p className="text-sm text-[#9CA3AF] mb-8">
          Última actualización: 1 de octubre de 2025
        </p>

        <div className="space-y-6 text-[#9CA3AF] leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">1. Naturaleza del Marketplace</h2>
            <p>
              FinalX Store es un marketplace híbrido en el cual se comercializan:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li><b>Productos digitales:</b> cursos, contenido premium, licencias de software, NFTs, bots y otros activos virtuales.</li>
              <li><b>Productos físicos:</b> dispositivos electrónicos, artículos de merchandising, accesorios y otros bienes tangibles.</li>
              <li><b>Servicios:</b> experiencias turísticas, asesorías, mentorías, marketing digital, streaming patrocinado y servicios profesionales.</li>
            </ul>
            <p className="mt-2">
              El catálogo estará compuesto tanto por productos propios de FinalX como por productos y servicios de terceros que cumplan con nuestros estándares de calidad y políticas de validación.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">2. Estándares de Calidad y Geolocalización</h2>
            <p>
              Todos los productos y servicios de terceros deben cumplir con requisitos mínimos de calidad establecidos por FinalX.  
              Los productos físicos y servicios con dependencia geográfica estarán sujetos a limitaciones por geolocalización, indicadas en la descripción de cada artículo.  
              FinalX se reserva el derecho de retirar, suspender o bloquear cualquier producto o servicio que no cumpla con estos estándares.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">3. Comisiones para Streamers</h2>
            <p>
              Los streamers afiliados a FinalX Live podrán generar ingresos a través de la promoción de productos y servicios listados en la Store.  
              Las comisiones mínimas comienzan en el 5% y podrán llegar hasta el 50%, sujeto a:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Tipo de producto o servicio.</li>
              <li>Nivel de partnership y trayectoria del streamer.</li>
              <li>Métricas de desempeño e impacto de sus transmisiones.</li>
            </ul>
            <p className="mt-2">
              El detalle de comisiones aplicables estará disponible en cada producto dentro de la Store.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">4. Condiciones de Proveedores</h2>
            <p>
              Los proveedores que deseen listar productos o servicios en la Store deberán:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Garantizar que poseen los derechos de venta y distribución.</li>
              <li>Cumplir con normativas legales y fiscales de su jurisdicción.</li>
              <li>Aceptar condiciones de calidad, soporte y garantía establecidas por FinalX.</li>
              <li>Someterse a procesos de validación interna y, cuando aplique, certificación de FinalX.</li>
            </ul>
            <p className="mt-2">
              FinalX se reserva el derecho de suspender o eliminar la cuenta de proveedores que incumplan estas condiciones.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">5. Responsabilidad y Limitaciones</h2>
            <p>
              FinalX actúa como intermediario en las transacciones entre compradores y proveedores externos.  
              No nos hacemos responsables por la calidad, legalidad o cumplimiento de productos de terceros, aunque garantizamos estándares mínimos.  
              Los productos propios de FinalX estarán identificados y contarán con garantía directa de la plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">6. Modificaciones</h2>
            <p>
              Dado que la Store aún no está pública, estos términos podrán cambiar o ampliarse en el lanzamiento oficial.  
              Las actualizaciones serán comunicadas en los canales oficiales de FinalX y en la página web de la Store.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">7. Contacto</h2>
            <p>
              Para consultas relacionadas con FinalX Store, proveedores o comisiones de streamers:
            </p>
            <p className="mt-2">
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
