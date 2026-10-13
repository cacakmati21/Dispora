import React from 'react';
import { GalleryItem } from '../types';
import { X, MapPin, Camera, Calendar } from 'lucide-react';

interface GalleryModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-xs"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] border border-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900/60 hover:bg-stone-800 text-stone-200 transition-colors cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Image Frame */}
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[340px] max-h-[65vh]">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain max-h-[65vh]"
          />
        </div>

        {/* Description Panel */}
        <div className="p-5 sm:p-6 bg-stone-900 text-stone-200 border-t border-stone-800">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
            {item.category}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-4">
            {item.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400 border-t border-stone-800 pt-3">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{item.location}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-stone-400" />
              <span>{item.photographer}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>{item.date}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
