"use client"

import { Wifi, RefreshCw, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wifi className="w-8 h-8 text-gray-400" />
          </div>
          <CardTitle className="text-2xl">Mode hors ligne</CardTitle>
          <CardDescription>
            Vous êtes actuellement hors ligne. Certaines fonctionnalités peuvent être limitées.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600">
            <p>Vous pouvez toujours :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Consulter les données en cache</li>
              <li>Naviguer dans l&apos;application</li>
              <li>Préparer des ventes (synchronisation automatique)</li>
            </ul>
          </div>

          <div className="flex flex-col space-y-2">
            <Button onClick={() => window.location.reload()} className="bg-emerald-600 hover:bg-emerald-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Réessayer la connexion
            </Button>

            <Link href="/dashboard">
              <Button variant="outline" className="w-full bg-transparent">
                <Home className="w-4 h-4 mr-2" />
                Aller au tableau de bord
              </Button>
            </Link>
          </div>

          <div className="text-xs text-gray-500 mt-4">
            Les données seront synchronisées automatiquement une fois la connexion rétablie.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
