'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X, Star, Zap, Shield, Phone, Mail, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: "Starter",
    price: "0",
    period: "30 premiers jours",
    description: "Parfait pour découvrir PharmaRDC",
    badge: "Essai gratuit",
    badgeColor: "bg-green-100 text-green-800",
    buttonText: "Commencer gratuitement",
    buttonVariant: "outline" as const,
    features: [
      "Gestion de base des stocks",
      "Interface client simple", 
      "5 produits maximum",
      "Support par email",
      "Formation vidéo incluse",
      "Rapports de base"
    ],
    limitations: [
      "Pas de livraison express",
      "Pas d'API avancée",
      "Support limité aux heures ouvrables"
    ]
  },
  {
    name: "Professional",
    price: "99",
    period: "par mois",
    description: "Pour les pharmacies en croissance",
    badge: "Le plus populaire",
    badgeColor: "bg-blue-100 text-blue-800",
    buttonText: "Choisir Professional",
    buttonVariant: "default" as const,
    features: [
      "Gestion complète des stocks",
      "Interface client avancée",
      "Produits illimités",
      "Support prioritaire 24/7",
      "Formation personnalisée",
      "Rapports détaillés",
      "Intégration API",
      "Gestion des livraisons",
      "Notifications SMS/Email",
      "Backup automatique"
    ],
    limitations: []
  },
  {
    name: "Enterprise",
    price: "199",
    period: "par mois",
    description: "Pour les grandes chaînes de pharmacies",
    badge: "Solution complète",
    badgeColor: "bg-purple-100 text-purple-800",
    buttonText: "Contacter l'équipe",
    buttonVariant: "outline" as const,
    features: [
      "Toutes les fonctionnalités Pro",
      "Multi-pharmacies (jusqu'à 10)",
      "Tableau de bord consolidé",
      "Support dédié 24/7",
      "Formation sur site",
      "Rapports personnalisés",
      "API entreprise",
      "Intégrations personnalisées",
      "Conformité réglementaire",
      "Sécurité renforcée",
      "Gestionnaire de compte dédié"
    ],
    limitations: []
  }
];

const faqs = [
  {
    question: "Puis-je changer de plan à tout moment ?",
    answer: "Absolument ! Vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement et vous ne payez que la différence au prorata."
  },
  {
    question: "Que se passe-t-il après l'essai gratuit ?",
    answer: "Après vos 30 jours gratuits, vous pouvez choisir le plan qui vous convient. Si vous ne sélectionnez aucun plan, votre compte sera suspendu mais vos données seront conservées pendant 90 jours."
  },
  {
    question: "Y a-t-il des frais d'installation ?",
    answer: "Non, l'installation et la configuration initiale sont entièrement gratuites pour tous les plans. Notre équipe vous accompagne dans la mise en place sans frais supplémentaires."
  },
  {
    question: "Proposez-vous des remises pour les contrats annuels ?",
    answer: "Oui ! Bénéficiez de 2 mois gratuits en choisissant la facturation annuelle. Contactez notre équipe commerciale pour les détails."
  },
  {
    question: "Le support technique est-il inclus ?",
    answer: "Oui, tous nos plans incluent le support technique. Le plan Starter bénéficie d'un support par email, tandis que les plans Pro et Enterprise ont accès au support prioritaire 24/7."
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Absolument. Nous utilisons un chiffrement de niveau bancaire, des sauvegardes automatiques quotidiennes et respectons toutes les normes de sécurité pharmaceutique."
  }
];

export default function TarifsPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-emerald-600">
            PharmaRDC
          </Link>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="ghost">Connexion</Button>
            </Link>
            <Link href="/register">
              <Button>S&apos;inscrire</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tarifs simples et transparents
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Choisissez le plan qui correspond à votre pharmacie. 
              Commencez gratuitement, aucune carte bancaire requise.
            </p>
          </motion.div>

          {/* Billing Toggle */}
          <motion.div 
            className="flex items-center justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className={`mr-3 ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Mensuel
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-14 h-8 bg-gray-200 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                billingCycle === 'yearly' ? 'translate-x-6 bg-emerald-600' : ''
              }`} />
            </button>
            <span className={`ml-3 ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Annuel
              <Badge className="ml-2 bg-emerald-100 text-emerald-800 text-xs">-20%</Badge>
            </span>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${plan.name === 'Professional' ? 'scale-105 z-10' : ''}`}
              >
                <Card className={`h-full ${plan.name === 'Professional' ? 'border-emerald-500 shadow-xl' : 'hover:shadow-lg'} transition-all duration-300`}>
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className={plan.badgeColor}>{plan.badge}</Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold text-gray-900">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <div className="flex items-center justify-center">
                        <span className="text-4xl font-bold text-gray-900">
                          {plan.price === "0" ? "Gratuit" : `$${billingCycle === 'yearly' ? Math.round(Number(plan.price) * 0.8) : plan.price}`}
                        </span>
                        {plan.price !== "0" && (
                          <span className="text-gray-600 ml-2">/{billingCycle === 'yearly' ? 'an' : plan.period}</span>
                        )}
                      </div>
                      {billingCycle === 'yearly' && plan.price !== "0" && (
                        <div className="text-sm text-gray-500 mt-1">
                          ${plan.price}/mois facturé annuellement
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 mt-4">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Fonctionnalités incluses :</h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {plan.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Limitations :</h4>
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, i) => (
                            <li key={i} className="flex items-start">
                              <X className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-500">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-6">
                      <Link href={plan.name === 'Enterprise' ? '/contact' : '/register'}>
                        <Button 
                          className={`w-full ${plan.name === 'Professional' ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`}
                          variant={plan.buttonVariant}
                          size="lg"
                        >
                          {plan.buttonText}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Guarantee */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex items-center justify-center gap-4 text-gray-600">
              <Shield className="w-6 h-6 text-emerald-600" />
              <span>Garantie satisfait ou remboursé 30 jours</span>
              <Star className="w-6 h-6 text-emerald-600" />
              <span>Support technique inclus</span>
              <Zap className="w-6 h-6 text-emerald-600" />
              <span>Migration gratuite</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions fréquentes sur nos tarifs
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce que vous devez savoir sur nos abonnements
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  >
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg text-left">{faq.question}</CardTitle>
                      <motion.div
                        animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </div>
                  </CardHeader>
                  <motion.div
                    initial={false}
                    animate={{ 
                      height: expandedFaq === index ? 'auto' : 0,
                      opacity: expandedFaq === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <CardContent className="pt-0">
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Besoin d&apos;aide pour choisir ?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Notre équipe est là pour vous conseiller et vous aider à trouver la solution parfaite pour votre pharmacie.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              {[
                {
                  icon: Phone,
                  title: "Appel gratuit",
                  info: "+243 900 000 000",
                  description: "Lun-Ven 8h-18h"
                },
                {
                  icon: Mail,
                  title: "Email",
                  info: "tarifs@pharmardc.com",
                  description: "Réponse sous 2h"
                },
                {
                  icon: MessageCircle,
                  title: "Chat en direct",
                  info: "Support immédiat",
                  description: "Disponible maintenant"
                }
              ].map((contact, index) => (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <contact.icon className="w-12 h-12 text-emerald-200 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{contact.title}</h3>
                  <p className="text-emerald-100 font-medium">{contact.info}</p>
                  <p className="text-emerald-200 text-sm">{contact.description}</p>
                </motion.div>
              ))}
            </div>

            <Link href="/contact">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Planifier une démonstration
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-8 mb-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Accueil</Link>
            <Link href="/features" className="text-gray-300 hover:text-white transition-colors">Fonctionnalités</Link>
            <Link href="/tarifs" className="text-gray-300 hover:text-white transition-colors">Tarifs</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400">&copy; 2024 PharmaRDC. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
