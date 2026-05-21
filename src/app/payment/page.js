import { Suspense } from 'react';
import PaymentMethods from '@/components/PaymentMethods';
import ReservationSummary from '@/components/ReservationSummary';

export const metadata = {
  title: "Paiement | Zua Car - Location de Véhicules Kinshasa",
  description: "Confirmez votre réservation en payant de manière simple et sécurisée.",
};

export default async function PaymentPage({ searchParams }) {
  const params = await searchParams;
  const reservationId = params?.reservation_id;
  
  if (!reservationId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Réservation introuvable</h1>
          <a href="/" className="text-yellow-400 hover:underline">Retour à l'accueil</a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-950 text-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="text-7xl font-bold tracking-tighter bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              ZUA<span className="text-white">CAR</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Confirmez votre réservation
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Paiement simple, rapide et sécurisé
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Résumé de la réservation */}
          <div className="md:col-span-2">
            <Suspense fallback={<div className="bg-zinc-900/50 rounded-3xl p-8">Chargement...</div>}>
              <ReservationSummary reservationId={reservationId} />
            </Suspense>
          </div>

          {/* Méthodes de paiement */}
          <div className="md:col-span-3">
            <PaymentMethods reservationId={reservationId} />
          </div>
        </div>

        <div className="text-center mt-16 text-zinc-500 text-sm">
          Merci pour votre confiance • Zua Car Kinshasa
        </div>
      </div>
    </div>
  );
}