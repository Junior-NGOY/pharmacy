'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, ArrowLeft, MapPin, Clock, Users, Briefcase, Heart, Code, Stethoscope, TrendingUp, Send, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function CarrieresPage() {
  const jobs = [
    {
      id: 1,
      title: "Développeur Full-Stack Senior",
      department: "Technologie",
      location: "Kinshasa",
      type: "CDI",
      level: "Senior",
      icon: Code,
      description: "Nous recherchons un développeur expérimenté pour renforcer notre équipe technique et contribuer au développement de notre plateforme.",
      requirements: [
        "5+ ans d&apos;expérience en développement web",
        "Maîtrise de React, Node.js, et TypeScript",
        "Expérience avec les bases de données PostgreSQL",
        "Connaissance des pratiques DevOps"
      ],
      benefits: [
        "Salaire compétitif",
        "Assurance santé",
        "Formation continue",
        "Équipement fourni"
      ]
    },
    {
      id: 2,
      title: "Pharmacien Responsable Qualité",
      department: "Santé",
      location: "Kinshasa",
      type: "CDI",
      level: "Senior",
      icon: Stethoscope,
      description: "Rejoignez notre équipe médicale pour superviser la qualité des services pharmaceutiques et former nos partenaires.",
      requirements: [
        "Diplôme en pharmacie reconnu en RDC",
        "3+ ans d&apos;expérience en pharmacie hospitalière",
        "Connaissance des réglementations pharmaceutiques",
        "Excellent sens du relationnel"
      ],
      benefits: [
        "Mission à impact social",
        "Formation en management",
        "Véhicule de fonction",
        "Primes de performance"
      ]
    },
    {
      id: 3,
      title: "Responsable Commercial Régional",
      department: "Commercial",
      location: "Lubumbashi",
      type: "CDI",
      level: "Middle",
      icon: TrendingUp,
      description: "Développez notre réseau de pharmacies partenaires dans la région du Katanga et supervisez les équipes commerciales locales.",
      requirements: [
        "Formation commerciale ou pharmaceutique",
        "Expérience dans le développement de réseaux",
        "Connaissance du marché pharmaceutique RDC",
        "Mobilité géographique"
      ],
      benefits: [
        "Commission attractive",
        "Véhicule + carburant",
        "Logement fourni",
        "Évolution rapide"
      ]
    },
    {
      id: 4,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "CDI",
      level: "Middle",
      icon: Heart,
      description: "Concevez des expériences utilisateur exceptionnelles pour nos applications mobile et web, en pensant aux spécificités locales.",
      requirements: [
        "3+ ans d&apos;expérience en design UI/UX",
        "Maîtrise de Figma et Adobe Creative Suite",
        "Portfolio avec projets mobiles",
        "Sensibilité aux enjeux d&apos;accessibilité"
      ],
      benefits: [
        "Travail à distance possible",
        "Matériel design fourni",
        "Conférences et formations",
        "Horaires flexibles"
      ]
    },
    {
      id: 5,
      title: "Responsable Partenariats",
      department: "Business Development",
      location: "Kinshasa",
      type: "CDI",
      level: "Senior",
      icon: Users,
      description: "Développez et maintenez nos relations avec les pharmacies, laboratoires et institutions de santé partenaires.",
      requirements: [
        "Formation en business ou santé publique",
        "Excellent réseau dans le secteur pharmaceutique",
        "Compétences en négociation",
        "Français et Lingala courant"
      ],
      benefits: [
        "Poste stratégique",
        "Participation aux bénéfices",
        "Voyages d&apos;affaires",
        "Formation internationale"
      ]
    },
    {
      id: 6,
      title: "Stagiaire Marketing Digital",
      department: "Marketing",
      location: "Kinshasa",
      type: "Stage",
      level: "Junior",
      icon: TrendingUp,
      description: "Rejoignez notre équipe marketing pour apprendre les métiers du digital tout en contribuant à nos campagnes.",
      requirements: [
        "Étudiant en marketing/communication",
        "Bases en marketing digital",
        "Créativité et proactivité",
        "Disponibilité 6 mois minimum"
      ],
      benefits: [
        "Indemnité de stage",
        "Formation pratique",
        "Mentorat dédié",
        "Possibilité d&apos;embauche"
      ]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Impact Social",
      description: "Contribuez à améliorer l&apos;accès aux soins de santé pour des millions de Congolais."
    },
    {
      icon: TrendingUp,
      title: "Croissance Rapide",
      description: "Rejoignez une startup en forte croissance avec de nombreuses opportunités d&apos;évolution."
    },
    {
      icon: Users,
      title: "Équipe Passionnée",
      description: "Travaillez avec une équipe de professionnels dévoués et passionnés par leur mission."
    },
    {
      icon: Briefcase,
      title: "Formation Continue",
      description: "Bénéficiez de formations régulières pour développer vos compétences et votre carrière."
    }
  ];

  const departments = [
    { name: "Technologie", count: 12, icon: Code },
    { name: "Commercial", count: 8, icon: TrendingUp },
    { name: "Santé", count: 6, icon: Stethoscope },
    { name: "Support", count: 4, icon: Users }
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
                Rejoignez l&apos;aventure <span className="text-emerald-600">PharmaRDC</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Construisons ensemble l&apos;avenir de la santé en République Démocratique du Congo. 
                Découvrez nos opportunités de carrière dans une startup à fort impact social.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  <Briefcase className="mr-2 h-5 w-5" />
                  Voir les postes ouverts
                </Button>
                <Button size="lg" variant="outline">
                  Candidature spontanée
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {departments.map((dept, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <dept.icon className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{dept.count}</div>
                  <div className="text-sm text-gray-600">{dept.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi nous rejoindre ?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Plus qu&apos;un emploi, une mission au service de la santé publique congolaise.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Jobs Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Offres d&apos;emploi</h2>
              <p className="text-lg text-gray-600">Découvrez les postes actuellement ouverts dans notre équipe</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <job.icon className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{job.title}</CardTitle>
                          <p className="text-sm text-gray-600">{job.department}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge variant={job.type === 'CDI' ? 'default' : 'secondary'}>
                          {job.type}
                        </Badge>
                        <Badge variant="outline">{job.level}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Publié récemment</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Profil recherché :</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {job.requirements.slice(0, 2).map((req, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                            <span>{req}</span>
                          </li>
                        ))}
                        {job.requirements.length > 2 && (
                          <li className="text-emerald-600 text-xs">+ {job.requirements.length - 2} autres critères</li>
                        )}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Avantages :</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.benefits.slice(0, 3).map((benefit, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                        {job.benefits.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{job.benefits.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Send className="mr-2 h-4 w-4" />
                      Postuler maintenant
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Processus de recrutement</h2>
              <p className="text-lg text-gray-600">Un processus transparent et bienveillant</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">1. Candidature</h3>
                  <p className="text-sm text-gray-600">Envoyez votre CV et lettre de motivation</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">2. Entretien RH</h3>
                  <p className="text-sm text-gray-600">Discussion sur votre parcours et motivations</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">3. Test technique</h3>
                  <p className="text-sm text-gray-600">Évaluation de vos compétences techniques</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">4. Intégration</h3>
                  <p className="text-sm text-gray-600">Onboarding personnalisé et formation</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-emerald-600 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Vous ne trouvez pas le poste idéal ?
            </h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              Nous sommes toujours à la recherche de talents exceptionnels. 
              Envoyez-nous votre candidature spontanée !
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100">
                <Send className="mr-2 h-5 w-5" />
                Candidature spontanée
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                <ExternalLink className="mr-2 h-5 w-5" />
                Suivez-nous sur LinkedIn
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
            Pour toute question sur nos offres d&apos;emploi : <a href="mailto:carrieres@pharmardc.com" className="text-emerald-400 hover:underline">carrieres@pharmardc.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
