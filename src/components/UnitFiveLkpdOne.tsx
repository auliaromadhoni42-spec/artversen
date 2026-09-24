import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Save,
  ShieldCheck,
  Package,
  Layers,
  Search,
  Brush,
  Leaf
} from 'lucide-react';
import { User, LkpdQuestion } from '../types';

interface UnitFiveLkpdOneProps {
  user: User;
  levelId: string;
  status: 'locked' | 'unlocked' | 'completed';
  questions: LkpdQuestion[];
  initialAnswers: Record<string, string>;
  onSave: (compiledAnswers: Record<string, string>) => Promise<void>;
  saving: boolean;
}

export const UnitFiveLkpdOne: React.FC<UnitFiveLkpdOneProps> = ({
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

  // Bagian 1: Identitas Merek & Riset Kriya Ramah Lingkungan (Sinergi Unit 1 & Unit 5)
  const [bagianSatu, setBagianSatu] = useState({
    namaMerek: 'Lestari Woodcraft & Art',
    kategoriKriya: 'Kriya Kayu Palet & Serbuk Gergaji Upcycling (Sinergi Unit 1)',
    materialLingkungan: 'Memanfaatkan limbah kayu bekas palet kargo logistik dan sisa potongan mebel lokal di sekitar lingkungan sekolah/rumah untuk mengurangi pembakaran sampah kayu.',
    personaVisiBrand: 'Persona ramah, natural, dan modern-minimalis. Visi merek adalah menciptakan elemen dekorasi rumah fungsional bernilai seni tinggi yang berkontribusi nyata pada pelestarian alam sekitar.',
    targetPasar: 'Masyarakat perkotaan, generasi muda peduli lingkungan (Gen-Z & Milenial), serta kafe/ruang kerja modern bernuansa eco-aesthetic.'
  });

  // Bagian 2: Analisis Kompetitor & Keunikan Produk (Diferensiasi Merek)
  const [bagianDua, setBagianDua] = useState({
    observasiKompetitor: 'Banyak produk kriya kayu di pasaran masih menggunakan logo generik berupa tulisan polos biasa tanpa karakter visual kuat, dan kemasannya masih memakai kantong plastik sekali pakai tanpa identitas merek.',
    keunggulanDiferensiasi: 'Produk kami mengintegrasikan cap logo kayu bakar (emboss heat stamp) khas bernuansa etnik-modern, kemasan kardus daur ulang berlabel logo ramah lingkungan, serta sertifikat keaslian produk upcycling.'
  });

  // Bagian 3: Eksplorasi Sketsa Ide Awal Logo di Atas Kertas
  const [bagianTiga, setBagianTiga] = useState({
    konsepSketsaManual: 'Sketsa digambar di buku sketsa dengan pensil 2B, memadukan siluet lingkaran tunas daun hijau muda yang terjalin harmonis dengan guratan serat kayu alami dan inisial huruf "L".',
    filosofiBentukLogo: 'Lingkar luar melambangkan siklus sirkular ekonomi tanpa limbah (zero waste), tunas daun merepresentasikan nafas baru dari material bekas, dan guratan serat kayu menegaskan keotentikan kerajinan kriya tangan berkualitas.'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<string | null>(null);

  // Load from local storage or server initial answers
  useEffect(() => {
    const local = localStorage.getItem(`lkpd_unit_5_lkpd1_${user.id}`);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.identitas) setIdentitas(parsed.identitas);
        if (parsed.bagianSatu) setBagianSatu(parsed.bagianSatu);
        if (parsed.bagianDua) setBagianDua(parsed.bagianDua);
        if (parsed.bagianTiga) setBagianTiga(parsed.bagianTiga);
      } catch (e) {
        console.error('Error parsing local LKPD 1 Unit 5:', e);
      }
    } else {
      if (initialAnswers['q-5-1']) {
        setBagianSatu(prev => ({ ...prev, personaVisiBrand: initialAnswers['q-5-1'] }));
      }
      if (initialAnswers['q-5-2']) {
        setBagianDua(prev => ({ ...prev, keunggulanDiferensiasi: initialAnswers['q-5-2'] }));
      }
      if (initialAnswers['q-5-3']) {
        setBagianTiga(prev => ({ ...prev, konsepSketsaManual: initialAnswers['q-5-3'] }));
      }
    }
  }, [user.id, initialAnswers]);

  // Handle Form Submission / Save
  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Compile into backend questions format (q-5-1, q-5-2, q-5-3)
    const compiledAnswers: Record<string, string> = {
      'q-5-1': `[NAMA MEREK]: ${bagianSatu.namaMerek}\n[KATEGORI KRIYA]: ${bagianSatu.kategoriKriya}\n[MATERIAL LIMBAH UNIT 1]: ${bagianSatu.materialLingkungan}\n[PERSONA & VISI]: ${bagianSatu.personaVisiBrand}\n[TARGET PASAR]: ${bagianSatu.targetPasar}`,
      'q-5-2': `[OBSERVASI KOMPETITOR]: ${bagianDua.observasiKompetitor}\n[DIFERENSIASI & NILAI TAMBAH]: ${bagianDua.keunggulanDiferensiasi}`,
      'q-5-3': `[KONSEP SKETSA MANUAL]: ${bagianTiga.konsepSketsaManual}\n[FILOSOFI BENTUK SIMBOL]: ${bagianTiga.filosofiBentukLogo}`
    };

    // Save to localStorage
    const localPayload = {
      identitas,
      bagianSatu,
      bagianDua,
      bagianTiga,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(`lkpd_unit_5_lkpd1_${user.id}`, JSON.stringify(localPayload));

    // Call onSave to sync with server
    try {
      await onSave(compiledAnswers);
      setSavedSuccess(true);
      setLastAutoSave(new Date().toLocaleTimeString('id-ID'));
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error('Gagal menyimpan LKPD 1 Unit 5:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* HEADER LKPD 1 */}
      <div className="bg-gradient-to-r from-amber-950 via-orange-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden print:bg-white print:text-black print:p-4 print:shadow-none print:border print:border-black">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10 border-b border-amber-800/60 pb-6 print:border-b-2 print:border-black">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-2 print:text-black">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 print:hidden" /> Lembar Kerja Peserta Didik (LKPD) 1
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white print:text-black">
              Identitas Brand & Riset Kriya Ramah Lingkungan
            </h1>
            <p className="text-sm text-amber-200/90 mt-1 max-w-2xl print:text-slate-700">
              Unit 5: Merancang Desain Produk Kriya Industri • Sinergi Unit 1: Pemanfaatan material daur ulang sekitar, persona brand, visi, target pasar, riset kompetitor & sketsa ide logo awal.
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 text-xs font-black transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan Draf'}
            </button>
          </div>
        </div>

        {/* FEEDBACK STATUS */}
        {savedSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2 print:hidden">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>LKPD 1 Unit 5 berhasil disimpan ke database lokal dan cloud!</span>
            {lastAutoSave && <span className="text-emerald-300/70 ml-auto text-[10px]">Tersimpan: {lastAutoSave}</span>}
          </div>
        )}

        {/* FORM IDENTITAS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-2 text-xs">
          <div>
            <label className="text-amber-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              Nama Peserta Didik
            </label>
            <input
              type="text"
              value={identitas.nama}
              onChange={(e) => setIdentitas({ ...identitas, nama: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 print:text-black print:bg-white print:border-slate-300"
            />
          </div>
          <div>
            <label className="text-amber-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              Kelas / Fase
            </label>
            <input
              type="text"
              value={identitas.kelas}
              onChange={(e) => setIdentitas({ ...identitas, kelas: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 print:text-black print:bg-white print:border-slate-300"
            />
          </div>
          <div>
            <label className="text-amber-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              No. Absen
            </label>
            <input
              type="text"
              value={identitas.noAbsen}
              onChange={(e) => setIdentitas({ ...identitas, noAbsen: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 print:text-black print:bg-white print:border-slate-300"
              placeholder="Contoh: 18"
            />
          </div>
          <div>
            <label className="text-amber-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              Tanggal Pelaksanaan
            </label>
            <input
              type="text"
              value={identitas.tanggal}
              onChange={(e) => setIdentitas({ ...identitas, tanggal: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-amber-400 print:text-black print:bg-white print:border-slate-300"
            />
          </div>
        </div>
      </div>

      {/* FORM PENGISIAN 3 BAGIAN UTAMA */}
      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* BAGIAN 1: IDENTITAS MEREK & KRIYA RAMAH LINGKUNGAN */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center">
              1
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-600" />
                Bagian 1: Identitas Merek & Riset Kriya Ramah Lingkungan (Sinergi Unit 1 & Unit 5)
              </h2>
              <p className="text-xs text-slate-500">
                Pilih kategori produk kriya industri dari pemanfaatan material limbah sekitar (Unit 1), tetapkan persona brand, visi, dan target audiensnya.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">
                  A. Nama Merek / Jenama Produk Kriya:
                </label>
                <input
                  type="text"
                  value={bagianSatu.namaMerek}
                  onChange={(e) => setBagianSatu({ ...bagianSatu, namaMerek: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                  placeholder="Contoh: Lestari Woodcraft, Bambu Kreasi, EcoStitch..."
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">
                  B. Kategori Produk Kriya & Jenis Produk:
                </label>
                <input
                  type="text"
                  value={bagianSatu.kategoriKriya}
                  onChange={(e) => setBagianSatu({ ...bagianSatu, kategoriKriya: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
                  placeholder="Contoh: Lampu Meja Kayu Palet, Tas Serat Alam, Vas Daur Ulang..."
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                C. Pemanfaatan Potensi Limbah Sekitar (Sinergi Unit 1 - Eco Impact):
              </label>
              <textarea
                rows={2}
                value={bagianSatu.materialLingkungan}
                onChange={(e) => setBagianSatu({ ...bagianSatu, materialLingkungan: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                placeholder="Jelaskan material limbah/daur ulang yang dimanfaatkan dari lingkungan sekitar dan dampak positifnya terhadap pengurangan sampah..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">
                  D. Persona Brand & Visi Merek:
                </label>
                <textarea
                  rows={2}
                  value={bagianSatu.personaVisiBrand}
                  onChange={(e) => setBagianSatu({ ...bagianSatu, personaVisiBrand: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                  placeholder="Persona karakter (misal: ramah, elegan, otentik) dan cita-cita jangka panjang merek..."
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">
                  E. Target Audiens / Segmen Konsumen Sasaran:
                </label>
                <textarea
                  rows={2}
                  value={bagianSatu.targetPasar}
                  onChange={(e) => setBagianSatu({ ...bagianSatu, targetPasar: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                  placeholder="Siapa calon pembeli (usia, profesi, minat terhadap kerajinan tangan ramah lingkungan)..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN 2: ANALISIS KOMPETITOR & DIFERENSIASI */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-orange-100 text-orange-800 font-black text-sm flex items-center justify-center">
              2
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Search className="w-4 h-4 text-orange-600" />
                Bagian 2: Analisis Riset Kompetitor & Diferensiasi Keunikan Merek
              </h2>
              <p className="text-xs text-slate-500">
                Amati produk kriya serupa di pasar, kenali kelemahan dan tentukan nilai tambah yang membuat produkmu unggul.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                A. Hasil Observasi Produk Kriya & Logo Kompetitor Sejenis di Pasaran:
              </label>
              <textarea
                rows={2}
                value={bagianDua.observasiKompetitor}
                onChange={(e) => setBagianDua({ ...bagianDua, observasiKompetitor: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 leading-relaxed"
                placeholder="Bagaimana bentuk logo dan kemasan produk pesaing yang saat ini beredar di pasaran?..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                B. Keunikan & Nilai Tambah Diferensiasi Produk Kriya Buatanmu:
              </label>
              <textarea
                rows={2}
                value={bagianDua.keunggulanDiferensiasi}
                onChange={(e) => setBagianDua({ ...bagianDua, keunggulanDiferensiasi: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 leading-relaxed"
                placeholder="Apa yang membedakan produk kriyumu (misal: teknik ukir khusus, kemasan eco-packaging, cerita ramah lingkungan)..."
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 3: SKETSA IDE AWAL LOGO */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 font-black text-sm flex items-center justify-center">
              3
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Brush className="w-4 h-4 text-indigo-600" />
                Bagian 3: Eksplorasi Sketsa Ide Awal Logo di Atas Kertas
              </h2>
              <p className="text-xs text-slate-500">
                Visualisasikan ide logo secara manual di buku sketsa dengan pensil sebelum dieksekusi secara digital.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                A. Konsep Sketsa Visual Simbol & Tipografi yang Digambar Manual di Kertas:
              </label>
              <textarea
                rows={3}
                value={bagianTiga.konsepSketsaManual}
                onChange={(e) => setBagianTiga({ ...bagianTiga, konsepSketsaManual: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                placeholder="Rincikan objek simbol apa yang digambar, tata letak teks nama merek, dan variasi bentuk yang dieksplorasi..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                B. Filosofi Makna Bentuk & Simbol Rupa Logo:
              </label>
              <textarea
                rows={2}
                value={bagianTiga.filosofiBentukLogo}
                onChange={(e) => setBagianTiga({ ...bagianTiga, filosofiBentukLogo: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                placeholder="Jelaskan arti filosofis dari garis, lengkungan, atau ikon yang dipilih dalam merepresentasikan produk kriya..."
              />
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 print:hidden">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Data LKPD 1 tersinkronisasi dengan akun: <strong>{user.name}</strong></span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Cetak Lembar LKPD 1
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan LKPD 1'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
