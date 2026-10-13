import React from 'react';
import { 
  Instagram, 
  Youtube, 
  MessageCircle, 
  Share2, 
  ExternalLink,
  Play,
  Heart
} from 'lucide-react';
import { heroKerbauRawa, candiAgungImg, purunImg, itikAlabioImg } from '../data/initialData';

export const SocialHub: React.FC = () => {
  const instagramPosts = [
    {
      id: 'ig-1',
      imageUrl: heroKerbauRawa,
      caption: 'Menembus kabut fajar bersama kawanan Kerbau Rawa Danau Panggang. Ekowisata unik yang hanya ada di Kalimantan Selatan! 🛶🐃 #WisataHSU #DanauPanggang',
      likes: '1.420',
      account: '@disporapar_hsu'
    },
    {
      id: 'ig-2',
      imageUrl: candiAgungImg,
      caption: 'Mengenal sejarah agung Kerajaan Negara Dipa di Candi Agung Amuntai. Menjaga warisan cagar budaya leluhur untuk generasi mendatang 🏛️✨ #CandiAgung #Amuntai',
      likes: '984',
      account: '@disporapar_hsu'
    },
    {
      id: 'ig-3',
      imageUrl: purunImg,
      caption: 'Karya tangan terampil perajin anyaman purun Desa Banyu Hirang HSU kini tembus pasar ekspor mancanegara! Kriya lokal, kebanggaan nasional 🌾👜 #PurunHSU',
      likes: '1.150',
      account: '@disporapar_hsu'
    },
    {
      id: 'ig-4',
      imageUrl: itikAlabioImg,
      caption: 'Itik Alabio, maskot kebanggaan masyarakat Hulu Sungai Utara. Nikmati kuliner legendaris dan agrowisata khas tepi sungai Banjar 🦆🌾 #KulinerHSU',
      likes: '870',
      account: '@disporapar_hsu'
    }
  ];

  const hashtags = [
    '#WisataHSU',
    '#AmuntaiKotaBertaqwa',
    '#PesonaDanauPanggang',
    '#CandiAgungAmuntai',
    '#PurunBanyuHirang',
    '#ItikAlabio',
    '#PemudaHSUJuara',
    '#DisporaparHSU'
  ];

  const handleShareApp = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Portal Resmi Disporapar Hulu Sungai Utara',
        text: 'Jelajahi keindahan wisata, budaya, dan layanan publik Disporapar HSU!',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan portal wisata HSU berhasil disalin!');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
            Promosi Wisata & Saluran Media Sosial
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-stone-900">
            Terhubung Dengan Kanal Promosi #WisataHSU
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Ikuti informasi terkini, dokumentasi event, dan video pesona budaya Hulu Sungai Utara.
          </p>
        </div>

        {/* Social Actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/6281150206100"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp Center</span>
          </a>
          <button
            onClick={handleShareApp}
            className="px-3.5 py-2 border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Bagikan</span>
          </button>
        </div>
      </div>

      {/* Video Feature & Instagram Feed Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Video Showcase Card */}
        <div className="lg:col-span-5 bg-stone-900 rounded-xl overflow-hidden text-white flex flex-col justify-between border border-stone-800 relative group">
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <img
              src={heroKerbauRawa}
              alt="Wisata Danau Panggang Video"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-emerald-700/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 ml-1 fill-white" />
              </div>
            </div>
            <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
              YouTube Official
            </div>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between bg-stone-900">
            <div>
              <div className="text-xs text-emerald-400 font-semibold mb-1">
                Dokumenter Resmi Disporapar HSU
              </div>
              <h4 className="font-bold text-base text-white leading-snug mb-2">
                "Pesona Surga Rawa Lebak & Jejak Sejarah Kerajaan Negara Dipa Amuntai"
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">
                Saksikan keindahan lanskap Danau Panggang saat matahari terbit, keramahan perajin purun Banyu Hirang, dan sakralnya peninggalan Candi Agung.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-400">Durasi: 12 Menit · 4K UHD</span>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
              >
                <span>Tonton di YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Instagram Grid */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>Instagram Feed @disporapar_hsu</span>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold inline-flex items-center gap-1"
            >
              <span>Ikuti Akun Resmi</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3.5 flex-1">
            {instagramPosts.map(post => (
              <div
                key={post.id}
                className="bg-stone-50 rounded-xl overflow-hidden border border-stone-200 flex flex-col group"
              >
                <div className="relative h-32 overflow-hidden bg-stone-200">
                  <img
                    src={post.imageUrl}
                    alt={post.account}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-md font-medium">
                    {post.account}
                  </div>
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <p className="text-[11px] text-stone-700 line-clamp-2 leading-relaxed mb-2">
                    {post.caption}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-200">
                    <span className="flex items-center gap-1 font-semibold text-rose-600">
                      <Heart className="w-3 h-3 fill-rose-600 text-rose-600" />
                      <span>{post.likes}</span>
                    </span>
                    <span className="text-emerald-800 font-medium">Lihat Post</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Viral Hashtags Ribbon */}
      <div className="pt-4 border-t border-stone-200">
        <div className="text-xs font-semibold text-stone-500 mb-2">
          Gunakan tagar resmi saat mengunggah foto liburan Anda di Amuntai:
        </div>
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(tag);
                alert(`Tagar ${tag} disalin!`);
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
