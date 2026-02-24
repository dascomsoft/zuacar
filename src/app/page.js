// Page d'accueil - Version Professionnelle Ultra-Responsive - Zua Car
import { getFeaturedVehicles } from '@/lib/actions.js';
import VehicleCard from '@/components/VehicleCard.jsx';
import HeroSection from '@/components/HeroSection.jsx';
import { Suspense } from 'react';
import Link from 'next/link';

// Section véhicules vedettes
async function FeaturedVehicles() {
  const vehicles = await getFeaturedVehicles();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
      {vehicles.map((vehicle, index) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-hidden bg-dark-bg text-white">
      {/* Padding-top pour éviter la superposition avec le header fixe */}
      <div className="pt-16 sm:pt-20">
        <HeroSection />
      </div>
      
      {/* Section Statistiques - responsive */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #FDBB02 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 text-yellow-400">50+</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300">Véhicules disponibles</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 text-yellow-400">100+</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300">Clients satisfaits</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 text-yellow-400">24/7</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300">Service client</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 text-yellow-400">5 ans</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300">D'expérience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section véhicules en vedette - responsive */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <span className="text-yellow-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">Notre flotte prestige</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 sm:mt-4 mb-3 sm:mb-4 md:mb-6">
              Véhicules à la une
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 px-2">
              Découvrez notre sélection de véhicules récents, propres et confortables, 
              soigneusement entretenus pour votre sécurité et votre confort.
            </p>
          </div>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-800 rounded-xl sm:rounded-2xl h-72 sm:h-80 lg:h-96 animate-pulse"></div>
              ))}
            </div>
          }>
            <FeaturedVehicles />
          </Suspense>

          <div className="text-center mt-8 sm:mt-10 md:mt-12">
            <Link
              href="/fleet"
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/20 text-sm sm:text-base"
            >
              Voir tous nos véhicules
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Section avantages - responsive */}
      <section className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <span className="text-yellow-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">Pourquoi nous choisir</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 sm:mt-4 mb-3 sm:mb-4 md:mb-6">
              Zua Car, votre compagnon de route
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 px-2">
              Nous mettons tout en œuvre pour vous offrir une expérience de location 
              exceptionnelle, alliant sécurité, confort et fiabilité.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                title: 'Sécurité garantie',
                text: 'Véhicules récents avec contrôle technique à jour, entretien rigoureux et assurance tous risques incluse.'
              },
              {
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Prix transparents',
                text: 'À partir de 50$/jour, pas de frais cachés. Devis personnalisé selon vos besoins.'
              },
              {
                icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
                title: 'Livraison gratuite',
                text: 'Nous livrons votre véhicule à votre domicile ou lieu de travail à Kinshasa, sans frais supplémentaires.'
              },
              {
                icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Support 24/7',
                text: 'Une équipe disponible 7j/7 pour répondre à vos questions et vous assister en cas de besoin.'
              }
            ].map((avantage, index) => (
              <div key={index} className="group relative bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-800">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-yellow-400/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={avantage.icon} />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-white group-hover:text-yellow-400 transition-colors">{avantage.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed">{avantage.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignages - responsive */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <span className="text-yellow-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">Témoignages</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 sm:mt-4 mb-3 sm:mb-4 md:mb-6">
              Ils nous font confiance
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 px-2">
              Découvrez ce que nos clients disent de leur expérience avec Zua Car.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[
              { initials: 'JD', name: 'Jean Dupont', date: '2025', text: 'Service impeccable ! Véhicule propre, chauffeur ponctuel et professionnel. Je recommande vivement.', bg: 'yellow' },
              { initials: 'MA', name: 'Marie Atangana', date: '2026', text: 'Très satisfaite du service. La réservation via WhatsApp est super pratique et rapide.', bg: 'yellow' },
              { initials: 'PN', name: 'Paul Nguema', date: '2025', text: 'Excellent rapport qualité-prix. Les véhicules sont modernes et bien entretenus. Je reviendrai !', bg: 'yellow' }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-yellow-400/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-400">{testimonial.initials}</span>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm sm:text-base md:text-lg text-white truncate">{testimonial.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-400">Client depuis {testimonial.date}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 italic">"{testimonial.text}"</p>
                <div className="flex gap-1 mt-3 sm:mt-4 text-yellow-400">
                  {[1,2,3,4,5].map((star) => (
                    <svg key={star} className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA - responsive */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #FDBB02 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-white">
            Prêt à prendre la route ?
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Réservez dès maintenant votre véhicule et bénéficiez de nos tarifs compétitifs. 
            Chaque trajet devient un moment de prestige.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link
              href="/fleet"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/20 text-sm sm:text-base"
            >
              Voir nos véhicules
            </Link>
            <a
              href="https://wa.me/243811077897"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-green-600/20 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/>
              </svg>
              Réserver sur WhatsApp
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-400">
            📍 Gombe – Avenue Lokele 02, près de la Gare Centrale, Kinshasa
          </p>
        </div>
      </section>
    </main>
  );
}