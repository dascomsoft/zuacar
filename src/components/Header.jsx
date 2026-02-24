'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Ne pas afficher le header sur les pages admin
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Flotte', path: '/fleet' },
    { name: 'Tarifs', path: '/pricing' },
    { name: 'Admin', path: '/admin/login' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-black border-b border-yellow-400/20 shadow-lg">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-full border-2 border-yellow-400/50 group-hover:border-yellow-400 transition-all duration-300">
              <Image
                src="/images/zuacarlogo.jpg"
                alt="Zua Car Logo"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white leading-tight">
                Zua
              </span>
              <span className="font-bold text-lg text-yellow-400 leading-tight -mt-1">
                Car
              </span>
            </div>
          </Link>

          {/* Navigation Desktop & Tablette */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`font-medium transition-all duration-200 px-3 py-2 rounded-lg ${
                  pathname === item.path
                    ? 'text-yellow-400 bg-yellow-400/10'
                    : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/5'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Bouton Contact */}
            <a
              href="https://wa.me/243811077897"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-yellow-400/20"
            >
              Contact
            </a>
          </div>

          {/* Hamburger Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-800 text-yellow-400 hover:bg-gray-700 transition border border-yellow-400/20"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-800/95 backdrop-blur-sm shadow-xl rounded-lg mt-2 border border-yellow-400/20"
            >
              <div className="flex flex-col p-4 space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-medium px-4 py-2 rounded-lg transition ${
                      pathname === item.path
                        ? 'text-yellow-400 bg-yellow-400/10'
                        : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-400/5'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                <a
                  href="https://wa.me/243811077897"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-yellow-400 text-gray-900 text-center py-2 rounded-lg hover:bg-yellow-500 transition font-semibold"
                >
                  Contact WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  );
}