"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowLeft, Save, Package, Barcode, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"
import { useRouter } from "next/navigation"

const categories = [
  "Antalgique",
  "Antibiotique",
  "Anti-inflammatoire",
  "Complément",
  "Cardiovasculaire",
  "Dermatologie",
  "Gastro-entérologie",
  "Neurologie",
  "Ophtalmologie",
  "Pneumologie",
]

const suppliers = ["Pharma Plus", "MediCorp", "VitaHealth", "Global Pharma", "HealthCare Solutions"]

export default function AddProductPage() {
  console.log("[v0] AddProductPage component rendering - THIS IS THE ADD PAGE, NOT DETAILS PAGE")
  console.log("[v0] Current URL should be /dashboard/products/add")
  console.log("[v0] Window location:", typeof window !== "undefined" ? window.location.href : "SSR")

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    genericName: "",
    category: "",
    productType: "", // "specialty" or "generic"
    description: "",
    barcode: "",
    manufacturer: "",
    supplier: "", // Made optional - no required validation
    dosage: "",
    form: "",
    purchasePrice: "", // Made optional - no required validation
    sellingPrice: "",
    stock: "",
    minStock: "",
    maxStock: "", // Made optional - no required validation
    expiryDate: "",
    batchNumber: "",
    location: "",
    prescription: false,
  })

  useEffect(() => {
    console.log("[v0] AddProductPage component mounted successfully - CONFIRMED ADD PAGE")
    console.log("[v0] This should show the ADD FORM, not loading message")
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submission started")
    setIsLoading(true)

    try {
      console.log("[v0] Submitting product data:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store in localStorage for demo purposes
      const existingProducts = JSON.parse(localStorage.getItem("products") || "[]")
      const newProduct = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      existingProducts.push(newProduct)
      localStorage.setItem("products", JSON.stringify(existingProducts))

      console.log("[v0] Product saved successfully")
      alert("Produit ajouté avec succès!")
      router.push("/dashboard/products")
    } catch (error) {
      console.error("[v0] Error saving product:", error)
      alert("Erreur lors de l'ajout du produit")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    console.log(`[v0] Field ${field} changed to:`, value)
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  console.log("[v0] About to render component JSX")

  return (
    <DashboardLayout>
      <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-4">
        <p className="text-blue-800 text-sm">DEBUG: Page d&apos;ajout de produit chargée</p>
      </div>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/products">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ajouter un produit</h1>
            <p className="text-gray-600">Créez une nouvelle fiche produit</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Informations de base
              </CardTitle>
              <CardDescription>Informations principales du médicament</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom commercial *</Label>
                  <Input
                    id="name"
                    placeholder="ex: Paracétamol 500mg"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="genericName">Nom générique</Label>
                  <Input
                    id="genericName"
                    placeholder="ex: Paracétamol"
                    value={formData.genericName}
                    onChange={(e) => handleInputChange("genericName", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                <div className="space-y-2">
                  <Label htmlFor="dosage">Dosage</Label>
                  <Input
                    id="dosage"
                    placeholder="ex: 500mg"
                    value={formData.dosage}
                    onChange={(e) => handleInputChange("dosage", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="form">Forme pharmaceutique</Label>
                  <Select value={formData.form} onValueChange={(value) => handleInputChange("form", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Forme pharmaceutique" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comprime">Comprimé</SelectItem>
                      <SelectItem value="gelule">Gélule</SelectItem>
                      <SelectItem value="sirop">Sirop</SelectItem>
                      <SelectItem value="injection">Injection</SelectItem>
                      <SelectItem value="creme">Crème</SelectItem>
                      <SelectItem value="pommade">Pommade</SelectItem>
                      <SelectItem value="gouttes">Gouttes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Description du médicament, indications, posologie..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="prescription"
                  type="checkbox"
                  checked={formData.prescription}
                  onChange={(e) => handleInputChange("prescription", e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="prescription">Médicament sur ordonnance</Label>
              </div>
            </CardContent>
          </Card>

          {/* Identification */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Barcode className="w-5 h-5 mr-2" />
                Identification
              </CardTitle>
              <CardDescription>Codes et références du produit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="barcode">Code-barres</Label>
                  <Input
                    id="barcode"
                    placeholder="ex: 3401597404054"
                    value={formData.barcode}
                    onChange={(e) => handleInputChange("barcode", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batchNumber">Numéro de lot</Label>
                  <Input
                    id="batchNumber"
                    placeholder="ex: LOT2024001"
                    value={formData.batchNumber}
                    onChange={(e) => handleInputChange("batchNumber", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Fabricant</Label>
                  <Input
                    id="manufacturer"
                    placeholder="ex: Sanofi"
                    value={formData.manufacturer}
                    onChange={(e) => handleInputChange("manufacturer", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier">Fournisseur (optionnel)</Label>
                  <Select value={formData.supplier} onValueChange={(value) => handleInputChange("supplier", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un fournisseur" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier} value={supplier}>
                          {supplier}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Stock */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                Prix et stock
              </CardTitle>
              <CardDescription>Gestion des prix et des quantités</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchasePrice">Prix d&apos;achat ($) - optionnel</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.purchasePrice}
                    onChange={(e) => handleInputChange("purchasePrice", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sellingPrice">Prix de vente ($) *</Label>
                  <Input
                    id="sellingPrice"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.sellingPrice}
                    onChange={(e) => handleInputChange("sellingPrice", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock initial *</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    value={formData.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minStock">Stock minimum</Label>
                  <Input
                    id="minStock"
                    type="number"
                    placeholder="0"
                    value={formData.minStock}
                    onChange={(e) => handleInputChange("minStock", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStock">Stock maximum (optionnel)</Label>
                  <Input
                    id="maxStock"
                    type="number"
                    placeholder="0"
                    value={formData.maxStock}
                    onChange={(e) => handleInputChange("maxStock", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Date d&apos;expiration</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Emplacement</Label>
                  <Input
                    id="location"
                    placeholder="ex: Étagère A-1"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Link href="/dashboard/products">
              <Button variant="outline" disabled={isLoading}>
                Annuler
              </Button>
            </Link>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Enregistrement..." : "Enregistrer le produit"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
