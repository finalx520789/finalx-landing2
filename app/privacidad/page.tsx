import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function Privacidad() {
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
          Política de Privacidad – FinalX
        </h1>

        <div className="space-y-6 text-[#9CA3AF] leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Datos Recopilados</h2>
            <p>
              Correo electrónico, nombres de usuario en redes sociales y wallet addresses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Uso de Datos</h2>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Gestionar participación en sorteos.</li>
              <li>Procesar transacciones de nodos y marketplace.</li>
              <li>Comunicar actualizaciones.</li>
              <li>Mejorar la experiencia de usuario.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Derechos ARCO</h2>
            <p>
              Acceso, Rectificación, Cancelación y Oposición.  
              Estos derechos pueden ejercerse vía correo electrónico.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Compartir Información</h2>
            <p>
              No se venden datos a terceros.  
              Solo se comparten con procesadores de pago, blockchain o cuando exista un requerimiento legal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Cookies</h2>
            <p>
              Se usan cookies básicas y no invasivas para mejorar la experiencia del usuario.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Seguridad</h2>
            <p>
              Implementamos medidas técnicas y organizativas de seguridad.  
              Sin embargo, ningún sistema es 100% seguro.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Contacto</h2>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>
                📩{" "}
                <a
                  href="mailto:contacto@finalx.app"
                  className="text-[#FBBF24] hover:underline"
                >
                  contacto@finalx.app
                </a>
              </li>
              <li>
                📩{" "}
                <a
                  href="mailto:soporte@finalx.app"
                  className="text-[#FBBF24] hover:underline"
                >
                  soporte@finalx.app
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Actualizaciones</h2>
            <p>
              La política podrá actualizarse.  
              Los cambios serán notificados en canales oficiales.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
