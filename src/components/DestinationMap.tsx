import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Destination, DestinationCategory } from '../types';
import { MapPin, Navigation, Compass, Layers, Info, ExternalLink } from 'lucide-react';

interface DestinationMapProps {
  destinations: Destination[];
  selectedDestinationId?: string | null;
  onSelectDestination: (destination: Destination) => void;
}

export const DestinationMap: React.FC<DestinationMapProps> = ({
  destinations,
  selectedDestinationId,
  onSelectDestination
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeDestination, setActiveDestination] = useState<Destination | null>(null);

  // Filtered destinations
  const filtered = activeCategory === 'all'
    ? destinations
    : destinations.filter(d => d.category === activeCategory);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Hulu Sungai Utara coordinates center: Amuntai (-2.4277, 115.2492)
      const map = L.map(mapContainerRef.current, {
        center: [-2.4400, 115.2200],
        zoom: 12,
        scrollWheelZoom: false
      });

      // OpenStreetMap standard tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Sync Markers when destinations or filter changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove old markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    const bounds = L.latLngBounds([]);

    filtered.forEach(dest => {
      const isSelected = selectedDestinationId === dest.id;

      // Color scheme based on category
      const colorMap: Record<DestinationCategory, { bg: string; border: string }> = {
        alam: { bg: '#059669', border: '#047857' },
        budaya: { bg: '#b45309', border: '#92400e' },
        kuliner_kerajinan: { bg: '#4338ca', border: '#3730a3' },
        olahraga_fasilitas: { bg: '#0284c7', border: '#0369a1' }
      };

      const { bg } = colorMap[dest.category] || { bg: '#059669', border: '#047857' };

      // Custom SVG DivIcon (No external broken assets)
      const customIcon = L.divIcon({
        className: 'custom-hsu-pin',
        html: `
          <div style="
            position: relative;
            width: 38px;
            height: 38px;
            background-color: ${bg};
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 2px solid #ffffff;
            cursor: pointer;
            transition: transform 0.2s ease;
          ">
            <div style="
              transform: rotate(45deg);
              width: 14px;
              height: 14px;
              background-color: white;
              border-radius: 50%;
            "></div>
          </div>
        `,
        iconSize: [38, 38],
        iconAnchor: [19, 38],
        popupAnchor: [0, -38]
      });

      const marker = L.marker([dest.lat, dest.lng], { icon: customIcon }).addTo(map);

      // Popup Content
      const popupHtml = `
        <div style="width: 250px; font-family: 'Plus Jakarta Sans', system-ui, sans-serif;">
          <img src="${dest.imageUrl}" alt="${dest.name}" style="width: 100%; height: 120px; object-fit: cover; display: block;" />
          <div style="padding: 12px;">
            <div style="font-size: 11px; font-weight: 600; color: #059669; text-transform: uppercase; margin-bottom: 4px;">
              ${dest.categoryLabel}
            </div>
            <h4 style="font-size: 14px; font-weight: 700; color: #1c1917; margin: 0 0 6px 0; line-height: 1.3;">
              ${dest.name}
            </h4>
            <p style="font-size: 12px; color: #57534e; margin: 0 0 8px 0; line-height: 1.4;">
              ${dest.location}
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f5f5f4; padding-top: 8px; font-size: 11px; color: #78716c;">
              <span>🕒 ${dest.openHours.split('(')[0].trim()}</span>
              <span style="font-weight: 600; color: #059669;">★ ${dest.rating}</span>
            </div>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      marker.on('click', () => {
        setActiveDestination(dest);
      });

      markersRef.current[dest.id] = marker;
      bounds.extend([dest.lat, dest.lng]);

      if (isSelected) {
        marker.openPopup();
        setActiveDestination(dest);
      }
    });

    if (filtered.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    }
  }, [filtered, selectedDestinationId]);

  // Handle click from sidebar list
  const handleFocusDestination = (dest: Destination) => {
    setActiveDestination(dest);
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([dest.lat, dest.lng], 14, { duration: 1 });
      const marker = markersRef.current[dest.id];
      if (marker) {
        marker.openPopup();
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
      {/* Map Control Bar */}
      <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4 text-emerald-700" />
            <span>Peta Interaktif Kabupaten Hulu Sungai Utara</span>
          </div>
          <h3 className="text-lg font-bold text-stone-900">
            Jelajahi Titik Wisata & Fasilitas Olahraga HSU
          </h3>
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-xl border border-stone-200 shadow-2xs">
          {[
            { id: 'all', label: 'Semua Titik' },
            { id: 'alam', label: 'Wisata Alam' },
            { id: 'budaya', label: 'Cagar Budaya' },
            { id: 'kuliner_kerajinan', label: 'Kriya & Agrowisata' },
            { id: 'olahraga_fasilitas', label: 'Sarana Olahraga' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-emerald-800 text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Map + Synchronized Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* Leaflet Container */}
        <div className="lg:col-span-8 relative">
          <div ref={mapContainerRef} className="w-full h-[400px] lg:h-full min-h-[420px] bg-stone-100" />
          
          {/* Quick Map Legend Overlay */}
          <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-xs p-2.5 rounded-xl border border-stone-200 shadow-sm text-xs text-stone-700 hidden sm:block">
            <div className="font-semibold text-stone-900 mb-1.5 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>Legenda Lokasi:</span>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> Wisata Alam
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-700"></span> Cagar Budaya
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-700"></span> Kriya & Agro
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600"></span> Olahraga & GOR
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar: Location List & Selected Detail Card */}
        <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-stone-200 flex flex-col bg-stone-50/40 max-h-[560px] overflow-hidden">
          {/* Active Detail Header if clicked */}
          {activeDestination ? (
            <div className="p-4 bg-white border-b border-stone-200 shrink-0">
              <div className="flex items-center justify-between text-xs text-emerald-800 font-semibold mb-1">
                <span>{activeDestination.categoryLabel}</span>
                <span className="text-stone-500">Kec. {activeDestination.subdistrict}</span>
              </div>
              <h4 className="font-bold text-stone-900 text-base leading-snug mb-1">
                {activeDestination.name}
              </h4>
              <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                {activeDestination.shortDesc}
              </p>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectDestination(activeDestination)}
                  className="flex-1 px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Detail Lengkap</span>
                </button>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${activeDestination.lat},${activeDestination.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-stone-700" />
                  <span>Rute Maps</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-stone-100/80 border-b border-stone-200 text-xs text-stone-600 shrink-0">
              Pilih titik pada peta atau daftar di bawah untuk melihat rincian lokasi:
            </div>
          )}

          {/* Scrollable Location List */}
          <div className="flex-1 overflow-y-auto divide-y divide-stone-100 p-2 space-y-1">
            {filtered.map(dest => {
              const isCurrent = activeDestination?.id === dest.id;
              return (
                <div
                  key={dest.id}
                  onClick={() => handleFocusDestination(dest)}
                  className={`p-3 rounded-xl transition-all cursor-pointer flex gap-3 items-center ${
                    isCurrent
                      ? 'bg-white shadow-2xs border border-emerald-200 ring-1 ring-emerald-500/20'
                      : 'hover:bg-white/80'
                  }`}
                >
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-14 h-14 rounded-lg object-cover shrink-0 border border-stone-200"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between text-[11px] text-stone-500 mb-0.5">
                      <span className="truncate font-medium text-emerald-800">{dest.categoryLabel}</span>
                      <span className="shrink-0 text-stone-700 font-semibold">★ {dest.rating}</span>
                    </div>
                    <h5 className="font-semibold text-stone-900 text-xs line-clamp-1">
                      {dest.name}
                    </h5>
                    <p className="text-[11px] text-stone-500 truncate flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 shrink-0 text-stone-400" />
                      <span>{dest.location}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
