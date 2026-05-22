'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Car, Plane, Users, Shield, Clock, MapPin, Star } from 'lucide-react';

const destinations = [
  {
    title: "Chutes de Zongo",
    location: "Kongo Central • 130 km de Kinshasa",
    description: "Les Chutes de Zongo sont l'une des merveilles naturelles les plus impressionnantes du Bas-Congo. Avec une hauteur de plus de 65 mètres et une largeur imposante, l'eau de la rivière Inkisi se fracasse dans un vacarme assourdissant au milieu d'une végétation luxuriante.",
    image: "/images/zongo-falls.jpg",
    duration: "1 journée complète",
    distance: "4h de route",
    activities: ["Randonnée", "Photographie", "Pique-nique", "Baignade"]
  },
  {
    title: "Lola ya Bonobo",
    location: "Kimwenza • 35 km de Kinshasa",
    description: "Unique au monde, Lola ya Bonobo est le seul sanctuaire dédié à la protection et à la réhabilitation des bonobos orphelins. Créé en 1994, ce havre de paix permet d'observer ces primates emblématiques du Congo.",
    image: "/images/lolabonobo.jpg",
    duration: "Demi-journée à 1 journée",
    distance: "1h de route",
    activities: ["Observation des bonobos", "Visite guidée", "Atelier éducatif"]
  },
  {
    title: "Jardin Botanique de Kisantu",
    location: "Kisantu • 120 km de Kinshasa",
    description: "Véritable poumon vert du Kongo Central, le Jardin Botanique de Kisantu s'étend sur 225 hectares et abrite plus de 3000 espèces de plantes tropicales.",
    image: "/images/kisantu-botanique-jardins-congo-photo.jpg",
    duration: "1 journée",
    distance: "3h de route",
    activities: ["Balade botanique", "Visite guidée", "Photographie nature"]
  },
  {
    title: "Chutes de Lukaya & Ma Vallée",
    location: "Près de Kimwenza",
    description: "Un écrin de cascades rafraîchissantes, de lacs et de forêt dense. Ma Vallée offre un cadre paradisiaque pour se détendre loin de l'agitation de Kinshasa.",
    image: "/images/le_lac_Ma_Vallée.jpg",
    duration: "Demi-journée",
    distance: "45 min de Kinshasa",
    activities: ["Randonnée", "Baignade", "Détente"]
  },
  {
    title: "Parc de la Vallée de la N'sele",
    location: "Environs de Kinshasa",
    description: "Réserve naturelle offrant un aperçu de la savane et de la forêt congolaise avec possibilité d'observer des animaux en semi-liberté.",
    image: "/images/nsele.jpg",
    duration: "1 journée",
    distance: "1h de Kinshasa",
    activities: ["Observation faune", "Randonnée", "Activités de plein air"]
  }
];

const luxuryHotels = [
  {
    name: "Fleuve Congo Hotel by Blazon",
    location: "Kinshasa Gombe",
    description: "Hôtel 5 étoiles iconique avec vue imprenable sur le Fleuve Congo. Piscine infinity, restaurants gastronomiques et service haut de gamme.",
    image: "/images/fleuvehotel.webp",
    rating: 5
  },
  {
    name: "Hilton Kinshasa",
    location: "Kinshasa",
    description: "Luxe moderne au cœur de la capitale. Idéal pour les voyageurs d'affaires et les touristes exigeants.",
    image: "/images/doubletree-hilton-congo-kinshasa-stanley1.jpg",
    rating: 5
  },
  {
    name: "Kin Plaza Arjaan by Rotana",
    location: "Kinshasa",
    description: "Appartements de luxe et hôtel avec un excellent rapport qualité/prix dans le quartier des affaires.",
    image: "/images/kinplaza.jpg",
    rating: 5
  },
  {
    name: "Mbwela Lodge (Inkisi)",
    location: "Près de Kisantu",
    description: "Lodge écologique et paradisiaque proche des sites naturels. Cadre intime et immersif dans la nature.",
    image: "/images/mbuela-lodge.jpg",
    rating: 4
  }
];

export default function DecouvertePage() {
  const router = useRouter();

  const handleReservation = (destinationTitle) => {
    // Rediriger vers la page flotte avec le nom de la destination en paramètre
    router.push(`/fleet?destination=${encodeURIComponent(destinationTitle)}`);
  };

  const handleHotelReservation = (hotelName) => {
    router.push(`/fleet?hotel=${encodeURIComponent(hotelName)}`);
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/243811077897', '_blank');
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white min-h-screen pt-16 sm:pt-20">
      
      {/* Hero Section */}
      <div className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/zongo-falls.jpg"
            alt="Découverte RDC"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 " />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter leading-none">
            Découvrez la <span className="text-yellow-400">beauté authentique</span> de la RDC
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10">
            Des cascades majestueuses, des sanctuaires uniques, des jardins paradisiaques et une culture riche : tout cela à quelques heures de Kinshasa.
          </p>
          <Link href="#destinations" className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-12 py-5 rounded-full text-xl transition-all transform hover:scale-105">
            Commencer l'aventure
          </Link>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center">
          <p className="text-xl md:text-2xl leading-relaxed text-gray-300">
            La République Démocratique du Congo est un pays d'une richesse culturelle et naturelle exceptionnelle. 
            Avec Zua Car, explorez en toute sécurité les trésors du <strong className="text-yellow-400">Kongo Central</strong>, berceau historique du royaume Kongo, tout en profitant d'un service de transport premium.
          </p>
        </div>
      </div>

      {/* Services Zua Car */}
      <div className="bg-black/50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Pourquoi choisir Zua Car pour vos découvertes ?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Sécurité maximale", desc: "Chauffeurs expérimentés et véhicules bien entretenus" },
              { icon: Car, title: "Véhicules adaptés", desc: "4x4 climatisés pour toutes les routes" },
              { icon: Plane, title: "Transferts complets", desc: "Aéroport → Hôtel → Sites touristiques" },
              { icon: Users, title: "Accompagnement personnalisé", desc: "Itinéraires sur mesure et guides locaux" },
            ].map((s, i) => (
              <div key={i} className="bg-gray-800/50 p-8 rounded-3xl text-center hover:bg-yellow-400/10 transition-all group border border-gray-700">
                <s.icon className="mx-auto text-yellow-400 mb-6" size={52} />
                <h3 className="text-xl md:text-2xl font-semibold mb-3">{s.title}</h3>
                <p className="text-gray-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Destinations Détaillées */}
      <div id="destinations" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">Nos Destinations Phares</h2>
        <p className="text-center text-gray-400 text-lg md:text-xl mb-16">Des expériences inoubliables à portée de route</p>

        {destinations.map((dest, index) => (
          <div key={index} className={`mb-24 grid lg:grid-cols-2 gap-12 items-center border-b border-gray-800 pb-24 last:border-none last:pb-0`}>
            <div className={index % 2 === 0 ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}>
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
                <Image src={dest.image} alt={dest.title} fill className="object-cover" />
              </div>
            </div>
            <div className={index % 2 === 0 ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-yellow-400" />
                <span className="text-yellow-400 font-medium">{dest.location}</span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">{dest.title}</h3>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-8">{dest.description}</p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-sm text-gray-500">Durée</p>
                  <p className="font-semibold flex items-center gap-2"><Clock size={18} /> {dest.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Distance</p>
                  <p className="font-semibold">{dest.distance}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {dest.activities.map((act, i) => (
                  <span key={i} className="bg-gray-700/50 text-xs px-3 py-1 rounded-full">{act}</span>
                ))}
              </div>

              <button
                onClick={() => handleReservation(dest.title)}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 rounded-2xl text-lg text-center transition-all transform hover:scale-[1.02] cursor-pointer"
              >
                Réserver ce voyage avec Zua Car
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hôtels Paradisiaques */}
      <div className="bg-gray-900/50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">Séjours dans des Hôtels Paradisiaques</h2>
          <p className="text-center text-gray-400 text-lg md:text-xl mb-16">Combinez découverte et confort absolu</p>

          <div className="grid md:grid-cols-2 gap-10">
            {luxuryHotels.map((hotel, i) => (
              <div key={i} className="bg-gray-800/50 rounded-3xl overflow-hidden group border border-gray-700 hover:border-yellow-400/30 transition-all">
                <div className="relative h-80">
                  <Image src={hotel.image} alt={hotel.name} fill className="object-cover group-hover:scale-105 transition-all" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold">{hotel.name}</h3>
                    <div className="flex text-yellow-400">
                      {Array.from({ length: hotel.rating }).map((_, k) => <Star key={k} size={20} fill="currentColor" />)}
                    </div>
                  </div>
                  <p className="text-yellow-400 mb-3">{hotel.location}</p>
                  <p className="text-gray-400 mb-6">{hotel.description}</p>
                  <button
                    onClick={() => handleHotelReservation(hotel.name)}
                    className="text-yellow-400 hover:text-yellow-500 transition inline-flex items-center gap-2 cursor-pointer"
                  >
                    Réserver via Zua Car →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 py-28 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Prêt à vivre l'aventure congolaise ?</h2>
          <p className="text-xl md:text-2xl mb-12">Zua Car vous accompagne du premier kilomètre jusqu'aux souvenirs les plus précieux.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleWhatsApp}
              className="bg-gray-900 hover:bg-black text-white px-12 md:px-16 py-5 md:py-7 rounded-2xl text-xl md:text-2xl font-bold transition-all transform hover:scale-105 cursor-pointer"
            >
              WhatsApp +243 811 077 897
            </button>
            <Link
              href="/fleet"
              className="border-2 border-gray-900 hover:bg-gray-900 hover:text-white px-12 md:px-16 py-5 md:py-7 rounded-2xl text-xl md:text-2xl font-bold transition-all text-center"
            >
              Réserver un véhicule
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}