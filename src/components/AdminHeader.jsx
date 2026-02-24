'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AdminHeader() {
  const pathname = usePathname();

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Voir le site', path: '/' },
  ];

  return (
    <header className="bg-gradient-to-r from-gray-900 to-black py-3 border-b border-yellow-400/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo et titre */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {/* Logo Zua Car */}
              <div className="relative w-8 h-8 overflow-hidden rounded-full border-2 border-yellow-400/50">
                <Image
                  src="/images/zuacarlogo.jpg"
                  alt="Zua Car Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-sm leading-tight">Admin</span>
                <span className="font-bold text-yellow-400 text-sm leading-tight -mt-1">Zua Car</span>
              </div>
            </div>

            {/* Navigation admin */}
            <nav className="hidden md:flex space-x-4 ml-8">
              {adminNavItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    pathname === item.path
                      ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                      : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/5 border border-transparent'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Badge admin */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="text-xs sm:text-sm text-yellow-400/80 font-medium">
              Espace administration
            </span>
          </div>
        </div>

        {/* Menu mobile simplifié */}
        <div className="md:hidden mt-3 flex space-x-2">
          {adminNavItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex-1 text-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                pathname === item.path
                  ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/30'
                  : 'bg-gray-800/50 text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/5 border border-gray-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}