import React, { useState } from 'react';
import {
  ExternalLink,
  Presentation,
  Maximize2,
  Minimize2,
  Sparkles,
  BookOpen,
  Layers,
  Palette,
  Compass,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Eye,
  Info,
  Brush,
  Grid,
  Clock,
  Lightbulb,
  Award,
  HelpCircle,
  Layout,
  Cpu,
  Feather,
  Shuffle
} from 'lucide-react';
import { User } from '../types';

interface MembuatKaryaSeniRupaViewProps {
  user?: User;
  onGoToLKPD?: () => void;
  onGoToQuiz?: () => void;
}

export const MembuatKaryaSeniRupaView: React.FC<MembuatKaryaSeniRupaViewProps> = ({
  onGoToLKPD,
  onGoToQuiz
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'pendidikan' | 'fungsi' | 'periodisasi' | 'konseptual'>('all');
  const [showLiveEmbed, setShowLiveEmbed] = useState<boolean>(true);
  const [isFullscreenModal, setIsFullscreenModal] = useState<boolean>(false);

  // State for Interactive Aspek Konseptual Simulator
  const [simInspirasi, setSimInspirasi] = useState<'internal' | 'eksternal'>('internal');
  const [simInteresSeni, setSimInteresSeni] = useState<'pragmatis' | 'reflektif' | 'estetis'>('reflektif');
  const [simInteresBentuk, setSimInteresBentuk] = useState<'figuratif' | 'semifiguratif' | 'nonfiguratif'>('semifiguratif');
  const [simCabang, setSimCabang] = useState<'murni' | 'kriya' | 'desain'>('murni');

  const canvaUrl = 'https://literasi-smaneb.my.canva.site/membuat-karya-seni-rupa';

  const conceptResult = {
    title: simCabang === 'murni' 
      ? (simInteresBentuk === 'figuratif' ? 'Lukisan Naratif Reflektif Jiwa' : simInteresBentuk === 'semifiguratif' ? 'Karya Ekspresi Distorsi Simbolik' : 'Komposisi Murni Abstraksi Batin')
      : simCabang === 'kriya'
      ? (simInteresBentuk === 'figuratif' ? 'Kriya Etnik Berkarakter Alam' : simInteresBentuk === 'semifiguratif' ? 'Kerajinan Tekstil Deformatif' : 'Kriya Keramik Kontemporer Nonfiguratif')
      : (simInteresBentuk === 'figuratif' ? 'Desain Grafis Komunikasi Edukatif' : simInteresBentuk === 'semifiguratif' ? 'Desain Identitas Visual Modern' : 'Pola Tata Ruang Minimalis Geometris'),
    karakter: `Memadukan inspirasi ${simInspirasi === 'internal' ? 'Realitas Internal (perambatan spiritual & batin diri)' : 'Realitas Eksternal (hubungan manusia dengan Tuhan, sesama, & alam)'} dengan ${simInteresSeni === 'pragmatis' ? 'Interes Pragmatis (alat pencapai tujuan edukasi/sosial)' : simInteresSeni === 'reflektif' ? 'Interes Reflektif (pencerminan realitas aktual & khayali)' : 'Interes Estetis (keindahan murni terlepas dari fungsi)'} dalam wujud ${simInteresBentuk === 'figuratif' ? 'Bentuk Figuratif (menyerupai objek alamiah riil)' : simInteresBentuk === 'semifiguratif' ? 'Bentuk Semifiguratif (deformasi/stilisasi artistik)' : 'Bentuk Nonfiguratif (abstraksi murni unsur rupa)'}.`
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-blue-900 to-slate-900 p-6 sm:p-8 md:p-10 text-white shadow-xl">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-blue-400/20">
              <Presentation className="w-3.5 h-3.5 text-blue-300" />
              Materi Ajar Resmi • Unit 4
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 text-xs font-semibold border border-amber-400/30">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Kurikulum Merdeka Seni Rupa SMANEB
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-serif tracking-tight leading-tight">
            Membuat dan Mempresentasikan Karya Seni Rupa
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl">
            Pelajari hakikat pendidikan seni, klasifikasi fungsi karya (Murni, Kriya, Desain), dimensi wujud (Dwimatra & Trimatra), periodisasi zaman (Pramodern, Modern, Postmodern), serta langkah-langkah merumuskan Aspek Konseptual (Sumber Inspirasi, Interes Seni, dan Interes Bentuk).
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <a
              href={canvaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Buka Presentasi Asli Canva</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => setShowLiveEmbed(!showLiveEmbed)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm backdrop-blur-md border border-white/10 transition-colors cursor-pointer"
            >
              <Eye className="w-4 h-4 text-blue-300" />
              <span>{showLiveEmbed ? 'Sembunyikan Viewer Canva' : 'Tampilkan Viewer Canva'}</span>
            </button>

            {onGoToLKPD && (
              <button
                onClick={onGoToLKPD}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Langsung ke LKPD Unit 4</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CANVA LIVE EMBED VIEWER */}
      {showLiveEmbed && (
        <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
                <Presentation className="w-5 h-5 text-blue-600" />
                Media Pembelajaran Digital (Canva Site Resmi SMANEB)
              </h2>
              <p className="text-xs text-slate-500">
                Akses langsung ke: <a href={canvaUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline font-mono">{canvaUrl}</a>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullscreenModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
                title="Buka Layar Penuh"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Layar Penuh</span>
              </button>
              <a
                href={canvaUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors"
              >
                <span>Buka Tab Baru</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="relative w-full aspect-[16/9] min-h-[380px] max-h-[640px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
            <iframe
              src={canvaUrl}
              title="Presentasi Membuat Karya Seni Rupa"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            Gunakan tombol panah di dalam slide Canva atau sentuh layar untuk beralih slide. Jika tampilan terpotong, klik tombol "Buka Tab Baru" di atas.
          </p>
        </div>
      )}

      {/* FULLSCREEN MODAL */}
      {isFullscreenModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-4">
          <div className="flex items-center justify-between pb-3 text-white">
            <div className="flex items-center gap-2">
              <Presentation className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-sm sm:text-base font-serif">Modul Canva: Membuat dan Mempresentasikan Karya Seni Rupa</span>
            </div>
            <button
              onClick={() => setIsFullscreenModal(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <Minimize2 className="w-4 h-4" />
              <span>Tutup Layar Penuh</span>
            </button>
          </div>
          <div className="flex-1 w-full h-full rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
            <iframe
              src={canvaUrl}
              title="Presentasi Fullscreen"
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* NAVIGATION FILTER CATEGORY */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Semua Modul
        </button>
        <button
          onClick={() => setActiveCategory('pendidikan')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeCategory === 'pendidikan'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          1. Hakikat Pendidikan Seni
        </button>
        <button
          onClick={() => setActiveCategory('fungsi')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeCategory === 'fungsi'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          2. Fungsi & Dimensi Karya
        </button>
        <button
          onClick={() => setActiveCategory('periodisasi')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeCategory === 'periodisasi'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          3. Periodisasi Zaman
        </button>
        <button
          onClick={() => setActiveCategory('konseptual')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeCategory === 'konseptual'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          4. Aspek Konseptual & Simulator
        </button>
      </div>

      {/* SECTION 1: HAKIKAT PENDIDIKAN SENI */}
      {(activeCategory === 'all' || activeCategory === 'pendidikan') && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <span className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Bagian 1 • Konsep Dasar</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                Hakikat, Tujuan, dan Fungsi Pendidikan Seni
              </h2>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
            <p className="font-bold text-blue-950 text-sm">
              Definisi Pendidikan Seni:
            </p>
            <p>
              <strong>Pendidikan seni</strong> adalah segala usaha untuk meningkatkan kemampuan kreatif dan ekspresif anak didik dalam mewujudkan kegiatan artistiknya berdasarkan aturan-aturan estetika tertentu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  T
                </span>
                <h3 className="text-sm font-bold text-indigo-950">Tujuan Pendidikan Seni</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tujuan pendidikan seni meliputi dua kegiatan utama yang saling melengkapi:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span><strong>Kegiatan Berkreasi:</strong> Menghasilkan wujud fisik karya baru melalui olah medium dan keterampilan teknis.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span><strong>Kegiatan Berekspresi:</strong> Mencurahkan luapan rasa batin, gagasan, dan pengalaman personal ke dalam bentuk rupa.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  F
                </span>
                <h3 className="text-sm font-bold text-emerald-950">Fungsi Pendidikan Seni</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fungsi pendidikan seni berorientasi pada pemenuhan tiga kebutuhan esensial manusia:
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Pemenuh Kebutuhan Berekspresi:</strong> Menjadi katarsis emosi dan saluran komunikasi visual subjektif.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Pemenuh Kebutuhan Berkreasi:</strong> Menstimulasi daya inovasi, kepekaan indera, dan ketangkasan karsa.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Pemenuh Kebutuhan Berapresiasi:</strong> Mengasah kepekaan estetis dalam menghargai keindahan karya ciptaan orang lain.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: MEMBUAT KARYA & KLASIFIKASI FUNGSI SERTA DIMENSI */}
      {(activeCategory === 'all' || activeCategory === 'fungsi') && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <Palette className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">Bagian 2 • Klasifikasi Rupa</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                Berkarya Seni Rupa: Pengelompokan Fungsi & Dimensi Wujud
              </h2>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs sm:text-sm text-slate-700">
            <strong>Definisi Berkarya Seni Rupa:</strong> Berkarya seni rupa adalah merealisasikan konsep seni dengan mengekspresikannya ke dalam karya seni fisik.
          </div>

          {/* 3 CABANG FUNGSI UTAMA */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              A. Pengelompokan Berdasarkan Fungsi Seni Rupa
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* SENI MURNI */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-purple-300 hover:shadow-md transition-all space-y-3">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-pink-100 text-pink-700 font-bold text-xs">
                    <Brush className="w-4 h-4" />
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">Seni Rupa Murni</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Seni yang tercipta bebas tanpa mempertimbangkan segi fungsi dan kegunaan praktis sehari-hari, melainkan <strong>lebih mengutamakan fungsi keindahan (estetika murni)</strong>.
                </p>
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-pink-700 block mb-1">Contoh Nyata:</span>
                  <span className="text-xs text-slate-700 bg-pink-50 px-2.5 py-1 rounded-md inline-block">
                    Seni Lukis, Seni Kaligrafi, Seni Patung
                  </span>
                </div>
              </div>

              {/* SENI KRIYA */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-amber-300 hover:shadow-md transition-all space-y-3">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-amber-100 text-amber-700 font-bold text-xs">
                    <Feather className="w-4 h-4" />
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">Seni Kriya</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cabang seni rupa terapan yang <strong>menekankan pada keterampilan tangan yang tinggi (*handcraftmanship*)</strong> dalam proses pembuatannya dengan ketelitian tinggi.
                </p>
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-amber-700 block mb-1">Contoh Nyata:</span>
                  <span className="text-xs text-slate-700 bg-amber-50 px-2.5 py-1 rounded-md inline-block">
                    Kriya Tekstil/Batik, Kriya Kayu/Ukir, Kriya Keramik
                  </span>
                </div>
              </div>

              {/* SENI DESAIN */}
              <div className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-md transition-all space-y-3">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs">
                    <Layout className="w-4 h-4" />
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">Seni Desain</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pola rancangan yang menjadi dasar pembuatan suatu benda fungsional, memadukan nilai guna praktis, ergonomi, dan estetika visual.
                </p>
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-blue-700 block mb-1">4 Cabang Desain:</span>
                  <span className="text-[11px] text-slate-700 leading-tight block">
                    Arsitektur, Desain Grafis, Desain Industri, Desain Interior
                  </span>
                </div>
              </div>
            </div>

            {/* DETAIL 4 CABANG DESAIN */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-blue-600" />
                Rincian 4 Cabang Seni Desain (Berdasarkan Modul Canva):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-blue-900 block mb-1">a. Desain Arsitektur</span>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Desain yang terkonsentrasi terhadap perancangan bangunan fisik seperti rumah hunian, gedung publik, dan struktur arsitektural.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-blue-900 block mb-1">b. Desain Grafis (DKV)</span>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Suatu bentuk komunikasi visual yang digunakan untuk menyampaikan pesan atau informasi selektif mungkin dengan media gambar dan teks.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-blue-900 block mb-1">c. Desain Industri</span>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Suatu kreasi tentang bentuk, konfigurasi garis atau warna yang memberikan kesan estetis pada produk massal manufaktur.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="font-bold text-blue-900 block mb-1">d. Desain Interior</span>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Cabang seni rupa yang fokus pada perancangan dan penataan ruang dalam bangunan demi kenyamanan dan estetika pengguna.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* KLASIFIKASI DIMENSI (DWIMATRA & TRIMATRA) */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              B. Pengelompokan Berdasarkan Wujud atau Dimensinya
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/40 to-white space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-blue-950">Karya Dua Dimensi (Dwimatra)</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-blue-100 text-blue-800">2D</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Karya seni rupa yang hanya memiliki dua ukuran matematis, yaitu <strong>panjang dan lebar</strong>. Karya ini berada pada bidang datar dan hanya dapat dinikmati dari satu arah sudut pandang (depan).
                </p>
                <div className="text-[11px] text-blue-800 font-medium pt-1">
                  Contoh: Lukisan, gambar ilustrasi, sketsa pensil, poster grafis, batik tulis, seni grafis cetak saring.
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50/40 to-white space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-teal-950">Karya Tiga Dimensi (Trimatra)</h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black bg-teal-100 text-teal-800">3D</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Karya seni rupa yang memiliki tiga ukuran, yaitu <strong>panjang, lebar, dan tinggi (ketebalan/volume fisik nyata)</strong>. Menempati ruang nyata dan dapat diamati serta diraba dari berbagai sisi 360 derajat.
                </p>
                <div className="text-[11px] text-teal-800 font-medium pt-1">
                  Contoh: Patung monumental, kriya keramik gerabah, anyaman tas pelepah pisang, instalasi ruang, maket arsitektur.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: PERIODISASI PERKEMBANGAN ZAMAN */}
      {(activeCategory === 'all' || activeCategory === 'periodisasi') && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Clock className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Bagian 3 • Periodisasi Sejarah</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                Perkembangan Zaman Seni Rupa: Pramodern, Modern, dan Postmodern
              </h2>
            </div>
          </div>

          <div className="space-y-6">
            {/* A. SENI RUPA PRAMODERN */}
            <div className="p-5 rounded-2xl border border-amber-200/80 bg-amber-50/30 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs">A</span>
                  Seni Rupa Pramodern
                </h3>
                <span className="text-[11px] text-amber-800 font-bold bg-amber-100 px-2 py-0.5 rounded-full">
                  Sebelum Zaman Modern
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Adalah karya seni rupa yang dihasilkan sebelum era modern lahir, dikelompokkan ke dalam 4 corak utama:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-amber-200">
                  <span className="font-bold text-slate-900 block mb-1">1. Primitivisme</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Aliran seni yang dilakukan oleh seorang seniman berdasarkan pada sebuah objektivitas yang diinginkan (kesederhanaan bentuk magis dan spontanitas purba).
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-amber-200">
                  <span className="font-bold text-slate-900 block mb-1">2. Naturalisme</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Corak atau aliran dalam seni rupa yang berusaha melukiskan suatu objek sesuai dengan keindahan alam secara presisi visual dan proporsional.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-amber-200">
                  <span className="font-bold text-slate-900 block mb-1">3. Realisme</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Aliran ini memandang dunia sebagai sesuatu yang nyata apa adanya tanpa dilebih-lebihkan, mengangkat realitas kehidupan sehari-hari masyarakat.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-amber-200">
                  <span className="font-bold text-slate-900 block mb-1">4. Dekorativisme</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Seni rupa yang berusaha menyederhanakan bentuk-bentuk alam dengan cara mengadakan distorsi atau stilisasi demi tujuan ornamen keindahan hiasan.
                  </p>
                </div>
              </div>
            </div>

            {/* B. SENI RUPA MODERN */}
            <div className="p-5 rounded-2xl border border-blue-200/80 bg-blue-50/30 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-blue-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">B</span>
                  Seni Rupa Modern
                </h3>
                <span className="text-[11px] text-blue-800 font-bold bg-blue-100 px-2 py-0.5 rounded-full">
                  Eksplorasi Ide, Sains & Media Baru
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Menekankan pada orisinalitas, pembaharuan gagasan, serta penolakan terhadap pakem klasik masa lampau:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-blue-200">
                  <span className="font-bold text-slate-900 block mb-1">a. Seni Pop (Pop Art)</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Menampilkan suasana sindiran, karikatur, humor, budaya konsumsi massa, dan apa adanya. Sering menggunakan media campuran (*mixed media*).
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-blue-200">
                  <span className="font-bold text-slate-900 block mb-1">b. Seni Optik (Op Art)</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Didasari penemuan ilmu fisika dan anatomi manusia. Berupa susunan garis gelombang geometris berulang yang mengeksploitasi ilusi ruang gerak pada mata.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-blue-200">
                  <span className="font-bold text-slate-900 block mb-1">c. Seni Konseptual</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Menempatkan ide/konsep di atas objek fisik. Menerapkan semiotika, feminisme, dan wacana budaya sehingga berlainan dari seni konvensional.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-blue-200">
                  <span className="font-bold text-slate-900 block mb-1">d. Seni Kontemporer</span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Seni yang tidak terikat batas ruang dan waktu masa kini, tidak berpatokan pada periodisasi kaku abad ke-20 atau 21, berselaras dengan zaman kini.
                  </p>
                </div>
              </div>
            </div>

            {/* C. SENI RUPA POSTMODERN */}
            <div className="p-5 rounded-2xl border border-violet-200/80 bg-violet-50/30 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-violet-950 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-violet-600 text-white flex items-center justify-center font-bold text-xs">C</span>
                  Seni Rupa Postmodern (Kontemporer Lanjut)
                </h3>
                <span className="text-[11px] text-violet-800 font-bold bg-violet-100 px-2 py-0.5 rounded-full">
                  Eklektik & Kebebasan Tanpa Batas
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Adalah gaya seni rupa yang merupakan <strong>perpaduan antara penyederhanaan bentuk dan sedikit ornamental</strong>. 
              </p>
              <div className="p-3 bg-white rounded-xl border border-violet-200 text-xs space-y-1">
                <span className="font-bold text-violet-950 block">Ciri-Ciri Utama Postmodern:</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Objek karyanya mengutamakan <strong>kebebasan berekspresi, bersifat dinamis, eklektik (menggabungkan berbagai gaya masa lalu dan modern), serta tidak terikat aturan kaku</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: ASPEK KONSEPTUAL PENCIPTAAN KARYA */}
      {(activeCategory === 'all' || activeCategory === 'konseptual') && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <span className="p-2 rounded-xl bg-teal-100 text-teal-700">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[11px] font-bold text-teal-600 uppercase tracking-wider">Bagian 4 • Proses Kreatif</span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                Aspek Konseptual dalam Penciptaan Karya Seni Rupa
              </h2>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong>Hakikat Aspek Konseptual:</strong> Aspek konseptual merupakan konsep awal dari sebuah penciptaan sebelum dilakukan aktivitas berkarya fisik di studio. Melalui tahapan ini, gagasan dirumuskan secara matang dan berbobot.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* LANGKAH A: SUMBER INSPIRASI */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center font-black text-xs">
                  A
                </span>
                <h3 className="text-sm font-bold text-slate-900">Penemuan Sumber Inspirasi</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Titik tolak penciptaan karya seni rupa adalah penemuan gagasan yang jelas dalam mengekspresikan pengalaman artistik, diantaranya:
              </p>
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-teal-900 block">1. Realitas Internal:</span>
                  <p className="text-slate-600 text-[11px]">Perambatan kehidupan spiritual kita sendiri (emosi, harapan, mimpi, cita-cita, dan renungan jiwa).</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-teal-900 block">2. Realitas Eksternal:</span>
                  <p className="text-slate-600 text-[11px]">Hubungan pribadi manusia dengan Tuhan, sesama manusia dalam masyarakat, serta alam semesta.</p>
                </div>
              </div>
            </div>

            {/* LANGKAH B: PENETAPAN INTERES SENI */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-xs">
                  B
                </span>
                <h3 className="text-sm font-bold text-slate-900">Penetapan Interes Seni</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sikap dan orientasi seniman terhadap fungsi serta tujuan hadirnya karya:
              </p>
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-blue-900 block">1. Interes Pragmatis:</span>
                  <p className="text-slate-600 text-[11px]">Menempatkan seni sebagai instrumen pencapaian tujuan tertentu (pendidikan, dakwah, pesan sosial).</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-blue-900 block">2. Interes Reflektif:</span>
                  <p className="text-slate-600 text-[11px]">Menempatkan seni sebagai pencerminan realitas aktual kehidupan nyata dan dunia khayali.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-blue-900 block">3. Interes Estetis:</span>
                  <p className="text-slate-600 text-[11px]">Berupaya melepaskan seni dari nilai-nilai pragmatis dan reflektif demi kemurnian keindahan semata.</p>
                </div>
              </div>
            </div>

            {/* LANGKAH C: PENETAPAN INTERES BENTUK */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs">
                  C
                </span>
                <h3 className="text-sm font-bold text-slate-900">Penetapan Interes Bentuk</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pilihan wujud visualisasi bentuk rupa yang akan dihadirkan ke atas bidang karya:
              </p>
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-indigo-900 block">1. Bentuk Figuratif:</span>
                  <p className="text-slate-600 text-[11px]">Menggambarkan bentuk objek nyata yang ada di alam (sosok manusia, hewan, pohon, lanskap pemandangan).</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-indigo-900 block">2. Bentuk Semifiguratif:</span>
                  <p className="text-slate-600 text-[11px]">Bentuk nyata yang telah mengalami stilisasi, deformasi, atau distorsi artistik namun masih dapat dikenali.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-indigo-900 block">3. Bentuk Nonfiguratif:</span>
                  <p className="text-slate-600 text-[11px]">Bentuk abstrak murni susunan garis, warna, dan bidang tanpa meniru objek fisik kasat mata di alam.</p>
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE SIMULATOR STUDIO KONSEPTUAL */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-5 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300">
                  <Cpu className="w-4 h-4" />
                </span>
                <h3 className="text-sm sm:text-base font-bold font-serif">
                  Simulator Aspek Konseptual: Rancang Arah Cipta Karyamu
                </h3>
              </div>
              <span className="text-[11px] text-indigo-200 bg-indigo-500/20 px-2.5 py-1 rounded-full font-medium border border-indigo-400/30">
                Fitur Interaktif Siswa
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Uji coba perpaduan antara sumber gagasan, interes seni, interes bentuk, dan cabang seni pilihanmu untuk merumuskan konsep karya seni yang kokoh:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {/* OPSI 1: INSPIRASI */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-indigo-300 block">1. Sumber Inspirasi:</label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSimInspirasi('internal')}
                    className={`p-2 rounded-xl text-center font-bold transition-all cursor-pointer ${
                      simInspirasi === 'internal'
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    Internal
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimInspirasi('eksternal')}
                    className={`p-2 rounded-xl text-center font-bold transition-all cursor-pointer ${
                      simInspirasi === 'eksternal'
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    Eksternal
                  </button>
                </div>
              </div>

              {/* OPSI 2: INTERES SENI */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-indigo-300 block">2. Interes Seni:</label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    onClick={() => setSimInteresSeni('pragmatis')}
                    className={`p-2 rounded-xl text-center font-bold text-[10px] transition-all cursor-pointer ${
                      simInteresSeni === 'pragmatis'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    Pragmatis
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimInteresSeni('reflektif')}
                    className={`p-2 rounded-xl text-center font-bold text-[10px] transition-all cursor-pointer ${
                      simInteresSeni === 'reflektif'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    Reflektif
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimInteresSeni('estetis')}
                    className={`p-2 rounded-xl text-center font-bold text-[10px] transition-all cursor-pointer ${
                      simInteresSeni === 'estetis'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    Estetis
                  </button>
                </div>
              </div>

              {/* OPSI 3: INTERES BENTUK */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-indigo-300 block">3. Interes Bentuk:</label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    onClick={() => setSimInteresBentuk('figuratif')}
                    className={`p-2 rounded-xl text-center font-bold text-[10px] transition-all cursor-pointer ${
                      simInteresBentuk === 'figuratif'
                        ? 'bg-purple-600 text-white shadow'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    Figuratif
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimInteresBentuk('semifiguratif')}
                    className={`p-2 rounded-xl text-center font-bold text-[10px] transition-all cursor-pointer ${
                      simInteresBentuk === 'semifiguratif'
                        ? 'bg-purple-600 text-white shadow'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    Semifiguratif
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimInteresBentuk('nonfiguratif')}
                    className={`p-2 rounded-xl text-center font-bold text-[10px] transition-all cursor-pointer ${
                      simInteresBentuk === 'nonfiguratif'
                        ? 'bg-purple-600 text-white shadow'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    Nonfiguratif
                  </button>
                </div>
              </div>

              {/* OPSI 4: CABANG SENI */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-indigo-300 block">4. Cabang Seni:</label>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    onClick={() => setSimCabang('murni')}
                    className={`p-2 rounded-xl text-center font-bold text-[10px] transition-all cursor-pointer ${
                      simCabang === 'murni'
                        ? 'bg-teal-600 text-white shadow'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    Murni
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimCabang('kriya')}
                    className={`p-2 rounded-xl text-center font-bold text-[10px] transition-all cursor-pointer ${
                      simCabang === 'kriya'
                        ? 'bg-teal-600 text-white shadow'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    Kriya
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimCabang('desain')}
                    className={`p-2 rounded-xl text-center font-bold text-[10px] transition-all cursor-pointer ${
                      simCabang === 'desain'
                        ? 'bg-teal-600 text-white shadow'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    Desain
                  </button>
                </div>
              </div>
            </div>

            {/* HASIL SIMULASI */}
            <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Rekomendasi Arah Karya: <strong>{conceptResult.title}</strong></span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-normal">
                {conceptResult.karakter}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER ACTION BANNER */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base sm:text-lg font-bold font-serif">
            Siap Merealisasikan Ide ke Lembar Kerja Peserta Didik (LKPD)?
          </h3>
          <p className="text-xs text-blue-100 max-w-xl">
            Terapkan pemahaman hakikat pendidikan seni, klasifikasi fungsi karya, dan rumusan aspek konseptualmu pada LKPD 1, LKPD 2, dan LKPD 3 Unit 4!
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {onGoToQuiz && (
            <button
              onClick={onGoToQuiz}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Uji Pemahaman Kuis
            </button>
          )}

          {onGoToLKPD && (
            <button
              onClick={onGoToLKPD}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-indigo-950 font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>Buka LKPD Unit 4</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
