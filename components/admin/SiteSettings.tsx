"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Save,
  Upload,
  Palette,
  Globe,
  Bell,
  Shield,
  Search,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  CheckCircle,
  AlertTriangle,
  Monitor,
} from "lucide-react"

export default function SiteSettings() {
  const [settings, setSettings] = useState({
    // General Settings
    siteName: "Alejandro Caraballo",
    siteDescription: "Tu destino para equipos de pesca y caza de alta calidad",
    siteKeywords: "pesca, caza, equipos, aventura, naturaleza, comunidad",
    contactEmail: "info@alejandrocaraballo.com",
    contactPhone: "+34 123 456 789",
    address: "Madrid, España",

    // Social Media
    facebookUrl: "https://facebook.com/alejandrocaraballo",
    instagramUrl: "https://instagram.com/alejandrocaraballo",
    twitterUrl: "https://twitter.com/alejandrocaraballo",
    youtubeUrl: "https://youtube.com/alejandrocaraballo",

    // Appearance
    primaryColor: "#16a34a",
    secondaryColor: "#1e40af",
    accentColor: "#f59e0b",
    logoUrl: "",
    faviconUrl: "",
    bannerUrl: "",

    // Features
    maintenanceMode: false,
    allowRegistration: true,
    enableComments: true,
    enableReviews: true,
    enableWishlist: true,
    enableNewsletter: true,

    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adminNotifications: true,

    // SEO
    metaTitle: "Alejandro Caraballo - Pesca y Caza Profesional",
    metaDescription: "Descubre los mejores equipos de pesca y caza. Únete a nuestra comunidad de aventureros.",
    googleAnalyticsId: "",
    facebookPixelId: "",

    // E-commerce
    currency: "USD",
    taxRate: 21,
    shippingCost: 5.99,
    freeShippingThreshold: 50,
    enablePaypal: true,
    enableStripe: true,
    enableBankTransfer: false,
  })

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [activePreview, setActivePreview] = useState<"desktop" | "mobile">("desktop")

  const handleSave = async () => {
    setSaveStatus("saving")

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSaveStatus("saved")

      // Reset status after 3 seconds
      setTimeout(() => setSaveStatus("idle"), 3000)

      console.log("Settings saved:", settings)
    } catch (error) {
      setSaveStatus("error")
      setTimeout(() => setSaveStatus("idle"), 3000)
    }
  }

  const handleImageUpload = (field: string) => {
    // Simulate image upload
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        // In a real app, upload to your storage service
        const fakeUrl = `/uploads/${file.name}`
        setSettings((prev) => ({ ...prev, [field]: fakeUrl }))
      }
    }
    input.click()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Configuración del Sitio</h2>
          <p className="text-gray-600">Personaliza todos los aspectos de tu sitio web</p>
        </div>
        <div className="flex items-center space-x-3">
          {saveStatus === "saved" && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Guardado
            </Badge>
          )}
          {saveStatus === "error" && (
            <Badge className="bg-red-100 text-red-800 border-red-200">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Error
            </Badge>
          )}
          <Button onClick={handleSave} disabled={saveStatus === "saving"} className="flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>{saveStatus === "saving" ? "Guardando..." : "Guardar Cambios"}</span>
          </Button>
        </div>
      </div>

      {/* Save Status Alert */}
      {saveStatus === "saved" && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            ¡Configuración guardada exitosamente! Los cambios se aplicarán en unos minutos.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Apariencia</span>
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Funciones</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notificaciones</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center space-x-2">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">SEO</span>
          </TabsTrigger>
          <TabsTrigger value="ecommerce" className="flex items-center space-x-2">
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline">E-commerce</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nombre del Sitio</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    placeholder="Nombre de tu sitio web"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Descripción</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    rows={3}
                    placeholder="Describe tu sitio web"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteKeywords">Palabras Clave</Label>
                  <Input
                    id="siteKeywords"
                    value={settings.siteKeywords}
                    onChange={(e) => setSettings({ ...settings, siteKeywords: e.target.value })}
                    placeholder="pesca, caza, equipos, aventura"
                  />
                  <p className="text-xs text-gray-500">Separadas por comas</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Información de Contacto</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email de Contacto</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      className="pl-10"
                      placeholder="info@tudominio.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="contactPhone"
                      value={settings.contactPhone}
                      onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                      className="pl-10"
                      placeholder="+34 123 456 789"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="address"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                      className="pl-10"
                      placeholder="Ciudad, País"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>Redes Sociales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebookUrl">Facebook</Label>
                  <div className="relative">
                    <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600 h-4 w-4" />
                    <Input
                      id="facebookUrl"
                      value={settings.facebookUrl}
                      onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                      className="pl-10"
                      placeholder="https://facebook.com/tupagina"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagramUrl">Instagram</Label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-600 h-4 w-4" />
                    <Input
                      id="instagramUrl"
                      value={settings.instagramUrl}
                      onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                      className="pl-10"
                      placeholder="https://instagram.com/tuperfil"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitterUrl">Twitter</Label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
                    <Input
                      id="twitterUrl"
                      value={settings.twitterUrl}
                      onChange={(e) => setSettings({ ...settings, twitterUrl: e.target.value })}
                      className="pl-10"
                      placeholder="https://twitter.com/tuperfil"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtubeUrl">YouTube</Label>
                  <div className="relative">
                    <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-600 h-4 w-4" />
                    <Input
                      id="youtubeUrl"
                      value={settings.youtubeUrl}
                      onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                      className="pl-10"
                      placeholder="https://youtube.com/tucanal"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Colores del Tema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Color Primario</Label>
                    <div className="flex items-center space-x-3">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={settings.primaryColor}
                        onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                        className="flex-1"
                        placeholder="#16a34a"
                      />
                      <div
                        className="w-10 h-10 rounded border-2 border-gray-200"
                        style={{ backgroundColor: settings.primaryColor }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Color Secundario</Label>
                    <div className="flex items-center space-x-3">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={settings.secondaryColor}
                        onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={settings.secondaryColor}
                        onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                        className="flex-1"
                        placeholder="#1e40af"
                      />
                      <div
                        className="w-10 h-10 rounded border-2 border-gray-200"
                        style={{ backgroundColor: settings.secondaryColor }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Color de Acento</Label>
                    <div className="flex items-center space-x-3">
                      <Input
                        id="accentColor"
                        type="color"
                        value={settings.accentColor}
                        onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                        className="w-16 h-10 p-1 border rounded"
                      />
                      <Input
                        value={settings.accentColor}
                        onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                        className="flex-1"
                        placeholder="#f59e0b"
                      />
                      <div
                        className="w-10 h-10 rounded border-2 border-gray-200"
                        style={{ backgroundColor: settings.accentColor }}
                      />
                    </div>
                  </div>
                </div>

                {/* Color Preview */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-3">Vista Previa</h4>
                  <div className="space-y-2">
                    <Button style={{ backgroundColor: settings.primaryColor }} className="text-white">
                      Botón Primario
                    </Button>
                    <Button
                      variant="outline"
                      style={{
                        borderColor: settings.secondaryColor,
                        color: settings.secondaryColor,
                      }}
                    >
                      Botón Secundario
                    </Button>
                    <div
                      className="inline-block px-3 py-1 rounded text-white text-sm"
                      style={{ backgroundColor: settings.accentColor }}
                    >
                      Elemento de Acento
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Imágenes y Logos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo */}
                <div className="space-y-3">
                  <Label>Logo Principal</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {settings.logoUrl ? (
                      <div className="space-y-3">
                        <div className="w-20 h-20 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🏷️</span>
                        </div>
                        <p className="text-sm text-gray-600">Logo cargado: {settings.logoUrl}</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">
                          Arrastra tu logo aquí o haz clic para seleccionar
                        </p>
                        <p className="text-xs text-gray-500">Recomendado: 200x60 px, PNG o SVG</p>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 bg-transparent"
                      onClick={() => handleImageUpload("logoUrl")}
                    >
                      {settings.logoUrl ? "Cambiar Logo" : "Seleccionar Logo"}
                    </Button>
                  </div>
                </div>

                {/* Favicon */}
                <div className="space-y-3">
                  <Label>Favicon</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    {settings.faviconUrl ? (
                      <div className="space-y-2">
                        <div className="w-8 h-8 mx-auto bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-sm">🔖</span>
                        </div>
                        <p className="text-xs text-gray-600">Favicon cargado</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                        <p className="text-xs text-gray-600">Favicon (32x32 px)</p>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 bg-transparent"
                      onClick={() => handleImageUpload("faviconUrl")}
                    >
                      {settings.faviconUrl ? "Cambiar" : "Subir"}
                    </Button>
                  </div>
                </div>

                {/* Banner */}
                <div className="space-y-3">
                  <Label>Banner Principal</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {settings.bannerUrl ? (
                      <div className="space-y-3">
                        <div className="w-full h-20 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🖼️</span>
                        </div>
                        <p className="text-sm text-gray-600">Banner cargado</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Banner de la Página Principal</p>
                        <p className="text-xs text-gray-500">Recomendado: 1920x600 px</p>
                      </>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 bg-transparent"
                      onClick={() => handleImageUpload("bannerUrl")}
                    >
                      {settings.bannerUrl ? "Cambiar Banner" : "Subir Banner"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Features Settings */}
        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Funciones del Sitio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Permitir Registro</Label>
                    <p className="text-sm text-gray-600">
                      Permitir que nuevos usuarios se registren
                    </p>
                  </div>
                  <Switch
                    checked={settings.allowRegistration}
                    onCheckedChange={(checked) => setSettings({ ...settings, allowRegistration: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Comentarios</Label>
                    <p className="text-sm text-gray-600">
                      Habilitar comentarios en productos y posts
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableComments}
                    onCheckedChange={(checked) => setSettings({ ...settings, enableComments: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Reseñas de Productos</Label>
                    <p className="text-sm text-gray-600">Permitir reseñas y valoraciones</p>
                  </div>
                  <Switch
                    checked={settings.enableReviews}
                    onCheckedChange={(checked) => setSettings({ ...settings, enableReviews: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Lista de Deseos</Label>
                    <p className="text-sm text-gray-600">Permitir guardar productos favoritos</p>
                  </div>
                  <Switch
                    checked={settings.enableWishlist}
                    onCheckedChange={(checked) => setSettings({ ...settings, enableWishlist: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Newsletter</Label>
                    <p className="text-sm text-gray-600">Habilitar suscripción al boletín</p>
                  </div>
                  <Switch
                    checked={settings.enableNewsletter}
                    onCheckedChange={(checked) => setSettings({ ...settings, enableNewsletter: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seguridad y Mantenimiento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Modo Mantenimiento</Label>
                    <p className="text-sm text-gray-600">Mostrar página de mantenimiento</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                  />
                </div>

                {settings.maintenanceMode && (
                  <Alert className="bg-orange-50 border-orange-200">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-orange-800">
                      ⚠️ El modo mantenimiento está activado. Los visitantes verán una página de mantenimiento.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-4">
                  <Label>Cambiar Contraseña de Administrador</Label>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Contraseña actual" />
                    <Input type="password" placeholder="Nueva contraseña" />
                    <Input type="password" placeholder="Confirmar nueva contraseña" />
                    <Button variant="outline" size="sm">
                      Actualizar Contraseña
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Notificaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <h4 className="font-medium">Notificaciones para Administradores</h4>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Email</Label>
                      <p className="text-sm text-gray-600">Nuevos pedidos, mensajes y alertas</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>SMS</Label>
                      <p className="text-sm text-gray-600">Alertas importantes por SMS</p>
                    </div>
                    <Switch
                      checked={settings.smsNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Push</Label>
                      <p className="text-sm text-gray-600">Notificaciones push del navegador</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="font-medium">Configuración de Frecuencia</h4>

                  <div className="space-y-3">
                    <Label>Resumen de Ventas</Label>
                    <select className="w-full p-2 border rounded-md bg-background">
                      <option>Diario</option>
                      <option>Semanal</option>
                      <option>Mensual</option>
                      <option>Nunca</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <Label>Reportes de Actividad</Label>
                    <select className="w-full p-2 border rounded-md bg-background">
                      <option>Semanal</option>
                      <option>Mensual</option>
                      <option>Nunca</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <Label>Alertas de Stock Bajo</Label>
                    <select className="w-full p-2 border rounded-md bg-background">
                      <option>Inmediato</option>
                      <option>Diario</option>
                      <option>Nunca</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Meta Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Título Meta</Label>
                  <Input
                    id="metaTitle"
                    value={settings.metaTitle}
                    onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                    placeholder="Título que aparece en Google"
                  />
                  <p className="text-xs text-gray-500">{settings.metaTitle.length}/60 caracteres</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Descripción Meta</Label>
                  <Textarea
                    id="metaDescription"
                    value={settings.metaDescription}
                    onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                    rows={3}
                    placeholder="Descripción que aparece en los resultados de búsqueda"
                  />
                  <p className="text-xs text-gray-500">{settings.metaDescription.length}/160 caracteres</p>
                </div>

                {/* SEO Preview */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-3">Vista Previa en Google</h4>
                  <div className="space-y-1">
                    <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                      {settings.metaTitle || "Título de tu página"}
                    </div>
                    <div className="text-green-700 text-sm">alejandrocaraballo.com</div>
                    <div className="text-gray-600 text-sm">
                      {settings.metaDescription ||
                        "Descripción de tu página que aparecerá en los resultados de búsqueda..."}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analytics y Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                  <Input
                    id="googleAnalyticsId"
                    value={settings.googleAnalyticsId}
                    onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
                    placeholder="G-XXXXXXXXXX"
                  />
                  <p className="text-xs text-gray-500">Obtén tu ID en Google Analytics</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                  <Input
                    id="facebookPixelId"
                    value={settings.facebookPixelId}
                    onChange={(e) => setSettings({ ...settings, facebookPixelId: e.target.value })}
                    placeholder="123456789012345"
                  />
                  <p className="text-xs text-gray-500">Para tracking de Facebook Ads</p>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2 text-blue-800">💡 Consejos SEO</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Usa títulos descriptivos y únicos</li>
                    <li>• Mantén las descripciones entre 120-160 caracteres</li>
                    <li>• Incluye palabras clave relevantes</li>
                    <li>• Actualiza el contenido regularmente</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* E-commerce Settings */}
        <TabsContent value="ecommerce" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Tienda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Moneda</Label>
                    <select
                      id="currency"
                      value={settings.currency}
                      onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                      className="w-full p-2 border rounded-md bg-background"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxRate">IVA (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={settings.taxRate}
                      onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
                      placeholder="21"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shippingCost">Coste de Envío</Label>
                    <Input
                      id="shippingCost"
                      type="number"
                      step="0.01"
                      value={settings.shippingCost}
                      onChange={(e) => setSettings({ ...settings, shippingCost: Number(e.target.value) })}
                      placeholder="5.99"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="freeShippingThreshold">Envío Gratis Desde</Label>
                    <Input
                      id="freeShippingThreshold"
                      type="number"
                      value={settings.freeShippingThreshold}
                      onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                      placeholder="50"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium mb-2 text-green-800">Configuración Actual</h4>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>• Moneda: {settings.currency}</p>
                    <p>• IVA: {settings.taxRate}%</p>
                    <p>• Envío: ${settings.shippingCost}</p>
                    <p>• Envío gratis desde: ${settings.freeShippingThreshold}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métodos de Pago</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">PP</span>
                    </div>
                    <div>
                      <Label>PayPal</Label>
                      <p className="text-sm text-gray-600">Pagos seguros con PayPal</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.enablePaypal}
                    onCheckedChange={(checked) => setSettings({ ...settings, enablePaypal: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-6 bg-purple-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">S</span>
                    </div>
                    <div>
                      <Label>Stripe</Label>
                      <p className="text-sm text-gray-600">Tarjetas de crédito y débito</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.enableStripe}
                    onCheckedChange={(checked) => setSettings({ ...settings, enableStripe: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-6 bg-gray-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">B</span>
                    </div>
                    <div>
                      <Label>Transferencia Bancaria</Label>
                      <p className="text-sm text-gray-600">Pago por transferencia</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.enableBankTransfer}
                    onCheckedChange={(checked) => setSettings({ ...settings, enableBankTransfer: checked })}
                  />
                </div>

                {(settings.enablePaypal || settings.enableStripe || settings.enableBankTransfer) && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium mb-2 text-blue-800">Métodos Activos</h4>
                    <div className="flex flex-wrap gap-2">
                      {settings.enablePaypal && <Badge className="bg-blue-100 text-blue-800">PayPal</Badge>}
                      {settings.enableStripe && <Badge className="bg-purple-100 text-purple-800">Stripe</Badge>}
                      {settings.enableBankTransfer && (
                        <Badge className="bg-gray-100 text-gray-800">Transferencia</Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}