import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/Providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Alejandro Caraballo - Equipos de Caza y Pesca",
  description: "Los mejores equipos de caza y pesca con más de 20 años de experiencia",
  keywords: "caza, pesca, equipos, rifles, cañas, señuelos, outdoor, aventura",
  authors: [{ name: "Alejandro Caraballo" }],
  openGraph: {
    title: "Alejandro Caraballo - Equipos de Caza y Pesca",
    description: "Los mejores equipos de caza y pesca con más de 20 años de experiencia",
    type: "website",
    locale: "es_ES",
  },
  generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
