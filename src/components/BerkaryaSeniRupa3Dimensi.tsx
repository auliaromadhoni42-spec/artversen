import React, { useState } from 'react';
import {
  ExternalLink,
  Presentation,
  Maximize2,
  Minimize2,
  Sparkles,
  BookOpen,
  Layers,
  Leaf,
  Recycle,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Package,
  Scissors,
  HelpCircle,
  Lightbulb,
  Award,
  RefreshCw,
  Eye,
  Info
} from 'lucide-react';
import { User } from '../types';

interface BerkaryaSeniRupa3DimensiProps {
  user?: User;
  onGoToLKPD?: () => void;
  onGoToQuiz?: () => void;
}

export const BerkaryaSeniRupa3Dimensi: React.FC<BerkaryaSeniRupa3DimensiProps> = ({
  onGoToLKPD,
  onGoToQuiz
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [showLiveEmbed, setShowLiveEmbed] = useState<boolean>(true);
  const [isFullscreenModal, setIsFullscreenModal] = useState<boolean>(false);
  const [selectedMaterial, setSelectedMaterial] = useState<'pelepah' | 'pandan' | 'kresek'>('pelepah');

  const canvaUrl = 'https://literasi-smaneb.my.canva.site/berkaryasenirupatigadimensi';

  const slides = [
    {
      id: 'definisi-3d',
      category: 'Konsep Dasar',
      badge: 'Definisi Rupa 3D',
      title: 'Karya Seni Rupa Tiga Dimensi',
      summary: 'Karya seni yang memiliki volume, panjang, lebar, tinggi, dan dapat diraba serta diamati dari berbagai sudut pandang nyata.',
      details: [
        'Memiliki dimensi ruang nyata (kedalaman/volume fisik).',
        'Dapat disentuh, diraba permukaannya, dan dinikmati dari 360 derajat.',
        'Memadukan unsur bentuk (form), ruang (space), massa, dan tekstur raba.',
        'Berbeda dengan karya 2 dimensi (lukisan/gambar datar) yang hanya memiliki ilusi kedalaman semu.'
      ],
      icon: Layers,
      accentColor: 'indigo'
    },
    {
      id: 'urgensi-daur-ulang',
      category: 'Peduli Lingkungan',
      badge: 'Urgensi Ekologis',
      title: 'Apa itu Daur Ulang & Mengapa Penting?',
      summary: 'Daur ulang adalah proses mengubah barang bekas atau sampah menjadi barang baru yang berguna dan bernilai estetis.',
      details: [
        'Mengurangi timbunan sampah yang menumpuk di TPA dan lingkungan sekitar.',
        'Menghemat sumber daya alam (mengurangi penebangan pohon, penambangan, dan minyak bumi).',
        'Berusaha aktif melindungi lingkungan hidup dari pencemaran dan pemanasan global.',
        'Memberikan siklus hidup kedua bagi benda-benda anorganik maupun organik di sekitar kita.'
      ],
      icon: Recycle,
      accentColor: 'emerald'
    },
    {
      id: 'jenis-bahan',
      category: 'Eksplorasi Material',
      badge: 'Klasifikasi Bahan',
      title: 'Jenis-Jenis Bahan yang Bisa Didaur Ulang',
      summary: 'Kenali 4 kelompok utama bahan bekas potensial yang aman dan mudah diolah menjadi karya seni kriya.',
      details: [
        'Koran, Majalah, dan Karton: Mudah dibubur, dipilin, dianyam, atau dilaminasi.',
        'Botol, Kantong, dan Plastik: Fleksibel, tahan air, dapat disetrika (fused plastic) atau dianyam.',
        'Botol Minuman dan Toples (Kaca): Kuat, transparan, cocok untuk teknik dekoupage atau instalasi.',
        'Kaleng dan Peralatan Besi/Aluminium: Memberikan struktur kokoh dan karakter industrial.'
      ],
      icon: Package,
      accentColor: 'amber'
    },
    {
      id: 'siklus-daur-ulang',
      category: 'Metodologi Kerja',
      badge: '5 Alur Tahapan',
      title: '5 Langkah Sistematis Daur Ulang',
      summary: 'Prosedur baku pengolahan limbah menjadi bahan baku karya yang higienis, teratur, dan berstandar aman.',
      details: [
        '1. Pengumpulan Sampah: Menghimpun bahan bekas dari lingkungan sekolah atau rumah.',
        '2. Pemilahan Sampah: Mengelompokkan berdasarkan karakteristik material (kertas, plastik, logam).',
        '3. Pembersihan Sampah: Mencuci dan mengeringkan agar bebas noda, bau, dan kotoran.',
        '4. Pengolahan Sampah: Mengubah bentuk fisik awal (memotong, memipihkan, merajang, atau melunakkan).',
        '5. Pembuatan Produk Baru: Mengeksekusi rancangan kriya fungsional hingga tahapan finishing.'
      ],
      icon: RefreshCw,
      accentColor: 'sky'
    },
    {
      id: 'manfaat-aksi',
      category: 'Aksi Nyata Siswa',
      badge: 'Langkah Konkret',
      title: 'Manfaat & Cara Membantu Lingkungan',
      summary: 'Daur ulang membantu kita menjaga bumi tetap bersih, sehat, dan nyaman bagi generasi mendatang.',
      details: [
        'Memilah sampah di rumah antara fraksi organik (sisa makanan) dan non-organik (plastik/kertas).',
        'Mengurangi pemakaian barang sekali pakai dengan membawa botol minum (tumbler) dan tas kain.',
        'Mengajak teman sebaya, keluarga, dan warga sekolah untuk membiasakan budaya minim sampah.',
        'Menyelamatkan alam: 1 ton kertas bekas dapat menyelamatkan sekitar 17 pohon dewasa!'
      ],
      icon: Leaf,
      accentColor: 'teal'
    },
    {
      id: 'kriya-daur-ulang',
      category: 'Konsep Kriya',
      badge: 'Nilai Guna & Estetika',
      title: 'Pengertian & Tujuan Kerajinan Daur Ulang',
      summary: 'Karya kerajinan dari bahan bekas yang diolah kembali menjadi benda baru dengan perpaduan nilai guna (fungsi) dan nilai estetika.',
      details: [
        'Melatih daya kreativitas, inovasi desain, dan kecakapan motorik tangan siswa.',
        'Menumbuhkan kepekaan estetik terhadap material limbah yang sering dipandang sebelah mata.',
        'Meningkatkan nilai guna dan nilai jual bahan bekas menjadi produk bernilai ekonomi kreatif.',
        'Menanamkan sikap tanggung jawab ekologis melalui karya seni yang nyata dan dapat dipakai.'
      ],
      icon: Award,
      accentColor: 'purple'
    },
    {
      id: 'tugas-projek',
      category: 'Tugas Akhir Praktik',
      badge: 'Projek Kriya Fashion',
      title: 'Tugas Praktik: Kriya Fashion Daur Ulang',
      summary: 'Buatlah sebuah karya kriya 3 dimensi fungsional bertema fashion ramah lingkungan dengan memilih 1 dari 3 bahan utama.',
      details: [
        'Pilihan Bahan 1: Pelepah Pisang kering yang disuwir/dianyam.',
        'Pilihan Bahan 2: Daun Pandan yang dikeringkan dan diwarnai alami/sintetis.',
        'Pilihan Bahan 3: Tas Kresek bekas yang disetrika lapis (fused plastic) atau dirajut (plarn).',
        'Bentuk Produk Kriya: Tas Selempang, Totebag/Tas Jinjing, Dompet, atau Pouch Aksesoris.'
      ],
      icon: Scissors,
      accentColor: 'rose'
    }
  ];

  const materialOptions = [
    {
      id: 'pelepah',
      title: 'Pelepah Pisang (Serat Alam)',
      badge: 'Limbah Alam Organik',
      desc: 'Pelepah pisang tua yang dikeringkan di bawah sinar matahari memiliki serat yang kuat, tekstur alami kecokelatan eksotis, dan sangat tahan lama jika dilapisi pernis.',
      steps: [
        'Pilih pelepah pisang yang sudah tua dan kering dari pohon.',
        'Belah dan suwir menjadi lembaran pipih dengan lebar seragam (0.5 - 1 cm).',
        'Jemur hingga kering total agar tidak berjamur.',
        'Anyam dengan pola silang dasar atau kepang menjadi panel badan tas.',
        'Beri furing kain blacu di bagian dalam dan pasang kancing/tali rami.'
      ],
      products: 'Tas Jinjing Kasual, Dompet Etnik, Kotak Pensil Ramah Lingkungan',
      tip: 'Gunakan vernis water-based transparan setelah selesai agar tahan cipratan air dan jamur.'
    },
    {
      id: 'pandan',
      title: 'Daun Pandan Duri / Laut',
      badge: 'Limbah Serat Alami',
      desc: 'Daun pandan memiliki aroma khas, serat yang sangat lentur, dan permukaan halus mengilap. Cocok untuk teknik anyaman halus berkarakter kriya tradisional modern.',
      steps: [
        'Bersihkan duri di kedua sisi daun pandan.',
        'Sayat daun pandan menjadi lajur-lajur kecil memanjang menggunakan jangka/pisau.',
        'Rebus daun pandan sebentar untuk mematikan getah dan lenturkan serat.',
        'Keringkan di tempat teduh (jangan terkena terik matahari langsung agar tidak getas).',
        'Anyam membentuk wadah pouch, dompet lipat, atau aksen totebag.'
      ],
      products: 'Pouch Kosmetik Etnik, Dompet Lipat Kartu, Clutch Pesta Ramah Lingkungan',
      tip: 'Dapat dicelup pewarna tekstil ramah lingkungan untuk menciptakan aksen motif warna kontras.'
    },
    {
      id: 'kresek',
      title: 'Kantong Kresek (Fused Plastic)',
      badge: 'Limbah Plastik Anorganik',
      desc: 'Sampah plastik kantong kresek dapat diubah menjadi lembaran kulit sintetis kedap air melalui teknik pelapisan setrika (fused plastic bag technique).',
      steps: [
        'Kumpulkan minimal 6-10 lembar kantong kresek bekas yang bersih dan kering.',
        'Gunting pegangan dan bagian bawah, lalu buka hingga menjadi lembaran datar.',
        'Susun 4-6 lapis kresek di antara dua lembar kertas roti/baking paper.',
        'Setrika dengan panas sedang bergerak perlahan hingga lapisan kresek meleleh dan menyatu padat.',
        'Pola dan jahit lembaran plastik lentur tersebut menjadi tas selempang atau totebag.'
      ],
      products: 'Tas Selempang Waterproof, Totebag Geometris, Tempat Paspor / Card Holder',
      tip: 'Selalu gunakan kertas minyak/baking paper tebal agar plastik tidak lengket di permukaan setrika.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white p-6 sm:p-8 shadow-xl border border-indigo-900/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Materi Unit 3 • Seni Budaya Kelas XI Fase F
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-white tracking-tight">
              Berkarya Seni Rupa 3 Dimensi
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Materi pembelajaran digital interaktif mengenai konsep karya tiga dimensi, 
              urgensi & siklus daur ulang, pemilahan material limbah, serta panduan proyek 
              kriya fashion ramah lingkungan (Pelepah Pisang, Daun Pandan, & Tas Kresek).
            </p>

            {/* 4 Pillars Mini Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-semibold text-slate-200 border border-white/10">
                <Leaf className="w-3 h-3 text-emerald-400" /> Peduli Lingkungan
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-semibold text-slate-200 border border-white/10">
                <Recycle className="w-3 h-3 text-sky-400" /> Identifikasi Bahan Daur Ulang
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-semibold text-slate-200 border border-white/10">
                <Scissors className="w-3 h-3 text-amber-400" /> Karya Kriya Fashion 3D
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-semibold text-slate-200 border border-white/10">
                <Award className="w-3 h-3 text-purple-400" /> Nilai Guna & Estetika
              </span>
            </div>
          </div>

          {/* Action Button Group */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <a
              href={canvaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-950/50 transition-all cursor-pointer group"
            >
              <Presentation className="w-4 h-4 text-blue-200 group-hover:scale-110 transition-transform" />
              <span>Buka Materi di Canva Site</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <button
              onClick={() => setIsFullscreenModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/15 transition-all cursor-pointer"
            >
              <Maximize2 className="w-4 h-4 text-blue-300" />
              <span>Pratinjau Layar Penuh</span>
            </button>

            <button
              onClick={() => setShowLiveEmbed(!showLiveEmbed)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showLiveEmbed ? 'Sembunyikan Iframe Canva' : 'Tampilkan Iframe Canva'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official Canva Live Presentation Viewer */}
      {showLiveEmbed && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Presentation className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-serif">
                  Tampilan Presentasi Materi Langsung
                </h3>
                <p className="text-xs text-slate-500">
                  Sumber Resmi: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-[11px] text-blue-700 font-mono">literasi-smaneb.my.canva.site/berkaryasenirupatigadimensi</code>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={canvaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <span>Tab Baru</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setIsFullscreenModal(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Perbesar</span>
              </button>
            </div>
          </div>

          <div className="relative w-full aspect-video min-h-[420px] sm:min-h-[520px] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner">
            <iframe
              src={canvaUrl}
              title="Berkarya Seni Rupa Tiga Dimensi Presentasi Materi"
              allow="fullscreen"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 px-1">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-500" />
              Anda dapat menggeser slide, memutar animasi, dan membaca materi langsung di dalam jendela interaktif di atas.
            </span>
            <span className="text-slate-400">Canva Education • Literasi SMANEB</span>
          </div>
        </div>
      )}

      {/* Competency Cards (4 Pillars) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-xs hover:shadow-md transition-all space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Leaf className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800">Kompetensi 1</h4>
          <p className="text-sm font-bold text-slate-800">Menumbuhkan Sikap Peduli Lingkungan</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Menumbuhkan kesadaran ekologis dan kepedulian terhadap kebersihan bumi lewat tindakan nyata sehari-hari.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-sky-100 shadow-xs hover:shadow-md transition-all space-y-2">
          <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
            <Recycle className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-black uppercase tracking-wider text-sky-800">Kompetensi 2</h4>
          <p className="text-sm font-bold text-slate-800">Identifikasi Jenis Bahan Daur Ulang</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Mengenali dan memilah bahan limbah bekas (kertas, plastik, kaca, logam) yang dapat diolah kembali.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-amber-100 shadow-xs hover:shadow-md transition-all space-y-2">
          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Scissors className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-black uppercase tracking-wider text-amber-800">Kompetensi 3</h4>
          <p className="text-sm font-bold text-slate-800">Membuat Karya Kerajinan Sederhana</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Mengeksekusi pembuatan produk kriya 3D bernilai guna seperti totebag, tas jinjing, atau pouch aksesoris.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-xs hover:shadow-md transition-all space-y-2">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-black uppercase tracking-wider text-purple-800">Kompetensi 4</h4>
          <p className="text-sm font-bold text-slate-800">Memahami Kerajinan Bahan Daur Ulang</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Mengapresiasi perpaduan nilai guna fungsional dan nilai estetika keindahan karya kriya daur ulang.
          </p>
        </div>
      </div>

      {/* Interactive Slide-by-Slide Viewer Component */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
              Rangkuman Materi Slide Interaktif
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif mt-1">
              Bedah Modul: Berkarya Seni Rupa 3 Dimensi
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pilih topik di bawah ini untuk menelaah setiap slide presentasi secara detail dan terstruktur.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0">
            <span className="text-xs font-bold text-slate-600 px-2">
              Slide {activeSlide + 1} dari {slides.length}
            </span>
          </div>
        </div>

        {/* Tab Pills for Slides */}
        <div className="px-6 pt-4 pb-2 border-b border-slate-100 overflow-x-auto scrollbar-none flex gap-2">
          {slides.map((s, idx) => {
            const Icon = s.icon;
            const isCurrent = activeSlide === idx;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSlide(idx)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-blue-400' : 'text-slate-500'}`} />
                <span>{s.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Current Active Slide Card */}
        <div className="p-6 sm:p-8 space-y-6">
          {(() => {
            const slide = slides[activeSlide];
            const Icon = slide.icon;

            return (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        {slide.category} • Bagian {activeSlide + 1}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                        {slide.title}
                      </h3>
                      <p className="text-sm font-medium text-slate-600 mt-1 leading-relaxed">
                        {slide.summary}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Point by Point Box */}
                <div className="bg-slate-50/80 rounded-2xl p-5 sm:p-6 border border-slate-200/80 space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Poin Kunci & Penjelasan Mendalam:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {slide.details.map((detail, dIdx) => (
                      <li
                        key={dIdx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed"
                      >
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">
                          {dIdx + 1}
                        </span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Navigation Between Slides */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setActiveSlide((prev) => Math.max(0, prev - 1))}
                    disabled={activeSlide === 0}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                  >
                    ← Slide Sebelumnya
                  </button>

                  <div className="flex items-center gap-1.5">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSlide(i)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          activeSlide === i ? 'w-6 bg-blue-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                        }`}
                        title={`Lompat ke slide ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveSlide((prev) => Math.min(slides.length - 1, prev + 1))}
                    disabled={activeSlide === slides.length - 1}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
                  >
                    Slide Selanjutnya →
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Practical Final Project Guide: Kriya Fashion 3D */}
      <div className="bg-white rounded-3xl border-2 border-indigo-200/80 shadow-md p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              🛠️ Penugasan Praktik Karya 3D
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-serif mt-2">
              Projek Kriya Fashion Daur Ulang Siswa
            </h3>
            <p className="text-xs text-slate-500">
              Pilih salah satu bahan daur ulang (alam atau buatan) untuk dieksekusi menjadi produk fashion fungsional.
            </p>
          </div>

          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            Kelas XI Seni Rupa Fase F
          </span>
        </div>

        {/* 3 Material Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {materialOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedMaterial(opt.id as any)}
              className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                selectedMaterial === opt.id
                  ? 'bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100/70'
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white text-indigo-800 border border-indigo-100">
                {opt.badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-2">{opt.title}</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{opt.desc}</p>
            </button>
          ))}
        </div>

        {/* Detail Selected Material Guide */}
        {(() => {
          const currentMat = materialOptions.find((m) => m.id === selectedMaterial)!;

          return (
            <div className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/60">
                <div className="space-y-0.5">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Scissors className="w-4 h-4 text-indigo-600" />
                    Panduan Praktik: {currentMat.title}
                  </h4>
                  <p className="text-xs text-slate-600">{currentMat.desc}</p>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-lg self-start sm:self-auto">
                  Rekomendasi Produk: {currentMat.products}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                  Tahapan Pengerjaan di Rumah / Studio Seni:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentMat.steps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tip Box */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900">
                  <strong className="font-bold">Tips Pengrajin: </strong>
                  {currentMat.tip}
                </div>
              </div>
            </div>
          );
        })()}

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <a
            href={canvaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800"
          >
            <span>Lihat visualisasi slide di Canva Site resmi</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-2">
            {onGoToQuiz && (
              <button
                onClick={onGoToQuiz}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
              >
                Uji Pemahaman (Kuis)
              </button>
            )}
            {onGoToLKPD && (
              <button
                onClick={onGoToLKPD}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Isi LKPD Unit 3</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Canva Presentation Modal */}
      {isFullscreenModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col p-4 sm:p-6 animate-fadeIn">
          <div className="flex items-center justify-between text-white pb-3">
            <div className="flex items-center gap-3">
              <Presentation className="w-5 h-5 text-blue-400" />
              <div>
                <h3 className="text-sm sm:text-base font-bold">
                  Berkarya Seni Rupa Tiga Dimensi — Presentasi Materi
                </h3>
                <p className="text-xs text-slate-400">
                  Literasi SMANEB Canva Site Live Preview
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={canvaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
              >
                <span>Buka di Tab Asli</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setIsFullscreenModal(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Tutup Layar Penuh"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 relative">
            <iframe
              src={canvaUrl}
              title="Berkarya Seni Rupa Tiga Dimensi Presentasi Materi - Fullscreen"
              allow="fullscreen"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default BerkaryaSeniRupa3Dimensi;
