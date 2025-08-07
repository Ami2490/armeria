"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { AuthProvider } from "@/components/providers/AuthProvider"
import { CartProvider } from "@/components/providers/CartProvider"
import { ErrorBoundary } from "@/components/ui/ErrorBoundary"
import { Toaster } from "@/components/ui/toaster"
import PromotionalPopup from "@/components/ui/PromotionalPopup"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showPromo, setShowPromo] = useState(false)
  const [promoType, setPromoType] = useState<"offer" | "countdown" | "announcement" | "newsletter">("offer")

  useEffect(() => {
    // Show promotional popup after 3 seconds
    const timer = setTimeout(() => {
      // Randomly select a promo type
      const types: ("offer" | "countdown" | "announcement" | "newsletter")[] = [
        "offer",
        "countdown",
        "announcement",
        "newsletter",
      ]
      const randomType = types[Math.floor(Math.random() * types.length)]
      setPromoType(randomType)
      setShowPromo(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <title>Alejandro Caraballo - Pesca y Caza Profesional</title>
        <meta
          name="description"
          content="Tu destino para equipos de pesca y caza de alta calidad. Únete a nuestra comunidad de aventureros."
        />
        <meta name="keywords" content="pesca, caza, equipos, aventura, naturaleza, comunidad" />
        <meta name="author" content="Alejandro Caraballo" />
        <meta property="og:title" content="Alejandro Caraballo - Pesca y Caza Profesional" />
        <meta property="og:description" content="Tu destino para equipos de pesca y caza de alta calidad." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_ES" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <AuthProvider>
              <CartProvider>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <Toaster />
                <PromotionalPopup show={showPromo} onClose={() => setShowPromo(false)} type={promoType} />
              </CartProvider>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
