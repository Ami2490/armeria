"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart, Star, Eye } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { useWishlist } from "@/hooks/useWishlist"
import { toast } from "@/hooks/use-toast"
import type { Product } from "./ProductGrid"

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
  onViewDetails: () => void
}

export default function ProductCard({ product, viewMode = "grid", onViewDetails }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 })
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (viewMode !== "grid") return
    const rect = e.currentTarget.getBoundingClientRect()
    const { width, height, left, top } = rect
    const mouseX = e.clientX - left
    const mouseY = e.clientY - top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    if (viewMode !== "grid") return
    x.set(0)
    y.set(0)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!product.inStock) return

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })

    toast({
      title: "Producto añadido",
      description: `${product.name} se ha añadido al carrito.`,
    })
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Eliminado de favoritos",
        description: `${product.name} se ha eliminado de tus favoritos.`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      })
      toast({
        title: "Añadido a favoritos",
        description: `${product.name} se ha añadido a tus favoritos.`,
      })
    }
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row cursor-pointer" onClick={onViewDetails}>
          <div className="relative sm:w-48 h-48 sm:h-auto flex-shrink-0">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            {product.isNew && <Badge className="absolute top-2 left-2 bg-green-500">Nuevo</Badge>}
            {discount > 0 && <Badge className="absolute top-2 right-2 bg-red-500">-{discount}%</Badge>}
          </div>
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg hover:text-green-600 transition-colors">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.reviews})</span>
              </div>
            </div>
            <div className="flex justify-between items-end mt-4">
              <div>
                <span className="text-2xl font-bold text-green-600">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleWishlistToggle}
                  className={isInWishlist(product.id) ? "text-red-500" : ""}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button onClick={handleAddToCart} disabled={!product.inStock} size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Añadir" : "Agotado"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onViewDetails}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="cursor-pointer"
    >
      <Card
        className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
        style={{ transformStyle: "preserve-3d" }}
      >
        <CardContent className="p-0" style={{ transformStyle: "preserve-3d" }}>
          <div className="relative" style={{ transform: "translateZ(30px)" }}>
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 flex flex-col space-y-1">
                {product.isNew && <Badge className="bg-green-500">Nuevo</Badge>}
                {discount > 0 && <Badge className="bg-red-500">-{discount}%</Badge>}
                {!product.inStock && <Badge variant="secondary">Agotado</Badge>}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="absolute top-2 right-2 flex flex-col space-y-2"
              >
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleWishlistToggle}
                  className={`bg-white/90 hover:bg-white ${isInWishlist(product.id) ? "text-red-500" : ""}`}
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    onViewDetails()
                  }}
                  className="bg-white/90 hover:bg-white"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                className="absolute bottom-2 left-2 right-2"
              >
                <Button onClick={handleAddToCart} disabled={!product.inStock} className="w-full bg-green-600 hover:bg-green-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Añadir al carrito" : "Agotado"}
                </Button>
              </motion.div>
            </div>
          </div>
          <div className="p-4" style={{ transform: "translateZ(40px)" }}>
            <h3 className="font-semibold text-lg hover:text-green-600 transition-colors line-clamp-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviews})</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div>
                <span className="text-xl font-bold text-green-600">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                )}
              </div>
              <Badge variant="outline" className="text-xs">
                {product.category}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}