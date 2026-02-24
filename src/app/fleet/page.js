// src/app/fleet/page.js (Server Component)
import { getVehicles } from '@/lib/actions.js';
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

// Statistiques (données statiques) - responsives
const stats = [
  { label: 'Véhicules disponibles', value: '50+', icon: '🚗' },
  { label: 'Modèles récents', value: '2026', icon: '✨' },
  { label: 'Livraison gratuite', value: 'Kinshasa', icon: '📍' },
  { label: 'Chauffeurs pros', value: '24/7', icon: '⭐' },
];

// Composant asynchrone pour récupérer les données
async function VehiclesList() {
  const vehicles = await getVehicles();
  return <FleetContent vehicles={vehicles} />;
}

export default function FleetPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white relative pt-16 sm:pt-20">
      {/* Hero section responsive */}
      <div className="relative bg-gradient-to-r from-gray-900/90 via-black to-gray-900/90 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/carjordyno8.jpg"
            alt="Flotte Zua Car - Location avec chauffeur Kinshasa"
            fill
            className="object-cover opacity-40"
            priority
            quality={90}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-green-800/50"></div>
        </div>

        <div className="absolute inset-0 opacity-10 z-10 hidden sm:block">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #FDBB02 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-20 container mx-auto px-4 py-16 sm:py-20 md:py-24 lg:py-32">
          {/* Fil d'Ariane responsive */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 justify-center">
            <Link href="/" className="hover:text-yellow-400 transition">Accueil</Link>
            <span>›</span>
            <span className="text-yellow-400">Notre flotte</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 text-center drop-shadow-2xl">
            Notre Flotte
            <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-yellow-400 mt-2 sm:mt-3 md:mt-4">
              Prestige
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 text-gray-300 drop-shadow-lg px-4 bg-black/20 backdrop-blur-sm py-3 rounded-xl">
            Découvrez notre sélection de véhicules récents, propres et confortables,
            soigneusement entretenus pour votre sécurité à Kinshasa.
          </p>

          {/* Statistiques rapides - responsive */}
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

      {/* Section principale avec la liste des véhicules - responsive */}
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16 px-4">
          <span className="text-yellow-400 font-semibold text-xs sm:text-sm uppercase tracking-wider bg-yellow-400/10 px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-yellow-400/20">
            Sélectionnez votre véhicule
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-4 sm:mt-6 mb-3 sm:mb-4">
            Choisissez la voiture de vos rêves
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400">
            Tous nos véhicules sont récents, propres et entretenus avec soin.
            Chauffeur professionnel inclus dans chaque location.
          </p>
        </div>

        <Suspense fallback={<FleetLoading />}>
          <VehiclesList />
        </Suspense>
      </div>

      {/* Section CTA responsive */}
      <div className="bg-gradient-to-r from-gray-900 to-black text-white py-12 sm:py-16 md:py-20 border-t border-yellow-400/20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-4 text-white">
            Vous ne trouvez pas votre bonheur ?
          </h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Contactez-nous directement, nous avons peut-être le véhicule qu'il vous faut hors catalogue.
          </p>
          <Link
            href="https://wa.me/243811077897"
            className="inline-flex items-center gap-2 sm:gap-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-yellow-400/20 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/>
            </svg>
            Discuter sur WhatsApp
          </Link>
        </div>
      </div>
    </div>
  );
}