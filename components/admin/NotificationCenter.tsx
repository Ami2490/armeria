"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, X, Check, Trash2, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"

interface Notification {
  id: string
  type: "success" | "warning" | "error" | "info"
  title: string
  message: string
  timestamp: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Pedido Confirmado",
    message: "Tu pedido #12345 ha sido confirmado y está siendo procesado",
    timestamp: "5m",
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Stock Bajo",
    message: "El producto 'Rifle Caza Pro' tiene pocas unidades disponibles",
    timestamp: "1h",
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Nueva Oferta",
    message: "50% de descuento en equipos de pesca este fin de semana",
    timestamp: "2h",
    read: true,
  },
  {
    id: "4",
    type: "error",
    title: "Pago Rechazado",
    message: "El pago del pedido #12344 ha sido rechazado",
    timestamp: "1d",
    read: false,
  },
]

interface NotificationCenterProps {
  onClose?: () => void
  onClearCount?: () => void
}

export default function NotificationCenter({ onClose, onClearCount }: NotificationCenterProps) {
  const isControlled = !!onClose
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const isOpen = isControlled ? true : internalIsOpen

  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleClose = () => {
    if (onClose) {
      onClose()
    } else {
      setInternalIsOpen(false)
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    onClearCount?.()
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
    onClearCount?.()
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-500 bg-green-50"
      case "warning":
        return "border-l-yellow-500 bg-yellow-50"
      case "error":
        return "border-l-red-500 bg-red-50"
      case "info":
        return "border-l-blue-500 bg-blue-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const panel = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-40" onClick={handleClose} />

          {/* Notification Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 top-12 z-50 w-80 sm:w-96"
          >
            <Card className="bg-white shadow-2xl border border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">Notificaciones</h3>
                  <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {notifications.length > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{unreadCount} sin leer</span>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        Marcar todas
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAll}
                        className="text-xs text-red-600 hover:text-red-700"
                      >
                        Limpiar
                      </Button>
                    </div>
                  </div>
                )}
              </CardHeader>

              <CardContent className="p-0">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No tienes notificaciones</p>
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`border-l-4 p-4 border-b border-gray-100 last:border-b-0 ${getTypeColor(
                          notification.type,
                        )} ${!notification.read ? "bg-opacity-100" : "bg-opacity-50"}`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            {getIcon(notification.type)}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <h4 className="text-sm font-medium text-gray-800">{notification.title}</h4>
                                {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <span className="text-xs text-gray-500 mt-1">{notification.timestamp}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 ml-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => markAsRead(notification.id)}
                                className="h-6 w-6 text-green-600 hover:text-green-700"
                              >
                                <Check className="h-3 w-3" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteNotification(notification.id)}
                              className="h-6 w-6 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )

  if (isControlled) {
    return panel
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setInternalIsOpen(!internalIsOpen)}
        className="text-contrast hover:text-orange-500 relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {panel}
    </div>
  )
}
