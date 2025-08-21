"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Save, Trash2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"

interface Product {
  id: string;
  name: string;
  genericName: string;
  category: string;
  productType: string;
  description: string;
  barcode: string;
  manufacturer: string;
  supplier: string;
  dosage: string;
  form: string;
  purchasePrice: string;
  sellingPrice: string;
  stock: string;
  minStock: string;
  maxStock: string;
  expiryDate: string;
  batchNumber: string;
  location: string;
  prescription: boolean;
}

export default function EditProductPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState<Product | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    genericName: "",
    category: "",
    productType: "",
    description: "",
    barcode: "",
    manufacturer: "",
    supplier: "",
    dosage: "",
    form: "",
    purchasePrice: "",
    sellingPrice: "",
    stock: "",
    minStock: "",
    maxStock: "",
    expiryDate: "",
    batchNumber: "",
    location: "",
    prescription: false,
  })

  useEffect(() => {
    console.log("[v0] Loading product with ID:", params.id)

    // Load product data from localStorage
    const products: Product[] = JSON.parse(localStorage.getItem("products") || "[]")
    console.log("[v0] All products:", products)

    const foundProduct = products.find((p: Product) => p.id === params.id || p.id === String(params.id))
    console.log("[v0] Found product:", foundProduct)

    if (foundProduct) {
      setProduct(foundProduct)
      setFormData(foundProduct)
    } else {
      setError("Produit non trouvé")
    }

    setIsLoading(false) // Set loading to false after search
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Update product in localStorage
      const products = JSON.parse(localStorage.getItem("products") || "[]")
      const updatedProducts = products.map((p: Product) =>
        p.id === params.id ? { ...formData, id: params.id, updatedAt: new Date().toISOString() } : p,
      )
      localStorage.setItem("products", JSON.stringify(updatedProducts))

      alert("Produit modifié avec succès!")
      router.push("/dashboard/products")
    } catch {
      alert("Erreur lors de la modification du produit")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      const products = JSON.parse(localStorage.getItem("products") || "[]")
      const updatedProducts = products.filter((p: Product) => p.id !== params.id)
      localStorage.setItem("products", JSON.stringify(updatedProducts))

      alert("Produit supprimé avec succès!")
      router.push("/dashboard/products")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <p>Chargement du produit...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !product) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <p className="text-red-600">{error || "Produit non trouvé"}</p>
          <Link href="/dashboard/products">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la liste
            </Button>
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/products">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Modifier le produit</h1>
              <p className="text-gray-600">{product.name}</p>
            </div>
          </div>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Supprimer
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Same form structure as add page but with pre-filled data */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Informations de base
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom commercial *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productType">Type de produit *</Label>
                  <Select
                    value={formData.productType}
                    onValueChange={(value) => handleInputChange("productType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Type de produit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="generic">Générique</SelectItem>
                      <SelectItem value="specialty">Spécialité</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sellingPrice">Prix de vente ($) *</Label>
                  <Input
                    id="sellingPrice"
                    type="number"
                    step="0.01"
                    value={formData.sellingPrice}
                    onChange={(e) => handleInputChange("sellingPrice", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-4">
            <Link href="/dashboard/products">
              <Button variant="outline" disabled={isLoading}>
                Annuler
              </Button>
            </Link>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Enregistrement..." : "Enregistrer les modifications"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
