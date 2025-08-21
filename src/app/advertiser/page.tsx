'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Eye, BarChart3, Target, DollarSign, Calendar, Shield } from 'lucide-react';

export default function AdvertiserDashboard() {
  const [campaignData, setCampaignData] = useState({
    name: '',
    category: '',
    description: '',
    targetUrl: '',
    budget: '',
    duration: ''
  });

  const handleSubmitCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de soumission de campagne
    console.log('Nouvelle campagne:', campaignData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Publicitaire</h1>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Crédits: 25,000 FC</Badge>
              <Button variant="outline" size="sm">Mon compte</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="campaigns">Mes Campagnes</TabsTrigger>
            <TabsTrigger value="create">Créer une Pub</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="billing">Facturation</TabsTrigger>
          </TabsList>

          {/* Tab Mes Campagnes */}
          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campagnes actives</CardTitle>
                  <CardDescription>Gérez vos publicités en cours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Campagne exemple */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Target className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Nouveau traitement anti-paludisme</h3>
                          <p className="text-sm text-gray-600">Laboratoire Médical Plus</p>
                          <div className="flex space-x-4 text-xs text-gray-500 mt-1">
                            <span>👁 2,340 vues</span>
                            <span>🖱 67 clics</span>
                            <span>💰 15,000 FC dépensés</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Badge variant="secondary">Actif</Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Voir
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                          <Shield className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Assurance santé famille</h3>
                          <p className="text-sm text-gray-600">Assurance Santé RDC</p>
                          <div className="flex space-x-4 text-xs text-gray-500 mt-1">
                            <span>👁 1,890 vues</span>
                            <span>🖱 45 clics</span>
                            <span>💰 12,500 FC dépensés</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Badge variant="secondary">Actif</Badge>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Voir
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab Créer une Pub */}
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Créer une nouvelle publicité</CardTitle>
                <CardDescription>Remplissez les informations de votre campagne publicitaire</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitCampaign} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="campaign-name">Nom de la campagne</Label>
                      <Input
                        id="campaign-name"
                        placeholder="Ex: Promotion médicaments hiver"
                        value={campaignData.name}
                        onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie</Label>
                      <Select onValueChange={(value) => setCampaignData({...campaignData, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="laboratoire">Laboratoire pharmaceutique</SelectItem>
                          <SelectItem value="equipement">Équipement médical</SelectItem>
                          <SelectItem value="assurance">Assurance santé</SelectItem>
                          <SelectItem value="formation">Formation médicale</SelectItem>
                          <SelectItem value="clinique">Clinique/Hôpital</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez votre produit ou service..."
                      value={campaignData.description}
                      onChange={(e) => setCampaignData({...campaignData, description: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="target-url">URL de destination</Label>
                      <Input
                        id="target-url"
                        type="url"
                        placeholder="https://votre-site.com"
                        value={campaignData.targetUrl}
                        onChange={(e) => setCampaignData({...campaignData, targetUrl: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget (FC)</Label>
                      <Input
                        id="budget"
                        type="number"
                        placeholder="50000"
                        value={campaignData.budget}
                        onChange={(e) => setCampaignData({...campaignData, budget: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Upload d&apos;image */}
                  <div className="space-y-2">
                    <Label>Image publicitaire</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Glissez votre image ici ou cliquez pour sélectionner</p>
                      <p className="text-xs text-gray-500">PNG, JPG jusqu&apos;à 2MB • Recommandé: 400x200px</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choisir fichier
                      </Button>
                    </div>
                  </div>

                  {/* Ciblage */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Ciblage</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Ville cible</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Toutes les villes" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Toutes les villes</SelectItem>
                            <SelectItem value="kinshasa">Kinshasa</SelectItem>
                            <SelectItem value="lubumbashi">Lubumbashi</SelectItem>
                            <SelectItem value="goma">Goma</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Durée</Label>
                        <Select onValueChange={(value) => setCampaignData({...campaignData, duration: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner durée" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">7 jours</SelectItem>
                            <SelectItem value="15">15 jours</SelectItem>
                            <SelectItem value="30">30 jours</SelectItem>
                            <SelectItem value="60">60 jours</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Position</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Standard" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard (+0 FC)</SelectItem>
                            <SelectItem value="featured">Mise en avant (+5,000 FC)</SelectItem>
                            <SelectItem value="premium">Premium top (+10,000 FC)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <p>Coût estimé: <span className="font-semibold text-gray-900">{campaignData.budget || '0'} FC</span></p>
                      <p>Impressions estimées: <span className="font-semibold text-gray-900">~{Math.round((parseInt(campaignData.budget || '0') / 10))}</span></p>
                    </div>
                    <div className="space-x-3">
                      <Button variant="outline">Aperçu</Button>
                      <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                        Lancer la campagne
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Impressions totales</p>
                      <p className="text-2xl font-bold">12,450</p>
                    </div>
                    <Eye className="h-8 w-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">+15% vs mois dernier</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Clics</p>
                      <p className="text-2xl font-bold">234</p>
                    </div>
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Taux: 1.9%</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Coût par clic</p>
                      <p className="text-2xl font-bold">45 FC</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">-8% vs objectif</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Budget restant</p>
                      <p className="text-2xl font-bold">18,500 FC</p>
                    </div>
                    <Calendar className="h-8 w-8 text-orange-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">12 jours restants</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance par campagne</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Traitement anti-paludisme</h4>
                      <p className="text-sm text-gray-600">Laboratoire Médical Plus</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">CTR: 2.1%</p>
                      <p className="text-sm font-semibold text-green-600">ROI: +125%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Assurance famille</h4>
                      <p className="text-sm text-gray-600">Assurance Santé RDC</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">CTR: 1.8%</p>
                      <p className="text-sm font-semibold text-green-600">ROI: +89%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Créer une Pub */}
          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Créer une nouvelle publicité</CardTitle>
                <CardDescription>Configurez votre campagne publicitaire</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitCampaign} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="campaign-name">Nom de la campagne</Label>
                      <Input
                        id="campaign-name"
                        placeholder="Ex: Promotion médicaments hiver"
                        value={campaignData.name}
                        onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie</Label>
                      <Select onValueChange={(value) => setCampaignData({...campaignData, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="laboratoire">Laboratoire pharmaceutique</SelectItem>
                          <SelectItem value="equipement">Équipement médical</SelectItem>
                          <SelectItem value="assurance">Assurance santé</SelectItem>
                          <SelectItem value="formation">Formation médicale</SelectItem>
                          <SelectItem value="clinique">Clinique/Hôpital</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Décrivez votre produit ou service..."
                      value={campaignData.description}
                      onChange={(e) => setCampaignData({...campaignData, description: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="target-url">URL de destination</Label>
                      <Input
                        id="target-url"
                        type="url"
                        placeholder="https://votre-site.com"
                        value={campaignData.targetUrl}
                        onChange={(e) => setCampaignData({...campaignData, targetUrl: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget total (FC)</Label>
                      <Input
                        id="budget"
                        type="number"
                        placeholder="50000"
                        value={campaignData.budget}
                        onChange={(e) => setCampaignData({...campaignData, budget: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Upload d&apos;image */}
                  <div className="space-y-2">
                    <Label>Image publicitaire</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Glissez votre image ici ou cliquez pour sélectionner</p>
                      <p className="text-xs text-gray-500">PNG, JPG jusqu&apos;à 2MB • Recommandé: 400x200px</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choisir fichier
                      </Button>
                    </div>
                  </div>

                  <div className="border-t pt-6 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <p>Coût estimé: <span className="font-semibold text-gray-900">{campaignData.budget || '0'} FC</span></p>
                      <p>Impressions estimées: <span className="font-semibold text-gray-900">~{Math.round((parseInt(campaignData.budget || '0') / 10))}</span></p>
                    </div>
                    <div className="space-x-3">
                      <Button variant="outline">Aperçu</Button>
                      <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                        Lancer la campagne
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Analytics */}
          <TabsContent value="analytics">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Analytics détaillées
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Graphiques des performances ici</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab Facturation */}
          <TabsContent value="billing">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Historique des paiements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Campagne Anti-paludisme</p>
                        <p className="text-sm text-gray-600">15 janvier 2025</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">25,000 FC</p>
                        <Badge variant="secondary">Payé</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
