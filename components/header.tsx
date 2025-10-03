"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Cómo funciona", href: "#como-funciona" },
    { label: "Sorteo", href: "#rifa" },
    { label: "Nodos", href: "#nodos" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "Store", href: "https://finalx.store", external: true },
    { label: "Live", href: "https://finalx.live", external: true },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0C1219CC] backdrop-blur-lg border-b border-[#1e2633]" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo-fnx.png" alt="FinalX" width={40} height={40} className="w-15 h-15" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="text-[#9CA3AF] hover:text-[#FFC533] transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="#rifa"
              className="px-5 py-2.5 bg-[#18C37D] text-[#05130C] rounded-xl font-semibold hover:bg-[#18C37D]/90 transition-all neon-border-success"
            >
              Participar en el Sorteo
            </Link>
            <Link
              href="https://nodes.finalx.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-[#F5A623] to-[#FFC533] text-[#1f1402] rounded-xl font-semibold hover:opacity-90 transition-all glow-gold"
            >
              Comprar Nodo
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-[#F5F7FA] p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-[#1e2633] pt-4">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="text-[#9CA3AF] hover:text-[#FFC533] transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="#rifa"
                className="px-5 py-2.5 bg-[#18C37D] text-[#05130C] rounded-xl font-semibold text-center neon-border-success"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Participar en el Sorteo
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
