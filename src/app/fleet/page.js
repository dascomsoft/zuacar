
// src/app/fleet/page.js
import { getVehicles, getVehiclesAvailability } from '@/lib/actions.js';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FleetContent from '@/components/FleetContent.jsx';

// Composant de chargement responsive
function FleetLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl h-[350px] sm:h-[400px] lg:h-[450px] animate-pulse shadow-xl border border-gray-700">
          <div className="h-40 sm:h-44 lg:h-48 bg-gray-700 rounded-t-xl sm:rounded-t-2xl lg:rounded-t-3xl"></div>
          <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
            <div className="h-5 sm:h-6 bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 sm:h-4 bg-gray-700 rounded w-1/2"></div>
            <div className="h-16 sm:h-20 bg-gray-700 rounded"></div>
            <div className="h-8 sm:h-10 bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Statistiques
const stats = [
  { label: 'Véhicules disponibles', value: '50+', icon: '' },
  { label: 'Modèles récents', value: '2026', icon: '' },
  { label: 'Livraison gratuite', value: 'Kinshasa', icon: '' },
  { label: 'Chauffeurs pros', value: '24/7', icon: '' },
];

// Composant asynchrone pour récupérer les données
// 🔥 CORRECTION : Ajout de async et await pour searchParams
async function VehiclesList({ searchParams }) {
  // ✅ Attendre searchParams (API asynchrone dans Next.js 15)
  const params = await searchParams;
  const vehicles = await getVehicles();
  
  const selectedDate = params?.date || new Date().toISOString().split('T')[0];
  const unavailableMap = await getVehiclesAvailability(selectedDate);
  
  return <FleetContent 
    vehicles={vehicles} 
    unavailableMap={unavailableMap}
    selectedDate={selectedDate}
  />;
}

export default function FleetPage({ searchParams }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white relative pt-16 sm:pt-20">
      {/* Hero section */}
      <div className="relative bg-gradient-to-r from-gray-900/90 via-black to-gray-900/90 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/carjordyno8.jpg"
            alt="Flotte Zua Car"
            fill
            className="object-cover opacity-30"
            priority
            quality={90}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-black/80 to-gray-900/90"></div>
        </div>

        <div className="relative z-20 container mx-auto px-4 py-16 sm:py-20 md:py-24 lg:py-32">
          {/* Fil d'Ariane */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 justify-center">
            <Link href="/" className="hover:text-yellow-400 transition">Accueil</Link>
            <span>›</span>
            <span className="text-yellow-400">Flotte</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 text-center drop-shadow-2xl">
            Notre Flotte
            <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-yellow-400 mt-2 sm:mt-3 md:mt-4">
              Sélection de véhicules
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 text-gray-300 drop-shadow-lg px-4">
            Découvrez notre sélection de véhicules récents et confortables
          </p>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto px-2">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 md:p-4 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300"
              >
                <div className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">{stat.icon}</div>
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-yellow-400">{stat.value}</div>
                <div className="text-[10px] sm:text-xs md:text-sm text-gray-300 truncate">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vague décorative */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-gray-900 opacity-80" preserveAspectRatio="none">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"/>
          </svg>
        </div>
      </div>

      {/* Section principale */}
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4">
          <span className="text-yellow-400 font-semibold text-xs sm:text-sm uppercase tracking-wider bg-yellow-400/10 px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-yellow-400/20">
            Sélectionnez votre véhicule
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-4 sm:mt-6 mb-3 sm:mb-4">
            Choisissez la voiture de vos rêves
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400">
            Tous nos véhicules sont récents et entretenus avec soin.
            Chauffeur professionnel inclus.
          </p>
        </div>

        <Suspense fallback={<FleetLoading />}>
          <VehiclesList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}





























































































































































































































































