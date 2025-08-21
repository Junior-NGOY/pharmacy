"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Plus,
  Package,
  AlertTriangle,
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"

// Mock data for products
const products = [
  {
    id: 1,
    name: "Paracétamol 500mg",
    category: "Antalgique",
    barcode: "3401597404054",
    stock: 150,
    minStock: 20,
    price: 2.5,
    expiryDate: "2025-06-15",
    supplier: "Pharma Plus",
    status: "active",
  },
  {
    id: 2,
    name: "Amoxicilline 250mg",
    category: "Antibiotique",
    barcode: "3401597404061",
    stock: 8,
    minStock: 15,
    price: 12.0,
    expiryDate: "2024-12-20",
    supplier: "MediCorp",
    status: "low_stock",
  },
  {
    id: 3,
    name: "Ibuprofène 400mg",
    category: "Anti-inflammatoire",
    barcode: "3401597404078",
    stock: 75,
    minStock: 25,
    price: 4.2,
    expiryDate: "2024-08-30",
    supplier: "Pharma Plus",
    status: "expiring_soon",
  },
  {
    id: 4,
    name: "Vitamine C 1000mg",
    category: "Complément",
    barcode: "3401597404085",
    stock: 200,
    minStock: 30,
    price: 8.5,
    expiryDate: "2026-03-10",
    supplier: "VitaHealth",
    status: "active",
  },
]

const categories = ["Tous", "Antalgique", "Antibiotique", "Anti-inflammatoire", "Complément", "Cardiovasculaire"]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [sortField, setSortField] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const getStatusBadge = (status: string, stock: number, minStock: number) => {
    if (stock <= minStock) {
      return <Badge className="bg-red-500 text-white hover:bg-red-600">Stock faible</Badge>
    }
    if (status === "expiring_soon") {
      return <Badge className="bg-amber-500 text-white hover:bg-amber-600">Expire bientôt</Badge>
    }
    return <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">Actif</Badge>
  }

  const handleDeleteProduct = (productId: number, productName: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer "${productName}" ?`)) {
      console.log("[v0] Deleting product:", productId)
      // TODO: Implement actual delete logic
      alert("Produit supprimé avec succès !")
    }
  }

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.barcode.includes(searchTerm)
      const matchesCategory = selectedCategory === "Tous" || product.category === selectedCategory
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "low_stock" && product.stock <= product.minStock) ||
        (statusFilter === "expiring" && product.status === "expiring_soon") ||
        (statusFilter === "active" && product.stock > product.minStock && product.status === "active")

      return matchesSearch && matchesCategory && matchesStatus
    })

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField as keyof typeof a]
        let bValue = b[sortField as keyof typeof b]

        if (typeof aValue === "string") {
          aValue = aValue.toLowerCase()
          bValue = (bValue as string).toLowerCase()
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [searchTerm, selectedCategory, statusFilter, sortField, sortDirection])

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex)

  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1)
    if (filterType === "search") setSearchTerm(value)
    if (filterType === "category") setSelectedCategory(value)
    if (filterType === "status") setStatusFilter(value)
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des produits</h1>
            <p className="text-gray-600">
              Gérez votre inventaire de médicaments ({filteredAndSortedProducts.length} produits)
            </p>
          </div>
          <Link href="/dashboard/products/add">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un produit
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Package className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{products.length}</p>
                  <p className="text-sm text-gray-600">Total produits</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">{products.filter((p) => p.stock <= p.minStock).length}</p>
                  <p className="text-sm text-gray-600">Stock faible</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{products.filter((p) => p.status === "expiring_soon").length}</p>
                  <p className="text-sm text-gray-600">Expire bientôt</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Package className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{products.reduce((sum, p) => sum + p.stock, 0)}</p>
                  <p className="text-sm text-gray-600">Unités en stock</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher par nom ou code-barres..."
                    value={searchTerm}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={selectedCategory} onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={(value) => handleFilterChange("status", value)}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="low_stock">Stock faible</SelectItem>
                  <SelectItem value="expiring">Expire bientôt</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value))
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 / page</SelectItem>
                  <SelectItem value="20">20 / page</SelectItem>
                  <SelectItem value="50">50 / page</SelectItem>
                  <SelectItem value="100">100 / page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des produits ({filteredAndSortedProducts.length})</CardTitle>
            <CardDescription>
              Affichage de {startIndex + 1} à {Math.min(endIndex, filteredAndSortedProducts.length)} sur{" "}
              {filteredAndSortedProducts.length} produits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("name")}>
                    Produit {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("category")}>
                    Catégorie {sortField === "category" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("stock")}>
                    Stock {sortField === "stock" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("price")}>
                    Prix {sortField === "price" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead className="cursor-pointer hover:bg-gray-50" onClick={() => handleSort("expiryDate")}>
                    Expiration {sortField === "expiryDate" && (sortDirection === "asc" ? "↑" : "↓")}
                  </TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentProducts.map((product) => (
                  <TableRow
                    key={product.id}
                    className={product.stock <= product.minStock ? "bg-red-50 border-l-4 border-l-red-500" : ""}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.barcode}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span
                          className={
                            product.stock <= product.minStock
                              ? "text-red-700 font-bold bg-red-100 px-2 py-1 rounded"
                              : "text-emerald-700 font-medium"
                          }
                        >
                          {product.stock}
                        </span>
                        <span className="text-gray-400">/ {product.minStock} min</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-gray-900">${product.price}</span>
                    </TableCell>
                    <TableCell>
                      <div
                        className={`text-sm ${
                          product.status === "expiring_soon"
                            ? "text-amber-700 font-medium bg-amber-50 px-2 py-1 rounded"
                            : "text-gray-600"
                        }`}
                      >
                        {new Date(product.expiryDate).toLocaleDateString("fr-FR")}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status, product.stock, product.minStock)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <Link href={`/dashboard/products/${product.id}`}>
                            <DropdownMenuItem className="hover:bg-blue-50 cursor-pointer">
                              <Eye className="mr-2 h-4 w-4 text-blue-600" />
                              Voir détails
                            </DropdownMenuItem>
                          </Link>
                          <Link href={`/dashboard/products/${product.id}`}>
                            <DropdownMenuItem className="hover:bg-emerald-50 cursor-pointer">
                              <Edit className="mr-2 h-4 w-4 text-emerald-600" />
                              Modifier
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem
                            className="text-red-600 hover:bg-red-50 cursor-pointer"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="text-sm text-gray-600">
                  Page {currentPage} sur {totalPages}
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => goToPage(1)} disabled={currentPage === 1}>
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(pageNum)}
                          className="w-8 h-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
