"use client"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Plus,
  Minus,
  Search,
  ShoppingCart,
  User,
  CreditCard,
  Smartphone,
  Banknote,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"

// Mock data for products
const products = [
  { id: 1, name: "Paracétamol 500mg", price: 2.5, stock: 150, barcode: "3401597404054" },
  { id: 2, name: "Amoxicilline 250mg", price: 12.0, stock: 8, barcode: "3401597404061" },
  { id: 3, name: "Ibuprofène 400mg", price: 4.2, stock: 75, barcode: "3401597404078" },
  { id: 4, name: "Vitamine C 1000mg", price: 8.5, stock: 200, barcode: "3401597404085" },
]

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  total: number
}

export default function NewSalePage() {
  useEffect(() => {
    console.log("[v0] NEW SALE PAGE: Component mounted successfully")
    console.log("[v0] NEW SALE PAGE: This is the POS interface, not sale details")
  }, [])

  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [customerName, setCustomerName] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [amountPaid, setAmountPaid] = useState("")

  const filteredProducts = products.filter(
    (product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.barcode.includes(searchTerm),
  )

  const addToCart = (product: (typeof products)[0]) => {
    const existingItem = cart.find((item) => item.id === product.id)

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item,
        ),
      )
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          total: product.price,
        },
      ])
    }
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }

    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity, total: newQuantity * item.price } : item)),
    )
  }

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.total, 0)
  const tax = subtotal * 0.16 // 16% TVA
  const total = subtotal + tax
  const change = amountPaid ? Number.parseFloat(amountPaid) - total : 0

  const handleCompleteSale = () => {
    if (cart.length === 0) {
      alert("Veuillez ajouter des articles au panier")
      return
    }

    if (!paymentMethod) {
      alert("Veuillez sélectionner un mode de paiement")
      return
    }

    // TODO: Implement actual sale processing
    console.log("Sale data:", {
      customer: customerName || "Client anonyme",
      items: cart,
      subtotal,
      tax,
      total,
      paymentMethod,
      amountPaid: Number.parseFloat(amountPaid || "0"),
      change,
    })

    alert("Vente enregistrée avec succès!")

    // Reset form
    setCart([])
    setCustomerName("")
    setPaymentMethod("")
    setAmountPaid("")
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <strong>DEBUG:</strong> Page de nouvelle vente (POS) chargée correctement
        </div>

        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/sales">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nouvelle vente</h1>
            <p className="text-gray-600">Point de vente - Caisse</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Search & Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Rechercher des produits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher par nom ou code-barres..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            <Card>
              <CardHeader>
                <CardTitle>Produits disponibles</CardTitle>
                <CardDescription>Cliquez sur un produit pour l&apos;ajouter au panier</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className={`p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                        product.stock <= 10 ? "bg-orange-50 border-orange-200" : ""
                      }`}
                      onClick={() => addToCart(product)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-gray-500">{product.barcode}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-lg font-bold text-emerald-600">${product.price}</span>
                            <Badge
                              variant={product.stock > 20 ? "secondary" : product.stock > 10 ? "outline" : "secondary"}
                              className={
                                product.stock <= 5
                                  ? "bg-red-100 text-red-700 border-red-200"
                                  : product.stock <= 10
                                    ? "bg-orange-100 text-orange-700 border-orange-200"
                                    : product.stock <= 20
                                      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                      : "bg-green-100 text-green-700 border-green-200"
                              }
                            >
                              Stock: {product.stock}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" className="ml-2">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cart & Checkout */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Client
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="customer">Nom du client (optionnel)</Label>
                  <Input
                    id="customer"
                    placeholder="Nom du client..."
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Cart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Panier ({cart.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Panier vide</p>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-500">
                            ${item.price} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="ml-2 font-medium text-sm">${item.total.toFixed(2)}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment */}
            {cart.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Paiement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Totals */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sous-total:</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>TVA (16%):</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-2">
                    <Label>Mode de paiement</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">
                          <div className="flex items-center">
                            <Banknote className="w-4 h-4 mr-2" />
                            Espèces
                          </div>
                        </SelectItem>
                        <SelectItem value="card">
                          <div className="flex items-center">
                            <CreditCard className="w-4 h-4 mr-2" />
                            Carte bancaire
                          </div>
                        </SelectItem>
                        <SelectItem value="mobile">
                          <div className="flex items-center">
                            <Smartphone className="w-4 h-4 mr-2" />
                            Mobile Money
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Amount Paid (for cash) */}
                  {paymentMethod === "cash" && (
                    <div className="space-y-2">
                      <Label htmlFor="amountPaid">Montant reçu</Label>
                      <Input
                        id="amountPaid"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(e.target.value)}
                      />
                      {change > 0 && <p className="text-sm text-green-600">Monnaie à rendre: ${change.toFixed(2)}</p>}
                      {change < 0 && amountPaid && <p className="text-sm text-red-600">Montant insuffisant</p>}
                    </div>
                  )}

                  {/* Complete Sale Button */}
                  <Button
                    onClick={handleCompleteSale}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    size="lg"
                    disabled={!paymentMethod || (paymentMethod === "cash" && change < 0)}
                  >
                    Finaliser la vente
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
