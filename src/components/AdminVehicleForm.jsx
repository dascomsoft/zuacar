'use client';

import { motion } from 'framer-motion';
import { useFormStatus } from 'react-dom';
import { addVehicle } from '@/lib/actions.js';
import { useState } from 'react';
import Image from 'next/image';

// Bouton de soumission avec état de chargement
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <motion.button
      type="submit"
      disabled={pending}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full bg-yellow-400 text-gray-900 font-semibold py-3 px-4 rounded-lg transition shadow-lg shadow-yellow-400/20 ${
        pending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-yellow-500'
      }`}
    >
      {pending ? 'Ajout en cours...' : 'Ajouter le véhicule'}
    </motion.button>
  );
}

export default function AdminVehicleForm() {
  const [message, setMessage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [useUrl, setUseUrl] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');

  // Gérer la sélection de fichier
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setUseUrl(false);
      setImageUrlInput('');
      
      // Créer une prévisualisation
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(formData) {
    // Nettoyer les anciennes valeurs d'image
    formData.delete('imageFile');
    formData.delete('imageUrl');
    
    if (!useUrl && imageFile) {
      formData.set('imageFile', imageFile);
    } else if (useUrl && imageUrlInput.trim() !== '') {
      formData.set('imageUrl', imageUrlInput);
    }

    const result = await addVehicle(formData);
    setMessage(result);
    
    if (result.success) {
      document.getElementById('vehicleForm').reset();
      setImagePreview(null);
      setImageFile(null);
      setImageUrlInput('');
      setUseUrl(false);
    }
  }

  return (
    <form id="vehicleForm" action={handleSubmit} className="space-y-4">
      {/* Message de retour */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.success ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {message.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Marque */}
        <div>
          <label className="block text-sm font-medium text-yellow-400 mb-1">
            Marque
          </label>
          <input
            type="text"
            name="marque"
            required
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400"
            placeholder="Ex: Toyota"
          />
        </div>

        {/* Modèle */}
        <div>
          <label className="block text-sm font-medium text-yellow-400 mb-1">
            Modèle
          </label>
          <input
            type="text"
            name="modele"
            required
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400"
            placeholder="Ex: Prado"
          />
        </div>

        {/* Prix en Dollars */}
        <div>
          <label className="block text-sm font-medium text-yellow-400 mb-1">
            Prix par jour (USD)
          </label>
          <input
            type="number"
            name="prix"
            required
            min="0"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400"
            placeholder="Ex: 150"
          />
        </div>

        {/* Catégorie */}
        <div>
          <label className="block text-sm font-medium text-yellow-400 mb-1">
            Catégorie
          </label>
          <select
            name="categorie"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white"
          >
            <option value="classique">Classique</option>
            <option value="prestige">Prestige</option>
            <option value="suv">SUV</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-yellow-400 mb-1">
          Description
        </label>
        <textarea
          name="description"
          required
          rows="3"
          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400"
          placeholder="Description du véhicule, caractéristiques..."
        />
      </div>

      {/* Choix du type d'image */}
      <div className="flex gap-4 mb-4">
        <button
          type="button"
          onClick={() => {
            setUseUrl(false);
            setImagePreview(null);
            setImageFile(null);
            setImageUrlInput('');
          }}
          className={`px-4 py-2 rounded-lg transition ${
            !useUrl 
              ? 'bg-yellow-400 text-gray-900' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          📤 Upload d'image
        </button>
        <button
          type="button"
          onClick={() => {
            setUseUrl(true);
            setImageFile(null);
            setImagePreview(null);
          }}
          className={`px-4 py-2 rounded-lg transition ${
            useUrl 
              ? 'bg-yellow-400 text-gray-900' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          🔗 URL d'image
        </button>
      </div>

      {/* Upload d'image */}
      {!useUrl && (
        <div>
          <label className="block text-sm font-medium text-yellow-400 mb-1">
            Image du véhicule
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg hover:border-yellow-400 transition">
            <div className="space-y-1 text-center">
              {imagePreview ? (
                <div className="mb-4">
                  <Image
                    src={imagePreview}
                    alt="Prévisualisation"
                    width={200}
                    height={150}
                    className="mx-auto rounded-lg object-cover"
                    unoptimized={true}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                    }}
                    className="mt-2 text-sm text-red-400 hover:text-red-300"
                  >
                    Supprimer l'image
                  </button>
                </div>
              ) : (
                <>
                  <svg
                    className="mx-auto h-12 w-12 text-gray-500"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-400">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer rounded-md font-medium text-yellow-400 hover:text-yellow-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-400"
                    >
                      <span>Télécharger une image</span>
                      <input
                        id="image-upload"
                        name="imageFile"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">ou glisser-déposer</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 5MB</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Option URL */}
      {useUrl && (
        <div>
          <label className="block text-sm font-medium text-yellow-400 mb-1">
            URL de l'image
          </label>
          <input
            type="url"
            name="imageUrl"
            value={imageUrlInput}
            onChange={(e) => {
              setImageUrlInput(e.target.value);
              setImagePreview(e.target.value);
            }}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400"
            placeholder="https://exemple.com/image.jpg"
          />
          {imagePreview && (
            <div className="mt-2">
              <Image
                src={imagePreview}
                alt="Prévisualisation"
                width={200}
                height={150}
                className="mx-auto rounded-lg object-cover"
                onError={() => setImagePreview(null)}
              />
            </div>
          )}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}