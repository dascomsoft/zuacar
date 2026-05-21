// import { NextResponse } from 'next/server';
// import { db } from '@/lib/db';
// import { reservations } from '@/lib/schema';
// import { eq } from 'drizzle-orm';

// export async function POST(request) {
//   try {
//     const { reservationId, method } = await request.json();
    
//     await db
//       .update(reservations)
//       .set({ 
//         status: 'confirmed',
//         payment_status: 'paid',
//         payment_method: method,
//         paid_at: new Date().toISOString(),
//       })
//       .where(eq(reservations.id, parseInt(reservationId)));
    
//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }










// // src/app/api/confirm-payment/route.js
// export async function POST(request) {
//   try {
//     const { reservationId, method } = await request.json();
    
//     // Récupérer la réservation et le véhicule
//     const reservation = await getReservationById(reservationId);
//     const vehicle = await getVehicleById(reservation.vehicle_id);
    
//     // Mettre à jour le statut
//     await updateReservation(reservationId, {
//       status: 'confirmed',
//       payment_status: 'paid',
//       payment_method: method,
//       paid_at: new Date(),
//     });
    
//     // Retourner les données pour l'email
//     return NextResponse.json({
//       success: true,
//       customerEmail: reservation.customer_email,
//       customerName: reservation.customer_name,
//       vehicleName: `${vehicle.marque} ${vehicle.modele}`,
//       pickupDate: reservation.pickup_date,
//       returnDate: reservation.return_date,
//       totalPrice: reservation.total_price,
//     });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }








































// src/app/api/confirm-payment/route.js
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { reservations, vehicles } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { sendPaymentConfirmationEmail } from '@/lib/nodemailer';

export async function POST(request) {
  try {
    const { reservationId, method } = await request.json();
    
    if (!reservationId) {
      return NextResponse.json({ error: 'ID de réservation manquant' }, { status: 400 });
    }
    
    // ========================
    // 1. RÉCUPÉRER LA RÉSERVATION
    // ========================
    const reservationResult = await db
      .select()
      .from(reservations)
      .where(eq(reservations.id, parseInt(reservationId)));
    
    if (!reservationResult.length) {
      return NextResponse.json({ error: 'Réservation non trouvée' }, { status: 404 });
    }
    
    const reservation = reservationResult[0];
    
    // ========================
    // 2. RÉCUPÉRER LE VÉHICULE
    // ========================
    const vehicleResult = await db
      .select()
      .from(vehicles)
      .where(eq(vehicles.id, reservation.vehicle_id));
    
    const vehicle = vehicleResult[0];
    
    if (!vehicle) {
      return NextResponse.json({ error: 'Véhicule non trouvé' }, { status: 404 });
    }
    
    // ========================
    // 3. METTRE À JOUR LE STATUT DE LA RÉSERVATION
    // ========================
    await db
      .update(reservations)
      .set({ 
        status: 'confirmed',
        payment_status: 'paid',
        payment_method: method,
        paid_at: new Date().toISOString(),
      })
      .where(eq(reservations.id, parseInt(reservationId)));
    
    // ========================
    // 4. ENVOYER L'EMAIL DE CONFIRMATION DE PAIEMENT
    // ========================
    await sendPaymentConfirmationEmail({
      to_email: reservation.customer_email,
      to_name: reservation.customer_name,
      vehicle_name: `${vehicle.marque} ${vehicle.modele}`,
      pickup_date: reservation.pickup_date,
      return_date: reservation.return_date,
      total_price: reservation.total_price,
      payment_method: method,
    });
    
    // ========================
    // 5. RETOURNER LES DONNÉES POUR LE CLIENT
    // ========================
    return NextResponse.json({
      success: true,
      customerEmail: reservation.customer_email,
      customerName: reservation.customer_name,
      vehicleName: `${vehicle.marque} ${vehicle.modele}`,
      pickupDate: reservation.pickup_date,
      returnDate: reservation.return_date,
      totalPrice: reservation.total_price,
    });
    
  } catch (error) {
    console.error('Erreur API confirm-payment:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}