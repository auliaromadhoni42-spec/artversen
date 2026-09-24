import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  CheckCircle2,
  Sparkles,
  Eye,
  Layers,
  Compass,
  Scale,
  Save,
  Clock,
  ShieldCheck,
  Lightbulb,
  Award,
  BookOpen,
  Info
} from 'lucide-react';
import { User, LkpdQuestion } from '../types';

interface UnitTwoLkpdOneProps {
  user: User;
  levelId: string;
  status: 'locked' | 'unlocked' | 'completed';
  questions: LkpdQuestion[];
  initialAnswers: Record<string, string>;
  onSave: (compiledAnswers: Record<string, string>) => Promise<void>;
  saving: boolean;
}

export const UnitTwoLkpdOne: React.FC<UnitTwoLkpdOneProps> = ({
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

  // Tahap 1: Deskripsi
  const [deskripsi, setDeskripsi] = useState({
    judulKarya: 'Penangkapan Pangeran Diponegoro',
    namaSeniman: 'Raden Saleh Syarif Bustaman',
    tahunPembuatan: '1857',
    mediaDimensi: 'Cat Minyak pada Kanvas (112 cm × 178 cm)',
    objekVisualKasatMata: 'Tampak sosok Pangeran Diponegoro berdiri tegak di tengah tangga mengenakan jubah putih dan serban hijau, dikelilingi para pengikutnya yang menunduk sedih serta barisan tentara dan perwira Hindia Belanda yang dipimpin Jenderal Hendrik Merkus de Kock. Latar belakang berupa bangunan berarsitektur kolonial dengan langit berawan cerah di pagi hari.',
    istilahTeknisDigunakan: 'Objek figuratif realistik, perspektif atmosferik, pencahayaan alami arah samping (side-lighting), proporsi anatomi tubuh manusia.'
  });

  // Tahap 2: Analisis Formal
  const [analisisFormal, setAnalisisFormal] = useState({
    unsurGaris: 'Didominasi garis vertikal tegak pada figur Diponegoro yang memberi kesan ketegaran dan garis-garis diagonal pada senjata tentara yang menciptakan tensi dramatis.',
    unsurWarna: 'Penggunaan kontras warna cerah pada jubah putih Diponegoro di tengah dominasi warna gelap busana militer kolonial cokelat, biru tua, dan emas.',
    unsurRuangTekstur: 'Ruang ilutif 3D dibangun kuat melalui prinsip tumpang tindih figur dan perspektif linear tangga. Tekstur halus khas lukisan romantisisme akademis Eropa.',
    keseimbanganIrama: 'Keseimbangan asimetris yang dinamis; kelompok pengikut Diponegoro di sebelah kiri mengimbangi kepadatan pasukan Belanda di sebelah kanan.',
    focalPoint: 'Focal point (pusat perhatian utama) jatuh tepat pada figur Pangeran Diponegoro berkat kontras busana putih terang dan tatapan matanya yang tajam tanpa gentar.'
  });

  // Tahap 3: Interpretasi
  const [interpretasi, setInterpretasi] = useState({
    temaKarya: 'Kecurangan Kolonialisme & Keteguhan Jiwa Pejuang Kemerdekaan.',
    maknaSimbolik: 'Busana putih suci Diponegoro menyimbolkan ketulusan niat perjuangan dan martabat luhur bangsa. Gestur tangan terbuka menunjukkan bahwa ia tidak takluk dalam pertempuran melainkan dikhianati dalam perundingan damai.',
    pesanFilosofis: 'Karya ini menjadi metafora perlawanan moral. Meskipun Diponegoro ditangkap secara fisik, kehormatan dan jiwa perjuangannya tetap merdeka dan lebih tinggi dari penjajahnya.'
  });

  // Tahap 4: Evaluasi / Penilaian
  const [evaluasi, setEvaluasi] = useState({
    komparasiKarya: 'Bila dibandingkan dengan lukisan bertema sama karya pelukis Belanda J.W. Pieneman (1835) berjudul "De onderwerping van Diepo Negoro", karya Raden Saleh membalik narasi sejarah dari "Penyerahan" menjadi "Penangkapan/Pengkhianatan".',
    kualitasTeknis: 'Kematangan teknis sapuan kuas Raden Saleh setara dengan para maestro romantisisme Eropa (Horace Vernet, Eugène Delacroix), dengan detail ornamen pakaian yang sangat teliti.',
    kesimpulanPenilaian: 'Karya ini merupakan adikarya seni lukis modern Indonesia yang bernilai historis, estetis, dan edukatif luar biasa tinggi sebagai simbol harga diri bangsa.'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<string | null>(null);

  // Load from local storage or server initial answers
  useEffect(() => {
    const local = localStorage.getItem(`lkpd_unit_2_lkpd1_${user.id}`);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.identitas) setIdentitas(parsed.identitas);
        if (parsed.deskripsi) setDeskripsi(parsed.deskripsi);
        if (parsed.analisisFormal) setAnalisisFormal(parsed.analisisFormal);
        if (parsed.interpretasi) setInterpretasi(parsed.interpretasi);
        if (parsed.evaluasi) setEvaluasi(parsed.evaluasi);
      } catch (e) {
        console.error('Error parsing local LKPD 1 Unit 2:', e);
      }
    } else {
      // Sync from initial answers if present
      if (initialAnswers['q-2-1']) {
        setDeskripsi(prev => ({ ...prev, objekVisualKasatMata: initialAnswers['q-2-1'] }));
      }
      if (initialAnswers['q-2-2']) {
        setAnalisisFormal(prev => ({ ...prev, focalPoint: initialAnswers['q-2-2'] }));
      }
      if (initialAnswers['q-2-3']) {
        setInterpretasi(prev => ({ ...prev, pesanFilosofis: initialAnswers['q-2-3'] }));
      }
      if (initialAnswers['q-2-4']) {
        setEvaluasi(prev => ({ ...prev, kesimpulanPenilaian: initialAnswers['q-2-4'] }));
      }
    }
  }, [user.id, initialAnswers]);

  // Compile full text to questions
  const handleSaveAll = async () => {
    const q1Answer = `[TAHAP 1: DESKRIPSI OBJEKTIF]\n- Judul Karya: ${deskripsi.judulKarya}\n- Seniman: ${deskripsi.namaSeniman} (${deskripsi.tahunPembuatan})\n- Media & Ukuran: ${deskripsi.mediaDimensi}\n- Objek Visual Kasat Mata: ${deskripsi.objekVisualKasatMata}\n- Istilah Teknis Seni: ${deskripsi.istilahTeknisDigunakan}`;
    
    const q2Answer = `[TAHAP 2: ANALISIS FORMAL STRUKTUR RUPA]\n- Garis & Bentuk: ${analisisFormal.unsurGaris}\n- Warna & Gelap-Terang: ${analisisFormal.unsurWarna}\n- Ruang & Tekstur: ${analisisFormal.unsurRuangTekstur}\n- Keseimbangan & Irama: ${analisisFormal.keseimbanganIrama}\n- Pusat Perhatian (Focal Point): ${analisisFormal.focalPoint}`;

    const q3Answer = `[TAHAP 3: INTERPRETASI MAKNA & SIMBOL]\n- Tema Utama: ${interpretasi.temaKarya}\n- Makna Simbolik: ${interpretasi.maknaSimbolik}\n- Pesan Emosional & Filosofis: ${interpretasi.pesanFilosofis}`;

    const q4Answer = `[TAHAP 4: EVALUASI / PENILAIAN KOMPARATIF]\n- Komparasi Karya Sejenis: ${evaluasi.komparasiKarya}\n- Kualitas Teknis & Estetis: ${evaluasi.kualitasTeknis}\n- Kesimpulan & Rekomendasi Kritis: ${evaluasi.kesimpulanPenilaian}`;

    const payload: Record<string, string> = {
      'q-2-1': q1Answer,
      'q-2-2': q2Answer,
      'q-2-3': q3Answer,
      'q-2-4': q4Answer
    };

    // Save structured state to local storage
    localStorage.setItem(
      `lkpd_unit_2_lkpd1_${user.id}`,
      JSON.stringify({ identitas, deskripsi, analisisFormal, interpretasi, evaluasi })
    );

    await onSave(payload);
    setSavedSuccess(true);
    setLastAutoSave(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-md border border-indigo-800/40 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> LKPD 1 Unit 2 • Metode Feldman
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-serif">
              Praktik Menulis 4 Tahapan Kritik Seni Rupa
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Membedah karya seni rupa secara objektif dan sistematis melalui 4 tahapan baku: Deskripsi ➔ Analisis Formal ➔ Interpretasi ➔ Evaluasi.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-blue-300" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Menyimpan...' : 'Simpan LKPD 1'}</span>
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>LKPD 1 Unit 2 berhasil disimpan ke server dan tersinkronisasi otomatis!</span>
          </div>
        )}
      </div>

      {/* Identitas Siswa */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
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
              placeholder="Contoh: 14"
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

      {/* TAHAP 1: DESKRIPSI */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Tahap 1 Prosedur Kritik
            </span>
            <h3 className="text-base font-bold text-slate-900 font-serif">
              Deskripsi (Description) — Inventarisasi Data Faktual Kasat Mata
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Catat data fisik karya dan deskripsikan seluruh objek yang tampak apa adanya tanpa memasukkan opini, penilaian, atau kesimpulan pribadi.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Judul Karya Seni</label>
            <input
              type="text"
              value={deskripsi.judulKarya}
              onChange={(e) => setDeskripsi({ ...deskripsi, judulKarya: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Nama Seniman Pencipta & Tahun</label>
            <input
              type="text"
              value={`${deskripsi.namaSeniman} (${deskripsi.tahunPembuatan})`}
              onChange={(e) => setDeskripsi({ ...deskripsi, namaSeniman: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">Media, Bahan, & Ukuran Dimensi</label>
            <input
              type="text"
              value={deskripsi.mediaDimensi}
              onChange={(e) => setDeskripsi({ ...deskripsi, mediaDimensi: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">
              Objek Kasat Mata yang Terlihat (Deskripsi Rinci Tanpa Opini)
            </label>
            <textarea
              rows={3}
              value={deskripsi.objekVisualKasatMata}
              onChange={(e) => setDeskripsi({ ...deskripsi, objekVisualKasatMata: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">
              Istilah Teknis Seni Rupa yang Digunakan
            </label>
            <input
              type="text"
              value={deskripsi.istilahTeknisDigunakan}
              onChange={(e) => setDeskripsi({ ...deskripsi, istilahTeknisDigunakan: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>
        </div>
      </div>

      {/* TAHAP 2: ANALISIS FORMAL */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              Tahap 2 Prosedur Kritik
            </span>
            <h3 className="text-base font-bold text-slate-900 font-serif">
              Analisis Formal (Formal Analysis) — Membedah Struktur Unsur & Prinsip
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Telusuri pengorganisasian unsur visual (garis, bidang, bentuk, warna, tekstur, ruang) serta penerapan prinsip komposisi (keseimbangan, irama, kesatuan, focal point).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">1. Pengolahan Unsur Garis & Bentuk</label>
            <textarea
              rows={2}
              value={analisisFormal.unsurGaris}
              onChange={(e) => setAnalisisFormal({ ...analisisFormal, unsurGaris: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">2. Harmoni Warna & Gelap-Terang</label>
            <textarea
              rows={2}
              value={analisisFormal.unsurWarna}
              onChange={(e) => setAnalisisFormal({ ...analisisFormal, unsurWarna: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">3. Ruang Ilusi & Tekstur Permukaan</label>
            <textarea
              rows={2}
              value={analisisFormal.unsurRuangTekstur}
              onChange={(e) => setAnalisisFormal({ ...analisisFormal, unsurRuangTekstur: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">4. Keseimbangan (Simetris/Asimetris) & Irama</label>
            <textarea
              rows={2}
              value={analisisFormal.keseimbanganIrama}
              onChange={(e) => setAnalisisFormal({ ...analisisFormal, keseimbanganIrama: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">
              5. Pusat Perhatian Utama (Focal Point / Center of Interest)
            </label>
            <textarea
              rows={2}
              value={analisisFormal.focalPoint}
              onChange={(e) => setAnalisisFormal({ ...analisisFormal, focalPoint: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200"
            />
          </div>
        </div>
      </div>

      {/* TAHAP 3: INTERPRETASI */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              Tahap 3 Prosedur Kritik
            </span>
            <h3 className="text-base font-bold text-slate-900 font-serif">
              Interpretasi (Interpretation) — Menafsirkan Makna, Tema & Simbol
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Tafsirkan gagasan filosofis, pesan tersirat, simbol metafora, serta suasana emosi yang ingin diungkapkan oleh seniman.
        </p>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Tema Pokok yang Digarap</label>
            <input
              type="text"
              value={interpretasi.temaKarya}
              onChange={(e) => setInterpretasi({ ...interpretasi, temaKarya: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Makna Simbolis & Metafora Visual</label>
            <textarea
              rows={2}
              value={interpretasi.maknaSimbolik}
              onChange={(e) => setInterpretasi({ ...interpretasi, maknaSimbolik: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Pesan Emosional & Nilai Batin Filosofis</label>
            <textarea
              rows={3}
              value={interpretasi.pesanFilosofis}
              onChange={(e) => setInterpretasi({ ...interpretasi, pesanFilosofis: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* TAHAP 4: EVALUASI / PENILAIAN */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
              Tahap 4 Prosedur Kritik
            </span>
            <h3 className="text-base font-bold text-slate-900 font-serif">
              Evaluasi atau Penilaian (Judgment) — Menentukan Kualitas Secara Komparatif
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Tentukan mutu keberhasilan estetika karya melalui komparasi dengan karya sejenis, telaah kebaruan gagasan, serta argumentasi yang santun dan adil.
        </p>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Perbandingan Komparatif dengan Karya Sejenis
            </label>
            <textarea
              rows={2}
              value={evaluasi.komparasiKarya}
              onChange={(e) => setEvaluasi({ ...evaluasi, komparasiKarya: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Kematangan Teknik, Orisinalitas & Nilai Estetis
            </label>
            <textarea
              rows={2}
              value={evaluasi.kualitasTeknis}
              onChange={(e) => setEvaluasi({ ...evaluasi, kualitasTeknis: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Kesimpulan Evaluatif & Rekomendasi Kritis Santun
            </label>
            <textarea
              rows={3}
              value={evaluasi.kesimpulanPenilaian}
              onChange={(e) => setEvaluasi({ ...evaluasi, kesimpulanPenilaian: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Bottom Save Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Tersimpan aman di profil Artverse. Format cetak rapi siap unduh PDF.</span>
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
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-200 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Menyimpan...' : 'Simpan LKPD 1'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitTwoLkpdOne;
