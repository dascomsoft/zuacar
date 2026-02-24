// Pied de page
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white border-t border-yellow-400/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-white">Zua</span>
              <span className="text-yellow-400">Car</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Vente & location, votre compagnon de route pour toutes vos activités à Kinshasa.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465.66.256 1.216.6 1.772 1.156.556.556.9 1.112 1.156 1.772.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.83 4.83 0 01-1.156 1.772 4.83 4.83 0 01-1.772 1.156c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.83 4.83 0 01-1.772-1.156 4.83 4.83 0 01-1.156-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.83 4.83 0 011.156-1.772 4.83 4.83 0 011.772-1.156c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.22 1.802h-.441c-2.384 0-2.668.01-3.615.058-.956.047-1.475.204-1.819.338a3.05 3.05 0 00-1.126.732 3.05 3.05 0 00-.732 1.126c-.134.344-.291.863-.338 1.819-.048.947-.058 1.231-.058 3.615v.441c0 2.384.01 2.668.058 3.615.047.956.204 1.475.338 1.819.164.416.38.763.732 1.126.363.352.71.568 1.126.732.344.134.863.291 1.819.338.947.048 1.231.058 3.615.058h.441c2.384 0 2.668-.01 3.615-.058.956-.047 1.475-.204 1.819-.338.416-.164.763-.38 1.126-.732.352-.363.568-.71.732-1.126.134-.344.291-.863.338-1.819.048-.947.058-1.231.058-3.615v-.441c0-2.384-.01-2.668-.058-3.615-.047-.956-.204-1.475-.338-1.819a3.05 3.05 0 00-.732-1.126 3.05 3.05 0 00-1.126-.732c-.344-.134-.863-.291-1.819-.338-.947-.048-1.231-.058-3.615-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-yellow-400 transition">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="text-gray-400 hover:text-yellow-400 transition">
                  Notre flotte
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-yellow-400 transition">
                  Tarifs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-1 flex-shrink-0 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Gombe – Avenue Lokele 02, près de la Gare Centrale, Kinshasa</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-1 flex-shrink-0 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>
                  <a href="https://wa.me/243811077897" className="hover:text-yellow-400 transition">
                    +243 811 077 897
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-1 flex-shrink-0 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:zuacar070@gmail.com" className="hover:text-yellow-400 transition">
                  contact@zuacar.com
                </a>
              </li>
            </ul>
          </div>

          {/* Horaires & WhatsApp */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Horaires</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-1 flex-shrink-0 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Lundi - Samedi: 7h - 20h</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 mt-1 flex-shrink-0 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Dimanche: Sur rendez-vous</span>
              </li>
              <li className="pt-4">
                <a
                  href="https://wa.me/243811077897"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/>
                  </svg>
                  Réserver sur WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Badge de localisation */}
        <div className="flex justify-center mt-8">
          <span className="inline-flex items-center gap-2 bg-yellow-400/10 text-yellow-400 px-3 py-1 rounded-full text-xs border border-yellow-400/20">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
            🇨🇩 Kinshasa, République Démocratique du Congo
          </span>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Zua Car. Tous droits réservés.</p>
          <p className="text-xs mt-2">Vente & location de véhicules avec chauffeur à Kinshasa</p>
        </div>
      </div>
    </footer>
  );
}