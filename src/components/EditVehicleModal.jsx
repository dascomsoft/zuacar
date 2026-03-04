// 'use client';

// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import Image from 'next/image';

// export default function EditVehicleModal({ vehicle, onClose, onSave }) {
//   const [formData, setFormData] = useState({
//     marque: vehicle.marque,
//     modele: vehicle.modele,
//     prix: vehicle.prix,
//     description: vehicle.description,
//     categorie: vehicle.categorie,
//     imageUrl: vehicle.imageUrl
//   });
//   const [imagePreview, setImagePreview] = useState(vehicle.imageUrl);
//   const [imageFile, setImageFile] = useState(null);
//   const [isSaving, setIsSaving] = useState(false);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSaving(true);

//     try {
//       const formDataObj = new FormData();
//       formDataObj.append('marque', formData.marque);
//       formDataObj.append('modele', formData.modele);
//       formDataObj.append('prix', formData.prix);
//       formDataObj.append('description', formData.description);
//       formDataObj.append('categorie', formData.categorie);
      
//       if (imageFile) {
//         // Si nouvelle image uploadée
//         const reader = new FileReader();
//         reader.onloadend = async () => {
//           formDataObj.append('imageUrl', reader.result);
//           await onSave(vehicle.id, formDataObj);
//           onClose();
//         };
//         reader.readAsDataURL(imageFile);
//       } else {
//         // Garder l'image existante
//         formDataObj.append('imageUrl', vehicle.imageUrl);
//         await onSave(vehicle.id, formDataObj);
//         onClose();
//       }
//     } catch (error) {
//       alert('Erreur lors de la modification');
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//       >
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold text-gray-800">Modifier le véhicule</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Image preview */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Image du véhicule
//               </label>
//               <div className="relative h-40 w-full bg-gray-100 rounded-lg overflow-hidden mb-2">
//                 <Image
//                   src={imagePreview || '/images/placeholder-car.jpg'}
//                   alt="Prévisualisation"
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//               />
//             </div>

//             {/* Marque et Modèle */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Marque</label>
//                 <input
//                   type="text"
//                   value={formData.marque}
//                   onChange={(e) => setFormData({...formData, marque: e.target.value})}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Modèle</label>
//                 <input
//                   type="text"
//                   value={formData.modele}
//                   onChange={(e) => setFormData({...formData, modele: e.target.value})}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             {/* Prix et Catégorie */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Prix (FCFA/jour)</label>
//                 <input
//                   type="number"
//                   value={formData.prix}
//                   onChange={(e) => setFormData({...formData, prix: parseInt(e.target.value)})}
//                   required
//                   min="0"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
//                 <select
//                   value={formData.categorie}
//                   onChange={(e) => setFormData({...formData, categorie: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="classique">Classique</option>
//                   <option value="prestige">Prestige</option>
//                   <option value="suv">SUV</option>
//                 </select>
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e) => setFormData({...formData, description: e.target.value})}
//                 required
//                 rows="3"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             {/* Boutons */}
//             <div className="flex justify-end gap-3 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
//               >
//                 Annuler
//               </button>
//               <motion.button
//                 type="submit"
//                 disabled={isSaving}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className={`px-4 py-2 bg-blue-600 text-white rounded-lg transition ${
//                   isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
//                 }`}
//               >
//                 {isSaving ? 'Modification...' : 'Enregistrer'}
//               </motion.button>
//             </div>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// }























































'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function EditVehicleModal({ vehicle, onClose, onSave }) {
  const [formData, setFormData] = useState({
    marque: vehicle.marque || '',
    modele: vehicle.modele || '',
    prix: vehicle.prix || '',
    description: vehicle.description || '',
    categorie: vehicle.categorie || 'classique',
  });
  
  const [originalData, setOriginalData] = useState({
    marque: vehicle.marque || '',
    modele: vehicle.modele || '',
    prix: vehicle.prix || '',
    description: vehicle.description || '',
    categorie: vehicle.categorie || 'classique',
  });

  const [imagePreview, setImagePreview] = useState(vehicle.image_data || vehicle.image_url || '');
  const [imageFile, setImageFile] = useState(null);
  const [useUrl, setUseUrl] = useState(false);
  const [urlInput, setUrlInput] = useState(vehicle.image_url || '');
  const [isSaving, setIsSaving] = useState(false);
  const [changedFields, setChangedFields] = useState({});

  // Détecter les champs modifiés
  useEffect(() => {
    const changed = {};
    
    if (formData.marque !== originalData.marque) changed.marque = true;
    if (formData.modele !== originalData.modele) changed.modele = true;
    if (String(formData.prix) !== String(originalData.prix)) changed.prix = true;
    if (formData.description !== originalData.description) changed.description = true;
    if (formData.categorie !== originalData.categorie) changed.categorie = true;
    if (imageFile) changed.image = true;
    if (useUrl && urlInput !== vehicle.image_url) changed.image = true;
    
    setChangedFields(changed);
  }, [formData, imageFile, useUrl, urlInput, originalData, vehicle.image_url]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setUseUrl(false);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formDataObj = new FormData();
      
      // N'ajouter que les champs modifiés
      if (changedFields.marque) formDataObj.append('marque', formData.marque);
      if (changedFields.modele) formDataObj.append('modele', formData.modele);
      if (changedFields.prix) formDataObj.append('prix', formData.prix);
      if (changedFields.description) formDataObj.append('description', formData.description);
      if (changedFields.categorie) formDataObj.append('categorie', formData.categorie);
      
      // Gérer l'image si modifiée
      if (changedFields.image) {
        if (imageFile) {
          formDataObj.append('imageFile', imageFile);
        } else if (useUrl && urlInput) {
          formDataObj.append('imageUrl', urlInput);
        }
      }

      await onSave(vehicle.id, formDataObj);
      onClose();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la modification');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-yellow-400/20"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              Modifier <span className="text-yellow-400">{vehicle.marque} {vehicle.modele}</span>
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Résumé des modifications */}
          {Object.keys(changedFields).length > 0 && (
            <div className="mb-4 p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <p className="text-sm text-yellow-400">
                ⚡ Modifications à enregistrer : {
                  Object.keys(changedFields).map(field => {
                    const labels = {
                      marque: 'Marque',
                      modele: 'Modèle',
                      prix: 'Prix',
                      description: 'Description',
                      categorie: 'Catégorie',
                      image: 'Image'
                    };
                    return labels[field];
                  }).join(', ')
                }
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image du véhicule
              </label>
              
              {/* Boutons de choix */}
              <div className="flex gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setUseUrl(false);
                    setImageFile(null);
                    setImagePreview(vehicle.image_data || vehicle.image_url || '');
                  }}
                  className={`px-3 py-1 rounded-lg text-sm transition ${
                    !useUrl 
                      ? 'bg-yellow-400 text-black font-semibold' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  📤 Upload
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUseUrl(true);
                    setImageFile(null);
                    setImagePreview(vehicle.image_url || '');
                  }}
                  className={`px-3 py-1 rounded-lg text-sm transition ${
                    useUrl 
                      ? 'bg-yellow-400 text-black font-semibold' 
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  🔗 URL
                </button>
              </div>

              {/* Prévisualisation */}
              {imagePreview && (
                <div className="mb-3 relative h-40 w-full bg-gray-700 rounded-lg overflow-hidden">
                  <Image
                    src={imagePreview}
                    alt="Prévisualisation"
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                </div>
              )}

              {/* Upload */}
              {!useUrl && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-500"
                />
              )}

              {/* URL */}
              {useUrl && (
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    setImagePreview(e.target.value);
                  }}
                  placeholder="https://exemple.com/image.jpg"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              )}
            </div>

            {/* Champs du formulaire */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Marque */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Marque
                  {formData.marque !== originalData.marque && (
                    <span className="ml-2 text-xs text-yellow-400">(modifié)</span>
                  )}
                </label>
                <input
                  type="text"
                  value={formData.marque}
                  onChange={(e) => setFormData({...formData, marque: e.target.value})}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Toyota"
                />
              </div>

              {/* Modèle */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Modèle
                  {formData.modele !== originalData.modele && (
                    <span className="ml-2 text-xs text-yellow-400">(modifié)</span>
                  )}
                </label>
                <input
                  type="text"
                  value={formData.modele}
                  onChange={(e) => setFormData({...formData, modele: e.target.value})}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="Camry"
                />
              </div>

              {/* Prix */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Prix (FCFA/jour)
                  {String(formData.prix) !== String(originalData.prix) && (
                    <span className="ml-2 text-xs text-yellow-400">(modifié)</span>
                  )}
                </label>
                <input
                  type="number"
                  value={formData.prix}
                  onChange={(e) => setFormData({...formData, prix: e.target.value})}
                  required
                  min="0"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  placeholder="25000"
                />
              </div>

              {/* Catégorie */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Catégorie
                  {formData.categorie !== originalData.categorie && (
                    <span className="ml-2 text-xs text-yellow-400">(modifié)</span>
                  )}
                </label>
                <select
                  value={formData.categorie}
                  onChange={(e) => setFormData({...formData, categorie: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                >
                  <option value="classique">Classique</option>
                  <option value="prestige">Prestige</option>
                  <option value="suv">SUV</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
                {formData.description !== originalData.description && (
                  <span className="ml-2 text-xs text-yellow-400">(modifié)</span>
                )}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                rows="3"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                placeholder="Description du véhicule..."
              />
            </div>

            {/* Boutons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
              >
                Annuler
              </button>
              <motion.button
                type="submit"
                disabled={isSaving || Object.keys(changedFields).length === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 rounded-lg transition font-semibold ${
                  Object.keys(changedFields).length === 0
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-yellow-400 text-black hover:bg-yellow-500'
                }`}
              >
                {isSaving ? 'Enregistrement...' : 
                 Object.keys(changedFields).length === 0 ? 'Aucune modification' : 
                 `Enregistrer (${Object.keys(changedFields).length})`}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}