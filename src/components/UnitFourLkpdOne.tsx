import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  CheckCircle2,
  Sparkles,
  Heart,
  Palette,
  Eye,
  Save,
  Clock,
  ShieldCheck,
  Lightbulb,
  Award,
  BookOpen,
  Info,
  Feather
} from 'lucide-react';
import { User, LkpdQuestion } from '../types';

interface UnitFourLkpdOneProps {
  user: User;
  levelId: string;
  status: 'locked' | 'unlocked' | 'completed';
  questions: LkpdQuestion[];
  initialAnswers: Record<string, string>;
  onSave: (compiledAnswers: Record<string, string>) => Promise<void>;
  saving: boolean;
}

export const UnitFourLkpdOne: React.FC<UnitFourLkpdOneProps> = ({
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

  // Bagian 1: Penggalian Ide Batin & Memori Personal
  const [bagianSatu, setBagianSatu] = useState({
    sumberInspirasi: 'Kenangan masa kecil di kampung halaman nenek saat senja dan rasa rindu akan kehangatan keluarga yang kini terpisah jarak.',
    suasanaEmosi: 'Perpaduan antara rasa rindu mendalam (nostalgia), rasa sepi di perantauan, namun diselimuti kehangatan kasih sayang keluarga.'
  });

  // Bagian 2: Pemilihan Gaya Ekspresi & Corak Seni
  const [bagianDua, setBagianDua] = useState({
    aliranPilihan: 'Ekspresionisme dipadukan dengan sentuhan Simbolisme puitis',
    alasanPilihan: 'Ekspresionisme membebaskan saya mendistorsi sapuan warna dan bentuk tanpa terikat proporsi fotorealistis alamiah demi mencurahkan gejolak emosi batin.'
  });

  // Bagian 3: Eksplorasi Metafora Visual & Simbolisme Rupa
  const [bagianTiga, setBagianTiga] = useState({
    objekSimbolis: 'Sebuah lentera minyak tua dengan kaca retak yang tetap memancarkan cahaya keemasan hangat di tengah hutan pepohonan berkelok biru kelam.',
    maknaSimbolis: 'Lentera retak melambangkan kerapuhan jiwa manusia di tengah ujian hidup, sementara nyala api keemasan adalah harapan dan cinta keluarga yang tak pernah padam.'
  });

  // Bagian 4: Makna Katarsis Emosional & Komunikasi Batin
  const [bagianEmpat, setBagianEmpat] = useState({
    prosesKatarsis: 'Proses menorehkan cat secara spontan di atas kanvas membantu melepaskan beban kerinduan yang selama ini terpendam dan mengubah rasa sepi menjadi kekuatan berkreasi.',
    pesanApresiator: 'Saya berharap penikmat karya merasakan kehangatan yang sama, bahwa di tengah masa-masa paling sunyi atau rapuh sekalipun, selalu ada lentera harapan di dalam dada.'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<string | null>(null);

  // Load from local storage or server initial answers
  useEffect(() => {
    const local = localStorage.getItem(`lkpd_unit_4_lkpd1_${user.id}`);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.identitas) setIdentitas(parsed.identitas);
        if (parsed.bagianSatu) setBagianSatu(parsed.bagianSatu);
        if (parsed.bagianDua) setBagianDua(parsed.bagianDua);
        if (parsed.bagianTiga) setBagianTiga(parsed.bagianTiga);
        if (parsed.bagianEmpat) setBagianEmpat(parsed.bagianEmpat);
      } catch (e) {
        console.error('Error parsing local LKPD 1 Unit 4:', e);
      }
    } else {
      if (initialAnswers['q-4-1']) {
        setBagianSatu(prev => ({ ...prev, sumberInspirasi: initialAnswers['q-4-1'] }));
      }
      if (initialAnswers['q-4-2']) {
        setBagianTiga(prev => ({ ...prev, objekSimbolis: initialAnswers['q-4-2'] }));
      }
      if (initialAnswers['q-4-3']) {
        setBagianEmpat(prev => ({ ...prev, prosesKatarsis: initialAnswers['q-4-3'] }));
      }
    }
  }, [user.id, initialAnswers]);

  // Handle Form Submission / Save
  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Compile into backend questions format
    const compiledAnswers: Record<string, string> = {
      'q-4-1': `[SUMBER INSPIRASI BATIN & MEMORI]: ${bagianSatu.sumberInspirasi}\n[SUASANA EMOSI & RASA]: ${bagianSatu.suasanaEmosi}`,
      'q-4-2': `[ALIRAN SENI EKSPRESI]: ${bagianDua.aliranPilihan} - ${bagianDua.alasanPilihan}\n[METAFORA VISUAL & SIMBOLISME]: ${bagianTiga.objekSimbolis} (Makna Simbolik: ${bagianTiga.maknaSimbolis})`,
      'q-4-3': `[MAKNA KATARSIS PERSONAL]: ${bagianEmpat.prosesKatarsis}\n[PESAN BATIN BAGI AUDIENS]: ${bagianEmpat.pesanApresiator}`
    };

    // Save to localStorage
    const localPayload = {
      identitas,
      bagianSatu,
      bagianDua,
      bagianTiga,
      bagianEmpat,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(`lkpd_unit_4_lkpd1_${user.id}`, JSON.stringify(localPayload));

    // Call onSave to sync with server
    try {
      await onSave(compiledAnswers);
      setSavedSuccess(true);
      setLastAutoSave(new Date().toLocaleTimeString('id-ID'));
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error('Gagal menyimpan LKPD 1 Unit 4:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* HEADER LKPD 1 */}
      <div className="bg-gradient-to-r from-rose-900 via-pink-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden print:bg-white print:text-black print:p-4 print:shadow-none print:border print:border-black">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10 border-b border-rose-800/60 pb-6 print:border-b-2 print:border-black">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2 print:text-black">
              <Sparkles className="w-3.5 h-3.5 text-rose-300 print:hidden" /> Lembar Kerja Peserta Didik (LKPD) 1
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white print:text-black">
              Penggalian Ide Batin, Memori & Metafora Visual
            </h1>
            <p className="text-sm text-rose-200/90 mt-1 max-w-2xl print:text-slate-700">
              Unit 4: Membuat dan Mempresentasikan Karya Seni Rupa • Eksplorasi aspek konseptual, aliran seni rupa, dan perancangan simbol batin.
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan Draf'}
            </button>
          </div>
        </div>

        {/* FEEDBACK STATUS */}
        {savedSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2 print:hidden">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>LKPD 1 Unit 4 berhasil disimpan ke server dan database lokal!</span>
            {lastAutoSave && <span className="text-emerald-300/70 ml-auto text-[10px]">Tersimpan: {lastAutoSave}</span>}
          </div>
        )}

        {/* FORM IDENTITAS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-2 text-xs">
          <div>
            <label className="text-rose-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              Nama Peserta Didik
            </label>
            <input
              type="text"
              value={identitas.nama}
              onChange={(e) => setIdentitas({ ...identitas, nama: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-rose-400 print:text-black print:bg-white print:border-slate-300"
              placeholder="Nama lengkap"
            />
          </div>
          <div>
            <label className="text-rose-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              Kelas / Fase
            </label>
            <input
              type="text"
              value={identitas.kelas}
              onChange={(e) => setIdentitas({ ...identitas, kelas: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-rose-400 print:text-black print:bg-white print:border-slate-300"
              placeholder="Misal: XI-C / Fase F"
            />
          </div>
          <div>
            <label className="text-rose-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              No. Absen
            </label>
            <input
              type="text"
              value={identitas.noAbsen}
              onChange={(e) => setIdentitas({ ...identitas, noAbsen: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-rose-400 print:text-black print:bg-white print:border-slate-300"
              placeholder="Contoh: 14"
            />
          </div>
          <div>
            <label className="text-rose-300 font-semibold uppercase tracking-wider text-[10px] block mb-1 print:text-black">
              Tanggal Pelaksanaan
            </label>
            <input
              type="text"
              value={identitas.tanggal}
              onChange={(e) => setIdentitas({ ...identitas, tanggal: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-rose-400 print:text-black print:bg-white print:border-slate-300"
            />
          </div>
        </div>
      </div>

      {/* FORM PENGISIAN 4 BAGIAN */}
      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* BAGIAN 1: PENGGALIAN MEMORI BATIN */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 font-black text-sm flex items-center justify-center">
              1
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-600" />
                Bagian 1: Penggalian Ide Batin & Memori Personal
              </h2>
              <p className="text-xs text-slate-500">
                Gali pengalaman emosional yang paling membekas, kenangan masa lalu, atau mimpi yang ingin diabadikan.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                A. Narasi Pengalaman Batin / Memori Personal yang Diangkat:
              </label>
              <textarea
                rows={3}
                value={bagianSatu.sumberInspirasi}
                onChange={(e) => setBagianSatu({ ...bagianSatu, sumberInspirasi: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 leading-relaxed"
                placeholder="Ceritakan peristiwa atau kenangan personalmu secara jujur..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                B. Dinamika Emosi / Gejolak Rasa yang Ingin Dicurahkan:
              </label>
              <textarea
                rows={2}
                value={bagianSatu.suasanaEmosi}
                onChange={(e) => setBagianSatu({ ...bagianSatu, suasanaEmosi: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 leading-relaxed"
                placeholder="Deskripsikan spektrum emosi: kerinduan, kesunyian, harapan, keberanian, atau luka masa lalu..."
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 2: PEMILIHAN GAYA EKSPRESI */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-pink-100 text-pink-800 font-black text-sm flex items-center justify-center">
              2
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Palette className="w-4 h-4 text-pink-600" />
                Bagian 2: Pemilihan Gaya Ekspresi & Corak Aliran Seni
              </h2>
              <p className="text-xs text-slate-500">
                Pilih pendekatan artistik yang paling selaras dengan karakter jiwamu (Ekspresionisme, Surealisme, Simbolisme).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                A. Gaya / Corak Aliran Seni Rupa yang Dipilih:
              </label>
              <input
                type="text"
                value={bagianDua.aliranPilihan}
                onChange={(e) => setBagianDua({ ...bagianDua, aliranPilihan: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Misal: Ekspresionisme / Surealisme Fantasi / Simbolisme Murni"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                B. Alasan Mengapa Corak Tersebut Tepat Mewakili Batinmu:
              </label>
              <textarea
                rows={3}
                value={bagianDua.alasanPilihan}
                onChange={(e) => setBagianDua({ ...bagianDua, alasanPilihan: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 leading-relaxed"
                placeholder="Jelaskan alasan kebebasan ekspresi corak pilihanmu..."
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 3: METAFORA VISUAL & SIMBOLISME */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-black text-sm flex items-center justify-center">
              3
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Feather className="w-4 h-4 text-purple-600" />
                Bagian 3: Rancangan Metafora Visual & Simbolisme Rupa
              </h2>
              <p className="text-xs text-slate-500">
                Ubah konsep batin yang abstrak menjadi wujud simbol rupa fisik yang sarat makna.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                A. Wujud Objek Simbolis Utama yang Dihadirkan:
              </label>
              <textarea
                rows={2}
                value={bagianTiga.objekSimbolis}
                onChange={(e) => setBagianTiga({ ...bagianTiga, objekSimbolis: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
                placeholder="Contoh: lentera retak menyala di hutan biru, sayap berbulu perak yang terkoyak..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                B. Makna Tersirat & Filosofi Simbolik Objek Tersebut:
              </label>
              <textarea
                rows={2}
                value={bagianTiga.maknaSimbolis}
                onChange={(e) => setBagianTiga({ ...bagianTiga, maknaSimbolis: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
                placeholder="Jelaskan tafsir makna tersembunyi di balik objek simbolis tersebut..."
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 4: MAKNA KATARSIS & KOMUNIKASI BATIN */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 font-black text-sm flex items-center justify-center">
              4
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-600" />
                Bagian 4: Makna Katarsis Personal & Komunikasi Rasa kepada Apresiator
              </h2>
              <p className="text-xs text-slate-500">
                Pelepasan emosi diri (catharsis) dan jembatan batin yang ingin dibangun kepada orang yang melihat karyamu.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                A. Nilai Katarsis & Kelegakan Batin bagi Dirimu Sendiri:
              </label>
              <textarea
                rows={2}
                value={bagianEmpat.prosesKatarsis}
                onChange={(e) => setBagianEmpat({ ...bagianEmpat, prosesKatarsis: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                placeholder="Bagaimana berkarya seni ekspresi ini membantumu merasa lebih damai dan lega?..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                B. Pesan atau Getaran Batin yang Diharapkan Sampai kepada Apresiator:
              </label>
              <textarea
                rows={2}
                value={bagianEmpat.pesanApresiator}
                onChange={(e) => setBagianEmpat({ ...bagianEmpat, pesanApresiator: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                placeholder="Pesan batin apa yang kamu ingin orang lain rasakan saat menatap karyamu?..."
              />
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 print:hidden">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Data LKPD 1 tersinkronisasi dengan akun: <strong>{user.nama}</strong></span>
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
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan LKPD 1'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
