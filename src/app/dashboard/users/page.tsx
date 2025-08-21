"use client"

import { useState } from "react"
import { Search, Plus, User, Phone, Mail, Shield, MoreHorizontal, Edit, Trash2, Eye, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import DashboardLayout from "@/components/dashboard-layout"

// Mock data for users with roles
const users = [
  {
    id: 1,
    name: "Dr. Marie Kabila",
    email: "marie.kabila@pharmacie.cd",
    phone: "+243 123 456 789",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15",
    createdAt: "2023-06-15",
    permissions: ["manage_users", "manage_products", "manage_sales", "view_analytics"],
  },
  {
    id: 2,
    name: "Jean Mukendi",
    email: "jean.mukendi@pharmacie.cd",
    phone: "+243 987 654 321",
    role: "pharmacien",
    status: "active",
    lastLogin: "2024-01-14",
    createdAt: "2023-08-20",
    permissions: ["manage_products", "manage_sales", "view_analytics"],
  },
  {
    id: 3,
    name: "Fatima Ngozi",
    email: "fatima.ngozi@pharmacie.cd",
    phone: "+243 555 123 456",
    role: "vendeur",
    status: "active",
    lastLogin: "2024-01-15",
    createdAt: "2023-09-10",
    permissions: ["manage_sales"],
  },
  {
    id: 4,
    name: "Pierre Tshisekedi",
    email: "pierre.t@pharmacie.cd",
    phone: "+243 444 789 123",
    role: "vendeur",
    status: "inactive",
    lastLogin: "2023-12-20",
    createdAt: "2023-11-05",
    permissions: ["manage_sales"],
  },
]

const roleLabels = {
  admin: "Administrateur",
  pharmacien: "Pharmacien",
  vendeur: "Vendeur",
  comptable: "Comptable",
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
            <Shield className="w-3 h-3 mr-1" />
            Administrateur
          </Badge>
        )
      case "pharmacien":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <UserCheck className="w-3 h-3 mr-1" />
            Pharmacien
          </Badge>
        )
      case "vendeur":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <User className="w-3 h-3 mr-1" />
            Vendeur
          </Badge>
        )
      case "comptable":
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            <User className="w-3 h-3 mr-1" />
            Comptable
          </Badge>
        )
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Actif</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactif</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Suspendu</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      roleLabels[user.role as keyof typeof roleLabels]?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des utilisateurs</h1>
            <p className="text-gray-600">Gérez les utilisateurs et leurs rôles dans le système</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un utilisateur
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{users.length}</p>
                  <p className="text-sm text-gray-600">Total utilisateurs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <UserCheck className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{users.filter((u) => u.status === "active").length}</p>
                  <p className="text-sm text-gray-600">Utilisateurs actifs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{users.filter((u) => u.role === "admin").length}</p>
                  <p className="text-sm text-gray-600">Administrateurs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="w-8 h-8 text-orange-600" />
                <div>
                  <p className="text-2xl font-bold">{users.filter((u) => u.role === "vendeur").length}</p>
                  <p className="text-sm text-gray-600">Vendeurs</p>
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
                placeholder="Rechercher par nom, email, téléphone ou rôle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des utilisateurs ({filteredUsers.length})</CardTitle>
            <CardDescription>Gérez les accès et permissions des utilisateurs</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Dernière connexion</TableHead>
                  <TableHead>Date de création</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-gray-500">ID: {user.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 mr-1 text-gray-400" />
                          {user.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 mr-1 text-gray-400" />
                          {user.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm">{new Date(user.lastLogin).toLocaleDateString("fr-FR")}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{new Date(user.createdAt).toLocaleDateString("fr-FR")}</div>
                    </TableCell>
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
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Gérer permissions
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
