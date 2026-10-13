import React, { useState } from 'react';
import { DepartmentProfile } from '../types';
import { 
  Building2, 
  Target, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquareQuote,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface DepartmentProfileViewProps {
  profile: DepartmentProfile;
}

export const DepartmentProfileView: React.FC<DepartmentProfileViewProps> = ({ profile }) => {
  const [expandedDivision, setExpandedDivision] = useState<number | null>(0);

  return (
    <div className="space-y-12">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="text-xs font-semibold text-emerald-800 uppercase tracking-widest">
          Profil Resmi Instansi Pemerintah
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-serif-title text-stone-900 leading-tight">
          Dinas Kepemudaan, Olahraga, dan Pariwisata Kabupaten Hulu Sungai Utara
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          Mengabdi untuk kemajuan generasi muda, kejayaan prestasi olahraga, dan pengembangan pariwisata berkelanjutan di Bumi Agung, Kota Amuntai.
        </p>
      </div>

      {/* Sambutan Kepala Dinas */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* Kadis Photo */}
          <div className="md:col-span-5 bg-stone-100 relative min-h-[320px]">
            <img
              src={profile.headOfDepartment.photoUrl}
              alt={profile.headOfDepartment.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
            <div className="absolute bottom-3 left-3 right-3 text-white md:hidden">
              <div className="font-bold text-sm">{profile.headOfDepartment.name}</div>
              <div className="text-xs text-stone-200">{profile.headOfDepartment.title}</div>
            </div>
          </div>

          {/* Kadis Speech Text */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
                <MessageSquareQuote className="w-4 h-4 text-emerald-700" />
                <span>Sambutan Kepala Dinas</span>
              </div>
              <h3 className="hidden md:block text-lg font-bold text-stone-900 mb-0.5">
                {profile.headOfDepartment.name}
              </h3>
              <p className="hidden md:block text-xs text-stone-500 mb-4">
                {profile.headOfDepartment.title} · NIP: {profile.headOfDepartment.nip}
              </p>

              <div className="text-stone-700 text-xs sm:text-sm leading-relaxed space-y-3 whitespace-pre-line border-t border-stone-100 pt-3">
                {profile.headOfDepartment.speech.split('\n\n').slice(0, 3).map((para, idx) => (
                  <p key={idx} className={idx === 0 ? 'italic font-medium text-stone-800' : ''}>
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Amuntai, Kabupaten Hulu Sungai Utara</span>
              <span className="font-semibold text-emerald-800">#DisporaparHSUBerdaya</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visi & Misi */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Visi Box */}
        <div className="md:col-span-5 bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 uppercase tracking-wider mb-3">
              <Target className="w-4 h-4" />
              <span>Visi Pembangunan</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif-title leading-snug mb-4">
              Visi Disporapar Kabupaten HSU
            </h3>
            <blockquote className="text-sm sm:text-base leading-relaxed text-emerald-100 italic border-l-2 border-emerald-400 pl-4 py-1">
              "{profile.vision}"
            </blockquote>
          </div>
          <div className="pt-6 mt-6 border-t border-emerald-800/80 text-xs text-emerald-300">
            Selaras dengan Rencana Pembangunan Jangka Menengah Daerah (RPJMD) Kab. Hulu Sungai Utara
          </div>
        </div>

        {/* Misi Box */}
        <div className="md:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Misi Strategis</span>
          </div>
          <h3 className="text-xl font-bold text-stone-900 mb-4">
            5 Pilar Misi Pembangunan Daerah
          </h3>
          <div className="space-y-3">
            {profile.missions.map((misi, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs sm:text-sm text-stone-700">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-xs">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{misi}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Struktur Organisasi & Tupoksi */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>Tata Kelola Organisasi</span>
            </div>
            <h3 className="text-xl font-bold text-stone-900">
              Struktur Bidang & Tugas Pokok Fungsi (Tupoksi)
            </h3>
          </div>
          <div className="text-xs text-stone-500">
            Peraturan Bupati Hulu Sungai Utara tentang Kedudukan dan Rincian Tugas
          </div>
        </div>

        <div className="space-y-3">
          {profile.divisions.map((div, idx) => {
            const isExpanded = expandedDivision === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-stone-200 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedDivision(isExpanded ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 text-sm">{div.name}</div>
                      <div className="text-xs text-stone-500">Kepala: {div.head}</div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 bg-white border-t border-stone-200 text-xs text-stone-700 space-y-2">
                    <div className="font-semibold text-stone-900">Uraian Tugas Pokok:</div>
                    <ul className="list-disc list-inside space-y-1 text-stone-600">
                      {div.tasks.map((task, tidx) => (
                        <li key={tidx}>{task}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Kontak & Alamat Kantor */}
      <div className="bg-stone-900 text-stone-200 rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>Kantor Dinas</span>
            </div>
            <h4 className="font-bold text-white text-base">Sekretariat Disporapar HSU</h4>
            <p className="text-xs text-stone-400 leading-relaxed flex items-start gap-2 pt-1">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{profile.address}</span>
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <Phone className="w-4 h-4" />
              <span>Saluran Telepon</span>
            </div>
            <h4 className="font-bold text-white text-base">Layanan Pengaduan & Informasi</h4>
            <div className="text-xs text-stone-400 space-y-1 pt-1">
              <div>Telepon Kantor: {profile.phone}</div>
              <div>WhatsApp Resmi: {profile.whatsapp}</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <Mail className="w-4 h-4" />
              <span>Surat Elektronik</span>
            </div>
            <h4 className="font-bold text-white text-base">Email Kedinasan</h4>
            <div className="text-xs text-stone-400 space-y-1 pt-1">
              <div>Email: {profile.email}</div>
              <div>Jam Layanan: Senin - Jumat (08:00 - 16:00 WITA)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
