import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  CheckCircle2,
  Sparkles,
  HeartHandshake,
  Heart,
  Save,
  ShieldCheck,
  Award,
  Scroll,
  Smile,
  Quote
} from 'lucide-react';
import { User, LkpdQuestion } from '../types';

interface UnitFourLkpdThreeProps {
  user: User;
  levelId: string;
  status: 'locked' | 'unlocked' | 'completed';
  questions: LkpdQuestion[];
  initialAnswers: Record<string, string>;
  onSave: (compiledAnswers: Record<string, string>) => Promise<void>;
  saving: boolean;
}

export const UnitFourLkpdThree: React.FC<UnitFourLkpdThreeProps> = ({
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

  // Bagian 1: Pernyataan Seniman Resmi (Artist Statement)
  const [bagianSatu, setBagianSatu] = useState({
    judulKarya: 'Lentera Sunyi: Pelukan Hangat yang Tertunda',
    mediumUkuran: 'Cat Akrilik, Tekstur Pasta & Kolase Kertas di atas Kanvas (60 cm × 80 cm)',
    tahunPembuatan: '2026',
    esaiArtistStatement: 'Karya ini lahir dari sudut terdalam keheningan jiwa saya. Melalui goresan garis liar dan tekstur tebal yang saling berbenturan, saya ingin merayakan kerapuhan manusia. Lentera tua yang tetap menyala di tengah malam dingin bukanlah tanda kepasrahan, melainkan saksi bisu atas daya lentur batin kita yang menolak padam. Seni ini menjadi doa visual bagi siapa pun yang sedang berjuang dalam kesendirian.'
  });

  // Bagian 2: Apresiasi Empatis Antarteman (Peer Empathy Review)
  const [bagianDua, setBagianDua] = useState({
    namaTeman: 'Siti Rahmawati',
    judulKaryaTeman: 'Labirin Waktu & Jamur Biru',
    resonansiEmosi: 'Saat pertama kali melihat karya Rahma, saya merasakan getaran rasa bingung namun sangat puitis. Gradasi warna birunya yang lembut memancarkan kesabaran, sementara bentuk jamur surealisnya menyiratkan pertumbuhan harapan di tempat yang tak terduga.',
    apresiasiEmpatik: 'Saya sangat mengapresiasi keberanian Rahma memperlihatkan sisi rapuhnya dengan jujur. Detail sapuan halusnya sangat menenangkan dan memberi kekuatan bagi saya yang melihatnya.'
  });

  // Bagian 3: Refleksi Transformasi Diri & Katarsis Jiwa
  const [bagianTiga, setBagianTiga] = useState({
    dampakKatarsis: 'Setelah menyelesaikan lukisan ini, ada beban berat di dada yang seakan terangkat. Apa yang semula terasa memalukan atau menyakitkan kini bertransformasi menjadi sesuatu yang indah dan bermartabat.',
    penerimaanDiri: 'Saya belajar untuk menerima bahwa ketidaksempurnaan, rasa takut, dan kesedihan adalah bagian sah dari kemanusiaan saya yang tidak perlu disembunyikan.',
    komitmenBerkarya: 'Saya bertekad menjadikan seni rupa sebagai ruang aman (safe space) seumur hidup untuk menjaga kesehatan mental dan merawat kepekaan rasa terhadap sesama.'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<string | null>(null);

  // Load from local storage or server initial answers
  useEffect(() => {
    const local = localStorage.getItem(`lkpd_unit_4_lkpd3_${user.id}`);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.identitas) setIdentitas(parsed.identitas);
        if (parsed.bagianSatu) setBagianSatu(parsed.bagianSatu);
        if (parsed.bagianDua) setBagianDua(parsed.bagianDua);
        if (parsed.bagianTiga) setBagianTiga(parsed.bagianTiga);
      } catch (e) {
        console.error('Error parsing local LKPD 3 Unit 4:', e);
      }
    } else {
      if (initialAnswers['q-4-7']) {
        setBagianSatu(prev => ({ ...prev, esaiArtistStatement: initialAnswers['q-4-7'] }));
      }
      if (initialAnswers['q-4-8']) {
        setBagianDua(prev => ({ ...prev, resonansiEmosi: initialAnswers['q-4-8'] }));
      }
      if (initialAnswers['q-4-9']) {
        setBagianTiga(prev => ({ ...prev, dampakKatarsis: initialAnswers['q-4-9'] }));
      }
    }
  }, [user.id, initialAnswers]);

  // Handle Form Submission / Save
  const handleSaveAll = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Compile into backend questions format (q-4-7, q-4-8, q-4-9)
    const compiledAnswers: Record<string, string> = {
      'q-4-7': `[ARTIST STATEMENT RESMI]\nJudul: ${bagianSatu.judulKarya}\nMedia/Ukuran: ${bagianSatu.mediumUkuran} (${bagianSatu.tahunPembuatan})\nEsai Narasi:\n${bagianSatu.esaiArtistStatement}`,
      'q-4-8': `[PEER EMPATHY REVIEW]\nKarya Rekan: ${bagianDua.judulKaryaTeman} (oleh ${bagianDua.namaTeman})\nResonansi Emosi: ${bagianDua.resonansiEmosi}\nApresiasi Konstruktif: ${bagianDua.apresiasiEmpatik}`,
      'q-4-9': `[REFLEKSI KATARSIS & PENERIMAAN DIRI]\nDampak Katarsis/Self-Healing: ${bagianTiga.dampakKatarsis}\nPenerimaan Diri: ${bagianTiga.penerimaanDiri}\nKomitmen Berekspresi: ${bagianTiga.komitmenBerkarya}`
    };

    // Save to localStorage
    const localPayload = {
      identitas,
      bagianSatu,
      bagianDua,
      bagianTiga,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(`lkpd_unit_4_lkpd3_${user.id}`, JSON.stringify(localPayload));

    // Call onSave to sync with server
    try {
      await onSave(compiledAnswers);
      setSavedSuccess(true);
      setLastAutoSave(new Date().toLocaleTimeString('id-ID'));
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error('Gagal menyimpan LKPD 3 Unit 4:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* HEADER LKPD 3 */}
      <div className="bg-gradient-to-r from-pink-950 via-rose-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden print:bg-white print:text-black print:p-4 print:shadow-none print:border print:border-black">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10 border-b border-rose-800/60 pb-6 print:border-b-2 print:border-black">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2 print:text-black">
              <Sparkles className="w-3.5 h-3.5 text-rose-300 print:hidden" /> Lembar Kerja Peserta Didik (LKPD) 3
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-white print:text-black">
              Artist Statement, Apresiasi Empatis & Refleksi Batin
            </h1>
            <p className="text-sm text-rose-200/90 mt-1 max-w-2xl print:text-slate-700">
              Unit 4: Membuat dan Mempresentasikan Karya Seni Rupa • Penulisan pernyataan seniman resmi pameran, ulasan empatik rekan sebaya, dan evaluasi apresiasi diri.
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
            <span>LKPD 3 Unit 4 berhasil disimpan ke server dan database lokal!</span>
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

      {/* FORM PENGISIAN 3 BAGIAN UTAMA */}
      <form onSubmit={handleSaveAll} className="space-y-6">
        {/* BAGIAN 1: ARTIST STATEMENT RESMI */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-rose-100 text-rose-800 font-black text-sm flex items-center justify-center">
              1
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Scroll className="w-4 h-4 text-rose-600" />
                Bagian 1: Pernyataan Seniman Resmi (Artist Statement)
              </h2>
              <p className="text-xs text-slate-500">
                Susun naskah kuratorial personal resmi yang dipajang berdampingan dengan lukisanmu di ruang pameran.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Judul Resmi Karya:</label>
                <input
                  type="text"
                  value={bagianSatu.judulKarya}
                  onChange={(e) => setBagianSatu({ ...bagianSatu, judulKarya: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 font-semibold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Medium & Ukuran Dimensi:</label>
                <input
                  type="text"
                  value={bagianSatu.mediumUkuran}
                  onChange={(e) => setBagianSatu({ ...bagianSatu, mediumUkuran: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Tahun Penciptaan:</label>
                <input
                  type="text"
                  value={bagianSatu.tahunPembuatan}
                  onChange={(e) => setBagianSatu({ ...bagianSatu, tahunPembuatan: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5 flex items-center gap-1.5">
                <Quote className="w-3.5 h-3.5 text-rose-600" />
                Naskah Esai Artist Statement Formal:
              </label>
              <textarea
                rows={4}
                value={bagianSatu.esaiArtistStatement}
                onChange={(e) => setBagianSatu({ ...bagianSatu, esaiArtistStatement: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 leading-relaxed font-serif text-[13px]"
                placeholder="Tuliskan esai pernyataan seniman yang puitis dan menguraikan hakikat filosofis karyamu..."
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 2: APRESIASI EMPATIS ANTARTEMAN */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-pink-100 text-pink-800 font-black text-sm flex items-center justify-center">
              2
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-pink-600" />
                Bagian 2: Lembar Apresiasi Empatis Antarteman (Peer Empathy Review)
              </h2>
              <p className="text-xs text-slate-500">
                Apresiasi karya rekan sekelas dengan kepekaan rasa tinggi, memahami pesan batin mereka tanpa menghakimi.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Nama Teman yang Ditelaah:</label>
                <input
                  type="text"
                  value={bagianDua.namaTeman}
                  onChange={(e) => setBagianDua({ ...bagianDua, namaTeman: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-800 mb-1">Judul Karya Teman:</label>
                <input
                  type="text"
                  value={bagianDua.judulKaryaTeman}
                  onChange={(e) => setBagianDua({ ...bagianDua, judulKaryaTeman: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                A. Resonansi Emosi Visual (Suasana batin apa yang kamu rasakan saat menatap karyanya?):
              </label>
              <textarea
                rows={2}
                value={bagianDua.resonansiEmosi}
                onChange={(e) => setBagianDua({ ...bagianDua, resonansiEmosi: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 leading-relaxed"
                placeholder="Deskripsikan resonansi emosional yang terpancar dari warna dan bentuk karya temanmu..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                B. Catatan Apresiasi Positif & Pesan Empatik yang Menguatkan:
              </label>
              <textarea
                rows={2}
                value={bagianDua.apresiasiEmpatik}
                onChange={(e) => setBagianDua({ ...bagianDua, apresiasiEmpatik: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-500 leading-relaxed"
                placeholder="Tuliskan kata-kata apresiatif yang menguatkan semangat berkarya sahabatmu..."
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 3: REFLEKSI TRANSFORMASI DIRI */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 font-black text-sm flex items-center justify-center">
              3
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                <Smile className="w-4 h-4 text-purple-600" />
                Bagian 3: Refleksi Transformasi Diri & Katarsis Jiwa
              </h2>
              <p className="text-xs text-slate-500">
                Pelepasan emosi, pemulihan ketenangan batin (self-healing), dan komitmen berekspresi secara sehat.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                A. Dampak Katarsis & Ketenangan Batin yang Kamu Rasakan (Self-Healing):
              </label>
              <textarea
                rows={2}
                value={bagianTiga.dampakKatarsis}
                onChange={(e) => setBagianTiga({ ...bagianTiga, dampakKatarsis: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
                placeholder="Bagaimana berkarya seni ekspresi meredakan beban kecemasan atau kesedihan batinmu?..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                B. Penemuan Jati Diri & Penerimaan Diri (Self-Acceptance):
              </label>
              <textarea
                rows={2}
                value={bagianTiga.penerimaanDiri}
                onChange={(e) => setBagianTiga({ ...bagianTiga, penerimaanDiri: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
                placeholder="Apa pelajaran hidup tentang menerima keunikan dan ketidaksempurnaan dirimu yang kamu petik?..."
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                C. Komitmen Menjadikan Seni sebagai Saluran Jiwa yang Sehat:
              </label>
              <textarea
                rows={2}
                value={bagianTiga.komitmenBerkarya}
                onChange={(e) => setBagianTiga({ ...bagianTiga, komitmenBerkarya: e.target.value })}
                className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
                placeholder="Tuliskan tekadmu untuk terus mengekspresikan diri melalui karya kreatif di masa mendatang..."
              />
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 print:hidden">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Data LKPD 3 tersinkronisasi dengan akun: <strong>{user.nama}</strong></span>
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
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? 'Menyimpan...' : 'Simpan LKPD 3'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
