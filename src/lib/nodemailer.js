import nodemailer from 'nodemailer';

// Configuration simplifiée avec Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Email de confirmation de réservation
export async function sendBookingEmail({
  to_email,
  to_name,
  vehicle_name,
  pickup_date,
  return_date,
  total_price,
  pickup_location,
  dropoff_location,
}) {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h1 style="color: #FDBB02;">Confirmation de réservation</h1>
        <p>Bonjour <strong>${to_name}</strong>,</p>
        <p>Votre réservation pour <strong>${vehicle_name}</strong> a bien été enregistrée.</p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
          <p><strong>📅 Dates :</strong> ${pickup_date} → ${return_date}</p>
          <p><strong>📍 Prise en charge :</strong> ${pickup_location}</p>
          <p><strong>📍 Dépose :</strong> ${dropoff_location}</p>
          <p><strong>💰 Prix total :</strong> ${total_price}$</p>
        </div>
        <p>Notre équipe vous contactera sous 24h.</p>
        <p>📞 WhatsApp : +243811077897</p>
        <p>🌐 Site : https://zuacar.vercel.app</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Zua Car" <${process.env.GMAIL_USER}>`,
      to: to_email,
      subject: '✅ Confirmation de votre réservation Zua Car',
      html,
    });

    console.log('✅ Email envoyé à', to_email, info.messageId);
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur envoi email:', error);
    return { success: false, error: error.message };
  }
}

// Email de confirmation de paiement
export async function sendPaymentConfirmationEmail({
  to_email,
  to_name,
  vehicle_name,
  pickup_date,
  return_date,
  total_price,
  payment_method,
}) {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h1 style="color: #FDBB02;">✅ Paiement confirmé</h1>
        <p>Bonjour <strong>${to_name}</strong>,</p>
        <p>Nous avons bien reçu votre paiement pour la réservation suivante :</p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
          <p><strong>🚗 Véhicule :</strong> ${vehicle_name}</p>
          <p><strong>📅 Dates :</strong> ${pickup_date} → ${return_date}</p>
          <p><strong>💰 Montant :</strong> ${total_price}$</p>
          <p><strong>💳 Moyen de paiement :</strong> ${payment_method}</p>
        </div>
        <p>Votre réservation est maintenant confirmée.</p>
        <p>📞 WhatsApp : +243811077897</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Zua Car" <${process.env.GMAIL_USER}>`,
      to: to_email,
      subject: '✅ Paiement confirmé - Zua Car',
      html,
    });

    console.log('✅ Email de paiement envoyé à', to_email, info.messageId);
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur envoi email paiement:', error);
    return { success: false, error: error.message };
  }
}

// Email de mise à jour de statut
export async function sendStatusUpdateEmail({
  to_email,
  to_name,
  status,
  status_color,
  status_message,
  vehicle_name,
  pickup_date,
  return_date,
  total_price,
}) {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h1 style="color: ${status_color};">Mise à jour de votre réservation</h1>
        <p>Bonjour <strong>${to_name}</strong>,</p>
        <p>Votre réservation pour <strong>${vehicle_name}</strong> a été 
        <strong style="color: ${status_color};">${status}</strong>.</p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
          <p><strong>📅 Dates :</strong> ${pickup_date} → ${return_date}</p>
          <p><strong>💰 Prix total :</strong> ${total_price}$</p>
        </div>
        <p>${status_message}</p>
        <p>📞 WhatsApp : +243811077897</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Zua Car" <${process.env.GMAIL_USER}>`,
      to: to_email,
      subject: `📋 Votre réservation est ${status} - Zua Car`,
      html,
    });

    console.log('✅ Email de statut envoyé à', to_email, info.messageId);
    return { success: true };
  } catch (error) {
    console.error('❌ Erreur envoi email statut:', error);
    return { success: false, error: error.message };
  }
}