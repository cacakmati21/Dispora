import React from 'react';
import { Destination } from '../types';
import { X, MapPin, Clock, Ticket, Phone, CheckCircle, Navigation, ExternalLink, Share2, Edit3, Camera } from 'lucide-react';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onEdit?: (destination: Destination) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onEdit
}) => {
  if (!destination) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: destination.name,
        text: `Kunjungi ${destination.name} di Hulu Sungai Utara!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan destinasi berhasil disalin ke clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Visual with Scrim */}
        <div className="relative h-64 sm:h-80 w-full shrink-0 group">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />
          
          {/* Quick Edit Photo / Data button floating on top banner */}
          {onEdit && (
            <button
              onClick={() => onEdit(destination)}
              className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-emerald-800 text-white backdrop-blur-md transition-colors text-xs font-semibold flex items-center gap-1.5 cursor-pointer border border-white/20 shadow-md"
              title="Ubah Destinasi & Foto"
            >
              <Camera className="w-3.5 h-3.5 text-emerald-300" />
              <span>Ubah Foto / Data Destinasi</span>
            </button>
          )}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-xs transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title and metadata over scrim */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-1">
              <span>{destination.categoryLabel}</span>
              <span>·</span>
              <span>Kec. {destination.subdistrict}</span>
              <span>·</span>
              <span>★ {destination.rating} ({destination.reviewsCount} Ulasan)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-title leading-tight">
              {destination.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Operational Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 text-xs">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-stone-900">Jam Operasional</span>
                <span className="text-stone-600">{destination.openHours}</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Ticket className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-stone-900">Biaya / Tiket Masuk</span>
                <span className="text-stone-600">{destination.ticketPrice}</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-stone-900">Lokasi / Alamat</span>
                <span className="text-stone-600">{destination.location}</span>
              </div>
            </div>
          </div>

          {/* Detailed Narrative */}
          <div>
            <h3 className="text-base font-bold text-stone-900 mb-2">
              Tentang Destinasi
            </h3>
            <p className="text-stone-700 leading-relaxed text-sm whitespace-pre-line">
              {destination.description}
            </p>
          </div>

          {/* Highlights */}
          {destination.highlights && destination.highlights.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-stone-900 mb-2.5">
                Daya Tarik Utama
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {destination.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-100">
                    <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Facilities */}
          {destination.facilities && destination.facilities.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-stone-900 mb-2">
                Fasilitas Pengunjung
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {destination.facilities.map((fac, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                    {fac}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact Person */}
          {destination.contactPerson && (
            <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-800 shrink-0" />
                <div>
                  <span className="font-semibold text-stone-900 block">Narahubung / Pengelola:</span>
                  <span className="text-stone-600">{destination.contactPerson} ({destination.phone})</span>
                </div>
              </div>
              {destination.phone && (
                <a
                  href={`https://wa.me/${destination.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold transition-colors shrink-0"
                >
                  Hubungi via WhatsApp
                </a>
              )}
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3.5 py-2 border border-stone-200 hover:bg-stone-50 rounded-xl text-xs font-semibold text-stone-700 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan</span>
              </button>
              {onEdit && (
                <button
                  onClick={() => onEdit(destination)}
                  className="px-3.5 py-2 bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Ubah Data & Foto</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
              >
                Tutup
              </button>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-2xs transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Petunjuk Arah Google Maps</span>
                <ExternalLink className="w-3 h-3 text-emerald-200" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
