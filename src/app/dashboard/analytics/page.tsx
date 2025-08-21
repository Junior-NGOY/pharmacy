"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingCart, Calendar, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts"
import DashboardLayout from "@/components/dashboard-layout"

// Mock data for analytics
const salesData = [
  { month: "Jan", sales: 4000, profit: 2400, orders: 45 },
  { month: "Fév", sales: 3000, profit: 1398, orders: 38 },
  { month: "Mar", sales: 2000, profit: 9800, orders: 52 },
  { month: "Avr", sales: 2780, profit: 3908, orders: 41 },
  { month: "Mai", sales: 1890, profit: 4800, orders: 35 },
  { month: "Jun", sales: 2390, profit: 3800, orders: 48 },
]

const topProducts = [
  { name: "Paracétamol 500mg", sales: 245, revenue: 612.5, growth: 12.5 },
  { name: "Amoxicilline 250mg", sales: 189, revenue: 2268, growth: -5.2 },
  { name: "Ibuprofène 400mg", sales: 156, revenue: 655.2, growth: 8.7 },
  { name: "Vitamine C 1000mg", sales: 134, revenue: 1139, growth: 15.3 },
  { name: "Aspirine 100mg", sales: 98, revenue: 294, growth: -2.1 },
]

const categoryData = [
  { name: "Antalgiques", value: 35, color: "#10b981" },
  { name: "Antibiotiques", value: 25, color: "#3b82f6" },
  { name: "Compléments", value: 20, color: "#8b5cf6" },
  { name: "Anti-inflammatoires", value: 15, color: "#f59e0b" },
  { name: "Autres", value: 5, color: "#ef4444" },
]

const dailySales = [
  { day: "Lun", sales: 450, customers: 23 },
  { day: "Mar", sales: 380, customers: 19 },
  { day: "Mer", sales: 520, customers: 28 },
  { day: "Jeu", sales: 490, customers: 25 },
  { day: "Ven", sales: 680, customers: 35 },
  { day: "Sam", sales: 720, customers: 38 },
  { day: "Dim", sales: 320, customers: 16 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  const totalRevenue = salesData.reduce((sum, item) => sum + item.sales, 0)
  const totalProfit = salesData.reduce((sum, item) => sum + item.profit, 0)
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0)
  const avgOrderValue = totalRevenue / totalOrders

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analyses et statistiques</h1>
            <p className="text-gray-600">Suivez les performances de votre pharmacie</p>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 jours</SelectItem>
                <SelectItem value="30d">30 jours</SelectItem>
                <SelectItem value="90d">3 mois</SelectItem>
                <SelectItem value="1y">1 an</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chiffre d&apos;affaires</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5% vs mois dernier
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bénéfices</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalProfit.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8.2% vs mois dernier
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <div className="flex items-center text-xs text-red-600">
                <TrendingDown className="w-3 h-3 mr-1" />
                -2.1% vs mois dernier
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Panier moyen</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +5.7% vs mois dernier
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Évolution des ventes</CardTitle>
              <CardDescription>Chiffre d&apos;affaires et bénéfices par mois</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} />
                    <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} dot={{ fill: "#3b82f6" }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Daily Sales */}
          <Card>
            <CardHeader>
              <CardTitle>Ventes par jour</CardTitle>
              <CardDescription>Performance de la semaine courante</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailySales}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="sales" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Category Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Répartition par catégorie</CardTitle>
              <CardDescription>Ventes par type de produit</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 space-y-2">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Produits les plus vendus</CardTitle>
              <CardDescription>Top 5 des meilleures ventes ce mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-sm font-bold text-emerald-600">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-gray-500">{product.sales} unités vendues</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">${product.revenue.toFixed(2)}</div>
                      <div className="flex items-center text-xs">
                        {product.growth > 0 ? (
                          <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1 text-red-600" />
                        )}
                        <span className={product.growth > 0 ? "text-green-600" : "text-red-600"}>
                          {product.growth > 0 ? "+" : ""}
                          {product.growth.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Clients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Nouveaux clients</span>
                <Badge className="bg-green-100 text-green-800">+15</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Clients fidèles</span>
                <Badge className="bg-blue-100 text-blue-800">127</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Taux de rétention</span>
                <Badge className="bg-purple-100 text-purple-800">78%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Inventaire
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Produits en stock</span>
                <Badge variant="outline">1,234</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Stock faible</span>
                <Badge variant="destructive">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Expire bientôt</span>
                <Badge className="bg-orange-100 text-orange-800">8</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Marge bénéficiaire</span>
                <Badge className="bg-green-100 text-green-800">32%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rotation stock</span>
                <Badge className="bg-blue-100 text-blue-800">4.2x</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Satisfaction client</span>
                <Badge className="bg-purple-100 text-purple-800">4.8/5</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
