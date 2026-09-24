import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  CheckCircle2,
  Sparkles,
  Box,
  Layers,
  Save,
  Clock,
  ShieldCheck,
  Lightbulb,
  Leaf,
  Recycle,
  Info
} from 'lucide-react';
import { User, LkpdQuestion } from '../types';

interface UnitThreeLkpdOneProps {
  user: User;
  levelId: string;
  status: 'locked' | 'unlocked' | 'completed';
  questions: LkpdQuestion[];
  initialAnswers: Record<string, string>;
  onSave: (compiledAnswers: Record<string, string>) => Promise<void>;
  saving: boolean;
}

export const UnitThreeLkpdOne: React.FC<UnitThreeLkpdOneProps> = ({
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

  // Bagian 1: Karakteristik Bahan Limbah Pilihan
  const [bagianSatu, setBagianSatu] = useState({
    bahanPilihan: 'Pelepah Pisang Kering & Kantong Kresek Daur Ulang (Fused Plastic)',
    kondisiSumber: 'Pelepah pisang diambil dari kebun pekarangan warga sekitar yang sudah gugur mengering alami, dipadukan dengan kantong kresek bekas belanja rumah tangga.',
    alasanPilihan: 'Pelepah pisang memiliki serat alami yang ulet, bertekstur eksotis, dan warna cokelat gradasi hangat, sedangkan kantong kresek memberikan lapisan kedap air sintetis yang kuat.'
  });

  // Bagian 2: Konseptualisasi Produk Kriya Fashion 3D
  const [bagianDua, setBagianDua] = useState({
    jenisProduk: 'Tas Selempang Etnik Ramah Lingkungan (Eco-Fashion Sling Bag)',
    ukuranDimensi: 'Panjang 24 cm x Lebar 8 cm x Tinggi 18 cm (Volumetrik 3 Dimensi beruang nyata)',
    konsepDesain: 'Bentuk kotak persegi kokoh bergaya kontemporer dengan penutup magnetik tersembunyi, memadukan anyaman serat pelepah pisang kepang tiga dengan aksen tali selempang fused plastic rajut.'
  });

  // Bagian 3: Pelaksanaan 5 Langkah Siklus Daur Ulang
  const [bagianTiga, setBagianTiga] = useState({
    tahapPengumpulan: 'Mengumpulkan 15 pelepah pisang kering dari kebun dan 20 lembar kantong kresek polietilena bersih dari bank sampah keluarga.',
    tahapPemilahan: 'Memilah pelepah yang bebas jamur lapuk dan kantong plastik yang memiliki ketebalan seragam tanpa kontaminasi minyak.',
    tahapPembersihan: 'Membersihkan pelepah dengan lap basah berantiseptik, disikat halus, lalu diangin-anginkan. Kantong kresek dicuci sabun dan dikeringkan di tempat teduh.',
    tahapPengolahan: 'Menyayat pelepah menjadi pita serat selebar 1,5 cm lalu dipilin ganda. Plastik kresek dilapis 4 lapis dan disetrika dengan alas kertas kalkir menjadi lembaran kulit sintetis liat.',
    tahapPembuatan: 'Menganyam serat pelepah pada pola kardus 3D, menyatukan sudut ruang menggunakan lem kayu PVA dan perekat jahit nilon, lalu memasang penutup serta tali selempang.'
  });

  // Bagian 4: Analisis Nilai Guna vs Nilai Estetika Ruang 3D
  const [bagianEmpat, setBagianEmpat] = useState({
    nilaiGuna: 'Tas memiliki kapasitas volume nyata yang cukup untuk memuat smartphone, dompet saku, buku catatan kecil, dan botol minum portabel tanpa jebol.',
    nilaiEstetika: 'Keindahan tekstur rabaan serat alami yang kontras dengan aksen modern plastik fused, menciptakan tampilan visual 3 dimensi yang unik dari segala sudut pandang 360 derajat.',
    tinjauanErgonomi: 'Tali selempang dibuat lebar 3,5 cm agar tidak menekan bahu secara menyakitkan saat membawa beban hingga 1,5 kg.'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<string | null>(null);

  // Load from localStorage or server initial answers
  useEffect(() => {
    const local = localStorage.getItem(`lkpd_unit_3_lkpd1_${user.id}`);
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
        console.error('Failed to parse local draft Unit 3 LKPD 1', e);
      }
    }

    if (initialAnswers['q-3-1']) {
      // Existing server answer populate fallback
      setBagianSatu(prev => ({
        ...prev,
        alasanPilihan: initialAnswers['q-3-1'] || prev.alasanPilihan
      }));
    }
  }, [user.id, initialAnswers]);

  // Handle Save
  const handleSaveDraft = async () => {
    // 1. Compile formatted text for questions q-3-1, q-3-2, q-3-3
    const compiledQ1 = `[BAHAN LIMBAH & KONSEP KRIYA 3D]
Bahan Limbah Utama: ${bagianSatu.bahanPilihan}
Kondisi & Sumber Bahan: ${bagianSatu.kondisiSumber}
Alasan Pemilihan Bahan: ${bagianSatu.alasanPilihan}
Jenis Produk 3D: ${bagianDua.jenisProduk}
Dimensi Fisik (PxLxT): ${bagianDua.ukuranDimensi}
Konsep Desain Ruang: ${bagianDua.konsepDesain}`;

    const compiledQ2 = `[PROSEDUR 5 TAHAP SIKLUS DAUR ULANG]
1. Pengumpulan Limbah: ${bagianTiga.tahapPengumpulan}
2. Pemilahan Material: ${bagianTiga.tahapPemilahan}
3. Pembersihan & Pengeringan: ${bagianTiga.tahapPembersihan}
4. Pengolahan Bahan Baku (Pilin/Anyam/Fused): ${bagianTiga.tahapPengolahan}
5. Pembuatan & Konstruksi Wujud 3D: ${bagianTiga.tahapPembuatan}`;

    const compiledQ3 = `[ANALISIS NILAI GUNA VS ESTETIKA 3 DIMENSI]
Nilai Guna Fungsional: ${bagianEmpat.nilaiGuna}
Nilai Estetika Visual 360°: ${bagianEmpat.nilaiEstetika}
Tinjauan Kenyamanan / Ergonomi: ${bagianEmpat.tinjauanErgonomi}`;

    // 2. Save structured draft to localStorage
    const draftData = {
      identitas,
      bagianSatu,
      bagianDua,
      bagianTiga,
      bagianEmpat,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(`lkpd_unit_3_lkpd1_${user.id}`, JSON.stringify(draftData));

    // 3. Save to backend answers
    await onSave({
      'q-3-1': compiledQ1,
      'q-3-2': compiledQ2,
      'q-3-3': compiledQ3
    });

    setSavedSuccess(true);
    setLastAutoSave(new Date().toLocaleTimeString('id-ID'));
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER LKPD 1 */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-green-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-emerald-100 text-xs font-bold uppercase tracking-wider">
            <Box className="w-3.5 h-3.5 text-amber-300" />
            <span>LKPD 1 • Unit 3: Seni Rupa 3 Dimensi Daur Ulang</span>
          </div>
          
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black font-serif tracking-tight leading-snug">
            Eksplorasi Ide, Karakter Bahan Limbah & 5 Tahap Siklus Daur Ulang Kriya 3D
          </h1>
          
          <p className="text-emerald-100/90 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Rumuskan gagasan produk kriya tiga dimensi fungsional dari bahan limbah di sekitarmu (pelepah pisang, daun pandan, kantong kresek, kardus). Rancang alur 5 tahapan daur ulang dan seimbangkan nilai guna ergonomis dengan nilai estetika ruang nyata.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-emerald-100">
            <span className="flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-lg">
              <Leaf className="w-3.5 h-3.5 text-emerald-300" /> Kriya Fashion Ramah Lingkungan
            </span>
            <span className="flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-lg">
              <Recycle className="w-3.5 h-3.5 text-teal-300" /> 5 Siklus Daur Ulang Terpadu
            </span>
            <span className="flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Nilai Guna & Estetika 360°
            </span>
          </div>
        </div>
      </div>

      {/* FORM LEMBAR KERJA */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
        {/* IDENTITAS SISWA */}
        <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100/80">
          <h3 className="text-xs font-black text-emerald-950 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-emerald-600" />
            Identitas Peserta Didik (Siswa SMANEB)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={identitas.nama}
                onChange={e => setIdentitas({ ...identitas, nama: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Kelas</label>
              <input
                type="text"
                value={identitas.kelas}
                onChange={e => setIdentitas({ ...identitas, kelas: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Nomor Absen</label>
              <input
                type="text"
                placeholder="Contoh: 14"
                value={identitas.noAbsen}
                onChange={e => setIdentitas({ ...identitas, noAbsen: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Tanggal Pengisian</label>
              <input
                type="text"
                value={identitas.tanggal}
                onChange={e => setIdentitas({ ...identitas, tanggal: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 1 */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
              1
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Karakteristik Bahan Limbah Pilihan & Analisis Potensi Sekitar
              </h3>
              <p className="text-xs text-slate-500">
                Pilih dan deskripsikan material limbah yang melimpah di lingkungan sekitarmu (alamiah atau sintetis).
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bahan Limbah Utama yang Dipilih:
              </label>
              <input
                type="text"
                value={bagianSatu.bahanPilihan}
                onChange={e => setBagianSatu({ ...bagianSatu, bahanPilihan: e.target.value })}
                placeholder="Contoh: Pelepah pisang kering, daun pandan duri, kantong kresek LDPE, atau kardus duplex bekas"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kondisi Awal & Sumber Perolehan Bahan Limbah:
              </label>
              <textarea
                rows={2}
                value={bagianSatu.kondisiSumber}
                onChange={e => setBagianSatu({ ...bagianSatu, kondisiSumber: e.target.value })}
                placeholder="Jelaskan dari mana kamu mendapatkan bahan tersebut dan bagaimana kondisinya saat pertama ditemukan..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 leading-relaxed font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Alasan Memilih Bahan Tersebut Ditinjau dari Karakter Fisik & Daya Tarik Estetis:
              </label>
              <textarea
                rows={3}
                value={bagianSatu.alasanPilihan}
                onChange={e => setBagianSatu({ ...bagianSatu, alasanPilihan: e.target.value })}
                placeholder="Jelaskan kelenturan, kekuatan serat, tekstur rabaan alami, atau keunikan warna bahan..."
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 leading-relaxed font-normal"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 2 */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-7 h-7 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black text-xs">
              2
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Konseptualisasi Produk Kriya Tiga Dimensi Fungsional
              </h3>
              <p className="text-xs text-slate-500">
                Tentukan bentuk produk kriya bervolume ruang nyata yang ingin kamu wujudkan beserta rancangan dimensinya.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bentuk Produk Kriya yang Dirancang:
              </label>
              <input
                type="text"
                value={bagianDua.jenisProduk}
                onChange={e => setBagianDua({ ...bagianDua, jenisProduk: e.target.value })}
                placeholder="Contoh: Tas Selempang Etnik, Totebag Daur Ulang, Pouch Kosmetik, atau Dompet Koin"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Perkiraan Dimensi Ruang 3 Dimensi (Panjang x Lebar x Tinggi):
              </label>
              <input
                type="text"
                value={bagianDua.ukuranDimensi}
                onChange={e => setBagianDua({ ...bagianDua, ukuranDimensi: e.target.value })}
                placeholder="Contoh: 25 cm x 10 cm x 20 cm (Volume ruang nyata)"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Deskripsi Konsep Desain & Gaya Estetika Produk:
            </label>
            <textarea
              rows={3}
              value={bagianDua.konsepDesain}
              onChange={e => setBagianDua({ ...bagianDua, konsepDesain: e.target.value })}
              placeholder="Uraikan perpaduan pola anyaman, bentuk geometris atau organik, serta aksen detail produk..."
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 leading-relaxed font-normal"
            />
          </div>
        </div>

        {/* BAGIAN 3 */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-7 h-7 rounded-xl bg-green-600 text-white flex items-center justify-center font-black text-xs">
              3
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Penerapan Terstruktur 5 Langkah Siklus Daur Ulang Limbah
              </h3>
              <p className="text-xs text-slate-500">
                Rincikan langkah operasional yang kamu lakukan dari pengumpulan bahan baku hingga perakitan produk 3D.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tahap 1: Pengumpulan Limbah (Collection)
              </label>
              <input
                type="text"
                value={bagianTiga.tahapPengumpulan}
                onChange={e => setBagianTiga({ ...bagianTiga, tahapPengumpulan: e.target.value })}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tahap 2: Pemilahan Kualitas Bahan (Sorting)
              </label>
              <input
                type="text"
                value={bagianTiga.tahapPemilahan}
                onChange={e => setBagianTiga({ ...bagianTiga, tahapPemilahan: e.target.value })}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tahap 3: Pembersihan & Pengeringan Higienis (Cleaning & Drying)
              </label>
              <input
                type="text"
                value={bagianTiga.tahapPembersihan}
                onChange={e => setBagianTiga({ ...bagianTiga, tahapPembersihan: e.target.value })}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tahap 4: Pengolahan Menjadi Bahan Baku Siap Rangkai (Processing / Anyam / Fused)
              </label>
              <input
                type="text"
                value={bagianTiga.tahapPengolahan}
                onChange={e => setBagianTiga({ ...bagianTiga, tahapPengolahan: e.target.value })}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tahap 5: Pembuatan Wujud Kriya 3 Dimensi (Assembly / Construction)
              </label>
              <input
                type="text"
                value={bagianTiga.tahapPembuatan}
                onChange={e => setBagianTiga({ ...bagianTiga, tahapPembuatan: e.target.value })}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 4 */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-7 h-7 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-xs">
              4
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Analisis Keseimbangan Nilai Guna (Ergonomi) vs Nilai Estetika Ruang Tiga Dimensi
              </h3>
              <p className="text-xs text-slate-500">
                Uji apakah karyamu tidak hanya indah dipandang dari berbagai sudut pandang, namun juga nyaman dan bermanfaat nyata.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nilai Guna Fungsional Praktis dalam Kehidupan Sehari-hari:
              </label>
              <textarea
                rows={2}
                value={bagianEmpat.nilaiGuna}
                onChange={e => setBagianEmpat({ ...bagianEmpat, nilaiGuna: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 leading-relaxed font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nilai Keindahan Estetika Ruang Tiga Dimensi (Tekstur, Harmoni Warna & Sudut Pandang 360°):
              </label>
              <textarea
                rows={2}
                value={bagianEmpat.nilaiEstetika}
                onChange={e => setBagianEmpat({ ...bagianEmpat, nilaiEstetika: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 leading-relaxed font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tinjauan Aspek Ergonomi (Kenyamanan, Keamanan & Ketahanan Pakai):
              </label>
              <textarea
                rows={2}
                value={bagianEmpat.tinjauanErgonomi}
                onChange={e => setBagianEmpat({ ...bagianEmpat, tinjauanErgonomi: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 leading-relaxed font-normal"
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
              <span>Cetak LKPD 1</span>
            </button>

            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Menyimpan ke Server...</span>
                </>
              ) : savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                  <span>Berhasil Tersimpan!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan LKPD 1 Unit 3</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
