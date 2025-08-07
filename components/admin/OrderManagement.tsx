"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Eye,
  Search,
  Download,
  DollarSign,
  ShoppingCart,
  Clock,
  CheckCircle,
  X,
  Save,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Plus,
  User,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  items: OrderItem[]
  total: number
  subtotal: number
  tax: number
  shipping: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  paymentMethod: string
  trackingNumber?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export default function OrderManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState("all")
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showNewOrderModal, setShowNewOrderModal] = useState(false)
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null)
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)

  const [newOrder, setNewOrder] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    items: [] as OrderItem[],
    paymentMethod: "Tarjeta de Crédito",
    notes: "",
  })

  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customer: {
        name: "Carlos Mendoza",
        email: "carlos@example.com",
        phone: "+34 123 456 789",
        address: "Calle Mayor 123, 28001 Madrid, España",
      },
      items: [
        {
          id: "1",
          name: "Caña de Pescar Profesional X1",
          price: 299.99,
          quantity: 1,
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
      subtotal: 299.99,
      tax: 62.99,
      shipping: 5.99,
      total: 368.97,
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: "Tarjeta de Crédito",
      notes: "Cliente solicita entrega urgente",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "ORD-002",
      customer: {
        name: "Ana García",
        email: "ana@example.com",
        phone: "+34 987 654 321",
        address: "Avenida Diagonal 456, 08008 Barcelona, España",
      },
      items: [
        {
          id: "3",
          name: "Kit de Señuelos Premium",
          price: 89.99,
          quantity: 1,
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
      subtotal: 89.99,
      tax: 18.89,
      shipping: 0,
      total: 108.88,
      status: "shipped",
      paymentStatus: "paid",
      paymentMethod: "PayPal",
      trackingNumber: "ES123456789",
      notes: "Envío gratuito por compra superior a 50€",
      createdAt: "2024-01-14T16:45:00Z",
      updatedAt: "2024-01-16T09:20:00Z",
    },
    {
      id: "ORD-003",
      customer: {
        name: "Miguel Torres",
        email: "miguel@example.com",
        phone: "+34 555 123 456",
        address: "Plaza del Ayuntamiento 789, 46002 Valencia, España",
      },
      items: [
        {
          id: "2",
          name: "Rifle de Caza Precision Pro",
          price: 1299.99,
          quantity: 1,
          image: "/placeholder.svg?height=60&width=60",
        },
      ],
      subtotal: 1299.99,
      tax: 272.99,
      shipping: 0,
      total: 1572.98,
      status: "delivered",
      paymentStatus: "paid",
      paymentMethod: "Transferencia Bancaria",
      trackingNumber: "ES987654321",
      notes: "Producto requiere verificación de licencia",
      createdAt: "2024-01-13T08:20:00Z",
      updatedAt: "2024-01-18T14:30:00Z",
    },
  ])

  const statuses = [
    { value: "all", label: "Todos los estados" },
    { value: "pending", label: "Pendientes" },
    { value: "processing", label: "Procesando" },
    { value: "shipped", label: "Enviados" },
    { value: "delivered", label: "Entregados" },
    { value: "cancelled", label: "Cancelados" },
  ]

  const paymentStatuses = [
    { value: "all", label: "Todos los pagos" },
    { value: "pending", label: "Pendientes" },
    { value: "paid", label: "Pagados" },
    { value: "failed", label: "Fallidos" },
    { value: "refunded", label: "Reembolsados" },
  ]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    const matchesPaymentStatus = selectedPaymentStatus === "all" || order.paymentStatus === selectedPaymentStatus

    return matchesSearch && matchesStatus && matchesPaymentStatus
  })

  const handleCreateOrder = () => {
    if (!newOrder.customerName || !newOrder.customerEmail || newOrder.items.length === 0) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios y añade al menos un producto",
        variant: "destructive",
      })
      return
    }

    const subtotal = newOrder.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.21
    const shipping = subtotal > 50 ? 0 : 5.99
    const total = subtotal + tax + shipping

    const order: Order = {
      id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      customer: {
        name: newOrder.customerName,
        email: newOrder.customerEmail,
        phone: newOrder.customerPhone,
        address: newOrder.customerAddress,
      },
      items: newOrder.items,
      subtotal,
      tax,
      shipping,
      total,
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: newOrder.paymentMethod,
      notes: newOrder.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setOrders([order, ...orders])
    setNewOrder({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customerAddress: "",
      items: [],
      paymentMethod: "Tarjeta de Crédito",
      notes: "",
    })
    setShowNewOrderModal(false)

    toast({
      title: "Pedido creado",
      description: `El pedido ${order.id} se ha creado correctamente`,
    })
  }

  const handleViewOrder = (order: Order) => {
    setViewingOrder(order)
    setShowOrderModal(true)
  }

  const handleEditOrder = (order: Order) => {
    setEditingOrder({ ...order })
    setShowOrderModal(true)
  }

  const handleUpdateOrder = () => {
    if (!editingOrder) return

    setOrders(
      orders.map((o) => (o.id === editingOrder.id ? { ...editingOrder, updatedAt: new Date().toISOString() } : o)),
    )
    setEditingOrder(null)
    setShowOrderModal(false)

    toast({
      title: "Pedido actualizado",
      description: `El pedido ${editingOrder.id} se ha actualizado correctamente`,
    })
  }

  const handleUpdateStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders(
      orders.map((o) => (o.id === orderId ? { ...o, status: newStatus, updatedAt: new Date().toISOString() } : o)),
    )

    toast({
      title: "Estado actualizado",
      description: `El pedido ${orderId} ahora está ${getStatusText(newStatus).toLowerCase()}`,
    })
  }

  const handleUpdatePaymentStatus = (orderId: string, newPaymentStatus: Order["paymentStatus"]) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId ? { ...o, paymentStatus: newPaymentStatus, updatedAt: new Date().toISOString() } : o,
      ),
    )

    toast({
      title: "Estado de pago actualizado",
      description: `El pago del pedido ${orderId} ahora está ${getPaymentStatusText(newPaymentStatus).toLowerCase()}`,
    })
  }

  const handleDeleteOrder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId)
    if (!order) return

    if (confirm(`¿Estás seguro de que quieres eliminar el pedido ${orderId}?`)) {
      setOrders(orders.filter((o) => o.id !== orderId))

      toast({
        title: "Pedido eliminado",
        description: `El pedido ${orderId} se ha eliminado correctamente`,
      })
    }
  }

  const exportOrders = () => {
    const csvContent = [
      ["ID", "Cliente", "Email", "Total", "Estado", "Pago", "Fecha"],
      ...filteredOrders.map((order) => [
        order.id,
        order.customer.name,
        order.customer.email,
        order.total.toString(),
        order.status,
        order.paymentStatus,
        new Date(order.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "pedidos.csv"
    a.click()
    window.URL.revokeObjectURL(url)

    toast({
      title: "Exportación completada",
      description: "Los datos de pedidos se han exportado correctamente",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "paid":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "processing":
        return "Procesando"
      case "shipped":
        return "Enviado"
      case "delivered":
        return "Entregado"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "paid":
        return "Pagado"
      case "failed":
        return "Fallido"
      case "refunded":
        return "Reembolsado"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Pedidos</h2>
          <p className="text-gray-600">Administra todos los pedidos de tu tienda</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={exportOrders}
            variant="outline"
            className="flex items-center space-x-2 bg-white border-gray-300 text-gray-700"
          >
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
          <Button
            onClick={() => setShowNewOrderModal(true)}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4" />
            <span>Nuevo Pedido</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 font-medium">Total Pedidos</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-blue-100" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 font-medium">Pendientes</p>
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "pending").length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-100" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 font-medium">Entregados</p>
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "delivered").length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-100" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 font-medium">Ingresos</p>
                <p className="text-2xl font-bold">€{orders.reduce((sum, o) => sum + o.total, 0).toFixed(0)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-100" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-white border border-gray-200 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar pedidos por ID, cliente o email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-gray-300 text-gray-900"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
              <select
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
              >
                {paymentStatuses.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="bg-white border border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-gray-900">Pedidos ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Pedido</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Cliente</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Total</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Pago</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Fecha</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">
                          {order.items.length} artículo{order.items.length !== 1 ? "s" : ""}
                        </p>
                        {order.trackingNumber && (
                          <p className="text-xs text-blue-600">Tracking: {order.trackingNumber}</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer.name}</p>
                        <p className="text-sm text-gray-600">{order.customer.email}</p>
                        <p className="text-xs text-gray-500">{order.customer.phone}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">€{order.total.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{order.paymentMethod}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value as Order["status"])}
                        className={`px-2 py-1 rounded text-sm border-0 ${getStatusColor(order.status)}`}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="processing">Procesando</option>
                        <option value="shipped">Enviado</option>
                        <option value="delivered">Entregado</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={order.paymentStatus}
                        onChange={(e) => handleUpdatePaymentStatus(order.id, e.target.value as Order["paymentStatus"])}
                        className={`px-2 py-1 rounded text-sm border-0 ${getPaymentStatusColor(order.paymentStatus)}`}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="paid">Pagado</option>
                        <option value="failed">Fallido</option>
                        <option value="refunded">Reembolsado</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleViewOrder(order)}
                          className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditOrder(order)}
                          className="text-gray-600 hover:text-green-600 hover:bg-green-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteOrder(order.id)}
                          className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* New Order Modal */}
      {showNewOrderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">Crear Nuevo Pedido</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowNewOrderModal(false)}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customer Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Información del Cliente</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName" className="text-gray-900">
                      Nombre *
                    </Label>
                    <Input
                      id="customerName"
                      value={newOrder.customerName}
                      onChange={(e) => setNewOrder({ ...newOrder, customerName: e.target.value })}
                      placeholder="Nombre del cliente"
                      className="bg-white border-gray-300 text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerEmail" className="text-gray-900">
                      Email *
                    </Label>
                    <Input
                      id="customerEmail"
                      type="email"
                      value={newOrder.customerEmail}
                      onChange={(e) => setNewOrder({ ...newOrder, customerEmail: e.target.value })}
                      placeholder="email@ejemplo.com"
                      className="bg-white border-gray-300 text-gray-900"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone" className="text-gray-900">
                      Teléfono
                    </Label>
                    <Input
                      id="customerPhone"
                      value={newOrder.customerPhone}
                      onChange={(e) => setNewOrder({ ...newOrder, customerPhone: e.target.value })}
                      placeholder="+34 123 456 789"
                      className="bg-white border-gray-300 text-gray-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod" className="text-gray-900">
                      Método de Pago
                    </Label>
                    <select
                      id="paymentMethod"
                      value={newOrder.paymentMethod}
                      onChange={(e) => setNewOrder({ ...newOrder, paymentMethod: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                    >
                      <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                      <option value="PayPal">PayPal</option>
                      <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerAddress" className="text-gray-900">
                    Dirección
                  </Label>
                  <Textarea
                    id="customerAddress"
                    value={newOrder.customerAddress}
                    onChange={(e) => setNewOrder({ ...newOrder, customerAddress: e.target.value })}
                    placeholder="Dirección completa de entrega"
                    rows={2}
                    className="bg-white border-gray-300 text-gray-900"
                  />
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Productos del Pedido</h3>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <p className="text-gray-600 text-center">
                    Funcionalidad de selección de productos en desarrollo
                  </p>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Por ahora, los pedidos se crean con productos predeterminados
                  </p>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-gray-900">
                  Notas del Pedido
                </Label>
                <Textarea
                  id="notes"
                  value={newOrder.notes}
                  onChange={(e) => setNewOrder({ ...newOrder, notes: e.target.value })}
                  placeholder="Notas adicionales sobre el pedido..."
                  rows={3}
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowNewOrderModal(false)}
                  className="bg-white border-gray-300 text-gray-700"
                >
                  Cancelar
                </Button>
                <Button onClick={handleCreateOrder} className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Crear Pedido
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Order Details Modal */}
      {showOrderModal && (viewingOrder || editingOrder) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">
                  {editingOrder ? "Editar Pedido" : "Detalles del Pedido"} - {(viewingOrder || editingOrder)?.id}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowOrderModal(false)
                    setViewingOrder(null)
                    setEditingOrder(null)
                  }}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {(() => {
                const order = editingOrder || viewingOrder
                if (!order) return null

                return (
                  <>
                    {/* Customer Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-gray-50 border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-lg text-gray-900">
                            Información del Cliente
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900">{order.customer.name}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900">{order.customer.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900">{order.customer.phone}</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <MapPin className="h-4 w-4 text-gray-400 mt-1" />
                            <span className="text-gray-900">{order.customer.address}</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-gray-50 border border-gray-200">
                        <CardHeader>
                          <CardTitle className="text-lg text-gray-900">Estado del Pedido</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {editingOrder ? (
                            <>
                              <div className="space-y-2">
                                <Label className="text-gray-900">Estado del Pedido</Label>
                                <select
                                  value={editingOrder.status}
                                  onChange={(e) =>
                                    setEditingOrder({ ...editingOrder, status: e.target.value as Order["status"] })
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                                >
                                  <option value="pending">Pendiente</option>
                                  <option value="processing">Procesando</option>
                                  <option value="shipped">Enviado</option>
                                  <option value="delivered">Entregado</option>
                                  <option value="cancelled">Cancelado</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-gray-900">Estado del Pago</Label>
                                <select
                                  value={editingOrder.paymentStatus}
                                  onChange={(e) =>
                                    setEditingOrder({
                                      ...editingOrder,
                                      paymentStatus: e.target.value as Order["paymentStatus"],
                                    })
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                                >
                                  <option value="pending">Pendiente</option>
                                  <option value="paid">Pagado</option>
                                  <option value="failed">Fallido</option>
                                  <option value="refunded">Reembolsado</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <Label className="text-gray-900">Número de Seguimiento</Label>
                                <Input
                                  value={editingOrder.trackingNumber || ""}
                                  onChange={(e) => setEditingOrder({ ...editingOrder, trackingNumber: e.target.value })}
                                  placeholder="Número de tracking"
                                  className="bg-white border-gray-300 text-gray-900"
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Estado:</span>
                                <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Pago:</span>
                                <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                                  {getPaymentStatusText(order.paymentStatus)}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Método de Pago:</span>
                                <span className="text-gray-900">{order.paymentMethod}</span>
                              </div>
                              {order.trackingNumber && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Tracking:</span>
                                  <span className="text-blue-600">{order.trackingNumber}</span>
                                </div>
                              )}
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Order Items */}
                    <Card className="bg-gray-50 border border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-lg text-gray-900">Artículos del Pedido</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200"
                            >
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{item.name}</h4>
                                <p className="text-sm text-gray-600">
                                  Cantidad: {item.quantity} × €{item.price.toFixed(2)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-900">
                                  €{(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Summary */}
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <div className="space-y-2">
                            <div className="flex justify-between text-gray-600">
                              <span>Subtotal:</span>
                              <span>€{order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                              <span>IVA:</span>
                              <span>€{order.tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                              <span>Envío:</span>
                              <span>€{order.shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-2">
                              <span>Total:</span>
                              <span>€{order.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Notes */}
                    <Card className="bg-gray-50 border border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-lg text-gray-900">Notas del Pedido</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {editingOrder ? (
                          <Textarea
                            value={editingOrder.notes || ""}
                            onChange={(e) => setEditingOrder({ ...editingOrder, notes: e.target.value })}
                            placeholder="Añadir notas sobre el pedido..."
                            rows={3}
                            className="bg-white border-gray-300 text-gray-900"
                          />
                        ) : (
                          <p className="text-gray-900">{order.notes || "Sin notas adicionales"}</p>
                        )}
                      </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowOrderModal(false)
                          setViewingOrder(null)
                          setEditingOrder(null)
                        }}
                        className="bg-white border-gray-300 text-gray-700"
                      >
                        {editingOrder ? "Cancelar" : "Cerrar"}
                      </Button>
                      {editingOrder ? (
                        <Button onClick={handleUpdateOrder} className="bg-blue-600 hover:bg-blue-700">
                          <Save className="h-4 w-4 mr-2" />
                          Guardar Cambios
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            setEditingOrder({ ...order })
                            setViewingOrder(null)
                          }}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Editar Pedido
                        </Button>
                      )}
                    </div>
                  </>
                )
              })()}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}