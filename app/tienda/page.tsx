"use client"

import { Suspense, useState, useMemo, useCallback } from "react"
import ProductGrid, { allProducts, type Product } from "@/components/shop/ProductGrid"
import ShopFilters, { type Filters } from "@/components/shop/ShopFilters"
import ShopHeader from "@/components/shop/ShopHeader"
import LoadingSpinner from "@/components/ui/LoadingSpinner"
import ProductDetailModal from "@/components/shop/ProductDetailModal"

export default function TiendaPage() {
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    brands: [],
    priceRange: [0, 2000],
    inStock: false,
    onSale: false,
    newArrivals: false,
    rating: 0,
  })
  
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const uniqueBrands = [...new Set(allProducts.map((p) => p.brand))]
  const categoryCounts = allProducts.reduce(
    (acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const categories = [
    { id: "Pesca", label: "Equipos de Pesca", count: categoryCounts["Pesca"] || 0 },
    { id: "Caza", label: "Equipos de Caza", count: categoryCounts["Caza"] || 0 },
    { id: "Óptica", label: "Óptica", count: categoryCounts["Óptica"] || 0 },
    { id: "Accesorios", label: "Accesorios", count: categoryCounts["Accesorios"] || 0 },
  ]

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const headerCategoryMatch = activeCategory === "Todos" || product.category === activeCategory
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category)
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand)
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      const stockMatch = !filters.inStock || product.inStock
      const saleMatch = !filters.onSale || !!product.originalPrice
      const newMatch = !filters.newArrivals || !!product.isNew
      const ratingMatch = product.rating >= filters.rating

      return headerCategoryMatch && categoryMatch && brandMatch && priceMatch && stockMatch && saleMatch && newMatch && ratingMatch
    })
  }, [filters, activeCategory])

  const handleFilterChange = useCallback(<K extends keyof Filters>(filterType: K, value: Filters[K]) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }))
  }, [])
  
  const clearAllFilters = useCallback(() => {
    setFilters({
      categories: [],
      brands: [],
      priceRange: [0, 2000],
      inStock: false,
      onSale: false,
      newArrivals: false,
      rating: 0,
    })
  }, [])
  
  const handleViewDetails = useCallback((product: Product) => {
    setSelectedProduct(product)
  }, [])
  
  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ShopHeader 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <aside className="lg:w-80 flex-shrink-0">
            <ShopFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              brands={uniqueBrands}
              categories={categories}
              clearAllFilters={clearAllFilters}
            />
          </aside>
          <main className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>
              <ProductGrid products={filteredProducts} onViewDetails={handleViewDetails} />
            </Suspense>
          </main>
        </div>
      </div>
      
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={handleCloseModal}
      />
    </div>
  )
}