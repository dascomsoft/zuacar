





// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { updateReservationStatus, deleteReservation } from '@/lib/actions';
// import { sendStatusUpdateEmail } from '@/lib/email';

// export default function AdminReservations({ reservations, vehicles }) {
//   const [loading, setLoading] = useState({});
//   const [localReservations, setLocalReservations] = useState(reservations);

//   // Fonction pour obtenir le texte du statut
//   const getStatusText = (status) => {
//     switch(status) {
//       case 'confirmed': return 'CONFIRMÉE';
//       case 'cancelled': return 'ANNULÉE';
//       case 'completed': return 'TERMINÉE';
//       default: return status;
//     }
//   };

//   // Fonction pour obtenir la couleur du statut
//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'confirmed': return '#22c55e';
//       case 'cancelled': return '#ef4444';
//       case 'completed': return '#3b82f6';
//       default: return '#FDBB02';
//     }
//   };

//   // Fonction pour obtenir le message du statut
//   const getStatusMessage = (status) => {
//     switch(status) {
//       case 'confirmed': return '✅ Votre véhicule est réservé et confirmé. Nous vous attendons aux dates convenues.';
//       case 'cancelled': return '❌ Votre réservation a été annulée. Contactez-nous pour plus d\'informations.';
//       case 'completed': return '🏁 Merci d\'avoir choisi Zua Car. Nous espérons vous revoir bientôt !';
//       default: return '';
//     }
//   };

//   // Obtenir le nom du véhicule par son ID
//   const getVehicleName = (vehicleId) => {
//     const vehicle = vehicles?.find(v => v.id === vehicleId);
//     return vehicle ? `${vehicle.marque} ${vehicle.modele}` : 'Véhicule inconnu';
//   };

//   // Mise à jour du statut
//   const handleStatusUpdate = async (reservationId, newStatus) => {
//     setLoading(prev => ({ ...prev, [reservationId]: true }));
    
//     // Récupérer la réservation avant modification
//     const reservation = localReservations.find(r => r.id === reservationId);
    
//     const result = await updateReservationStatus(reservationId, newStatus);
    
//     if (result.success) {
//       // Mettre à jour l'affichage local
//       setLocalReservations(prev =>
//         prev.map(res =>
//           res.id === reservationId ? { ...res, status: newStatus } : res
//         )
//       );
      
//       // Envoyer l'email depuis le client (côté navigateur)
//       if (reservation && (newStatus === 'confirmed' || newStatus === 'cancelled' || newStatus === 'completed')) {
//         const vehicle = vehicles?.find(v => v.id === reservation.vehicle_id);
        
//         if (vehicle) {
//           await sendStatusUpdateEmail({
//             to_email: reservation.customer_email,
//             to_name: reservation.customer_name,
//             status: getStatusText(newStatus),
//             status_color: getStatusColor(newStatus),
//             status_message: getStatusMessage(newStatus),
//             vehicle_name: `${vehicle.marque} ${vehicle.modele}`,
//             pickup_date: reservation.pickup_date,
//             return_date: reservation.return_date,
//             total_price: reservation.total_price,
//             whatsapp_number: '+243811077897',
//           });
//         }
//       }
//     }
    
//     setLoading(prev => ({ ...prev, [reservationId]: false }));
//   };

//   // Supprimer une réservation
//   const handleDelete = async (reservationId) => {
//     if (!confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) return;
    
//     setLoading(prev => ({ ...prev, [reservationId]: true }));
    
//     const result = await deleteReservation(reservationId);
    
//     if (result.success) {
//       setLocalReservations(prev => prev.filter(res => res.id !== reservationId));
//     }
    
//     setLoading(prev => ({ ...prev, [reservationId]: false }));
//   };

//   // Couleurs des statuts
//   const statusColors = {
//     pending: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
//     confirmed: 'bg-green-500/20 text-green-400 border-green-500/30',
//     cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
//     completed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
//   };

//   if (localReservations.length === 0) {
//     return (
//       <div className="bg-gray-800/90 border border-yellow-400/20 rounded-xl p-8 mt-10 text-center">
//         <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//         </svg>
//         <h3 className="text-xl font-semibold text-white mb-2">Aucune réservation</h3>
//         <p className="text-gray-400">Les réservations des clients apparaîtront ici.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-800/90 border border-yellow-400/20 rounded-xl p-6 mt-10 overflow-x-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-white">
//           📋 Réservations
//           <span className="ml-2 text-sm bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">
//             {localReservations.length}
//           </span>
//         </h2>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full text-left text-gray-300">
//           <thead>
//             <tr className="border-b border-gray-700">
//               <th className="py-3 text-yellow-400">Client</th>
//               <th className="py-3 text-yellow-400">Véhicule</th>
//               <th className="py-3 text-yellow-400">Dates</th>
//               <th className="py-3 text-yellow-400">Lieux</th>
//               <th className="py-3 text-yellow-400">Prix</th>
//               <th className="py-3 text-yellow-400">Statut</th>
//               <th className="py-3 text-yellow-400">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {localReservations.map((reservation) => (
//               <motion.tr
//                 key={reservation.id}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="border-b border-gray-700 hover:bg-gray-700/30 transition"
//               >
//                 {/* Client */}
//                 <td className="py-4">
//                   <div>
//                     <p className="font-semibold text-white">{reservation.customer_name}</p>
//                     <p className="text-sm text-gray-400">{reservation.customer_email}</p>
//                     <p className="text-sm text-gray-500">{reservation.customer_phone}</p>
//                   </div>
//                 </td>

//                 {/* Véhicule */}
//                 <td className="py-4">
//                   <span className="text-white">{getVehicleName(reservation.vehicle_id)}</span>
//                 </td>

//                 {/* Dates */}
//                 <td className="py-4">
//                   <div className="text-sm">
//                     <p>📅 {reservation.pickup_date}</p>
//                     <p>➡ {reservation.return_date}</p>
//                   </div>
//                 </td>

//                 {/* Lieux */}
//                 <td className="py-4">
//                   <div className="text-sm">
//                     <p>🚗 {reservation.pickup_location}</p>
//                     <p>🏁 {reservation.dropoff_location}</p>
//                   </div>
//                 </td>

//                 {/* Prix */}
//                 <td className="py-4">
//                   <span className="font-semibold text-yellow-400">
//                     ${reservation.total_price}
//                   </span>
//                 </td>

//                 {/* Statut */}
//                 <td className="py-4">
//                   <select
//                     value={reservation.status}
//                     onChange={(e) => handleStatusUpdate(reservation.id, e.target.value)}
//                     disabled={loading[reservation.id]}
//                     className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer transition ${
//                       statusColors[reservation.status] || 'bg-gray-700 text-gray-300'
//                     }`}
//                   >
//                     <option value="pending">📌 En attente</option>
//                     <option value="confirmed">✅ Confirmée</option>
//                     <option value="cancelled">❌ Annulée</option>
//                     <option value="completed">🏁 Terminée</option>
//                   </select>
//                 </td>

//                 {/* Actions */}
//                 <td className="py-4">
//                   <button
//                     onClick={() => handleDelete(reservation.id)}
//                     disabled={loading[reservation.id]}
//                     className="text-red-400 hover:text-red-300 transition disabled:opacity-50"
//                     title="Supprimer"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                   </button>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="mt-4 text-center text-xs text-gray-500 border-t border-gray-700 pt-4">
//         Cliquez sur le statut pour modifier une réservation
//       </div>
//     </div>
//   );
// }












































// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { updateReservationStatus, deleteReservation } from '@/lib/actions';
// import { sendStatusUpdateEmail } from '@/lib/nodemailer';

// export default function AdminReservations({ reservations, vehicles }) {
//   const [loading, setLoading] = useState({});
//   const [localReservations, setLocalReservations] = useState(reservations || []);

//   // Fonction pour obtenir le texte du statut
//   const getStatusText = (status) => {
//     switch(status) {
//       case 'confirmed': return 'CONFIRMÉE';
//       case 'cancelled': return 'ANNULÉE';
//       case 'completed': return 'TERMINÉE';
//       default: return status || 'PENDING';
//     }
//   };

//   // Fonction pour obtenir la couleur du statut
//   const getStatusColor = (status) => {
//     switch(status) {
//       case 'confirmed': return '#22c55e';
//       case 'cancelled': return '#ef4444';
//       case 'completed': return '#3b82f6';
//       default: return '#FDBB02';
//     }
//   };

//   // Fonction pour obtenir le message du statut
//   const getStatusMessage = (status) => {
//     switch(status) {
//       case 'confirmed': return '✅ Votre véhicule est réservé et confirmé. Nous vous attendons aux dates convenues.';
//       case 'cancelled': return '❌ Votre réservation a été annulée. Contactez-nous pour plus d\'informations.';
//       case 'completed': return '🏁 Merci d\'avoir choisi Zua Car. Nous espérons vous revoir bientôt !';
//       default: return '';
//     }
//   };

//   // Obtenir le nom du véhicule
//   const getVehicleName = (vehicleId) => {
//     if (!vehicles || !Array.isArray(vehicles)) return 'Véhicule inconnu';
//     const vehicle = vehicles.find(v => v.id === vehicleId);
//     return vehicle ? `${vehicle.marque} ${vehicle.modele}` : 'Véhicule inconnu';
//   };

//   // Mise à jour du statut
//   const handleStatusUpdate = async (reservationId, newStatus) => {
//     setLoading(prev => ({ ...prev, [reservationId]: true }));
    
//     const reservation = localReservations.find(r => r.id === reservationId);
    
//     const result = await updateReservationStatus(reservationId, newStatus);
    
//     if (result && result.success) {
//       setLocalReservations(prev =>
//         prev.map(res =>
//           res.id === reservationId ? { ...res, status: newStatus } : res
//         )
//       );
      
//       if (reservation && (newStatus === 'confirmed' || newStatus === 'cancelled' || newStatus === 'completed')) {
//         const vehicle = vehicles?.find(v => v.id === reservation.vehicle_id);
        
//         // if (vehicle) {
//         //   await sendStatusUpdateEmail({
//         //     to_email: reservation.customer_email,
//         //     to_name: reservation.customer_name,
//         //     status: getStatusText(newStatus),
//         //     status_color: getStatusColor(newStatus),
//         //     status_message: getStatusMessage(newStatus),
//         //     vehicle_name: `${vehicle.marque} ${vehicle.modele}`,
//         //     pickup_date: reservation.pickup_date,
//         //     return_date: reservation.return_date,
//         //     total_price: reservation.total_price,
//         //     whatsapp_number: '+243811077897',
//         //   });
//         // }

//        await sendStatusUpdateEmail({
//   to_email: reservation.customer_email,
//   to_name: reservation.customer_name,
//   status: statusText,
//   status_color: statusColor,
//   status_message: statusMessage,
//   vehicle_name: `${vehicle.marque} ${vehicle.modele}`,
//   pickup_date: reservation.pickup_date,
//   return_date: reservation.return_date,
//   total_price: reservation.total_price,
//   whatsapp_number: '+243811077897',
// });



//       }
//     }
    
//     setLoading(prev => ({ ...prev, [reservationId]: false }));
//   };

//   // Supprimer une réservation
//   const handleDelete = async (reservationId) => {
//     if (!confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) return;
    
//     setLoading(prev => ({ ...prev, [reservationId]: true }));
    
//     const result = await deleteReservation(reservationId);
    
//     if (result && result.success) {
//       setLocalReservations(prev => prev.filter(res => res.id !== reservationId));
//     }
    
//     setLoading(prev => ({ ...prev, [reservationId]: false }));
//   };

//   if (!localReservations || localReservations.length === 0) {
//     return (
//       <div className="bg-gray-800/90 border border-yellow-400/20 rounded-xl p-8 mt-4 text-center">
//         <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//         </svg>
//         <h3 className="text-xl font-semibold text-white mb-2">Aucune réservation</h3>
//         <p className="text-gray-400">Les réservations des clients apparaîtront ici.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-6">
//       {/* En-tête */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-bold text-white">
//           📋 <span className="text-yellow-400">Réservations</span>
//           <span className="ml-2 text-sm bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">
//             {localReservations.length}
//           </span>
//         </h2>
//       </div>

//       {/* VERSION MOBILE : CARTES (visible sur mobile, caché sur desktop) */}
//       <div className="block lg:hidden space-y-3">
//         {localReservations.map((reservation, idx) => (
//           <motion.div
//             key={reservation.id}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: idx * 0.03 }}
//             className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-yellow-400/30 transition-all duration-300"
//           >
//             <div className="p-4">
//               {/* Client + Statut */}
//               <div className="flex justify-between items-start mb-3">
//                 <div className="flex-1">
//                   <h4 className="text-white font-semibold text-base">
//                     {reservation.customer_name || 'Client inconnu'}
//                   </h4>
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     <span className="text-xs text-gray-400 break-all">
//                       📧 {reservation.customer_email || '—'}
//                     </span>
//                     <span className="text-xs text-gray-500">
//                       📞 {reservation.customer_phone || '—'}
//                     </span>
//                   </div>
//                 </div>
//                 <select
//                   value={reservation.status || 'pending'}
//                   onChange={(e) => handleStatusUpdate(reservation.id, e.target.value)}
//                   disabled={loading[reservation.id]}
//                   className={`px-2 py-1 rounded-full text-xs font-medium border cursor-pointer transition ${
//                     reservation.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
//                     reservation.status === 'confirmed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
//                     reservation.status === 'cancelled' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
//                     'bg-blue-500/20 text-blue-400 border-blue-500/30'
//                   }`}
//                 >
//                   <option value="pending">📌 En attente</option>
//                   <option value="confirmed">✅ Confirmée</option>
//                   <option value="cancelled">❌ Annulée</option>
//                   <option value="completed">🏁 Terminée</option>
//                 </select>
//               </div>

//               {/* Véhicule */}
//               <div className="mb-3 p-2 bg-gray-700/30 rounded-lg">
//                 <div className="flex items-center gap-2">
//                   <span className="text-lg">🚗</span>
//                   <span className="text-white text-sm font-medium break-all">
//                     {getVehicleName(reservation.vehicle_id)}
//                   </span>
//                 </div>
//               </div>

//               {/* Dates */}
//               <div className="grid grid-cols-2 gap-3 mb-3">
//                 <div>
//                   <p className="text-xs text-gray-400">📅 Prise en charge</p>
//                   <p className="text-white text-sm font-medium">{reservation.pickup_date || '—'}</p>
//                   <p className="text-gray-500 text-xs truncate">{reservation.pickup_location || '—'}</p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-gray-400">🏁 Retour</p>
//                   <p className="text-white text-sm font-medium">{reservation.return_date || '—'}</p>
//                   <p className="text-gray-500 text-xs truncate">{reservation.dropoff_location || '—'}</p>
//                 </div>
//               </div>

//               {/* Prix + Suppression */}
//               <div className="flex justify-between items-center pt-2 border-t border-gray-700">
//                 <div>
//                   <span className="text-xs text-gray-400">Prix total</span>
//                   <p className="text-yellow-400 font-bold text-lg">
//                     ${reservation.total_price?.toLocaleString() || 0}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => handleDelete(reservation.id)}
//                   disabled={loading[reservation.id]}
//                   className="text-red-400 hover:text-red-300 transition disabled:opacity-50 p-2 rounded-lg hover:bg-red-400/10"
//                   title="Supprimer"
//                 >
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* VERSION DESKTOP : TABLEAU (caché sur mobile, visible sur desktop) */}
//       <div className="hidden lg:block bg-gray-800/90 border border-yellow-400/20 rounded-xl p-4 overflow-x-auto">
//         <table className="w-full text-left text-gray-300">
//           <thead>
//             <tr className="border-b border-gray-700">
//               <th className="py-3 text-yellow-400">Client</th>
//               <th className="py-3 text-yellow-400">Véhicule</th>
//               <th className="py-3 text-yellow-400">Dates</th>
//               <th className="py-3 text-yellow-400">Lieux</th>
//               <th className="py-3 text-yellow-400">Prix</th>
//               <th className="py-3 text-yellow-400">Statut</th>
//               <th className="py-3 text-yellow-400">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {localReservations.map((reservation) => (
//               <tr key={reservation.id} className="border-b border-gray-700 hover:bg-gray-700/30 transition">
//                 <td className="py-4">
//                   <div>
//                     <p className="font-semibold text-white">{reservation.customer_name}</p>
//                     <p className="text-sm text-gray-400">{reservation.customer_email}</p>
//                     <p className="text-sm text-gray-500">{reservation.customer_phone}</p>
//                   </div>
//                 </td>
//                 <td className="py-4">
//                   <span className="text-white">{getVehicleName(reservation.vehicle_id)}</span>
//                 </td>
//                 <td className="py-4">
//                   <div className="text-sm">
//                     <p>📅 {reservation.pickup_date}</p>
//                     <p>➡ {reservation.return_date}</p>
//                   </div>
//                 </td>
//                 <td className="py-4">
//                   <div className="text-sm">
//                     <p>🚗 {reservation.pickup_location}</p>
//                     <p>🏁 {reservation.dropoff_location}</p>
//                   </div>
//                 </td>
//                 <td className="py-4">
//                   <span className="font-semibold text-yellow-400">${reservation.total_price}</span>
//                 </td>
//                 <td className="py-4">
//                   <select
//                     value={reservation.status}
//                     onChange={(e) => handleStatusUpdate(reservation.id, e.target.value)}
//                     disabled={loading[reservation.id]}
//                     className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer transition ${
//                       reservation.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
//                       reservation.status === 'confirmed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
//                       reservation.status === 'cancelled' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
//                       'bg-blue-500/20 text-blue-400 border-blue-500/30'
//                     }`}
//                   >
//                     <option value="pending">📌 En attente</option>
//                     <option value="confirmed">✅ Confirmée</option>
//                     <option value="cancelled">❌ Annulée</option>
//                     <option value="completed">🏁 Terminée</option>
//                   </select>
//                 </td>
//                 <td className="py-4">
//                   <button
//                     onClick={() => handleDelete(reservation.id)}
//                     disabled={loading[reservation.id]}
//                     className="text-red-400 hover:text-red-300 transition disabled:opacity-50"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                     </svg>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="text-center text-xs text-gray-500 mt-4 pt-2 border-t border-gray-800">
//         Cliquez sur le statut pour modifier une réservation
//       </div>
//     </div>
//   );
// }











































































































































































































































'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { updateReservationStatus, deleteReservation } from '@/lib/actions';

export default function AdminReservations({ reservations, vehicles }) {
  const [loading, setLoading] = useState({});
  const [localReservations, setLocalReservations] = useState(reservations || []);

  // Fonction pour obtenir le texte du statut
  const getStatusText = (status) => {
    switch(status) {
      case 'confirmed': return 'CONFIRMÉE';
      case 'cancelled': return 'ANNULÉE';
      case 'completed': return 'TERMINÉE';
      default: return status || 'PENDING';
    }
  };

  // Obtenir le nom du véhicule
  const getVehicleName = (vehicleId) => {
    if (!vehicles || !Array.isArray(vehicles)) return 'Véhicule inconnu';
    const vehicle = vehicles.find(v => v.id === vehicleId);
    return vehicle ? `${vehicle.marque} ${vehicle.modele}` : 'Véhicule inconnu';
  };

  // Mise à jour du statut (l'email est envoyé côté serveur dans updateReservationStatus)
  const handleStatusUpdate = async (reservationId, newStatus) => {
    setLoading(prev => ({ ...prev, [reservationId]: true }));
    
    const result = await updateReservationStatus(reservationId, newStatus);
    
    if (result && result.success) {
      setLocalReservations(prev =>
        prev.map(res =>
          res.id === reservationId ? { ...res, status: newStatus } : res
        )
      );
    }
    
    setLoading(prev => ({ ...prev, [reservationId]: false }));
  };

  // Supprimer une réservation
  const handleDelete = async (reservationId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) return;
    
    setLoading(prev => ({ ...prev, [reservationId]: true }));
    
    const result = await deleteReservation(reservationId);
    
    if (result && result.success) {
      setLocalReservations(prev => prev.filter(res => res.id !== reservationId));
    }
    
    setLoading(prev => ({ ...prev, [reservationId]: false }));
  };

  if (!localReservations || localReservations.length === 0) {
    return (
      <div className="bg-gray-800/90 border border-yellow-400/20 rounded-xl p-8 mt-4 text-center">
        <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="text-xl font-semibold text-white mb-2">Aucune réservation</h3>
        <p className="text-gray-400">Les réservations des clients apparaîtront ici.</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">
          📋 <span className="text-yellow-400">Réservations</span>
          <span className="ml-2 text-sm bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full">
            {localReservations.length}
          </span>
        </h2>
      </div>

      {/* VERSION MOBILE : CARTES */}
      <div className="block lg:hidden space-y-3">
        {localReservations.map((reservation, idx) => (
          <motion.div
            key={reservation.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.03 }}
            className="bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-yellow-400/30 transition-all duration-300"
          >
            <div className="p-4">
              {/* Client + Statut */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-base">
                    {reservation.customer_name || 'Client inconnu'}
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-xs text-gray-400 break-all">
                      📧 {reservation.customer_email || '—'}
                    </span>
                    <span className="text-xs text-gray-500">
                      📞 {reservation.customer_phone || '—'}
                    </span>
                  </div>
                </div>
                <select
                  value={reservation.status || 'pending'}
                  onChange={(e) => handleStatusUpdate(reservation.id, e.target.value)}
                  disabled={loading[reservation.id]}
                  className={`px-2 py-1 rounded-full text-xs font-medium border cursor-pointer transition ${
                    reservation.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                    reservation.status === 'confirmed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                    reservation.status === 'cancelled' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                    'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  }`}
                >
                  <option value="pending">📌 En attente</option>
                  <option value="confirmed">✅ Confirmée</option>
                  <option value="cancelled">❌ Annulée</option>
                  <option value="completed">🏁 Terminée</option>
                </select>
              </div>

              {/* Véhicule */}
              <div className="mb-3 p-2 bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🚗</span>
                  <span className="text-white text-sm font-medium break-all">
                    {getVehicleName(reservation.vehicle_id)}
                  </span>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-gray-400">📅 Prise en charge</p>
                  <p className="text-white text-sm font-medium">{reservation.pickup_date || '—'}</p>
                  <p className="text-gray-500 text-xs truncate">{reservation.pickup_location || '—'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">🏁 Retour</p>
                  <p className="text-white text-sm font-medium">{reservation.return_date || '—'}</p>
                  <p className="text-gray-500 text-xs truncate">{reservation.dropoff_location || '—'}</p>
                </div>
              </div>

              {/* Prix + Suppression */}
              <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                <div>
                  <span className="text-xs text-gray-400">Prix total</span>
                  <p className="text-yellow-400 font-bold text-lg">
                    ${reservation.total_price?.toLocaleString() || 0}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(reservation.id)}
                  disabled={loading[reservation.id]}
                  className="text-red-400 hover:text-red-300 transition disabled:opacity-50 p-2 rounded-lg hover:bg-red-400/10"
                  title="Supprimer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* VERSION DESKTOP : TABLEAU */}
      <div className="hidden lg:block bg-gray-800/90 border border-yellow-400/20 rounded-xl p-4 overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 text-yellow-400">Client</th>
              <th className="py-3 text-yellow-400">Véhicule</th>
              <th className="py-3 text-yellow-400">Dates</th>
              <th className="py-3 text-yellow-400">Lieux</th>
              <th className="py-3 text-yellow-400">Prix</th>
              <th className="py-3 text-yellow-400">Statut</th>
              <th className="py-3 text-yellow-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localReservations.map((reservation) => (
              <tr key={reservation.id} className="border-b border-gray-700 hover:bg-gray-700/30 transition">
                <td className="py-4">
                  <div>
                    <p className="font-semibold text-white">{reservation.customer_name}</p>
                    <p className="text-sm text-gray-400">{reservation.customer_email}</p>
                    <p className="text-sm text-gray-500">{reservation.customer_phone}</p>
                  </div>
                </td>
                <td className="py-4">
                  <span className="text-white">{getVehicleName(reservation.vehicle_id)}</span>
                </td>
                <td className="py-4">
                  <div className="text-sm">
                    <p>📅 {reservation.pickup_date}</p>
                    <p>➡ {reservation.return_date}</p>
                  </div>
                </td>
                <td className="py-4">
                  <div className="text-sm">
                    <p>🚗 {reservation.pickup_location}</p>
                    <p>🏁 {reservation.dropoff_location}</p>
                  </div>
                </td>
                <td className="py-4">
                  <span className="font-semibold text-yellow-400">${reservation.total_price}</span>
                </td>
                <td className="py-4">
                  <select
                    value={reservation.status}
                    onChange={(e) => handleStatusUpdate(reservation.id, e.target.value)}
                    disabled={loading[reservation.id]}
                    className={`px-3 py-1 rounded-full text-xs font-medium border cursor-pointer transition ${
                      reservation.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                      reservation.status === 'confirmed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                      reservation.status === 'cancelled' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                      'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }`}
                  >
                    <option value="pending">📌 En attente</option>
                    <option value="confirmed">✅ Confirmée</option>
                    <option value="cancelled">❌ Annulée</option>
                    <option value="completed">🏁 Terminée</option>
                  </select>
                </td>
                <td className="py-4">
                  <button
                    onClick={() => handleDelete(reservation.id)}
                    disabled={loading[reservation.id]}
                    className="text-red-400 hover:text-red-300 transition disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center text-xs text-gray-500 mt-4 pt-2 border-t border-gray-800">
        Cliquez sur le statut pour modifier une réservation
      </div>
    </div>
  );
}