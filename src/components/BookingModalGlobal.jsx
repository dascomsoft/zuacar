// 'use client';

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FaCalendarAlt,
//   FaMapMarkerAlt,
//   FaUser,
//   FaPhone,
//   FaEnvelope,
//   FaTimes,
// } from 'react-icons/fa';
// import { useBooking } from '@/context/BookingContext';
// import { createReservation } from '@/lib/actions';
// import { sendBookingConfirmation } from '@/lib/email'; // ← IMPORTANT

// export default function BookingModalGlobal() {
//   const booking = useBooking();
  
//   if (!booking) {
//     console.error('BookingContext non disponible');
//     return null;
//   }

//   const { modalState, closeBooking } = booking;
  
//   if (!modalState) {
//     console.error('modalState est undefined');
//     return null;
//   }

//   const { isOpen, vehicle } = modalState;
  
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [messageType, setMessageType] = useState(null);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [isOpen]);

//   if (!mounted) return null;
//   if (!isOpen || !vehicle) return null;

//   async function handleSubmit(formData) {
//     if (loading) return;

//     setLoading(true);
//     setMessage(null);

//     const pickupDate = formData.get('pickup_date');
//     const returnDate = formData.get('return_date');
//     const pickupLocation = formData.get('pickup_location');
//     const dropoffLocation = formData.get('dropoff_location');
//     const customerName = formData.get('customer_name');
//     const customerEmail = formData.get('customer_email');
//     const customerPhone = formData.get('customer_phone');

//     if (new Date(returnDate) < new Date(pickupDate)) {
//       setMessageType('error');
//       setMessage('La date de retour doit être après la date de prise en charge');
//       setLoading(false);
//       return;
//     }

//     const result = await createReservation(formData);

//     if (result.success) {
//       // ✅ AJOUTER L'ENVOI D'EMAIL ICI
//       console.log('📧 Tentative envoi email vers:', customerEmail);
      
//       const emailResult = await sendBookingConfirmation({
//         customerEmail,
//         customerName,
//         customerPhone,
//         vehicle: vehicle,
//         pickupDate,
//         returnDate,
//         totalPrice: result.totalPrice || (vehicle.prix * Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24))),
//         pickupLocation,
//         dropoffLocation,
//       });
      
//       if (emailResult.success) {
//         console.log('✅ Email envoyé avec succès');
//       } else {
//         console.error('❌ Erreur envoi email:', emailResult.error);
//       }
      
//       setMessageType('success');
//       setMessage(result.message);
      
//       setTimeout(() => {
//         closeBooking();
//         setMessage(null);
//       }, 2000);
//     } else {
//       setMessageType('error');
//       setMessage(result.message);
//     }

//     setLoading(false);
//   }

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     await handleSubmit(formData);
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
//           onClick={() => closeBooking()}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0, y: 20 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.9, opacity: 0, y: 20 }}
//             onClick={(e) => e.stopPropagation()}
//             className="bg-gray-900 border border-yellow-400/20 rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl"
//           >
//             {/* HEADER */}
//             <div className="flex justify-between items-center mb-6 sticky top-0 bg-gray-900 pb-4 border-b border-gray-800">
//               <div>
//                 <h2 className="text-2xl font-bold text-white">
//                   Réserver {vehicle.marque} {vehicle.modele}
//                 </h2>
//                 <p className="text-yellow-400 text-sm mt-1">
//                   ${vehicle.prix} / jour
//                 </p>
//               </div>
//               <button
//                 onClick={() => closeBooking()}
//                 className="text-gray-400 hover:text-white transition-colors"
//               >
//                 <FaTimes size={22} />
//               </button>
//             </div>

//             {/* FORMULAIRE */}
//             <form onSubmit={onSubmit} className="space-y-4">
//               <input type="hidden" name="vehicle_id" value={vehicle.id} />

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-gray-300 text-sm mb-2 block">Nom complet *</label>
//                   <div className="relative">
//                     <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
//                     <input type="text" name="customer_name" required placeholder="Jean Dupont" className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-yellow-400 focus:outline-none transition" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-gray-300 text-sm mb-2 block">Téléphone *</label>
//                   <div className="relative">
//                     <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
//                     <input type="tel" name="customer_phone" required placeholder="+243 XXX XXX XXX" className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-yellow-400 focus:outline-none transition" />
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <label className="text-gray-300 text-sm mb-2 block">Email *</label>
//                 <div className="relative">
//                   <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
//                   <input type="email" name="customer_email" required placeholder="client@exemple.com" className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-yellow-400 focus:outline-none transition" />
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-gray-300 text-sm mb-2 block">Lieu de prise en charge *</label>
//                   <div className="relative">
//                     <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
//                     <input type="text" name="pickup_location" required placeholder="Kinshasa, Gombe..." className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-yellow-400 focus:outline-none transition" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-gray-300 text-sm mb-2 block">Lieu de dépose *</label>
//                   <div className="relative">
//                     <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
//                     <input type="text" name="dropoff_location" required placeholder="Kinshasa, Ndolo..." className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-yellow-400 focus:outline-none transition" />
//                   </div>
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-gray-300 text-sm mb-2 block">Date de prise en charge *</label>
//                   <div className="relative">
//                     <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
//                     <input type="date" name="pickup_date" required min={new Date().toISOString().split('T')[0]} className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-yellow-400 focus:outline-none transition" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-gray-300 text-sm mb-2 block">Date de retour *</label>
//                   <div className="relative">
//                     <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
//                     <input type="date" name="return_date" required min={new Date().toISOString().split('T')[0]} className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-yellow-400 focus:outline-none transition" />
//                   </div>
//                 </div>
//               </div>

//               <div className="grid md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-gray-300 text-sm mb-2 block">Heure de prise en charge *</label>
//                   <input type="time" name="pickup_time" required className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-yellow-400 focus:outline-none transition" />
//                 </div>
//                 <div>
//                   <label className="text-gray-300 text-sm mb-2 block">Heure de retour *</label>
//                   <input type="time" name="return_time" required className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-yellow-400 focus:outline-none transition" />
//                 </div>
//               </div>

//               {message && (
//                 <div className={`p-3 rounded-lg text-sm ${messageType === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
//                   {message}
//                 </div>
//               )}

//               <button type="submit" disabled={loading} className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-400/50 disabled:cursor-not-allowed text-gray-900 font-bold py-3 rounded-lg transition duration-300">
//                 {loading ? 'Traitement en cours...' : 'Confirmer la réservation'}
//               </button>
//             </form>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }














'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaTimes,
} from 'react-icons/fa';
import { useBooking } from '@/context/BookingContext';
import { createReservation } from '@/lib/actions';
import { sendBookingConfirmation } from '@/lib/email';

export default function BookingModalGlobal() {
  const booking = useBooking();
  
  if (!booking) {
    console.error('BookingContext non disponible');
    return null;
  }

  const { modalState, closeBooking } = booking;
  
  if (!modalState) {
    console.error('modalState est undefined');
    return null;
  }

  const { isOpen, vehicle } = modalState;
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!mounted) return null;
  if (!isOpen || !vehicle) return null;

  async function handleSubmit(formData) {
    if (loading) return;

    setLoading(true);
    setMessage(null);

    const pickupDate = formData.get('pickup_date');
    const returnDate = formData.get('return_date');
    const pickupLocation = formData.get('pickup_location');
    const dropoffLocation = formData.get('dropoff_location');
    const customerName = formData.get('customer_name');
    const customerEmail = formData.get('customer_email');
    const customerPhone = formData.get('customer_phone');

    if (new Date(returnDate) < new Date(pickupDate)) {
      setMessageType('error');
      setMessage('La date de retour doit être après la date de prise en charge');
      setLoading(false);
      return;
    }

    const result = await createReservation(formData);
if (result.success) {
  console.log('📧 Tentative envoi email vers:', customerEmail);
  
  const emailResult = await sendBookingConfirmation({
    customerEmail,
    customerName,
    customerPhone,
    vehicle: vehicle,
    pickupDate,
    returnDate,
    totalPrice: result.totalPrice || (vehicle.prix * Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24))),
    pickupLocation,
    dropoffLocation,
  });
  
  if (emailResult.success) {
    console.log('✅ Email envoyé avec succès');
  } else {
    console.error('❌ Erreur envoi email:', emailResult.error);
  }
  
  setMessageType('success');
  setMessage(result.message);
  
  // 🔥 REDIRECTION VERS PAGE DE PAIEMENT - VERSION CORRIGÉE
setTimeout(() => {
  closeBooking();

  // Maintenant l'ID est directement à la racine
  const reservationId = result.reservationId;
  const totalPrice = result.totalPrice;

  console.log('🔍 Reservation ID trouvé:', reservationId);
  console.log('🔍 Total price:', totalPrice);

  if (reservationId) {
    window.location.href = `/payment?reservation_id=${reservationId}`;
  } else {
    console.error('❌ Reservation ID introuvable:', result);
    window.location.href = '/';
  }
}, 2000);
}
    
    
    
    else {
      setMessageType('error');
      setMessage(result.message);
    }

    setLoading(false);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await handleSubmit(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => closeBooking()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900 border border-yellow-400/20 rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-gray-900 pb-4 border-b border-gray-800">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Réserver {vehicle.marque} {vehicle.modele}
                </h2>
                <p className="text-yellow-400 text-sm mt-1">
                  ${vehicle.prix} / jour
                </p>
              </div>
              <button
                onClick={() => closeBooking()}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes size={22} />
              </button>
            </div>

            {/* FORMULAIRE */}
            <form onSubmit={onSubmit} className="space-y-4">
              <input type="hidden" name="vehicle_id" value={vehicle.id} />

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Nom complet *</label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
                    <input type="text" name="customer_name" required placeholder="Jean Dupont" className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-yellow-400 focus:outline-none transition" />
                  </div>
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Téléphone *</label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
                    <input type="tel" name="customer_phone" required placeholder="+243 XXX XXX XXX" className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-yellow-400 focus:outline-none transition" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-gray-300 text-sm mb-2 block">Email *</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
                  <input type="email" name="customer_email" required placeholder="client@exemple.com" className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-yellow-400 focus:outline-none transition" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Lieu de prise en charge *</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
                    <input type="text" name="pickup_location" required placeholder="Kinshasa, Gombe..." className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-yellow-400 focus:outline-none transition" />
                  </div>
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Lieu de dépose *</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
                    <input type="text" name="dropoff_location" required placeholder="Kinshasa, Ndolo..." className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-yellow-400 focus:outline-none transition" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Date de prise en charge *</label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
                    <input type="date" name="pickup_date" required min={new Date().toISOString().split('T')[0]} className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-yellow-400 focus:outline-none transition" />
                  </div>
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Date de retour *</label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
                    <input type="date" name="return_date" required min={new Date().toISOString().split('T')[0]} className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-yellow-400 focus:outline-none transition" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Heure de prise en charge *</label>
                  <input type="time" name="pickup_time" required className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-yellow-400 focus:outline-none transition" />
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Heure de retour *</label>
                  <input type="time" name="return_time" required className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-yellow-400 focus:outline-none transition" />
                </div>
              </div>

              {message && (
                <div className={`p-3 rounded-lg text-sm ${messageType === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                  {message}
                </div>
              )}

              <button type="submit" disabled={loading} className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-400/50 disabled:cursor-not-allowed text-gray-900 font-bold py-3 rounded-lg transition duration-300">
                {loading ? 'Traitement en cours...' : 'Confirmer la réservation'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}