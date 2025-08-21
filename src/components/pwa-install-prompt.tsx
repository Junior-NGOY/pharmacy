"use client"

import { useState, useEffect } from "react"
import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      console.log("User accepted the install prompt")
    } else {
      console.log("User dismissed the install prompt")
    }

    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    setDeferredPrompt(null)
  }

  if (!showInstallPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80">
      <Card className="shadow-lg border-emerald-200">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-1">Installer PharmaRDC</h3>
              <p className="text-xs text-gray-600 mb-3">
                Installez l&apos;application pour un accès rapide et des fonctionnalités hors ligne.
              </p>
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleInstallClick} className="bg-emerald-600 hover:bg-emerald-700 text-xs">
                  <Download className="w-3 h-3 mr-1" />
                  Installer
                </Button>
                <Button size="sm" variant="outline" onClick={handleDismiss} className="text-xs bg-transparent">
                  Plus tard
                </Button>
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={handleDismiss} className="p-1 h-auto">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
