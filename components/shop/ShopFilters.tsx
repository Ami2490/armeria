"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Star } from "lucide-react"

export interface Filters {
  categories: string[]
  brands: string[]
  priceRange: [number, number]
  inStock: boolean
  onSale: boolean
  newArrivals: boolean
  rating: number
}

interface ShopFiltersProps {
  filters: Filters
  onFilterChange: <K extends keyof Filters>(filterType: K, value: Filters[K]) => void
  brands: string[]
  categories: { id: string; label: string; count: number }[]
  clearAllFilters: () => void
}

export default function ShopFilters({ filters, onFilterChange, brands, categories, clearAllFilters }: ShopFiltersProps) {
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter((id) => id !== categoryId)
    onFilterChange("categories", newCategories)
  }

  const handleBrandChange = (brandId: string, checked: boolean) => {
    const newBrands = checked ? [...filters.brands, brandId] : filters.brands.filter((id) => id !== brandId)
    onFilterChange("brands", newBrands)
  }

  const getActiveFilters = () => {
    const active: { type: keyof Filters | "price"; value: string; label: string }[] = []
    filters.categories.forEach((c) =>
      active.push({ type: "categories", value: c, label: categories.find((cat) => cat.id === c)?.label || c }),
    )
    filters.brands.forEach((b) => active.push({ type: "brands", value: b, label: b }))
    if (filters.inStock) active.push({ type: "inStock", value: "inStock", label: "En stock" })
    if (filters.onSale) active.push({ type: "onSale", value: "onSale", label: "En oferta" })
    if (filters.newArrivals) active.push({ type: "newArrivals", value: "newArrivals", label: "Novedades" })
    if (filters.rating > 0)
      active.push({ type: "rating", value: String(filters.rating), label: `${filters.rating}+ estrellas` })
    return active
  }

  const activeFilters = getActiveFilters()

  const removeFilter = (type: keyof Filters, value: string) => {
    if (type === "categories" || type === "brands") {
      const currentValues = filters[type] as string[]
      onFilterChange(type, currentValues.filter((v) => v !== value))
    } else if (type === "inStock" || type === "onSale" || type === "newArrivals") {
      onFilterChange(type, false)
    } else if (type === "rating") {
      onFilterChange("rating", 0)
    }
  }

  return (
    <div className="space-y-6">
      {activeFilters.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Filtros Activos</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-xs">
                Limpiar todo
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge key={`${filter.type}-${filter.value}`} variant="secondary" className="flex items-center gap-1">
                  {filter.label}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeFilter(filter.type as keyof Filters, filter.value)}
                  />
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Rango de Precio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => onFilterChange("priceRange", value as [number, number])}
            max={2000}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>€{filters.priceRange[0]}</span>
            <span>€{filters.priceRange[1]}+</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Categorías</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={category.id}
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                />
                <label
                  htmlFor={category.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.label}
                </label>
              </div>
              <span className="text-xs text-gray-500">({category.count})</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Marcas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={brand}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                />
                <label
                  htmlFor={brand}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {brand}
                </label>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Valoración</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.rating === rating}
                onCheckedChange={(checked) => onFilterChange("rating", checked ? rating : 0)}
              />
              <label htmlFor={`rating-${rating}`} className="flex items-center space-x-1 text-sm cursor-pointer">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span>y más</span>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Disponibilidad</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.inStock}
              onCheckedChange={(checked) => onFilterChange("inStock", checked as boolean)}
            />
            <label htmlFor="in-stock" className="text-sm font-medium">
              En stock
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="on-sale"
              checked={filters.onSale}
              onCheckedChange={(checked) => onFilterChange("onSale", checked as boolean)}
            />
            <label htmlFor="on-sale" className="text-sm font-medium">
              En oferta
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="new-arrivals"
              checked={filters.newArrivals}
              onCheckedChange={(checked) => onFilterChange("newArrivals", checked as boolean)}
            />
            <label htmlFor="new-arrivals" className="text-sm font-medium">
              Novedades
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}