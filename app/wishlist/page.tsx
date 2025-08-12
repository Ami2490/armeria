"use client"

import { useWishlist } from "@/hooks/useWishlist"
import { useCart } from "@/hooks/useCart"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function WishlistPage() {
  const { items, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleMoveToCart = (item: (typeof items)[0]) => {
    addToCart({ ...item, quantity: 1 })
    removeFromWishlist(item.id)
    toast({
      title: "Movido al carrito",
      description: `${item.name} se ha movido a tu carrito.`,
    })
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center text-center p-4 pt-20">
        <Heart className="w-24 h-24 text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Tu lista de deseos está vacía</h1>
        <p className="text-gray-600 mb-6 max-w-sm">
          Guarda tus productos favoritos para no perderlos de vista. ¡Empieza a explorar y añade los que más te gusten!
        </p>
        <Link href="/tienda">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Ir a la tienda
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Lista de Deseos</h1>
          <p className="text-gray-600 mt-2">
            Tienes {items.length} artículo(s) guardado(s) en tus favoritos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative w-full aspect-square">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 line-clamp-2">{item.name}</h3>
                  <p className="text-lg font-bold text-green-600 mt-2">${item.price.toFixed(2)}</p>
                  <div className="mt-4 flex flex-col gap-2">
                    <Button onClick={() => handleMoveToCart(item)} className="w-full bg-green-600 hover:bg-green-700">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Mover al carrito
                    </Button>
                    <Button variant="outline" onClick={() => removeFromWishlist(item.id)} className="w-full">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}