import type React from "react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#1f1f1f] py-16 px-4 bg-[#0b0b0b]">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Image src="/logo-fnx.png" alt="FinalX" width={60} height={60} className="w-15 h-15" />
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Streaming, premios y un ecosistema donde todos ganan.
            </p>
          </div>

          {/* Plataformas */}
          <div>
            <h4 className="font-bold mb-4 text-[#F3F4F6]">Plataformas</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://finalx.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#9CA3AF] hover:text-[#FBBF24] transition-colors"
                >
                  finalx.store
                </Link>
              </li>
              <li>
                <Link
                  href="https://finalx.live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#9CA3AF] hover:text-[#FBBF24] transition-colors"
                >
                  finalx.live
                </Link>
              </li>
              <li>
                <Link
                  href="https://nodes.finalx.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#9CA3AF] hover:text-[#FBBF24] transition-colors"
                >
                  DApp Nodos
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-[#F3F4F6]">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/terminos-nodos" className="text-sm text-[#9CA3AF] hover:text-[#FBBF24] transition-colors">
                  Términos Nodos
                </Link>
              </li>
              <li>
                <Link href="/terminos-store" className="text-sm text-[#9CA3AF] hover:text-[#FBBF24] transition-colors">
                  Términos Store
                </Link>
              </li>
              <li>
                <Link href="/terminos-rifas" className="text-sm text-[#9CA3AF] hover:text-[#FBBF24] transition-colors">
                  Términos Sorteo
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-sm text-[#9CA3AF] hover:text-[#FBBF24] transition-colors">
                  Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h4 className="font-bold mb-4 text-[#F3F4F6]">Redes Sociales</h4>
            <div className="flex gap-3">
              {/* Facebook */}
              <Link
                href="https://www.facebook.com/profile.php?id=61577795584037&locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1f1f1f] rounded-lg flex items-center justify-center 
                           hover:bg-[#FBBF24]/20 hover:border-[#FBBF24] border border-transparent transition-all"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5 text-[#FBBF24]" />
              </Link>

              {/* X (Twitter) */}
              <Link
                href="https://x.com/FinalXapp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1f1f1f] rounded-lg flex items-center justify-center 
                           hover:bg-[#FBBF24]/20 hover:border-[#FBBF24] border border-transparent transition-all"
                aria-label="X (Twitter)"
              >
                <XIcon className="w-5 h-5 text-[#FBBF24]" />
              </Link>

              {/* Instagram */}
              <Link
                href="https://www.instagram.com/finalx.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1f1f1f] rounded-lg flex items-center justify-center 
                           hover:bg-[#FBBF24]/20 hover:border-[#FBBF24] border border-transparent transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5 text-[#FBBF24]" />
              </Link>

              {/* TikTok */}
              <Link
                href="https://www.tiktok.com/@finalx.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#1f1f1f] rounded-lg flex items-center justify-center 
                           hover:bg-[#FBBF24]/20 hover:border-[#FBBF24] border border-transparent transition-all"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5 text-[#FBBF24]" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1f1f1f] pt-8 text-center">
          <p className="text-sm text-[#9CA3AF]">© 2025 FinalX. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

/* ==================== ICONOS CUSTOM ==================== */
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5 3.66 9.13 8.44 9.93v-7.03H8.08v-2.9h2.36V9.41c0-2.33 1.38-3.62 3.5-3.62.7 0 1.46.12 1.46.12v2.4h-.82c-1.28 0-1.68.8-1.68 1.62v1.94h2.85l-.46 2.9h-2.39v7.03C18.34 21.2 22 17.07 22 12.07z" />
    </svg>
  )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-3a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
    </svg>
  )
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor">
      <path d="M41,16.5c-2.6-0.2-5.1-1.1-7.3-2.5c-1.1-0.7-2-1.7-2.8-2.7v17.5c0,3.1-1.2,6-3.4,8.2c-2.1,2.2-5,3.5-8.1,3.5
      c-6.3,0-11.5-5.3-11.5-11.8s5.1-11.8,11.5-11.8c0.9,0,1.8,0.1,2.6,0.3v6.5c-0.8-0.5-1.7-0.7-2.6-0.7c-3.1,0-5.6,2.6-5.6,5.8
      c0,3.2,2.5,5.8,5.6,5.8c1.6,0,3-0.6,4-1.7c1-1,1.6-2.5,1.6-4V7h6.2c0.3,2.1,1.3,4.1,2.8,5.5c1.5,1.5,3.5,2.5,5.6,2.7V16.5z"/>
    </svg>
  )
}
