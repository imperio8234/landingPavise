"use client"

import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import { Search, MapPin, Loader, Navigation } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix para los íconos de Leaflet en React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente para mover el mapa a una nueva posición
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function MapComponent() {
  const [position, setPosition] = useState([4.4389, -75.2318]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const provider = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Asegurar que el componente esté montado antes de usar APIs del navegador
  useEffect(() => {
    setMounted(true);
    provider.current = new OpenStreetMapProvider();
  }, []);

  const searchLocations = async (query) => {
    if (!query.trim() || !provider.current) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await provider.current.search({ query });
      setSearchResults(results.slice(0, 5));
      setShowResults(true);
    } catch (error) {
      console.error('Error al buscar ubicaciones:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      searchLocations(value);
    }, 300);
  };

  const selectLocation = (result) => {
    const newPosition = [result.y, result.x];
    setPosition(newPosition);
    setSelectedLocation({
      name: result.label,
      coordinates: newPosition
    });
    setSearchTerm(result.label);
    setShowResults(false);
  };

  const getCurrentLocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      alert('Geolocalización no soportada');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newPosition = [position.coords.latitude, position.coords.longitude];
        setPosition(newPosition);
        setSelectedLocation({
          name: 'Tu ubicación actual',
          coordinates: newPosition
        });
        setSearchTerm('Mi ubicación');
      },
      (error) => {
        console.error('Error al obtener ubicación:', error);
        alert('No se pudo obtener tu ubicación actual');
      }
    );
  };

  // No renderizar hasta que esté montado
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-12 h-12 text-blue-500 animate-spin" />
          <p className="text-xl text-gray-300">Inicializando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header compacto con búsqueda */}
      <div className="relative z-20 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo/Título */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-600 rounded-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-400 to-blue-500 bg-clip-text text-transparent">
                Location Finder
              </h1>
            </div>
            
            {/* Barra de búsqueda */}
            <div className="relative flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Buscar ubicación..."
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-white placeholder-gray-400 backdrop-blur-sm transition-all"
                />
                {isSearching && (
                  <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 w-4 h-4 animate-spin" />
                )}
              </div>
              
              {/* Resultados de búsqueda */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-gray-800/95 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl mt-2 max-h-60 overflow-y-auto z-50">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => selectLocation(result)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-700/50 border-b border-gray-700 last:border-b-0 focus:outline-none focus:bg-gray-700/50 transition-colors"
                    >
                      <div className="font-medium text-white">{result.label}</div>
                      <div className="text-sm text-gray-400">
                        {result.y.toFixed(4)}, {result.x.toFixed(4)}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Botón de ubicación actual */}
            <button
              onClick={getCurrentLocation}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-black to-blue-600 text-white rounded-xl hover:from-black hover:to-blue-400 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Navigation className="w-4 h-4" />
              <span className="hidden sm:inline">Mi ubicación</span>
            </button>
          </div>
        </div>
      </div>

      {/* Información de ubicación seleccionada */}
      {selectedLocation && (
        <div className="relative z-10 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-b border-blue-500/20">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-blue-500/20 rounded-lg">
                <MapPin className="h-4 w-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-300">
                  {selectedLocation.name}
                </p>
                <p className="text-xs text-gray-400">
                  {selectedLocation.coordinates[0].toFixed(4)}, {selectedLocation.coordinates[1].toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mapa */}
      <div className="h-[calc(80vh-60px)] relative">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <ChangeView center={position} zoom={13} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <div className="text-gray-800">
                <strong>{selectedLocation ? selectedLocation.name : 'Ubicación seleccionada'}</strong>
                <br />
                <span className="text-sm">Coordenadas: {position[0].toFixed(4)}, {position[1].toFixed(4)}</span>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
        
        {/* Overlay de estilo en las esquinas */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-black/30 to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-black/30 to-transparent pointer-events-none z-10"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-black/30 to-transparent pointer-events-none z-10"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-black/30 to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
}