"use client"
import { useState, useCallback } from "react"
import Hero3D from "@/components/landing/Hero3D"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Star, Eye, Target, Fish, Users, Award, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { allProducts, type Product } from "@/components/shop/ProductGrid"
import ProductCard from "@/components/shop/ProductCard"
import ProductDetailModal from "@/components/shop/ProductDetailModal"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const featuredProducts = allProducts.filter((p) => p.isFeatured).slice(0, 3)
const onSaleProducts = allProducts.filter((p) => p.originalPrice).slice(0, 8)

const features = [
  {
    icon: Target,
    title: "Precisión Garantizada",
    description: "Equipos de la más alta calidad para resultados profesionales",
  },
  {
    icon: Fish,
    title: "Pesca Deportiva",
    description: "Todo lo que necesitas para tu próxima aventura de pesca",
  },
  {
    icon: Users,
    title: "Comunidad Activa",
    description: "Únete a miles de cazadores y pescadores apasionados",
  },
  {
    icon: Award,
    title: "20+ Años de Experiencia",
    description: "Décadas de experiencia en el mundo de la caza y pesca",
  },
]

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleViewDetails = useCallback((product: Product) => {
    setSelectedProduct(product)
  }, [])
  
  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null)
  }, [])

  return (
    <div className="min-h-screen bg-contrast">
      {/* Hero Section */}
      <Hero3D />

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-contrast mb-4">¿Por Qué Elegirnos?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos tu socio de confianza en cada aventura
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 hover:scale-105">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-contrast mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-contrast" style={{ perspective: "2000px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-contrast mb-4">Productos Destacados</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre nuestros equipos más populares y mejor valorados
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onViewDetails={() => handleViewDetails(product)} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/tienda">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                Ver Toda la Tienda
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* On Sale Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-contrast mb-4">Ofertas Imperdibles</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aprovecha nuestros descuentos especiales en productos seleccionados.
            </p>
          </motion.div>

          <div className="relative px-12" style={{ perspective: "2000px" }}>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {onSaleProducts.map((product) => (
                  <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                    <div className="p-1">
                      <ProductCard product={product} onViewDetails={() => handleViewDetails(product)} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gray-800">
        <div className="absolute inset-0">
          <Image
            src="https://static.vecteezy.com/system/resources/thumbnails/040/707/790/small_2x/ai-generated-sunset-silhouette-stag-grazing-in-tranquil-meadow-surrounded-by-nature-generated-by-ai-free-photo.jpg"
            alt="CTA background"
            fill
            className="object-cover ken-burns-slow"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Listo para tu Próxima Aventura?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad de cazadores y pescadores. Comparte experiencias, aprende técnicas y descubre los
            mejores lugares.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tienda">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                🛒 Explorar Tienda
              </Button>
            </Link>
            <Link href="/comunidad">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                👥 Únete a la Comunidad
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={handleCloseModal}
      />
    </div>
  )
}
