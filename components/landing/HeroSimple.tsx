"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Fish, Target, Users, Star } from "lucide-react"
import Image from "next/image"

export default function HeroSimple() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-100 via-blue-50 to-green-200 dark:from-green-900 dark:via-blue-900 dark:to-green-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            {/* Logo/Brand */}
            <div className="space-y-4">
              <motion.div
                className="inline-block mb-6"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/zona-clic-admin.firebasestorage.app/o/AC%20TIEMPO%20LIBRE.png?alt=media&token=be7e985b-1cae-4848-bfe4-95c328b4f069"
                  alt="Logo"
                  width={80}
                  height={80}
                />
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                ALEJANDRO
                <br />
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  CARABALLO
                </span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-4xl font-light text-gray-700 dark:text-gray-300">
                Tu aventura comienza aquí
              </h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Descubre los mejores equipos de pesca y caza. Únete a nuestra comunidad de aventureros.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all duration-200"
                >
                  <Link href="/tienda">
                    <Fish className="w-5 h-5 mr-2" />
                    Explorar Tienda
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="transform hover:scale-105 transition-all duration-200 bg-teal-600"
                >
                  <Link href="/comunidad">
                    <Users className="w-5 h-5 mr-2" />
                    Únete a la Comunidad
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
            >
              <div className="flex flex-col items-center space-y-3 p-6 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <Fish className="w-8 h-8 text-green-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Equipos de Pesca</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Cañas, carretes y accesorios de las mejores marcas
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 p-6 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <Target className="w-8 h-8 text-blue-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Equipos de Caza</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Rifles, arcos y accesorios profesionales
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 p-6 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <Star className="w-8 h-8 text-yellow-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Comunidad</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Comparte experiencias con otros aventureros
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-green-500/10 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-blue-500/10 rounded-full"
          animate={{
            y: [0, 15, 0],
            x: [0, -8, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-12 h-12 bg-green-600/10 rounded-full"
          animate={{
            y: [0, -10, 0],
            x: [0, 5, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}