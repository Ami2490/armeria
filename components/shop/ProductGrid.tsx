"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ProductCard from "./ProductCard"
import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  category: "Pesca" | "Caza" | "Óptica" | "Accesorios"
  brand: string
  rating: number
  reviews: number
  inStock: boolean
  isNew?: boolean
  isFeatured?: boolean
}

export const allProducts: Product[] = [
  {
    id: "rifle-caza-profesional",
    name: "Rifle de Caza Profesional",
    description: "Rifle de alta precisión para caza mayor con mira telescópica incluida.",
    price: 1299.99,
    originalPrice: 1599.99,
    image: "https://www.outdoorlife.com/uploads/2023/04/24/TJD06789.jpeg?auto=webp&width=800&crop=16:10,offset-x50",
    images: ["https://www.outdoorlife.com/uploads/2023/04/24/TJD06789.jpeg?auto=webp&width=800&crop=16:10,offset-x50"],
    category: "Caza",
    brand: "ProHunter",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "cana-pesca-carbono",
    name: "Caña de Pesca Carbono Pro",
    description: "Caña de carbono ultraligera para pesca deportiva en agua dulce y salada.",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://i.ebayimg.com/images/g/vfoAAOSwfCphu3Si/s-l400.jpg",
    images: ["https://i.ebayimg.com/images/g/vfoAAOSwfCphu3Si/s-l400.jpg"],
    category: "Pesca",
    brand: "Shimano",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "mira-telescopica-hd",
    name: "Mira Telescópica HD",
    description: "Mira telescópica de alta definición con zoom variable 3-9x40.",
    price: 449.99,
    image: "https://huntersproshops.com/wp-content/uploads/2020/07/mira2.jpg",
    images: [
      "https://huntersproshops.com/wp-content/uploads/2020/07/mira2.jpg",
      "https://huntersproshops.com/wp-content/uploads/2020/07/mira1.jpg",
      "https://www.outletaventura.cl/wp-content/uploads/2023/04/1-Mira-Telescopica-Bushnell-Banner.jpg",
    ],
    category: "Óptica",
    brand: "Bushnell",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    isNew: false,
    isFeatured: true,
  },
  {
    id: "kit-senuelos-premium",
    name: "Kit de Señuelos Premium",
    description: "Colección de 20 señuelos artesanales para diferentes tipos de pesca.",
    price: 89.99,
    originalPrice: 129.99,
    image: "https://f.fcdn.app/imgs/f21cad/elreydelentretenimiento.com/erdeuy/8247/original/catalogo/170428010_170428010_4/1500-1500/kit-valija-organizador-senuelos-para-pesca-300-piezas-kit-valija-organizador-senuelos-para-pesca-300-piezas.jpg",
    images: [
      "https://f.fcdn.app/imgs/f21cad/elreydelentretenimiento.com/erdeuy/8247/original/catalogo/170428010_170428010_4/1500-1500/kit-valija-organizador-senuelos-para-pesca-300-piezas-kit-valija-organizador-senuelos-para-pesca-300-piezas.jpg",
      "https://resources.claroshop.com/medios-plazavip/mkt/63e0b43721df5_296png.jpg",
    ],
    category: "Pesca",
    brand: "Rapala",
    rating: 4.6,
    reviews: 203,
    inStock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "mochila-tactica-outdoor",
    name: "Mochila Táctica Outdoor",
    description: "Mochila resistente al agua con múltiples compartimentos para aventuras.",
    price: 159.99,
    image: "https://mercadolider.com.uy/wp-content/uploads/2023/11/MAR-5456-3.jpg",
    images: [
      "https://mercadolider.com.uy/wp-content/uploads/2023/11/MAR-5456-3.jpg",
      "https://m.media-amazon.com/images/I/51xYuPKZP5S._SY350_.jpg",
    ],
    category: "Accesorios",
    brand: "OutdoorZ",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    isNew: true,
    isFeatured: false,
  },
  {
    id: "carrete-spinning-ultra",
    name: "Carrete Spinning Ultra",
    description: "Carrete de spinning con sistema de frenado suave y rodamientos de acero.",
    price: 199.99,
    image: "https://http2.mlstatic.com/D_NQ_NP_685389-MLU82769861171_022025-O.webp",
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_685389-MLU82769861171_022025-O.webp",
      "https://m.media-amazon.com/images/I/710OaD3qgEL._UF894,1000_QL80_.jpg",
    ],
    category: "Pesca",
    brand: "Daiwa",
    rating: 4.5,
    reviews: 98,
    inStock: false,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "cuchillo-caza-forjado",
    name: "Cuchillo de Caza Forjado",
    description: "Cuchillo artesanal de acero al carbono con mango de madera de nogal.",
    price: 249.99,
    image: "https://dojiw2m9tvv09.cloudfront.net/24214/product/cuchilloona29207.png",
    images: [
      "https://dojiw2m9tvv09.cloudfront.net/24214/product/cuchilloona29207.png",
      "https://jvarmeria.com.ar/admin/productos/original/e91135_axdourldbaabcvta.jpg",
    ],
    category: "Caza",
    brand: "Muela",
    rating: 4.9,
    reviews: 67,
    inStock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "binoculares-expedition",
    name: "Binoculares Expedition 10x42",
    description: "Binoculares a prueba de agua y niebla, ideales para observación en la naturaleza.",
    price: 320.5,
    image: "https://www.bhphotovideo.com/images/images2500x2500/bushnell_191042_10x42_legend_l_series_binocular_1087114.jpg",
    images: ["https://www.bhphotovideo.com/images/images2500x2500/bushnell_191042_10x42_legend_l_series_binocular_1087114.jpg"],
    category: "Óptica",
    brand: "Bushnell",
    rating: 4.7,
    reviews: 95,
    inStock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "linea-pesca-fluorocarbono",
    name: "Línea de Pesca Fluorocarbono",
    description: "Línea de pesca de 200m casi invisible bajo el agua, alta resistencia a la abrasión.",
    price: 25.99,
    originalPrice: 35.0,
    image: "https://i.ebayimg.com/images/g/9~YAAOSwDk5T9k-2/s-l1200.webp",
    images: ["https://i.ebayimg.com/images/g/9~YAAOSwDk5T9k-2/s-l1200.webp"],
    category: "Pesca",
    brand: "Shimano",
    rating: 4.5,
    reviews: 150,
    inStock: true,
    isNew: false,
    isFeatured: false,
  },
  {
    id: "botas-caza-impermeables",
    name: "Botas de Caza Impermeables",
    description: "Botas de caza robustas con membrana Gore-Tex para mantener los pies secos.",
    price: 180.0,
    image: "https://m.media-amazon.com/images/I/71Y-8hCHLpL._AC_SY695_.jpg",
    images: ["https://m.media-amazon.com/images/I/71Y-8hCHLpL._AC_SY695_.jpg"],
    category: "Accesorios",
    brand: "ProHunter",
    rating: 4.8,
    reviews: 110,
    inStock: true,
    isNew: false,
    isFeatured: false,
  },
]

interface ProductGridProps {
  products: Product[]
  onViewDetails: (product: Product) => void
}

export default function ProductGrid({ products, onViewDetails }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")

  const sortProducts = (productsToSort: Product[], sortByValue: string) => {
    switch (sortByValue) {
      case "price-low":
        return [...productsToSort].sort((a, b) => a.price - b.price)
      case "price-high":
        return [...productsToSort].sort((a, b) => b.price - a.price)
      case "rating":
        return [...productsToSort].sort((a, b) => b.rating - a.rating)
      case "newest":
        return [...productsToSort].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
      default:
        return [...productsToSort].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
    }
  }

  const sortedProducts = sortProducts(products, sortBy)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">{products.length} productos encontrados</span>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
          >
            <option value="featured">Destacados</option>
            <option value="newest">Más nuevos</option>
            <option value="price-low">Precio: Menor a mayor</option>
            <option value="price-high">Precio: Mayor a menor</option>
            <option value="rating">Mejor valorados</option>
          </select>

          <div className="flex border border-gray-300 rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <motion.div
        layout
        className={
          viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"
        }
      >
        {sortedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ProductCard product={product} viewMode={viewMode} onViewDetails={() => onViewDetails(product)} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
