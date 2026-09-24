import React, { useState } from 'react';
import { 
  Award, 
  Printer, 
  X, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Download,
  Calendar,
  ShieldCheck,
  Building2,
  Trophy
} from 'lucide-react';
import { User } from '../types';

export interface UnitInfo {
  id: string;
  levelNumber: number;
  judul: string;
  tema: string;
  semester: 'Semester Gasal' | 'Semester Genap';
}

export const ALL_UNITS: UnitInfo[] = [
  {
    id: 'unit-1',
    levelNumber: 1,
    judul: 'Berdiaspora Bersama Seni Rupa',
    tema: 'Keberagaman Seni Rupa Nusantara',
    semester: 'Semester Gasal'
  },
  {
    id: 'unit-2',
    levelNumber: 2,
    judul: 'Eksplorasi Media dan Teknik Berkarya Seni Kontemporer',
    tema: 'Eksperimen Seni Rupa Modern',
    semester: 'Semester Gasal'
  },
  {
    id: 'unit-3',
    levelNumber: 3,
    judul: 'Menciptakan Karya Seni Rupa Ramah Lingkungan (Eco-Art)',
    tema: 'Seni Berkelanjutan & Ekologis',
    semester: 'Semester Gasal'
  },
  {
    id: 'unit-4',
    levelNumber: 4,
    judul: 'Membuat dan Mempresentasikan Karya Seni Rupa',
    tema: 'Klasifikasi Fungsi, Periodisasi Zaman, & Aspek Konseptual',
    semester: 'Semester Genap'
  },
  {
    id: 'unit-5',
    levelNumber: 5,
    judul: 'Merancang Desain Produk Kriya Industri',
    tema: 'Desain Logo Branding, Desain Brief, & Video Promosi',
    semester: 'Semester Genap'
  }
];

interface UnitCertificateModalProps {
  user: User;
  initialUnitId?: string;
  onClose: () => void;
}

export const UnitCertificateModal: React.FC<UnitCertificateModalProps> = ({
  user,
  initialUnitId = 'unit-1',
  onClose
}) => {
  const [selectedUnitId, setSelectedUnitId] = useState<string>(initialUnitId);

  const currentUnit = ALL_UNITS.find(u => u.id === selectedUnitId) || ALL_UNITS[0];

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const certificateNumber = `421.3/SR-XI/U${currentUnit.levelNumber}/${new Date().getFullYear()}`;

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      {/* Container Dialog */}
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-4">
        {/* Top Control Bar (Hidden when Printing) */}
        <div className="no-print bg-slate-900 text-white p-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Sertifikat Capaian Unit Pembelajaran</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Resmi SMAN 1 Bululawang
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Pilih unit di bawah untuk mencetak sertifikat penghargaan dan kelulusan LKPD
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrintCertificate}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Sertifikat / Simpan PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Tutup Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Unit Selector Tabs (Hidden when Printing) */}
        <div className="no-print p-3 sm:px-6 bg-slate-100/90 border-b border-slate-200 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            <span className="text-xs font-bold text-slate-600 mr-1 flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-500" /> Unit:
            </span>
            {ALL_UNITS.map((unit) => {
              const isActive = unit.id === selectedUnitId;
              return (
                <button
                  key={unit.id}
                  onClick={() => setSelectedUnitId(unit.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-300'
                      : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive ? 'bg-white text-indigo-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {unit.levelNumber}
                  </span>
                  <span>Unit {unit.levelNumber} ({unit.semester.replace('Semester ', '')})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================== */}
        {/* CERTIFICATE SHEET (A4 Landscape Formatted Document)        */}
        {/* ========================================================== */}
        <div className="p-4 sm:p-8 bg-slate-50 overflow-x-auto">
          <div className="certificate-paper min-w-[760px] max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-2xl shadow-xl border-8 border-double border-amber-600/70 relative text-slate-900 select-text overflow-hidden">
            {/* Background Watermark Crest */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
              <img
                src="/sman1_bululawang_logo.jpg"
                alt="Watermark Logo SMAN 1 Bululawang"
                className="w-96 h-96 object-contain"
              />
            </div>

            {/* Inner Decorative Corner Borders */}
            <div className="absolute top-2 left-2 w-10 h-10 border-t-2 border-l-2 border-amber-600 pointer-events-none" />
            <div className="absolute top-2 right-2 w-10 h-10 border-t-2 border-r-2 border-amber-600 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-10 h-10 border-b-2 border-l-2 border-amber-600 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-10 h-10 border-b-2 border-r-2 border-amber-600 pointer-events-none" />

            {/* CERTIFICATE KOP / HEADER */}
            <div className="relative z-10 border-b-2 border-slate-900 pb-4 mb-6 flex items-center justify-between gap-4">
              <img
                src="/sman1_bululawang_logo.jpg"
                alt="Logo SMA Negeri 1 Bululawang"
                className="w-20 h-20 sm:w-24 sm:h-24 object-contain shrink-0"
              />

              <div className="text-center flex-1">
                <p className="text-xs sm:text-sm uppercase tracking-widest font-bold text-slate-800">
                  Pemerintah Provinsi Jawa Timur • Dinas Pendidikan
                </p>
                <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-slate-950 font-serif">
                  SMA NEGERI 1 BULULAWANG
                </h1>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium mt-0.5">
                  Jl. Raya Bululawang, Kec. Bululawang, Kab. Malang, Jawa Timur 65171
                </p>
                <p className="text-[10px] text-slate-500 italic">
                  Akreditasi A • Telepon: (0341) 833150 • Laman Resmi SMAN 1 Bululawang
                </p>
              </div>

              {/* Verified Digital Seal Emblem */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex flex-col items-center justify-center border-2 border-dashed border-amber-500 rounded-full p-1 shrink-0 bg-amber-50/70 text-center">
                <ShieldCheck className="w-7 h-7 text-amber-600 mb-0.5" />
                <span className="text-[8px] font-extrabold uppercase text-amber-900 leading-tight">
                  TERVERIFIKASI
                </span>
                <span className="text-[7px] text-amber-700 font-semibold">ArtVerse XI</span>
              </div>
            </div>

            {/* TITLE OF CERTIFICATE */}
            <div className="relative z-10 text-center my-6 space-y-1">
              <span className="px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-amber-100 text-amber-900 border border-amber-300">
                SERTIFIKAT KELULUSAN & PENGHARGAAN APRESIASI SENI
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-wide text-slate-900 font-serif pt-2">
                SERTIFIKAT CAPAIAN PEMBELAJARAN
              </h2>
              <p className="text-xs font-bold text-slate-500 tracking-wider">
                Nomor: {certificateNumber}
              </p>
            </div>

            {/* RECIPIENT INFORMATION */}
            <div className="relative z-10 text-center my-6 space-y-2">
              <p className="text-xs sm:text-sm text-slate-600 italic">
                Diberikan dengan hormat dan apresiasi setinggi-tingginya kepada:
              </p>
              <div className="inline-block border-b-2 border-slate-900 px-8 py-1">
                <p className="text-2xl sm:text-3xl font-extrabold text-indigo-950 font-serif">
                  {user.nama}
                </p>
              </div>
              <p className="text-sm font-bold text-slate-700">
                Kelas: <span className="text-indigo-700 font-extrabold">{user.kelas}</span> • Fase F (Kelas XI)
              </p>
            </div>

            {/* CERTIFICATE BODY & ACHIEVEMENT */}
            <div className="relative z-10 max-w-2xl mx-auto text-center text-xs sm:text-sm leading-relaxed text-slate-700 my-6 bg-slate-50/80 p-4 rounded-xl border border-slate-200">
              <p>
                Telah berhasil menyelesaikan seluruh rangkaian tahapan pembelajaran mandiri, pengerjaan Lembar Kerja Peserta Didik (LKPD), kuis pemahaman materi, serta eksperimen kreasi seni rupa pada:
              </p>
              <div className="my-2.5 py-1.5 px-3 bg-white rounded-lg border border-indigo-200 inline-block shadow-xs">
                <span className="font-extrabold text-indigo-900 text-sm sm:text-base">
                  UNIT {currentUnit.levelNumber}: {currentUnit.judul.toUpperCase()}
                </span>
                <p className="text-xs text-indigo-700 font-semibold">
                  Tema: {currentUnit.tema}
                </p>
              </div>
              <p className="font-semibold text-slate-800">
                Mata Pelajaran: Seni Rupa • {currentUnit.semester} • Predikat: <span className="text-emerald-700 font-extrabold">Sangat Memuaskan (A) - TUNTAS</span>
              </p>
            </div>

            {/* SIGNATURE SECTION */}
            <div className="relative z-10 mt-8 pt-4 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs text-center">
              {/* Left Signature: Guru Pengampu Seni Rupa */}
              <div className="space-y-16">
                <div>
                  <p className="font-bold text-slate-800">Mengetahui,</p>
                  <p className="text-slate-600">Guru Pengampu Seni Rupa Kelas XI</p>
                </div>
                <div>
                  <div className="border-b border-slate-600 w-48 mx-auto pb-1 font-extrabold text-slate-900">
                    ( .................................................. )
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Guru Seni Rupa SMAN 1 Bululawang</p>
                </div>
              </div>

              {/* Right Signature: Kepala Sekolah */}
              <div className="space-y-16">
                <div>
                  <p className="font-semibold text-slate-600">Bululawang, {currentDate}</p>
                  <p className="font-bold text-slate-800">Kepala SMA Negeri 1 Bululawang,</p>
                </div>
                <div>
                  <div className="border-b border-slate-600 w-48 mx-auto pb-1 font-extrabold text-slate-900">
                    ( .................................................. )
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">NIP. 19680512 199412 1 002</p>
                </div>
              </div>
            </div>

            {/* Footer Validation Mark */}
            <div className="relative z-10 mt-6 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-400 gap-2">
              <span>Dokumen Sertifikat Digital Resmi ArtVerse XI • SMA Negeri 1 Bululawang</span>
              <span className="font-mono">ID Validasi: ART-U{currentUnit.levelNumber}-{user.id.slice(0, 8).toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions (Hidden when printing) */}
        <div className="no-print bg-white p-4 px-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Sertifikat siap dicetak dengan ukuran A4 (Mode Lanskap direkomendasikan pada jendela printer).</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs cursor-pointer"
            >
              Tutup
            </button>
            <button
              onClick={handlePrintCertificate}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all hover:scale-105 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Sertifikat Unit Ini</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
