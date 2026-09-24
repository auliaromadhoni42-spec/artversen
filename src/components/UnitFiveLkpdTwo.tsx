import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  CheckCircle2,
  Sparkles,
  Layers,
  Palette,
  Save,
  ShieldCheck,
  Award,
  Type,
  Laptop,
  Check
} from 'lucide-react';
import { User, LkpdQuestion } from '../types';

interface UnitFiveLkpdTwoProps {
  user: User;
  levelId: string;
  status: 'locked' | 'unlocked' | 'completed';
  questions: LkpdQuestion[];
  initialAnswers: Record<string, string>;
  onSave: (compiledAnswers: Record<string, string>) => Promise<void>;
  saving: boolean;
}

export const UnitFiveLkpdTwo: React.FC<UnitFiveLkpdTwoProps> = ({
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

  // Bagian 1: Mood Board Visual & Harmoni Elemen Desain (Warna & Tipografi)
  const [bagianSatu, setBagianSatu] = useState({
    paletWarnaPsikologi: 'Hijau Hutan (#1b4332) melambangkan kelestarian alam dan kepedulian lingkungan (Unit 1); Cokelat Kayu Hangat (#7f4f24) merepresentasikan bahan kriya alami dan keteguhan; Putih Gading (#f8f9fa) memberi kesan bersih dan minimalis.',
    fontTipografi: 'Menggunakan kombinasi font Sans-serif modern semi-bold ("Montserrat" / "Poppins") untuk nama merek agar bersih dan mudah dibaca dari kejauhan, dipadu font aksen serif tipis untuk tagline "Eco-Craft & Upcycle".',
    teksturMoodBoard: 'Kolase mood board menyatukan tekstur guratan serat kayu palet bekas, serat pelepah bambu, dedaunan hijau, dan referensi desain produk kriya interior bergaya Japandi (Japanese-Scandinavian).'
  });

  // Bagian 2: Eksekusi Digital Logo & Pemilihan Klasifikasi Jenis Logo
  const [bagianDua, setBagianDua] = useState({
    jenisLogoTerpilih: 'Logo Kombinasi (Combination Mark) — Memadukan simbol tunas serat kayu dengan teks nama merek di bawahnya, memberikan fleksibilitas saat diaplikasikan utuh maupun hanya simbol ikonnya saja.',
    aplikasiAlatDigital: 'Menggunakan Canva Pro untuk perancangan tata letak awal dan eksplorasi tipografi, kemudian diekspor atau disempurnakan menggunakan kurva vektor di Adobe Illustrator untuk memastikan garis tetap tajam.',
    formatEksporMockup: 'Diekspor dalam format PNG resolusi tinggi dengan latar belakang transparan (300 DPI) untuk media digital dan SVG vektor untuk cetak cap stempel panas pada kayu kriya.'
  });

  // Bagian 3: Penyusunan Dokumen Desain Brief Terpadu
  const [bagianTiga, setBagianTiga] = useState({
    profilPesanKunci: 'Produk kriya fungsional berbahan dasar limbah kayu daur ulang yang estetik, ramah lingkungan, dan tahan lama dengan pesan: "Mengubah Limbah Menjadi Nilai Seni Berkelanjutan".',
    batasanTeknisKemasan: 'Logo harus terbaca jelas saat dicetak stempel kayu berukuran 3x3 cm pada produk, serta dapat diaplikasikan pada stiker label kraft kardus kemasan berukuran 6x6 cm.',
    deliverablesDesain: '1) Master logo versi penuh (warna & monokrom); 2) Favicon / sub-mark ikon lingkaran untuk media sosial; 3) Mockup label kemasan kriya; 4) Pedoman tata letak logo (Brand Guidelines ringkas).'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<string | null>(null);

  // Load from local storage or server initial answers
  useEffect(() => {
    const local = localStorage.getItem(`lkpd_unit_5_lkpd2_${user.id}`);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.identitas) setIdentitas(parsed.identitas);
        if (parsed.bagianSatu) setBagianSatu(parsed.bagianSatu);
        if (parsed.bagianDua) setBagianDua(parsed.bagianDua);
        if (parsed.bagianTiga) setBagianTiga(parsed.bagianTiga);
      } catch (e) {
        console.error('Error parsing local LKPD 2 Unit 5:', e);
      }
    } else {
      if (initialAnswers['q-5-4']) {
        setBagianSatu(prev => ({ ...prev, paletWarnaPsikologi: initialAnswers['q-5-4'] }));
      }
      if (initialAnswers['q-5-5']) {
        setBagianDua(prev => ({ ...prev, jenisLogoTerpilih: initialAnswers['q-5-5'] }));
      }
      if (initialAnswers['q-5-6']) {
        setBagianTiga(prev => ({ ...prev, profilPesanKunci: initialAnswers['q-5-6'] }));
      }
    }
  }, [user.id, initialAnswers]);

  // Handle Form Submission / Save
  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Compile into backend questions format (q-5-4, q-5-5, q-5-6)
    const compiledAnswers: Record<string, string> = {
      'q-5-4': `[PALET WARNA & PSIKOLOGI]: ${bagianSatu.paletWarnaPsikologi}\n[FONT TIPOGRAFI]: ${bagianSatu.fontTipografi}\n[TEKSTUR & MOOD BOARD]: ${bagianSatu.teksturMoodBoard}`,
      'q-5-5': `[JENIS LOGO]: ${bagianDua.jenisLogoTerpilih}\n[SOFTWARE & ALUR KERJA DIGITAL]: ${bagianDua.aplikasiAlatDigital}\n[FORMAT EKSPOR & MOCKUP]: ${bagianDua.formatEksporMockup}`,
      'q-5-6': `[PROFIL & PESAN KUNCI]: ${bagianTiga.profilPesanKunci}\n[BATASAN TEKNIS KEMASAN]: ${bagianTiga.batasanTeknisKemasan}\n[DELIVERABLES AKHIR]: ${bagianTiga.deliverablesDesain}`
    };

    // Save to localStorage
    const localPayload = {
      identitas,
      bagianSatu,
      bagianDua,
      bagianTiga,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(`lkpd_unit_5_lkpd2_${user.id}`, JSON.stringify(localPayload));

    // Call onSave to sync with server
    try {
      await onSave(compiledAnswers);
      setSavedSuccess(true);
      setLastAutoSave(new Date().toLocaleTimeString('id-ID'));
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error('Gagal menyimpan LKPD 2 Unit 5:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* HEADER LKPD 2 */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden print:bg-white print:text-black print:p-4 print:shadow-none print:border print:border-black">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10 border-b border-teal-800/60 pb-6 print:border-b-2 print:border-black">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2 print:text-black">
              <Sparkles className="w-3.5 h-3.5 text-teal-300 print:hidden" /> Lembar Kerja Peserta Didik (LKPD) 2
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white print:text-black">
              Mood Board, Desain Digital Logo & Dokumen Desain Brief
            </h1>
            <p className="text-sm text-teal-200/90 mt-1 max-w-2xl print:text-slate-700">
              Unit 5: Merancang Desain Produk Kriya Industri • Pemilihan psikologi warna, tipografi, klasifikasi jenis logo, eksekusi aplikasi digital (Canva/AI), dan penyusunan Desain Brief terpadu.
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-slate-950 text-xs font-black transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan Draf'}
            </button>
          </div>
        </div>

        {/* FEEDBACK STATUS */}
        {savedSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2 print:hidden">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>LKPD 2 Unit 5 berhasil disimpan ke server dan database lokal!</span>
            {lastAutoSave && <span className="text-emerald-300/70 ml-auto text-[10px]">Tersimpan: {lastAutoSave}</span>}
          </div>
        )}

        {/* FORM IDENTITAS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-2 text-xs">
          <div>
            <label className="text-teal-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              Nama Peserta Didik
            </label>
            <input
              type="text"
              value={identitas.nama}
              onChange={(e) => setIdentitas({ ...identitas, nama: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 print:text-black print:bg-white print:border-slate-300"
            />
          </div>
          <div>
            <label className="text-teal-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              Kelas / Fase
            </label>
            <input
              type="text"
              value={identitas.kelas}
              onChange={(e) => setIdentitas({ ...identitas, kelas: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 print:text-black print:bg-white print:border-slate-300"
            />
          </div>
          <div>
            <label className="text-teal-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              No. Absen
            </label>
            <input
              type="text"
              value={identitas.noAbsen}
              onChange={(e) => setIdentitas({ ...identitas, noAbsen: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 print:text-black print:bg-white print:border-slate-300"
              placeholder="Contoh: 18"
            />
          </div>
          <div>
            <label className="text-teal-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              Tanggal Pelaksanaan
            </label>
            <input
              type="text"
              value={identitas.tanggal}
              onChange={(e) => setIdentitas({ ...identitas, tanggal: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-teal-400 print:text-black print:bg-white print:border-slate-300"
            />
          </div>
        </div>
      </div>

      {/* FORM PENGISIAN 3 BAGIAN UTAMA */}
      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* BAGIAN 1: MOOD BOARD, WARNA & TIPOGRAFI */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 font-black text-sm flex items-center justify-center">
              1
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Palette className="w-4 h-4 text-teal-600" />
                Bagian 1: Mood Board Visual & Harmoni Elemen Desain (Warna & Tipografi)
              </h2>
              <p className="text-xs text-slate-500">
                Uraikan palet warna emosional, jenis font tipografi, dan inspirasi tekstur bahan kriya ramah lingkungan.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                A. Pilihan Palet Warna Emosional & Psikologi Warna Merek:
              </label>
              <textarea
                rows={2}
                value={bagianSatu.paletWarnaPsikologi}
                onChange={(e) => setBagianSatu({ ...bagianSatu, paletWarnaPsikologi: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                placeholder="Sebutkan kode/nama warna dan pengaruh psikologisnya terhadap kesan ramah lingkungan..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                B. Karakter Font Tipografi yang Dipilih untuk Nama Brand:
              </label>
              <textarea
                rows={2}
                value={bagianSatu.fontTipografi}
                onChange={(e) => setBagianSatu({ ...bagianSatu, fontTipografi: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                placeholder="Jelaskan keluarga font (serif/sans-serif/display), ketebalan, dan kemudahan keterbacaannya..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                C. Tekstur Bahan Kriya & Referensi Visual Mood Board:
              </label>
              <textarea
                rows={2}
                value={bagianSatu.teksturMoodBoard}
                onChange={(e) => setBagianSatu({ ...bagianSatu, teksturMoodBoard: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                placeholder="Rangkum elemen visual (serat kayu, tekstur bambu, anyaman) yang dimasukkan dalam mood board..."
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 2: DESAIN DIGITAL LOGO & JENIS LOGO */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center">
              2
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Laptop className="w-4 h-4 text-amber-600" />
                Bagian 2: Eksekusi Digital Logo & Pemilihan Klasifikasi Jenis Logo
              </h2>
              <p className="text-xs text-slate-500">
                Pilih jenis logo (Wordmark/Monogram/Simbol/Emblem/Kombinasi), alat digital yang dipakai, dan persiapan ekspor.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                A. Klasifikasi Jenis Logo yang Ditetapkan & Alasannya:
              </label>
              <textarea
                rows={2}
                value={bagianDua.jenisLogoTerpilih}
                onChange={(e) => setBagianDua({ ...bagianDua, jenisLogoTerpilih: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                placeholder="Sebutkan jenis logo (Wordmark, Monogram, Simbol, Abstrak, Maskot, Emblem, atau Kombinasi) dan alasan pemilihannya..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">
                  B. Perangkat Lunak Digital & Alur Pengerjaan:
                </label>
                <textarea
                  rows={2}
                  value={bagianDua.aplikasiAlatDigital}
                  onChange={(e) => setBagianDua({ ...bagianDua, aplikasiAlatDigital: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                  placeholder="Canva, Adobe Illustrator, CorelDraw, atau AI Generator..."
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">
                  C. Format File Ekspor & Uji Mockup Media:
                </label>
                <textarea
                  rows={2}
                  value={bagianDua.formatEksporMockup}
                  onChange={(e) => setBagianDua({ ...bagianDua, formatEksporMockup: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                  placeholder="PNG transparan resolusi tinggi, SVG vektor, dan hasil uji pada mockup kemasan/label..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN 3: DOKUMEN DESAIN BRIEF */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 font-black text-sm flex items-center justify-center">
              3
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Bagian 3: Penyusunan Dokumen Desain Brief Produk Kriya Industri
              </h2>
              <p className="text-xs text-slate-500">
                Susun dokumen panduan resmi berisi profil produk, batasan teknis kemasan, dan deliverables akhir proyek.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                A. Profil Produk Kriya & Pesan Kunci Merek (Key Brand Message):
              </label>
              <textarea
                rows={2}
                value={bagianTiga.profilPesanKunci}
                onChange={(e) => setBagianTiga({ ...bagianTiga, profilPesanKunci: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                placeholder="Rangkuman nilai estetika, fungsi pakai, dan misi ramah lingkungan produk..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                B. Batasan Teknis Penerapan Kemasan, Label, atau Stempel Produk:
              </label>
              <textarea
                rows={2}
                value={bagianTiga.batasanTeknisKemasan}
                onChange={(e) => setBagianTiga({ ...bagianTiga, batasanTeknisKemasan: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                placeholder="Ukuran minimum logo, batas warna cetak, dan daya tahan material label..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                C. Rangkuman Spesifikasi Deliverables Akhir Desain:
              </label>
              <textarea
                rows={2}
                value={bagianTiga.deliverablesDesain}
                onChange={(e) => setBagianTiga({ ...bagianTiga, deliverablesDesain: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                placeholder="Daftar berkas yang diserahkan (logo utama, versi monokrom, favicon, mockup visual)..."
              />
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 print:hidden">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Data LKPD 2 tersinkronisasi dengan akun: <strong>{user.name}</strong></span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Cetak Lembar LKPD 2
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan LKPD 2'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
