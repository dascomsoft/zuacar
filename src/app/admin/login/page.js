'use client';

import { motion } from 'framer-motion';
import { loginAdmin } from '@/lib/actions.js';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <motion.button
      type="submit"
      disabled={pending}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full bg-yellow-400 text-gray-900 font-semibold py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300 text-sm sm:text-base shadow-lg shadow-yellow-400/20 ${
        pending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'
      }`}
    >
      {pending ? 'Connexion...' : 'Se connecter'}
    </motion.button>
  );
}

export default function AdminLoginPage() {
  const [error, setError] = useState(null);

  async function handleSubmit(formData) {
    const result = await loginAdmin(formData);
    if (result && !result.success) {
      setError(result.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center py-8 sm:py-12 px-4 relative overflow-hidden">
      {/* Image de fond subtile */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/carjordyno8.jpg"
          alt=""
          fill
          className="object-cover blur-sm"
          priority={false}
        />
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
        className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-400 rounded-full filter blur-3xl opacity-20 z-0"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-400 rounded-full filter blur-3xl opacity-20 z-0"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative z-10 mx-4 sm:mx-0 border border-yellow-400/20"
      >
        {/* Logo Zua Car */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4">
            <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-full h-full overflow-hidden rounded-full border-2 border-yellow-400 shadow-lg">
              <Image
                src="/images/zuacarlogo.jpg"
                alt="Zua Car Logo"
                fill
                className="object-cover"
              />
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Administration</h1>
          <p className="text-sm sm:text-base text-gray-400 mt-1">Connectez-vous pour gérer la flotte</p>
        </div>

        {/* Message d'erreur */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 sm:p-4 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 text-xs sm:text-sm"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          </motion.div>
        )}

        {/* Formulaire */}
        <form action={handleSubmit} className="space-y-5 sm:space-y-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-yellow-400 mb-1.5 sm:mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base text-white placeholder-gray-400"
              placeholder="admin@zuacar.com"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-yellow-400 mb-1.5 sm:mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base text-white placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          <SubmitButton />
        </form>

        {/* Informations par défaut */}
        <div className="mt-5 sm:mt-6 p-3 sm:p-4 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
          <p className="text-xs sm:text-sm text-yellow-400 text-center">
            <span className="font-semibold">Identifiants par défaut :</span>
            <br />
            admin@zuacar.com / ZuaCar2025!
          </p>
        </div>

        {/* Lien retour au site */}
        <div className="mt-4 sm:mt-5 text-center">
          <Link
            href="/" 
            className="inline-flex items-center gap-1 text-xs sm:text-sm text-gray-400 hover:text-yellow-400 transition-colors duration-300"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour au site
          </Link>
        </div>
      </motion.div>
    </div>
  );
}