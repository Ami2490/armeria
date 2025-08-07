"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Target, Fish, Users, Award, ArrowDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Hero3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Image with Ken Burns Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://wallpapers.com/images/hd/silhouette-sunset-elk-hunting-a3uul6wt8f7lyilx.jpg"
          alt="Hunting background"
          fill
          className="object-cover w-full h-full ken-burns-slow"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 3D Logo */}
        <motion.div
          className="relative mb-8 perspective-1000"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 1.5, bounce: 0.4 }}
        >
          <div
            className="relative w-48 h-48 mx-auto transform-3d"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`,
            }}
          >
            {/* Main Logo Circle */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-500 to-green-700 rounded-full shadow-2xl"
              animate={{
                boxShadow: [
                  "0 25px 50px -12px rgba(34, 197, 94, 0.25)",
                  "0 25px 50px -12px rgba(34, 197, 94, 0.5)",
                  "0 25px 50px -12px rgba(34, 197, 94, 0.25)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              style={{ transform: "translateZ(20px)" }}
            >
              <div className="absolute inset-4 bg-gradient-to-br from-white/20 to-transparent rounded-full" />
            </motion.div>

            {/* Crosshair Center */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              style={{ transform: "translateZ(40px)" }}
            >
              <div className="relative">
                <div className="w-16 h-0.5 bg-orange-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                <div className="w-0.5 h-16 bg-orange-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                <motion.div
                  className="w-4 h-4 border-2 border-orange-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </motion.div>

            {/* AC Text */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white"
              style={{ transform: "translateZ(60px)" }}
              animate={{
                textShadow: [
                  "0 0 20px rgba(255, 255, 255, 0.5)",
                  "0 0 30px rgba(255, 255, 255, 0.8)",
                  "0 0 20px rgba(255, 255, 255, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              AC
            </motion.div>
          </div>
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">Alejandro Caraballo</h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Tu destino para equipos de <span className="text-green-400 font-semibold">caza</span> y{" "}
            <span className="text-blue-400 font-semibold">pesca</span> de alta calidad.
            <br />
            Más de 20 años de experiencia en aventuras al aire libre.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link href="/tienda">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              🛒 Explorar Tienda
            </Button>
          </Link>
          <Link href="/comunidad">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all bg-transparent"
            >
              👥 Únete a la Comunidad
            </Button>
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <p className="text-sm text-gray-400 mb-2">Descubre más</p>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
            <ArrowDown className="h-6 w-6 text-gray-300" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}