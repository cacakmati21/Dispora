import React, { useState } from 'react';
import { PermitType, PermitApplication } from '../types';
import { PERMIT_SERVICES } from '../data/initialData';
import { X, FileText, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';

interface PermitApplicationModalProps {
  initialServiceId?: PermitType;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (newApp: PermitApplication) => void;
}

export const PermitApplicationModal: React.FC<PermitApplicationModalProps> = ({
  initialServiceId = 'izin_event',
  isOpen,
  onClose,
  onSubmitSuccess
}) => {
  const [serviceId, setServiceId] = useState<PermitType>(initialServiceId);
  const [applicantName, setApplicantName] = useState('');
  const [applicantNik, setApplicantNik] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [activityTitle, setActivityTitle] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [activityLocation, setActivityLocation] = useState('');
  const [description, setDescription] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [submittedApp, setSubmittedApp] = useState<PermitApplication | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const currentService = PERMIT_SERVICES.find(s => s.id === serviceId) || PERMIT_SERVICES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantNik || !applicantPhone || !activityTitle) {
      alert('Harap lengkapi semua kolom wajib bertanda bintang (*)');
      return;
    }

    if (!agreeTerms) {
      alert('Anda harus menyetujui pernyataan kebenaran data dan ketentuan izin.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `HSU-IZIN-2026-${randomSuffix}`;

    const newApp: PermitApplication = {
      id: trackingCode,
      serviceId,
      serviceTitle: currentService.title,
      applicantName,
      applicantNik,
      applicantPhone,
      applicantEmail: applicantEmail || `${applicantName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      organizationName,
      activityTitle,
      activityDate,
      activityLocation: activityLocation || 'Wilayah Kabupaten Hulu Sungai Utara',
      description,
      status: 'Menunggu Verifikasi',
      notes: 'Permohonan berhasil didaftarkan secara online. Tim verifikator Disporapar HSU akan memeriksa berkas persyaratan dalam 1x24 jam kerja.',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    onSubmitSuccess(newApp);
    setSubmittedApp(newApp);
  };

  const handleCopyCode = () => {
    if (!submittedApp) return;
    navigator.clipboard.writeText(submittedApp.id);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleResetAndClose = () => {
    setSubmittedApp(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                Layanan Perizinan & Rekomendasi Online
              </h3>
              <p className="text-xs text-stone-500">
                Disporapar Kabupaten Hulu Sungai Utara
              </p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {submittedApp ? (
            /* Success State */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-stone-900 mb-1">
                  Permohonan Berhasil Terkirim!
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                  Dokumen permohonan Anda telah tercatat di basis data terpadu Disporapar HSU. Simpan nomor resi berikut untuk memantau status secara berkala.
                </p>
              </div>

              {/* Code Box */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 max-w-sm mx-auto">
                <div className="text-xs text-stone-500 mb-1">Nomor Registrasi / Kode Lacak:</div>
                <div className="text-lg sm:text-xl font-bold font-mono text-emerald-800 tracking-wider">
                  {submittedApp.id}
                </div>
                <button
                  onClick={handleCopyCode}
                  className="mt-2.5 w-full py-1.5 px-3 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg text-xs font-semibold text-stone-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-500" />
                      <span>Salin Nomor Resi</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs text-stone-500 max-w-md mx-auto p-3 rounded-lg bg-emerald-50/60 border border-emerald-100 text-left">
                <div className="font-semibold text-emerald-900 mb-1">Langkah Selanjutnya:</div>
                <ul className="list-disc list-inside space-y-1 text-emerald-800">
                  <li>Petugas Disporapar akan memverifikasi berkas persyaratan.</li>
                  <li>Anda dapat mengecek progres secara mandiri melalui menu <strong>Lacak Status Perizinan</strong>.</li>
                  <li>Notifikasi status juga dapat dikonfirmasikan melalui nomor WhatsApp resmi Disporapar HSU.</li>
                </ul>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Selesai & Tutup Jendela
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Pilih Jenis Layanan Perizinan *
                </label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value as PermitType)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700 bg-white"
                >
                  {PERMIT_SERVICES.map(svc => (
                    <option key={svc.id} value={svc.id}>
                      [{svc.category}] {svc.title}
                    </option>
                  ))}
                </select>
                <div className="mt-1.5 p-2.5 rounded-lg bg-stone-50 border border-stone-200 text-[11px] text-stone-600">
                  <span className="font-semibold text-stone-800">Waktu Proses:</span> {currentService.processingDays} Hari Kerja · <span className="font-semibold text-stone-800">Biaya Retribusi:</span> {currentService.fee}
                </div>
              </div>

              {/* Applicant Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nama Lengkap Pemohon / Penanggung Jawab *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Muhammad Ihsan, S.Pd."
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nomor Induk Kependudukan (NIK) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    placeholder="16 digit nomor KTP"
                    value={applicantNik}
                    onChange={(e) => setApplicantNik(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nomor WhatsApp / HP Aktif *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 0812-3456-7890"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nama Organisasi / Komunitas / Usaha
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Sanggar Seni Kambang Habang"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              {/* Event / Request Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Judul Acara / Usaha / Permohonan *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Lomba Futsal Antar Pelajar Se-HSU"
                    value={activityTitle}
                    onChange={(e) => setActivityTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Rencana Tanggal Pelaksanaan
                  </label>
                  <input
                    type="date"
                    value={activityDate}
                    onChange={(e) => setActivityDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Lokasi Fasilitas / Kegiatan di HSU
                </label>
                <input
                  type="text"
                  placeholder="Contoh: GOR Kamboja Amuntai Tengah"
                  value={activityLocation}
                  onChange={(e) => setActivityLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Uraian Singkat Kegiatan / Kebutuhan
                </label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan tujuan kegiatan, perkiraan jumlah peserta, dan sarana yang dibutuhkan..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              {/* Requirement Checklist Info */}
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                <div className="font-semibold text-stone-800 mb-1.5 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                  <span>Persyaratan Berkas yang Harus Dipersiapkan:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-stone-600 text-[11px]">
                  {currentService.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              {/* Agreement Checkbox */}
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-600">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-600 cursor-pointer"
                />
                <span>
                  Saya menyatakan bahwa data yang diisikan adalah benar dan bersedia mematuhi ketentuan peraturan perundang-undangan serta tata tertib yang ditetapkan oleh Disporapar Kabupaten Hulu Sungai Utara.
                </span>
              </label>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                >
                  Kirim Permohonan Izin
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
