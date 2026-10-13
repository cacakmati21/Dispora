import React, { useRef, useState } from 'react';
import { 
  heroKerbauRawa, 
  candiAgungImg, 
  purunImg, 
  itikAlabioImg, 
  kadisImg 
} from '../data/initialData';
import { Upload, Link as LinkIcon, Image as ImageIcon, Check, RefreshCw } from 'lucide-react';

interface ImagePickerFieldProps {
  label: string;
  value: string;
  onChange: (newImageUrl: string) => void;
  helperText?: string;
}

export const ImagePickerField: React.FC<ImagePickerFieldProps> = ({
  label,
  value,
  onChange,
  helperText
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<'preset' | 'upload' | 'url'>('preset');
  const [customUrl, setCustomUrl] = useState('');

  const presetOptions = [
    { label: 'Danau Panggang (Kerbau Rawa)', src: heroKerbauRawa },
    { label: 'Situs Candi Agung Amuntai', src: candiAgungImg },
    { label: 'Desa Anyaman Purun Banyu Hirang', src: purunImg },
    { label: 'Agrowisata Itik Alabio', src: itikAlabioImg },
    { label: 'Foto Resmi Kepala Dinas', src: kadisImg }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Harap pilih berkas foto (JPG, PNG, WebP).');
      return;
    }

    // Convert to base64 Data URL so it is fully local, visible, and persists in localStorage
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = () => {
    if (!customUrl.trim()) return;
    onChange(customUrl.trim());
    setCustomUrl('');
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-stone-800">
          {label}
        </label>
        {helperText && (
          <span className="text-[11px] text-stone-500">{helperText}</span>
        )}
      </div>

      {/* Current Preview Container */}
      <div className="relative rounded-xl overflow-hidden border border-stone-200 bg-stone-100 group">
        <div className="h-44 sm:h-52 w-full flex items-center justify-center bg-stone-900/5">
          {value ? (
            <img
              src={value}
              alt="Preview Pilihan"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-4 text-stone-400">
              <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
              <span className="text-xs">Belum ada foto yang dipilih</span>
            </div>
          )}
        </div>

        {/* Change Mode Toolbar */}
        <div className="p-2.5 bg-white border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setMode('preset')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                mode === 'preset' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Foto HSU
            </button>
            <button
              type="button"
              onClick={() => setMode('upload')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                mode === 'upload' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Upload className="w-3 h-3" />
              <span>Unggah File</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('url')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                mode === 'url' ? 'bg-white text-emerald-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <LinkIcon className="w-3 h-3" />
              <span>Input URL</span>
            </button>
          </div>

          <span className="text-[11px] text-stone-500 font-medium">
            Foto Aktif Tersimpan
          </span>
        </div>
      </div>

      {/* Mode Sub-panels */}
      {mode === 'preset' && (
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
          <div className="text-[11px] font-semibold text-stone-700 mb-2">
            Pilih dari Galeri Foto Asli HSU:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {presetOptions.map((opt, idx) => {
              const isSelected = value === opt.src;
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => onChange(opt.src)}
                  className={`relative rounded-lg overflow-hidden border text-left group cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-700 ring-2 ring-emerald-600/30'
                      : 'border-stone-200 hover:border-emerald-400'
                  }`}
                >
                  <img src={opt.src} alt={opt.label} className="w-full h-14 object-cover" />
                  <div className="p-1 text-[10px] font-medium text-stone-700 truncate bg-white">
                    {opt.label}
                  </div>
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-emerald-700 text-white rounded-full p-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {mode === 'upload' && (
        <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-2xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Pilih Berkas Foto dari Perangkat</span>
            </button>
            <span className="text-[11px] text-stone-500">
              Format JPG, PNG, atau WebP.
            </span>
          </div>
        </div>
      )}

      {mode === 'url' && (
        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex gap-2 items-center">
          <input
            type="url"
            placeholder="Tempelkan tautan foto gambar (https://...)"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            className="flex-1 px-3 py-1.5 border border-stone-300 rounded-lg text-xs bg-white text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
          />
          <button
            type="button"
            onClick={handleApplyUrl}
            className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap"
          >
            Terapkan URL
          </button>
        </div>
      )}
    </div>
  );
};
