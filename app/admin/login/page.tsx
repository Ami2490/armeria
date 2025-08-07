"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/hooks/useAuth"
import { Shield, Eye, EyeOff, CheckCircle, Copy } from "lucide-react"
import Link from "next/link"
import AdminRedirect from "@/components/admin/AdminRedirect"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const { login, user } = useAuth()
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)

  // Auto-fill demo credentials for easier testing
  const fillDemoCredentials = () => {
    setEmail("admin@alejandrocaraballo.com")
    setPassword("admin123")
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  // Redirect if already logged in as admin
  useEffect(() => {
    // Check if user is already logged in and redirect immediately
    if (user?.role === "admin") {
      console.log("User already logged in as admin, redirecting...")
      window.location.href = "/admin"
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      console.log("Attempting login with:", { email, password })
      const success = await login(email, password)

      if (success) {
        console.log("Login successful, redirecting...")
        setError("")
        setIsRedirecting(true)

        // Show success message briefly before redirect
        setTimeout(() => {
          window.location.href = "/admin"
        }, 1000)
      } else {
        setError("Credenciales incorrectas. Usa las credenciales de demo proporcionadas.")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Error al iniciar sesión. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Panel de Administración</h1>
          <p className="text-gray-400">Acceso restringido solo para administradores</p>
        </div>

        {/* Login Card */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-center">Iniciar Sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="bg-red-500/20 border-red-500/50 text-red-100">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {showSuccess && (
                <Alert className="bg-green-500/20 border-green-500/50 text-green-100">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>Credenciales de demo cargadas correctamente</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email de Administrador
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@alejandrocaraballo.com"
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                disabled={isLoading || isRedirecting}
              >
                {isRedirecting ? "Redirigiendo al panel..." : isLoading ? "Iniciando sesión..." : "Acceder al Panel"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">Credenciales de Demo:</h3>
                <Button
                  onClick={fillDemoCredentials}
                  size="sm"
                  variant="outline"
                  className="text-xs bg-transparent border-blue-400 text-blue-300 hover:bg-blue-500/20"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Auto-rellenar
                </Button>
              </div>
              <div className="text-sm text-gray-300 space-y-1">
                <p>
                  <strong>Email:</strong> admin@alejandrocaraballo.com
                </p>
                <p>
                  <strong>Contraseña:</strong> admin123
                </p>
              </div>
              <div className="mt-2 text-xs text-blue-300">
                💡 Haz clic en "Auto-rellenar" para cargar las credenciales automáticamente
              </div>
            </div>

            {/* Back to Home */}
            <div className="mt-6 text-center">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors text-sm underline">
                ← Volver al sitio principal
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Este es un área restringida. Todos los accesos son monitoreados.</p>
          <p className="mt-1">Versión Demo - Datos de prueba únicamente</p>
        </div>

        {/* Redirect overlay when login is successful */}
        {user?.role === "admin" && <AdminRedirect />}
      </div>
    </div>
  )
}
