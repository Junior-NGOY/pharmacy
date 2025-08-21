"use client"

import { useState } from "react"
import { Search, Plus, User, Phone, Mail, MapPin, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DashboardLayout from "@/components/dashboard-layout"

// Mock data for customers
const customers = [
  {
    id: 1,
    name: "Marie Kabila",
    email: "marie.kabila@email.cd",
    phone: "+243 123 456 789",
    address: "123 Avenue de la Paix, Kinshasa",
    totalPurchases: 245.5,
    lastVisit: "2024-01-15",
    visits: 12,
    status: "active",
  },
  {
    id: 2,
    name: "Jean Mukendi",
    email: "jean.mukendi@email.cd",
    phone: "+243 987 654 321",
    address: "456 Boulevard du 30 Juin, Kinshasa",
    totalPurchases: 89.25,
    lastVisit: "2024-01-10",
    visits: 5,
    status: "active",
  },
  {
    id: 3,
    name: "Fatima Ngozi",
    email: "fatima.ngozi@email.cd",
    phone: "+243 555 123 456",
    address: "789 Rue de la Liberté, Kinshasa",
    totalPurchases: 456.75,
    lastVisit: "2024-01-12",
    visits: 18,
    status: "vip",
  },
  {
    id: 4,
    name: "Pierre Tshisekedi",
    email: "pierre.t@email.cd",
    phone: "+243 444 789 123",
    address: "321 Avenue Mobutu, Kinshasa",
    totalPurchases: 12.0,
    lastVisit: "2023-12-20",
    visits: 2,
    status: "inactive",
  },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "vip":
        return <Badge className="bg-purple-100 text-purple-800">VIP</Badge>
      case "active":
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>
      case "inactive":
        return <Badge variant="secondary">Inactif</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des clients</h1>
            <p className="text-gray-600">Gérez votre base de données clients</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un client
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{customers.length}</p>
                  <p className="text-sm text-gray-600">Total clients</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{customers.filter((c) => c.status === "active").length}</p>
                  <p className="text-sm text-gray-600">Clients actifs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{customers.filter((c) => c.status === "vip").length}</p>
                  <p className="text-sm text-gray-600">Clients VIP</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">
                    ${(customers.reduce((sum, c) => sum + c.totalPurchases, 0) / customers.length).toFixed(0)}
                  </p>
                  <p className="text-sm text-gray-600">Panier moyen</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher par nom, email ou téléphone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des clients ({filteredCustomers.length})</CardTitle>
            <CardDescription>Gérez vos relations clients</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Adresse</TableHead>
                  <TableHead>Achats totaux</TableHead>
                  <TableHead>Visites</TableHead>
                  <TableHead>Dernière visite</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-gray-500">ID: {customer.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 mr-1 text-gray-400" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1 text-gray-400" />
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                        <span className="truncate max-w-32">{customer.address}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">${customer.totalPurchases.toFixed(2)}</div>
                    </TableCell>
                    <TableCell>{customer.visits}</TableCell>
                    <TableCell>
                      <div className="text-sm">{new Date(customer.lastVisit).toLocaleDateString("fr-FR")}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir profil
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
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
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
