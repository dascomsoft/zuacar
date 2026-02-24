'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    AOS.init({ 
      duration: 800,
      once: true,
      mirror: false
    });
  }, []);

  const handleWhatsAppClick = (formule, details = '') => {
    const message = encodeURIComponent(
      `Bonjour, je suis intéressé par ${formule}. ${details} Pouvez-vous me donner plus de détails ?`
    );
    window.open(`https://wa.me/243811077897?text=${message}`, '_blank');
  };

  // Plans tarifaires basés sur l'image zuapub.jpg
  const pricingPlans = [
    {
      categorie: 'SUV Luxe',
      sousTitre: 'Confort et prestige pour vos déplacements',
      offre: 'Offre spéciale collation',
      prix: '155$ - 190$',
      periode: 'USD/jour',
      description: 'Véhicules haut de gamme pour un confort absolu',
      vehicules: [
        { nom: 'Prado TXL', prix: '155$', image: '/images/prado-txl.jpg' },
        { nom: 'Prado TX', prix: '140$', image: '/images/prado-tx.jpg' },
        { nom: 'Land Cruiser', prix: '190$', image: '/images/land-cruiser.jpg' }
      ],
      icon: '🚙',
      avantages: ['Climatisation', 'Cuir', '7 places', 'Chauffeur inclus']
    },
    {
      categorie: 'Famille & Groupe',
      sousTitre: 'Pour vos sorties en famille',
      offre: 'Offre spéciale collation',
      prix: '95$ - 170$',
      periode: 'USD/jour',
      description: 'Espace et confort pour toute la famille',
      vehicules: [
        { nom: 'Alphard', prix: '95$', image: '/images/alphard.jpg' },
        { nom: 'Noah', prix: '80$', image: '/images/noah.jpg' },
        { nom: 'Hiace', prix: '170$', image: '/images/hiace.jpg' }
      ],
      icon: '🚐',
      avantages: ['8 places', 'Grand coffre', 'Climatisation', 'Écran DVD']
    },
    {
      categorie: 'Berlines & Compactes',
      sousTitre: 'Idéal pour la ville',
      offre: 'Offre spéciale collation',
      prix: '75$ - 120$',
      periode: 'USD/jour',
      description: 'Économiques et maniables pour vos trajets quotidiens',
      vehicules: [
        { nom: 'Blade', prix: '80$', image: '/images/blade.jpg' },
        { nom: '100% CEE', prix: '120$', image: '/images/cee.jpg' },
        { nom: 'Suzuki Swift', prix: '75$', image: '/images/swift.jpg' }
      ],
      icon: '🚗',
      avantages: ['Économique', 'Parking facile', 'Climatisation', 'Bluetooth']
    }
  ];

  // Offres spéciales de l'image
  const specialOffers = [
    { vehicule: 'Prado TXL', prix: '155$', reduction: '-15%' },
    { vehicule: 'Prado TX', prix: '140$', reduction: '-12%' },
    { vehicule: 'Alphard', prix: '95$', reduction: '-20%' },
    { vehicule: 'Blade', prix: '80$', reduction: '-10%' },
    { vehicule: '100% CEE', prix: '120$', reduction: '-5%' },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white pt-16 sm:pt-20">
      {/* Hero section avec image de fond - responsive */}
      <div className="relative bg-gradient-to-r from-gray-900/90 via-black to-gray-900/90 text-white overflow-hidden">
        {/* Image de fond */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/carjordyno11.jpg"
            alt="Zua Car Tarifs - Offre spéciale"
            fill
            className="object-cover opacity-30"
            priority
            quality={90}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
          />
          {/* Overlay sombre */}
          <div className="absolute inset-0  bg-gradient-to-r from-slate-700/90 to-green-800/50"></div>
        </div>

        {/* Motif décoratif jaune - caché sur mobile */}
        <div className="absolute inset-0 opacity-10 z-10 hidden sm:block">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #FDBB02 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Cercles décoratifs jaunes */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-20 -right-20 w-64 sm:w-80 h-64 sm:h-80 bg-yellow-400 rounded-full filter blur-3xl opacity-10 z-20"
        />

        {/* Contenu du hero - responsive */}
        <div className="relative z-30 container mx-auto px-4 py-16 sm:py-20 md:py-24 lg:py-32">
          {/* Fil d'Ariane - responsive */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 justify-center">
            <Link href="/" className="hover:text-yellow-400 transition">Accueil</Link>
            <span>›</span>
            <span className="text-yellow-400">Tarifs</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 drop-shadow-2xl">
              Nos Tarifs
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-300 mb-6 sm:mb-8 drop-shadow-lg px-4">
              Des formules adaptées à tous vos besoins à Kinshasa
            </p>
            
            {/* Badges de confiance - responsive */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center px-4">
              <span className="bg-yellow-400/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border border-yellow-400/30 text-yellow-400">
                ✅ Sans frais cachés
              </span>
              <span className="bg-yellow-400/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border border-yellow-400/30 text-yellow-400">
                🔒 Paiement sécurisé
              </span>
              <span className="bg-yellow-400/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border border-yellow-400/30 text-yellow-400">
                ⚡ Réservation express
              </span>
            </div>
          </motion.div>
        </div>

        {/* Vague décorative */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto fill-gray-900 opacity-80" preserveAspectRatio="none">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"/>
          </svg>
        </div>
      </div>

      {/* Bannière Offre Spéciale */}
      <div className="container mx-auto px-4 -mt-8 sm:-mt-12 relative z-40">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border-2 border-yellow-300"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl">🎁</span>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold">Offre spéciale collation</h3>
                <p className="text-xs sm:text-sm opacity-90">Profitez d'une réduction sur nos véhicules familiaux</p>
              </div>
            </div>
            <button
              onClick={() => handleWhatsAppClick("l'offre spéciale collation")}
              className="bg-gray-900 hover:bg-black text-yellow-400 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              En profiter →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Section des tarifs - responsive */}
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* En-tête de section - responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16 px-4"
        >
          <span className="text-yellow-400 font-semibold text-xs sm:text-sm uppercase tracking-wider bg-yellow-400/10 px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-yellow-400/20">
            Choisissez votre formule
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-4 sm:mt-6 mb-3 sm:mb-4">
            Des prix transparents en USD
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400">
            Tous nos tarifs incluent le chauffeur professionnel. Paiement en USD ou en Francs congolais au taux du jour.
          </p>
        </motion.div>

        {/* Grille des tarifs - responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-0">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.categorie}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-gray-800/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-500 border border-gray-700"
            >
              {/* Bande de couleur jaune */}
              <div className="h-1.5 sm:h-2 w-full bg-gradient-to-r from-yellow-400 to-yellow-600"></div>

              {/* Badge Offre spéciale */}
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-yellow-400 text-gray-900 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full">
                  {plan.offre}
                </span>
              </div>

              {/* Contenu - padding responsive */}
              <div className="p-5 sm:p-6 md:p-8">
                {/* En-tête - responsive */}
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div>
                    <span className="text-3xl sm:text-4xl md:text-5xl mb-1 sm:mb-2 block">{plan.icon}</span>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{plan.categorie}</h3>
                    <p className="text-xs sm:text-sm text-gray-400">{plan.sousTitre}</p>
                  </div>
                </div>

                {/* Prix - responsive */}
                <div className="mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400">{plan.prix}</span>
                  <span className="text-xs sm:text-sm text-gray-400"> /jour</span>
                </div>

                {/* Description - responsive */}
                <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-4 sm:mb-6">{plan.description}</p>

                {/* Avantages - responsive */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="font-semibold text-sm sm:text-base text-white mb-2 sm:mb-3">Avantages :</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {plan.avantages.map((avantage, i) => (
                      <span
                        key={i}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs bg-yellow-400/10 text-yellow-400 border border-yellow-400/20"
                      >
                        {avantage}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Véhicules avec prix - responsive */}
                <div className="mb-6 sm:mb-8">
                  <h4 className="font-semibold text-sm sm:text-base text-white mb-2 sm:mb-3">Véhicules disponibles :</h4>
                  <div className="space-y-2 sm:space-y-3">
                    {plan.vehicules.map((v, i) => (
                      <div key={i} className="flex items-center justify-between gap-2 sm:gap-3 p-2 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-gray-600 flex-shrink-0">
                            <div className="absolute inset-0 flex items-center justify-center text-yellow-400 text-xs">
                              🚗
                            </div>
                          </div>
                          <span className="text-xs sm:text-sm text-white">{v.nom}</span>
                        </div>
                        <span className="text-yellow-400 font-bold text-xs sm:text-sm">{v.prix}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bouton - responsive */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleWhatsAppClick(plan.categorie, `Je suis intéressé par la catégorie ${plan.categorie}`)}
                  className="w-full py-3 sm:py-4 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/>
                  </svg>
                  Réserver maintenant
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tableau des offres spéciales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 bg-gray-800/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-yellow-400/20"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
            Offres spéciales du moment
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-yellow-400/20">
                  <th className="py-3 text-left text-xs sm:text-sm font-semibold text-yellow-400">Véhicule</th>
                  <th className="py-3 text-center text-xs sm:text-sm font-semibold text-yellow-400">Prix</th>
                  <th className="py-3 text-right text-xs sm:text-sm font-semibold text-yellow-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {specialOffers.map((offer, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/30 transition">
                    <td className="py-3 text-left text-xs sm:text-sm text-white">{offer.vehicule}</td>
                    <td className="py-3 text-center">
                      <span className="text-yellow-400 font-bold text-xs sm:text-sm">{offer.prix}</span>
                      <span className="ml-2 text-green-400 text-[10px] sm:text-xs">{offer.reduction}</span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => handleWhatsAppClick(offer.vehicule)}
                        className="text-yellow-400 hover:text-yellow-500 text-xs sm:text-sm font-semibold"
                      >
                        Réserver →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Informations importantes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 bg-gray-800/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-gray-700"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">
            Informations importantes
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            {/* Localisation */}
            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-700/50 rounded-lg sm:rounded-xl">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-white mb-0.5 sm:mb-1">Localisation</h4>
                <p className="text-xs sm:text-sm text-gray-400">Gombe – Avenue Lokele 02, Kinshasa</p>
              </div>
            </div>

            {/* Paiement */}
            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-700/50 rounded-lg sm:rounded-xl">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-white mb-0.5 sm:mb-1">Paiement</h4>
                <p className="text-xs sm:text-sm text-gray-400">USD ou Francs congolais au taux du jour</p>
              </div>
            </div>

            {/* Chauffeur */}
            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-700/50 rounded-lg sm:rounded-xl">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-white mb-0.5 sm:mb-1">Chauffeur</h4>
                <p className="text-xs sm:text-sm text-gray-400">Inclus dans le prix - Professionnel et courtois</p>
              </div>
            </div>

            {/* Livraison */}
            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-700/50 rounded-lg sm:rounded-xl">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2 4 4 6-6 4 4M3 12v6h18v-6" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-white mb-0.5 sm:mb-1">Livraison</h4>
                <p className="text-xs sm:text-sm text-gray-400">Gratuite à Kinshasa</p>
              </div>
            </div>
          </div>

          {/* Devis personnalisé */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-lg sm:rounded-xl border border-yellow-400/30">
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
              <span className="text-2xl sm:text-3xl">💡</span>
              <div className="flex-1">
                <h4 className="font-semibold text-sm sm:text-base text-yellow-400 mb-1 sm:mb-2">Devis personnalisé</h4>
                <p className="text-xs sm:text-sm text-gray-300">
                  Pour les locations longue durée ou les événements spéciaux, contactez-nous pour un devis sur mesure.
                </p>
                <button
                  onClick={() => handleWhatsAppClick('un devis personnalisé')}
                  className="mt-3 sm:mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition"
                >
                  Demander un devis
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ rapide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center px-4"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-4">Vous avez des questions ?</h3>
          <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
            Notre équipe est disponible 7j/7 pour vous répondre sur WhatsApp.
          </p>
          <button
            onClick={() => handleWhatsAppClick('poser une question sur les tarifs')}
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/>
            </svg>
            Poser une question
          </button>
        </motion.div>
      </div>
    </div>
  );
}