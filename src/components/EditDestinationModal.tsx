import React, { useState } from 'react';
import { Destination, DestinationCategory } from '../types';
import { ImagePickerField } from './ImagePickerField';
import { X, Save, MapPin, Tag, Compass, Phone } from 'lucide-react';

interface EditDestinationModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: Destination) => void;
}

export const EditDestinationModal: React.FC<EditDestinationModalProps> = ({
  destination,
  isOpen,
  onClose,
  onSave
}) => {
  if (!isOpen || !destination) return null;

  const [name, setName] = useState(destination.name);
  const [category, setCategory] = useState<DestinationCategory>(destination.category);
  const [imageUrl, setImageUrl] = useState(destination.imageUrl);
  const [subdistrict, setSubdistrict] = useState(destination.subdistrict);
  const [location, setLocation] = useState(destination.location);
  const [lat, setLat] = useState(destination.lat);
  const [lng, setLng] = useState(destination.lng);
  const [openHours, setOpenHours] = useState(destination.openHours);
  const [ticketPrice, setTicketPrice] = useState(destination.ticketPrice);
  const [shortDesc, setShortDesc] = useState(destination.shortDesc);
  const [description, setDescription] = useState(destination.description);
  const [contactPerson, setContactPerson] = useState(destination.contactPerson || '');
  const [phone, setPhone] = useState(destination.phone || '');
  const [facilitiesStr, setFacilitiesStr] = useState(destination.facilities ? destination.facilities.join(', ') : '');
  const [highlightsStr, setHighlightsStr] = useState(destination.highlights ? destination.highlights.join(', ') : '');

  const categoryLabels: Record<DestinationCategory, string> = {
    alam: 'Wisata Alam & Ekowisata',
    budaya: 'Cagar Budaya & Sejarah',
    kuliner_kerajinan: 'Sentra Kerajinan & Ekraf',
    olahraga_fasilitas: 'Fasilitas Pemuda & Olahraga'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Nama destinasi tidak boleh kosong.');
      return;
    }

    const updatedDestination: Destination = {
      ...destination,
      name: name.trim(),
      category,
      categoryLabel: categoryLabels[category],
      imageUrl,
      subdistrict: subdistrict.trim(),
      location: location.trim(),
      lat: Number(lat),
      lng: Number(lng),
      openHours: openHours.trim(),
      ticketPrice: ticketPrice.trim(),
      shortDesc: shortDesc.trim(),
      description: description.trim(),
      contactPerson: contactPerson.trim() || undefined,
      phone: phone.trim() || undefined,
      facilities: facilitiesStr
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0),
      highlights: highlightsStr
        .split(',')
        .map(h => h.trim())
        .filter(h => h.length > 0)
    };

    onSave(updatedDestination);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh] border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                Ubah Informasi & Foto Destinasi Wisata
              </h3>
              <p className="text-xs text-stone-500">
                Pembaruan data instan terintegrasi dengan Peta Lokasi & Katalog HSU
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
          {/* PHOTO PICKER WITH UPLOAD AND PRESET */}
          <div className="p-4 bg-stone-50/70 rounded-2xl border border-stone-200">
            <ImagePickerField
              label="Foto Utama Destinasi Wisata"
              helperText="Dapat mengunggah foto baru dari komputer/HP atau memilih foto dokumentasi HSU"
              value={imageUrl}
              onChange={(newUrl) => setImageUrl(newUrl)}
            />
          </div>

          {/* Basic Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Nama Destinasi Wisata *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Kategori Destinasi
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DestinationCategory)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                <option value="alam">Wisata Alam & Ekowisata</option>
                <option value="budaya">Cagar Budaya & Sejarah</option>
                <option value="kuliner_kerajinan">Sentra Kerajinan & Ekraf</option>
                <option value="olahraga_fasilitas">Fasilitas Pemuda & Olahraga</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Kecamatan di Kab. HSU *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Danau Panggang, Amuntai Tengah, Alabio..."
                value={subdistrict}
                onChange={(e) => setSubdistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Alamat / Lokasi Lengkap *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Coordinates (Synced with Leaflet Map) */}
          <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200">
            <div className="text-xs font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Titik Koordinat GPS (Terhubung Langsung ke Peta Lokasi)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Latitude (Garis Lintang)
                </label>
                <input
                  type="number"
                  step="any"
                  value={lat}
                  onChange={(e) => setLat(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-xs bg-white text-stone-900 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Longitude (Garis Bujur)
                </label>
                <input
                  type="number"
                  step="any"
                  value={lng}
                  onChange={(e) => setLng(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-emerald-300 rounded-lg text-xs bg-white text-stone-900 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Jam Operasional
              </label>
              <input
                type="text"
                value={openHours}
                onChange={(e) => setOpenHours(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Tarif / Biaya Tiket Masuk
              </label>
              <input
                type="text"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              Ringkasan Singkat (Muncul di Kartu Depan) *
            </label>
            <input
              type="text"
              required
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1">
              Uraian Deskripsi Lengkap Destinasi *
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          {/* Highlights & Facilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Daya Tarik Utama (Pisahkan dengan Koma)
              </label>
              <input
                type="text"
                placeholder="Contoh: Sunset Rawa, Kerbau Berenang, Klotok..."
                value={highlightsStr}
                onChange={(e) => setHighlightsStr(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Fasilitas Pengunjung (Pisahkan dengan Koma)
              </label>
              <input
                type="text"
                placeholder="Contoh: Dermaga, Musholla, Parkir, Warung..."
                value={facilitiesStr}
                onChange={(e) => setFacilitiesStr(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Contact Person */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Narahubung / Pengelola / Pokdarwis
              </label>
              <input
                type="text"
                placeholder="Contoh: Pak Hendra (Pokdarwis)"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Nomor Telepon / WhatsApp Pengelola
              </label>
              <input
                type="text"
                placeholder="Contoh: 0812-5544-3321"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-stone-300 rounded-xl text-xs bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-2xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Perubahan Destinasi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
