"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  ShoppingCart,
  DollarSign,
  Calendar,
  User,
  MoreHorizontal,
  Eye,
  Printer,
  RefreshCw,
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

interface Sale {
  id: string
  date: string
  customer: string
  items: number
  total: number
  payment: string
  status: string
  cashier: string
}

// Mock data for sales
const sales = [
  {
    id: "VTE-2024-001",
    date: "2024-01-15T10:30:00",
    customer: "Marie Kabila",
    items: 3,
    total: 45.5,
    payment: "cash",
    status: "completed",
    cashier: "Admin",
  },
  {
    id: "VTE-2024-002",
    date: "2024-01-15T11:15:00",
    customer: "Jean Mukendi",
    items: 1,
    total: 12.0,
    payment: "mobile",
    status: "completed",
    cashier: "Admin",
  },
  {
    id: "VTE-2024-003",
    date: "2024-01-15T14:20:00",
    customer: "Client anonyme",
    items: 2,
    total: 28.75,
    payment: "cash",
    status: "completed",
    cashier: "Admin",
  },
  {
    id: "VTE-2024-004",
    date: "2024-01-15T15:45:00",
    customer: "Fatima Ngozi",
    items: 5,
    total: 89.25,
    payment: "card",
    status: "pending",
    cashier: "Admin",
  },
]

export default function SalesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">Terminée</Badge>
      case "pending":
        return <Badge className="bg-amber-500 text-white hover:bg-amber-600">En attente</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 text-white hover:bg-red-600">Annulée</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPaymentBadge = (payment: string) => {
    switch (payment) {
      case "cash":
        return <Badge className="bg-green-100 text-green-800 border-green-200">💵 Espèces</Badge>
      case "card":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">💳 Carte</Badge>
      case "mobile":
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">📱 Mobile Money</Badge>
      default:
        return <Badge variant="outline">{payment}</Badge>
    }
  }

  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || sale.status === statusFilter
    const matchesPayment = paymentFilter === "all" || sale.payment === paymentFilter

    return matchesSearch && matchesStatus && matchesPayment
  })

  const todayTotal = sales
    .filter((sale) => new Date(sale.date).toDateString() === new Date().toDateString())
    .reduce((sum, sale) => sum + sale.total, 0)

  const todayCount = sales.filter((sale) => new Date(sale.date).toDateString() === new Date().toDateString()).length

  const handleViewDetails = (saleId: string) => {
    window.location.href = `/dashboard/sales/details/${saleId}`
  }

const handlePrintReceipt = (sale: Sale) => {
    // Create a simple receipt format
    const receiptContent = `
      PHARMACIE RDC
      ================
      
      Reçu N°: ${sale.id}
      Date: ${new Date(sale.date).toLocaleDateString("fr-FR")}
      Heure: ${new Date(sale.date).toLocaleTimeString("fr-FR")}
      
      Client: ${sale.customer}
      Caissier: ${sale.cashier}
      
      ================
      ARTICLES
      ================
      
      Quantité: ${sale.items} article(s)
      
      ================
      TOTAL: $${sale.total.toFixed(2)}
      Mode: ${sale.payment === "cash" ? "Espèces" : sale.payment === "card" ? "Carte" : "Mobile Money"}
      ================
      
      Merci de votre visite !
    `

    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Reçu ${sale.id}</title></head>
          <body style="font-family: monospace; white-space: pre-line; padding: 20px;">
            ${receiptContent}
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const handleMarkCompleted = (saleId: string) => {
    // In a real app, this would update the database
    console.log(`[v0] Marking sale ${saleId} as completed`)
    alert(`Vente ${saleId} marquée comme terminée`)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des ventes</h1>
            <p className="text-gray-600">Suivez vos transactions et commandes</p>
          </div>
          <Link href="/dashboard/sales/new">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle vente
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">${todayTotal.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">Ventes du jour</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{todayCount}</p>
                  <p className="text-sm text-gray-600">Transactions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{sales.length}</p>
                  <p className="text-sm text-gray-600">Total ventes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{todayCount > 0 ? (todayTotal / todayCount).toFixed(2) : "0.00"}</p>
                  <p className="text-sm text-gray-600">Panier moyen</p>
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
                    placeholder="Rechercher par numéro de vente ou client..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="completed">Terminée</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="cancelled">Annulée</SelectItem>
                </SelectContent>
              </Select>

              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Paiement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les paiements</SelectItem>
                  <SelectItem value="cash">Espèces</SelectItem>
                  <SelectItem value="card">Carte</SelectItem>
                  <SelectItem value="mobile">Mobile Money</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Sales Table */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des ventes ({filteredSales.length})</CardTitle>
            <CardDescription>Liste de toutes les transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>N° Vente</TableHead>
                  <TableHead>Date & Heure</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Articles</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Paiement</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSales.map((sale) => (
                  <TableRow
                    key={sale.id}
                    className={`hover:bg-gray-50 ${
                      sale.status === "pending" ? "bg-amber-25 border-l-4 border-l-amber-400" : ""
                    }`}
                  >
                    <TableCell>
                      <div className="font-medium text-blue-700">{sale.id}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{new Date(sale.date).toLocaleDateString("fr-FR")}</div>
                        <div className="text-gray-500">
                          {new Date(sale.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">{sale.customer}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
                        {sale.items} article{sale.items > 1 ? "s" : ""}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-emerald-700 text-lg">${sale.total.toFixed(2)}</div>
                    </TableCell>
                    <TableCell>{getPaymentBadge(sale.payment)}</TableCell>
                    <TableCell>{getStatusBadge(sale.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-blue-50">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="hover:bg-blue-50 cursor-pointer"
                            onClick={() => handleViewDetails(sale.id)}
                          >
                            <Eye className="mr-2 h-4 w-4 text-blue-600" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="hover:bg-emerald-50 cursor-pointer"
                            onClick={() => handlePrintReceipt(sale)}
                          >
                            <Printer className="mr-2 h-4 w-4 text-emerald-600" />
                            Imprimer reçu
                          </DropdownMenuItem>
                          {sale.status === "pending" && (
                            <DropdownMenuItem
                              className="hover:bg-amber-50 cursor-pointer"
                              onClick={() => handleMarkCompleted(sale.id)}
                            >
                              <RefreshCw className="mr-2 h-4 w-4 text-amber-600" />
                              Marquer terminée
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
