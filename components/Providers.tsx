"use client"

import type React from "react"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { AuthProvider } from "@/components/providers/AuthProvider"
import { CartProvider } from "@/components/providers/CartProvider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import CursorHandler from "./effects/CursorHandler"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <CartProvider>
          <CursorHandler />
          <div className="min-h-screen flex flex-col bg-contrast">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
