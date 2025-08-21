"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, User, Calendar, Package, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import DashboardLayout from "@/components/dashboard-layout"

interface SaleItem {
  name: string
  quantity: number
  price: number
  total: number
}

interface Sale {
  id: string
  date: string
  customer: string
  phone: string
  total: number
  payment: string
  status: string
  cashier: string
  items: SaleItem[]
}

// Mock data for sale details
const saleDetails: Record<string, Sale> = {
  "VTE-2024-001": {
    id: "VTE-2024-001",
    date: "2024-01-15T10:30:00",
    customer: "Marie Kabila",
    phone: "+243 812 345 678",
    total: 45.5,
    payment: "cash",
    status: "completed",
    cashier: "Admin",
    items: [
      { name: "Paracétamol 500mg", quantity: 2, price: 15.0, total: 30.0 },
      { name: "Vitamine C", quantity: 1, price: 12.5, total: 12.5 },
      { name: "Sirop contre la toux", quantity: 1, price: 3.0, total: 3.0 },
    ],
  },
  "VTE-2024-002": {
    id: "VTE-2024-002",
    date: "2024-01-15T11:15:00",
    customer: "Jean Mukendi",
    phone: "+243 899 876 543",
    total: 12.0,
    payment: "mobile",
    status: "completed",
    cashier: "Admin",
    items: [{ name: "Aspirine 100mg", quantity: 1, price: 12.0, total: 12.0 }],
  },
}

export default function SaleDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [sale, setSale] = useState<Sale | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const saleId = params.id as string
    console.log("[v0] Loading sale details for ID:", saleId)

    if (saleId === "new") {
      console.log("[v0] Redirecting to new sale page")
      router.replace("/dashboard/sales/new")
      return
    }

    // Simulate loading
    setTimeout(() => {
      const foundSale = saleDetails[saleId as keyof typeof saleDetails]
      setSale(foundSale || null)
      setIsLoading(false)
    }, 500)
  }, [params.id, router])

  const handlePrint = () => {
    window.print()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-500 text-white">Terminée</Badge>
      case "pending":
        return <Badge className="bg-amber-500 text-white">En attente</Badge>
      case "cancelled":
        return <Badge className="bg-red-500 text-white">Annulée</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPaymentBadge = (payment: string) => {
    switch (payment) {
      case "cash":
        return <Badge className="bg-green-100 text-green-800">💵 Espèces</Badge>
      case "card":
        return <Badge className="bg-blue-100 text-blue-800">💳 Carte</Badge>
      case "mobile":
        return <Badge className="bg-purple-100 text-purple-800">📱 Mobile Money</Badge>
      default:
        return <Badge variant="outline">{payment}</Badge>
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Chargement des détails de la vente...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!sale) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Vente introuvable</h2>
          <p className="text-gray-600 mb-6">La vente demandée n&apos;existe pas ou a été supprimée.</p>
          <Button onClick={() => router.push("/dashboard/sales")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux ventes
          </Button>
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
            <Button variant="outline" onClick={() => router.push("/dashboard/sales")} className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Détails de la vente</h1>
              <p className="text-gray-600">{sale.id}</p>
            </div>
          </div>
          <Button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-700">
            <Printer className="w-4 h-4 mr-2" />
            Imprimer reçu
          </Button>
        </div>

        {/* Sale Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Informations client
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Nom</p>
                <p className="font-medium">{sale.customer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Téléphone</p>
                <p className="font-medium">{sale.phone}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
                Informations vente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Date et heure</p>
                <p className="font-medium">
                  {new Date(sale.date).toLocaleDateString("fr-FR")} à{" "}
                  {new Date(sale.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Caissier</p>
                <p className="font-medium">{sale.cashier}</p>
              </div>
              <div className="flex space-x-2">
                {getStatusBadge(sale.status)}
                {getPaymentBadge(sale.payment)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Items */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2 text-purple-600" />
              Articles vendus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead className="text-center">Quantité</TableHead>
                  <TableHead className="text-right">Prix unitaire</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sale.items.map((item: SaleItem, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium">${item.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Separator className="my-4" />

            <div className="flex justify-end">
              <div className="text-right space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-medium">Total:</span>
                  <span className="text-2xl font-bold text-emerald-700">${sale.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
