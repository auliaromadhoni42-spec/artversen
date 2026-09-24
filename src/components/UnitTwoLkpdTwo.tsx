import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  CheckCircle2,
  Sparkles,
  Compass,
  BookOpen,
  Award,
  Layers,
  Save,
  ShieldCheck,
  Lightbulb,
  ExternalLink,
  Flame,
  Info,
  CheckSquare
} from 'lucide-react';
import { User, LkpdQuestion } from '../types';

interface UnitTwoLkpdTwoProps {
  user: User;
  levelId: string;
  status: 'locked' | 'unlocked' | 'completed';
  questions: LkpdQuestion[];
  initialAnswers: Record<string, string>;
  onSave: (compiledAnswers: Record<string, string>) => Promise<void>;
  saving: boolean;
}

export const UnitTwoLkpdTwo: React.FC<UnitTwoLkpdTwoProps> = ({
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

  // Bagian 1: Komparasi 4 Pendekatan Kritik Seni
  const [komparasiPendekatan, setKomparasiPendekatan] = useState({
    formalistik: 'Menilai kualitas formal visual murni: susunan garis, warna, bidang, tekstur, dan prinsip komposisi tanpa terikat konteks cerita luar.',
    ekspresionistik: 'Menilai intensitas emosi batin, kejujuran luapan rasa, dan suasana psikologis jiwa pencipta yang tertuang pada karya.',
    instrumentalistik: 'Memandang karya sebagai sarana/instrumen untuk menyampaikan pesan edukatif, moral, agama, atau kritik sosial-politik.',
    kontekstual: 'Mengkaji keterkaitan mendalam antara objek visual dengan konteks sejarah, latar belakang budaya, dan situasi sosial saat karya dihadirkan.',
    kesimpulanKomparasi: 'Keempat pendekatan saling melengkapi; pendekatan formalistik membedah wujud fisik, ekspresionistik membedah kedalaman rasa, instrumentalistik menguji tujuan praktis, dan kontekstual menyingkap relevansi historisnya.'
  });

  // Bagian 2: Kajian Kontekstual Lukisan Raden Saleh "Penangkapan Pangeran Diponegoro" (1857)
  const [kajianRadenSaleh, setKajianRadenSaleh] = useState({
    latarBelakangSejarah: 'Perang Diponegoro (Perang Jawa 1825–1830) yang menguras kas kolonial Belanda, diakhiri dengan siasat licik Jenderal De Kock yang mengundang Diponegoro berunding damai di Magelang namun malah menangkapnya secara curang pada 28 Maret 1830.',
    analisisGesturTokoh: 'Pangeran Diponegoro digambarkan berdiri tegak, dagu terangkat, tatapan mata tajam memandang De Kock tanpa rasa takut sedikitpun. Tangan kanannya terbuka sebagai lambang kejujuran niat datang berunding yang dikhianati.',
    kontrasVersiPieneman: 'Pada lukisan pelukis Belanda J.W. Pieneman (1835) berjudul "Penyerahan Diponegoro", Diponegoro digambarkan tertunduk lesu seolah takluk di bawah bendera triwarna Belanda. Raden Saleh secara berani membalik narasi tersebut menjadi simbol kepahlawanan dan martabat bangsa.',
    maknaSimbolisVisual: 'Raden Saleh melukiskan kepala para perwira Belanda dengan proporsi sedikit lebih besar dan kaku untuk memberi kesan angkuh dan canggung. Selain itu, Raden Saleh melukis dirinya sendiri sebanyak dua kali di tengah kerumunan pengikut setia Diponegoro sebagai wujud solidaritas patriotik.',
    pesanMoralNasional: 'Karya ini bukan sekadar rekaman visual sejarah, melainkan pernyataan sikap anti-kolonialisme dan bukti bahwa bangsa Indonesia memiliki harkat martabat yang tidak bisa direndahkan oleh penjajah.'
  });

  // Bagian 3: Eksplorasi Pendekatan Kontekstual pada Karya Seni Kontemporer / Sekitar
  const [karyaSekitar, setKaryaSekitar] = useState({
    judulKaryaSekitar: 'Mural "Nafas Terakhir Kali Surabaya" karya Komunitas Seni Pemuda',
    jenisMedia: 'Mural Cat Tembok & Pigmen Ramah Lingkungan pada Dinding Bantaran Sungai',
    isuSosialLingkungan: 'Pencemaran limbah industri cair dan sampah plastik sekali pakai yang mengancam ekosistem biota sungai dan sumber air minum warga.',
    analisisKontekstual: 'Mural ini dihadirkan tepat di titik bantaran kali yang sering dijadikan lokasi pembuangan sampah liar. Objek ikan bertubuh botol plastik menjadi kritik visual langsung terhadap perilaku masyarakat dan kelalaian pengawasan industri di era sekarang.'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Load from local storage or server initial answers
  useEffect(() => {
    const local = localStorage.getItem(`lkpd_unit_2_lkpd2_${user.id}`);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.identitas) setIdentitas(parsed.identitas);
        if (parsed.komparasiPendekatan) setKomparasiPendekatan(parsed.komparasiPendekatan);
        if (parsed.kajianRadenSaleh) setKajianRadenSaleh(parsed.kajianRadenSaleh);
        if (parsed.karyaSekitar) setKaryaSekitar(parsed.karyaSekitar);
      } catch (e) {
        console.error('Error parsing local LKPD 2 Unit 2:', e);
      }
    } else {
      if (initialAnswers['q-2-5']) {
        setKomparasiPendekatan(prev => ({ ...prev, kesimpulanKomparasi: initialAnswers['q-2-5'] }));
      }
      if (initialAnswers['q-2-6']) {
        setKajianRadenSaleh(prev => ({ ...prev, pesanMoralNasional: initialAnswers['q-2-6'] }));
      }
      if (initialAnswers['q-2-7']) {
        setKaryaSekitar(prev => ({ ...prev, analisisKontekstual: initialAnswers['q-2-7'] }));
      }
    }
  }, [user.id, initialAnswers]);

  const handleSaveAll = async () => {
    const q5Answer = `[LKPD 2 - BAGIAN 1: KOMPARASI 4 PENDEKATAN KRITIK SENI]\n- Formalistik: ${komparasiPendekatan.formalistik}\n- Ekspresionistik: ${komparasiPendekatan.ekspresionistik}\n- Instrumentalistik: ${komparasiPendekatan.instrumentalistik}\n- Kontekstual: ${komparasiPendekatan.kontekstual}\n- Sintesis / Kesimpulan: ${komparasiPendekatan.kesimpulanKomparasi}`;

    const q6Answer = `[LKPD 2 - BAGIAN 2: KAJIAN KONTEKSTUAL LUKISAN RADEN SALEH]\n- Latar Historis Perang Jawa 1830: ${kajianRadenSaleh.latarBelakangSejarah}\n- Analisis Gestur Diponegoro: ${kajianRadenSaleh.analisisGesturTokoh}\n- Komparasi vs Versi Pieneman: ${kajianRadenSaleh.kontrasVersiPieneman}\n- Simbolik Visual & Figur Raden Saleh: ${kajianRadenSaleh.maknaSimbolisVisual}\n- Nilai Moral & Sikap Anti-Kolonial: ${kajianRadenSaleh.pesanMoralNasional}`;

    const q7Answer = `[LKPD 2 - BAGIAN 3: EKSPLORASI KONTEKSTUAL KARYA KONTEMPORER/SEKITAR]\n- Karya & Lokasi: ${karyaSekitar.judulKaryaSekitar} (${karyaSekitar.jenisMedia})\n- Isu Sosial/Ekologis yang Diangkat: ${karyaSekitar.isuSosialLingkungan}\n- Telaah Kontekstual: ${karyaSekitar.analisisKontekstual}`;

    const payload: Record<string, string> = {
      'q-2-5': q5Answer,
      'q-2-6': q6Answer,
      'q-2-7': q7Answer
    };

    localStorage.setItem(
      `lkpd_unit_2_lkpd2_${user.id}`,
      JSON.stringify({ identitas, komparasiPendekatan, kajianRadenSaleh, karyaSekitar })
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
      <div className="bg-gradient-to-r from-teal-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-md border border-teal-800/40 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" /> LKPD 2 Unit 2 • Bahan Ajar Kritik Seni Rupa
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-serif">
              4 Pendekatan Kritik & Kajian Kontekstual Raden Saleh
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Membandingkan 4 pendekatan kritik seni (Formalistik, Ekspresionistik, Instrumentalistik, Kontekstual) serta studi kasus historis lukisan <em>Penangkapan Pangeran Diponegoro</em>.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-teal-300" />
              <span>Cetak / PDF</span>
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={saving}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Menyimpan...' : 'Simpan LKPD 2'}</span>
            </button>
          </div>
        </div>

        {savedSuccess && (
          <div className="mt-4 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>LKPD 2 Unit 2 berhasil disimpan ke server dan database lokal!</span>
          </div>
        )}
      </div>

      {/* Identitas Siswa */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-600" />
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
              placeholder="Contoh: 08"
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

      {/* BAGIAN 1: KOMPARASI 4 PENDEKATAN KRITIK SENI */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
              Bagian 1
            </span>
            <h3 className="text-base font-bold text-slate-900 font-serif">
              Analisis Komparasi 4 Pendekatan dalam Kritik Seni Rupa
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Berdasarkan naskah <em>Bahan Ajar Kritik Seni Rupa</em>, jelaskan perbedaan karakteristik dan fokus utama dari keempat pendekatan kritik seni:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-blue-700 block text-xs">
              1. Pendekatan Formalistik
            </span>
            <p className="text-[11px] text-slate-500">Menekankan pada kualitas formal visual unsur dan prinsip penataan rupa.</p>
            <textarea
              rows={3}
              value={komparasiPendekatan.formalistik}
              onChange={(e) => setKomparasiPendekatan({ ...komparasiPendekatan, formalistik: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-indigo-700 block text-xs">
              2. Pendekatan Ekspresionistik
            </span>
            <p className="text-[11px] text-slate-500">Menilai kedalaman luapan perasaan dan orisinalitas jiwa perupa.</p>
            <textarea
              rows={3}
              value={komparasiPendekatan.ekspresionistik}
              onChange={(e) => setKomparasiPendekatan({ ...komparasiPendekatan, ekspresionistik: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-amber-700 block text-xs">
              3. Pendekatan Instrumentalistik
            </span>
            <p className="text-[11px] text-slate-500">Menilai karya seni sebagai instrumen/sarana tujuan pendidikan, moral, atau politik.</p>
            <textarea
              rows={3}
              value={komparasiPendekatan.instrumentalistik}
              onChange={(e) => setKomparasiPendekatan({ ...komparasiPendekatan, instrumentalistik: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-emerald-700 block text-xs">
              4. Pendekatan Kontekstual
            </span>
            <p className="text-[11px] text-slate-500">Mengkaji keterkaitan objek dan tema dengan konteks sosial, budaya, dan sejarah.</p>
            <textarea
              rows={3}
              value={komparasiPendekatan.kontekstual}
              onChange={(e) => setKomparasiPendekatan({ ...komparasiPendekatan, kontekstual: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">
              Sintesis & Kesimpulan: Kapan Suatu Pendekatan Paling Tepat Digunakan?
            </label>
            <textarea
              rows={2}
              value={komparasiPendekatan.kesimpulanKomparasi}
              onChange={(e) => setKomparasiPendekatan({ ...komparasiPendekatan, kesimpulanKomparasi: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* BAGIAN 2: STUDI KASUS KONTEKSTUAL LUKISAN RADEN SALEH */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              Bagian 2 • Studi Kasus Maestro
            </span>
            <h3 className="text-base font-bold text-slate-900 font-serif">
              Kajian Kontekstual Lukisan Raden Saleh "Penangkapan Pangeran Diponegoro" (1857)
            </h3>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Catatan Kuratorial:</strong> Lukisan ini merupakan contoh paling masyhur penerapan kritik pendekatan kontekstual di Indonesia. Raden Saleh mengkritisi penjajahan Belanda dengan membalik narasi takluk menjadi narasi martabat kepahlawanan.
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              1. Latar Belakang Peristiwa Historis (Perang Jawa & Tipu Muslihat Kolonial)
            </label>
            <textarea
              rows={3}
              value={kajianRadenSaleh.latarBelakangSejarah}
              onChange={(e) => setKajianRadenSaleh({ ...kajianRadenSaleh, latarBelakangSejarah: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              2. Bahasa Rupa Gestur Pangeran Diponegoro vs Pihak Penjajah
            </label>
            <textarea
              rows={2}
              value={kajianRadenSaleh.analisisGesturTokoh}
              onChange={(e) => setKajianRadenSaleh({ ...kajianRadenSaleh, analisisGesturTokoh: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              3. Perbandingan Narasi dengan Lukisan J.W. Pieneman ("Penyerahan" vs "Penangkapan")
            </label>
            <textarea
              rows={2}
              value={kajianRadenSaleh.kontrasVersiPieneman}
              onChange={(e) => setKajianRadenSaleh({ ...kajianRadenSaleh, kontrasVersiPieneman: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              4. Simbol Visual Khusus & Kehadiran Diri Raden Saleh di Lukisan
            </label>
            <textarea
              rows={2}
              value={kajianRadenSaleh.maknaSimbolisVisual}
              onChange={(e) => setKajianRadenSaleh({ ...kajianRadenSaleh, maknaSimbolisVisual: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              5. Pesan Moral, Sikap Kritis, & Martabat Kemerdekaan Bangsa
            </label>
            <textarea
              rows={3}
              value={kajianRadenSaleh.pesanMoralNasional}
              onChange={(e) => setKajianRadenSaleh({ ...kajianRadenSaleh, pesanMoralNasional: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* BAGIAN 3: EKSPLORASI PENDEKATAN KONTEKSTUAL PADA KARYA SEKITAR */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Bagian 3 • Aplikasi Mandiri
            </span>
            <h3 className="text-base font-bold text-slate-900 font-serif">
              Eksplorasi Pendekatan Kontekstual pada Seni Rupa Masa Kini di Lingkungan Sekitar
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Pilihlah satu karya seni rupa kontemporer di sekolah atau kotamu (mural, instalasi daur ulang, seni grafis, poster sosial) dan bedah maknanya berdasarkan konteks isu saat ini:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Nama / Judul Karya Seni yang Diamati</label>
            <input
              type="text"
              value={karyaSekitar.judulKaryaSekitar}
              onChange={(e) => setKaryaSekitar({ ...karyaSekitar, judulKaryaSekitar: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Jenis Media & Lokasi Keberadaan</label>
            <input
              type="text"
              value={karyaSekitar.jenisMedia}
              onChange={(e) => setKaryaSekitar({ ...karyaSekitar, jenisMedia: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">
              Isu Sosial, Lingkungan, atau Budaya yang Menjadi Latar Belakang
            </label>
            <textarea
              rows={2}
              value={karyaSekitar.isuSosialLingkungan}
              onChange={(e) => setKaryaSekitar({ ...karyaSekitar, isuSosialLingkungan: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-slate-200"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="font-bold text-slate-700 block mb-1">
              Analisis Kontekstual (Mengapa Karya Ini Berdampak bagi Masyarakat?)
            </label>
            <textarea
              rows={3}
              value={karyaSekitar.analisisKontekstual}
              onChange={(e) => setKaryaSekitar({ ...karyaSekitar, analisisKontekstual: e.target.value })}
              className="w-full p-3 rounded-xl border border-slate-200 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Bottom Save Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
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
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-200 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Menyimpan...' : 'Simpan LKPD 2'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitTwoLkpdTwo;
