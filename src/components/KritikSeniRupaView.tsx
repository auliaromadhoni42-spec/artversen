import React, { useState } from 'react';
import {
  ExternalLink,
  Presentation,
  Maximize2,
  Minimize2,
  BookOpen,
  Sparkles,
  Layers,
  Award,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Lightbulb,
  FileText,
  Eye,
  Info,
  Scale,
  Compass,
  MessageSquare,
  GraduationCap,
  Newspaper,
  Flame,
  Search
} from 'lucide-react';
import { User } from '../types';

interface KritikSeniRupaViewProps {
  user?: User;
  onGoToLKPD?: () => void;
  onGoToQuiz?: () => void;
}

export const KritikSeniRupaView: React.FC<KritikSeniRupaViewProps> = ({
  onGoToLKPD,
  onGoToQuiz
}) => {
  // Tab to switch between the two Canva resources
  const [activeResource, setActiveResource] = useState<'bahan-ajar' | 'kritik-seni-rupa'>('bahan-ajar');
  const [showLiveEmbed, setShowLiveEmbed] = useState<boolean>(true);
  const [isFullscreenModal, setIsFullscreenModal] = useState<boolean>(false);
  const [activeStepTab, setActiveStepTab] = useState<number>(0);

  const resources = {
    'bahan-ajar': {
      id: 'bahan-ajar',
      title: 'Bahan Ajar Kritik Seni Rupa',
      badge: 'Bahan Ajar Komprehensif',
      url: 'https://literasi-smaneb.my.canva.site/kritik-senirupa',
      desc: 'Bahan ajar mendalam mencakup pendekatan formalistik, ekspresionistik, instrumentalistik, konteks historis lukisan Raden Saleh, fungsi dua mata panah kritik, kapasitas reasoning manusia, hingga persyaratan keilmuan seorang kritikus seni.'
    },
    'kritik-seni-rupa': {
      id: 'kritik-seni-rupa',
      title: 'Kritik Seni Rupa',
      badge: 'Presentasi Interaktif Kelas',
      url: 'https://literasi-smaneb.my.canva.site/kritik-seni-rupa',
      desc: 'Slide presentasi interaktif kelas mencakup pemantik diskusi, 3 tujuan pembelajaran, pengertian kritik seni rupa, 4 jenis kritik (Jurnalistik, Populer, Pedagogik, Ilmiah), dan 4 tahapan prosedur penulisan kritik.'
    }
  };

  const currentResource = resources[activeResource];

  // 4 Prosedur Penulisan Kritik
  const fourStages = [
    {
      step: 1,
      title: 'Deskripsi',
      subtitle: 'Mencatat & Menemukan Data Kasat Mata',
      icon: Eye,
      color: 'blue',
      desc: 'Tahap pertama adalah deskripsi yang berupa menemukan, mencatat, dan mendeskripsikan segala sesuatu yang dilihat secara apa adanya tanpa berusaha melakukan analisis atau mengambil kesimpulan.',
      points: [
        'Mencatat data fisik karya: judul lukisan, seniman pencipta, tahun pembuatan, medium cat/bidang kanvas, dan ukuran karya.',
        'Mendeskripsikan seluruh objek kasat mata secara objektif (misal: sosok manusia, hewan, perahu, pohon, langit, atau bentuk abstrak).',
        'Seorang pengkritik wajib memahami istilah-istilah teknis seni rupa agar tidak kesulitan mendeskripsikan fenomena visual.',
        'Tidak boleh memasukkan opini atau penafsiran pribadi pada tahapan ini.'
      ],
      example: 'Contoh: "Lukisan ini menampilkan sebuah perahu kayu dengan lima orang nelayan di tengah laut berombak berlatar langit jingga temaram."'
    },
    {
      step: 2,
      title: 'Analisis Formal',
      subtitle: 'Membedah Struktur Unsur & Prinsip Rupa',
      icon: Layers,
      color: 'indigo',
      desc: 'Tahapan untuk menelusuri sebuah karya seni berdasarkan struktur formal atau unsur-unsur pembentuknya dan prinsip-prinsip penataannya dalam karya seni.',
      points: [
        'Membedah organisasi unsur seni rupa: garis (tegas, melengkung, diagonal), bidang, bentuk, warna (komplementer, monokromatik), tekstur, dan ruang.',
        'Mengkaji penerapan prinsip desain: keseimbangan (simetris/asimetris), kesatuan (unity), irama (rhythm), proporsi, dan pusat perhatian (focal point).',
        'Melibatkan pemahaman struktur, pola, dan relasi antar elemen secara cermat dan sistematis.',
        'Menjelaskan mengapa seniman menempatkan elemen tertentu di posisi tertentu dalam bidang karya.'
      ],
      example: 'Contoh: "Kontras warna kuning menyala pada layar perahu di tengah dominasi biru gelap laut menciptakan focal point yang memikat mata pertama kali."'
    },
    {
      step: 3,
      title: 'Interpretasi',
      subtitle: 'Menafsirkan Makna, Tema & Simbol',
      icon: Compass,
      color: 'amber',
      desc: 'Tahapan penafsiran makna di balik suatu informasi atau karya, meliputi tema yang digarap, simbol yang dihadirkan, serta persoalan yang dikedepankan seniman.',
      points: [
        'Menggali pesan tersirat dan filosofi batin yang ingin dikomunikasikan oleh pencipta karya.',
        'Sangat terbuka sifatnya, dipengaruhi oleh sudut pandang, kepekaan rasa, serta keluasan wawasan pengkritik.',
        'Menelaah metafora visual dan simbolik (misal ombak besar melambangkan ujian perjuangan hidup).',
        'Semakin luas wawasan kritikus, biasanya semakin kaya dan tajam interpretasi karya yang dikritiknya.'
      ],
      example: 'Contoh: "Perahu nelayan yang menerjang ombak ganas ditafsirkan sebagai simbol kegigihan rakyat kecil dalam mengarungi badai kehidupan ekonomi."'
    },
    {
      step: 4,
      title: 'Evaluasi / Penilaian',
      subtitle: 'Menentukan Kualitas Estetis & Relevansi',
      icon: Scale,
      color: 'purple',
      desc: 'Tahapan ciri khas utama kritik karya seni untuk menentukan kualitas suatu karya seni bila dibandingkan dengan karya lain yang sejenis secara objektif dan berbobot.',
      points: [
        'Mengkaitkan sebanyak-banyaknya karya yang dinilai dengan karya lain yang sejenis untuk perbandingan komparatif.',
        'Menetapkan sejauh mana karya tersebut "menyimpang" atau menghadirkan kebaruan orisinal dari karya-karya sebelumnya.',
        'Menelaah keberhasilan karya dari segi fungsi, tujuan penciptaan, dan konteks sosial budaya yang melatarbelakanginya.',
        'Memberikan penilaian evaluatif yang santun, adil, rasional, dan membangun perkembangan karya seniman.'
      ],
      example: 'Contoh: "Karya ini berhasil membangun intensitas dramatik yang kuat dengan kematangan teknik sapuan kuas berkarakter, menjadikannya karya kriya/lukis yang bernilai estetis tinggi."'
    }
  ];

  // 4 Jenis Kritik Seni Rupa (dari slide Kritik Seni Rupa)
  const criticTypes = [
    {
      id: 'jurnalistik',
      name: 'Kritik Jurnalistik',
      icon: Newspaper,
      badge: 'Media Massa & Publikasi',
      desc: 'Penilaian terhadap kualitas karya seni untuk konsumsi masyarakat pembaca umum di media massa (koran, majalah, situs berita).',
      objective: 'Menyajikan informasi ulasan peristiwa pameran secara cepat, deskriptif, akurat, seimbang, dan dapat dipercaya publik.',
      style: 'Gaya bahasa populer yang lugas, mudah dipahami khalayak awam, dan tidak sarat istilah teknis rumit.'
    },
    {
      id: 'populer',
      name: 'Kritik Populer',
      icon: MessageSquare,
      badge: 'Masyarakat & Media Digital',
      desc: 'Bentuk evaluasi atau ulasan yang sering dilakukan oleh masyarakat umum, penikmat seni, atau komunitas di media sosial dan forum daring.',
      objective: 'Memberikan pandangan beragam dari perspektif publik umum, mulai dari tanggapan positif hingga masukan kritik santai.',
      style: 'Bahasa santai, komunikatif, bersifat impresif, dan mencerminkan selera estetik masyarakat luas.'
    },
    {
      id: 'pedagogik',
      name: 'Kritik Pedagogik',
      icon: GraduationCap,
      badge: 'Dunia Pendidikan & Sekolah',
      desc: 'Evaluasi dalam lingkungan pembelajaran pendidikan seni rupa di sekolah untuk membantu perkembangan bakat dan pemahaman siswa.',
      objective: 'Meningkatkan mutu pembelajaran, melatih keterampilan teknis, serta membangun rasa percaya diri siswa agar lebih matang dalam berkarya.',
      style: 'Bahasa suportif, memotivasi, mengoreksi kekurangan secara konstruktif, dan memberikan arahan perbaikan nyata.'
    },
    {
      id: 'ilmiah',
      name: 'Kritik Ilmiah (Akademik)',
      icon: Flame,
      badge: 'Kajian Ilmiah & Metodologis',
      desc: 'Evaluasi mendalam berbasis metodologi penelitian ilmiah, analisis data struktural, dan kajian teori seni oleh akademisi atau pakar seni.',
      objective: 'Menguji validitas estetis karya, memperkokoh teori seni, dan menyumbang wawasan baru dalam perkembangan keilmuan seni rupa.',
      style: 'Gaya bahasa akademik formal, menggunakan rujukan teori baku, analisis komparatif mendalam, dan bersifat objektif ilmiah.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white p-6 sm:p-8 shadow-xl border border-indigo-900/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Materi Unit 2 • Seni Budaya Kelas XI Fase F
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif text-white tracking-tight">
              Kritik Seni Rupa
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Dua sumber ajar digital resmi Canva: <strong>Bahan Ajar Kritik Seni Rupa</strong> (kajian mendalam pendekatan & teori) 
              dan <strong>Kritik Seni Rupa</strong> (slide interaktif konsep, 4 jenis kritik, & prosedur penulisan).
            </p>

            {/* Sub-resource switcher pills right in hero */}
            <div className="pt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setActiveResource('bahan-ajar')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeResource === 'bahan-ajar'
                    ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400/40'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>1. Bahan Ajar Kritik Seni Rupa</span>
              </button>

              <button
                onClick={() => setActiveResource('kritik-seni-rupa')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeResource === 'kritik-seni-rupa'
                    ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-400/40'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Presentation className="w-3.5 h-3.5" />
                <span>2. Kritik Seni Rupa (Presentasi)</span>
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <a
              href={currentResource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-950/50 transition-all cursor-pointer group"
            >
              <ExternalLink className="w-4 h-4 text-blue-200 group-hover:scale-110 transition-transform" />
              <span>Buka di Canva Site Resmi</span>
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

      {/* Resource Selector & Information Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
              Pilihan Bahan Materi Canva Unit 2
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 font-serif mt-1">
              {currentResource.title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tautan: <a href={currentResource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-mono">{currentResource.url}</a>
            </p>
          </div>

          {/* Switcher Buttons */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveResource('bahan-ajar')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeResource === 'bahan-ajar'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bahan Ajar Kritik Seni Rupa
            </button>
            <button
              onClick={() => setActiveResource('kritik-seni-rupa')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeResource === 'kritik-seni-rupa'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kritik Seni Rupa
            </button>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {currentResource.desc}
        </p>
      </div>

      {/* Embedded Canva Iframe Viewer */}
      {showLiveEmbed && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Presentation className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-serif">
                  Tampilan Langsung Canva: {currentResource.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {currentResource.url}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={currentResource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <span>Buka di Tab Baru</span>
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
              key={currentResource.url}
              src={currentResource.url}
              title={currentResource.title}
              allow="fullscreen"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 px-1">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-500" />
              Gunakan kontrol di dalam presentasi Canva untuk menggeser slide, membaca ulasan, dan mencermati visualisasi materi.
            </span>
            <span className="text-slate-400">Literasi SMANEB Canva Site</span>
          </div>
        </div>
      )}

      {/* 4 PROSEDUR PENULISAN KRITIK (Interaktif) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              📐 Prosedur Baku Penulisan Kritik
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-serif mt-2">
              4 Tahapan Prosedur Penulisan Kritik Seni Rupa
            </h3>
            <p className="text-xs text-slate-500">
              Alur metodologis menyusun kritik seni rupa secara objektif, ilmiah, dan berbobot: Deskripsi, Analisis Formal, Interpretasi, dan Evaluasi.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
            {fourStages.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => setActiveStepTab(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeStepTab === idx
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tahap {s.step}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Stage Detail Card */}
        {(() => {
          const s = fourStages[activeStepTab];
          const Icon = s.icon;
          return (
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-600">
                    Tahap {s.step} dari 4 Tahapan Kritik
                  </span>
                  <h4 className="text-xl font-black text-slate-900 font-serif mt-0.5">
                    {s.title}: {s.subtitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>

              {/* Bullet Points */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Karakteristik & Langkah Teknis:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {s.points.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-medium leading-relaxed flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example Box */}
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/70 text-xs text-blue-950 flex items-start gap-3">
                <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-bold">Ilustrasi Penerapan pada Karya: </strong>
                  {s.example}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* 4 JENIS KRITIK SENI RUPA (dari slide Kritik Seni Rupa) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
            Klasifikasi Ranah Kritik
          </span>
          <h3 className="text-xl font-black text-slate-900 font-serif mt-1.5">
            4 Jenis Kritik Seni Rupa
          </h3>
          <p className="text-xs text-slate-500">
            Sebagaimana diuraikan dalam materi presentasi <em>Kritik Seni Rupa</em>, kritik dikelompokkan berdasarkan tujuan, audiens, dan konteks penyajiannya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criticTypes.map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.id}
                className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-blue-300 hover:shadow-xs transition-all space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{c.name}</h4>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                    {c.badge}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>

                <div className="space-y-1 pt-1 text-[11px] text-slate-500 border-t border-slate-200/60">
                  <div>
                    <strong className="text-slate-700">Tujuan:</strong> {c.objective}
                  </div>
                  <div>
                    <strong className="text-slate-700">Gaya Bahasa:</strong> {c.style}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* KAJIAN KHUSUS BAHAN AJAR (Pendekatan, Fungsi Dua Mata Panah, & Syarat Kritikus) */}
      <div className="bg-white rounded-3xl border-2 border-indigo-200/80 shadow-md p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            📚 Telaah Khusus Bahan Ajar
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-serif mt-2">
            Pendekatan Kritik, Fungsi Strategis, & Sosok Kritikus Seni
          </h3>
          <p className="text-xs text-slate-500">
            Rangkuman esensial dari naskah <em>Bahan Ajar Kritik Seni Rupa</em> mengenai landasan keilmuan dan komunikasi estetik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: 4 Pendekatan */}
          <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">4 Pendekatan Kritik</h4>
            <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <li>• <strong>Formalistik</strong>: Menilai kualitas formal visual murni (garis, warna, komposisi).</li>
              <li>• <strong>Ekspresionistik</strong>: Menilai luapan emosi, suasana batin, dan orisinalitas jiwa seniman.</li>
              <li>• <strong>Instrumentalistik</strong>: Menilai karya sebagai instrumen pesan moral, sosial, atau politik.</li>
              <li>• <strong>Kontekstual</strong>: Menelaah karya dalam konteks historis sosial (seperti lukisan Raden Saleh <em>Penangkapan Pangeran Diponegoro</em>).</li>
            </ul>
          </div>

          {/* Card 2: Fungsi Dua Mata Panah */}
          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <Scale className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Fungsi "Dua Mata Panah"</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kritik seni menjembatani persepsi estetik antara seniman dan penikmat:
            </p>
            <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <li>• <strong>Bagi Seniman</strong>: Mendeteksi kelemahan, mengupas kedalaman, dan menjadi umpan-balik reflektif.</li>
              <li>• <strong>Bagi Publik Seni</strong>: Menjadi tali penghubung pemahaman estetik dan membedah makna tersirat.</li>
            </ul>
          </div>

          {/* Card 3: Syarat Kritikus Seni */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Kualifikasi Kritikus Seni</h4>
            <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <li>• Memiliki ketajaman sensibilitas indera dan kapasitas <em>reasoning & creative</em>.</li>
              <li>• Menguasai sejarah seni rupa (Western Art & Eastern Art) serta teori dan filsafat seni.</li>
              <li>• Memahami medium proses melukis/berkarya dan latar belakang biografi seniman.</li>
              <li>• Menguasai kebahasaan yang efektif, tepat guna, dan komunikatif sesuai tingkat intelektual sasaran audiens.</li>
            </ul>
          </div>
        </div>

        {/* Bottom Call to Action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Materi siap dipraktikkan dalam penulisan apresiasi dan pengerjaan kuis.</span>
          </div>

          <div className="flex items-center gap-2">
            {onGoToQuiz && (
              <button
                onClick={onGoToQuiz}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
              >
                Uji Pemahaman (Kuis Unit 2)
              </button>
            )}
            {onGoToLKPD && (
              <button
                onClick={onGoToLKPD}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Tulis Kritik di LKPD Unit 2</span>
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
                  {currentResource.title} — Pratinjau Layar Penuh
                </h3>
                <p className="text-xs text-slate-400">
                  {currentResource.url}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-white/10 p-1 rounded-xl">
                <button
                  onClick={() => setActiveResource('bahan-ajar')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeResource === 'bahan-ajar' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Bahan Ajar
                </button>
                <button
                  onClick={() => setActiveResource('kritik-seni-rupa')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeResource === 'kritik-seni-rupa' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Kritik Seni Rupa
                </button>
              </div>

              <a
                href={currentResource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
              >
                <span>Buka Tab Asli</span>
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
              key={`fullscreen-${currentResource.url}`}
              src={currentResource.url}
              title={`${currentResource.title} Fullscreen`}
              allow="fullscreen"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default KritikSeniRupaView;
