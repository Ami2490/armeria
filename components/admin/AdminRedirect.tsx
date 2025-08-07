"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Loader2 } from "lucide-react"

export default function AdminRedirect() {
  const { user } = useAuth()
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    if (user?.role === "admin") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            router.push("/admin")
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [user, router])

  if (user?.role !== "admin") {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">¡Inicio de sesión exitoso!</h3>
          <p className="text-gray-600 mb-4">Redirigiendo al panel de administración...</p>
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Redirigiendo en {countdown} segundos</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
