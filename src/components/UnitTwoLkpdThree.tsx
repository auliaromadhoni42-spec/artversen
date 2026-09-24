import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  CheckCircle2,
  Sparkles,
  Users,
  Award,
  ArrowRightLeft,
  Save,
  ShieldCheck,
  MessageSquare,
  Star,
  CheckSquare,
  HelpCircle,
  Info
} from 'lucide-react';
import { User, LkpdQuestion } from '../types';

interface UnitTwoLkpdThreeProps {
  user: User;
  levelId: string;
  status: 'locked' | 'unlocked' | 'completed';
  questions: LkpdQuestion[];
  initialAnswers: Record<string, string>;
  onSave: (compiledAnswers: Record<string, string>) => Promise<void>;
  saving: boolean;
}

export const UnitTwoLkpdThree: React.FC<UnitTwoLkpdThreeProps> = ({
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

  // Bagian 1: Simulasi Penulisan 4 Jenis Kritik (Jurnalistik vs Pedagogik)
  const [simulasiKritik, setSimulasiKritik] = useState({
    judulKaryaDitelaah: 'Lukisan "Gelora Jiwa Laut" Karya Rekan Siswa (Cat Akrilik di Kanvas)',
    drafKritikJurnalistik: 'Pameran Seni Pelajar SMANEB pekan ini diwarnai oleh karya memukau "Gelora Jiwa Laut". Dengan sapuan kuas impasto yang dinamis dan kontras warna biru kobalt dengan semburat jingga temaram, karya ini berhasil menangkap drama ombak samudra secara ekspresif. Meski detail latar belakang masih membutuhkan pengolahan proporsi perspektif yang lebih matang, energi visual yang dipancarkan lukisan ini sangat menyegarkan mata penikmat seni di ruang pamer utama.',
    drafKritikPedagogik: 'Karya "Gelora Jiwa Laut" menunjukkan potensi bakat estetis yang luar biasa pada keberanian goresan kuas dan pencampuran gradasi warna emosional. Sebagai catatan pembinaan belajar, ananda dapat mengeksplorasi penggunaan kuas berujung runcing (round brush) untuk mempertegas garis buih ombak pada focal point agar ketegangan visual lebih hidup. Teruslah bereksperimen dengan media campuran untuk mematangkan rasa percaya diri dalam berkarya!',
    analisisPerbedaanBahasa: 'Kritik jurnalistik menggunakan gaya bahasa ringkas, persuasif, dan informatif untuk konsumsi publik media massa secara seimbang. Sebaliknya, kritik pedagogik berfokus pada bimbingan instruksional yang mengapresiasi kelebihan, menunjukkan area perbaikan secara santun, dan memotivasi kematangan bakat siswa.'
  });

  // Bagian 2: Refleksi Fungsi "Dua Mata Panah" Kritik Seni
  const [duaMataPanah, setDuaMataPanah] = useState({
    fungsiBagiSeniman: 'Sebagai mata panah tajam yang membantu seniman mendeteksi kelemahan teknis, mengikis rasa puas diri yang sempit, dan menjadi cermin refleksi untuk meningkatkan kedalaman komunikasi estetik pada karya-karya berikutnya.',
    fungsiBagiPublik: 'Sebagai tali penghubung intelektual dan emosional yang memandu masyarakat penikmat seni memahami bahasa simbolik, gagasan filosofis, dan realita artistik yang tersembunyi di balik wujud kasat mata karya seni.',
    sikapMenanggapiKritik: 'Menerima kritik dengan lapang dada dan pikiran terbuka (open-minded), memilah masukan yang konstruktif untuk mematangkan teknik berkarya tanpa merasa rendah diri.'
  });

  // Bagian 3: Lembar Asesmen Antarteman (Peer-Review) & Rubrik
  const [peerReview, setPeerReview] = useState({
    namaTemanDireview: 'Siti Rahmawati (Kelas XI-4)',
    judulKaryaTeman: 'Instalasi Daur Ulang "Metamorfosis Sampah Plastik"',
    skorDeskripsi: 4, // 1-4
    skorAnalisis: 4,
    skorInterpretasi: 4,
    skorEvaluasi: 4,
    catatanApresiatif: 'Konsep penggabungan botol plastik bekas dengan anyaman serat alam sangat kreatif dan rapi. Pesan pelestarian lingkungan tersampaikan dengan sangat kuat.',
    saranPengembangan: 'Pencahayaan (lighting) saat display pameran bisa diarahkan dari sudut atas 45 derajat agar bayangan tekstur plastik menghasilkan siluet dramatis yang lebih artistik.',
    komitmenEtikaBahasa: 'Kritik disampaikan secara santun, berbasis argumen teknis objektif, tidak menghakimi pribadi, dan bertujuan memotivasi semangat berkarya teman sebaya.'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load from local storage or server initial answers
  useEffect(() => {
    const local = localStorage.getItem(`lkpd_unit_2_lkpd3_${user.id}`);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.identitas) setIdentitas(parsed.identitas);
        if (parsed.simulasiKritik) setSimulasiKritik(parsed.simulasiKritik);
        if (parsed.duaMataPanah) setDuaMataPanah(parsed.duaMataPanah);
        if (parsed.peerReview) setPeerReview(parsed.peerReview);
      } catch (e) {
        console.error('Error parsing local LKPD 3 Unit 2:', e);
      }
    } else {
      if (initialAnswers['q-2-8']) {
        setSimulasiKritik(prev => ({ ...prev, analisisPerbedaanBahasa: initialAnswers['q-2-8'] }));
      }
      if (initialAnswers['q-2-9']) {
        setDuaMataPanah(prev => ({ ...prev, fungsiBagiSeniman: initialAnswers['q-2-9'] }));
      }
      if (initialAnswers['q-2-10']) {
        setPeerReview(prev => ({ ...prev, catatanApresiatif: initialAnswers['q-2-10'] }));
      }
    }
  }, [user.id, initialAnswers]);

  const handleSaveAll = async () => {
    const q8Answer = `[LKPD 3 - BAGIAN 1: SIMULASI PENULISAN 4 JENIS KRITIK]\n- Karya Ditelaah: ${simulasiKritik.judulKaryaDitelaah}\n- Draf Kritik Jurnalistik (Media Massa): ${simulasiKritik.drafKritikJurnalistik}\n- Draf Kritik Pedagogik (Edukasi Sekolah): ${simulasiKritik.drafKritikPedagogik}\n- Analisis Perbedaan Gaya Bahasa: ${simulasiKritik.analisisPerbedaanBahasa}`;

    const q9Answer = `[LKPD 3 - BAGIAN 2: REFLEKSI FUNGSI DUA MATA PANAH]\n- Fungsi bagi Seniman Pencipta: ${duaMataPanah.fungsiBagiSeniman}\n- Fungsi bagi Publik Penikmat Seni: ${duaMataPanah.fungsiBagiPublik}\n- Sikap Terbuka Terhadap Kritik: ${duaMataPanah.sikapMenanggapiKritik}`;

    const q10Answer = `[LKPD 3 - BAGIAN 3: PEER REVIEW & ETIKA KRITIKUS]\n- Rekan yang Dinilai: ${peerReview.namaTemanDireview} (Karya: ${peerReview.judulKaryaTeman})\n- Rubrik Asesmen: Deskripsi (${peerReview.skorDeskripsi}/4), Analisis Formal (${peerReview.skorAnalisis}/4), Interpretasi (${peerReview.skorInterpretasi}/4), Evaluasi (${peerReview.skorEvaluasi}/4)\n- Catatan Apresiasi Positif: ${peerReview.catatanApresiatif}\n- Saran Konstruktif: ${peerReview.saranPengembangan}\n- Komitmen Etika Bahasa: ${peerReview.komitmenEtikaBahasa}`;

    const payload: Record<string, string> = {
      'q-2-8': q8Answer,
      'q-2-9': q9Answer,
      'q-2-10': q10Answer
    };

    localStorage.setItem(
      `lkpd_unit_2_lkpd3_${user.id}`,
      JSON.stringify({ identitas, simulasiKritik, duaMataPanah, peerReview })
    );

    await onSave(payload);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-md border border-purple-800/40 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" /> LKPD 3 Unit 2 • Presentasi Kritik Seni Rupa
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-serif">
              4 Jenis Kritik Seni, Fungsi Dua Mata Panah & Peer-Review
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Simulasi penulisan kritik Jurnalistik vs Pedagogik, refleksi fungsi strategis "Dua Mata Panah", dan praktik asesmen antarteman beretika santun.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-purple-300" />
              <span>Cetak / PDF</span>
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Menyimpan...' : 'Simpan LKPD 3'}</span>
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>LKPD 3 Unit 2 berhasil disimpan ke server dan database lokal!</span>
          </div>
        )}
      </div>

      {/* Identitas Siswa */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-600" />
          Identitas Peserta Didik
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="font-semibold text-slate-600 block mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={identitas.nama}
              onChange={(e) => setIdentitas({ ...identitas, nama: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-600 block mb-1">Kelas</label>
            <input
              type="text"
              value={identitas.kelas}
              onChange={(e) => setIdentitas({ ...identitas, kelas: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-600 block mb-1">Nomor Absen</label>
            <input
              type="text"
              placeholder="Contoh: 21"
              value={identitas.noAbsen}
              onChange={(e) => setIdentitas({ ...identitas, noAbsen: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
            />
          </div>
          <div>
            <label className="font-semibold text-slate-600 block mb-1">Tanggal</label>
            <input
              type="text"
              value={identitas.tanggal}
              onChange={(e) => setIdentitas({ ...identitas, tanggal: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-medium"
            />
          </div>
        </div>
      </div>

      {/* BAGIAN 1: SIMULASI 4 JENIS KRITIK (JURNALISTIK VS PEDAGOGIK) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
              Bagian 1 • Simulasi Gaya Bahasa
            </span>
            <h3 className="text-base font-bold text-slate-900 font-serif">
              Simulasi Penulisan Kritik Jurnalistik vs Kritik Pedagogik
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Pilihlah satu karya seni rupa (misal pameran karya seni teman sekelas) dan buatlah draf ulasan dengan dua pendekatan gaya bahasa yang berbeda:
        </p>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Karya Seni yang Ditelaah
            </label>
            <input
              type="text"
              value={simulasiKritik.judulKaryaDitelaah}
              onChange={(e) => setSimulasiKritik({ ...simulasiKritik, judulKaryaDitelaah: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-2">
              <span className="font-bold text-blue-900 block text-xs flex items-center gap-1.5">
                📰 Draf 1: Gaya Kritik Jurnalistik (Media Massa)
              </span>
              <p className="text-[11px] text-blue-700">
                Fokus: Ulasan ringkas, cepat, menarik minat khalayak umum, dan menyajikan fakta pameran secara seimbang.
              </p>
              <textarea
                rows={5}
                value={simulasiKritik.drafKritikJurnalistik}
                onChange={(e) => setSimulasiKritik({ ...simulasiKritik, drafKritikJurnalistik: e.target.value })}
                className="w-full p-3 rounded-xl border border-blue-200 bg-white leading-relaxed"
              />
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
              <span className="font-bold text-emerald-900 block text-xs flex items-center gap-1.5">
                🎓 Draf 2: Gaya Kritik Pedagogik (Pendidikan Sekolah)
              </span>
              <p className="text-[11px] text-emerald-700">
                Fokus: Edukatif, membimbing bakat, mengapresiasi pencapaian, dan memberi saran perbaikan teknis secara santun.
              </p>
              <textarea
                rows={5}
                value={simulasiKritik.drafKritikPedagogik}
                onChange={(e) => setSimulasiKritik({ ...simulasiKritik, drafKritikPedagogik: e.target.value })}
                className="w-full p-3 rounded-xl border border-emerald-200 bg-white leading-relaxed"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Refleksi Analitis: Perbedaan Sasaran Pembaca dan Bahasa Antara Keduanya
            </label>
            <textarea
              rows={2}
              value={simulasiKritik.analisisPerbedaanBahasa}
              onChange={(e) => setSimulasiKritik({ ...simulasiKritik, analisisPerbedaanBahasa: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* BAGIAN 2: REFLEKSI FUNGSI DUA MATA PANAH */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              Bagian 2 • Filosofi Kritik Seni
            </span>
            <h3 className="text-base font-bold text-slate-900 font-serif">
              Refleksi Fungsi Strategis "Dua Mata Panah" Kritik Seni
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Dalam modul Canva, kritik seni digambarkan sebagai <strong>"dua mata panah"</strong> yang menjembatani seniman, karya, dan penikmat seni. Jelaskan bagaimana fungsi timbal balik ini bekerja:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-800 block text-xs">
              🎯 1. Bagi Seniman Pencipta Karya
            </span>
            <p className="text-[11px] text-slate-500">Bagaimana mata panah kritik membantu seniman mendeteksi kelemahan?</p>
            <textarea
              rows={3}
              value={duaMataPanah.fungsiBagiSeniman}
              onChange={(e) => setDuaMataPanah({ ...duaMataPanah, fungsiBagiSeniman: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-800 block text-xs">
              👁️ 2. Bagi Penikmat Seni (Publik / Audiens)
            </span>
            <p className="text-[11px] text-slate-500">Bagaimana kritik seni menjadi tali pemandu pemahaman realita estetik?</p>
            <textarea
              rows={3}
              value={duaMataPanah.fungsiBagiPublik}
              onChange={(e) => setDuaMataPanah({ ...duaMataPanah, fungsiBagiPublik: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">
              Sikap Ideal Seorang Siswa Saat Karya Sendiri Dikritik Teman/Guru
            </label>
            <textarea
              rows={2}
              value={duaMataPanah.sikapMenanggapiKritik}
              onChange={(e) => setDuaMataPanah({ ...duaMataPanah, sikapMenanggapiKritik: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* BAGIAN 3: LEMBAR ASESMEN ANTARTEMAN (PEER REVIEW) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              Bagian 3 • Asesmen Antarteman
            </span>
            <h3 className="text-base font-bold text-slate-900 font-serif">
              Lembar Asesmen Antarteman (Peer-Review) & Standar Etika Kritikus
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Amati karya seni salah satu rekan sekelasmu di galeri kelas. Berikan penilaian berdasarkan 4 pilar kritik seni secara santun dan konstruktif:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Nama Teman yang Dinilai</label>
            <input
              type="text"
              value={peerReview.namaTemanDireview}
              onChange={(e) => setPeerReview({ ...peerReview, namaTemanDireview: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Judul & Media Karya Teman</label>
            <input
              type="text"
              value={peerReview.judulKaryaTeman}
              onChange={(e) => setPeerReview({ ...peerReview, judulKaryaTeman: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>

          {/* Rubrik Skor 4 Pilar */}
          <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="font-bold text-slate-800 block text-xs">
              Rubrik Penilaian 4 Kriteria (Skala 1 - 4):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">1. Deskripsi Visual</span>
                <select
                  value={peerReview.skorDeskripsi}
                  onChange={(e) => setPeerReview({ ...peerReview, skorDeskripsi: Number(e.target.value) })}
                  className="w-full p-1.5 rounded-lg border border-slate-200 text-xs font-bold text-indigo-700 text-center"
                >
                  <option value={4}>4 - Sangat Jelas</option>
                  <option value={3}>3 - Cukup Jelas</option>
                  <option value={2}>2 - Kurang Jelas</option>
                  <option value={1}>1 - Perlu Bimbingan</option>
                </select>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">2. Analisis Formal</span>
                <select
                  value={peerReview.skorAnalisis}
                  onChange={(e) => setPeerReview({ ...peerReview, skorAnalisis: Number(e.target.value) })}
                  className="w-full p-1.5 rounded-lg border border-slate-200 text-xs font-bold text-indigo-700 text-center"
                >
                  <option value={4}>4 - Sangat Terstruktur</option>
                  <option value={3}>3 - Cukup Terstruktur</option>
                  <option value={2}>2 - Kurang Terstruktur</option>
                  <option value={1}>1 - Perlu Bimbingan</option>
                </select>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">3. Interpretasi Makna</span>
                <select
                  value={peerReview.skorInterpretasi}
                  onChange={(e) => setPeerReview({ ...peerReview, skorInterpretasi: Number(e.target.value) })}
                  className="w-full p-1.5 rounded-lg border border-slate-200 text-xs font-bold text-indigo-700 text-center"
                >
                  <option value={4}>4 - Sangat Mendalam</option>
                  <option value={3}>3 - Cukup Mendalam</option>
                  <option value={2}>2 - Kurang Mendalam</option>
                  <option value={1}>1 - Perlu Bimbingan</option>
                </select>
              </div>

              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block mb-1">4. Kesantunan Evaluasi</span>
                <select
                  value={peerReview.skorEvaluasi}
                  onChange={(e) => setPeerReview({ ...peerReview, skorEvaluasi: Number(e.target.value) })}
                  className="w-full p-1.5 rounded-lg border border-slate-200 text-xs font-bold text-indigo-700 text-center"
                >
                  <option value={4}>4 - Sangat Berbobot</option>
                  <option value={3}>3 - Cukup Berbobot</option>
                  <option value={2}>2 - Kurang Berbobot</option>
                  <option value={1}>1 - Perlu Bimbingan</option>
                </select>
              </div>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">
              Catatan Apresiasi Positif Terhadap Karya Teman
            </label>
            <textarea
              rows={2}
              value={peerReview.catatanApresiatif}
              onChange={(e) => setPeerReview({ ...peerReview, catatanApresiatif: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">
              Saran Teknis Konstruktif untuk Pengembangan Karya Selanjutnya
            </label>
            <textarea
              rows={2}
              value={peerReview.saranPengembangan}
              onChange={(e) => setPeerReview({ ...peerReview, saranPengembangan: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">
              Komitmen Etika Bahasa Kritikus Seni (Santun, Objektif, Membangun)
            </label>
            <input
              type="text"
              value={peerReview.komitmenEtikaBahasa}
              onChange={(e) => setPeerReview({ ...peerReview, komitmenEtikaBahasa: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Bottom Save Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-purple-600" />
          <span>Tersimpan aman di portofolio Artverse. Format cetak rapi siap unduh PDF.</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak PDF</span>
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-200 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Menyimpan...' : 'Simpan LKPD 3'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitTwoLkpdThree;
