import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  CheckCircle2,
  Sparkles,
  Hammer,
  ClipboardList,
  Save,
  Clock,
  ShieldCheck,
  Wrench,
  AlertTriangle,
  Scale,
  Info
} from 'lucide-react';
import { User, LkpdQuestion } from '../types';

interface UnitThreeLkpdTwoProps {
  user: User;
  levelId: string;
  status: 'locked' | 'unlocked' | 'completed';
  questions: LkpdQuestion[];
  initialAnswers: Record<string, string>;
  onSave: (compiledAnswers: Record<string, string>) => Promise<void>;
  saving: boolean;
}

export const UnitThreeLkpdTwo: React.FC<UnitThreeLkpdTwoProps> = ({
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

  // Bagian 1: Eksperimen Teknik Konstruksi Sambungan & Rangka 3D
  const [bagianSatu, setBagianSatu] = useState({
    teknikKonstruksi: 'Kombinasi Teknik Anyaman Kepang Serat Alami, Jahit Silang Benang Nilon, dan Rangka Karton Duplex',
    alatBahanPerekat: 'Lem putih PVAc (Fox kayu), lem tembak silikon panas (hot glue), jarum sol sepatu, dan klip penjepit kertas penahan.',
    ujiSambungan: 'Sambungan sudut kotak tas diperkuat dengan lipatan ganda karton duplex yang dilapisi anyaman pelepah, kemudian dijahit tepi dengan benang nilon berlapis lilin lebah agar sambungan tidak mudah robek atau terlepas saat menahan regangan.'
  });

  // Bagian 2: Logbook / Jurnal Tahapan Produksi & Troubleshooting
  const [bagianDua, setBagianDua] = useState({
    pertemuanSatu: 'Membuat pola mal 3D di atas karton, memotong serat pelepah pisang dengan lebar seragam 1,5 cm, dan merendam serat sejenak dalam larutan tawas alami untuk mencegah kerapuhan getas.',
    pertemuanDua: 'Mulai menganyam panel depan, belakang, dan dasar tas. Menyambungkan ketiga panel dengan teknik jahit kancing dan mengunci sudut menggunakan perekat silikon panas.',
    pertemuanTiga: 'Membuat tali selempang dari pilinan tali serat pelepah dan memasang pengait logam ring-D daur ulang. Memasang kancing magnetik di bagian penutup tas.',
    kendalaSolusi: 'Kendala: Serat pelepah pisang sempat retak saat ditekuk tajam pada bagian sudut dasar tas. Solusi: Sudut dibasahi sedikit dengan kuas air hangat agar serat kembali elastis sebelum ditekuk dan direkatkan.'
  });

  // Bagian 3: Uji Ergonomi, Kapasitas Beban & Ketahanan
  const [bagianTiga, setBagianTiga] = useState({
    ujiKapasitasBeban: 'Tas diuji menampung beban seberat 1,8 kg (buku paket pelajaran + botol tumbler 600 ml) selama 2 jam posisi tergantung. Hasil: Jahitan tali dan anyaman dasar tetap stabil tanpa tanda-tanda peregangan berlebih.',
    kenyamananPakai: 'Bantalan bahu pada tali selempang didesain empuk dengan lapisan kain perca bagian dalam sehingga tidak menimbulkan lecet pada pundak saat dibawa berjalan jauh.',
    ketahananCuaca: 'Bahan pelepah pisang bagian luar dilapisi pernis kayu water-based tipis 2 lapis, sehingga saat diciprati air, butiran air langsung menggelinding (*lotus effect*) dan tidak meresap membusuk.'
  });

  // Bagian 4: K3 & Pengelolaan Sampah Sisa (Zero-Waste)
  const [bagianEmpat, setBagianEmpat] = useState({
    penerapanK3: 'Menggunakan sarung tangan kain tipis saat menyayat pelepah dengan cutter tajam untuk menghindari sayatan tangan, serta bekerja di area berventilasi baik saat menggunakan lem tembak.',
    pengelolaanSisa: 'Remahan serat pelepah pisang yang terlalu pendek dijadikan bahan kompos organik tanaman sekolah, sedangkan sisa potongan karton disatukan kembali ke wadah daur ulang kertas.'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<string | null>(null);

  // Load from localStorage or server initial answers
  useEffect(() => {
    const local = localStorage.getItem(`lkpd_unit_3_lkpd2_${user.id}`);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.identitas) setIdentitas(parsed.identitas);
        if (parsed.bagianSatu) setBagianSatu(parsed.bagianSatu);
        if (parsed.bagianDua) setBagianDua(parsed.bagianDua);
        if (parsed.bagianTiga) setBagianTiga(parsed.bagianTiga);
        if (parsed.bagianEmpat) setBagianEmpat(parsed.bagianEmpat);
        return;
      } catch (e) {
        console.error('Failed to parse local draft Unit 3 LKPD 2', e);
      }
    }

    if (initialAnswers['q-3-4']) {
      setBagianSatu(prev => ({
        ...prev,
        teknikKonstruksi: initialAnswers['q-3-4'] || prev.teknikKonstruksi
      }));
    }
  }, [user.id, initialAnswers]);

  // Handle Save
  const handleSaveDraft = async () => {
    // 1. Compile formatted text for questions q-3-4, q-3-5, q-3-6
    const compiledQ4 = `[EKSPERIMEN TEKNIK KONSTRUKSI SAMBUNGAN & RANGKA 3D]
Teknik Konstruksi Pembentukan 3D: ${bagianSatu.teknikKonstruksi}
Alat, Bahan & Perekat Sambungan: ${bagianSatu.alatBahanPerekat}
Hasil Uji Kekuatan Sambungan & Kestabilan Rangka: ${bagianSatu.ujiSambungan}`;

    const compiledQ5 = `[LOGBOOK / JURNAL PRODUKSI & TROUBLESHOOTING KRIYA 3D]
Pertemuan 1 (Pola & Preparasi Bahan): ${bagianDua.pertemuanSatu}
Pertemuan 2 (Perakitan Wujud & Anyaman 3D): ${bagianDua.pertemuanDua}
Pertemuan 3 (Pemasangan Aksesoris & Detail Ergonomi): ${bagianDua.pertemuanTiga}
Kendala Kerumitan Bentuk & Solusi Kreatif: ${bagianDua.kendalaSolusi}`;

    const compiledQ6 = `[UJI ERGONOMI, BEBAN & KETAHANAN MATERIAL LINGKUNGAN]
Hasil Uji Kapasitas Beban Maksimal: ${bagianTiga.ujiKapasitasBeban}
Tingkat Kenyamanan Ergonomi Pemakai: ${bagianTiga.kenyamananPakai}
Daya Tahan Terhadap Air, Kelembapan & Jamur: ${bagianTiga.ketahananCuaca}
Penerapan K3 & Pengelolaan Sisa (Zero-Waste): ${bagianEmpat.penerapanK3} | ${bagianEmpat.pengelolaanSisa}`;

    // 2. Save structured draft to localStorage
    const draftData = {
      identitas,
      bagianSatu,
      bagianDua,
      bagianTiga,
      bagianEmpat,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(`lkpd_unit_3_lkpd2_${user.id}`, JSON.stringify(draftData));

    // 3. Save to backend answers
    await onSave({
      'q-3-4': compiledQ4,
      'q-3-5': compiledQ5,
      'q-3-6': compiledQ6
    });

    setSavedSuccess(true);
    setLastAutoSave(new Date().toLocaleTimeString('id-ID'));
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER LKPD 2 */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-800 to-cyan-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-teal-100 text-xs font-bold uppercase tracking-wider">
            <Hammer className="w-3.5 h-3.5 text-amber-300" />
            <span>LKPD 2 • Unit 3: Seni Rupa 3 Dimensi Daur Ulang</span>
          </div>
          
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black font-serif tracking-tight leading-snug">
            Eksperimen Teknik Konstruksi Sambungan, Logbook Produksi & Uji Durabilitas Kriya 3D
          </h1>
          
          <p className="text-teal-100/90 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Eksplorasi teknik pengikatan, penjahitan, dan perekat konstruksi 3 dimensi. Catat kronologi pembuatan karya pada logbook studio, selesaikan kendala kerapuhan bahan, dan uji daya tahan produk kriya daur ulangmu secara nyata.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-teal-100">
            <span className="flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-lg">
              <Wrench className="w-3.5 h-3.5 text-teal-300" /> Sambungan & Rangka Stabil
            </span>
            <span className="flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-lg">
              <ClipboardList className="w-3.5 h-3.5 text-emerald-300" /> Logbook Tahapan Studio
            </span>
            <span className="flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-lg">
              <Scale className="w-3.5 h-3.5 text-amber-300" /> Uji Beban & Ergonomi
            </span>
          </div>
        </div>
      </div>

      {/* FORM LEMBAR KERJA */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
        {/* IDENTITAS SISWA */}
        <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-100/80">
          <h3 className="text-xs font-black text-teal-950 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-teal-600" />
            Identitas Peserta Didik (Siswa SMANEB)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={identitas.nama}
                onChange={e => setIdentitas({ ...identitas, nama: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Kelas</label>
              <input
                type="text"
                value={identitas.kelas}
                onChange={e => setIdentitas({ ...identitas, kelas: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Nomor Absen</label>
              <input
                type="text"
                placeholder="Contoh: 14"
                value={identitas.noAbsen}
                onChange={e => setIdentitas({ ...identitas, noAbsen: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Tanggal Pengisian</label>
              <input
                type="text"
                value={identitas.tanggal}
                onChange={e => setIdentitas({ ...identitas, tanggal: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 1 */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-7 h-7 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black text-xs">
              1
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Eksperimen Teknik Konstruksi Sambungan & Kestabilan Rangka 3 Dimensi
              </h3>
              <p className="text-xs text-slate-500">
                Uraikan cara kamu membentuk dimensi ruang fisik dan teknik pengikatan yang membuat karyamu kokoh berdiri.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Teknik Konstruksi & Pembentukan 3D yang Diterapkan:
              </label>
              <input
                type="text"
                value={bagianSatu.teknikKonstruksi}
                onChange={e => setBagianSatu({ ...bagianSatu, teknikKonstruksi: e.target.value })}
                placeholder="Contoh: Anyaman kepang serat pelepah, setrika fused plastic bertekstur, penjahitan nilon silang"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Alat Bantu, Jarum & Jenis Perekat yang Digunakan:
              </label>
              <input
                type="text"
                value={bagianSatu.alatBahanPerekat}
                onChange={e => setBagianSatu({ ...bagianSatu, alatBahanPerekat: e.target.value })}
                placeholder="Contoh: Lem tembak silikon, lem kayu PVAc, jarum sol, kawat pengikat lunak, atau penjepit kayu"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Hasil Uji Kekuatan Sambungan Sudut & Kestabilan Konstruksi:
              </label>
              <textarea
                rows={3}
                value={bagianSatu.ujiSambungan}
                onChange={e => setBagianSatu({ ...bagianSatu, ujiSambungan: e.target.value })}
                placeholder="Jelaskan apakah sambungan mampu menahan tarikan dan sudut ruang tetap tegak presisi..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 leading-relaxed font-normal"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 2 */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
              2
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Logbook / Jurnal Tahapan Produksi Kriya 3 Dimensi & Troubleshooting
              </h3>
              <p className="text-xs text-slate-500">
                Dokumentasikan langkah kerja nyata pertemuan demi pertemuan dan inovasi penyelesaian masalahmu.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pertemuan 1: Penyiapan Pola/Mal Dasar & Preparasi Material
              </label>
              <textarea
                rows={2}
                value={bagianDua.pertemuanSatu}
                onChange={e => setBagianDua({ ...bagianDua, pertemuanSatu: e.target.value })}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 leading-relaxed font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pertemuan 2: Perakitan Panel Utama, Penganyaman & Pembentukan Ruang 3D
              </label>
              <textarea
                rows={2}
                value={bagianDua.pertemuanDua}
                onChange={e => setBagianDua({ ...bagianDua, pertemuanDua: e.target.value })}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 leading-relaxed font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pertemuan 3: Pemasangan Tali/Aksesoris Ergonomi, Penutup & Penguncian
              </label>
              <textarea
                rows={2}
                value={bagianDua.pertemuanTiga}
                onChange={e => setBagianDua({ ...bagianDua, pertemuanTiga: e.target.value })}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 leading-relaxed font-normal"
              />
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <label className="block text-xs font-bold text-amber-950 mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Kendala Teknis Kerumitan Bentuk yang Dihadapi & Solusi Kreatif (Troubleshooting):
              </label>
              <textarea
                rows={2}
                value={bagianDua.kendalaSolusi}
                onChange={e => setBagianDua({ ...bagianDua, kendalaSolusi: e.target.value })}
                placeholder="Tuliskan kendala bahan (misal serat rapuh, plastik melengkung, atau jahitan kendor) dan bagaimana kamu mengatasinya..."
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-amber-300 bg-white focus:ring-2 focus:ring-amber-500 leading-relaxed font-normal"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 3 */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-7 h-7 rounded-xl bg-cyan-700 text-white flex items-center justify-center font-black text-xs">
              3
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Uji Ergonomi, Kapasitas Beban Maksimal & Ketahanan Cuaca Lingkungan
              </h3>
              <p className="text-xs text-slate-500">
                Lakukan pengujian empiris terhadap ketangguhan fisik dan kelayakan pakai produk kriya daur ulangmu.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Uji Daya Tampung Beban (Muatan Maksimal & Kestabilan Sambungan):
              </label>
              <textarea
                rows={2}
                value={bagianTiga.ujiKapasitasBeban}
                onChange={e => setBagianTiga({ ...bagianTiga, ujiKapasitasBeban: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 leading-relaxed font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tingkat Kenyamanan Ergonomi Pemakai (Sentuhan Kulit & Bahu):
              </label>
              <textarea
                rows={2}
                value={bagianTiga.kenyamananPakai}
                onChange={e => setBagianTiga({ ...bagianTiga, kenyamananPakai: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 leading-relaxed font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Daya Tahan Terhadap Gesekan, Air, Kelembapan Udara & Pencegahan Jamur:
              </label>
              <textarea
                rows={2}
                value={bagianTiga.ketahananCuaca}
                onChange={e => setBagianTiga({ ...bagianTiga, ketahananCuaca: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-cyan-500 leading-relaxed font-normal"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 4 */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-7 h-7 rounded-xl bg-slate-700 text-white flex items-center justify-center font-black text-xs">
              4
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Keselamatan & Kesehatan Kerja (K3) serta Pengelolaan Sisa Daur Ulang (Zero-Waste)
              </h3>
              <p className="text-xs text-slate-500">
                Pastikan proses berkarya kriya aman bagi diri sendiri dan tidak menciptakan timbulan sampah baru.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Penerapan Standar K3 saat Menggunakan Pisau/Cutter/Lem Panas:
              </label>
              <textarea
                rows={2}
                value={bagianEmpat.penerapanK3}
                onChange={e => setBagianEmpat({ ...bagianEmpat, penerapanK3: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-500 leading-relaxed font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pengelolaan Residu / Serat Potongan Sisa Berkarya (Zero-Waste):
              </label>
              <textarea
                rows={2}
                value={bagianEmpat.pengelolaanSisa}
                onChange={e => setBagianEmpat({ ...bagianEmpat, pengelolaanSisa: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-500 leading-relaxed font-normal"
              />
            </div>
          </div>
        </div>

        {/* ACTION BAR */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="w-4 h-4 text-slate-400" />
            {lastAutoSave ? (
              <span>Draf tersimpan otomatis pukul <strong>{lastAutoSave}</strong></span>
            ) : (
              <span>Draf tersimpan aman di peramban dan akun Anda</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Cetak LKPD 2</span>
            </button>

            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Menyimpan ke Server...</span>
                </>
              ) : savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-teal-200" />
                  <span>Berhasil Tersimpan!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan LKPD 2 Unit 3</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
