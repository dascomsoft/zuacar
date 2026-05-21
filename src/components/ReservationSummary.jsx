'use client';

import { useEffect, useState } from 'react';

export default function ReservationSummary({ reservationId }) {
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(`/api/reservation?id=${reservationId}`);
        const data = await response.json();
        setReservation(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    if (reservationId) {
      fetchReservation();
    }
  }, [reservationId]);

  if (loading) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-zinc-700 rounded w-3/4"></div>
          <div className="h-4 bg-zinc-700 rounded w-1/2"></div>
          <div className="h-10 bg-zinc-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8">
        <p className="text-red-400">Réservation introuvable</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 sticky top-8">
      <h3 className="text-xl font-semibold mb-6">Votre Réservation</h3>
      
      <div className="space-y-6">
        <div>
          <p className="text-zinc-400 text-sm">Véhicule</p>
          <p className="text-2xl font-semibold">
            {reservation.marque} {reservation.modele}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-zinc-400 text-sm">Date de prise</p>
            <p className="font-medium">{reservation.pickup_date}</p>
            <p className="text-sm text-zinc-500">{reservation.pickup_time}</p>
          </div>
          <div>
            <p className="text-zinc-400 text-sm">Date de retour</p>
            <p className="font-medium">{reservation.return_date}</p>
            <p className="text-sm text-zinc-500">{reservation.return_time}</p>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-700">
          <div className="flex justify-between text-lg">
            <span className="text-zinc-400">Total à payer</span>
            <span className="font-bold text-3xl text-yellow-400">
              {reservation.total_price} USD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}