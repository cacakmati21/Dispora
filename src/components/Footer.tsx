import React from 'react';
import { MapPin, Phone, Mail, Lock } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Instansi */}
          <div className="space-y-3">
            <h3 className="text-white font-bold font-serif-title text-base">
              DISPORAPAR HSU
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Dinas Kepemudaan, Olahraga, dan Pariwisata Pemerintah Kabupaten Hulu Sungai Utara, Provinsi Kalimantan Selatan.
            </p>
            <div className="pt-2 text-xs text-emerald-400 font-semibold">
              Maju, Agamis, Sejahtera & Mandiri
            </div>
          </div>

          {/* Col 2: Alamat & Kontak */}
          <div className="space-y-3 text-xs">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Kantor & Kontak
            </h4>
            <div className="space-y-2 text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Jl. Basuki Rahmat No. 12, Amuntai Tengah, Kab. HSU, Kalsel 71414</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>(0527) 61011 / WA: 0811-5020-6100</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>disporapar@hulusungaiutarakab.go.id</span>
              </p>
            </div>
          </div>

          {/* Col 3: Navigasi Cepat */}
          <div className="space-y-3 text-xs">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Layanan Informasi
            </h4>
            <ul className="space-y-1.5 text-stone-400">
              <li>
                <button onClick={() => onNavigate('berita')} className="hover:text-white transition-colors cursor-pointer">
                  Agenda & Berita Daerah
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinasi')} className="hover:text-white transition-colors cursor-pointer">
                  Katalog Destinasi Wisata HSU
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('peta')} className="hover:text-white transition-colors cursor-pointer">
                  Peta Wisata Interaktif
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('layanan')} className="hover:text-white transition-colors cursor-pointer">
                  Pengajuan Izin Event & GOR Online
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('profil')} className="hover:text-white transition-colors cursor-pointer">
                  Visi, Misi & Struktur Dinas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Administrator Portal */}
          <div className="space-y-3 text-xs">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Pengelolaan Konten
            </h4>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              Sistem Manajemen Konten (CMS) terintegrasi untuk memperbarui berita, destinasi wisata, galeri, dan memproses perizinan masyarakat.
            </p>
            <button
              onClick={onOpenAdmin}
              className="mt-2 w-full py-2 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Portal Admin CMS</span>
            </button>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} Disporapar Kabupaten Hulu Sungai Utara. Hak Cipta Dilindungi.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Amuntai Kota Bertaqwa</span>
            <span>·</span>
            <span>Kalimantan Selatan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
