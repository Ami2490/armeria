"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Star, Plus, Minus, Heart, ShoppingCart } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { toast } from "@/hooks/use-toast"
import type { Product } from "./ProductGrid"

interface ProductDetailModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  useEffect(() => {
    if (isOpen) {
      setQuantity(1)
    }
  }, [isOpen])

  if (!product) return null

  const handleAddToCart = () => {
    if (!product.inStock) return
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
    })
    toast({
      title: "Producto añadido",
      description: `${quantity} x ${product.name} se ha añadido al carrito.`,
    })
    onClose()
  }

  const handleWishlistToggle = () => {
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    }
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Eliminado de favoritos",
        description: `${product.name} se ha eliminado de tus favoritos.`,
      })
    } else {
      addToWishlist(wishlistItem)
      toast({
        title: "Añadido a favoritos",
        description: `${product.name} se ha añadido a tus favoritos.`,
      })
    }
  }

  const isWishlisted = isInWishlist(product.id)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Carousel */}
          <div className="p-4">
            <Carousel className="w-full">
              <CarouselContent>
                {(product.images && product.images.length > 0 ? product.images : [product.image]).map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square relative">
                      <Image src={img} alt={`${product.name} - imagen ${index + 1}`} fill className="object-contain rounded-md" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>

          {/* Product Details */}
          <div className="p-8 flex flex-col">
            <Badge variant="outline" className="w-fit">{product.category}</Badge>
            <h2 className="text-3xl font-bold mt-2">{product.name}</h2>
            
            <div className="flex items-center space-x-2 my-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviews} reseñas)</span>
            </div>
            
            <p className="text-gray-600 flex-1">{product.description}</p>
            
            <div className="my-6">
              <span className="text-3xl font-bold text-green-600">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            
            {product.inStock ? (
              <Badge className="bg-green-100 text-green-800 w-fit">En Stock</Badge>
            ) : (
              <Badge variant="destructive">Agotado</Badge>
            )}

            {/* Actions Container */}
            <div className="mt-auto pt-6 flex items-center gap-4">
                <div className="flex items-center space-x-2 border rounded-md p-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-bold w-8 text-center">{quantity}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => q + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleAddToCart} size="lg" className="flex-1 bg-green-600 hover:bg-green-700" disabled={!product.inStock}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Añadir al Carrito
                </Button>
                <Button onClick={handleWishlistToggle} variant="outline" size="icon" className={`h-12 w-12 flex-shrink-0 ${isWishlisted ? 'text-red-500 border-red-500' : ''}`}>
                  <Heart className="h-6 w-6" />
                </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}