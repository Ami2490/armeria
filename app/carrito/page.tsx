"use client"

import { useCart } from "@/hooks/useCart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, CreditCard } from "lucide-react"

export default function CartPage() {
  const { items, itemCount, total, updateQuantity, removeFromCart, clearCart } = useCart()

  const shippingCost = total > 50 ? 0 : 5.99
  const taxRate = 0.21
  const tax = total * taxRate
  const grandTotal = total + shippingCost + tax

  if (itemCount === 0) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center p-4 pt-20">
        <ShoppingCart className="w-24 h-24 text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h1>
        <p className="text-gray-600 mb-6 max-w-sm">
          Parece que no has añadido nada a tu carrito. ¡Explora nuestros productos y encuentra tu próximo equipo de
          aventura!
        </p>
        <Link href="/tienda">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver a la tienda
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Tu Carrito</h1>
              <span className="text-gray-600">{itemCount} artículo(s)</span>
            </div>
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="flex items-center p-4 shadow-sm">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">Precio: €{item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                        className="h-8 w-12 text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-lg">€{(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-500 mt-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <Link href="/tienda">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Seguir comprando
                </Button>
              </Link>
              <Button variant="destructive" onClick={clearCart}>
                Vaciar carrito
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <Card className="shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="text-2xl">Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span>{shippingCost === 0 ? "Gratis" : `€${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>IVA (21%)</span>
                  <span>€{tax.toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>€{grandTotal.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button size="lg" className="w-full bg-green-600 hover:bg-green-700">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Proceder al Pago
                </Button>
                <p className="text-xs text-center text-gray-500">
                  Los gastos de envío y los impuestos se calculan al finalizar la compra.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}