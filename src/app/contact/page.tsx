'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MessageCircle, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pharmacyName: '',
    message: '',
    subject: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Message envoyé !</h1>
          <p className="text-xl text-gray-600 mb-8">
            Merci pour votre message. Notre équipe vous recontactera dans les plus brefs délais.
          </p>
          <div className="space-x-4">
            <Link href="/">
              <Button>Retour à l&apos;accueil</Button>
            </Link>
            <Link href="/tarifs">
              <Button variant="outline">Voir nos tarifs</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

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
              Contactez notre équipe
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Une question sur nos services ? Besoin d&apos;une démonstration personnalisée ? 
              Notre équipe d&apos;experts est là pour vous accompagner.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">
                    Envoyez-nous un message
                  </CardTitle>
                  <p className="text-gray-600">
                    Remplissez le formulaire ci-dessous et nous vous recontacterons rapidement.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <Input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Votre nom complet"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Téléphone
                        </label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+243 123 456 789"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom de la pharmacie
                        </label>
                        <Input
                          type="text"
                          name="pharmacyName"
                          value={formData.pharmacyName}
                          onChange={handleInputChange}
                          placeholder="Pharmacie XYZ (optionnel)"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sujet de votre demande *
                      </label>
                      <select
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="general">Question générale</option>
                        <option value="demo">Demande de démonstration</option>
                        <option value="pricing">Informations tarifs</option>
                        <option value="technical">Support technique</option>
                        <option value="partnership">Partenariat</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Votre message *
                      </label>
                      <Textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Décrivez votre demande en détail..."
                        rows={6}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                      ) : (
                        <Send className="w-5 h-5 mr-2" />
                      )}
                      {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Autres moyens de nous contacter
              </h3>

              <div className="space-y-6">
                {[
                  {
                    icon: Phone,
                    title: "Téléphone",
                    info: "+243 900 000 000",
                    description: "Lun-Ven 8h-18h",
                    color: "bg-blue-100 text-blue-600"
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    info: "contact@pharmardc.com",
                    description: "Réponse sous 2h",
                    color: "bg-emerald-100 text-emerald-600"
                  },
                  {
                    icon: MessageCircle,
                    title: "Chat en direct",
                    info: "Support instantané",
                    description: "Disponible 24/7",
                    color: "bg-purple-100 text-purple-600"
                  },
                  {
                    icon: MapPin,
                    title: "Adresse",
                    info: "Avenue de la Libération",
                    description: "Kinshasa, RDC",
                    color: "bg-orange-100 text-orange-600"
                  }
                ].map((contact, index) => (
                  <motion.div
                    key={contact.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 ${contact.color} rounded-lg flex items-center justify-center`}>
                            <contact.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{contact.title}</h4>
                            <p className="text-emerald-600 font-medium">{contact.info}</p>
                            <p className="text-gray-500 text-sm">{contact.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 space-y-4">
                <h4 className="font-semibold text-gray-900">Actions rapides :</h4>
                <div className="space-y-3">
                  <Link href="/tarifs" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Badge className="mr-3 bg-emerald-100 text-emerald-800">Prix</Badge>
                      Consulter nos tarifs
                    </Button>
                  </Link>
                  <Link href="/register" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      <Badge className="mr-3 bg-blue-100 text-blue-800">Essai</Badge>
                      Démarrer l&apos;essai gratuit
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Business Hours */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-emerald-600" />
                    Horaires d&apos;ouverture
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lundi - Vendredi</span>
                    <span className="font-medium">8h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Samedi</span>
                    <span className="font-medium">9h00 - 15h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dimanche</span>
                    <span className="font-medium">Fermé</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-8 mb-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">Accueil</Link>
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
