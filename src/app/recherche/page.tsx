'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, MapPin, Clock, Phone, Star, Filter, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Types pour les données
interface Pharmacy {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  rating: number;
  distance: number;
  isOpen: boolean;
  hours: string;
}

interface Medication {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  pharmacy: Pharmacy;
  dosage?: string;
  form?: string; // comprimé, sirop, etc.
}

// Données mock pour la démonstration
const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Paracétamol',
    brand: 'Doliprane',
    price: 2500,
    stock: 45,
    dosage: '500mg',
    form: 'Comprimé',
    pharmacy: {
      id: 'p1',
      name: 'Pharmacie Centrale',
      address: '123 Avenue Lumumba',
      city: 'Kinshasa',
      phone: '+243 123 456 789',
      rating: 4.5,
      distance: 1.2,
      isOpen: true,
      hours: '8h-20h'
    }
  },
  {
    id: '2',
    name: 'Paracétamol',
    brand: 'Efferalgan',
    price: 3000,
    stock: 23,
    dosage: '500mg',
    form: 'Comprimé effervescent',
    pharmacy: {
      id: 'p2',
      name: 'Pharmacie du Fleuve',
      address: '456 Boulevard du 30 Juin',
      city: 'Kinshasa',
      phone: '+243 987 654 321',
      rating: 4.2,
      distance: 2.1,
      isOpen: false,
      hours: '8h-18h'
    }
  },
  {
    id: '3',
    name: 'Paracétamol',
    brand: 'Dafalgan',
    price: 2800,
    stock: 67,
    dosage: '1000mg',
    form: 'Comprimé',
    pharmacy: {
      id: 'p3',
      name: 'Pharmacie Moderne',
      address: '789 Avenue de la Paix',
      city: 'Kinshasa',
      phone: '+243 555 123 456',
      rating: 4.8,
      distance: 0.8,
      isOpen: true,
      hours: '24h/24'
    }
  }
];

export default function RecherchePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [filterOpen, setFilterOpen] = useState(false);

  // Simuler une recherche API
  const performSearch = async (query: string) => {
    setIsLoading(true);
    
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (query.trim()) {
      // Filtrer les médicaments mock selon le terme de recherche
      const filtered = mockMedications.filter(med => 
        med.name.toLowerCase().includes(query.toLowerCase()) ||
        med.brand.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
    
    setIsLoading(false);
  };

  // Effectuer la recherche au chargement et quand le terme change
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [searchParams]);

  // Trier les résultats
  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'distance':
        return a.pharmacy.distance - b.pharmacy.distance;
      case 'rating':
        return b.pharmacy.rating - a.pharmacy.rating;
      case 'stock':
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(searchTerm)}`);
      performSearch(searchTerm);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-CD', {
      style: 'currency',
      currency: 'CDF'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec recherche */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </Link>
            
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="flex gap-2 p-2 bg-gray-50 rounded-lg">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher un médicament..."
                    className="pl-10 border-0 bg-white focus-visible:ring-0"
                  />
                </div>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                  Rechercher
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Résultats header et filtres */}
        {(results.length > 0 || isLoading) && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Résultats pour &quot;{searchParams.get('q')}&quot;
              </h1>
              <p className="text-gray-600">
                {isLoading ? 'Recherche...' : `${results.length} médicament${results.length > 1 ? 's' : ''} trouvé${results.length > 1 ? 's' : ''}`}
              </p>
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="price">Prix</SelectItem>
                  <SelectItem value="rating">Note pharmacie</SelectItem>
                  <SelectItem value="stock">Stock disponible</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </div>
          </div>
        )}

        {/* État de chargement */}
        {isLoading && (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4"
            />
            <p className="text-gray-600">Recherche en cours...</p>
          </div>
        )}

        {/* Résultats */}
        {!isLoading && results.length > 0 && (
          <div className="space-y-4">
            {sortedResults.map((medication, index) => (
              <motion.div
                key={medication.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Info médicament */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900">
                              {medication.name}
                            </h3>
                            <p className="text-gray-600">
                              {medication.brand} • {medication.dosage} • {medication.form}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-emerald-600">
                              {formatPrice(medication.price)}
                            </div>
                            <Badge variant={medication.stock > 10 ? "default" : "destructive"}>
                              {medication.stock > 0 ? `${medication.stock} en stock` : 'Rupture'}
                            </Badge>
                          </div>
                        </div>

                        {/* Info pharmacie */}
                        <div className="bg-gray-50 rounded-lg p-4 mt-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900">
                                  {medication.pharmacy.name}
                                </h4>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm text-gray-600">
                                    {medication.pharmacy.rating}
                                  </span>
                                </div>
                                <Badge variant={medication.pharmacy.isOpen ? "default" : "secondary"}>
                                  {medication.pharmacy.isOpen ? 'Ouvert' : 'Fermé'}
                                </Badge>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {medication.pharmacy.address} • {medication.pharmacy.distance}km
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {medication.pharmacy.hours}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Phone className="w-4 h-4" />
                                  {medication.pharmacy.phone}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Voir sur la carte
                              </Button>
                              <Button 
                                className="bg-emerald-600 hover:bg-emerald-700"
                                size="sm"
                                disabled={medication.stock === 0}
                              >
                                {medication.stock > 0 ? 'Réserver' : 'Indisponible'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Aucun résultat */}
        {!isLoading && results.length === 0 && searchParams.get('q') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun résultat trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              Essayez avec d&apos;autres termes de recherche ou vérifiez l&apos;orthographe
            </p>
            <Button onClick={() => router.push('/')} variant="outline">
              Nouvelle recherche
            </Button>
          </motion.div>
        )}

        {/* État initial */}
        {!isLoading && results.length === 0 && !searchParams.get('q') && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Recherchez un médicament
            </h3>
            <p className="text-gray-600">
              Utilisez la barre de recherche pour trouver des médicaments disponibles
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
