import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { reservations, vehicles } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: 'ID requis' }, { status: 400 });
  }
  
  try {
    const reservation = await db
      .select()
      .from(reservations)
      .where(eq(reservations.id, parseInt(id)));
    
    if (!reservation.length) {
      return NextResponse.json({ error: 'Réservation non trouvée' }, { status: 404 });
    }
    
    const vehicle = await db
      .select()
      .from(vehicles)
      .where(eq(vehicles.id, reservation[0].vehicle_id));
    
    return NextResponse.json({
      ...reservation[0],
      marque: vehicle[0]?.marque,
      modele: vehicle[0]?.modele,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}