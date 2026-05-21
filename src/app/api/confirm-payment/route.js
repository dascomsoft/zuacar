import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { reservations } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request) {
  try {
    const { reservationId, method } = await request.json();
    
    await db
      .update(reservations)
      .set({ 
        status: 'confirmed',
        payment_status: 'paid',
        payment_method: method,
        paid_at: new Date().toISOString(),
      })
      .where(eq(reservations.id, parseInt(reservationId)));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}