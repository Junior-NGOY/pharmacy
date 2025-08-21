"use client"

import type React from "react"

import { useState } from "react"
import { Shield, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Basic validation - in real app, this would be API call
      if (email && password.length >= 6) {
        // Store auth state in localStorage (in real app, use proper auth tokens)
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("userEmail", email)

        router.push("/dashboard")
      } else {
        setError("Email et mot de passe requis (min. 6 caractères)")
      }
    } catch {
      setError("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">PharmaRDC</span>
          </Link>
          <p className="text-gray-600 mt-2">Espace Pharmacie</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Connexion</CardTitle>
            <CardDescription>Connectez-vous à votre espace de gestion</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">{error}</div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input id="remember" type="checkbox" className="rounded border-gray-300" disabled={isLoading} />
                  <Label htmlFor="remember" className="text-sm">
                    Se souvenir de moi
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700">
                  Mot de passe oublié ?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Connexion..." : "Se connecter"}
              </Button>
            </form>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-xs text-blue-700 font-medium">Demo:</p>
              <p className="text-xs text-blue-600">Email: admin@pharmacie.com</p>
              <p className="text-xs text-blue-600">Mot de passe: 123456</p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <Link href="/register" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Créer un compte
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
