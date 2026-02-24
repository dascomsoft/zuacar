'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import EditVehicleModal from './EditVehicleModal.jsx';

export default function AdminVehicleActions({ vehicle }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async (id, formData) => {
    try {
      const { updateVehicle } = await import('@/lib/actions.js');
      const result = await updateVehicle(id, formData);
      if (result.success) {
        alert('Véhicule modifié avec succès !');
      } else {
        alert('Erreur : ' + result.message);
      }
    } catch (error) {
      alert('Erreur lors de la modification');
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${vehicle.marque} ${vehicle.modele} ?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const { deleteVehicle } = await import('@/lib/actions.js');
      const result = await deleteVehicle(vehicle.id);
      if (result.success) {
        alert('Véhicule supprimé avec succès !');
      } else {
        alert('Erreur : ' + result.message);
      }
    } catch (error) {
      alert('Erreur : ' + error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="absolute top-2 right-2 flex gap-2 z-10">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleEdit}
          className="bg-yellow-400 text-gray-900 p-2 rounded-full hover:bg-yellow-500 transition shadow-lg"
          title="Modifier"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelete}
          disabled={isDeleting}
          className={`bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition shadow-lg ${
            isDeleting ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          title="Supprimer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </motion.button>
      </div>

      {isEditing && (
        <EditVehicleModal
          vehicle={vehicle}
          onClose={() => setIsEditing(false)}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
}