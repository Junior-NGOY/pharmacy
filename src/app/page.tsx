'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Shield, MapPin, Phone, Mail, ArrowRight, Star, Clock, DollarSign, CheckCircle, User, Quote, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Données des témoignages
  const testimonials = [
    {
      id: 1,
      name: "Dr. Marie Kumbi",
      role: "Pharmacienne",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      comment: "PharmaRDC m&apos;a vraiment facilité la gestion de ma pharmacie. Le système est intuitif et le support client excellent."
    },
    {
      id: 2,
      name: "Jean-Paul Mbuyi", 
      role: "Patient",
      avatar: "/placeholder-user.jpg",
      rating: 5,
      comment: "Grâce à cette plateforme, je trouve facilement les médicaments dont j&apos;ai besoin près de chez moi. Un gain de temps énorme !"
    },
    {
      id: 3,
      name: "Pharmacie Centrale",
      role: "Partenaire",
      avatar: "/placeholder-logo.png",
      rating: 5,
      comment: "Depuis qu&apos;on utilise PharmaRDC, notre visibilité a augmenté de 300% et nos ventes aussi. Je recommande vivement !"
    }
  ];

  // Données des pharmacies partenaires
  const partnerPharmacies = [
    { name: "Pharmacie Centrale", logo: "/placeholder-logo.png" },
    { name: "Pharma Plus", logo: "/placeholder-logo.png" },
    { name: "Pharmacie du Peuple", logo: "/placeholder-logo.png" },
    { name: "MedExpress", logo: "/placeholder-logo.png" },
    { name: "Pharmacie Moderne", logo: "/placeholder-logo.png" },
    { name: "Vita Santé", logo: "/placeholder-logo.png" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PharmaRDC</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#recherche" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Recherche
              </a>
              <a href="#pharmacies" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Pharmacies
              </a>
              <Link href="/tarifs" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Tarifs
              </Link>
              <a href="#contact" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Contact
              </a>
              <Link href="/login">
                <Button variant="outline" size="sm">Connexion</Button>
              </Link>
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Link href="/login">
                <Button variant="outline" size="sm">Connexion</Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <a 
                  href="#recherche" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Recherche
                </a>
                <a 
                  href="#pharmacies" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Pharmacies
                </a>
                <Link 
                  href="/tarifs" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tarifs
                </Link>
                <a 
                  href="#contact" 
                  className="text-gray-600 hover:text-emerald-600 transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 fade-in-up">
                Trouvez vos <span className="gradient-text">médicaments</span> rapidement
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                La première plateforme de recherche de médicaments en RDC. 
                Localisez instantanément les pharmacies qui ont vos produits en stock.
              </p>
              
              {/* Search Form */}
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Rechercher un médicament (ex: Paracétamol, Amoxicilline...)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 text-lg border-2 border-emerald-200 focus:border-emerald-500"
                  />
                </div>
                <Button type="submit" size="lg" className="h-12 px-8 btn-primary">
                  <Search className="mr-2 h-5 w-5" />
                  Rechercher
                </Button>
              </form>

              <p className="text-sm text-gray-500 mb-8">
                🔍 Recherches populaires: Paracétamol, Amoxicilline, Aspirine, Doliprane
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">500+</div>
                  <div className="text-sm text-gray-600">Pharmacies partenaires</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">15K+</div>
                  <div className="text-sm text-gray-600">Médicaments référencés</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">50K+</div>
                  <div className="text-sm text-gray-600">Utilisateurs actifs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-gray-600">Service disponible</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comment ça marche */}
        <section id="comment-ca-marche" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Comment ça marche ?
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  En 3 étapes simples, trouvez vos médicaments et gagnez du temps
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Étape 1 */}
                <div className="text-center feature-card p-8 rounded-2xl border border-gray-100 hover:border-emerald-200">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-600 mb-2">1</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Recherchez</h3>
                  <p className="text-gray-600">
                    Tapez le nom de votre médicament dans la barre de recherche. 
                    Notre système intelligent vous trouve les meilleures correspondances.
                  </p>
                </div>

                {/* Étape 2 */}
                <div className="text-center feature-card p-8 rounded-2xl border border-gray-100 hover:border-blue-200">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Localisez</h3>
                  <p className="text-gray-600">
                    Consultez la liste des pharmacies qui ont votre produit en stock, 
                    avec distances, prix et horaires d&apos;ouverture.
                  </p>
                </div>

                {/* Étape 3 */}
                <div className="text-center feature-card p-8 rounded-2xl border border-gray-100 hover:border-purple-200">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600 mb-2">3</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Achetez</h3>
                  <p className="text-gray-600">
                    Rendez-vous à la pharmacie de votre choix ou réservez en ligne. 
                    C&apos;est aussi simple que ça !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Témoignages */}
        <section id="temoignages" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Ce que disent nos utilisateurs
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Plus de 50,000 personnes nous font confiance pour leurs besoins en santé
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="testimonial-card border-0 shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <Quote className="h-8 w-8 text-emerald-600 mr-3" />
                        <div className="flex text-yellow-400">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-6 italic">
                        &ldquo;{testimonial.comment}&rdquo;
                      </p>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                          <User className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-600">{testimonial.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Pharmacies Partenaires */}
        <section id="pharmacies" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Nos pharmacies partenaires
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Nous travaillons avec les meilleures pharmacies de la RDC pour vous garantir 
                  qualité et disponibilité
                </p>
              </div>

              {/* Carrousel de logos */}
              <div className="relative overflow-hidden">
                <div className="flex animate-scroll">
                  {partnerPharmacies.concat(partnerPharmacies).map((pharmacy, index) => (
                    <div key={index} className="flex-shrink-0 mx-8">
                      <div className="w-32 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">{pharmacy.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center mt-12">
                <p className="text-gray-600 mb-6">
                  Vous êtes pharmacien ? Rejoignez notre réseau et augmentez votre visibilité
                </p>
                <Button size="lg" variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white">
                  Devenir partenaire
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Pourquoi choisir PharmaRDC ?
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Une solution complète pour tous vos besoins pharmaceutiques
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="feature-card bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                    <Shield className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Fiabilité garantie</h3>
                  <p className="text-gray-600">
                    Toutes nos pharmacies partenaires sont certifiées et respectent 
                    les standards de qualité les plus élevés.
                  </p>
                </div>

                <div className="feature-card bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Mise à jour temps réel</h3>
                  <p className="text-gray-600">
                    Les stocks et prix sont mis à jour en temps réel pour vous donner 
                    les informations les plus précises.
                  </p>
                </div>

                <div className="feature-card bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                    <MapPin className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Géolocalisation précise</h3>
                  <p className="text-gray-600">
                    Trouvez la pharmacie la plus proche de vous avec notre système 
                    de géolocalisation avancé.
                  </p>
                </div>

                <div className="feature-card bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Comparaison de prix</h3>
                  <p className="text-gray-600">
                    Comparez les prix entre différentes pharmacies et faites 
                    des économies sur vos achats.
                  </p>
                </div>

                <div className="feature-card bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                    <Phone className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Support client 24/7</h3>
                  <p className="text-gray-600">
                    Notre équipe de support est disponible 24h/24 pour répondre 
                    à toutes vos questions.
                  </p>
                </div>

                <div className="feature-card bg-white p-8 rounded-2xl shadow-lg">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
                    <Star className="h-6 w-6 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Avis et évaluations</h3>
                  <p className="text-gray-600">
                    Consultez les avis d&apos;autres utilisateurs pour faire le meilleur choix 
                    de pharmacie.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Prêt à commencer ?
              </h2>
              <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
                Rejoignez les milliers d&apos;utilisateurs qui font confiance à PharmaRDC 
                pour leurs besoins en santé.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                  <Shield className="mr-2 h-5 w-5" />
                  Commencer maintenant
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                  En savoir plus
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">PharmaRDC</span>
              </div>
              <p className="text-gray-400 mb-6">
                La première plateforme de recherche de médicaments en République Démocratique du Congo.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="p-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Button>
                <Button variant="ghost" size="sm" className="p-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Produits</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Recherche de médicaments</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Localisation de pharmacies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Comparateur de prix</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Application mobile</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Entreprise</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/a-propos" className="hover:text-white transition-colors">À propos</Link></li>
                <li><Link href="/carrieres" className="hover:text-white transition-colors">Carrières</Link></li>
                <li><Link href="/presse" className="hover:text-white transition-colors">Presse</Link></li>
                <li><Link href="/partenaires" className="hover:text-white transition-colors">Partenaires</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  +243821449396
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  contact@pharmardc.com
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Kinshasa, RDC
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PharmaRDC. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
