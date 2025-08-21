import { Package, ShoppingCart, Users, TrendingUp, AlertTriangle, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import PWAInstallPrompt from "@/components/pwa-install-prompt"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <PWAInstallPrompt />

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Aperçu de votre pharmacie</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ventes du jour</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,350</div>
              <p className="text-xs text-muted-foreground">+20.1% par rapport à hier</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produits en stock</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+5 nouveaux produits</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">+12% ce mois-ci</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients actifs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground">+201 depuis le mois dernier</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Accès rapide aux fonctionnalités principales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/products/add">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Package className="w-4 h-4 mr-2" />
                  Ajouter un produit
                </Button>
              </Link>
              <Link href="/dashboard/sales/new">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Nouvelle vente
                </Button>
              </Link>
              <Link href="/dashboard/customers">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Ajouter un client
                </Button>
              </Link>
              <Link href="/dashboard/analytics">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Voir les statistiques
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                Alertes
              </CardTitle>
              <CardDescription>Notifications importantes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-red-800">Stock faible</p>
                  <p className="text-xs text-red-600">5 produits ont un stock inférieur à 10 unités</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-orange-800">Expiration proche</p>
                  <p className="text-xs text-orange-600">12 produits expirent dans les 30 prochains jours</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-blue-800">Commandes en attente</p>
                  <p className="text-xs text-blue-600">3 commandes fournisseurs en attente de réception</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>Dernières transactions et modifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Vente - Paracétamol 500mg</p>
                  <p className="text-xs text-gray-500">Il y a 5 minutes • $12.50</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Package className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Stock mis à jour - Amoxicilline</p>
                  <p className="text-xs text-gray-500">Il y a 15 minutes • +50 unités</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nouveau client - Marie Kabila</p>
                  <p className="text-xs text-gray-500">Il y a 1 heure</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
