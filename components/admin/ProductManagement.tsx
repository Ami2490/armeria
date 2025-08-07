"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Upload,
  Save,
  X,
  Package,
  DollarSign,
  ImageIcon,
  CheckCircle,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  description: string
  category: string
  price: number
  originalPrice?: number
  stock: number
  status: "active" | "inactive" | "out_of_stock"
  sales: number
  image: string
  images: string[]
  sku: string
  weight?: number
  dimensions?: string
  tags: string[]
  featured: boolean
  createdAt: string
  updatedAt: string
}

export default function ProductManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Caña de Pescar Profesional X1",
      description: "Caña de fibra de carbono de alta resistencia, perfecta para pesca en agua dulce y salada.",
      category: "Pesca",
      price: 299.99,
      originalPrice: 399.99,
      stock: 15,
      status: "active",
      sales: 45,
      image: "https://i.ebayimg.com/images/g/vfoAAOSwfCphu3Si/s-l400.jpg",
      images: ["https://i.ebayimg.com/images/g/vfoAAOSwfCphu3Si/s-l400.jpg"],
      sku: "PESCA-001",
      weight: 0.8,
      dimensions: "3.6m x 5cm",
      tags: ["pesca", "profesional", "carbono"],
      featured: true,
      createdAt: "2024-01-01",
      updatedAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Rifle de Caza Precision Pro",
      description: "Rifle de alta precisión con mira telescópica incluida. Ideal para caza mayor.",
      category: "Caza",
      price: 1299.99,
      stock: 3,
      status: "active",
      sales: 12,
      image: "https://www.outdoorlife.com/uploads/2023/04/24/TJD06789.jpeg?auto=webp&width=800&crop=16:10,offset-x50",
      images: ["https://www.outdoorlife.com/uploads/2023/04/24/TJD06789.jpeg?auto=webp&width=800&crop=16:10,offset-x50"],
      sku: "CAZA-001",
      weight: 3.2,
      dimensions: "120cm x 15cm",
      tags: ["caza", "rifle", "precision"],
      featured: true,
      createdAt: "2024-01-02",
      updatedAt: "2024-01-16",
    },
    {
      id: "3",
      name: "Kit de Señuelos Premium",
      description: "Colección de 20 señuelos artesanales para diferentes tipos de pesca.",
      category: "Pesca",
      price: 89.99,
      originalPrice: 129.99,
      stock: 0,
      status: "out_of_stock",
      sales: 67,
      image: "https://f.fcdn.app/imgs/f21cad/elreydelentretenimiento.com/erdeuy/8247/original/catalogo/170428010_170428010_4/1500-1500/kit-valija-organizador-senuelos-para-pesca-300-piezas-kit-valija-organizador-senuelos-para-pesca-300-piezas.jpg",
      images: ["https://f.fcdn.app/imgs/f21cad/elreydelentretenimiento.com/erdeuy/8247/original/catalogo/170428010_170428010_4/1500-1500/kit-valija-organizador-senuelos-para-pesca-300-piezas-kit-valija-organizador-senuelos-para-pesca-300-piezas.jpg", "https://resources.claroshop.com/medios-plazavip/mkt/63e0b43721df5_296png.jpg"],
      sku: "PESCA-002",
      weight: 0.5,
      dimensions: "30cm x 20cm x 5cm",
      tags: ["pesca", "señuelos", "kit"],
      featured: false,
      createdAt: "2024-01-03",
      updatedAt: "2024-01-17",
    },
  ])

  const [newProduct, setNewProduct] = useState<Partial<Product> & { images_text?: string }>({
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    status: "active",
    image: "",
    images: [],
    images_text: "",
    sku: "",
    tags: [],
    featured: false,
  })

  const categories = ["Pesca", "Caza", "Óptica", "Accesorios"]
  const statuses = [
    { value: "all", label: "Todos" },
    { value: "active", label: "Activos" },
    { value: "inactive", label: "Inactivos" },
    { value: "out_of_stock", label: "Agotados" },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleAddProduct = () => {
    const images = newProduct.images_text?.split(",").map(s => s.trim()).filter(Boolean) ?? []
    if (!newProduct.name || !newProduct.category || !newProduct.price || images.length === 0) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios y añade al menos una imagen.",
        variant: "destructive",
      })
      return
    }

    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name!,
      description: newProduct.description || "",
      category: newProduct.category!,
      price: newProduct.price!,
      originalPrice: newProduct.originalPrice,
      stock: newProduct.stock || 0,
      status: (newProduct.status as "active" | "inactive" | "out_of_stock") || "active",
      sales: 0,
      image: images[0],
      images: images,
      sku: newProduct.sku || `SKU-${Date.now()}`,
      weight: newProduct.weight,
      dimensions: newProduct.dimensions,
      tags: newProduct.tags || [],
      featured: newProduct.featured || false,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    }

    setProducts([...products, product])
    setNewProduct({
      name: "",
      description: "",
      category: "",
      price: 0,
      stock: 0,
      status: "active",
      images_text: "",
      sku: "",
      tags: [],
      featured: false,
    })
    setShowAddProduct(false)

    toast({
      title: "Producto añadido",
      description: `${product.name} se ha añadido correctamente`,
    })
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct({...product, images_text: product.images.join(', ')} as any)
  }

  const handleUpdateProduct = () => {
    if (!editingProduct) return
    
    const images = (editingProduct as any).images_text?.split(",").map((s:string) => s.trim()).filter(Boolean) ?? []
    if (images.length === 0) {
       toast({
        title: "Error",
        description: "El producto debe tener al menos una imagen.",
        variant: "destructive",
      })
      return
    }

    const updatedProduct = { ...editingProduct, images, image: images[0] };
    delete (updatedProduct as any).images_text;


    setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
    setEditingProduct(null)

    toast({
      title: "Producto actualizado",
      description: `${editingProduct.name} se ha actualizado correctamente`,
    })
  }

  const handleDeleteProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    if (confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?`)) {
      setProducts(products.filter((p) => p.id !== productId))

      toast({
        title: "Producto eliminado",
        description: `${product.name} se ha eliminado correctamente`,
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "out_of_stock":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "inactive":
        return "Inactivo"
      case "out_of_stock":
        return "Agotado"
      default:
        return status
    }
  }

  const renderProductModal = (
    productData: Partial<Product> & { images_text?: string },
    setData: Function,
    onSave: () => void,
    onClose: () => void,
    title: string
  ) => {
     return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900">{title}</CardTitle>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-900">
                    Nombre del Producto *
                  </Label>
                  <Input
                    id="name"
                    value={productData.name}
                    onChange={(e) => setData({ ...productData, name: e.target.value })}
                    placeholder="Nombre del producto"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-900">
                    Categoría *
                  </Label>
                  <select
                    id="category"
                    value={productData.category}
                    onChange={(e) => setData({ ...productData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-900">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  value={productData.description}
                  onChange={(e) => setData({ ...productData, description: e.target.value })}
                  placeholder="Descripción del producto"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="images_text" className="text-gray-900">
                  URLs de Imágenes (separadas por coma) *
                </Label>
                <Textarea
                  id="images_text"
                  value={productData.images_text}
                  onChange={(e) => setData({ ...productData, images_text: e.target.value })}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-gray-900">
                    Precio *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={productData.price}
                    onChange={(e) => setData({ ...productData, price: Number.parseFloat(e.target.value) })}
                    placeholder="0.00"
                  />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="originalPrice" className="text-gray-900">
                    Precio Original
                  </Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    value={productData.originalPrice || ""}
                    onChange={(e) => setData({ ...productData, originalPrice: Number.parseFloat(e.target.value) })}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock" className="text-gray-900">
                    Stock
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    value={productData.stock}
                    onChange={(e) => setData({ ...productData, stock: Number.parseInt(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>
               <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={productData.featured}
                  onCheckedChange={(checked) => setData({ ...productData, featured: checked })}
                />
                <Label htmlFor="featured" className="text-gray-900">
                  Producto Destacado
                </Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={onClose} className="bg-transparent">
                  Cancelar
                </Button>
                <Button onClick={onSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Producto
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestión de Productos</h2>
          <p className="text-gray-600">Administra tu catálogo de productos</p>
        </div>
        <Button
          onClick={() => setShowAddProduct(true)}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4" />
          <span>Nuevo Producto</span>
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar productos por nombre o SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
              >
                <option value="all">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
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
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Productos ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Producto</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Categoría</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Precio</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Stock</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          {product.images.length > 0 ? (
                            <img
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <ImageIcon className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                          {product.featured && (
                            <Badge className="mt-1 bg-yellow-100 text-yellow-800 text-xs">Destacado</Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-gray-700">
                        {product.category}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <span className="font-medium text-gray-900">€{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">€{product.originalPrice}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-medium ${product.stock === 0 ? "text-red-500" : product.stock < 5 ? "text-orange-500" : "text-gray-900"}`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(product.status)}>{getStatusText(product.status)}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditProduct(product)}
                          className="text-gray-600 hover:text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-gray-600 hover:text-red-600"
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
      
      {showAddProduct && renderProductModal(newProduct, setNewProduct, handleAddProduct, () => setShowAddProduct(false), "Añadir Nuevo Producto")}
      
      {editingProduct && renderProductModal(editingProduct as any, setEditingProduct, handleUpdateProduct, () => setEditingProduct(null), "Editar Producto")}

    </div>
  )
}
