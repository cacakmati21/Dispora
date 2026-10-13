import { Destination, NewsArticle, GalleryItem, PermitServiceInfo, DepartmentProfile, PermitApplication } from '../types';

import heroKerbauRawa from '../assets/images/hero_kerbau_rawa_danau_panggang_1791857581947.jpg';
import candiAgungImg from '../assets/images/candi_agung_amuntai_1791857583788.jpg';
import purunImg from '../assets/images/kerajinan_anyaman_purun_1791857584389.jpg';
import itikAlabioImg from '../assets/images/itik_alabio_danau_hsu_1791857584588.jpg';
import kadisImg from '../assets/images/kadis_disporapar_hsu_1791857584915.jpg';

export { heroKerbauRawa, candiAgungImg, purunImg, itikAlabioImg, kadisImg };

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'dest-danau-panggang',
    name: 'Ekowisata Kerbau Rawa Danau Panggang',
    category: 'alam',
    categoryLabel: 'Wisata Alam & Ekowisata',
    shortDesc: 'Fenomena langka ratusan kerbau rawa berenang di hamparan rawa lebak dengan perahu klotok.',
    description: 'Danau Panggang menyuguhkan pemandangan unik yang jarang ditemui di dunia, yaitu kawanan kerbau rawa (Bubalus bubalis carabanesis) yang mahir berenang melintasi rawa lebak yang luas. Pengunjung dapat menyewa perahu Klotok khas Banjar saat fajar atau senja untuk menyaksikan kerbau dilepasliarkan menuju padang rumput air, ditemani kabut pagi eksotis dan burung migran endemik Kalimantan.',
    location: 'Desa Bararawa, Kecamatan Danau Panggang',
    subdistrict: 'Danau Panggang',
    lat: -2.4648,
    lng: 115.1189,
    imageUrl: heroKerbauRawa,
    openHours: '05:30 - 18:00 WITA Setiap Hari',
    ticketPrice: 'Gratis (Sewa Perahu Klotok: Rp 150.000 - Rp 250.000 / perahu)',
    facilities: ['Dermaga Klotok', 'Pemandu Lokal (Pokdarwis)', 'Warung Makan Khas Rawa', 'Area Parkir'],
    contactPerson: 'Pak Hendra (Ketua Pokdarwis Danau Panggang)',
    phone: '0812-5544-3321',
    highlights: ['Kerbau Rawa Berenang', 'Sunset & Sunrise Rawa Lebak', 'Fotografi Satwa Langka', 'Susur Rawa Klotok'],
    rating: 4.9,
    reviewsCount: 312
  },
  {
    id: 'dest-candi-agung',
    name: 'Situs Cagar Budaya Candi Agung Amuntai',
    category: 'budaya',
    categoryLabel: 'Cagar Budaya & Sejarah',
    shortDesc: 'Situs peninggalan Kerajaan Negara Dipa abad ke-14 yang sarat nilai spiritual dan arsitektur kuno.',
    description: 'Candi Agung Amuntai adalah situs cagar budaya berusia lebih dari 700 tahun peninggalan Kerajaan Negara Dipa yang didirikan oleh Empu Jatmika. Terletak di tengah rerimbunan pohon rindang, situs ini memiliki struktur kayu ulin berukir khas Banjar, peninggalan batu bata kuno, serta Telaga Darah dan Pertapaan Pangeran Suryanata. Menjadi pusat ziarah budaya dan edukasi sejarah terpenting di Kalimantan Selatan.',
    location: 'Kelurahan Sungai Malang, Kecamatan Amuntai Tengah',
    subdistrict: 'Amuntai Tengah',
    lat: -2.4285,
    lng: 115.2443,
    imageUrl: candiAgungImg,
    openHours: '08:00 - 17:00 WITA (Buka Setiap Hari)',
    ticketPrice: 'Rp 5.000 (Dewasa) / Rp 3.000 (Anak)',
    facilities: ['Pusat Informasi & Museum Mini', 'Musholla', 'Toilet Umum', 'Toko Cinderamata Sasirangan', 'Taman Rindang'],
    contactPerson: 'Balai Pelestari Candi Agung HSU',
    phone: '0821-4455-8899',
    highlights: ['Petilasan Pangeran Suryanata', 'Arsitektur Kayu Ulin', 'Mata Air Telaga Bidadari', 'Hutan Kota Asri'],
    rating: 4.8,
    reviewsCount: 489
  },
  {
    id: 'dest-anyaman-purun',
    name: 'Desa Wisata Anyaman Purun Banyu Hirang',
    category: 'kuliner_kerajinan',
    categoryLabel: 'Sentra Kerajinan & Ekraf',
    shortDesc: 'Pusat kriya anyaman serat purun ramah lingkungan dengan motif Sasirangan yang mendunia.',
    description: 'Desa Banyu Hirang merupakan sentra kerajinan anyaman purun terkemuka di Indonesia. Para perajin wanita memanfaatkan tanaman purun (Eleocharis dulcis) yang tumbuh melimpah di lahan gambut untuk diolah menjadi tas modern, tikar, topi, dan perabot rumah tangga dengan pewarnaan alami. Wisatawan dapat langsung belajar menganyam, membeli produk kriya bernilai ekspor, dan menikmati keramahan warga desa.',
    location: 'Desa Banyu Hirang, Kecamatan Amuntai Selatan',
    subdistrict: 'Amuntai Selatan',
    lat: -2.4380,
    lng: 115.2825,
    imageUrl: purunImg,
    openHours: '08:00 - 17:30 WITA',
    ticketPrice: 'Gratis masuk desa (Paket Workshop Anyam: Rp 35.000/orang)',
    facilities: ['Galeri Kriya Purun HSU', 'Workshop Interaktif', 'Kantin Olahan Ikan Rawa', 'Spot Foto Ekowisata'],
    contactPerson: 'Ibu Ratmi (Koperasi Purun Berkah)',
    phone: '0852-7711-2290',
    highlights: ['Live Workshop Menganyam', 'Belanja Kriya Ramah Lingkungan', 'Galeri Motif Sasirangan', 'Spot Desa Wisata'],
    rating: 4.9,
    reviewsCount: 275
  },
  {
    id: 'dest-itik-alabio',
    name: 'Kawasan Agrowisata & Sentra Itik Alabio',
    category: 'kuliner_kerajinan',
    categoryLabel: 'Sentra Unggulan & Agrowisata',
    shortDesc: 'Sentra pemuliaan Itik Alabio, plasma nutfah khas kebanggaan Kabupaten Hulu Sungai Utara.',
    description: 'Itik Alabio (Anas platyrhynchos borneo) adalah varietas itik petelur unggul asli HSU yang menjadi simbol ketekunan masyarakat Amuntai. Di kawasan agrowisata Alabio, wisatawan dapat mempelajari siklus peternakan itik di atas air rawa, mencicipi kuliner legendaris Itik Panggang Alabio bercita rasa rempah khas Banjar, dan membeli telur asin itik alabio berkualitas prima.',
    location: 'Kecamatan Sungai Pandan (Alabio)',
    subdistrict: 'Sungai Pandan',
    lat: -2.4691,
    lng: 115.2154,
    imageUrl: itikAlabioImg,
    openHours: '07:00 - 18:00 WITA',
    ticketPrice: 'Gratis',
    facilities: ['Sentra Kuliner Itik Panggang', 'Pusat Telur Asin', 'Spot Edukasi Peternakan', 'Area Parkir Bus'],
    contactPerson: 'Kelompok Tani Harapan Alabio',
    phone: '0813-8822-1144',
    highlights: ['Kuliner Itik Panggang Asli', 'Edukasi Peternakan Rawa', 'Oleh-oleh Telur Asin', 'Nuansa Pedesaan Asri'],
    rating: 4.7,
    reviewsCount: 360
  },
  {
    id: 'dest-titik-nol-tugu-itik',
    name: 'Tugu Itik Alabio & Bundaran Titik Nol Amuntai',
    category: 'budaya',
    categoryLabel: 'Landmark & Ruang Terbuka',
    shortDesc: 'Ikon megah pusat kota Amuntai dengan patung Itik Alabio dan taman rekreasi keluarga.',
    description: 'Berada tepat di jantung kota Amuntai, Monumen Patung Itik Alabio adalah landmark ikonik kebanggaan warga Kabupaten Hulu Sungai Utara. Di sekeliling tugu terdapat bundaran taman kota dengan air mancur, tempat duduk santai, dan pusat kuliner malam yang menyajikan jajanan tradisional khas Banjar seperti apam batil, lapat, dan bingka kentang.',
    location: 'Jl. Basuki Rahmat - Jl. Jenderal Sudirman, Amuntai Tengah',
    subdistrict: 'Amuntai Tengah',
    lat: -2.4277,
    lng: 115.2492,
    imageUrl: itikAlabioImg,
    openHours: '24 Jam Terbuka untuk Umum',
    ticketPrice: 'Gratis',
    facilities: ['Taman Kota & Bangku', 'Lampu Hias Malam', 'Sentra Street Food', 'Parkir Kendaraan'],
    contactPerson: 'Disporapar HSU Bidang Ekraf',
    phone: '0527-61011',
    highlights: ['Foto Ikonik Patung Itik Alabio', 'Kuliner Malam Amuntai', 'Suasana Ramah Keluarga', 'Pusat Kota Amuntai'],
    rating: 4.6,
    reviewsCount: 520
  },
  {
    id: 'dest-gor-kamboja',
    name: 'GOR Kamboja & Kompleks Olahraga Pangeran Suryanata',
    category: 'olahraga_fasilitas',
    categoryLabel: 'Fasilitas Pemuda & Olahraga',
    shortDesc: 'Gelanggang olahraga terpadu pembinaan atlet pemuda dan penyelenggaraan kompetisi daerah.',
    description: 'Gelanggang Olahraga (GOR) Kamboja dan Stadion Olahraga Pangeran Suryanata merupakan fasilitas olahraga utama yang dikelola oleh Disporapar Kabupaten HSU. Dilengkapi dengan lapangan bulutangkis indoor, lapangan futsal standar nasional, arena atletik, dan lapangan tenis, tempat ini menjadi pusat kegiatan pembinaan generasi muda, turnamen Piala Bupati HSU, serta latihan kebugaran masyarakat umum.',
    location: 'Jl. Kamboja, Kelurahan Murung Sari, Amuntai Tengah',
    subdistrict: 'Amuntai Tengah',
    lat: -2.4221,
    lng: 115.2530,
    imageUrl: heroKerbauRawa,
    openHours: '06:00 - 22:00 WITA',
    ticketPrice: 'Jogging/Latihan Umum Gratis (Peminjaman GOR sesuai tarif Perda)',
    facilities: ['Hall Badminton Indoor', 'Lapangan Futsal & Basket', 'Tribun Penonton', 'Ruang Ganti & Toilet', 'Penerangan Malam'],
    contactPerson: 'UPTD Sarana & Prasarana Olahraga HSU',
    phone: '0527-61012',
    highlights: ['Standar Turnamen Resmi', 'Pusat Latihan Atlet HSU', 'Fasilitas Lengkap', 'Pemesanan Sewa Online'],
    rating: 4.7,
    reviewsCount: 195
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Disporapar HSU Resmi Luncurkan Calendar of Events Pariwisata 2026',
    slug: 'disporapar-hsu-luncurkan-calendar-of-events-2026',
    category: 'Pariwisata',
    summary: 'Rangkaian 18 festival unggulan daerah siap meriahkan Amuntai sepanjang tahun 2026, mulai dari Festival Budaya Candi Agung hingga Danau Panggang Ecotourism Expo.',
    content: `AMUNTAI – Dinas Kepemudaan, Olahraga, dan Pariwisata (Disporapar) Kabupaten Hulu Sungai Utara secara resmi meluncurkan Calendar of Events (CoE) Pariwisata dan Olahraga HSU untuk tahun 2026.

Peluncuran ini dihadiri langsung oleh jajaran Forkopimda, para pegiat pariwisata (Pokdarwis), perwakilan sanggar seni pemuda, dan pelaku ekonomi kreatif di Gedung Aneka Amuntai.

Kepala Disporapar HSU menyampaikan bahwa CoE 2026 disusun dengan mengedepankan sinergi tiga pilar utama: pemberdayaan generasi muda, peningkatan prestasi olahraga daerah, dan penguatan ekowisata berbasis kearifan lokal.

"Kita memiliki potensi yang tiada duanya di dunia, seperti ekowisata kerbau rawa Danau Panggang dan cagar budaya adiluhung Candi Agung. Melalui agenda event yang terstruktur, kita ingin menarik wisatawan nusantara dan mancanegara sekaligus menggerakkan ekonomi UMKM kriya purun serta kuliner itik alabio," tuturnya.

Agenda unggulan yang dinanti antara lain:
1. Festival Candi Agung & Lomba Tari Banjar Tradisional (Mei 2026)
2. Danau Panggang Ecotourism Rally Klotok (Juli 2026)
3. Kejuaraan Olahraga Bulutangkis & Futsal Piala Bupati HSU (Agustus 2026)
4. Amuntai Creative Youth & Purun Fashion Carnival (Oktober 2026)

Masyarakat dan wisatawan dapat mengakses jadwal resmi serta layanan pendaftaran event melalui portal digital resmi Disporapar HSU.`,
    imageUrl: heroKerbauRawa,
    publishedAt: '2026-10-10',
    author: 'Bidang Destinasi & Pemasaran Wisata',
    readTimeMinutes: 4,
    isFeatured: true
  },
  {
    id: 'news-2',
    title: 'Anyaman Purun Banyu Hirang HSU Tampil Memukau di Ajang Kriya Internasional',
    slug: 'anyaman-purun-banyu-hirang-ajang-kriya-internasional',
    category: 'Ekraf',
    summary: 'Karya perajin anyaman purun asal Amuntai Selatan mencuri perhatian pasar dunia berkat inovasi desain ramah lingkungan berpadu motif Sasirangan.',
    content: `AMUNTAI SELATAN – Kualitas karya perajin kriya purun Kabupaten Hulu Sungai Utara kembali membuktikan keunggulannya di kancah nasional dan internasional. Produk tas jinjing dan perabot rumah tangga berbahan dasar tanaman purun dari Desa Banyu Hirang sukses dipamerkan dalam pameran kerajinan ramah lingkungan berskala global.

Disporapar HSU terus memberikan fasilitasi pembinaan desain, kurasi mutu produk, dan sertifikasi Hak Kekayaan Intelektual (HAKI) kepada koperasi perajin setempat. 

Dengan mengangkat tema keberlanjutan (sustainability), anyaman purun Amuntai membuktikan bahwa bahan alami rawa gambut mampu disulap menjadi produk fashion bernilai ekonomi tinggi tanpa merusak ekosistem lahan basah.`,
    imageUrl: purunImg,
    publishedAt: '2026-10-06',
    author: 'Bidang Pengembangan Ekonomi Kreatif',
    readTimeMinutes: 3,
    isFeatured: false
  },
  {
    id: 'news-3',
    title: 'Pekan Olahraga Pelajar HSU 2026 Cetak Bibit Atlet Menuju PORPROV Kalsel',
    slug: 'pekan-olahraga-pelajar-hsu-cetak-bibit-atlet-porprov',
    category: 'Olahraga',
    summary: 'Ratusan atlet muda dari 10 kecamatan di HSU bertanding di GOR Kamboja mempertandingkan 8 cabang olahraga unggulan.',
    content: `AMUNTAI – Semangat sportivitas membakar Gelanggang Olahraga (GOR) Kamboja Amuntai selama gelaran Pekan Olahraga Pelajar Daerah (POPDA) tingkat Kabupaten Hulu Sungai Utara. 

Kegiatan yang dihelat selama sepekan ini diikuti oleh lebih dari 650 pelajar tingkat SMP dan SMA dari seluruh penjuru HSU. Cabang olahraga yang dipertandingkan meliputi bulutangkis, tenis meja, sepak takraw, pencak silat, atletik, karate, bola voli, dan catur.

Disporapar HSU berkomitmen menyediakan fasilitas pembinaan jangka panjang melalui Pusat Pendidikan dan Latihan Pelajar Daerah (PPLPD) agar atlet-atlet binaan HSU mampu menorehkan medali emas pada ajang Pekan Olahraga Provinsi (PORPROV) Kalimantan Selatan mendatang.`,
    imageUrl: heroKerbauRawa,
    publishedAt: '2026-09-28',
    author: 'Bidang Peningkatan Prestasi Olahraga',
    readTimeMinutes: 4,
    isFeatured: false
  },
  {
    id: 'news-4',
    title: 'Pelatihan Kewirausahaan Pemuda Kreatif HSU: Cetak Wirausaha Mandiri Berbasis Digital',
    slug: 'pelatihan-kewirausahaan-pemuda-kreatif-hsu',
    category: 'Kepemudaan',
    summary: 'Disporapar HSU memfasilitasi 100 pemuda pelopor dengan materi digital marketing, branding produk lokal, dan akses permodalan usaha.',
    content: `AMUNTAI TENGAH – Menjawab tantangan era digital, Disporapar HSU menyelenggarakan Bimbingan Teknis dan Pelatihan Kewirausahaan Pemuda Kreatif Angkatan IV di Aula Bappelitbangda Amuntai.

Program ini ditujukan khusus bagi wirausahawan muda berusia 16-30 tahun yang merintis usaha di bidang kuliner khas HSU, kriya kerajinan, agribisnis itik alabio, dan jasa pariwisata.

Peserta tidak hanya dibekali teori bisnis dan fotografi produk menggunakan smartphone, tetapi juga mendapatkan pendampingan pembuatan izin usaha secara langsung melalui sistem perizinan terpadu online Disporapar.`,
    imageUrl: itikAlabioImg,
    publishedAt: '2026-09-20',
    author: 'Bidang Pemberdayaan Pemuda',
    readTimeMinutes: 3,
    isFeatured: false
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Kawanan Kerbau Rawa Berenang Menembus Kabut Fajar Danau Panggang',
    category: 'Destinasi',
    imageUrl: heroKerbauRawa,
    location: 'Desa Bararawa, Danau Panggang, HSU',
    photographer: 'Tim Dokumentasi Wisata Disporapar HSU',
    date: 'Oktober 2026',
    description: 'Pemandangan eksotis kawanan kerbau rawa yang bergerak berenang secara serempak di hamparan perairan lebak pada saat matahari terbit.'
  },
  {
    id: 'gal-2',
    title: 'Keagungan Arsitektur Ulin Situs Cagar Budaya Candi Agung Amuntai',
    category: 'Budaya',
    imageUrl: candiAgungImg,
    location: 'Sungai Malang, Amuntai Tengah, HSU',
    photographer: 'Seksi Cagar Budaya & Sejarah',
    date: 'September 2026',
    description: 'Struktur bangunan kayu ulin peninggalan Kerajaan Negara Dipa abad ke-14 yang tetap kokoh berdiri di kelilingi pepohonan tropis rimbun.'
  },
  {
    id: 'gal-3',
    title: 'Keterampilan Jemari Perajin Desa Anyaman Purun Banyu Hirang',
    category: 'Destinasi',
    imageUrl: purunImg,
    location: 'Banyu Hirang, Amuntai Selatan, HSU',
    photographer: 'Galeri Kriya Disporapar HSU',
    date: 'Agustus 2026',
    description: 'Ibu-ibu perajin tekun menganyam serat purun alami menjadi tas dan aneka produk ekraf bernilai jual tinggi berstandar ekspor.'
  },
  {
    id: 'gal-4',
    title: 'Plasma Nutfah Unggul Itik Alabio di Saluran Irigasi Tradisional',
    category: 'Destinasi',
    imageUrl: itikAlabioImg,
    location: 'Sungai Pandan (Alabio), HSU',
    photographer: 'Rizal Fahmi (Pewarta Foto Amuntai)',
    date: 'Juli 2026',
    description: 'Kelompok itik Alabio berenang riang di kanal irigasi persawahan hijau, lambang ketekunan dan kemakmuran warga Hulu Sungai Utara.'
  },
  {
    id: 'gal-5',
    title: 'Sambutan Resmi & Pembinaan Aparatur Dinas Kepemudaan, Olahraga & Pariwisata',
    category: 'Kegiatan Dinas',
    imageUrl: kadisImg,
    location: 'Kantor Disporapar Kab. HSU, Amuntai',
    photographer: 'Humas Disporapar HSU',
    date: 'Oktober 2026',
    description: 'Kepala Disporapar HSU memberikan arahan strategis terkait pelayanan publik terpadu dan akselerasi pariwisata berkelanjutan.'
  }
];

export const PERMIT_SERVICES: PermitServiceInfo[] = [
  {
    id: 'izin_event',
    title: 'Izin Penyelenggaraan Event Wisata & Seni Budaya',
    category: 'Pariwisata',
    description: 'Surat rekomendasi izin penyelenggaraan festival, konser seni, pameran kriya, dan parade budaya di wilayah Kabupaten Hulu Sungai Utara.',
    processingDays: 3,
    fee: 'Gratis (Rp 0)',
    requirements: [
      'Proposal Lengkap Rencana Kegiatan',
      'Surat Permohonan Resmi dari Penanggung Jawab',
      'KTP Penanggung Jawab / Ketua Panitia',
      'Denah Lokasi & Rencana Pengamanan / Kebersihan',
      'Rekomendasi dari Pengelola Lokasi / Desa Setempat'
    ]
  },
  {
    id: 'pinjam_gor',
    title: 'Izin Penggunaan & Peminjaman Sarana Olahraga (GOR Kamboja)',
    category: 'Olahraga',
    description: 'Peminjaman fasilitas lapangan bulutangkis, futsal, atau aula GOR Kamboja dan Lapangan Tenis Suryanata untuk turnamen maupun latihan.',
    processingDays: 2,
    fee: 'Sesuai Perda Retribusi Daerah (Gratis untuk agenda pembinaan pemuda resmi)',
    requirements: [
      'Surat Permohonan Jadwal Peminjaman',
      'KTP Pemohon / Penanggung Jawab Tim',
      'Jadwal dan Daftar Peserta / Klub',
      'Surat Pernyataan Menjaga Kebersihan dan Keutuhan Fasilitas'
    ]
  },
  {
    id: 'tdup_pariwisata',
    title: 'Rekomendasi Teknis Tanda Daftar Usaha Pariwisata (TDUP)',
    category: 'Pariwisata',
    description: 'Rekomendasi kelayakan teknis untuk pendirian usaha homestay, jasa pemandu wisata, perahu klotok wisata, rumah makan, dan destinasi buatan.',
    processingDays: 5,
    fee: 'Gratis (Rp 0)',
    requirements: [
      'KTP & NPWP Pemilik Usaha',
      'Nomor Induk Berusaha (NIB) OSS',
      'Foto Lokasi Usaha & Titik Koordinat GPS',
      'Pernyataan Keselamatan & Kelayakan Lingkungan'
    ]
  },
  {
    id: 'daftar_komunitas',
    title: 'Pendaftaran & Registrasi Komunitas Pemuda / Sanggar Seni',
    category: 'Kepemudaan',
    description: 'Pencatatan legalitas organisasi kepemudaan (OKP), sanggar tari, grup musik daerah, dan komunitas hobi untuk mendapatkan pembinaan resmi.',
    processingDays: 2,
    fee: 'Gratis (Rp 0)',
    requirements: [
      'Akta Pendirian / AD-ART atau Profil Komunitas',
      'Susunan Pengurus Lengkap (Ketua, Sekretaris, Bendahara)',
      'KTP Pengurus Inti (Maksimal Usia Pemuda 30 Tahun)',
      'Dokumentasi Kegiatan yang Pernah Dilaksanakan'
    ]
  }
];

export const INITIAL_APPLICATIONS: PermitApplication[] = [
  {
    id: 'HSU-IZIN-2026-0104',
    serviceId: 'izin_event',
    serviceTitle: 'Izin Penyelenggaraan Event Wisata & Seni Budaya',
    applicantName: 'Fajar Maulana, S.Sn.',
    applicantNik: '6308051203980002',
    applicantPhone: '0813-4876-1122',
    applicantEmail: 'fajar.sanggaramuntai@gmail.com',
    organizationName: 'Sanggar Seni Tari Kambang Habang HSU',
    activityTitle: 'Pentas Tari Kolosal Banjar & Musik Panting Pemuda',
    activityDate: '2026-11-15',
    activityLocation: 'Panggung Terbuka Titik Nol Bundaran Amuntai',
    description: 'Pentas seni budaya menyambut Hari Jadi Kabupaten HSU dengan menampilkan 60 penari pemuda se-Hulu Sungai Utara.',
    notes: 'Berkas lengkap dan rekomendasi keamanan telah divalidasi. Menunggu penetapan SK Kadis.',
    status: 'Tinjauan Lapangan',
    createdAt: '2026-10-08 09:30',
    updatedAt: '2026-10-10 14:15'
  },
  {
    id: 'HSU-IZIN-2026-0098',
    serviceId: 'pinjam_gor',
    serviceTitle: 'Izin Penggunaan & Peminjaman Sarana Olahraga (GOR Kamboja)',
    applicantName: 'Bambang Irawan',
    applicantNik: '6308012204950001',
    applicantPhone: '0852-9988-7711',
    applicantEmail: 'bambang.pbamuntai@gmail.com',
    organizationName: 'Persatuan Bulutangkis Bintang Muda Amuntai',
    activityTitle: 'Turnamen Bulutangkis Antar Pelajar Se-Kalsel Cup IV',
    activityDate: '2026-11-20 s/d 2026-11-23',
    activityLocation: 'GOR Kamboja Amuntai Tengah',
    description: 'Penyelenggaraan kejuaraan bulutangkis usia dini dan remaja untuk seleksi atlet POPDA 2027.',
    notes: 'Surat permohonan dan jadwal penggunaan telah disetujui. Surat izin resmi telah diterbitkan.',
    status: 'Disetujui',
    createdAt: '2026-10-02 11:20',
    updatedAt: '2026-10-05 16:00'
  }
];

export const DEPARTMENT_PROFILE: DepartmentProfile = {
  name: 'Dinas Kepemudaan, Olahraga, dan Pariwisata Kabupaten Hulu Sungai Utara',
  acronym: 'DISPORAPAR HSU',
  regency: 'Kabupaten Hulu Sungai Utara, Provinsi Kalimantan Selatan',
  address: 'Jl. Basuki Rahmat No. 12, Kelurahan Murung Sari, Kecamatan Amuntai Tengah, Kabupaten Hulu Sungai Utara, Kalimantan Selatan 71414',
  phone: '(0527) 61011 / 61245',
  email: 'disporapar@hulusungaiutarakab.go.id',
  whatsapp: '0811-5020-6100',
  vision: 'Terwujudnya Generasi Muda yang Berkarakter & Berprestasi, Olahraga yang Berdaya Saing, serta Pariwisata Berbasis Kearifan Lokal yang Maju dan Berkelanjutan di Kabupaten Hulu Sungai Utara.',
  missions: [
    'Meningkatkan peran aktif, kepemimpinan, dan kewirausahaan pemuda dalam pembangunan daerah yang bertaqwa dan mandiri.',
    'Meningkatkan budaya olahraga masyarakat dan prestasi olahraga daerah secara sistematis dan berkesinambungan.',
    'Mengembangkan destinasi pariwisata unggulan berbasis ekowisata lahan basah dan cagar budaya adiluhung.',
    'Mendorong pertumbuhan ekonomi kreatif kerajinan purun dan kuliner khas HSU berdaya saing pasar nasional dan global.',
    'Mewujudkan tata kelola pelayanan perizinan dan administrasi kedinasan yang cepat, transparan, akuntabel, dan berbasis digital.'
  ],
  headOfDepartment: {
    name: 'Dra. Hj. Ratna Sari Dewi, M.M.',
    nip: '19740512 199803 2 004',
    title: 'Kepala Dinas Kepemudaan, Olahraga, dan Pariwisata Kab. HSU',
    photoUrl: kadisImg,
    speech: `Assalamu’alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera, dan Salam Olahraga!

Selamat datang di Portal Resmi Dinas Kepemudaan, Olahraga, dan Pariwisata (Disporapar) Kabupaten Hulu Sungai Utara.

Kabupaten Hulu Sungai Utara yang beribukota di Kota Amuntai merupakan tanah yang dianugerahi keunikan bentang alam rawa lebak yang mempesona, kekayaan cagar budaya bersejarah Kerajaan Negara Dipa di Candi Agung, serta ketekunan masyarakat pengrajin anyaman purun dan peternak itik Alabio yang tiada duanya.

Melalui portal digital ini, kami hadir untuk memberikan keterbukaan informasi publik seluas-luasnya, mempromosikan pesona pariwisata Amuntai, serta menyajikan layanan perizinan terpadu online yang memudahkan seluruh warga, pemuda pelopor, komunitas seni, dan pelaku industri pariwisata.

Mari bersama-sama kita majukan kepemudaan, gelorakan semangat olahraga, dan kembangkan pariwisata Hulu Sungai Utara menuju masa depan yang gemilang. 

Bumi Agung Menanti Anda!
Wassalamu’alaikum Warahmatullahi Wabarakatuh.`
  },
  divisions: [
    {
      name: 'Sekretariat Dinas',
      head: 'Drs. H. Syarifuddin, M.Si.',
      tasks: [
        'Pengelolaan urusan administrasi umum, kepegawaian, dan keuangan dinas.',
        'Penyusunan rencana kerja program, evaluasi kinerja, dan pelaporan akuntabilitas.',
        'Pengelolaan sistem teknologi informasi, publikasi, dan kehumasan resmi.'
      ]
    },
    {
      name: 'Bidang Kepemudaan',
      head: 'Ahmad Fauzi, S.Pd., M.M.',
      tasks: [
        'Pemberdayaan dan pelatihan kewirausahaan pemuda pelopor di 10 kecamatan.',
        'Pembinaan organisasi kepemudaan (OKP), sanggar seni budaya muda, dan pramuka.',
        'Fasilitasi beasiswa pemuda berprestasi dan pertukaran pemuda antar daerah.'
      ]
    },
    {
      name: 'Bidang Keolahragaan',
      head: 'Muhammad Noor, S.Sos.',
      tasks: [
        'Pembinaan atlet usia dini dan pelajar melalui PPLPD Kab. HSU.',
        'Pengelolaan dan pemeliharaan fasilitas GOR Kamboja dan Stadion Suryanata.',
        'Penyelenggaraan POPDA, Kejurda, serta pengiriman kontingen atlet ke PORPROV.'
      ]
    },
    {
      name: 'Bidang Pariwisata & Ekonomi Kreatif',
      head: 'Nurul Hidayah, S.STP., M.A.P.',
      tasks: [
        'Pengembangan destinasi ekowisata Danau Panggang dan cagar budaya Candi Agung.',
        'Pembinaan kelompok sadar wisata (Pokdarwis) dan standarisasi desa wisata.',
        'Promosi pariwisata terpadu, kalender event tahunan, dan kurasi kriya purun ekraf.'
      ]
    }
  ]
};
