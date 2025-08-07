"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ShopHeaderProps {
  activeCategory: string
  setActiveCategory: (category: string) => void
}

const categoryBanners: Record<string, string> = {
  Todos: "https://t4.ftcdn.net/jpg/05/11/01/79/360_F_511017910_kDQ5v9TQXZlOnw43CdGIAs6ThDo2EqoW.jpg",
  Pesca: "https://www.peixacasa.cat/wp-content/uploads/2022/08/metodos-de-pesca.jpg",
  Caza: "https://static.vecteezy.com/system/resources/thumbnails/040/707/790/small_2x/ai-generated-sunset-silhouette-stag-grazing-in-tranquil-meadow-surrounded-by-nature-generated-by-ai-free-photo.jpg",
  Camping: "https://t3.ftcdn.net/jpg/05/69/33/46/360_F_569334698_OcKueBgAwnNahl4vVNcjhz5JhBx36E32.jpg",
  Accesorios: "https://www.outdoorlife.com/uploads/2023/04/24/TJD06789.jpeg?auto=webp&width=800&crop=16:10,offset-x50",
  Ofertas: "https://static7.depositphotos.com/1033002/732/i/450/depositphotos_7322826-stock-photo-hunter.jpg",
}

export default function ShopHeader({ activeCategory, setActiveCategory }: ShopHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [ "Todos", "Pesca", "Caza", "Óptica", "Accesorios" ]

  const bannerImage = categoryBanners[activeCategory] || categoryBanners.Todos

  return (
    <div className="space-y-6">
      <div className="relative rounded-lg overflow-hidden p-8 md:p-12 text-center h-80 flex flex-col justify-center items-center">
        <Image
          src={bannerImage}
          alt={`Banner de ${activeCategory}`}
          fill
          className="object-cover"
          key={activeCategory} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />

        <div className="relative z-10 space-y-6 w-full">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">Nuestra Tienda</h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Descubre nuestra amplia selección de equipos de pesca y caza de alta calidad
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg bg-white/20 border-white/30 text-white placeholder:text-gray-300"
              />
              <Button size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600">
                Buscar
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={`cursor-pointer px-4 py-2 text-sm transition-colors ${
                  activeCategory === category
                    ? "bg-green-600 hover:bg-green-700 border-transparent text-white"
                    : "border-white/50 text-white hover:bg-white/10"
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <nav className="flex items-center space-x-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-green-600">
          Inicio
        </Link>
        <span>/</span>
        <span className="text-gray-900">Tienda</span>
      </nav>
    </div>
  )
}