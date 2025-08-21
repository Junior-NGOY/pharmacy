'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft, Calendar, User, Download, FileText, Image, Video, Newspaper } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function PressePage() {
  const pressReleases = [
    {
      id: 1,
      title: "PharmaRDC lève 2 millions USD pour accélérer son expansion",
      date: "15 Janvier 2024",
      category: "Financement",
      excerpt: "La startup congolaise PharmaRDC annonce une levée de fonds de série A de 2 millions USD menée par des investisseurs panafricains pour développer son réseau de pharmacies connectées.",
      image: "/placeholder.jpg",
      featured: true
    },
    {
      id: 2,
      title: "500 pharmacies partenaires : PharmaRDC franchit un cap majeur",
      date: "03 Janvier 2024",
      category: "Croissance",
      excerpt: "Moins de deux ans après son lancement, PharmaRDC compte désormais plus de 500 pharmacies partenaires à travers la République Démocratique du Congo.",
      image: "/placeholder.jpg"
    },
    {
      id: 3,
      title: "Partenariat stratégique avec l&apos;OMS pour la santé numérique",
      date: "20 Décembre 2023",
      category: "Partenariat",
      excerpt: "PharmaRDC signe un accord de collaboration avec l&apos;Organisation Mondiale de la Santé pour améliorer l&apos;accès aux médicaments essentiels en RDC.",
      image: "/placeholder.jpg"
    },
    {
      id: 4,
      title: "Prix de l&apos;Innovation Santé au Forum économique de Kinshasa",
      date: "15 Novembre 2023",
      category: "Reconnaissance",
      excerpt: "PharmaRDC remporte le prix de l&apos;Innovation Santé 2023 lors du Forum économique de Kinshasa, récompensant son impact sur l&apos;accès aux soins.",
      image: "/placeholder.jpg"
    },
    {
      id: 5,
      title: "Lancement du service de téléconsultation pharmaceutique",
      date: "28 Octobre 2023",
      category: "Produit",
      excerpt: "PharmaRDC innove avec un nouveau service de téléconsultation permettant aux patients de consulter des pharmaciens à distance via l&apos;application mobile.",
      image: "/placeholder.jpg"
    },
    {
      id: 6,
      title: "Expansion vers Lubumbashi et Mbuji-Mayi",
      date: "10 Septembre 2023",
      category: "Expansion",
      excerpt: "Après Kinshasa, PharmaRDC étend ses services vers les villes de Lubumbashi et Mbuji-Mayi avec l&apos;ouverture de nouveaux centres de distribution.",
      image: "/placeholder.jpg"
    }
  ];

  const mediaKit = [
    {
      type: "Logo",
      icon: Image,
      files: ["Logo PNG haute résolution", "Logo SVG vectoriel", "Logo monochrome"],
      size: "2.1 MB"
    },
    {
      type: "Photos",
      icon: Image,
      files: ["Photos équipe dirigeante", "Photos bureaux Kinshasa", "Photos pharmacies partenaires"],
      size: "15.6 MB"
    },
    {
      type: "Présentation",
      icon: FileText,
      files: ["Pitch deck investisseurs", "Dossier de presse complet", "Fact sheet"],
      size: "8.3 MB"
    },
    {
      type: "Vidéos",
      icon: Video,
      files: ["Vidéo présentation produit", "Témoignages clients", "Visite virtuelle"],
      size: "125 MB"
    }
  ];

  const mediaContacts = [
    {
      name: "Marie-Claire Tshala",
      role: "Directrice Communication",
      email: "marie.tshala@pharmardc.com",
      phone: "+243821449396"
    },
    {
      name: "Jean-Marie Kabila",
      role: "CEO & Fondateur",
      email: "jean.kabila@pharmardc.com",
      phone: "+243821449396"
    }
  ];

  const stats = [
    { label: "Couverture médiatique", value: "50+", description: "Articles de presse en 2023" },
    { label: "Interviews", value: "25+", description: "Interventions médiatiques" },
    { label: "Réseaux sociaux", value: "10k+", description: "Abonnés LinkedIn" },
    { label: "Communiqués", value: "15+", description: "Communiqués publiés" }
  ];

  const upcomingEvents = [
    {
      title: "African Health Summit 2024",
      date: "15-17 Mars 2024",
      location: "Lagos, Nigeria",
      description: "Panel sur l&apos;innovation pharmaceutique en Afrique"
    },
    {
      title: "Digital Health Congo",
      date: "22 Avril 2024",
      location: "Kinshasa, RDC",
      description: "Keynote sur la transformation digitale de la santé"
    },
    {
      title: "Startup Grind Kinshasa",
      date: "10 Mai 2024",
      location: "Kinshasa, RDC",
      description: "Fireside chat avec le CEO"
    }
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
                <span>`Retour à l&apos;accueil`</span>
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
                Espace <span className="text-emerald-600">Presse</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Découvrez les dernières actualités de PharmaRDC, nos communiqués de presse, 
                ressources médias et informations pour les journalistes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  <Download className="mr-2 h-5 w-5" />
                  Kit média
                </Button>
                <Button size="lg" variant="outline">
                  <User className="mr-2 h-5 w-5" />
                  Contact presse
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-1">{stat.value}</div>
                  <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Press Releases Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Communiqués de presse</h2>
              <p className="text-lg text-gray-600">Les dernières actualités et annonces de PharmaRDC</p>
            </div>
            
            {/* Featured Article */}
            {pressReleases.filter(article => article.featured).map((article) => (
              <Card key={article.id} className="mb-8 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="h-48 md:h-full bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center">
                      <Newspaper className="h-16 w-16 text-emerald-600" />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-emerald-100 text-emerald-800">{article.category}</Badge>
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {article.date}
                        </div>
                      </div>
                      <CardTitle className="text-2xl">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <div className="flex gap-4">
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                          Lire l&apos;article complet
                        </Button>
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Télécharger PDF
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}

            {/* Other Articles */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pressReleases.filter(article => !article.featured).map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        {article.date}
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 flex-1">
                        Lire plus
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Media Kit Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Kit média</h2>
              <p className="text-lg text-gray-600">Ressources visuelles et documentaires pour les journalistes</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaKit.map((kit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <kit.icon className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{kit.type}</h3>
                    <div className="space-y-2 mb-4">
                      {kit.files.map((file, fileIndex) => (
                        <div key={fileIndex} className="text-sm text-gray-600">{file}</div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mb-4">{kit.size}</div>
                    <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Download className="mr-2 h-4 w-4" />
                      Télécharger
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Événements à venir</h2>
              <p className="text-lg text-gray-600">Rencontrez notre équipe lors de ces événements</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {event.date}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-2">{event.location}</p>
                    <p className="text-gray-700">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Media Contacts */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Contacts presse</h2>
                <p className="text-lg text-gray-600">Pour toute demande d&apos;interview ou d&apos;information</p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {mediaContacts.map((contact, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-8">
                      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="h-10 w-10 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{contact.name}</h3>
                      <p className="text-emerald-600 font-medium mb-4">{contact.role}</p>
                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-2 text-gray-600">
                          <span>📧</span>
                          <a href={`mailto:${contact.email}`} className="hover:text-emerald-600">
                            {contact.email}
                          </a>
                        </div>
                        <div className="flex items-center justify-center space-x-2 text-gray-600">
                          <span>📱</span>
                          <a href={`tel:${contact.phone}`} className="hover:text-emerald-600">
                            {contact.phone}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-emerald-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Restez informés de nos actualités
            </h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter presse pour recevoir nos derniers communiqués 
              et informations exclusives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                S&apos;inscrire
              </Button>
            </div>
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
          <p className="text-gray-400 text-sm mt-2">
            Relations presse : <a href="mailto:presse@pharmardc.com" className="text-emerald-400 hover:underline">presse@pharmardc.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
