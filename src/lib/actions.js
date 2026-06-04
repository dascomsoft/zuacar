

// Server Actions pour les opérations CRUD
'use server';

import { db } from './db.js';
import { vehicles, reservations } from './schema.js';
import { eq, desc, and, ne, or, lt } from 'drizzle-orm';
import { revalidatePath, revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { sendBookingEmail, sendStatusUpdateEmail } from './nodemailer';

// =========================
// CONSTANTES
// =========================
const EXPIRATION_MINUTES = 15;
const ACTIVE_STATUSES = ['pending', 'confirmed'];
const BLOCKING_STATUSES = ['pending', 'confirmed'];

// =========================
// FONCTIONS ADMIN
// =========================

async function checkAdmin() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin_session');
  if (!isAdmin || isAdmin.value !== 'authenticated') {
    redirect('/admin/login');
  }
}

// =========================
// VEHICLES CRUD
// =========================

export async function getVehicles() {
  try {
    return await db.select().from(vehicles);
  } catch (error) {
    console.error('Erreur getVehicles:', error);
    return [];
  }
}

export async function getFeaturedVehicles() {
  try {
    return await db.select().from(vehicles).limit(3);
  } catch (error) {
    console.error('Erreur getFeaturedVehicles:', error);
    return [];
  }
}

export async function addVehicle(formData) {
  await checkAdmin();
  
  try {
    const marque = formData.get('marque');
    const modele = formData.get('modele');
    const prix = parseInt(formData.get('prix'));
    const description = formData.get('description');
    const categorie = formData.get('categorie') || 'classique';
    
    let imageData = null;
    let imageUrl = null;
    
    const imageFile = formData.get('imageFile');
    const imageUrlInput = formData.get('imageUrl');
    
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      imageData = `data:${imageFile.type};base64,${base64}`;
    } else if (imageUrlInput && imageUrlInput.trim() !== '') {
      imageUrl = imageUrlInput;
    } else {
      imageUrl = '/images/placeholder-car.jpg';
    }

    const newVehicle = {
      marque,
      modele,
      prix,
      description,
      categorie,
      image_data: imageData,
      image_url: imageUrl,
    };

    await db.insert(vehicles).values(newVehicle);
    revalidatePath('/fleet');
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Véhicule ajouté avec succès' };
  } catch (error) {
    console.error('Erreur addVehicle:', error);
    return { success: false, message: error.message };
  }
}

export async function updateVehicle(id, formData) {
  await checkAdmin();

  try {
    const updatedVehicle = {};
    
    const marque = formData.get('marque');
    const modele = formData.get('modele');
    const prix = formData.get('prix');
    const description = formData.get('description');
    const categorie = formData.get('categorie');
    
    if (marque) updatedVehicle.marque = marque;
    if (modele) updatedVehicle.modele = modele;
    if (prix) updatedVehicle.prix = parseInt(prix);
    if (description) updatedVehicle.description = description;
    if (categorie) updatedVehicle.categorie = categorie;
    
    const imageFile = formData.get('imageFile');
    const imageUrlInput = formData.get('imageUrl');
    
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      updatedVehicle.image_data = `data:${imageFile.type};base64,${base64}`;
    } else if (imageUrlInput && imageUrlInput.trim() !== '') {
      updatedVehicle.image_url = imageUrlInput;
    }

    if (Object.keys(updatedVehicle).length === 0) {
      return { success: false, message: 'Aucune modification' };
    }

    await db.update(vehicles).set(updatedVehicle).where(eq(vehicles.id, id));
    revalidatePath('/fleet');
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Véhicule modifié avec succès' };
  } catch (error) {
    console.error('Erreur updateVehicle:', error);
    return { success: false, message: error.message };
  }
}

export async function deleteVehicle(id) {
  await checkAdmin();

  try {
    await db.delete(vehicles).where(eq(vehicles.id, id));
    revalidatePath('/fleet');
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Véhicule supprimé avec succès' };
  } catch (error) {
    console.error('Erreur deleteVehicle:', error);
    return { success: false, message: error.message };
  }
}

// =========================
// RESERVATIONS CRUD
// =========================

export async function getReservations() {
  await checkAdmin();

  try {
    return await db.select().from(reservations).orderBy(desc(reservations.created_at));
  } catch (error) {
    console.error('Erreur getReservations:', error);
    return [];
  }
}

export async function getReservationsByVehicle(vehicleId) {
  try {
    return await db.select().from(reservations).where(eq(reservations.vehicle_id, vehicleId));
  } catch (error) {
    console.error('Erreur getReservationsByVehicle:', error);
    return [];
  }
}

// =========================
// VÉRIFICATION DISPONIBILITÉ OPTIMISÉE
// =========================

export async function getVehiclesAvailability(dateStr) {
  try {
    const activeReservations = await db
      .select({
        vehicle_id: reservations.vehicle_id,
        pickup_date: reservations.pickup_date,
        return_date: reservations.return_date,
      })
      .from(reservations)
      .where(
        and(
          or(
            eq(reservations.status, 'pending'),
            eq(reservations.status, 'confirmed')
          ),
          ne(reservations.status, 'cancelled'),
          ne(reservations.status, 'completed')
        )
      );
    
    const unavailableMap = new Map();
    
    for (const reservation of activeReservations) {
      if (dateStr >= reservation.pickup_date && dateStr <= reservation.return_date) {
        unavailableMap.set(reservation.vehicle_id, {
          vehicle_id: reservation.vehicle_id,
          return_date: reservation.return_date,
          pickup_date: reservation.pickup_date,
        });
      }
    }
    
    return unavailableMap;
  } catch (error) {
    console.error('Erreur getVehiclesAvailability:', error);
    return new Map();
  }
}

// =========================
// CRÉATION RÉSERVATION AVEC TRANSACTION + EMAIL
// =========================
export async function createReservation(formData) {
  try {
    // ========================
    // RÉCUPÉRATION DES DONNÉES
    // ========================
    const vehicleId = parseInt(formData.get('vehicle_id'));
    const customerName = formData.get('customer_name');
    const customerEmail = formData.get('customer_email');
    const customerPhone = formData.get('customer_phone');
    const pickupLocation = formData.get('pickup_location');
    const dropoffLocation = formData.get('dropoff_location');
    const pickupDate = formData.get('pickup_date');
    const returnDate = formData.get('return_date');
    const notes = formData.get('notes') || null;

    // ========================
    // VALIDATION DES CHAMPS
    // ========================
    if (!customerName || !customerEmail || !customerPhone) {
      return { success: false, message: 'Veuillez remplir tous les champs obligatoires' };
    }

    if (!customerEmail.includes('@') || !customerEmail.includes('.')) {
      return { success: false, message: 'Veuillez entrer un email valide' };
    }

    // ========================
    // VALIDATION DES DATES
    // ========================
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    
    if (end < start) {
      return { success: false, message: 'La date de retour doit être après la date de prise en charge' };
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (start < today) {
      return { success: false, message: 'La date de prise en charge ne peut pas être dans le passé' };
    }

    // ========================
    // RÉCUPÉRATION DU VÉHICULE
    // ========================
    const vehicle = await db
      .select()
      .from(vehicles)
      .where(eq(vehicles.id, vehicleId));

    if (!vehicle.length) {
      return { success: false, message: 'Véhicule non trouvé' };
    }

    const selectedVehicle = vehicle[0];

    // ========================
    // CALCUL DU PRIX
    // ========================
    const diffTime = Math.abs(end - start);
    const numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
    const totalPrice = numberOfDays * selectedVehicle.prix;

    // ========================
    // TRANSACTION ATOMIQUE
    // ========================
    let reservationId;
    
    await db.transaction(async (tx) => {
      const existingReservations = await tx
        .select()
        .from(reservations)
        .where(
          and(
            eq(reservations.vehicle_id, vehicleId),
            ne(reservations.status, 'cancelled'),
            ne(reservations.status, 'completed')
          )
        );

      const requestedPickup = new Date(pickupDate);
      const requestedReturn = new Date(returnDate);

      const hasConflict = existingReservations.some((reservation) => {
        const existingPickup = new Date(reservation.pickup_date);
        const existingReturn = new Date(reservation.return_date);
        
        return requestedPickup <= existingReturn && requestedReturn >= existingPickup;
      });

      if (hasConflict) {
        throw new Error('DOUBLON_DETECTE');
      }

      const expiresAt = new Date(Date.now() + EXPIRATION_MINUTES * 60 * 1000);
      
      const result = await tx.insert(reservations).values({
        vehicle_id: vehicleId,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        pickup_location: pickupLocation,
        dropoff_location: dropoffLocation,
        pickup_date: pickupDate,
        return_date: returnDate,
        total_price: totalPrice,
        status: 'pending',
        payment_status: 'unpaid',
        notes: notes,
        expires_at: expiresAt,
      }).returning({ id: reservations.id });
      
      reservationId = result[0]?.id;
    });

    // ========================
    // ENVOI EMAIL DE CONFIRMATION (CÔTÉ SERVEUR)
    // ========================
    try {
      await sendBookingEmail({
        to_email: customerEmail,
        to_name: customerName,
        vehicle_name: `${selectedVehicle.marque} ${selectedVehicle.modele}`,
        pickup_date: pickupDate,
        return_date: returnDate,
        total_price: totalPrice,
        pickup_location: pickupLocation,
        dropoff_location: dropoffLocation,
      });
      console.log('✅ Email de confirmation envoyé');
    } catch (emailError) {
      console.error('❌ Erreur envoi email:', emailError);
    }

    revalidatePath('/');
    revalidatePath('/fleet');
    revalidatePath('/admin/dashboard');
    revalidateTag('reservations');

    return {
      success: true,
      message: 'Réservation créée avec succès ! Un email de confirmation vous a été envoyé.',
      reservationId: reservationId,
      totalPrice: totalPrice,
    };
    
  } catch (error) {
    if (error.message === 'DOUBLON_DETECTE') {
      return { success: false, message: 'Ce véhicule n\'est pas disponible pour les dates sélectionnées' };
    }
    
    console.error('Erreur createReservation:', error);
    return { success: false, message: 'Une erreur est survenue. Veuillez réessayer.' };
  }
}

// =========================
// NETTOYAGE DES RÉSERVATIONS EXPIRÉES
// =========================

export async function cleanExpiredReservations() {
  try {
    const result = await db
      .update(reservations)
      .set({ status: 'expired' })
      .where(
        and(
          eq(reservations.status, 'pending'),
          lt(reservations.expires_at, new Date())
        )
      );
    
    console.log(`✅ ${result.changes || 0} réservations expirées nettoyées`);
    return { success: true, count: result.changes || 0 };
  } catch (error) {
    console.error('Erreur cleanExpiredReservations:', error);
    return { success: false, count: 0 };
  }
}

// =========================
// GESTION STATUT RÉSERVATION + EMAIL
// =========================

export async function updateReservationStatus(reservationId, newStatus) {
  await checkAdmin();

  try {
    const reservationResult = await db
      .select()
      .from(reservations)
      .where(eq(reservations.id, reservationId));
    
    if (!reservationResult.length) {
      return { success: false, message: 'Réservation non trouvée' };
    }
    
    const reservation = reservationResult[0];
    
    // Récupérer le véhicule pour l'email
    const vehicleResult = await db
      .select()
      .from(vehicles)
      .where(eq(vehicles.id, reservation.vehicle_id));
    
    const vehicle = vehicleResult[0];
    
    // Mettre à jour le statut
    await db
      .update(reservations)
      .set({ status: newStatus })
      .where(eq(reservations.id, reservationId));

    // ========================
    // ENVOI EMAIL DE MISE À JOUR DE STATUT
    // ========================
    let statusText = '';
    let statusColor = '';
    let statusMessage = '';
    
    if (newStatus === 'confirmed') {
      statusText = 'CONFIRMÉE';
      statusColor = '#22c55e';
      statusMessage = '✅ Votre véhicule est réservé et confirmé. Nous vous attendons aux dates convenues.';
    } else if (newStatus === 'cancelled') {
      statusText = 'ANNULÉE';
      statusColor = '#ef4444';
      statusMessage = '❌ Votre réservation a été annulée. Contactez-nous pour plus d\'informations.';
    } else if (newStatus === 'completed') {
      statusText = 'TERMINÉE';
      statusColor = '#3b82f6';
      statusMessage = '🏁 Merci d\'avoir choisi Zua Car. Nous espérons vous revoir bientôt !';
    }
    
    if (statusText && vehicle) {
      try {
        await sendStatusUpdateEmail({
          to_email: reservation.customer_email,
          to_name: reservation.customer_name,
          status: statusText,
          status_color: statusColor,
          status_message: statusMessage,
          vehicle_name: `${vehicle.marque} ${vehicle.modele}`,
          pickup_date: reservation.pickup_date,
          return_date: reservation.return_date,
          total_price: reservation.total_price,
        });
        console.log('✅ Email de statut envoyé');
      } catch (emailError) {
        console.error('❌ Erreur envoi email statut:', emailError);
      }
    }

    revalidatePath('/admin/dashboard');
    revalidateTag('reservations');

    return { 
      success: true, 
      message: 'Statut mis à jour',
      status: newStatus,
      reservationId,
      reservation: {
        customerEmail: reservation.customer_email,
        customerName: reservation.customer_name,
        pickupDate: reservation.pickup_date,
        returnDate: reservation.return_date,
        totalPrice: reservation.total_price,
      }
    };
  } catch (error) {
    console.error('Erreur updateReservationStatus:', error);
    return { success: false, message: 'Erreur lors de la mise à jour' };
  }
}

export async function deleteReservation(reservationId) {
  await checkAdmin();

  try {
    await db.delete(reservations).where(eq(reservations.id, reservationId));
    revalidatePath('/admin/dashboard');
    revalidateTag('reservations');
    return { success: true, message: 'Réservation supprimée' };
  } catch (error) {
    console.error('Erreur deleteReservation:', error);
    return { success: false, message: 'Erreur lors de la suppression' };
  }
}

// =========================
// STATISTIQUES
// =========================

export async function getDashboardStats() {
  await checkAdmin();

  try {
    const allReservations = await db.select().from(reservations);
    const allVehicles = await db.select().from(vehicles);
    
    const pendingReservations = allReservations.filter(r => r.status === 'pending').length;
    const confirmedReservations = allReservations.filter(r => r.status === 'confirmed').length;
    const cancelledReservations = allReservations.filter(r => r.status === 'cancelled').length;
    const completedReservations = allReservations.filter(r => r.status === 'completed').length;
    
    const totalRevenue = allReservations
      .filter(r => r.status === 'confirmed' || r.status === 'completed')
      .reduce((sum, r) => sum + (r.total_price || 0), 0);
    
    return {
      success: true,
      stats: {
        totalVehicles: allVehicles.length,
        totalReservations: allReservations.length,
        pendingReservations,
        confirmedReservations,
        cancelledReservations,
        completedReservations,
        totalRevenue,
      }
    };
  } catch (error) {
    console.error('Erreur getDashboardStats:', error);
    return { success: false, stats: null };
  }
}

// =========================
// AUTHENTIFICATION
// =========================

export async function loginAdmin(formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return { success: false, message: 'Erreur de configuration' };
  }

  if (email === adminEmail && password === adminPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    redirect('/admin/dashboard');
  } else {
    return { success: false, message: 'Email ou mot de passe incorrect' };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/');
}