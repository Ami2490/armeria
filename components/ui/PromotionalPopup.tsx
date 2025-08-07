"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Target, Gift, Clock, Bell } from "lucide-react"
import { useRouter } from "next/navigation"

interface PromotionalPopupProps {
  show: boolean
  onClose: () => void
  type: "offer" | "countdown" | "announcement" | "newsletter"
}

export default function PromotionalPopup({ show, onClose, type }: PromotionalPopupProps) {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  })

  useEffect(() => {
    if (type === "countdown" && show) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 }
          } else if (prev.minutes > 0) {
            return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
          } else if (prev.hours > 0) {
            return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
          }
          return prev
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [type, show])

  const renderContent = () => {
    switch (type) {
      case "offer":
        return (
          <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Gift className="h-6 w-6" />
                <h2 className="text-2xl font-bold">¡Oferta Especial!</h2>
              </div>
              <p className="text-green-100">Solo por tiempo limitado</p>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <span className="text-4xl font-bold text-green-600">50%</span>
                <p className="text-gray-700 dark:text-gray-300 mt-2">de descuento en equipos de pesca seleccionados</p>
              </div>
              <div className="space-y-3">
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
                  onClick={() => {
                    router.push("/tienda?categoria=pesca")
                    onClose()
                  }}
                >
                  🎣 Ver Ofertas
                </Button>
                <Button variant="ghost" onClick={onClose} className="w-full text-gray-600 dark:text-gray-400">
                  Cerrar
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case "countdown":
        return (
          <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="h-6 w-6" />
                <h2 className="text-2xl font-bold">¡Última Oportunidad!</h2>
              </div>
              <p className="text-orange-100">La oferta termina pronto</p>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <div className="mb-6">
                <div className="flex justify-center space-x-4 mb-4">
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 min-w-[60px]">
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">
                      {timeLeft.hours.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">HORAS</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 min-w-[60px]">
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">
                      {timeLeft.minutes.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">MIN</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 min-w-[60px]">
                    <div className="text-2xl font-bold text-gray-800 dark:text-white">
                      {timeLeft.seconds.toString().padStart(2, "0")}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">SEG</div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">30% de descuento en rifles de caza</p>
              </div>
              <div className="space-y-3">
                <Button
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3"
                  onClick={() => {
                    router.push("/tienda?categoria=rifles")
                    onClose()
                  }}
                >
                  🎯 Comprar Ahora
                </Button>
                <Button variant="ghost" onClick={onClose} className="w-full text-gray-600 dark:text-gray-400">
                  Cerrar
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case "announcement":
        return (
          <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Bell className="h-6 w-6" />
                <h2 className="text-2xl font-bold">¡Novedad!</h2>
              </div>
              <p className="text-blue-100">Nueva colección disponible</p>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Equipos de Caza Premium</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Descubre nuestra nueva línea de equipos profesionales para cazadores expertos
                </p>
              </div>
              <div className="space-y-3">
                <Button
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3"
                  onClick={() => {
                    router.push("/tienda?nuevo=true")
                    onClose()
                  }}
                >
                  🏹 Ver Novedades
                </Button>
                <Button variant="ghost" onClick={onClose} className="w-full text-gray-600 dark:text-gray-400">
                  Cerrar
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      case "newsletter":
        return (
          <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-2xl border-0">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Target className="h-6 w-6" />
                <h2 className="text-2xl font-bold">¡Únete a Nosotros!</h2>
              </div>
              <p className="text-green-100">Recibe ofertas exclusivas</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-4 text-center">
                <p className="text-gray-700 dark:text-gray-300">
                  Suscríbete y recibe un <strong>15% de descuento</strong> en tu primera compra
                </p>
              </div>
              <div className="space-y-4">
                <Input type="email" placeholder="tu@email.com" className="w-full" />
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                  onClick={onClose}
                >
                  📧 Suscribirse
                </Button>
                <Button variant="ghost" onClick={onClose} className="w-full text-gray-600 dark:text-gray-400">
                  No, gracias
                </Button>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute -top-2 -right-2 z-10 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
            {renderContent()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}