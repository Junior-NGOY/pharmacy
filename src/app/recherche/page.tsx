'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, MapPin, Clock, Phone, Star, Filter, ArrowLeft, TrendingUp, History, X } from 'lucide-react';
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

// Données mock étendues pour la démonstration
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
  },
  {
    id: '4',
    name: 'Amoxicilline',
    brand: 'Clamoxyl',
    price: 4500,
    stock: 32,
    dosage: '500mg',
    form: 'Gélule',
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
    id: '5',
    name: 'Ibuprofène',
    brand: 'Advil',
    price: 3200,
    stock: 28,
    dosage: '400mg',
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
  },
  {
    id: '6',
    name: 'Aspirine',
    brand: 'Aspégic',
    price: 2200,
    stock: 41,
    dosage: '500mg',
    form: 'Poudre',
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
  }
];

// Données pour les suggestions intelligentes
const popularSearches = [
  'Paracétamol', 'Amoxicilline', 'Ibuprofène', 'Aspirine', 'Vitamine C',
  'Oméprazole', 'Métronidazole', 'Ciprofloxacine'
];

const symptomToMedication: Record<string, string[]> = {
  'mal de tête': ['Paracétamol', 'Aspirine', 'Ibuprofène'],
  'fièvre': ['Paracétamol', 'Ibuprofène', 'Aspirine'],
  'douleur': ['Ibuprofène', 'Paracétamol', 'Aspirine'],
  'infection': ['Amoxicilline', 'Ciprofloxacine', 'Métronidazole'],
  'rhume': ['Paracétamol', 'Vitamine C'],
  'grippe': ['Paracétamol', 'Ibuprofène', 'Vitamine C']
};

const medicationAliases: Record<string, string> = {
  'paracetamol': 'Paracétamol',
  'dolipran': 'Paracétamol',
  'aspirin': 'Aspirine',
  'ibuprofen': 'Ibuprofène',
  'advil': 'Ibuprofène'
};

export default function RecherchePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<Medication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [filterOpen, setFilterOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);

  // Fonction pour normaliser et corriger les termes de recherche
  const normalizeSearchTerm = (term: string): string => {
    const lowercased = term.toLowerCase().trim();
    return medicationAliases[lowercased] || term;
  };

  // Fonction pour générer des suggestions intelligentes
  const generateSuggestions = (query: string): string[] => {
    if (!query || query.length < 2) return [];
    
    const lowercased = query.toLowerCase();
    const suggestions: string[] = [];
    
    // Recherche dans les médicaments
    mockMedications.forEach(med => {
      if (med.name.toLowerCase().includes(lowercased) || 
          med.brand.toLowerCase().includes(lowercased)) {
        if (!suggestions.includes(med.name)) {
          suggestions.push(med.name);
        }
        if (!suggestions.includes(med.brand)) {
          suggestions.push(med.brand);
        }
      }
    });
    
    // Recherche par symptômes
    Object.entries(symptomToMedication).forEach(([symptom, medications]) => {
      if (symptom.includes(lowercased)) {
        suggestions.push(`${symptom} (symptôme)`);
        medications.forEach(med => {
          if (!suggestions.includes(med)) {
            suggestions.push(med);
          }
        });
      }
    });
    
    // Recherches populaires
    popularSearches.forEach(search => {
      if (search.toLowerCase().includes(lowercased) && !suggestions.includes(search)) {
        suggestions.push(search);
      }
    });
    
    return suggestions.slice(0, 8); // Limiter à 8 suggestions
  };

  // Recherche intelligente améliorée
  const performSearch = async (query: string) => {
    setIsLoading(true);
    setShowSuggestions(false);
    
    // Ajouter à l'historique
    if (query.trim() && !searchHistory.includes(query.trim())) {
      setSearchHistory(prev => [query.trim(), ...prev.slice(0, 9)]); // Garder 10 dernières recherches
    }
    
    // Simuler un délai d'API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (query.trim()) {
      const normalizedQuery = normalizeSearchTerm(query);
      let filtered: Medication[] = [];
      
      // Recherche directe par nom/marque
      filtered = mockMedications.filter(med => 
        med.name.toLowerCase().includes(normalizedQuery.toLowerCase()) ||
        med.brand.toLowerCase().includes(normalizedQuery.toLowerCase())
      );
      
      // Si pas de résultats, rechercher par symptômes
      if (filtered.length === 0) {
        const queryLower = query.toLowerCase();
        Object.entries(symptomToMedication).forEach(([symptom, medications]) => {
          if (queryLower.includes(symptom)) {
            medications.forEach(medName => {
              const found = mockMedications.filter(med => 
                med.name.toLowerCase().includes(medName.toLowerCase())
              );
              filtered.push(...found);
            });
          }
        });
      }
      
      // Supprimer les doublons
      const uniqueResults = filtered.filter((med, index, self) => 
        self.findIndex(m => m.id === med.id) === index
      );
      
      setResults(uniqueResults);
    } else {
      setResults([]);
    }
    
    setIsLoading(false);
  };

  // Gestion des suggestions en temps réel
  const handleInputChange = (value: string) => {
    setSearchTerm(value);
    if (value.length >= 2) {
      const newSuggestions = generateSuggestions(value);
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Effectuer la recherche au chargement et quand le terme change
  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
    
    // Charger l'historique depuis localStorage
    const savedHistory = localStorage.getItem('pharmardc_search_history');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, [searchParams]);

  // Sauvegarder l'historique
  useEffect(() => {
    localStorage.setItem('pharmardc_search_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

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

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(searchTerm)}`);
      performSearch(searchTerm);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    const cleanSuggestion = suggestion.replace(' (symptôme)', '');
    setSearchTerm(cleanSuggestion);
    setShowSuggestions(false);
    router.push(`/recherche?q=${encodeURIComponent(cleanSuggestion)}`);
    performSearch(cleanSuggestion);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-CD', {
      style: 'currency',
      currency: 'CDF'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec recherche intelligente */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </Link>
            
            <div className="flex-1 max-w-2xl relative">
              <form onSubmit={handleSearch}>
                <div className="flex gap-2 p-2 bg-gray-50 rounded-lg">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                    <Input
                      ref={searchRef}
                      value={searchTerm}
                      onChange={(e) => handleInputChange(e.target.value)}
                      onFocus={() => {
                        if (searchTerm.length >= 2) setShowSuggestions(true);
                      }}
                      onBlur={() => {
                        // Delay hiding suggestions to allow for click
                        setTimeout(() => setShowSuggestions(false), 200);
                      }}
                      placeholder="Rechercher un médicament, symptôme..."
                      className="pl-10 border-0 bg-white focus-visible:ring-0"
                    />
                  </div>
                  <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                    Rechercher
                  </Button>
                </div>
              </form>

              {/* Suggestions intelligentes */}
              {showSuggestions && (suggestions.length > 0 || searchHistory.length > 0) && (
                <Card className="absolute top-full left-0 right-0 mt-1 max-h-96 overflow-y-auto z-50 shadow-lg">
                  <CardContent className="p-2">
                    {suggestions.length > 0 && (
                      <div className="mb-3">
                        <div className="flex items-center gap-2 px-2 py-1 text-xs font-medium text-gray-500">
                          <Search className="w-3 h-3" />
                          Suggestions
                        </div>
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => selectSuggestion(suggestion)}
                            className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded flex items-center gap-3 transition-colors"
                          >
                            <Search className="w-4 h-4 text-gray-400" />
                            <span className="flex-1">
                              {suggestion.includes('(symptôme)') ? (
                                <span>
                                  <span className="text-blue-600">{suggestion.replace(' (symptôme)', '')}</span>
                                  <span className="text-xs text-gray-500 ml-2">symptôme</span>
                                </span>
                              ) : (
                                suggestion
                              )}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {searchHistory.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between px-2 py-1">
                          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                            <History className="w-3 h-3" />
                            Recherches récentes
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSearchHistory([])}
                            className="h-6 px-2 text-xs text-gray-400 hover:text-gray-600"
                          >
                            Effacer
                          </Button>
                        </div>
                        {searchHistory.slice(0, 5).map((historyItem, index) => (
                          <button
                            key={index}
                            onClick={() => selectSuggestion(historyItem)}
                            className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded flex items-center gap-3 transition-colors group"
                          >
                            <History className="w-4 h-4 text-gray-400" />
                            <span className="flex-1">{historyItem}</span>
                            <X 
                              className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSearchHistory(prev => prev.filter(item => item !== historyItem));
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Recherches populaires - affiché quand pas de recherche */}
          {!searchParams.get('q') && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Recherches populaires</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchTerm(search);
                      router.push(`/recherche?q=${encodeURIComponent(search)}`);
                      performSearch(search);
                    }}
                    className="text-xs"
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          )}
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
