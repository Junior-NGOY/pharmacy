"use client"

import type React from "react"
import { useState } from "react"
import { Shield, Eye, EyeOff, Mail, Building, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const [formData, setFormData] = useState({
    // Informations de la pharmacie
    pharmacyName: "",
    address: "",
    city: "",
    province: "",
    phone: "",
    licenseNumber: "",

    // Informations du propriétaire
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",

    // Informations de connexion
    email: "",
    password: "",
    confirmPassword: "",

    // Acceptation des conditions
    acceptTerms: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Validation
      if (formData.password !== formData.confirmPassword) {
        setError("Les mots de passe ne correspondent pas")
        return
      }

      if (formData.password.length < 6) {
        setError("Le mot de passe doit contenir au moins 6 caractères")
        return
      }

      if (!formData.acceptTerms) {
        setError("Vous devez accepter les conditions d'utilisation")
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(true)

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch {
      setError("Erreur lors de l'inscription. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Inscription réussie !</h2>
            <p className="text-gray-600 mb-4">
              Votre demande d&apos;inscription a été soumise avec succès. Notre équipe va examiner votre dossier et vous
              contacter sous 24-48h.
            </p>
            <p className="text-sm text-gray-500">Redirection vers la page de connexion...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-8 px-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">PharmaRDC</span>
          </Link>
          <p className="text-gray-600 mt-2">Rejoignez notre réseau de pharmacies</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Inscription Pharmacie</CardTitle>
            <CardDescription>Créez votre compte pour rejoindre le réseau PharmaRDC</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
              )}

              {/* Informations de la pharmacie */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                  <Building className="w-5 h-5 text-emerald-600" />
                  <span>Informations de la pharmacie</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pharmacyName">Nom de la pharmacie *</Label>
                    <Input
                      id="pharmacyName"
                      name="pharmacyName"
                      placeholder="Pharmacie Centrale"
                      value={formData.pharmacyName}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">Numéro de licence *</Label>
                    <Input
                      id="licenseNumber"
                      name="licenseNumber"
                      placeholder="PH-2024-001"
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Adresse complète *</Label>
                  <Textarea
                    id="address"
                    name="address"
                    placeholder="123 Avenue de la Paix, Commune de Gombe"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ville *</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Kinshasa"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="province">Province *</Label>
                    <Input
                      id="province"
                      name="province"
                      placeholder="Kinshasa"
                      value={formData.province}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone de la pharmacie *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+243 XX XXX XXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Informations du propriétaire */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                  <User className="w-5 h-5 text-emerald-600" />
                  <span>Informations du propriétaire/gérant</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Nom complet *</Label>
                    <Input
                      id="ownerName"
                      name="ownerName"
                      placeholder="Dr. Jean Mukendi"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ownerPhone">Téléphone personnel *</Label>
                    <Input
                      id="ownerPhone"
                      name="ownerPhone"
                      type="tel"
                      placeholder="+243 XX XXX XXXX"
                      value={formData.ownerPhone}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerEmail">Email personnel</Label>
                  <Input
                    id="ownerEmail"
                    name="ownerEmail"
                    type="email"
                    placeholder="jean.mukendi@email.com"
                    value={formData.ownerEmail}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Informations de connexion */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <span>Informations de connexion</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email de connexion *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="pharmacie@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conditions d'utilisation */}
              <div className="flex items-start space-x-2">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 mt-1"
                  disabled={isLoading}
                  required
                />
                <Label htmlFor="acceptTerms" className="text-sm leading-relaxed">
                  J&apos;accepte les{" "}
                  <Link href="/terms" className="text-emerald-600 hover:text-emerald-700">
                    conditions d&apos;utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700">
                    politique de confidentialité
                  </Link>{" "}
                  de PharmaRDC *
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Inscription en cours..." : "Créer mon compte"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Vous avez déjà un compte ?{" "}
                <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Se connecter
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
