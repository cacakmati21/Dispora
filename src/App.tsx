import React, { useState, useEffect } from 'react';
import { 
  Destination, 
  NewsArticle, 
  GalleryItem, 
  PermitApplication, 
  PermitType, 
  PermitServiceInfo,
  DepartmentProfile 
} from './types';
import { 
  getStoredDestinations, 
  getStoredNews, 
  getStoredGallery, 
  getStoredApplications, 
  getStoredProfile,
  saveDestinations 
} from './services/storage';
import { PERMIT_SERVICES } from './data/initialData';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DestinationMap } from './components/DestinationMap';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { EditDestinationModal } from './components/EditDestinationModal';
import { NewsDetailModal } from './components/NewsDetailModal';
import { GalleryModal } from './components/GalleryModal';
import { PermitApplicationModal } from './components/PermitApplicationModal';
import { PermitTrackerModal } from './components/PermitTrackerModal';
import { SearchModal } from './components/SearchModal';
import { AdminCMS } from './components/AdminCMS';
import { DepartmentProfileView } from './components/DepartmentProfileView';
import { SocialHub } from './components/SocialHub';

// Icons
import { 
  Search, 
  Compass, 
  MapPin, 
  FileCheck, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Clock, 
  Eye, 
  ChevronRight,
  ShieldCheck,
  Send,
  Edit3,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  // State for data
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [applications, setApplications] = useState<PermitApplication[]>([]);
  const [profile, setProfile] = useState<DepartmentProfile>(getStoredProfile());

  // Navigation State
  const [activeSection, setActiveSection] = useState<string>('home');

  // Filter States
  const [destCategoryFilter, setDestCategoryFilter] = useState<string>('all');
  const [newsCategoryFilter, setNewsCategoryFilter] = useState<string>('all');
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('all');

  // Modals State
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [editingDestinationTarget, setEditingDestinationTarget] = useState<Destination | null>(null);
  const [isEditDestinationOpen, setIsEditDestinationOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPermitApplyOpen, setIsPermitApplyOpen] = useState(false);
  const [selectedPermitServiceId, setSelectedPermitServiceId] = useState<PermitType>('izin_event');
  const [isPermitTrackerOpen, setIsPermitTrackerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Quick tracker input in hero/services
  const [quickTrackCode, setQuickTrackCode] = useState('');

  // Initial load
  useEffect(() => {
    setDestinations(getStoredDestinations());
    setNews(getStoredNews());
    setGallery(getStoredGallery());
    setApplications(getStoredApplications());
    setProfile(getStoredProfile());
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSaveDestination = (updated: Destination) => {
    const updatedList = destinations.map(d => d.id === updated.id ? updated : d);
    setDestinations(updatedList);
    saveDestinations(updatedList);
    triggerToast(`Destinasi "${updated.name}" dan fotonya berhasil diperbarui!`);
  };

  // Filtered views
  const filteredDestinations = destCategoryFilter === 'all'
    ? destinations
    : destinations.filter(d => d.category === destCategoryFilter);

  const filteredNews = newsCategoryFilter === 'all'
    ? news
    : news.filter(n => n.category === newsCategoryFilter);

  const filteredGallery = galleryCategoryFilter === 'all'
    ? gallery
    : gallery.filter(g => g.category === galleryCategoryFilter);

  const featuredNews = news.find(n => n.isFeatured) || news[0];

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-emerald-700 selection:text-white">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Instant Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs font-semibold border border-emerald-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Page Body */}
      <main className="flex-1 space-y-16 lg:space-y-24">
        {/* HERO SECTION */}
        <section className="relative bg-stone-900 text-white overflow-hidden">
          {/* Background Hero Image with Measured Scrim */}
          <div className="absolute inset-0">
            {destinations[0] && (
              <img
                src={destinations[0].imageUrl}
                alt="Wisata Danau Panggang Kerbau Rawa HSU"
                className="w-full h-full object-cover object-center opacity-45 scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-3xl space-y-6">
              {/* Regional Authority Kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>Pemerintah Kabupaten Hulu Sungai Utara · Kalimantan Selatan</span>
              </div>

              {/* Display Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif-title leading-[1.15] text-white">
                Pesona Alam Rawa Lebak & Semangat Pemuda Juara
              </h1>

              {/* Body Prose Deck */}
              <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
                Selamat datang di portal resmi Disporapar HSU. Temukan keajaiban ekowisata kerbau rawa Danau Panggang, keagungan cagar budaya Candi Agung, keunggulan kriya purun, serta layanan perizinan online terintegrasi.
              </p>

              {/* Interactive Search Bar in Hero */}
              <div className="pt-2">
                <div 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 sm:p-2.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl flex items-center gap-3 border border-white/20 cursor-pointer hover:bg-white transition-colors"
                >
                  <Search className="w-5 h-5 text-emerald-800 ml-2 shrink-0" />
                  <span className="text-xs sm:text-sm text-stone-500 flex-1 truncate">
                    Cari destinasi wisata, pengumuman, layanan perizinan, atau agenda...
                  </span>
                  <button className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer">
                    Cari Sekarang
                  </button>
                </div>
              </div>

              {/* Quick Actions Strip */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleNavigate('destinasi')}
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Katalog Destinasi Wisata</span>
                </button>
                <button
                  onClick={() => handleNavigate('peta')}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-xs border border-white/20 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Buka Peta Lokasi</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedPermitServiceId('izin_event');
                    setIsPermitApplyOpen(true);
                  }}
                  className="px-5 py-2.5 bg-amber-600/90 hover:bg-amber-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Layanan Izin Online</span>
                </button>
              </div>
            </div>
          </div>

          {/* Operational Utility Ribbon below Hero */}
          <div className="relative border-t border-white/10 bg-black/40 backdrop-blur-xs py-3.5 px-4">
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-stone-300">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-semibold">Ibukota: Kota Amuntai</span>
                <span className="text-stone-600">·</span>
                <span>10 Kecamatan</span>
                <span className="text-stone-600">·</span>
                <span>Bumi Agung Menanti Anda</span>
              </div>
              <div className="flex items-center gap-4 text-stone-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pelayanan Publik Bebas Pungli</span>
                </span>
                <button
                  onClick={() => setIsPermitTrackerOpen(true)}
                  className="text-emerald-300 hover:text-white underline font-medium cursor-pointer"
                >
                  Lacak Status Berkas Izin →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: BERITA & AGENDA RESMI */}
        <section id="berita" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-1">
                Kanal Publikasi Resmi
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-stone-900">
                Berita & Agenda Kegiatan Terkini
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Kabar aktual seputar program kepemudaan, pembinaan olahraga, dan pengembangan pariwisata di HSU.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200">
              {['all', 'Pariwisata', 'Kepemudaan', 'Olahraga', 'Ekraf'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setNewsCategoryFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    newsCategoryFilter === cat
                      ? 'bg-white text-emerald-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat === 'all' ? 'Semua Berita' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* News 3-Tier Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Lead Story (7 cols) */}
            {featuredNews && (
              <div 
                onClick={() => setSelectedNews(featuredNews)}
                className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between group"
              >
                <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-100">
                  <img
                    src={featuredNews.imageUrl}
                    alt={featuredNews.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-900/90 text-white text-[11px] font-semibold uppercase px-2.5 py-1 rounded-md">
                    {featuredNews.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-xs text-stone-500 flex items-center gap-2">
                      <span>{featuredNews.publishedAt}</span>
                      <span>·</span>
                      <span>{featuredNews.author}</span>
                      <span>·</span>
                      <span>{featuredNews.readTimeMinutes} menit baca</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-stone-900 group-hover:text-emerald-800 transition-colors leading-tight">
                      {featuredNews.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                      {featuredNews.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-100 flex items-center text-xs font-semibold text-emerald-800 group-hover:translate-x-1 transition-transform">
                    <span>Baca Artikel Selengkapnya</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            )}

            {/* Secondary Features List (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
              {filteredNews.filter(n => n.id !== featuredNews?.id).slice(0, 3).map(article => (
                <div
                  key={article.id}
                  onClick={() => setSelectedNews(article)}
                  className="bg-white p-4 rounded-xl border border-stone-200 hover:border-emerald-300 transition-all cursor-pointer flex gap-4 items-center group shadow-2xs"
                >
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-24 h-24 rounded-lg object-cover shrink-0 border border-stone-100 group-hover:opacity-90"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] text-emerald-800 font-semibold mb-1">
                      {article.category} · {article.publishedAt}
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug mb-1">
                      {article.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      {article.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: SISTEM INFORMASI DESTINASI WISATA */}
        <section id="destinasi" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-1">
                Ekowisata, Sejarah & Kriya Daerah
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-stone-900">
                Sistem Informasi Destinasi Wisata HSU
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Jelajahi keunikan bentang alam rawa lebak, cagar budaya peninggalan Kerajaan Negara Dipa, dan sentra kriya purun unggulan.
              </p>
            </div>

            {/* Interactive category buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200">
              {[
                { id: 'all', label: 'Semua Destinasi' },
                { id: 'alam', label: 'Wisata Alam' },
                { id: 'budaya', label: 'Cagar Budaya' },
                { id: 'kuliner_kerajinan', label: 'Kriya & Agrowisata' },
                { id: 'olahraga_fasilitas', label: 'Sarana Olahraga' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setDestCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    destCategoryFilter === cat.id
                      ? 'bg-emerald-800 text-white shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map(dest => (
              <div
                key={dest.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between group"
              >
                <div>
                  {/* Card Visual with unboxed category */}
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img
                      src={dest.imageUrl}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                    
                    {/* Floating Quick Edit Photo Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingDestinationTarget(dest);
                        setIsEditDestinationOpen(true);
                      }}
                      className="absolute top-3 right-3 p-1.5 bg-black/60 hover:bg-emerald-800 text-white rounded-lg backdrop-blur-xs transition-colors cursor-pointer text-xs font-semibold flex items-center gap-1"
                      title="Ubah Foto & Data"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[10px]">Ubah</span>
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mb-0.5">
                        {dest.categoryLabel}
                      </div>
                      <h3 className="font-bold text-base sm:text-lg leading-snug">
                        {dest.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {dest.shortDesc}
                    </p>

                    {/* Operational Strip */}
                    <div className="space-y-1.5 text-xs text-stone-500 pt-2 border-t border-stone-100">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span className="truncate">{dest.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{dest.openHours.split('(')[0].trim()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-stone-50/70 border-t border-stone-200 flex items-center justify-between">
                  <div className="text-xs font-semibold text-stone-700">
                    ★ {dest.rating} <span className="text-stone-400 font-normal">({dest.reviewsCount})</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditingDestinationTarget(dest);
                        setIsEditDestinationOpen(true);
                      }}
                      className="px-2.5 py-1.5 bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                      title="Ubah Data & Foto"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Ubah</span>
                    </button>
                    <button
                      onClick={() => setSelectedDestination(dest)}
                      className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Detail</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: PETA LOKASI WISATA INTERAKTIF */}
        <section id="peta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <div className="mb-6">
            <div className="text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-1">
              Geolokasi & Pemetaan Terpadu
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-stone-900">
              Peta Interaktif Destinasi & Fasilitas HSU
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Jelajahi sebaran titik wisata, cagar budaya, dan fasilitas gelanggang olahraga di seluruh wilayah Kabupaten Hulu Sungai Utara.
            </p>
          </div>

          {/* Interactive Leaflet Map with Synchronized Sidebar */}
          <DestinationMap
            destinations={destinations}
            selectedDestinationId={selectedDestination?.id}
            onSelectDestination={(dest) => setSelectedDestination(dest)}
          />
        </section>

        {/* SECTION: GALERI FOTO & DOKUMENTASI VISUAL */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-1">
                Koleksi Visual
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif-title text-stone-900">
                Galeri Pesona Budaya & Wisata HSU
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Dokumentasi lensa keindahan alam, kegiatan masyarakat pengrajin, dan cagar budaya di Hulu Sungai Utara.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200">
              {['all', 'Destinasi', 'Budaya', 'Kegiatan Dinas'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setGalleryCategoryFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    galleryCategoryFilter === cat
                      ? 'bg-white text-emerald-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {cat === 'all' ? 'Semua Album' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryItem(item)}
                className="group relative rounded-xl overflow-hidden bg-stone-100 border border-stone-200 cursor-pointer shadow-2xs aspect-4/3"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white">
                  <div className="text-[10px] text-emerald-300 font-semibold uppercase">
                    {item.category}
                  </div>
                  <h4 className="text-xs font-bold truncate">
                    {item.title}
                  </h4>
                  <div className="text-[10px] text-stone-300 truncate">
                    {item.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: LAYANAN PERIZINAN ONLINE */}
        <section id="layanan" className="bg-stone-900 text-stone-100 py-16 lg:py-20 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
                  Portal Pelayanan Publik Digital
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold font-serif-title text-white">
                  Layanan Perizinan & Rekomendasi Terpadu Online
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-2xl leading-relaxed">
                  Permohonan rekomendasi izin penyelenggaraan event wisata, peminjaman GOR Kamboja, tanda daftar usaha pariwisata, dan pendaftaran komunitas tanpa perlu antre ke kantor dinas.
                </p>
              </div>

              {/* Lacak Button */}
              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={() => setIsPermitTrackerOpen(true)}
                  className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Lacak Status Permohonan</span>
                </button>
              </div>
            </div>

            {/* Quick Track Input Bar */}
            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 max-w-xl flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="Sudah mengajukan? Ketik kode resi (misal: HSU-IZIN-2026-0104)..."
                value={quickTrackCode}
                onChange={(e) => setQuickTrackCode(e.target.value)}
                className="flex-1 w-full bg-stone-900 border border-stone-600 px-3.5 py-2 rounded-xl text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
              <button
                onClick={() => {
                  if (quickTrackCode.trim()) {
                    setIsPermitTrackerOpen(true);
                  } else {
                    setIsPermitTrackerOpen(true);
                  }
                }}
                className="w-full sm:w-auto px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Cek Resi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 4 Permit Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PERMIT_SERVICES.map(svc => (
                <div
                  key={svc.id}
                  className="bg-stone-800/90 rounded-2xl border border-stone-700 p-5 flex flex-col justify-between hover:border-emerald-500/50 transition-colors"
                >
                  <div>
                    <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                      {svc.category}
                    </div>
                    <h3 className="font-bold text-white text-base leading-snug mb-2">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-stone-300 leading-relaxed mb-4 line-clamp-3">
                      {svc.description}
                    </p>

                    <div className="space-y-1.5 text-xs text-stone-400 border-t border-stone-700/80 pt-3 mb-4">
                      <div>Waktu Proses: <strong className="text-white">{svc.processingDays} Hari Kerja</strong></div>
                      <div>Biaya: <strong className="text-emerald-400">{svc.fee}</strong></div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPermitServiceId(svc.id);
                      setIsPermitApplyOpen(true);
                    }}
                    className="w-full py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Ajukan Permohonan</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: PROFIL DINAS */}
        <section id="profil" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
          <DepartmentProfileView profile={profile} />
        </section>

        {/* SECTION: PROMOSI SOSIAL & MEDIA HUB */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SocialHub />
        </section>
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* MODALS */}
      <DestinationDetailModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onEdit={(dest) => {
          setSelectedDestination(null);
          setEditingDestinationTarget(dest);
          setIsEditDestinationOpen(true);
        }}
      />

      <EditDestinationModal
        destination={editingDestinationTarget}
        isOpen={isEditDestinationOpen}
        onClose={() => {
          setIsEditDestinationOpen(false);
          setEditingDestinationTarget(null);
        }}
        onSave={handleSaveDestination}
      />

      <NewsDetailModal
        article={selectedNews}
        onClose={() => setSelectedNews(null)}
      />

      <GalleryModal
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        destinations={destinations}
        news={news}
        gallery={gallery}
        onSelectDestination={(d) => setSelectedDestination(d)}
        onSelectNews={(n) => setSelectedNews(n)}
        onSelectPermit={(s) => {
          setSelectedPermitServiceId(s.id);
          setIsPermitApplyOpen(true);
        }}
      />

      <PermitApplicationModal
        initialServiceId={selectedPermitServiceId}
        isOpen={isPermitApplyOpen}
        onClose={() => setIsPermitApplyOpen(false)}
        onSubmitSuccess={(newApp) => {
          const updated = [newApp, ...applications];
          setApplications(updated);
          triggerToast('Permohonan perizinan berhasil diajukan!');
        }}
      />

      <PermitTrackerModal
        applications={applications}
        isOpen={isPermitTrackerOpen}
        onClose={() => setIsPermitTrackerOpen(false)}
        onOpenNewApplication={() => {
          setSelectedPermitServiceId('izin_event');
          setIsPermitApplyOpen(true);
        }}
      />

      {isAdminOpen && (
        <AdminCMS
          destinations={destinations}
          news={news}
          gallery={gallery}
          applications={applications}
          profile={profile}
          onUpdateDestinations={(d) => {
            setDestinations(d);
            triggerToast('Daftar destinasi wisata diperbarui!');
          }}
          onUpdateNews={(n) => {
            setNews(n);
            triggerToast('Daftar berita diperbarui!');
          }}
          onUpdateGallery={(g) => {
            setGallery(g);
            triggerToast('Galeri foto diperbarui!');
          }}
          onUpdateApplications={(a) => {
            setApplications(a);
            triggerToast('Status permohonan perizinan diperbarui!');
          }}
          onUpdateProfile={(p) => {
            setProfile(p);
            triggerToast('Profil kedinasan dan foto pimpinan diperbarui!');
          }}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
}
