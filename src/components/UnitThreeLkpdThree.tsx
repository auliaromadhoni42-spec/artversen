import React, { useState, useEffect } from 'react';
import {
  FileText,
  Printer,
  CheckCircle2,
  Sparkles,
  Eye,
  Award,
  Save,
  Clock,
  ShieldCheck,
  TrendingUp,
  Tag,
  Star,
  Users,
  Compass,
  Info
} from 'lucide-react';
import { User, LkpdQuestion } from '../types';

interface UnitThreeLkpdThreeProps {
  user: User;
  levelId: string;
  status: 'locked' | 'unlocked' | 'completed';
  questions: LkpdQuestion[];
  initialAnswers: Record<string, string>;
  onSave: (compiledAnswers: Record<string, string>) => Promise<void>;
  saving: boolean;
}

export const UnitThreeLkpdThree: React.FC<UnitThreeLkpdThreeProps> = ({
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

  // Bagian 1: Teknik Pelapisan Finishing Estetis & Keamanan Pakai
  const [bagianSatu, setBagianSatu] = useState({
    jenisBahanPelapis: 'Pernis Kayu Bening Ramah Lingkungan Berbasis Air (Water-Based Clear Varnish Doff) & Lilin Alami (Beeswax)',
    teknikPenyempurnaan: 'Memangkas sisa serat pelepah kasar dengan gunting bordir presisi, mengamplas halus tepi lipatan dengan amplas nomor 400, lalu mengoleskan 2 lapis pernis doff transparan agar serat kedap air tanpa bau kimia menyengat.',
    standarKeamananPakai: 'Seluruh bagian dalam tas dilapisi kain furing katun halus daur ulang sehingga aman dan lembut bagi jemari pengguna saat mengambil barang, serta tidak terdapat sudut kawat atau ujung perekat yang runcing menusuk.'
  });

  // Bagian 2: Penataan Display Pameran 3D & Label Kuratorial Resmi
  const [bagianDua, setBagianDua] = useState({
    konsepDisplay360: 'Karya diletakkan di atas pedestal kayu setinggi 90 cm dengan alas kain goni krem netral, sehingga pengunjung pameran sekolah dapat mengitari dan mengamati volume karya dari segala arah 360 derajat.',
    pencahayaanPameran: 'Menggunakan lampu spotlight LED warm-white (3000K) dari sudut kemiringan 45 derajat bagian atas depan untuk memunculkan bayangan gradasi tekstur anyaman pelepah secara dramatis.',
    labelKuratorial: `JUDUL KARYA: "Lentera Bumi: Anyaman Serat Lestari"
NAMA PERAJIN: ${user.nama || 'Siswa Kelas XI'} (${user.kelas || 'XI MIPA'})
MEDIUM/BAHAN: Pelepah Pisang Kering, Kantong Kresek Daur Ulang, Rangka Karton Duplex & Varnish Alami
DIMENSI: 24 cm x 8 cm x 18 cm (Kriya Fashion Tiga Dimensi)
DESKRIPSI KURATORIAL: Karya ini merupakan manifestasi kriya fashion sirkular yang membuktikan bahwa pelepah pisang yang kerap dianggap sampah kebun dapat bertransformasi menjadi produk bernilai estetik tinggi dengan fungsionalitas modern yang tangguh.`
  });

  // Bagian 3: Asesmen Antarteman (Peer-Review)
  const [bagianTiga, setBagianTiga] = useState({
    namaPenilai: 'Bima Pratama (Teman Sekelas XI)',
    skorKerapian: '4.8 / 5.0 (Anyaman sangat rapat dan sambungan sudut terkunci simetris)',
    skorKekuatan3D: '4.9 / 5.0 (Konstruksi ruang kokoh dan tidak reyot saat diisi barang)',
    masukanSaran: 'Karya sangat inspiratif! Usulan perbaikan kecil: tambahkan saku resleting kecil di bagian dinding dalam tas agar uang koin atau kartu tidak tercecer.'
  });

  // Bagian 4: Peluang Kewirausahaan & Refleksi Circular Economy
  const [bagianEmpat, setBagianEmpat] = useState({
    analisisNilaiJual: 'Biaya modal bahan limbah dan perekat/pernis berkisar Rp 15.000. Dengan kualitas kerapian anyaman dan nilai cerita ekologis (eco-storytelling), produk ini layak dijual di bazar sekolah atau etalase daring dengan harga Rp 65.000 - Rp 85.000 (margin keuntungan sehat).',
    refleksiBerkelanjutan: 'Proyek berkarya kriya 3 dimensi ini membukakan mata saya bahwa limbah bukan sekadar sampah kotor, melainkan sumber daya rupa yang menunggu kreativitas kita. Melalui seni terapan, kita tidak hanya berkarya demi estetika, melainkan juga mengambil aksi nyata menyelamatkan bumi dari kepunahan ekologis.'
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<string | null>(null);

  // Load from localStorage or server initial answers
  useEffect(() => {
    const local = localStorage.getItem(`lkpd_unit_3_lkpd3_${user.id}`);
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
        console.error('Failed to parse local draft Unit 3 LKPD 3', e);
      }
    }

    if (initialAnswers['q-3-7']) {
      setBagianSatu(prev => ({
        ...prev,
        jenisBahanPelapis: initialAnswers['q-3-7'] || prev.jenisBahanPelapis
      }));
    }
  }, [user.id, initialAnswers]);

  // Handle Save
  const handleSaveDraft = async () => {
    // 1. Compile formatted text for questions q-3-7, q-3-8, q-3-9
    const compiledQ7 = `[TEKNIK PELAPISAN FINISHING ESTETIS & STANDAR KEAMANAN]
Bahan Pelapis Akhir (Varnish / Coating): ${bagianSatu.jenisBahanPelapis}
Teknik Penyempurnaan Permukaan & Finishing: ${bagianSatu.teknikPenyempurnaan}
Standar Keamanan Pakai & Higienitas Kulit: ${bagianSatu.standarKeamananPakai}`;

    const compiledQ8 = `[PENATAAN DISPLAY PAMERAN 3D & LABEL KURATORIAL]
Konsep Penataan Display 360 Derajat: ${bagianDua.konsepDisplay360}
Teknik Pencahayaan Spotting: ${bagianDua.pencahayaanPameran}
Label & Narasi Kuratorial Resmi:
${bagianDua.labelKuratorial}`;

    const compiledQ9 = `[PEER-REVIEW, KEWIRAUSAHAAN & REFLEKSI CIRCULAR ECONOMY]
Penilai Sebaya: ${bagianTiga.namaPenilai}
Asesmen Kerapian: ${bagianTiga.skorKerapian} | Kekuatan 3D: ${bagianTiga.skorKekuatan3D}
Masukan Konstruktif: ${bagianTiga.masukanSaran}
Peluang Nilai Jual Hijau (Green Entrepreneurship): ${bagianEmpat.analisisNilaiJual}
Refleksi Gaya Hidup Berkelanjutan: ${bagianEmpat.refleksiBerkelanjutan}`;

    // 2. Save structured draft to localStorage
    const draftData = {
      identitas,
      bagianSatu,
      bagianDua,
      bagianTiga,
      bagianEmpat,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(`lkpd_unit_3_lkpd3_${user.id}`, JSON.stringify(draftData));

    // 3. Save to backend answers
    await onSave({
      'q-3-7': compiledQ7,
      'q-3-8': compiledQ8,
      'q-3-9': compiledQ9
    });

    setSavedSuccess(true);
    setLastAutoSave(new Date().toLocaleTimeString('id-ID'));
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER LKPD 3 */}
      <div className="bg-gradient-to-r from-green-800 via-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-green-100 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>LKPD 3 • Unit 3: Seni Rupa 3 Dimensi Daur Ulang</span>
          </div>
          
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black font-serif tracking-tight leading-snug">
            Finishing Estetis, Display Pameran 360°, Asesmen Antarteman & Refleksi Circular Economy
          </h1>
          
          <p className="text-green-100/90 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Sempurnakan karya 3 dimensi dengan pernis pelindung alami, tata display pameran 360 derajat lengkap dengan label kuratorial, lakukan evaluasi antarteman, dan telusuri potensi kewirausahaan daur ulang hijau.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-medium text-green-100">
            <span className="flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Pelapis Vernis Alami
            </span>
            <span className="flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-lg">
              <Eye className="w-3.5 h-3.5 text-emerald-300" /> Display 360° & Kuratorial
            </span>
            <span className="flex items-center gap-1 bg-black/20 px-2.5 py-1 rounded-lg">
              <TrendingUp className="w-3.5 h-3.5 text-teal-300" /> Circular Economy & Bisnis Hijau
            </span>
          </div>
        </div>
      </div>

      {/* FORM LEMBAR KERJA */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
        {/* IDENTITAS SISWA */}
        <div className="p-5 rounded-2xl bg-green-50/50 border border-green-100/80">
          <h3 className="text-xs font-black text-green-950 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-green-600" />
            Identitas Peserta Didik (Siswa SMANEB)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={identitas.nama}
                onChange={e => setIdentitas({ ...identitas, nama: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Kelas</label>
              <input
                type="text"
                value={identitas.kelas}
                onChange={e => setIdentitas({ ...identitas, kelas: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Nomor Absen</label>
              <input
                type="text"
                placeholder="Contoh: 14"
                value={identitas.noAbsen}
                onChange={e => setIdentitas({ ...identitas, noAbsen: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Tanggal Pengisian</label>
              <input
                type="text"
                value={identitas.tanggal}
                onChange={e => setIdentitas({ ...identitas, tanggal: e.target.value })}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 1 */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-7 h-7 rounded-xl bg-green-700 text-white flex items-center justify-center font-black text-xs">
              1
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Teknik Pelapisan Finishing Estetis & Standar Keamanan Pakai
              </h3>
              <p className="text-xs text-slate-500">
                Lakukan proses sentuhan akhir karya agar awet, tahan cuaca, bertekstur nyaman, dan aman bagi pengguna.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Bahan Pelapis Akhir yang Digunakan (Varnish / Coating / Cat Aksen):
              </label>
              <input
                type="text"
                value={bagianSatu.jenisBahanPelapis}
                onChange={e => setBagianSatu({ ...bagianSatu, jenisBahanPelapis: e.target.value })}
                placeholder="Contoh: Pernis water-based ramah lingkungan, lilin beeswax alami, atau coating anti-jamur"
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Prosedur Pemangkasan Serat Kasar & Penghalusan Permukaan:
              </label>
              <textarea
                rows={2}
                value={bagianSatu.teknikPenyempurnaan}
                onChange={e => setBagianSatu({ ...bagianSatu, teknikPenyempurnaan: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 leading-relaxed font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pemeriksaan Keamanan & Kenyamanan Sentuhan Kulit:
              </label>
              <textarea
                rows={2}
                value={bagianSatu.standarKeamananPakai}
                onChange={e => setBagianSatu({ ...bagianSatu, standarKeamananPakai: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-green-500 leading-relaxed font-normal"
              />
            </div>
          </div>
        </div>

        {/* BAGIAN 2 */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-7 h-7 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-xs">
              2
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Penataan Display Pameran 3 Dimensi (360° Viewing) & Label Kuratorial Resmi
              </h3>
              <p className="text-xs text-slate-500">
                Rancang display yang memungkinkan pengunjung menikmati wujud 3 dimensi dari berbagai sudut pandang.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Konsep Penataan Display 3 Dimensi (Pedestal / Meja Display):
              </label>
              <textarea
                rows={3}
                value={bagianDua.konsepDisplay360}
                onChange={e => setBagianDua({ ...bagianDua, konsepDisplay360: e.target.value })}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 leading-relaxed font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pengaturan Sudut Pencahayaan (Spotlighting & Aksen Bayangan):
              </label>
              <textarea
                rows={3}
                value={bagianDua.pencahayaanPameran}
                onChange={e => setBagianDua({ ...bagianDua, pencahayaanPameran: e.target.value })}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 leading-relaxed font-normal"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              Label Karya & Narasi Kuratorial Resmi Pameran:
            </label>
            <textarea
              rows={5}
              value={bagianDua.labelKuratorial}
              onChange={e => setBagianDua({ ...bagianDua, labelKuratorial: e.target.value })}
              className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            />
          </div>
        </div>

        {/* BAGIAN 3 */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <span className="w-7 h-7 rounded-xl bg-teal-700 text-white flex items-center justify-center font-black text-xs">
              3
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Lembar Ulasan Asesmen Antarteman (Peer-Review) Karya 3 Dimensi
              </h3>
              <p className="text-xs text-slate-500">
                Dapatkan evaluasi kritis dan apresiasi konstruktif dari rekan belajarmu di kelas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Rekan Penilai (Peer Reviewer):
              </label>
              <input
                type="text"
                value={bagianTiga.namaPenilai}
                onChange={e => setBagianTiga({ ...bagianTiga, namaPenilai: e.target.value })}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Skor / Penilaian Kerapian Anyaman & Detail:
              </label>
              <input
                type="text"
                value={bagianTiga.skorKerapian}
                onChange={e => setBagianTiga({ ...bagianTiga, skorKerapian: e.target.value })}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Skor / Penilaian Kekokohan Bentuk Ruang 3D:
              </label>
              <input
                type="text"
                value={bagianTiga.skorKekuatan3D}
                onChange={e => setBagianTiga({ ...bagianTiga, skorKekuatan3D: e.target.value })}
                className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Catatan Masukan Konstruktif & Ide Pengembangan dari Rekan:
            </label>
            <textarea
              rows={2}
              value={bagianTiga.masukanSaran}
              onChange={e => setBagianTiga({ ...bagianTiga, masukanSaran: e.target.value })}
              className="w-full text-xs px-3.5 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 leading-relaxed font-normal"
            />
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
                Peluang Kewirausahaan Hijau (*Circular Economy*) & Refleksi Gaya Hidup Berkelanjutan
              </h3>
              <p className="text-xs text-slate-500">
                Ukur potensi ekonomi kreatif produk upcycling dan rumuskan komitmenmu sebagai duta kelestarian lingkungan.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Analisis Potensi Nilai Jual Produk Kriya Daur Ulang (Biaya Produksi vs Harga Jual Wajar):
              </label>
              <textarea
                rows={2}
                value={bagianEmpat.analisisNilaiJual}
                onChange={e => setBagianEmpat({ ...bagianEmpat, analisisNilaiJual: e.target.value })}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 leading-relaxed font-normal"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Refleksi Makna Berkreasi dengan Sampah bagi Pelestarian Lingkungan Hidup:
              </label>
              <textarea
                rows={3}
                value={bagianEmpat.refleksiBerkelanjutan}
                onChange={e => setBagianEmpat({ ...bagianEmpat, refleksiBerkelanjutan: e.target.value })}
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
              <span>Cetak LKPD 3</span>
            </button>

            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-xs font-bold shadow-md shadow-green-200 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Menyimpan ke Server...</span>
                </>
              ) : savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-200" />
                  <span>Berhasil Tersimpan!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan LKPD 3 Unit 3</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
