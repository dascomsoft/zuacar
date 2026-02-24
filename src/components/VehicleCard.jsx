'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function VehicleCard({ vehicle, index = 0 }) {
  const cardRef = useRef(null);
  const [imageError, setImageError] = useState(false);
  const PLACEHOLDER_IMAGE = '/images/placeholder-car.jpg';

  useEffect(() => {
    // Animation avec Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageError = () => {
    console.log('Erreur de chargement image pour:', vehicle.marque, vehicle.modele);
    setImageError(true);
  };

  // Déterminer la source de l'image
  const getImageSrc = () => {
    if (imageError) return PLACEHOLDER_IMAGE;
    
    try {
      if (vehicle.image_data && typeof vehicle.image_data === 'string' && vehicle.image_data.startsWith('data:image')) {
        return vehicle.image_data;
      }
      if (vehicle.image_url && typeof vehicle.image_url === 'string' && vehicle.image_url.trim() !== '') {
        // Vérification basique que c'est une URL
        if (vehicle.image_url.startsWith('http') || vehicle.image_url.startsWith('/')) {
          return vehicle.image_url;
        }
      }
    } catch (e) {
      console.warn('Image invalide');
    }
    
    return PLACEHOLDER_IMAGE;
  };

  const imageSrc = getImageSrc();

  const handleWhatsAppReservation = () => {
    const message = encodeURIComponent(
      `Bonjour, je souhaite réserver une ${vehicle.marque || 'voiture'} ${vehicle.modele || ''} pour une location.`
    );
    window.open(`https://wa.me/243811077897?text=${message}`, '_blank');
  };

  const formattedPrice = vehicle.prix?.toLocaleString('fr-FR') || '0';

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 opacity-0 translate-y-10 transition-all duration-700 hover:shadow-2xl hover:shadow-yellow-400/10"
    >
      <div className="relative h-48 w-full bg-gray-700 overflow-hidden">
        <Image
          src={imageSrc}
          alt={`${vehicle.marque || 'Véhicule'} ${vehicle.modele || ''}`}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized={imageSrc.startsWith('data:image')}
          onError={handleImageError}
          priority={index < 3}
        />
        
        {index === 0 && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded-full z-10">
            Nouveau
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">
            {vehicle.marque || 'Marque inconnue'} {vehicle.modele || ''}
          </h3>
          <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ml-2">
            {formattedPrice} $/jour
          </span>
        </div>

        <p className="text-gray-400 mb-4 line-clamp-2 min-h-[3rem]">
          {vehicle.description || 'Aucune description disponible.'}
        </p>

        <div className="mb-4">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            vehicle.categorie === 'prestige' ? 'bg-purple-900/50 text-purple-300 border border-purple-500/30' :
            vehicle.categorie === 'suv' ? 'bg-green-900/50 text-green-300 border border-green-500/30' :
            'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30'
          }`}>
            {vehicle.categorie === 'prestige' ? 'Prestige' :
             vehicle.categorie === 'suv' ? 'SUV' : 
             vehicle.categorie || 'Classique'}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleWhatsAppReservation}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 group"
        >
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/>
          </svg>
          <span>Réserver via WhatsApp</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}