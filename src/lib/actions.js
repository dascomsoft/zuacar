// Server Actions pour les opérations CRUD
'use server';

import { db } from './db.js';
import { vehicles } from './schema.js';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function checkAdmin() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin_session');
  if (!isAdmin || isAdmin.value !== 'authenticated') {
    redirect('/admin/login');
  }
}

// Récupérer tous les véhicules
export async function getVehicles() {
  try {
    return await db.select().from(vehicles);
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}

// Récupérer les véhicules en vedette
export async function getFeaturedVehicles() {
  try {
    return await db.select().from(vehicles).limit(3);
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}

// Ajouter un véhicule
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
    console.error('Erreur:', error);
    return { success: false, message: error.message };
  }
}

// Mettre à jour un véhicule
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
    console.error('Erreur:', error);
    return { success: false, message: error.message };
  }
}

// Supprimer un véhicule
export async function deleteVehicle(id) {
  await checkAdmin();

  try {
    await db.delete(vehicles).where(eq(vehicles.id, id));
    revalidatePath('/fleet');
    revalidatePath('/admin/dashboard');
    return { success: true, message: 'Véhicule supprimé avec succès' };
  } catch (error) {
    console.error('Erreur:', error);
    return { success: false, message: error.message };
  }
}

// Login admin
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

// Logout admin
export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/');
}