'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, MapPin, Phone, Mail, Star, Users, Building, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PartenairesPage() {
  // Données des pharmacies partenaires (étendue)
  const partnerPharmacies = [
    {
      id: 1,
      name: "Pharmacie Centrale",
      logo: "/placeholder-logo.png",
      address: "Avenue Kasa-Vubu, Kalamu, Kinshasa",
      phone: "+243 123 456 789",
      email: "contact@pharmacie-centrale.cd",
      rating: 4.8,
      reviews: 324,
      services: ["Médicaments génériques", "Conseil pharmaceutique", "Livraison à domicile"],
      horaires: "Lun-Sam: 8h-20h, Dim: 9h-18h",
      verified: true,
      description: "Plus de 15 ans d&apos;expérience dans la distribution pharmaceutique en RDC."
    },
    {
      id: 2,
      name: "Pharma Plus",
      logo: "/placeholder-logo.png", 
      address: "Boulevard du 30 Juin, Gombe, Kinshasa",
      phone: "+243 987 654 321",
      email: "info@pharmaplus.cd",
      rating: 4.9,
      reviews: 156,
      services: ["Médicaments spécialisés", "Matériel médical", "Consultation gratuite"],
      horaires: "Lun-Ven: 7h30-19h30, Sam: 8h-16h",
      verified: true,
      description: "Pharmacie moderne spécialisée dans les médicaments importés et le matériel médical."
    },
    {
      id: 3,
      name: "Pharmacie du Peuple", 
      logo: "/placeholder-logo.png",
      address: "Avenue de la Liberation, Lemba, Kinshasa",
      phone: "+243 555 123 456",
      email: "pharmaciedupeuple@gmail.com",
      rating: 4.6,
      reviews: 89,
      services: ["Prix abordables", "Médicaments essentiels", "Service 24h/24"],
      horaires: "24h/24, 7j/7",
      verified: true,
      description: "Pharmacie communautaire dédiée à rendre les médicaments accessibles à tous."
    },
    {
      id: 4,
      name: "MedExpress",
      logo: "/placeholder-logo.png",
      address: "Avenue Sendwe, Lubumbashi, Haut-Katanga", 
      phone: "+243 444 789 123",
      email: "contact@medexpress.cd",
      rating: 4.7,
      reviews: 203,
      services: ["Livraison express", "Commande en ligne", "Paiement mobile"],
      horaires: "Lun-Sam: 8h-21h, Dim: 10h-17h",
      verified: true,
      description: "La première pharmacie digitale du Katanga avec service de livraison express."
    },
    {
      id: 5,
      name: "Pharmacie Moderne",
      logo: "/placeholder-logo.png",
      address: "Avenue Mbuya Mwamba, Mbuji-Mayi, Kasaï-Oriental",
      phone: "+243 666 456 789", 
      email: "moderne@pharmacie.cd",
      rating: 4.5,
      reviews: 127,
      services: ["Médicaments pédiatriques", "Vaccins", "Tests de diagnostic"],
      horaires: "Lun-Ven: 8h-18h, Sam: 8h-15h",
      verified: true,
      description: "Expertise en santé infantile et médecine préventive depuis 2010."
    },
    {
      id: 6,
      name: "Vita Santé",
      logo: "/placeholder-logo.png",
      address: "Place de l&apos;Indépendance, Bukavu, Sud-Kivu",
      phone: "+243 777 321 654",
      email: "vitasante@health.cd", 
      rating: 4.8,
      reviews: 178,
      services: ["Produits naturels", "Compléments alimentaires", "Cosmétiques"],
      horaires: "Lun-Sam: 9h-19h, Dim: fermé",
      verified: true,
      description: "Spécialiste des produits de santé naturels et du bien-être."
    }
  ];

  const stats = [
    { label: "Pharmacies partenaires", value: "500+", icon: Building },
    { label: "Clients satisfaits", value: "50,000+", icon: Users },
    { label: "Médicaments référencés", value: "10,000+", icon: CheckCircle },
    { label: "Villes couvertes", value: "25+", icon: MapPin }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span>Retour à l&apos;accueil</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">PharmaRDC</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Nos <span className="text-emerald-600">Partenaires</span> Pharmacies
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Découvrez notre réseau de pharmacies partenaires certifiées à travers la RDC, 
                garantissant qualité et proximité pour vos besoins en santé.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <stat.icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pharmacies List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partnerPharmacies.map((pharmacy) => (
                <Card key={pharmacy.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Building className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{pharmacy.name}</h3>
                          {pharmacy.verified && (
                            <div className="flex items-center text-green-600 text-sm">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Certifié
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{pharmacy.rating}</span>
                        <span className="text-sm text-gray-500">({pharmacy.reviews})</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{pharmacy.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start space-x-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{pharmacy.address}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>{pharmacy.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{pharmacy.email}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-sm text-gray-900 mb-2">Services:</h4>
                      <div className="flex flex-wrap gap-1">
                        {pharmacy.services.map((service, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm text-gray-600 mb-4">
                      <strong>Horaires:</strong> {pharmacy.horaires}
                    </div>

                    <Button className="w-full" size="sm">
                      Voir les produits disponibles
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-emerald-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Vous êtes pharmacien ?
            </h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              Rejoignez notre réseau de pharmacies partenaires et bénéficiez d&apos;une visibilité accrue 
              auprès de milliers de patients en RDC.
            </p>
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
              Devenir partenaire
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">PharmaRDC</span>
          </div>
          <p className="text-gray-400">&copy; 2024 PharmaRDC. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
