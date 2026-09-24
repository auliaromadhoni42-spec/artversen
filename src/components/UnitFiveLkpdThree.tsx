import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  CheckCircle2,
  Sparkles,
  Video,
  Sun,
  Save,
  ShieldCheck,
  Award,
  Users,
  Film,
  Camera,
  ThumbsUp
} from 'lucide-react';
import { User, LkpdQuestion } from '../types';

interface UnitFiveLkpdThreeProps {
  user: User;
  levelId: string;
  status: 'locked' | 'unlocked' | 'completed';
  questions: LkpdQuestion[];
  initialAnswers: Record<string, string>;
  onSave: (compiledAnswers: Record<string, string>) => Promise<void>;
  saving: boolean;
}

export const UnitFiveLkpdThree: React.FC<UnitFiveLkpdThreeProps> = ({
  user,
  levelId,
  status,
  questions,
  initialAnswers,
  onSave,
  saving
}) => {
  // Identitas Siswa
  const [identitas, setIdentitas] = useState({
    nama: user.nama || '',
    kelas: user.kelas || '',
    noAbsen: '',
    tanggal: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
  });

  // Bagian 1: Perumusan Tujuan & Naskah/Storyboard Video Produk Kriya
  const [bagianSatu, setBagianSatu] = useState({
    tujuanVideo: '1) Menarik perhatian audiens dalam 3 detik pertama dengan visual sinematik tekstur kriya; 2) Menjelaskan keunggulan fitur pakai lampu meja dari kayu daur ulang; 3) Memperkenalkan identitas logo merek "Lestari Woodcraft".',
    naskahNarasi: '"Dari sisa kayu palet yang terbuang, lahirlah sebuah karya seni fungsional yang menerangi hangatnya sudut rumahmu. Sentuhan alami, ramah lingkungan, dan dibuat dengan penuh ketelitian. Miliki Lestari Woodcraft sekarang!"',
    storyboardAdegan: 'Adegan 1 (0-3s): Close-up tekstur serat kayu alami & debu gergaji yang melayang dramatis; Adegan 2 (3-8s): Proses tangan pengrajin mengamplas & menyalakan saklar lampu; Adegan 3 (8-12s): Kamera berputar memperlihatkan cap logo kayu bakar emboss di badan produk; Adegan 4 (12-15s): Tampilan produk di meja kerja estetik dengan teks call-to-action & akun media sosial.'
  });

  // Bagian 2: Teknik Tata Cahaya & Sudut Pengambilan Video
  const [bagianDua, setBagianDua] = useState({
    pengaturanPencahayaan: 'Menggunakan pencahayaan tiga titik (three-point lighting): Key light lembut bersuhu hangat (warm 3200K) dari arah samping kiri 45° untuk memunculkan guratan serat kayu, fill light reflektor putih di kanan untuk mengurangi bayangan gelap, dan rim light dari belakang agar produk terpisah tajam dari latar belakang.',
    sudutKameraPOV: 'Kombinasi sudut Eye-level untuk memperkenalkan produk secara netral, Macro Close-up untuk menyorot detail presisi sambungan kayu dan cap logo branding, serta Slow Motion Pan 60fps untuk memberikan kesan mewah dan profesional.'
  });

  // Bagian 3: Uji Coba Respon Audiens & Evaluasi Pemasaran Kriya
  const [bagianTiga, setBagianTiga] = useState({
    responAudiens: 'Hasil pengujian ke 5 teman sekelas dan guru seni: 100% audiens menyatakan bahwa video sangat menarik perhatian, alur cerita mudah dipahami, dan logo terlihat jelas serta profesional. Teman sekelas tertarik membeli jika diproduksi massal.',
    evaluasiPenyempurnaan: 'Menambahkan musik latar (backsound) akustik bertempo santai dengan volume proporsional agar suara narasi tetap jernih, serta menyertakan teks takarir (subtitle) otomatis untuk audiens media sosial yang menonton tanpa suara.'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<string | null>(null);

  // Load from local storage or server initial answers
  useEffect(() => {
    const local = localStorage.getItem(`lkpd_unit_5_lkpd3_${user.id}`);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.identitas) setIdentitas(parsed.identitas);
        if (parsed.bagianSatu) setBagianSatu(parsed.bagianSatu);
        if (parsed.bagianDua) setBagianDua(parsed.bagianDua);
        if (parsed.bagianTiga) setBagianTiga(parsed.bagianTiga);
      } catch (e) {
        console.error('Error parsing local LKPD 3 Unit 5:', e);
      }
    } else {
      if (initialAnswers['q-5-7']) {
        setBagianSatu(prev => ({ ...prev, tujuanVideo: initialAnswers['q-5-7'] }));
      }
      if (initialAnswers['q-5-8']) {
        setBagianDua(prev => ({ ...prev, pengaturanPencahayaan: initialAnswers['q-5-8'] }));
      }
      if (initialAnswers['q-5-9']) {
        setBagianTiga(prev => ({ ...prev, responAudiens: initialAnswers['q-5-9'] }));
      }
    }
  }, [user.id, initialAnswers]);

  // Handle Form Submission / Save
  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Compile into backend questions format (q-5-7, q-5-8, q-5-9)
    const compiledAnswers: Record<string, string> = {
      'q-5-7': `[TUJUAN VIDEO PROMOSI]: ${bagianSatu.tujuanVideo}\n[NASKAH NARASI]: ${bagianSatu.naskahNarasi}\n[STORYBOARD ALUR ADEGAN]: ${bagianSatu.storyboardAdegan}`,
      'q-5-8': `[TATA CAHAYA / LIGHTING]: ${bagianDua.pengaturanPencahayaan}\n[SUDUT KAMERA / POV]: ${bagianDua.sudutKameraPOV}`,
      'q-5-9': `[RESPON AUDIENS & FEEDBACK]: ${bagianTiga.responAudiens}\n[EVALUASI & PENYEMPURNAAN]: ${bagianTiga.evaluasiPenyempurnaan}`
    };

    // Save to localStorage
    const localPayload = {
      identitas,
      bagianSatu,
      bagianDua,
      bagianTiga,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(`lkpd_unit_5_lkpd3_${user.id}`, JSON.stringify(localPayload));

    // Call onSave to sync with server
    try {
      await onSave(compiledAnswers);
      setSavedSuccess(true);
      setLastAutoSave(new Date().toLocaleTimeString('id-ID'));
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error('Gagal menyimpan LKPD 3 Unit 5:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* HEADER LKPD 3 */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden print:bg-white print:text-black print:p-4 print:shadow-none print:border print:border-black">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10 border-b border-blue-800/60 pb-6 print:border-b-2 print:border-black">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-2 print:text-black">
              <Sparkles className="w-3.5 h-3.5 text-blue-300 print:hidden" /> Lembar Kerja Peserta Didik (LKPD) 3
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white print:text-black">
              Video Produk Promosi, Naskah/Storyboard & Pencahayaan
            </h1>
            <p className="text-sm text-blue-200/90 mt-1 max-w-2xl print:text-slate-700">
              Unit 5: Merancang Desain Produk Kriya Industri • Perumusan tujuan promosi visual, penulisan naskah/storyboard adegan, penataan pencahayaan tekstur produk, dan uji respon minat calon pembeli.
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden self-stretch sm:self-auto justify-end">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Cetak / Simpan PDF
            </button>
            <button
              type="button"
              onClick={() => handleSaveAll()}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-black transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan Draf'}
            </button>
          </div>
        </div>

        {/* FEEDBACK STATUS */}
        {savedSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2 print:hidden">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>LKPD 3 Unit 5 berhasil disimpan ke server dan database lokal!</span>
            {lastAutoSave && <span className="text-emerald-300/70 ml-auto text-[10px]">Tersimpan: {lastAutoSave}</span>}
          </div>
        )}

        {/* FORM IDENTITAS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-2 text-xs">
          <div>
            <label className="text-blue-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              Nama Peserta Didik
            </label>
            <input
              type="text"
              value={identitas.nama}
              onChange={(e) => setIdentitas({ ...identitas, nama: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 print:text-black print:bg-white print:border-slate-300"
            />
          </div>
          <div>
            <label className="text-blue-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              Kelas / Fase
            </label>
            <input
              type="text"
              value={identitas.kelas}
              onChange={(e) => setIdentitas({ ...identitas, kelas: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 print:text-black print:bg-white print:border-slate-300"
            />
          </div>
          <div>
            <label className="text-blue-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              No. Absen
            </label>
            <input
              type="text"
              value={identitas.noAbsen}
              onChange={(e) => setIdentitas({ ...identitas, noAbsen: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 print:text-black print:bg-white print:border-slate-300"
              placeholder="Contoh: 18"
            />
          </div>
          <div>
            <label className="text-blue-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              Tanggal Pelaksanaan
            </label>
            <input
              type="text"
              value={identitas.tanggal}
              onChange={(e) => setIdentitas({ ...identitas, tanggal: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 print:text-black print:bg-white print:border-slate-300"
            />
          </div>
        </div>
      </div>

      {/* FORM PENGISIAN 3 BAGIAN UTAMA */}
      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* BAGIAN 1: TUJUAN & NASKAH/STORYBOARD */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 font-black text-sm flex items-center justify-center">
              1
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Film className="w-4 h-4 text-blue-600" />
                Bagian 1: Perumusan Tujuan & Naskah/Storyboard Video Produk Kriya
              </h2>
              <p className="text-xs text-slate-500">
                Tetapkan target penonton, susun narasi suara (voiceover), dan rancang alur adegan visual yang terstruktur rapi.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                A. Tujuan Utama Video Promosi Produk Kriya:
              </label>
              <textarea
                rows={2}
                value={bagianSatu.tujuanVideo}
                onChange={(e) => setBagianSatu({ ...bagianSatu, tujuanVideo: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                placeholder="Jelaskan tujuan video (menarik perhatian audiens, memamerkan keunggulan fitur, membangun citra merek ramah lingkungan)..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                B. Naskah Narasi / Suara Pengiring (Voiceover Script):
              </label>
              <textarea
                rows={2}
                value={bagianSatu.naskahNarasi}
                onChange={(e) => setBagianSatu({ ...bagianSatu, naskahNarasi: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed font-serif"
                placeholder="Tuliskan kata-kata narasi yang akan dibacakan atau ditampilkan sebagai teks pada video..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                C. Rangkaian Storyboard Adegan demi Adegan (Visual Flow):
              </label>
              <textarea
                rows={3}
                value={bagianSatu.storyboardAdegan}
                onChange={(e) => setBagianSatu({ ...bagianSatu, storyboardAdegan: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                placeholder="Uraikan adegan 1 (opening), adegan 2 (proses & bahan daur ulang), adegan 3 (tampilan logo & detail), adegan 4 (ajakan bertindak/closing)..."
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 2: TEKNIK TATA CAHAYA & SUDUT KAMERA */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center">
              2
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-600" />
                Bagian 2: Teknik Tata Cahaya (Lighting) & Visualisasi Keunggulan Produk
              </h2>
              <p className="text-xs text-slate-500">
                Gunakan pencahayaan optimal untuk menonjolkan tekstur kriya dan tentukan sudut kamera yang estetik.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                A. Pengaturan Tata Cahaya (Lighting Setup) untuk Menonjolkan Tekstur Bahan Kriya:
              </label>
              <textarea
                rows={2}
                value={bagianDua.pengaturanPencahayaan}
                onChange={(e) => setBagianDua({ ...bagianDua, pengaturanPencahayaan: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                placeholder="Bagaimana posisi lampu utama (key light), cahaya pengisi (fill light), atau pemanfaatan cahaya alami matahari dekat jendela?..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                B. Sudut Pengambilan Video (Camera Angles) untuk Menyorot Detail Logo & Kemasan:
              </label>
              <textarea
                rows={2}
                value={bagianDua.sudutKameraPOV}
                onChange={(e) => setBagianDua({ ...bagianDua, sudutKameraPOV: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                placeholder="Sebutkan sudut kamera (Close-up, Eye-level, Top-down, 360 spin) yang memperlihatkan keindahan kerajinan..."
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 3: UJI COBA AUDIENS & EVALUASI */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center">
              3
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-emerald-600" />
                Bagian 3: Uji Coba Respon Audiens & Evaluasi Pemasaran Produk Kriya
              </h2>
              <p className="text-xs text-slate-500">
                Ujikan hasil video dan rancangan logo kepada teman sekelas atau guru, kumpulkan masukan untuk perbaikan.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                A. Respon Audiens Teman Sebaya / Guru terhadap Video & Logo Kriya:
              </label>
              <textarea
                rows={2}
                value={bagianTiga.responAudiens}
                onChange={(e) => setBagianTiga({ ...bagianTiga, responAudiens: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                placeholder="Apa pendapat mereka mengenai kejelasan pesan, keindahan logo, dan daya tarik video promosi?..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                B. Rencana Penyempurnaan & Strategi Pemasaran Digital Lanjutan:
              </label>
              <textarea
                rows={2}
                value={bagianTiga.evaluasiPenyempurnaan}
                onChange={(e) => setBagianTiga({ ...bagianTiga, evaluasiPenyempurnaan: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
                placeholder="Hal apa yang akan diperbaiki (audio, teks, warna) dan platform apa yang akan digunakan untuk mempublikasikan produk?..."
              />
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 print:hidden">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Data LKPD 3 tersinkronisasi dengan akun: <strong>{user.name}</strong></span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Cetak Lembar LKPD 3
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan LKPD 3'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
