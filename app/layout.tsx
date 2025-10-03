import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FinalX — Streaming que paga y conecta",
  description:
    "Tu tiempo online ahora vale FNX. Participa en rifas, gana con streaming y entra al futuro de los nodos blockchain.",
  openGraph: {
    title: "FinalX — Streaming que paga y conecta",
    description: "Participa en la rifa del iPhone 17 + gana FNX viendo streamings.",
    url: "https://finalx.app",
    siteName: "FinalX",
    images: [
      {
        // Usa URL ABSOLUTA para evitar errores
        url: "https://finalx.app/og-finalx.png",
        width: 1200,
        height: 630,
        alt: "FinalX - Streaming que paga",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@FinalXapp",
    creator: "@FinalXapp",
    title: "FinalX — Streaming que paga y conecta",
    description:
      "Streaming, rifas y nodos: gana FNX mientras disfrutas contenido.",
    images: ["https://finalx.app/og-finalx.png"], // también absoluta
  },
  keywords: [
    "FinalX",
    "streaming que paga",
    "nodos FNX",
    "rifas blockchain",
    "Web3 Latinoamérica",
    "crypto streaming",
    "ganar tokens viendo videos",
  ],
  authors: [{ name: "FinalX Web3 Labs" }],
  generator: "FinalX Web3 Labs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
