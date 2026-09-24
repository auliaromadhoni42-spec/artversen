import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  CheckCircle2,
  Sparkles,
  Layers,
  Palette,
  Eye,
  Save,
  ShieldCheck,
  Award,
  Zap,
  Brush,
  Compass
} from 'lucide-react';
import { User, LkpdQuestion } from '../types';

interface UnitFourLkpdTwoProps {
  user: User;
  levelId: string;
  status: 'locked' | 'unlocked' | 'completed';
  questions: LkpdQuestion[];
  initialAnswers: Record<string, string>;
  onSave: (compiledAnswers: Record<string, string>) => Promise<void>;
  saving: boolean;
}

export const UnitFourLkpdTwo: React.FC<UnitFourLkpdTwoProps> = ({
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

  // Bagian 1: Eksperimen Material & Teknik Goresan Katarsis
  const [bagianSatu, setBagianSatu] = useState({
    mediaBahan: 'Cat akrilik paduan pasta modeling untuk tekstur tebal (impasto), dipadu sobekan surat lama pribadi sebagai aksen kolase.',
    teknikGoresan: 'Menggunakan pisau palet dan sapuan jari tangan secara spontan untuk menciptakan goresan kasar yang dinamis dan berenergi, terinspirasi gaya plototan cat Affandi.',
    efekTekstur: 'Tekstur timbul yang kasar memberi kesan gejolak batin yang menggelora, sementara lelehan cat encer di sudut bawah menggambarkan kerapuhan air mata.'
  });

  // Bagian 2: Studi Komparasi Gaya Maestro Ekspresi
  const [bagianDua, setBagianDua] = useState({
    maestroRujukan: 'Affandi (Indonesia) dan Edvard Munch (Norwegia)',
    analisisKomparasi: 'Dari Affandi saya mengadopsi keberanian menorehkan cat tanpa ragu langsung dengan tangan demi menangkap momen emosi seketika. Dari Edvard Munch ("The Scream"), saya mempelajari bagaimana garis-garis bergelombang pada alam sekitar dapat mencerminkan jeritan kecemasan jiwa manusia.',
    kebaruanPribadi: 'Saya memadukan ekspresionisme figuratif tersebut dengan elemen kolase dokumen kertas nyata sehingga memiliki keterikatan historis yang sangat personal.'
  });

  // Bagian 3: Eksplorasi Palet Warna Psikologis (Psychology of Color)
  const [bagianTiga, setBagianTiga] = useState({
    paletDominan: 'Biru kobalt tua, ungu pekat, diselingi sapuan kontras oranye menyala dan kuning oker hangat.',
    psikologiWarna: 'Biru dan ungu tua memproyeksikan suasana melankolis dan kesendirian mendalam, sedangkan oranye dan kuning merepresentasikan api tekad dan kerinduan hangat yang menerobos kegelapan jiwa.',
    keharmonisanWarna: 'Penerapan kontras komplementer antara biru dan oranye menciptakan getaran visual yang menegangkan namun estetis.'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<string | null>(null);

  // Load from local storage or server initial answers
  useEffect(() => {
    const local = localStorage.getItem(`lkpd_unit_4_lkpd2_${user.id}`);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.identitas) setIdentitas(parsed.identitas);
        if (parsed.bagianSatu) setBagianSatu(parsed.bagianSatu);
        if (parsed.bagianDua) setBagianDua(parsed.bagianDua);
        if (parsed.bagianTiga) setBagianTiga(parsed.bagianTiga);
      } catch (e) {
        console.error('Error parsing local LKPD 2 Unit 4:', e);
      }
    } else {
      if (initialAnswers['q-4-4']) {
        setBagianSatu(prev => ({ ...prev, mediaBahan: initialAnswers['q-4-4'] }));
      }
      if (initialAnswers['q-4-5']) {
        setBagianDua(prev => ({ ...prev, analisisKomparasi: initialAnswers['q-4-5'] }));
      }
      if (initialAnswers['q-4-6']) {
        setBagianTiga(prev => ({ ...prev, psikologiWarna: initialAnswers['q-4-6'] }));
      }
    }
  }, [user.id, initialAnswers]);

  // Handle Form Submission / Save
  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Compile into backend questions format (q-4-4, q-4-5, q-4-6)
    const compiledAnswers: Record<string, string> = {
      'q-4-4': `[MEDIA & BAHAN EKSPRESI]: ${bagianSatu.mediaBahan}\n[TEKNIK GORESAN KATARSIS]: ${bagianSatu.teknikGoresan}\n[EFEK TEKSTUR]: ${bagianSatu.efekTekstur}`,
      'q-4-5': `[MAESTRO RUJUKAN]: ${bagianDua.maestroRujukan}\n[ANALISIS KOMPARASI GAYA]: ${bagianDua.analisisKomparasi}\n[ORISINALITAS GAYA SENDIRI]: ${bagianDua.kebaruanPribadi}`,
      'q-4-6': `[PALET WARNA DOMINAN]: ${bagianTiga.paletDominan}\n[PSIKOLOGI WARNA & EMOSI]: ${bagianTiga.psikologiWarna}\n[KOMPOSISI HARMONI WARNA]: ${bagianTiga.keharmonisanWarna}`
    };

    // Save to localStorage
    const localPayload = {
      identitas,
      bagianSatu,
      bagianDua,
      bagianTiga,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(`lkpd_unit_4_lkpd2_${user.id}`, JSON.stringify(localPayload));

    // Call onSave to sync with server
    try {
      await onSave(compiledAnswers);
      setSavedSuccess(true);
      setLastAutoSave(new Date().toLocaleTimeString('id-ID'));
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error('Gagal menyimpan LKPD 2 Unit 4:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* HEADER LKPD 2 */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden print:bg-white print:text-black print:p-4 print:shadow-none print:border print:border-black">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10 border-b border-purple-800/60 pb-6 print:border-b-2 print:border-black">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2 print:text-black">
              <Sparkles className="w-3.5 h-3.5 text-purple-300 print:hidden" /> Lembar Kerja Peserta Didik (LKPD) 2
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white print:text-black">
              Eksperimen Media, Teknik Goresan & Studi Maestro
            </h1>
            <p className="text-sm text-purple-200/90 mt-1 max-w-2xl print:text-slate-700">
              Unit 4: Membuat dan Mempresentasikan Karya Seni Rupa • Uji coba media impasto/plototan, komparasi karya maestro, dan psikologi warna emosional.
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan Draf'}
            </button>
          </div>
        </div>

        {/* FEEDBACK STATUS */}
        {savedSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2 print:hidden">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>LKPD 2 Unit 4 berhasil disimpan ke server dan database lokal!</span>
            {lastAutoSave && <span className="text-emerald-300/70 ml-auto text-[10px]">Tersimpan: {lastAutoSave}</span>}
          </div>
        )}

        {/* FORM IDENTITAS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-2 text-xs">
          <div>
            <label className="text-purple-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              Nama Peserta Didik
            </label>
            <input
              type="text"
              value={identitas.nama}
              onChange={(e) => setIdentitas({ ...identitas, nama: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 print:text-black print:bg-white print:border-slate-300"
            />
          </div>
          <div>
            <label className="text-purple-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              Kelas / Fase
            </label>
            <input
              type="text"
              value={identitas.kelas}
              onChange={(e) => setIdentitas({ ...identitas, kelas: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 print:text-black print:bg-white print:border-slate-300"
            />
          </div>
          <div>
            <label className="text-purple-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              No. Absen
            </label>
            <input
              type="text"
              value={identitas.noAbsen}
              onChange={(e) => setIdentitas({ ...identitas, noAbsen: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 print:text-black print:bg-white print:border-slate-300"
            />
          </div>
          <div>
            <label className="text-purple-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              Tanggal Pelaksanaan
            </label>
            <input
              type="text"
              value={identitas.tanggal}
              onChange={(e) => setIdentitas({ ...identitas, tanggal: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-purple-400 print:text-black print:bg-white print:border-slate-300"
            />
          </div>
        </div>
      </div>

      {/* FORM PENGISIAN 3 BAGIAN UTAMA */}
      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* BAGIAN 1: EKSPERIMEN MEDIA & TEKNIK GORESAN */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-black text-sm flex items-center justify-center">
              1
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Brush className="w-4 h-4 text-purple-600" />
                Bagian 1: Eksperimen Media & Teknik Goresan Katarsis
              </h2>
              <p className="text-xs text-slate-500">
                Uji coba karakter fisik media dan kebebasan sapuan alat/tangan dalam menuangkan energi rasa.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                A. Pilihan Media & Karakter Bahan (Cat Akrilik / Minyak / Pastel / Campuran / Kolase):
              </label>
              <textarea
                rows={2}
                value={bagianSatu.mediaBahan}
                onChange={(e) => setBagianSatu({ ...bagianSatu, mediaBahan: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
                placeholder="Jelaskan media utama dan bahan pendukung yang kamu pilih..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                B. Teknik Goresan Katarsis (Plototan jari Affandi, impasto pisau palet, sapuan kuas liar, dsb):
              </label>
              <textarea
                rows={2}
                value={bagianSatu.teknikGoresan}
                onChange={(e) => setBagianSatu({ ...bagianSatu, teknikGoresan: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
                placeholder="Deskripsikan caramu menggoreskan cat tanpa perantara atau dengan alat tertentu..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                C. Efek Tekstur Rupa yang Dihasilkan & Relevansinya dengan Suasana Batin:
              </label>
              <textarea
                rows={2}
                value={bagianSatu.efekTekstur}
                onChange={(e) => setBagianSatu({ ...bagianSatu, efekTekstur: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
                placeholder="Bagaimana ketebalan dan kekasaran tekstur mempertegas intensitas emosi karya..."
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 2: STUDI KOMPARASI MAESTRO */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 font-black text-sm flex items-center justify-center">
              2
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-600" />
                Bagian 2: Studi Komparasi Gaya Maestro Seni Ekspresi
              </h2>
              <p className="text-xs text-slate-500">
                Pelajari strategi visual para maestro terkemuka dan temukan diferensiasi gaya pribadimu.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                A. Maestro Rujukan Dunia / Nusantara (Misal: Affandi, Edvard Munch, Salvador Dalí, Van Gogh):
              </label>
              <input
                type="text"
                value={bagianDua.maestroRujukan}
                onChange={(e) => setBagianDua({ ...bagianDua, maestroRujukan: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Nama maestro dan karya legendarisnya"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                B. Analisis Komparasi: Kesamaan Spirit & Teknik yang Diadopsi:
              </label>
              <textarea
                rows={3}
                value={bagianDua.analisisKomparasi}
                onChange={(e) => setBagianDua({ ...bagianDua, analisisKomparasi: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                placeholder="Bedah apa yang kamu pelajari dari keberanian dan bahasa visual maestro rujukanmu..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                C. Sentuhan Kebaruan & Orisinalitas Karyamu Sendiri:
              </label>
              <textarea
                rows={2}
                value={bagianDua.kebaruanPribadi}
                onChange={(e) => setBagianDua({ ...bagianDua, kebaruanPribadi: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                placeholder="Apa yang membedakan karyamu sehingga tidak sekadar meniru melainkan memiliki jiwa autentik?..."
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 3: EKSPLORASI PSIKOLOGI WARNA */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-pink-100 text-pink-800 font-black text-sm flex items-center justify-center">
              3
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Palette className="w-4 h-4 text-pink-600" />
                Bagian 3: Eksplorasi Palet Warna Psikologis (Psychology of Color)
              </h2>
              <p className="text-xs text-slate-500">
                Pahami resonansi emosional setiap rona warna dan racik keselarasan atmosfer batin karyamu.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                A. Rona Palet Warna Dominan & Aksen Kontras:
              </label>
              <input
                type="text"
                value={bagianTiga.paletDominan}
                onChange={(e) => setBagianTiga({ ...bagianTiga, paletDominan: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Contoh: Biru indigo, merah tembaga, aksen kuning lemon menyala..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                B. Makna Psikologis di Balik Setiap Pilihan Warna Tersebut:
              </label>
              <textarea
                rows={2}
                value={bagianTiga.psikologiWarna}
                onChange={(e) => setBagianTiga({ ...bagianTiga, psikologiWarna: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 leading-relaxed"
                placeholder="Jelaskan asosiasi psikologis: merah untuk kemarahan/gairah, biru untuk perenungan sunyi, kuning untuk harapan..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                C. Hubungan Harmoni / Kontras Warna dalam Menciptakan Tensi Visual:
              </label>
              <textarea
                rows={2}
                value={bagianTiga.keharmonisanWarna}
                onChange={(e) => setBagianTiga({ ...bagianTiga, keharmonisanWarna: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 leading-relaxed"
                placeholder="Jelaskan penataan kontras gelap-terang atau komplementer untuk menghidupkan mood..."
              />
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 print:hidden">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Data LKPD 2 tersinkronisasi dengan akun: <strong>{user.nama}</strong></span>
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
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan LKPD 2'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
