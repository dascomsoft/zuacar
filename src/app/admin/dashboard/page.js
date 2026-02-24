// Dashboard administrateur - SERVER COMPONENT
import { getVehicles } from '@/lib/actions.js';
import { logoutAdmin } from '@/lib/actions.js';
import AdminVehicleForm from '@/components/AdminVehicleForm.jsx';
import VehicleCard from '@/components/VehicleCard.jsx';
import AdminVehicleActions from '@/components/AdminVehicleActions.jsx';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Vérification authentification - AJOUT DE ASYNC
async function checkAuth() {
  const cookieStore = await cookies(); // AJOUT DE AWAIT
  const isAdmin = cookieStore.get('admin_session');
  
  if (!isAdmin || isAdmin.value !== 'authenticated') {
    redirect('/admin/login');
  }
}

export default async function AdminDashboard() {
  await checkAuth(); // Déjà bon car checkAuth est async
  const vehicles = await getVehicles();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Bouton de déconnexion */}
        <div className="flex justify-end mb-6">
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 shadow-lg"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Déconnexion
            </button>
          </form>
        </div>

        {/* Formulaire d'ajout */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8 border border-yellow-400/20">
          <h2 className="text-xl font-semibold mb-4 text-white">
            <span className="text-yellow-400">Ajouter</span> un nouveau véhicule
          </h2>
          <AdminVehicleForm />
        </div>

        {/* Liste des véhicules */}
        <h2 className="text-2xl font-bold mb-4 text-white">
          <span className="text-yellow-400">Véhicules</span> existants
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="relative group">
              <VehicleCard vehicle={vehicle} />
              <AdminVehicleActions vehicle={vehicle} />
            </div>
          ))}
        </div>

        {vehicles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">Aucun véhicule disponible.</p>
          </div>
        )}
      </div>
    </div>
  );
}