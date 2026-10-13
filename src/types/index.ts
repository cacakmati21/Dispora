export type DestinationCategory = 'alam' | 'budaya' | 'kuliner_kerajinan' | 'olahraga_fasilitas';

export interface Destination {
  id: string;
  name: string;
  category: DestinationCategory;
  categoryLabel: string;
  shortDesc: string;
  description: string;
  location: string;
  subdistrict: string; // Kecamatan (Amuntai Tengah, Danau Panggang, Alabio, etc.)
  lat: number;
  lng: number;
  imageUrl: string;
  openHours: string;
  ticketPrice: string;
  facilities: string[];
  contactPerson?: string;
  phone?: string;
  highlights: string[];
  rating: number;
  reviewsCount: number;
}

export type NewsCategory = 'Pariwisata' | 'Kepemudaan' | 'Olahraga' | 'Pengumuman' | 'Ekraf';

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: NewsCategory;
  summary: string;
  content: string;
  imageUrl: string;
  publishedAt: string;
  author: string;
  readTimeMinutes: number;
  isFeatured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Destinasi' | 'Budaya' | 'Pemuda & Olahraga' | 'Kegiatan Dinas';
  imageUrl: string;
  location: string;
  photographer: string;
  date: string;
  description: string;
}

export type PermitType = 
  | 'izin_event' 
  | 'tdup_pariwisata' 
  | 'pinjam_gor' 
  | 'daftar_komunitas';

export interface PermitServiceInfo {
  id: PermitType;
  title: string;
  category: 'Pariwisata' | 'Olahraga' | 'Kepemudaan';
  description: string;
  processingDays: number;
  fee: string;
  requirements: string[];
}

export type ApplicationStatus = 'Menunggu Verifikasi' | 'Verifikasi Berkas' | 'Tinjauan Lapangan' | 'Disetujui' | 'Ditolak';

export interface PermitApplication {
  id: string; // e.g. HSU-IZIN-2026-0812
  serviceId: PermitType;
  serviceTitle: string;
  applicantName: string;
  applicantNik: string;
  applicantPhone: string;
  applicantEmail: string;
  organizationName?: string;
  activityTitle: string;
  activityDate: string;
  activityLocation: string;
  description: string;
  notes?: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentProfile {
  name: string;
  acronym: string;
  regency: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  vision: string;
  missions: string[];
  headOfDepartment: {
    name: string;
    nip: string;
    title: string;
    photoUrl: string;
    speech: string;
  };
  divisions: {
    name: string;
    head: string;
    tasks: string[];
  }[];
}
