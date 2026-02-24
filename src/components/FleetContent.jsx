// src/components/FleetContent.jsx
'use client';

import { motion } from 'framer-motion';
import VehicleCard from './VehicleCard.jsx';
import Link from 'next/link';
import { useState } from 'react';

export default function FleetContent({ vehicles }) {
  const [filter, setFilter] = useState('Tous');
  
  // Filtrer les véhicules selon la catégorie
  const filteredVehicles = filter === 'Tous' 
    ? vehicles 
    : vehicles.filter(v => v.categorie.toLowerCase() === filter.toLowerCase());

  if (vehicles.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 sm:py-16 md:py-20 relative bg-gradient-to-r from-blue-900/90 to-green-800/90 rounded-2xl sm:rounded-3xl shadow-xl mx-4 sm:mx-0 border border-yellow-400/20"
      >
        <p className="text-xl sm:text-2xl text-gray-200">Aucun véhicule disponible pour le moment.</p>
        <p className="text-sm sm:text-base text-gray-400 mt-2">Revenez bientôt ou contactez-nous directement.</p>
        <Link
          href="https://wa.me/243811077897"
          className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full mt-4 sm:mt-6 hover:bg-yellow-500 transition text-sm sm:text-base font-semibold"
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/>
          </svg>
          Contactez-nous sur WhatsApp
        </Link>
      </motion.div>
    );
  }

  return (
    <>
      {/* Filtres rapides - responsive */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 justify-center px-2 sm:px-0">
        {['Tous', 'Classique', 'SUV', 'Prestige'].map((filterName) => (
          <button
            key={filterName}
            onClick={() => setFilter(filterName)}
            className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-md hover:shadow-xl ${
              filter === filterName
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-gray-800/90 backdrop-blur-sm text-gray-300 hover:bg-yellow-400 hover:text-gray-900 border border-gray-700'
            }`}
          >
            {filterName}
          </button>
        ))}
      </div>

      {/* Grille des véhicules - responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
        {filteredVehicles.map((vehicle, index) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
        ))}
      </div>

      {/* Message de disponibilité - responsive */}
      {filteredVehicles.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-base sm:text-lg text-gray-400">
            Aucun véhicule dans la catégorie "{filter}"
          </p>
        </div>
      )}

      {/* Message de disponibilité - responsive */}
      <div className="mt-10 sm:mt-12 md:mt-16 text-center text-gray-400 text-xs sm:text-sm px-4">
        <p>⋆ Tous nos véhicules sont livrés avec chauffeur professionnel ⋆</p>
      </div>
    </>
  );
}