import React, { useState } from 'react';
import { PermitApplication, ApplicationStatus } from '../types';
import { X, Search, CheckCircle2, Clock, AlertTriangle, FileText, ArrowRight } from 'lucide-react';

interface PermitTrackerModalProps {
  applications: PermitApplication[];
  isOpen: boolean;
  onClose: () => void;
  onOpenNewApplication?: () => void;
}

export const PermitTrackerModal: React.FC<PermitTrackerModalProps> = ({
  applications,
  isOpen,
  onClose,
  onOpenNewApplication
}) => {
  const [searchCode, setSearchCode] = useState('');
  const [searchedApp, setSearchedApp] = useState<PermitApplication | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchCode.trim().toUpperCase();
    if (!query) return;

    const found = applications.find(
      app => app.id.toUpperCase() === query || app.applicantNik === query
    );
    setSearchedApp(found || null);
    setHasSearched(true);
  };

  const getStatusStepIndex = (status: ApplicationStatus): number => {
    switch (status) {
      case 'Menunggu Verifikasi': return 1;
      case 'Verifikasi Berkas': return 2;
      case 'Tinjauan Lapangan': return 3;
      case 'Disetujui': return 4;
      case 'Ditolak': return -1;
      default: return 1;
    }
  };

  const currentStep = searchedApp ? getStatusStepIndex(searchedApp.status) : 1;

  const steps = [
    { num: 1, title: 'Permohonan Masuk', desc: 'Registrasi online terdata' },
    { num: 2, title: 'Verifikasi Berkas', desc: 'Validasi dokumen & syarat' },
    { num: 3, title: 'Tinjauan / Uji Teknis', desc: 'Pengecekan lapangan / jadwal' },
    { num: 4, title: 'Izin Diterbitkan', desc: 'Surat resmi siap diambil / diunduh' },
  ];

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
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                Lacak Status Permohonan Izin
              </h3>
              <p className="text-xs text-stone-500">
                Sistem Informasi Pelayanan Publik Disporapar HSU
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Masukkan Nomor Resi (misal: HSU-IZIN-2026-0104) atau NIK..."
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 text-xs font-mono uppercase text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Cari Status</span>
            </button>
          </form>

          {/* Quick Demo Help */}
          {!hasSearched && (
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
              <div className="font-semibold text-stone-800 mb-1.5">
                Contoh Nomor Resi Aktif untuk Pengujian:
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-[11px]">
                {applications.slice(0, 3).map(app => (
                  <button
                    key={app.id}
                    type="button"
                    onClick={() => {
                      setSearchCode(app.id);
                      setSearchedApp(app);
                      setHasSearched(true);
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-emerald-50 text-emerald-800 border border-stone-200 rounded-lg cursor-pointer"
                  >
                    {app.id} ({app.status})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result Card */}
          {hasSearched && searchedApp && (
            <div className="space-y-6">
              {/* Status Header Badge */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-stone-500 mb-0.5">Nomor Registrasi:</div>
                  <div className="text-base font-bold font-mono text-emerald-900">
                    {searchedApp.id}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-stone-500 mb-0.5">Status Terkini:</div>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                    searchedApp.status === 'Disetujui'
                      ? 'bg-emerald-100 text-emerald-800'
                      : searchedApp.status === 'Ditolak'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {searchedApp.status === 'Disetujui' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {searchedApp.status === 'Ditolak' && <AlertTriangle className="w-3.5 h-3.5" />}
                    {searchedApp.status !== 'Disetujui' && searchedApp.status !== 'Ditolak' && <Clock className="w-3.5 h-3.5" />}
                    {searchedApp.status}
                  </span>
                </div>
              </div>

              {/* Step Progress Bar (if not rejected) */}
              {searchedApp.status !== 'Ditolak' ? (
                <div>
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider mb-3">
                    Alur Proses Permohonan
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {steps.map((st) => {
                      const isCompleted = currentStep >= st.num;
                      const isCurrent = currentStep === st.num;
                      return (
                        <div
                          key={st.num}
                          className={`p-3 rounded-xl border text-xs transition-colors ${
                            isCurrent
                              ? 'bg-emerald-50 border-emerald-300 ring-1 ring-emerald-500/30'
                              : isCompleted
                              ? 'bg-white border-stone-200'
                              : 'bg-stone-50/60 border-stone-100 opacity-60'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                              isCompleted ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-600'
                            }`}>
                              {st.num}
                            </span>
                            <span className={`font-semibold ${isCurrent ? 'text-emerald-900' : 'text-stone-800'}`}>
                              {st.title}
                            </span>
                          </div>
                          <div className="text-[11px] text-stone-500 leading-tight">
                            {st.desc}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
                  Permohonan belum dapat disetujui. Silakan periksa catatan perbaikan dari petugas di bawah ini atau hubungi langsung kantor Disporapar HSU.
                </div>
              )}

              {/* Detail Information */}
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700">
                    <div>
                      <span className="text-stone-500 block">Layanan:</span>
                      <span className="font-semibold text-stone-900">{searchedApp.serviceTitle}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Pemohon:</span>
                      <span className="font-semibold text-stone-900">{searchedApp.applicantName}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Nama Kegiatan:</span>
                      <span className="font-semibold text-stone-900">{searchedApp.activityTitle}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Tanggal Kegiatan:</span>
                      <span className="font-semibold text-stone-900">{searchedApp.activityDate || '-'}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Lokasi:</span>
                      <span className="font-semibold text-stone-900">{searchedApp.activityLocation}</span>
                    </div>
                    <div>
                      <span className="text-stone-500 block">Tanggal Pengajuan:</span>
                      <span className="font-semibold text-stone-900">{searchedApp.createdAt}</span>
                    </div>
                  </div>
                </div>

                {searchedApp.notes && (
                  <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
                    <div className="font-semibold text-amber-900 mb-1 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-800" />
                      <span>Catatan Tim Teknis Disporapar HSU:</span>
                    </div>
                    <p className="text-stone-700 leading-relaxed">
                      {searchedApp.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Not Found State */}
          {hasSearched && !searchedApp && (
            <div className="text-center py-8 space-y-3 bg-stone-50 rounded-xl border border-stone-200">
              <div className="w-12 h-12 rounded-full bg-stone-200 text-stone-500 mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-stone-800">
                Data Permohonan Tidak Ditemukan
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Pastikan nomor resi (misal: HSU-IZIN-2026-XXXX) atau NIK yang Anda masukkan sudah sesuai.
              </p>
              {onOpenNewApplication && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenNewApplication();
                  }}
                  className="mt-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Ajukan Permohonan Baru</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
