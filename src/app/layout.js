// Layout principal avec police Nunito
import { Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const nunito = Nunito({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
});

// Métadonnées pour le SEO (sans viewport et themeColor)
export const metadata = {
  title: 'Zua Car - Location de véhicules avec chauffeur à Kinshasa',
  description: 'Vente & location de véhicules avec chauffeur à Kinshasa. Zua Car, votre compagnon de route pour toutes vos activités. Modèles récents : Prado, Alphard, Noah dès 50$/jour.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Zua Car',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'format-detection': 'telephone=yes',
  },
  icons: {
    icon: [
      { url: '/images/zuacarlogo.jpg', type: 'image/jpeg' },
      // { url: '/favicon/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      // { url: '/favicon/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/images/zuacarlogo.jpg' },
      // { url: '/favicon/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: { url: '/images/zuacarlogo.jpg', type: 'image/jpeg' },
  },
};

// Configuration du viewport (séparée de metadata)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FDBB02',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Métadonnées PWA */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Favicons et icônes */}
        <link rel="shortcut icon" href="/images/zuacarlogo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/zuacarlogo.jpg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
        
        {/* Métadonnées supplémentaires */}
        <meta name="msapplication-navbutton-color" content="#FDBB02" />
        <meta name="keywords" content="location voiture kinshasa, location avec chauffeur kinshasa, zuacar, véhicule prestige kinshasa, prado alphard location" />
        <meta name="author" content="Zua Car" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://zuacar.com/" />
        <meta property="og:title" content="Zua Car - Location de véhicules avec chauffeur à Kinshasa" />
        <meta property="og:description" content="Vente & location, Zua Car reste votre compagnon de route pour toutes vos activités. Véhicules confortables, chauffeur professionnel, sécurité garantie." />
        <meta property="og:image" content="/images/zuacarlogo.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://zuacar.com/" />
        <meta property="twitter:title" content="Zua Car - Location de véhicules avec chauffeur à Kinshasa" />
        <meta property="twitter:description" content="Vente & location, Zua Car reste votre compagnon de route pour toutes vos activités." />
        <meta property="twitter:image" content="/images/zuacarlogo.jpg" />
      </head>
      <body className={`${nunito.className} antialiased bg-gradient-to-b from-gray-900 to-black text-white`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}