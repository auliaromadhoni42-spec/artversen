import React, { useState } from 'react';
import {
  Sparkles,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Maximize2,
  Minimize2,
  Package,
  Layers,
  Palette,
  Video,
  FileText,
  Lightbulb,
  Brush,
  ArrowRight,
  ShieldCheck,
  Award,
  Film,
  Sun,
  Camera,
  Copy,
  Check
} from 'lucide-react';
import { User } from '../types';

interface MerancangDesainProdukKriyaViewProps {
  user: User;
  onGoToLKPD: () => void;
  onGoToQuiz: () => void;
}

export const MerancangDesainProdukKriyaView: React.FC<MerancangDesainProdukKriyaViewProps> = ({
  user,
  onGoToLKPD,
  onGoToQuiz
}) => {
  const [isFullscreenCanva, setIsFullscreenCanva] = useState(false);
  const [activeTab, setActiveTab] = useState<'hakikat' | 'logo' | 'langkah' | 'konsep' | 'video' | 'simulator'>('hakikat');

  // Simulator state: Desain Brief Kriya Ramah Lingkungan (Sinergi Unit 1 & Unit 5)
  const [simKriyaType, setSimKriyaType] = useState('kayu_upcycle');
  const [simLogoType, setSimLogoType] = useState('kombinasi');
  const [simColorPalette, setSimColorPalette] = useState('eco_green');
  const [simTargetMarket, setSimTargetMarket] = useState('pemuda_urban');
  const [copiedBrief, setCopiedBrief] = useState(false);

  const canvaUrl = 'https://literasi-smaneb.my.canva.site/presentasi-merancang-desain-produk-kriya-industri';

  const kriyaOptions: Record<string, { label: string; material: string; ecoImpact: string; example: string }> = {
    kayu_upcycle: {
      label: 'Kriya Kayu & Palet Upcycling',
      material: 'Limbah kayu palet, serbuk gergaji padat, dan potongan kayu mebel afkir',
      ecoImpact: 'Mengurangi pembakaran limbah kayu dan memitigasi deforestasi hutan (Sinergi Unit 1)',
      example: 'Lampu meja estetik, rak organizer minimalis, speaker pasif akustik'
    },
    serat_alam: {
      label: 'Kriya Anyaman Bambu & Serat Alam',
      material: 'Serat pelepah pisang, eceng gondok kering, mendong, dan bambu lokal',
      ecoImpact: 'Memanfaatkan biomassa gulma air yang menyumbat sungai dan material mudah terurai alami (Biodegradable)',
      example: 'Tas anyaman etnik modern, placemat meja kafe, kap lampu gantung'
    },
    tekstil_perca: {
      label: 'Kriya Tekstil Perca & Pewarna Alami',
      material: 'Kain perca sisa konveksi, kain tenun sisa, pewarna ekstrak daun & kulit manggis',
      ecoImpact: 'Mengurangi limbah tekstil di TPA dan mencegah polusi limbah zat pewarna kimia sintetis di sungai',
      example: 'Pouch serbaguna teknik sashiko/patchwork, celemek barista daur ulang, sarung bantal estetik'
    },
    logam_kaca: {
      label: 'Kriya Daur Ulang Kaleng & Botol Kaca',
      material: 'Kaleng biskuit/susu bekas, pecahan botol kaca bening/amber, kawat galvanis daur ulang',
      ecoImpact: 'Siklus daur ulang material anorganik sulit terurai menjadi benda seni fungsi bernilai tinggi',
      example: 'Lentera lilin aromaterapi kaca patri, tempat alat tulis industrial, vas bunga kontemporer'
    }
  };

  const logoTypes: Record<string, { name: string; desc: string; sample: string }> = {
    wordmark: {
      name: 'Wordmark (Logotype)',
      desc: 'Logo berbasis teks nama brand lengkap dengan perlakuan tipografi khas dan mudah dibaca.',
      sample: 'Contoh: Google, Coca-Cola, Braun'
    },
    monogram: {
      name: 'Monogram (Lettermark)',
      desc: 'Logo berbasis inisial huruf dari brand kriya, ringkas dan berkesan eksklusif/minimalis.',
      sample: 'Contoh: LV (Louis Vuitton), HP, IBM'
    },
    simbol: {
      name: 'Simbol / Ikon Visual',
      desc: 'Menggunakan simbol atau gambar benda yang mewakili filosofi atau produk kriya secara langsung.',
      sample: 'Contoh: Apple, Twitter (burung), Shell'
    },
    abstrak: {
      name: 'Abstrak (Abstract Mark)',
      desc: 'Bentuk geometris atau organis unik tanpa objek nyata, mengekspresikan dinamika dan inovasi.',
      sample: 'Contoh: Nike (swoosh), Adidas, Pepsi'
    },
    emblem: {
      name: 'Emblem (Lambang Klasik)',
      desc: 'Teks dan ikon menyatu di dalam bingkai lencana atau stempel, memberi kesan autentik dan tradisi kriya.',
      sample: 'Contoh: Harley-Davidson, Starbucks, Lambang Komunitas'
    },
    kombinasi: {
      name: 'Kombinasi (Combination Mark)',
      desc: 'Memadukan teks nama brand dan ikon simbol secara berdampingan atau bertumpuk, fleksibel dan sangat kuat.',
      sample: 'Contoh: Lacoste, Burger King, Produk Kriya Industri'
    }
  };

  const colorPalettes: Record<string, { name: string; hex: string[]; feel: string }> = {
    eco_green: {
      name: 'Eco Forest & Foliage',
      hex: ['#1b4332', '#2d6a4f', '#52b788', '#d8f3dc'],
      feel: 'Menyuarakan kelestarian alam, kesegaran lingkungan, dan produk ramah lingkungan berwawasan masa depan (Sinergi Unit 1).'
    },
    earthy_terracotta: {
      name: 'Earthy Terracotta & Wood',
      hex: ['#7f4f24', '#936639', '#a68a64', '#ede0d4'],
      feel: 'Hangat, autentik, mencerminkan material kriya tanah liat, kayu alami, dan kearifan tangan perajin nusantara.'
    },
    minimal_industrial: {
      name: 'Modern Industrial Monochrome',
      hex: ['#212529', '#495057', '#ced4da', '#f8f9fa'],
      feel: 'Elegan, canggih, presisi, mengedepankan kualitas fungsi kriya industri berstandar modern.'
    },
    warm_amber: {
      name: 'Warm Sunset & Clay',
      hex: ['#b23a48', '#d64045', '#e9b44c', '#f5dfbb'],
      feel: 'Kreatif, penuh gairah, ramah konsumen muda, dan memancarkan energi kerajinan tangan yang berjiwa seni.'
    }
  };

  const handleCopyGeneratedBrief = () => {
    const kriya = kriyaOptions[simKriyaType];
    const logo = logoTypes[simLogoType];
    const palette = colorPalettes[simColorPalette];

    const text = `=== DESAIN BRIEF PRODUK KRIYA INDUSTRI & BRANDING LOGO ===
Modul: Seni Rupa Fase F (Sinergi Unit 1: Lingkungan Sekitar & Unit 5: Kriya Industri)
Perancang: ${user.name} (${user.nisn})

1. KATEGORI PRODUK KRIYA RAMAH LINGKUNGAN:
- Kategori: ${kriya.label}
- Material Utama: ${kriya.material}
- Dampak Lingkungan (Sinergi Unit 1): ${kriya.ecoImpact}
- Produk Unggulan: ${kriya.example}

2. IDENTITAS BRAND & LOGO:
- Jenis Logo: ${logo.name}
- Karakter Logo: ${logo.desc}
- Palet Warna: ${palette.name} (${palette.hex.join(', ')})
- Kesan Emosional: ${palette.feel}
- Target Pasar: ${simTargetMarket === 'pemuda_urban' ? 'Generasi Muda & Kaum Urban Peduli Lingkungan' : 'Keluarga Ramah Lingkungan & Penggemar Dekorasi Estetik'}

3. PROSES KREATIF & ALAT PRODUKSI:
- Ideasi: Sketsa awal, Moodboard tekstur material, Brainstorming tim
- Eksekusi Digital: Canva / Adobe Illustrator / AI Logo Generator
- Format Ekspor: Resolusi Tinggi PNG (transparan) & Vector SVG

4. STRATEGI VIDEO PRODUK:
- Tujuan Video: Memperlihatkan keindahan tekstur kriya daur ulang dan membuktikan fungsi pakainya
- Alur Naskah/Storyboard: Masalah limbah sekitar -> Proses perajin mengolah -> Detail produk & logo -> Produk berfungsi di kehidupan nyata
- Pencahayaan (Lighting): Soft natural light dari jendela + rim light untuk menonjolkan tekstur fisik produk`;

    navigator.clipboard.writeText(text);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* HERO BANNER UNIT 5 */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-white p-6 sm:p-10 border border-amber-500/30 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide uppercase">
            <Package className="w-3.5 h-3.5 text-amber-400" />
            Unit 5 • Kurikulum Merdeka Fase F
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white leading-tight">
            Merancang Desain Produk Kriya Industri & Branding Logo
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Mempelajari seni merancang produk kriya industri dan identitas visual (logo branding) yang memadukan kreativitas estetika dengan fungsi pakai. Menghubungkan semangat{' '}
            <strong className="text-amber-300">Seni Berdampak bagi Lingkungan Sekitar (Unit 1)</strong> dengan desain kriya industri berkelanjutan (<em className="italic">eco-friendly upcycling craft</em>), identitas brand profesional, pembuatan logo digital (Canva / Illustrator), penyusunan Desain Brief, dan promosi video produk yang dinamis.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onGoToLKPD}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg hover:shadow-amber-500/25 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Buka LKPD Unit 5
            </button>

            <button
              onClick={onGoToQuiz}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all cursor-pointer backdrop-blur-xs"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              Kuis & Uji Pemahaman
            </button>

            <a
              href={canvaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 font-semibold text-xs border border-amber-500/30 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Buka Modul Canva Asli
            </a>
          </div>
        </div>
      </div>

      {/* EMBED CANVA VIEWER SECTION */}
      <div className={`transition-all duration-300 ${isFullscreenCanva ? 'fixed inset-0 z-50 bg-slate-950 p-4 flex flex-col' : 'relative'}`}>
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden flex flex-col">
          {/* Viewer Toolbar Header */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-700">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold tracking-wide flex items-center gap-2 font-serif">
                <BookOpen className="w-4 h-4 text-amber-400" />
                Literasi Canva SMANEB: Merancang Desain Produk Kriya Industri
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={canvaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Buka Tab Baru
              </a>

              <button
                type="button"
                onClick={() => setIsFullscreenCanva(!isFullscreenCanva)}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-amber-400/30 cursor-pointer"
              >
                {isFullscreenCanva ? (
                  <>
                    <Minimize2 className="w-3.5 h-3.5" /> Keluar Layar Penuh
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5" /> Layar Penuh
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Iframe Container */}
          <div className="relative w-full bg-slate-950" style={{ height: isFullscreenCanva ? 'calc(100vh - 60px)' : '620px' }}>
            <iframe
              src={canvaUrl}
              title="Presentasi Merancang Desain Produk Kriya Industri SMANEB"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Viewer Footer Callout */}
          <div className="px-5 py-3 bg-amber-50/70 border-t border-amber-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-900 gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Gunakan bilah navigasi slide di dalam presentasi Canva untuk menyimak rangkuman visual interaktif.</span>
            </div>
            <span className="font-semibold text-[11px] text-amber-700">Modul Resmi Canva SMAN 1 Bululawang</span>
          </div>
        </div>
      </div>

      {/* DETAILED CHAPTER TABS */}
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
          {[
            { id: 'hakikat', label: '1. Hakikat & Kriya Hijau', icon: Package },
            { id: 'logo', label: '2. Komponen & Jenis Logo', icon: Layers },
            { id: 'langkah', label: '3. Langkah & Alat Digital', icon: Brush },
            { id: 'konsep', label: '4. Konsep & Desain Brief', icon: FileText },
            { id: 'video', label: '5. Video Produk Promosi', icon: Video },
            { id: 'simulator', label: '⭐ Simulator Desain Brief', icon: Sparkles }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: HAKIKAT & SINERGI UNIT 1 & UNIT 5 */}
        {activeTab === 'hakikat' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Bab 1 • Landasan Teoretis</span>
              <h2 className="text-2xl font-black font-serif text-slate-900 mt-1">
                Hakikat Desain Logo Produk Kriya Industri & Sinergi Seni Berdampak Lingkungan
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Perpaduan kreativitas dan fungsi, pentingnya pengenalan merek, dan integrasi dengan material ramah lingkungan Unit 1.
              </p>
            </div>

            {/* Content Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Perpaduan Kreativitas dan Fungsi */}
              <div className="bg-gradient-to-br from-amber-50/60 to-orange-50/40 rounded-2xl p-6 border border-amber-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md">
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  Perpaduan Kreativitas dan Fungsi
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <strong>Desain logo produk kriya industri</strong> adalah proses kreatif pembuatan simbol, tanda, atau ikon visual yang secara eksklusif mewakili identitas, nilai, dan tujuan suatu produk, jenama, atau organisasi.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Logo menggabungkan elemen visual seperti <strong className="text-amber-800">bentuk, warna, dan tipografi</strong> untuk menciptakan identitas merek yang unik, mudah diingat, serta mampu membedakannya dari pesaing di pasar kriya.
                </p>
              </div>

              {/* Card 2: Brand Recognition & Kepercayaan */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl p-6 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-serif">
                  Pengenalan Merek & Kepercayaan Konsumen
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Logo adalah elemen krusial dalam dunia pemasaran karena membantu meningkatkan <strong className="text-slate-900">pengenalan merek (brand recognition)</strong> dan membangun <strong className="text-slate-900">kepercayaan konsumen (consumer trust)</strong>.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Karya kriya buatan tangan yang unggul membutuhkan identitas visual yang meyakinkan agar konsumen yakin terhadap kualitas, ketahanan, dan keautentikan karya tersebut.
                </p>
              </div>
            </div>

            {/* Sinergi Khusus: Hubungan Tema Unit 5 & Unit 1 */}
            <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-lg">
              <div className="relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  Sinergi Kurikulum: Unit 1 Lingkungan Sekitar & Unit 5 Kriya Industri
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-serif text-white">
                  Dari Limbah Lingkungan Menjadi Produk Kriya Bernilai Jual Tinggi
                </h3>
                <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-3xl">
                  Pada <strong>Unit 1</strong>, kita telah belajar menggali potensi limbah sekitar sekolah dan rumah (kayu palet, limbah kain perca, kaleng, botol kaca, bambu, pelepah pisang) untuk dibuat karya seni rupa berdampak positif bagi lingkungan (<em className="italic">upcycling art</em>).
                </p>
                <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-3xl">
                  Pada <strong>Unit 5</strong>, kita melangkah lebih jauh: mentransformasikan produk kriya ramah lingkungan tersebut menjadi <strong>produk kriya industri berorientasi pasar</strong> yang dilengkapi identitas logo profesional (<em className="italic">eco-branding</em>), kemasan terstruktur, dan strategi video promosi sehingga memiliki nilai ekonomis dan apresiasi nyata di masyarakat luas.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: KOMPONEN & JENIS-JENIS LOGO */}
        {activeTab === 'logo' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Bab 2 • Anatomi & Klasifikasi</span>
              <h2 className="text-2xl font-black font-serif text-slate-900 mt-1">
                Fungsi, Komponen Dasar, Jenis Logo & Kriteria Efektif
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Membedah fungsi utama logo, elemen rupa penyusun, 7 jenis logo dalam dunia industri kriya, dan 4 pilar logo unggul.
              </p>
            </div>

            {/* 4 Pilar Kriteria Logo yang Baik */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                4 Kriteria Logo yang Baik & Efektif
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: 'Sederhana (Simple)',
                    desc: 'Bentuk tidak rumit, tidak berlebihan, sehingga mudah dicerna mata dalam hitungan detik.',
                    color: 'from-amber-500 to-orange-500'
                  },
                  {
                    title: 'Mudah Diingat (Memorable)',
                    desc: 'Memiliki ciri khas unik yang langsung menempel kuat di ingatan dan benak konsumen.',
                    color: 'from-emerald-500 to-teal-500'
                  },
                  {
                    title: 'Tahan Lama (Timeless)',
                    desc: 'Tidak lekang oleh waktu dan tidak sekadar ikut-ikutan tren musiman yang cepat usang.',
                    color: 'from-blue-500 to-indigo-500'
                  },
                  {
                    title: 'Serbaguna (Versatile)',
                    desc: 'Dapat diaplikasikan secara optimal di berbagai media: label kain, stempel kayu, sablon, layar ponsel.',
                    color: 'from-purple-500 to-pink-500'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-r ${item.color} text-white font-black text-xs flex items-center justify-center shadow-xs`}>
                      {idx + 1}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 7 Jenis Logo */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-600" />
                7 Jenis Logo Produk dalam Dunia Industri
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    type: 'Wordmark (Logotype)',
                    desc: 'Logo berbasis teks nama lengkap produk dengan gaya tipografi khas dan tegas.',
                    contoh: 'Contoh: Google, Sony, Casio'
                  },
                  {
                    type: 'Monogram (Lettermark)',
                    desc: 'Logo berupa singkatan atau inisial huruf nama brand, ringkas dan berkelas.',
                    contoh: 'Contoh: LV, NASA, HP, CNN'
                  },
                  {
                    type: 'Simbol / Ikon Visual',
                    desc: 'Menggunakan gambar objek yang mudah dikenali mewakili produk atau filosofi.',
                    contoh: 'Contoh: Apple, Twitter (Burung), Target'
                  },
                  {
                    type: 'Abstrak (Abstract)',
                    desc: 'Bentuk geometris konseptual unik yang menyampaikan makna tersirat tanpa objek alamiah.',
                    contoh: 'Contoh: Nike Swoosh, Pepsi, BP'
                  },
                  {
                    type: 'Maskot / Karakter',
                    desc: 'Menampilkan karakter ilustrasi bergambar tokoh atau hewan yang ramah dan ekspresif.',
                    contoh: 'Contoh: KFC (Kolonel Sanders), Pringles, Michelin'
                  },
                  {
                    type: 'Emblem (Lambang)',
                    desc: 'Teks dan gambar menyatu di dalam sebuah bingkai lencana, cap stempel, atau perisai klasik.',
                    contoh: 'Contoh: Starbucks, Harley-Davidson, Persebaya'
                  },
                  {
                    type: 'Kombinasi (Combination)',
                    desc: 'Memadukan teks nama merek dan simbol ikon secara harmonis berdampingan. Sangat fleksibel.',
                    contoh: 'Contoh: Burger King, Adidas, Lacoste, Kriya SMANEB'
                  }
                ].map((l, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 transition-all shadow-xs space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      Tipe {i + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 font-serif">{l.type}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{l.desc}</p>
                    <div className="pt-1 text-[11px] text-slate-400 italic">{l.contoh}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LANGKAH PEMBUATAN & ALAT DIGITAL */}
        {activeTab === 'langkah' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Bab 3 • Prosedur & Aplikasi</span>
              <h2 className="text-2xl font-black font-serif text-slate-900 mt-1">
                Panduan Langkah demi Langkah Merancang Logo & Pilihan Alat Digital
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Dari penentuan persona brand, riset kompetitor, sketsa tangan, hingga eksekusi digital dan ekspor resolusi tinggi.
              </p>
            </div>

            {/* Stepper 6 Langkah */}
            <div className="space-y-4">
              {[
                {
                  step: 1,
                  title: 'Tentukan Identitas Brand',
                  desc: 'Pahami persona brand, visi, misi, dan target audiens Anda untuk menentukan gaya logo yang pas (apakah modern, tradisional, vintage, atau ceria).'
                },
                {
                  step: 2,
                  title: 'Riset dan Cari Inspirasi',
                  desc: 'Lihat logo kompetitor dan produk sejenis di pasar untuk memastikan desain Anda orisinal, unik, dan tampil menonjol dari yang lain.'
                },
                {
                  step: 3,
                  title: 'Sketsa Ide di Atas Kertas',
                  desc: 'Gambar ide-ide dasar secara manual di buku sketsa dengan pensil untuk memvisualisasikan konsep awal secara bebas dan cepat tanpa batasan software.'
                },
                {
                  step: 4,
                  title: 'Pilih Elemen Desain (Warna & Font)',
                  desc: 'Pilih warna yang membangkitkan emosi yang tepat (psikologi warna) serta jenis huruf (tipografi) yang mudah dibaca dan selaras dengan citra produk kriya.'
                },
                {
                  step: 5,
                  title: 'Buat Desain Digital',
                  desc: 'Pindahkan sketsa terbaik ke perangkat lunak digital (Canva, Illustrator, CorelDraw, atau AI Generator) untuk merapikan garis vektor dan pewarnaan presisi.'
                },
                {
                  step: 6,
                  title: 'Sempurnakan dan Ekspor',
                  desc: 'Uji logo pada berbagai mockup media (cetak label, sablon kemasan, layar ponsel) dan simpan dalam format resolusi tinggi tanpa latar belakang (PNG transparan / SVG vektor).'
                }
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-8 h-8 rounded-xl bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                    {s.step}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900">{s.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Alat Digital */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Brush className="w-4 h-4 text-amber-600" />
                Pilihan Perangkat Lunak Desain Digital Logo
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 space-y-2">
                  <h4 className="text-sm font-bold text-teal-900">Canva & Adobe Express</h4>
                  <p className="text-xs text-teal-800 leading-relaxed">
                    Sangat ramah bagi pemula. Menyediakan ribuan template logo, elemen grafis kriya, tipografi beragam, dan pengeditan cepat berbasis browser.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 space-y-2">
                  <h4 className="text-sm font-bold text-amber-900">Adobe Illustrator & CorelDraw</h4>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    Standar industri profesional. Menghasilkan grafis vektor murni berbasis node dan kurva Bezier yang dapat diperbesar tanpa pecah sedikit pun.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 space-y-2">
                  <h4 className="text-sm font-bold text-indigo-900">AI Logo Generator</h4>
                  <p className="text-xs text-indigo-800 leading-relaxed">
                    Aplikasi instan seperti Looka, Wix Logo Maker, atau Logopony untuk melakukan brainstorming konsep awal berbasis kecerdasan buatan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: KONSEP, IDEASI & DESAIN BRIEF */}
        {activeTab === 'konsep' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Bab 4 • Konsep & Dokumen Pemandu</span>
              <h2 className="text-2xl font-black font-serif text-slate-900 mt-1">
                Metode Konsep, Ideasi & Penyusunan Desain Brief
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Sketsa, Mood Board, Brainstorming, dan peran vital Desain Brief untuk memandu pembuatan karya kriya industri.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Sketsa */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  <Brush className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-serif">Sketsa (Sketching)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Membuat sketsa awal adalah langkah penting dalam merancang produk, membantu merumuskan ide visual secara langsung dan cepat di atas kertas sebelum masuk ke komputer.
                </p>
              </div>

              {/* Mood Board */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold">
                  <Palette className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-serif">Mood Board</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mengumpulkan inspirasi lewat mood board memungkinkan desainer untuk mengonsepkan berbagai elemen warna, tekstur bahan, dan gaya yang relevan dengan produk yang dirancang.
                </p>
              </div>

              {/* Brainstorming */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-serif">Brainstorming</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Brainstorming ide kreatif mengajak tim untuk berpikir bebas, menghasilkan variasi ide inovatif yang dapat dieksplorasi lebih lanjut dalam proses desain produk kriya.
                </p>
              </div>
            </div>

            {/* DESAIN BRIEF DETAIL */}
            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <FileText className="w-5 h-5 text-amber-700" />
                Apa Itu Desain Brief?
              </div>
              <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
                <strong>Desain Brief</strong> adalah dokumen acuan tertulis yang memuat gambaran menyeluruh tentang proyek desain. Untuk memudahkan dalam pembuatan desain, desainer menyusun desain brief yang merangkum:
              </p>
              <ul className="text-xs text-amber-950 space-y-1.5 list-disc pl-5">
                <li><strong>Profil & Nilai Produk</strong>: Jenis kriya, bahan dasar ramah lingkungan (Sinergi Unit 1), dan keunggulan fungsi.</li>
                <li><strong>Target Audiens</strong>: Siapa konsumen yang disasar (usia, gaya hidup, daya beli).</li>
                <li><strong>Pesan Kunci Brand</strong>: Kesan yang ingin dimunculkan (ramah lingkungan, mewah, etnik, praktis).</li>
                <li><strong>Spesifikasi Teknis & Format</strong>: Ukuran kemasan, warna identitas, dan format file akhir (PNG/SVG/MP4).</li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 5: VIDEO PRODUK PROMOSI */}
        {activeTab === 'video' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Bab 5 • Promosi Visual</span>
              <h2 className="text-2xl font-black font-serif text-slate-900 mt-1">
                Visualisasi Promosi Melalui Video Produk Kriya yang Menarik
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Mengapa video produk sangat penting dalam era digital dan 3 pilar langkah produksi video kriya.
              </p>
            </div>

            {/* Mengapa Video Produk Penting */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                  <Film className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-purple-950 font-serif">1. Menarik Perhatian Konsumen</h3>
                <p className="text-xs sm:text-sm text-purple-900/80 leading-relaxed">
                  Video dapat menarik perhatian calon pembeli dengan cara menampilkan produk secara dinamis dan bergerak, menjadikannya jauh lebih mudah diingat dibanding gambar diam.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-emerald-950 font-serif">2. Menjelaskan Keunggulan Produk</h3>
                <p className="text-xs sm:text-sm text-emerald-900/80 leading-relaxed">
                  Dengan video, produk kriya dapat dijelaskan secara visual, memperlihatkan fitur pakai, detail tekstur bahan daur ulang, dan cara penggunaan yang sulit disampaikan melalui foto statis.
                </p>
              </div>
            </div>

            {/* 3 Langkah Membuat Video Produk */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Video className="w-4 h-4 text-amber-600" />
                3 Langkah Utama Membuat Video Produk Kriya
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" /> Tahap 1
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-serif">Tentukan Tujuan</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tentukan tujuan pembuatan video untuk menarik perhatian dan menjelaskan produk secara efektif kepada audiens sasaran yang tepat.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                    <FileText className="w-4 h-4" /> Tahap 2
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-serif">Naskah & Storyboard</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Siapkan naskah narasi dan storyboard singkat agar alur video terstruktur dengan jelas, memudahkan proses pengambilan gambar yang fokus dan efisien.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                    <Sun className="w-4 h-4" /> Tahap 3
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-serif">Pencahayaan (Lighting)</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Gunakan pencahayaan yang baik untuk menonjolkan detail produk kriya, menciptakan suasana estetik yang memikat perhatian penonton saat menonton video.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: INTERACTIVE SIMULATOR (SINERGI UNIT 1 & UNIT 5) */}
        {activeTab === 'simulator' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Eksplorasi Praktis</span>
              <h2 className="text-2xl font-black font-serif text-slate-900 mt-1 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-amber-500" />
                Simulator Desain Brief Kriya Ramah Lingkungan
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Kombinasikan kategori kriya limbah daur ulang (Unit 1), jenis logo, palet warna branding, dan target audiens untuk merumuskan dokumen Desain Brief instan!
              </p>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* 1. Kategori Kriya (Unit 1 Upcycling) */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">1. Kategori Kriya Ramah Lingkungan:</label>
                <select
                  value={simKriyaType}
                  onChange={(e) => setSimKriyaType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="kayu_upcycle">🪵 Kriya Kayu & Palet Upcycling</option>
                  <option value="serat_alam">🌿 Anyaman Bambu & Serat Alam</option>
                  <option value="tekstil_perca">🧵 Kain Perca & Pewarna Alami</option>
                  <option value="logam_kaca">🫙 Daur Ulang Kaleng & Kaca</option>
                </select>
              </div>

              {/* 2. Jenis Logo */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">2. Jenis Logo Branding:</label>
                <select
                  value={simLogoType}
                  onChange={(e) => setSimLogoType(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="kombinasi">✨ Kombinasi (Teks & Simbol)</option>
                  <option value="wordmark">📝 Wordmark (Logotype)</option>
                  <option value="monogram">🔤 Monogram (Lettermark Inisial)</option>
                  <option value="simbol">🎯 Simbol / Ikon Visual</option>
                  <option value="emblem">🛡️ Emblem (Lambang Stempel)</option>
                  <option value="abstrak">🌀 Abstrak (Bentuk Geometris)</option>
                </select>
              </div>

              {/* 3. Palet Warna Branding */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">3. Palet Warna Identitas:</label>
                <select
                  value={simColorPalette}
                  onChange={(e) => setSimColorPalette(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="eco_green">🌲 Eco Forest (Hijau Lestari)</option>
                  <option value="earthy_terracotta">🍂 Earthy Terracotta (Cokelat Alami)</option>
                  <option value="minimal_industrial">⚙️ Industrial Modern (Monokrom)</option>
                  <option value="warm_amber">🌅 Warm Sunset (Kuning & Terakota)</option>
                </select>
              </div>

              {/* 4. Target Pasar */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-700">4. Target Konsumen:</label>
                <select
                  value={simTargetMarket}
                  onChange={(e) => setSimTargetMarket(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="pemuda_urban">🏙️ Pemuda & Kaum Urban Peduli Lingkungan</option>
                  <option value="keluarga_estetik">🏡 Keluarga & Pecinta Dekorasi Rumah</option>
                </select>
              </div>
            </div>

            {/* Generated Brief Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50/70 via-white to-orange-50/50 border-2 border-dashed border-amber-300 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 font-extrabold text-[11px] uppercase tracking-wider">
                    <FileText className="w-3.5 h-3.5" /> Hasil Rumusan Desain Brief
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-serif mt-1">
                    {kriyaOptions[simKriyaType].label} — Jenama Eco-Kriya
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={handleCopyGeneratedBrief}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
                >
                  {copiedBrief ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-200" /> Tersalin ke Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Salin Desain Brief
                    </>
                  )}
                </button>
              </div>

              {/* Detail Ringkasan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
                    🌿 Material & Dampak Lingkungan (Unit 1):
                  </span>
                  <p className="text-slate-800 font-semibold">{kriyaOptions[simKriyaType].material}</p>
                  <p className="text-slate-600 text-[11px]">{kriyaOptions[simKriyaType].ecoImpact}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
                    🎨 Konsep Logo & Karakter Tipografi (Unit 5):
                  </span>
                  <p className="text-slate-800 font-semibold">{logoTypes[simLogoType].name}</p>
                  <p className="text-slate-600 text-[11px]">{logoTypes[simLogoType].desc}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
                    🎭 Palet Warna & Psikologi:
                  </span>
                  <div className="flex items-center gap-1.5 py-1">
                    {colorPalettes[simColorPalette].hex.map((hex, i) => (
                      <span
                        key={i}
                        className="w-5 h-5 rounded-md border border-slate-300 shadow-2xs"
                        style={{ backgroundColor: hex }}
                        title={hex}
                      />
                    ))}
                    <span className="text-[11px] font-bold text-slate-700 ml-1">
                      {colorPalettes[simColorPalette].name}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{colorPalettes[simColorPalette].feel}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5">
                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
                    🎬 Alur Storyboard Video Promosi:
                  </span>
                  <p className="text-slate-800 font-semibold">
                    Shoot 1: Potret limbah awal &rarr; Shoot 2: Proses kreasi perajin &rarr; Shoot 3: Logo & Hasil Jadi
                  </p>
                  <p className="text-slate-600 text-[11px]">
                    Tata cahaya natural untuk menonjolkan serat bahan dan label logo yang terpasang rapi pada produk kriya.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* QUICK FOOTER NAVIGATION */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-base font-bold font-serif text-white">
            Siap Mengerjakan Lembar Kerja Peserta Didik (LKPD) Unit 5?
          </h3>
          <p className="text-xs text-slate-400">
            Tuangkan analisis identitas brand, rancangan logo kriya ramah lingkungan, dan konsep video promosi ke dalam LKPD resmi.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onGoToLKPD}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-black text-xs transition-all shadow-md cursor-pointer"
          >
            Buka LKPD 1, 2 & 3 Unit 5
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
