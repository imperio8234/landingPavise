'use client'
import dynamic from 'next/dynamic';
import { Loader } from 'lucide-react';

// Importa el componente del mapa dinámicamente sin SSR
const MapComponent = dynamic(() => import('./mapComponent'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader className="w-12 h-12 text-blue-500 animate-spin" />
        <p className="text-xl text-gray-300">Cargando mapa...</p>
      </div>
    </div>
  )
});

export default function PartnerLocator() {
  return <MapComponent />;
}