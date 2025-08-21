import { Save, Building, MapPin, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import DashboardLayout from "@/components/dashboard-layout"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600">Gérez les informations de votre pharmacie</p>
        </div>

        {/* Pharmacy Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Informations de la pharmacie
            </CardTitle>
            <CardDescription>Mettez à jour les informations de base de votre pharmacie</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pharmacy-name">Nom de la pharmacie</Label>
                <Input id="pharmacy-name" placeholder="Pharmacie Centrale" defaultValue="Pharmacie Centrale" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license-number">Numéro de licence</Label>
                <Input id="license-number" placeholder="PH-2024-001" defaultValue="PH-2024-001" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Description de votre pharmacie..."
                defaultValue="Pharmacie moderne située au cœur de Kinshasa, spécialisée dans les médicaments génériques et de marque."
                rows={3}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Adresse
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Rue</Label>
                  <Input id="street" placeholder="123 Avenue de la Paix" defaultValue="123 Avenue de la Paix" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input id="city" placeholder="Kinshasa" defaultValue="Kinshasa" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commune">Commune</Label>
                  <Input id="commune" placeholder="Gombe" defaultValue="Gombe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Code postal</Label>
                  <Input id="postal-code" placeholder="12345" defaultValue="12345" />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Téléphone
                  </Label>
                  <Input id="phone" placeholder="+243 123 456 789" defaultValue="+243 123 456 789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@pharmacie.cd"
                    defaultValue="contact@pharmacie.cd"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operating Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Horaires d&apos;ouverture
            </CardTitle>
            <CardDescription>Définissez vos horaires d&apos;ouverture pour chaque jour de la semaine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((day) => (
                <div key={day} className="flex items-center space-x-4">
                  <div className="w-20 text-sm font-medium">{day}</div>
                  <div className="flex items-center space-x-2">
                    <Input type="time" defaultValue="08:00" className="w-32" />
                    <span className="text-gray-500">à</span>
                    <Input type="time" defaultValue="18:00" className="w-32" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id={`closed-${day}`} className="rounded border-gray-300" />
                    <Label htmlFor={`closed-${day}`} className="text-sm">
                      Fermé
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Save className="w-4 h-4 mr-2" />
            Enregistrer les modifications
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
