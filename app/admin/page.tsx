"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import AdminDashboard from "@/components/admin/AdminDashboard"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Shield } from "lucide-react"

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Wait for auth to load
    if (!loading) {
      if (!user || user.role !== "admin") {
        console.log("No admin user found, redirecting to login")
        router.push("/admin/login")
      } else {
        console.log("Admin user verified:", user)
        setIsChecking(false)
      }
    }
  }, [user, loading, router])

  // Show loading while checking auth
  if (loading || isChecking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Verificando acceso...</h3>
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm text-gray-600">Cargando panel de administración</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Show dashboard if user is admin
  if (user && user.role === "admin") {
    return <AdminDashboard />
  }

  // Fallback - shouldn't reach here
  return null
}