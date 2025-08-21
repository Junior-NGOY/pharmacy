'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft, Target, Users, Globe, Heart, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function AProposPage() {
  const values = [
    {
      icon: Heart,
      title: "Accessibilité",
      description: "Rendre les médicaments accessibles à tous, partout en RDC, sans distinction sociale ou géographique."
    },
    {
      icon: Shield,
      title: "Sécurité",
      description: "Garantir la qualité et l&apos;authenticité des médicaments à travers notre réseau de pharmacies certifiées."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Utiliser la technologie pour révolutionner l&apos;accès aux soins de santé en République Démocratique du Congo."
    },
    {
      icon: Users,
      title: "Proximité",
      description: "Créer un lien direct entre patients et pharmaciens pour un accompagnement personnalisé."
    }
  ];

  const team = [
    {
      name: "Dr. Jean-Marie Kabila",
      role: "Fondateur & CEO",
      bio: "Pharmacien de formation avec 15 ans d&apos;expérience dans le secteur pharmaceutique en RDC.",
      image: "/placeholder-user.jpg"
    },
    {
      name: "Marie-Claire Tshala",
      role: "Directrice Technique",
      bio: "Experte en systèmes d&apos;information pharmaceutique et ancienne de l&apos;OMS.",
      image: "/placeholder-user.jpg"
    },
    {
      name: "Patrick Mukendi",
      role: "Directeur Commercial",
      bio: "Spécialiste du développement commercial avec un réseau étendu de partenaires.",
      image: "/placeholder-user.jpg"
    },
    {
      name: "Dr. Sarah Mbuyi",
      role: "Responsable Qualité",
      bio: "Pharmacienne clinicienne, garante de la qualité des services et produits.",
      image: "/placeholder-user.jpg"
    }
  ];

  const milestones = [
    { year: "2022", event: "Création de PharmaRDC", description: "Lancement de l&apos;idée et premières études de marché" },
    { year: "2023", event: "Premier prototype", description: "Développement de la plateforme et partenariats initiaux" },
    { year: "2024", event: "Lancement officiel", description: "Mise en service avec 50 pharmacies partenaires" },
    { year: "2025", event: "Expansion nationale", description: "500+ pharmacies partenaires dans 25 villes" }
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
                À propos de <span className="text-emerald-600">PharmaRDC</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Nous sommes une startup congolaise dédiée à révolutionner l&apos;accès aux médicaments 
                en République Démocratique du Congo grâce à la technologie et à un réseau de pharmacies partenaires.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="h-6 w-6 text-emerald-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Notre Mission</h2>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  Faciliter l&apos;accès aux médicaments pour tous les Congolais en connectant patients, 
                  pharmacies et professionnels de santé sur une plateforme digitale moderne et sécurisée.
                </p>
                <p className="text-gray-600 mb-8">
                  Face aux défis géographiques et logistiques de la RDC, nous utilisons la technologie 
                  pour créer un écosystème pharmaceutique plus efficace, transparent et accessible à tous.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">500+</div>
                    <div className="text-sm text-gray-600">Pharmacies partenaires</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">50,000+</div>
                    <div className="text-sm text-gray-600">Utilisateurs actifs</div>
                  </div>
                </div>
              </div>
              <div className="lg:pl-12">
                <div className="bg-emerald-100 rounded-2xl p-8">
                  <Globe className="h-16 w-16 text-emerald-600 mb-6" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Vision 2030</h3>
                  <p className="text-gray-600">
                    Devenir la référence en matière d&apos;accès aux médicaments en Afrique centrale, 
                    en étendant notre modèle aux pays voisins et en contribuant à l&apos;amélioration 
                    de la santé publique régionale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Les principes qui guident notre action quotidienne et nos décisions stratégiques.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Parcours</h2>
              <p className="text-lg text-gray-600">L&apos;évolution de PharmaRDC depuis sa création</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-200"></div>
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start space-x-6">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="text-lg font-bold text-emerald-600">{milestone.year}</span>
                          <h3 className="text-xl font-semibold text-gray-900">{milestone.event}</h3>
                        </div>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Équipe</h2>
              <p className="text-lg text-gray-600">
                Des professionnels passionnés au service de la santé en RDC
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-10 w-10 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-emerald-600 font-medium text-sm mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
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
              Rejoignez notre mission
            </h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              Ensemble, construisons un avenir où chaque Congolais a accès aux médicaments 
              dont il a besoin, quand il en a besoin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                Devenir partenaire
              </Button>
              <Link href="/carrieres">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                  Voir nos offres d&apos;emploi
                </Button>
              </Link>
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
        </div>
      </footer>
    </div>
  );
}
