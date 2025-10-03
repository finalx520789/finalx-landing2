import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TerminosRifas() {
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
          Términos y Condiciones – Sorteo FinalX
        </h1>

        <div className="space-y-6 text-[#9CA3AF] leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Organizador</h2>
            <p>
              El presente sorteo es organizado por FinalX, proyecto digital independiente.
              Esta promoción no está afiliada, patrocinada ni administrada por Apple Inc., Instagram, TikTok,
              X (Twitter), Facebook ni ninguna otra red social.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Participación</h2>
            <p>
              Podrán participar todas las personas mayores de 13 años con acceso a redes sociales.
              En caso de que el ganador sea menor de edad, el premio será entregado únicamente a través de su
              padre, madre o tutor legal.
              La participación es gratuita; no es necesario realizar una compra para obtener tickets.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Cómo participar</h2>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>Seguir a FinalX en Instagram, TikTok y X (Twitter).</li>
              <li>Dar “me gusta” y comentar en el post oficial, etiquetando a amigos.</li>
              <li>Subir un Reel o TikTok usando el hashtag oficial <b>#FinalXLive</b> y etiquetando a FinalX.</li>
              <li>Invitar amigos mediante el link único de referido (cada invitación válida otorga tickets adicionales).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Validez de los tickets</h2>
            <p>
              Cada acción válida equivale a un número de tickets.  
              Todos los tickets suman tanto para el sorteo principal como para el Airdrop FNX.  
              Los tickets no son transferibles ni intercambiables.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Selección de ganadores</h2>
            <p>
              El ganador del iPhone 17 Pro Max será elegido al azar entre todos los participantes.  
              Cada semana se publicará un Top 10 de usuarios con más invitaciones; entre ellos se realizará
              un sorteo adicional de $50–$100 USDT.  
              Los resultados serán anunciados en redes sociales oficiales de FinalX y mediante transmisión en vivo.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Reclamo del premio</h2>
            <p>
              El ganador será contactado vía correo electrónico y anunciado en vivo.  
              Para reclamar el premio, deberá confirmar su identidad y aparecer en vivo (video en redes
              o transmisión privada con el equipo FinalX) en un plazo máximo de 15 días calendario.  
              Si el ganador no se presenta dentro de ese plazo, perderá el derecho al premio y se elegirá
              un nuevo ganador.  
              La entrega del premio se realizará en un plazo máximo de 30 días calendario después de la validación.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Condiciones adicionales</h2>
            <p>
              Los premios no son transferibles ni canjeables por dinero en efectivo (excepto premios en USDT).  
              FinalX se reserva el derecho de descalificar a participantes que usen cuentas falsas, bots o
              prácticas fraudulentas.  
              El organizador podrá modificar estos términos en caso de fuerza mayor.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Protección de datos</h2>
            <p>
              Los datos recopilados (correo y redes sociales) se usarán solo para validar la participación,
              entregar premios y comunicar actividades de FinalX.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#F3F4F6] mb-3">Contacto</h2>
            <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
              <li>
                📩 <a href="mailto:contacto@finalx.app" className="text-[#FBBF24] hover:underline">contacto@finalx.app</a>
              </li>
              <li>
                📩 <a href="mailto:rewards@finalx.app" className="text-[#FBBF24] hover:underline">rewards@finalx.app</a>
              </li>
              <li>
                📩 <a href="mailto:soporte@finalx.app" className="text-[#FBBF24] hover:underline">soporte@finalx.app</a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
