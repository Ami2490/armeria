"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AdminStats from "./AdminStats"
import ProductManagement from "./ProductManagement"
import UserManagement from "./UserManagement"
import OrderManagement from "./OrderManagement"
import SiteSettings from "./SiteSettings"
import NotificationCenter from "./NotificationCenter"
import { BarChart3, Package, Users, ShoppingCart, Settings, TrendingUp, LogOut, Home, Bell } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showWelcome, setShowWelcome] = useState(true)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const { user, logout } = useAuth()

  useEffect(() => {
    // Hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600 mt-2">
                Bienvenido, {user?.name || "Administrador"}. Gestiona tu tienda y comunidad desde aquí.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative bg-white border-gray-300"
                >
                  <Bell className="h-4 w-4 text-gray-700" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </Button>
                {showNotifications && (
                  <NotificationCenter
                    onClose={() => setShowNotifications(false)}
                    onClearCount={() => setNotificationCount(0)}
                  />
                )}
              </div>

              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white border-gray-300 text-gray-700"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Ir al Sitio
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700 bg-white border-red-300 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>

          {/* Welcome Message */}
          {showWelcome && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800">¡Acceso exitoso!</h3>
                    <p className="text-sm text-green-600">
                      Has iniciado sesión correctamente en el panel de administración.
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowWelcome(false)}
                  className="text-green-600 hover:text-green-700 hover:bg-green-100"
                >
                  ✕
                </Button>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 font-medium">Ventas Hoy</p>
                    <p className="text-2xl font-bold text-white">€2,847</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-100" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 font-medium">Productos</p>
                    <p className="text-2xl font-bold text-white">234</p>
                  </div>
                  <Package className="h-8 w-8 text-green-100" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 font-medium">Usuarios</p>
                    <p className="text-2xl font-bold text-white">2,847</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-100" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 font-medium">Pedidos</p>
                    <p className="text-2xl font-bold text-white">156</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-orange-100" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-gray-200">
            <TabsTrigger
              value="dashboard"
              className="flex items-center space-x-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="flex items-center space-x-2 data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Productos</span>
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="flex items-center space-x-2 data-[state=active]:bg-purple-500 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Usuarios</span>
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="flex items-center space-x-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Pedidos</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center space-x-2 data-[state=active]:bg-gray-500 data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Configuración</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <AdminStats />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-900">
                    <TrendingUp className="h-5 w-5" />
                    <span>Productos Más Vendidos</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Caña de Pescar Profesional X1", sales: 45, revenue: 13499.55 },
                      { name: "Kit de Señuelos Premium", sales: 32, revenue: 2879.68 },
                      { name: "Mochila Táctica Outdoor", sales: 28, revenue: 4479.72 },
                    ].map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.sales} ventas</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">
                            €{product.revenue.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-900">
                    <Users className="h-5 w-5" />
                    <span>Actividad de la Comunidad</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Nuevos posts hoy</span>
                      <Badge className="bg-green-100 text-green-800">12</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Comentarios</span>
                      <Badge className="bg-blue-100 text-blue-800">48</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Usuarios activos</span>
                      <Badge className="bg-purple-100 text-purple-800">
                        156
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Nuevos miembros</span>
                      <Badge className="bg-orange-100 text-orange-800">
                        8
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>

          <TabsContent value="settings">
            <SiteSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}