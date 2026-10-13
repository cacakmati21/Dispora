import React, { useState } from 'react';
import { 
  Destination, 
  NewsArticle, 
  GalleryItem, 
  PermitApplication, 
  ApplicationStatus,
  NewsCategory,
  DestinationCategory,
  DepartmentProfile
} from '../types';
import { 
  saveDestinations, 
  saveNews, 
  saveGallery, 
  saveApplications, 
  saveProfile,
  resetToDefaultData 
} from '../services/storage';
import { 
  heroKerbauRawa 
} from '../data/initialData';
import { ImagePickerField } from './ImagePickerField';
import { 
  Settings, 
  Newspaper, 
  MapPin, 
  Image as ImageIcon, 
  FileCheck, 
  UserCheck,
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  X, 
  RotateCcw, 
  Download, 
  Check, 
  AlertCircle,
  Building2
} from 'lucide-react';

interface AdminCMSProps {
  destinations: Destination[];
  news: NewsArticle[];
  gallery: GalleryItem[];
  applications: PermitApplication[];
  profile: DepartmentProfile;
  onUpdateDestinations: (d: Destination[]) => void;
  onUpdateNews: (n: NewsArticle[]) => void;
  onUpdateGallery: (g: GalleryItem[]) => void;
  onUpdateApplications: (a: PermitApplication[]) => void;
  onUpdateProfile: (p: DepartmentProfile) => void;
  onClose: () => void;
  initialTab?: 'news' | 'destinations' | 'gallery' | 'permits' | 'profile' | 'backup';
}

export const AdminCMS: React.FC<AdminCMSProps> = ({
  destinations,
  news,
  gallery,
  applications,
  profile,
  onUpdateDestinations,
  onUpdateNews,
  onUpdateGallery,
  onUpdateApplications,
  onUpdateProfile,
  onClose,
  initialTab = 'destinations'
}) => {
  const [activeTab, setActiveTab] = useState<'news' | 'destinations' | 'gallery' | 'permits' | 'profile' | 'backup'>(initialTab);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // --- NEWS STATE ---
  const [editingNews, setEditingNews] = useState<NewsArticle | null>(null);
  const [isAddingNews, setIsAddingNews] = useState(false);

  // --- DESTINATION STATE ---
  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  const [isAddingDest, setIsAddingDest] = useState(false);

  // --- GALLERY STATE ---
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [isAddingGallery, setIsAddingGallery] = useState(false);

  // --- PROFILE STATE ---
  const [editingProfile, setEditingProfile] = useState<DepartmentProfile>({ ...profile });

  // --- NEWS HANDLERS ---
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNews) return;

    let updated: NewsArticle[];
    if (isAddingNews) {
      updated = [editingNews, ...news];
    } else {
      updated = news.map(item => item.id === editingNews.id ? editingNews : item);
    }

    onUpdateNews(updated);
    saveNews(updated);
    setEditingNews(null);
    setIsAddingNews(false);
    showNotify('Artikel berita berhasil disimpan!');
  };

  const handleDeleteNews = (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus artikel berita ini?')) return;
    const updated = news.filter(n => n.id !== id);
    onUpdateNews(updated);
    saveNews(updated);
    showNotify('Berita berhasil dihapus.');
  };

  // --- DESTINATION HANDLERS ---
  const handleSaveDest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDest) return;

    let updated: Destination[];
    if (isAddingDest) {
      updated = [editingDest, ...destinations];
    } else {
      updated = destinations.map(d => d.id === editingDest.id ? editingDest : d);
    }

    onUpdateDestinations(updated);
    saveDestinations(updated);
    setEditingDest(null);
    setIsAddingDest(false);
    showNotify('Data & foto destinasi wisata berhasil disimpan!');
  };

  const handleDeleteDest = (id: string) => {
    if (!confirm('Hapus destinasi wisata ini?')) return;
    const updated = destinations.filter(d => d.id !== id);
    onUpdateDestinations(updated);
    saveDestinations(updated);
    showNotify('Destinasi wisata berhasil dihapus.');
  };

  // --- GALLERY HANDLERS ---
  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery) return;

    let updated: GalleryItem[];
    if (isAddingGallery) {
      updated = [editingGallery, ...gallery];
    } else {
      updated = gallery.map(g => g.id === editingGallery.id ? editingGallery : g);
    }

    onUpdateGallery(updated);
    saveGallery(updated);
    setEditingGallery(null);
    setIsAddingGallery(false);
    showNotify('Item galeri foto berhasil diperbarui!');
  };

  const handleDeleteGallery = (id: string) => {
    if (!confirm('Hapus foto ini dari galeri?')) return;
    const updated = gallery.filter(g => g.id !== id);
    onUpdateGallery(updated);
    saveGallery(updated);
    showNotify('Foto berhasil dihapus dari galeri.');
  };

  // --- PERMITS HANDLERS ---
  const handleUpdatePermitStatus = (appId: string, newStatus: ApplicationStatus, notes?: string) => {
    const updated = applications.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: newStatus,
          notes: notes !== undefined ? notes : app.notes,
          updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
        };
      }
      return app;
    });

    onUpdateApplications(updated);
    saveApplications(updated);
    showNotify(`Status permohonan ${appId} diubah menjadi "${newStatus}".`);
  };

  // --- PROFILE HANDLERS ---
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(editingProfile);
    saveProfile(editingProfile);
    showNotify('Profil kedinasan dan foto pimpinan berhasil diperbarui!');
  };

  // --- BACKUP & RESET ---
  const handleResetData = () => {
    if (!confirm('PERHATIAN: Apakah Anda ingin mengembalikan semua data ke data bawaan Disporapar HSU?')) return;
    resetToDefaultData();
    window.location.reload();
  };

  const handleExportJSON = () => {
    const data = {
      destinations,
      news,
      gallery,
      applications,
      profile,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_disporapar_hsu_${Date.now()}.json`;
    a.click();
    showNotify('Cadangan data berhasil diunduh dalam format JSON.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-4 flex flex-col max-h-[94vh] border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white">
                  Sistem Manajemen Konten (CMS)
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded">
                  Admin Portal
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Pembaruan Destinasi, Foto, Berita, Galeri & Profil Dinas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 py-2 border-b border-stone-200 bg-stone-50 flex flex-wrap items-center gap-1.5 shrink-0 overflow-x-auto">
          {[
            { id: 'destinations', label: 'Destinasi Wisata', icon: MapPin, count: destinations.length },
            { id: 'news', label: 'Manajemen Berita', icon: Newspaper, count: news.length },
            { id: 'gallery', label: 'Galeri Foto', icon: ImageIcon, count: gallery.length },
            { id: 'permits', label: 'Layanan Perizinan', icon: FileCheck, count: applications.length },
            { id: 'profile', label: 'Profil Dinas & Pimpinan', icon: UserCheck },
            { id: 'backup', label: 'Cadangan & Pemulihan', icon: RotateCcw }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setEditingNews(null);
                  setEditingDest(null);
                  setEditingGallery(null);
                  setIsAddingNews(false);
                  setIsAddingDest(false);
                  setIsAddingGallery(false);
                }}
                className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-emerald-900 text-white' : 'bg-stone-200 text-stone-700'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Floating Notification */}
        {notification && (
          <div className="bg-emerald-700 text-white text-xs font-semibold py-2 px-4 text-center shrink-0 flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* TAB 1: DESTINATIONS */}
          {activeTab === 'destinations' && (
            <div className="space-y-4">
              {editingDest ? (
                /* Edit/Add Destination Form */
                <form onSubmit={handleSaveDest} className="space-y-5 bg-stone-50 p-5 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <h4 className="font-bold text-stone-900 text-sm">
                      {isAddingDest ? 'Tambah Destinasi Wisata Baru' : `Ubah Data & Foto: ${editingDest.name}`}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingDest(null)}
                      className="text-stone-500 hover:text-stone-800 text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                  </div>

                  {/* FOTO DESTINASI DENGAN IMAGE PICKER (UPLOAD / PRESET / URL) */}
                  <div className="p-3.5 bg-white rounded-xl border border-stone-200">
                    <ImagePickerField
                      label="Foto Destinasi Wisata"
                      helperText="Unggah foto baru dari komputer/HP atau pilih foto dokumentasi HSU"
                      value={editingDest.imageUrl}
                      onChange={(url) => setEditingDest({ ...editingDest, imageUrl: url })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Destinasi Wisata</label>
                      <input
                        type="text"
                        required
                        value={editingDest.name}
                        onChange={(e) => setEditingDest({ ...editingDest, name: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Kategori Destinasi</label>
                      <select
                        value={editingDest.category}
                        onChange={(e) => {
                          const cat = e.target.value as DestinationCategory;
                          const labels: Record<DestinationCategory, string> = {
                            alam: 'Wisata Alam & Ekowisata',
                            budaya: 'Cagar Budaya & Sejarah',
                            kuliner_kerajinan: 'Sentra Kerajinan & Ekraf',
                            olahraga_fasilitas: 'Fasilitas Pemuda & Olahraga'
                          };
                          setEditingDest({ 
                            ...editingDest, 
                            category: cat,
                            categoryLabel: labels[cat]
                          });
                        }}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                      >
                        <option value="alam">Wisata Alam & Ekowisata</option>
                        <option value="budaya">Cagar Budaya & Sejarah</option>
                        <option value="kuliner_kerajinan">Sentra Kerajinan & Ekraf</option>
                        <option value="olahraga_fasilitas">Fasilitas Pemuda & Olahraga</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Kecamatan di Kab. HSU</label>
                      <input
                        type="text"
                        required
                        value={editingDest.subdistrict}
                        onChange={(e) => setEditingDest({ ...editingDest, subdistrict: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Alamat / Lokasi Lengkap</label>
                      <input
                        type="text"
                        required
                        value={editingDest.location}
                        onChange={(e) => setEditingDest({ ...editingDest, location: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Latitude (GPS)</label>
                      <input
                        type="number"
                        step="any"
                        value={editingDest.lat}
                        onChange={(e) => setEditingDest({ ...editingDest, lat: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Longitude (GPS)</label>
                      <input
                        type="number"
                        step="any"
                        value={editingDest.lng}
                        onChange={(e) => setEditingDest({ ...editingDest, lng: parseFloat(e.target.value) || 0 })}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Jam Operasional</label>
                      <input
                        type="text"
                        value={editingDest.openHours}
                        onChange={(e) => setEditingDest({ ...editingDest, openHours: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Tarif Tiket Masuk</label>
                      <input
                        type="text"
                        value={editingDest.ticketPrice}
                        onChange={(e) => setEditingDest({ ...editingDest, ticketPrice: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Deskripsi Ringkas</label>
                    <input
                      type="text"
                      required
                      value={editingDest.shortDesc}
                      onChange={(e) => setEditingDest({ ...editingDest, shortDesc: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Deskripsi Lengkap Informasi Wisata</label>
                    <textarea
                      rows={4}
                      required
                      value={editingDest.description}
                      onChange={(e) => setEditingDest({ ...editingDest, description: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                    <button
                      type="button"
                      onClick={() => setEditingDest(null)}
                      className="px-3.5 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200 rounded-lg cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan Destinasi & Foto</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Destinations List View */
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">Daftar Destinasi Wisata Terdata</h4>
                      <p className="text-xs text-stone-500">Klik "Edit" untuk mengubah foto, koordinat, dan informasi</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsAddingDest(true);
                        setEditingDest({
                          id: `dest-${Date.now()}`,
                          name: '',
                          category: 'alam',
                          categoryLabel: 'Wisata Alam & Ekowisata',
                          shortDesc: '',
                          description: '',
                          location: 'Kabupaten Hulu Sungai Utara',
                          subdistrict: 'Amuntai Tengah',
                          lat: -2.4277,
                          lng: 115.2492,
                          imageUrl: heroKerbauRawa,
                          openHours: '08:00 - 17:00 WITA',
                          ticketPrice: 'Gratis',
                          facilities: ['Area Parkir', 'Warung Makan'],
                          highlights: ['Pemandangan Khas Rawa'],
                          rating: 4.8,
                          reviewsCount: 10
                        });
                      }}
                      className="px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Destinasi Baru</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {destinations.map(d => (
                      <div key={d.id} className="p-3 bg-white border border-stone-200 rounded-xl flex gap-3 items-center group">
                        <img src={d.imageUrl} alt={d.name} className="w-16 h-16 rounded-lg object-cover shrink-0 border border-stone-200" />
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] text-emerald-800 font-semibold">{d.categoryLabel}</div>
                          <div className="text-xs font-bold text-stone-900 truncate">{d.name}</div>
                          <div className="text-[11px] text-stone-500 truncate">{d.location}</div>
                          <div className="text-[11px] text-stone-400 font-mono mt-0.5">({d.lat}, {d.lng})</div>
                        </div>
                        <div className="flex flex-col gap-1 shrink-0">
                          <button
                            onClick={() => {
                              setIsAddingDest(false);
                              setEditingDest(d);
                            }}
                            className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-800 border border-emerald-200 cursor-pointer flex items-center gap-1 text-[11px] font-semibold"
                            title="Ubah Foto & Data"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Ubah</span>
                          </button>
                          <button
                            onClick={() => handleDeleteDest(d.id)}
                            className="p-1.5 hover:bg-rose-100 rounded-lg text-rose-600 cursor-pointer"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 2: NEWS */}
          {activeTab === 'news' && (
            <div className="space-y-4">
              {editingNews ? (
                /* Edit/Add News Form */
                <form onSubmit={handleSaveNews} className="space-y-4 bg-stone-50 p-5 rounded-xl border border-stone-200">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <h4 className="font-bold text-stone-900 text-sm">
                      {isAddingNews ? 'Tambah Artikel Berita Baru' : 'Ubah Artikel Berita & Foto'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingNews(null)}
                      className="text-stone-500 hover:text-stone-800 text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                  </div>

                  {/* FOTO BERITA DENGAN IMAGE PICKER */}
                  <div className="p-3.5 bg-white rounded-xl border border-stone-200">
                    <ImagePickerField
                      label="Foto Sampul Berita"
                      helperText="Unggah foto kegiatan atau pilih dari galeri arsip"
                      value={editingNews.imageUrl}
                      onChange={(url) => setEditingNews({ ...editingNews, imageUrl: url })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Judul Artikel Berita</label>
                      <input
                        type="text"
                        required
                        value={editingNews.title}
                        onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Kategori Berita</label>
                      <select
                        value={editingNews.category}
                        onChange={(e) => setEditingNews({ ...editingNews, category: e.target.value as NewsCategory })}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                      >
                        <option value="Pariwisata">Pariwisata</option>
                        <option value="Kepemudaan">Kepemudaan</option>
                        <option value="Olahraga">Olahraga</option>
                        <option value="Pengumuman">Pengumuman</option>
                        <option value="Ekraf">Ekraf</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Ringkasan Singkat (Lead Paragraph)</label>
                    <textarea
                      rows={2}
                      required
                      value={editingNews.summary}
                      onChange={(e) => setEditingNews({ ...editingNews, summary: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Isi Konten Berita Lengkap</label>
                    <textarea
                      rows={6}
                      required
                      value={editingNews.content}
                      onChange={(e) => setEditingNews({ ...editingNews, content: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Penulis / Bidang</label>
                      <input
                        type="text"
                        value={editingNews.author}
                        onChange={(e) => setEditingNews({ ...editingNews, author: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Estimasi Waktu Baca (Menit)</label>
                      <input
                        type="number"
                        min={1}
                        value={editingNews.readTimeMinutes}
                        onChange={(e) => setEditingNews({ ...editingNews, readTimeMinutes: Number(e.target.value) })}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                    <button
                      type="button"
                      onClick={() => setEditingNews(null)}
                      className="px-3.5 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200 rounded-lg cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan Artikel & Foto</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* News List View */
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">Daftar Berita Resmi Disporapar</h4>
                      <p className="text-xs text-stone-500">Ubah artikel, judul, serta foto sampul berita</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsAddingNews(true);
                        setEditingNews({
                          id: `news-${Date.now()}`,
                          title: '',
                          slug: `berita-${Date.now()}`,
                          category: 'Pariwisata',
                          summary: '',
                          content: '',
                          imageUrl: heroKerbauRawa,
                          publishedAt: new Date().toISOString().substring(0, 10),
                          author: 'Humas Disporapar HSU',
                          readTimeMinutes: 3,
                          isFeatured: false
                        });
                      }}
                      className="px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Berita Baru</span>
                    </button>
                  </div>

                  <div className="divide-y divide-stone-200 border border-stone-200 rounded-xl overflow-hidden bg-white">
                    {news.map(item => (
                      <div key={item.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-stone-50 transition-colors">
                        <img src={item.imageUrl} alt={item.title} className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-200" />
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] text-emerald-800 font-semibold">{item.category} · {item.publishedAt}</div>
                          <div className="text-xs font-bold text-stone-900 truncate">{item.title}</div>
                          <div className="text-[11px] text-stone-500 line-clamp-1">{item.summary}</div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              setIsAddingNews(false);
                              setEditingNews(item);
                            }}
                            className="p-1.5 hover:bg-stone-200 rounded-lg text-stone-600 cursor-pointer"
                            title="Ubah Berita & Foto"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteNews(item.id)}
                            className="p-1.5 hover:bg-rose-100 rounded-lg text-rose-600 cursor-pointer"
                            title="Hapus Berita"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 3: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              {editingGallery ? (
                /* Edit Gallery Form */
                <form onSubmit={handleSaveGallery} className="p-5 bg-stone-50 rounded-xl border border-stone-200 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                    <h4 className="font-bold text-stone-900 text-sm">
                      {isAddingGallery ? 'Tambah Foto Galeri Baru' : 'Ubah Foto & Data Galeri'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setEditingGallery(null)}
                      className="text-stone-500 hover:text-stone-800 text-xs cursor-pointer"
                    >
                      Batal
                    </button>
                  </div>

                  <div className="p-3.5 bg-white rounded-xl border border-stone-200">
                    <ImagePickerField
                      label="Berkas Foto Galeri"
                      helperText="Unggah foto resolusi tinggi dari perangkat Anda"
                      value={editingGallery.imageUrl}
                      onChange={(url) => setEditingGallery({ ...editingGallery, imageUrl: url })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Judul / Keterangan Foto</label>
                      <input
                        type="text"
                        required
                        value={editingGallery.title}
                        onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Kategori Album</label>
                      <select
                        value={editingGallery.category}
                        onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value as any })}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                      >
                        <option value="Destinasi">Destinasi</option>
                        <option value="Budaya">Budaya</option>
                        <option value="Pemuda & Olahraga">Pemuda & Olahraga</option>
                        <option value="Kegiatan Dinas">Kegiatan Dinas</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Lokasi Foto di HSU</label>
                      <input
                        type="text"
                        value={editingGallery.location}
                        onChange={(e) => setEditingGallery({ ...editingGallery, location: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Fotografer / Kontributor</label>
                      <input
                        type="text"
                        value={editingGallery.photographer}
                        onChange={(e) => setEditingGallery({ ...editingGallery, photographer: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Deskripsi Narasi Foto</label>
                    <textarea
                      rows={2}
                      value={editingGallery.description}
                      onChange={(e) => setEditingGallery({ ...editingGallery, description: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-stone-200">
                    <button
                      type="button"
                      onClick={() => setEditingGallery(null)}
                      className="px-3.5 py-2 text-xs text-stone-600 hover:bg-stone-200 rounded-lg cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-2xs flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Simpan Perubahan Foto</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Gallery Grid View */
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">Manajemen Galeri Visual</h4>
                      <p className="text-xs text-stone-500">Kelola foto dan ganti gambar dokumentasi secara langsung</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsAddingGallery(true);
                        setEditingGallery({
                          id: `gal-${Date.now()}`,
                          title: '',
                          category: 'Destinasi',
                          imageUrl: heroKerbauRawa,
                          location: 'Kabupaten Hulu Sungai Utara',
                          photographer: 'Humas Disporapar HSU',
                          date: new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }),
                          description: ''
                        });
                      }}
                      className="px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Foto Baru</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {gallery.map(item => (
                      <div key={item.id} className="rounded-xl overflow-hidden border border-stone-200 bg-white group flex flex-col justify-between">
                        <div className="relative h-32 bg-stone-100">
                          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                          <div className="absolute top-2 right-2 flex items-center gap-1">
                            <button
                              onClick={() => {
                                setIsAddingGallery(false);
                                setEditingGallery(item);
                              }}
                              className="p-1.5 bg-black/60 hover:bg-emerald-800 text-white rounded-md transition-colors cursor-pointer"
                              title="Ubah Foto"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteGallery(item.id)}
                              className="p-1.5 bg-black/60 hover:bg-rose-700 text-white rounded-md transition-colors cursor-pointer"
                              title="Hapus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="p-2.5">
                          <div className="text-[10px] text-emerald-800 font-semibold">{item.category}</div>
                          <div className="text-xs font-bold text-stone-900 truncate">{item.title}</div>
                          <div className="text-[10px] text-stone-500 truncate">{item.location}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB 4: PERMITS MANAGEMENT */}
          {activeTab === 'permits' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Permohonan Perizinan Online Masuk</h4>
                <p className="text-xs text-stone-500">Kelola dan perbarui status verifikasi berkas masyarakat</p>
              </div>

              <div className="space-y-3">
                {applications.map(app => (
                  <div key={app.id} className="p-4 bg-white border border-stone-200 rounded-xl space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2">
                      <div>
                        <span className="font-mono font-bold text-xs text-emerald-900">{app.id}</span>
                        <span className="text-xs text-stone-400 mx-2">·</span>
                        <span className="text-xs font-semibold text-stone-700">{app.serviceTitle}</span>
                      </div>
                      <div className="text-xs text-stone-400">
                        Diajukan: {app.createdAt}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-stone-700">
                      <div>
                        <span className="text-stone-400 block text-[11px]">Nama Pemohon / NIK:</span>
                        <span className="font-semibold text-stone-900">{app.applicantName}</span> ({app.applicantNik})
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[11px]">Kontak WhatsApp:</span>
                        <span className="font-semibold text-stone-900">{app.applicantPhone}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[11px]">Kegiatan / Tanggal:</span>
                        <span className="font-semibold text-stone-900">{app.activityTitle}</span> ({app.activityDate || '-'})
                      </div>
                    </div>

                    {app.description && (
                      <div className="p-2.5 rounded-lg bg-stone-50 text-[11px] text-stone-600">
                        <span className="font-semibold text-stone-800">Uraian:</span> {app.description}
                      </div>
                    )}

                    {/* Status Changer Toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-stone-600">Ubah Status:</span>
                        <select
                          value={app.status}
                          onChange={(e) => handleUpdatePermitStatus(app.id, e.target.value as ApplicationStatus)}
                          className="px-2.5 py-1 text-xs border border-stone-300 rounded-lg bg-white font-medium text-stone-800"
                        >
                          <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                          <option value="Verifikasi Berkas">Verifikasi Berkas</option>
                          <option value="Tinjauan Lapangan">Tinjauan Lapangan</option>
                          <option value="Disetujui">Disetujui</option>
                          <option value="Ditolak">Ditolak</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            const newNote = prompt('Masukkan catatan/instruksi teknis untuk pemohon:', app.notes || '');
                            if (newNote !== null) {
                              handleUpdatePermitStatus(app.id, app.status, newNote);
                            }
                          }}
                          className="px-2.5 py-1 text-xs text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg font-medium cursor-pointer"
                        >
                          {app.notes ? 'Edit Catatan Petugas' : '+ Tambah Catatan'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE MANAGEMENT */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-5 max-w-3xl">
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Ubah Profil Instansi & Sambutan Kepala Dinas</h4>
                <p className="text-xs text-stone-500">Perbarui foto pimpinan, teks sambutan, visi misi, serta kontak resmi</p>
              </div>

              {/* FOTO KEPALA DINAS DENGAN IMAGE PICKER */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200">
                <ImagePickerField
                  label="Foto Resmi Kepala Dinas"
                  helperText="Unggah foto formal pimpinan atau ganti dengan foto arsip"
                  value={editingProfile.headOfDepartment.photoUrl}
                  onChange={(url) => setEditingProfile({
                    ...editingProfile,
                    headOfDepartment: { ...editingProfile.headOfDepartment, photoUrl: url }
                  })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Lengkap Kepala Dinas</label>
                  <input
                    type="text"
                    required
                    value={editingProfile.headOfDepartment.name}
                    onChange={(e) => setEditingProfile({
                      ...editingProfile,
                      headOfDepartment: { ...editingProfile.headOfDepartment, name: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nomor Induk Pegawai (NIP)</label>
                  <input
                    type="text"
                    value={editingProfile.headOfDepartment.nip}
                    onChange={(e) => setEditingProfile({
                      ...editingProfile,
                      headOfDepartment: { ...editingProfile.headOfDepartment, nip: e.target.value }
                    })}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Teks Sambutan Kepala Dinas</label>
                <textarea
                  rows={5}
                  value={editingProfile.headOfDepartment.speech}
                  onChange={(e) => setEditingProfile({
                    ...editingProfile,
                    headOfDepartment: { ...editingProfile.headOfDepartment, speech: e.target.value }
                  })}
                  className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Visi Pembangunan Disporapar</label>
                <textarea
                  rows={2}
                  value={editingProfile.vision}
                  onChange={(e) => setEditingProfile({ ...editingProfile, vision: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Nomor Telepon Kantor</label>
                  <input
                    type="text"
                    value={editingProfile.phone}
                    onChange={(e) => setEditingProfile({ ...editingProfile, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">WhatsApp Center</label>
                  <input
                    type="text"
                    value={editingProfile.whatsapp}
                    onChange={(e) => setEditingProfile({ ...editingProfile, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email Kedinasan</label>
                  <input
                    type="email"
                    value={editingProfile.email}
                    onChange={(e) => setEditingProfile({ ...editingProfile, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Alamat Kantor Lengkap</label>
                <input
                  type="text"
                  value={editingProfile.address}
                  onChange={(e) => setEditingProfile({ ...editingProfile, address: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg text-xs bg-white text-stone-900"
                />
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan Profil & Foto Pimpinan</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 6: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <h4 className="font-bold text-stone-900 text-sm">Cadangan & Pemulihan Sistem</h4>
                <p className="text-xs text-stone-500">Ekspor berkas JSON atau kembalikan ke konfigurasi awal</p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-3">
                <div className="font-semibold text-xs text-stone-800 flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-800" />
                  <span>Unduh Cadangan Berkas (Backup JSON)</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Simpan seluruh data destinasi wisata, artikel berita, galeri, profil, dan permohonan izin ke dalam format JSON untuk arsip berkala.
                </p>
                <button
                  onClick={handleExportJSON}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Ekspor Data ke File JSON</span>
                </button>
              </div>

              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/60 space-y-3">
                <div className="font-semibold text-xs text-rose-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-700" />
                  <span>Kembalikan ke Data Awal (Reset)</span>
                </div>
                <p className="text-xs text-rose-800 leading-relaxed">
                  Mengembalikan data destinasi Danau Panggang, Candi Agung, berita resmi, dan galeri ke konfigurasi default Disporapar HSU.
                </p>
                <button
                  onClick={handleResetData}
                  className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Data Default</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
