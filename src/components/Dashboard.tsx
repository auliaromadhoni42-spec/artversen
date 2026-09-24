import React, { useEffect, useState } from 'react';
import { 
  Lock, 
  Unlock, 
  CheckCircle2, 
  PlayCircle, 
  ArrowRight, 
  Printer, 
  Award, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Layers, 
  FileText,
  AlertTriangle,
  UserCheck,
  BarChart3,
  TrendingUp,
  Gamepad2,
  Check,
  Video,
  ListChecks,
  Filter
} from 'lucide-react';
import { api } from '../api';
import { User, LkpdLevelListItem } from '../types';

interface DashboardProps {
  user: User;
  onSelectLevel: (levelId: string) => void;
  onOpenRekap: () => void;
  onOpenPrint: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  onSelectLevel,
  onOpenRekap,
  onOpenPrint
}) => {
  const [levels, setLevels] = useState<LkpdLevelListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'active' | 'completed'>('all');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.getLevels();
      setLevels(res.levels);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal memuat data level LKPD.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Overall Statistics
  const completedCount = levels.filter(l => l.status === 'completed').length;
  const totalLevels = levels.length || 5;
  const overallUnitPercentage = Math.round((completedCount / totalLevels) * 100);

  // Total tasks & answers calculated across all units
  const totalQuestionsAllUnits = levels.reduce((acc, lvl) => acc + (lvl.progress?.totalQuestions || 0), 0);
  const totalAnsweredAllUnits = levels.reduce((acc, lvl) => acc + (lvl.progress?.answeredQuestions || 0), 0);
  const overallLkpdPercentage = totalQuestionsAllUnits > 0
    ? Math.round((totalAnsweredAllUnits / totalQuestionsAllUnits) * 100)
    : 0;

  // Local storage check for instant client draft reflection (Unit 1 & Unit 2 sub-LKPDs)
  const hasLocalLkpd1 = Boolean(localStorage.getItem(`lkpd_unit_1_structured_${user.id}`));
  const hasLocalLkpd2 = Boolean(localStorage.getItem(`lkpd_unit_1_lkpd2_${user.id}`));
  const hasLocalLkpd3 = Boolean(localStorage.getItem(`lkpd_unit_1_lkpd3_${user.id}`));

  const hasLocalU2Lkpd1 = Boolean(localStorage.getItem(`lkpd_unit_2_lkpd1_${user.id}`));
  const hasLocalU2Lkpd2 = Boolean(localStorage.getItem(`lkpd_unit_2_lkpd2_${user.id}`));
  const hasLocalU2Lkpd3 = Boolean(localStorage.getItem(`lkpd_unit_2_lkpd3_${user.id}`));

  const hasLocalU3Lkpd1 = Boolean(localStorage.getItem(`lkpd_unit_3_lkpd1_${user.id}`));
  const hasLocalU3Lkpd2 = Boolean(localStorage.getItem(`lkpd_unit_3_lkpd2_${user.id}`));
  const hasLocalU3Lkpd3 = Boolean(localStorage.getItem(`lkpd_unit_3_lkpd3_${user.id}`));

  const hasLocalU4Lkpd1 = Boolean(localStorage.getItem(`lkpd_unit_4_lkpd1_${user.id}`));
  const hasLocalU4Lkpd2 = Boolean(localStorage.getItem(`lkpd_unit_4_lkpd2_${user.id}`));
  const hasLocalU4Lkpd3 = Boolean(localStorage.getItem(`lkpd_unit_4_lkpd3_${user.id}`));

  const hasLocalU5Lkpd1 = Boolean(localStorage.getItem(`lkpd_unit_5_lkpd1_${user.id}`));
  const hasLocalU5Lkpd2 = Boolean(localStorage.getItem(`lkpd_unit_5_lkpd2_${user.id}`));
  const hasLocalU5Lkpd3 = Boolean(localStorage.getItem(`lkpd_unit_5_lkpd3_${user.id}`));

  const handleCardClick = (level: LkpdLevelListItem) => {
    if (level.status === 'locked') {
      setErrorMessage(
        `Unit ${level.level} masih TERKUNCI! Sesuai aturan pembelajaran berurutan, Anda wajib menyelesaikan Unit ${level.level - 1} terlebih dahulu.`
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setErrorMessage(null);
    onSelectLevel(level.id);
  };

  // Filtered levels for tab switching
  const filteredLevels = levels.filter(lvl => {
    if (filterMode === 'active') return lvl.status === 'unlocked';
    if (filterMode === 'completed') return lvl.status === 'completed';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Alert message if user attempts to click a locked level */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-start justify-between gap-3 shadow-xs animate-fadeIn">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-900">Perhatian Akses Berurutan</p>
              <p className="text-xs text-amber-700 mt-0.5">{errorMessage}</p>
            </div>
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-xs text-amber-600 hover:text-amber-900 font-semibold px-2 py-1 rounded-md hover:bg-amber-100"
          >
            Tutup
          </button>
        </div>
      )}

      {/* User Identity & Progress Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white p-6 sm:p-8 shadow-xl border border-indigo-900/50">
        {/* Background decorative shapes */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-gradient-to-tr from-pink-500/20 to-indigo-500/20 blur-3xl pointer-events-none" />
        <div className="absolute left-1/2 top-0 w-64 h-64 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-3">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Sesi Siswa Aktif: {user.kelas}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif text-white">
              Selamat Datang, {user.nama}
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Pantau progres belajar setiap unit secara real-time. Kerjakan modul, kuis, dan lembar kerja LKPD Seni Rupa Kelas XI Fase F secara bertahap.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenRekap}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all hover:scale-105 cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Lihat Rekap Hasil</span>
            </button>

            <button
              onClick={onOpenPrint}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-900/40 transition-all hover:scale-105 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak LKPD (PDF)</span>
            </button>
          </div>
        </div>

        {/* Big Overall Progress Bar Component */}
        <div className="relative z-10 mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs mb-2.5 gap-1.5">
            <span className="font-semibold text-slate-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Total Capaian Kurikulum Pembelajaran Seni Rupa
            </span>
            <div className="flex items-center gap-3 font-bold">
              <span className="text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {completedCount} dari {totalLevels} Unit Tuntas
              </span>
              <span className="text-purple-300">
                • {totalAnsweredAllUnits} Tugas LKPD Terisi ({overallLkpdPercentage}%)
              </span>
              <span className="text-amber-300 font-extrabold bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                {overallUnitPercentage}% Selesai
              </span>
            </div>
          </div>
          
          <div className="w-full h-3.5 rounded-full bg-slate-800/90 overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 transition-all duration-700 shadow-sm"
              style={{ width: `${overallUnitPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* LEARNING PROGRESS ANALYTICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Unit Selesai */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Unit Kurikulum
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
              {completedCount} / {totalLevels}
            </span>
            <span className="text-xs text-emerald-600 font-semibold block">
              {completedCount === totalLevels ? 'Semua Unit Tuntas 🌟' : `${totalLevels - completedCount} Unit Tersisa`}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg border border-emerald-100">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Total Tugas LKPD */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Tugas LKPD Terjawab
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
              {totalAnsweredAllUnits} <span className="text-xs font-normal text-slate-400">/ {totalQuestionsAllUnits} Soal</span>
            </span>
            <span className="text-xs text-indigo-600 font-semibold block">
              {overallLkpdPercentage}% Terjawab di Database
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg border border-indigo-100">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Unit Sedang Aktif */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Unit Fokus Aktif
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
              {levels.find(l => l.status === 'unlocked') ? `Unit 0${levels.find(l => l.status === 'unlocked')?.level}` : 'Tuntas!'}
            </span>
            <span className="text-xs text-purple-600 font-semibold block line-clamp-1">
              {levels.find(l => l.status === 'unlocked')?.tema || 'Seluruh Modul Selesai'}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg border border-purple-100">
            <PlayCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Status Kelulusan / Predikat */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Predikat Progres
            </span>
            <span className="text-lg sm:text-xl font-black text-slate-900 font-serif">
              {overallUnitPercentage >= 100 ? 'Master Rupa 🏆' : overallUnitPercentage >= 50 ? 'Pengkarya Mahir ✨' : 'Penjelajah Seni 🌱'}
            </span>
            <span className="text-xs text-amber-600 font-semibold block">
              Fase F • Kelas XI SMA
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg border border-amber-100">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Sequential Level Rule Notice */}
      <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
            XI
          </div>
          <div>
            <p className="text-xs font-bold text-indigo-950">Aturan Pembelajaran Berurutan (Sequential Unlock)</p>
            <p className="text-[11px] text-indigo-700">
              Unit berikutnya hanya terbuka setelah unit sebelumnya berhasil diselesaikan dan disimpan ke database.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800">
            <PlayCircle className="w-3.5 h-3.5" /> Terbuka
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-200 text-slate-700">
            <Lock className="w-3.5 h-3.5" /> Terkunci
          </span>
        </div>
      </div>

      {/* Level List / Cards Section with Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 font-serif flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              Daftar Modul & Pelacak Kemajuan Belajar Tiap Unit
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Lihat persentase penyelesaian modul, aktivitas belajar, dan pengisian lembar kerja LKPD.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterMode === 'all' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({levels.length})
            </button>
            <button
              onClick={() => setFilterMode('active')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterMode === 'active' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Aktif ({levels.filter(l => l.status === 'unlocked').length})
            </button>
            <button
              onClick={() => setFilterMode('completed')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filterMode === 'completed' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Selesai ({levels.filter(l => l.status === 'completed').length})
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="inline-block w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-sm font-medium">Memuat data modul dan progres belajar...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {filteredLevels.map((lvl) => {
              const isCompleted = lvl.status === 'completed';
              const isUnlocked = lvl.status === 'unlocked';
              const isLocked = lvl.status === 'locked';

              // Calculate metrics from server progress or local sync
              const prog = lvl.progress;
              const answeredQuestions = prog?.answeredQuestions || 0;
              const totalQuestions = prog?.totalQuestions || 0;
              
              // Compute dynamic percentage
              let unitProgressPercent = 0;
              if (isCompleted) {
                unitProgressPercent = 100;
              } else if (isUnlocked) {
                if (lvl.level === 1) {
                  // If Unit 1, check sub-LKPDs (LKPD 1, 2, 3)
                  const subCount = [
                    hasLocalLkpd1 || (prog?.lkpdBreakdown?.subStages[0]?.completed),
                    hasLocalLkpd2 || (prog?.lkpdBreakdown?.subStages[1]?.completed),
                    hasLocalLkpd3 || (prog?.lkpdBreakdown?.subStages[2]?.completed)
                  ].filter(Boolean).length;
                  
                  if (subCount > 0) {
                    unitProgressPercent = Math.round((subCount / 3) * 100);
                  } else if (answeredQuestions > 0) {
                    unitProgressPercent = Math.round((answeredQuestions / (totalQuestions || 14)) * 100);
                  } else {
                    unitProgressPercent = 15; // exploration started
                  }
                } else if (lvl.level === 2) {
                  // If Unit 2, check sub-LKPDs (LKPD 1, 2, 3)
                  const subCountU2 = [
                    hasLocalU2Lkpd1 || (prog?.lkpdBreakdown?.subStages[0]?.completed),
                    hasLocalU2Lkpd2 || (prog?.lkpdBreakdown?.subStages[1]?.completed),
                    hasLocalU2Lkpd3 || (prog?.lkpdBreakdown?.subStages[2]?.completed)
                  ].filter(Boolean).length;

                  if (subCountU2 > 0) {
                    unitProgressPercent = Math.round((subCountU2 / 3) * 100);
                  } else if (answeredQuestions > 0) {
                    unitProgressPercent = Math.round((answeredQuestions / (totalQuestions || 10)) * 100);
                  } else {
                    unitProgressPercent = 15;
                  }
                } else if (lvl.level === 3) {
                  // If Unit 3, check sub-LKPDs (LKPD 1, 2, 3)
                  const subCountU3 = [
                    hasLocalU3Lkpd1 || (prog?.lkpdBreakdown?.subStages[0]?.completed),
                    hasLocalU3Lkpd2 || (prog?.lkpdBreakdown?.subStages[1]?.completed),
                    hasLocalU3Lkpd3 || (prog?.lkpdBreakdown?.subStages[2]?.completed)
                  ].filter(Boolean).length;

                  if (subCountU3 > 0) {
                    unitProgressPercent = Math.round((subCountU3 / 3) * 100);
                  } else if (answeredQuestions > 0) {
                    unitProgressPercent = Math.round((answeredQuestions / (totalQuestions || 9)) * 100);
                  } else {
                    unitProgressPercent = 15;
                  }
                } else if (lvl.level === 4) {
                  // If Unit 4, check sub-LKPDs (LKPD 1, 2, 3)
                  const subCountU4 = [
                    hasLocalU4Lkpd1 || (prog?.lkpdBreakdown?.subStages[0]?.completed),
                    hasLocalU4Lkpd2 || (prog?.lkpdBreakdown?.subStages[1]?.completed),
                    hasLocalU4Lkpd3 || (prog?.lkpdBreakdown?.subStages[2]?.completed)
                  ].filter(Boolean).length;

                  if (subCountU4 > 0) {
                    unitProgressPercent = Math.round((subCountU4 / 3) * 100);
                  } else if (answeredQuestions > 0) {
                    unitProgressPercent = Math.round((answeredQuestions / (totalQuestions || 9)) * 100);
                  } else {
                    unitProgressPercent = 15;
                  }
                } else if (lvl.level === 5) {
                  // If Unit 5, check sub-LKPDs (LKPD 1, 2, 3)
                  const subCountU5 = [
                    hasLocalU5Lkpd1 || (prog?.lkpdBreakdown?.subStages[0]?.completed),
                    hasLocalU5Lkpd2 || (prog?.lkpdBreakdown?.subStages[1]?.completed),
                    hasLocalU5Lkpd3 || (prog?.lkpdBreakdown?.subStages[2]?.completed)
                  ].filter(Boolean).length;

                  if (subCountU5 > 0) {
                    unitProgressPercent = Math.round((subCountU5 / 3) * 100);
                  } else if (answeredQuestions > 0) {
                    unitProgressPercent = Math.round((answeredQuestions / (totalQuestions || 9)) * 100);
                  } else {
                    unitProgressPercent = 15;
                  }
                } else {
                  unitProgressPercent = prog?.overallPercentage || (totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 20);
                }
              }

              // Clamp 0 to 100
              unitProgressPercent = Math.min(100, Math.max(0, unitProgressPercent));

              return (
                <div
                  key={lvl.id}
                  onClick={() => handleCardClick(lvl)}
                  className={`group relative rounded-3xl border p-5 sm:p-7 transition-all cursor-pointer ${
                    isCompleted
                      ? 'bg-white border-emerald-200/90 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-500/5'
                      : isUnlocked
                      ? 'bg-white border-indigo-300/90 shadow-md shadow-indigo-100/60 hover:border-indigo-400 hover:shadow-xl'
                      : 'bg-slate-50/70 border-slate-200 opacity-80 hover:border-slate-300'
                  }`}
                >
                  {/* MAIN CARD HEADER */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Level Icon Badge */}
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-lg shrink-0 shadow-sm transition-transform group-hover:scale-105 ${
                          isCompleted
                            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-200'
                            : isUnlocked
                            ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-indigo-200 ring-4 ring-indigo-50'
                            : 'bg-slate-300 text-slate-600'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-7 h-7" />
                        ) : isUnlocked ? (
                          <span>0{lvl.level}</span>
                        ) : (
                          <Lock className="w-6 h-6" />
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                            {lvl.tema}
                          </span>
                          {/* Status Badge */}
                          {isCompleted && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3" /> SELESAI
                            </span>
                          )}
                          {isUnlocked && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                              <PlayCircle className="w-3 h-3" /> TERBUKA (AKTIF)
                            </span>
                          )}
                          {isLocked && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 text-slate-700 border border-slate-300">
                              <Lock className="w-3 h-3" /> TERKUNCI
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors font-serif">
                          Unit {lvl.level}: {lvl.judul}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 max-w-3xl leading-relaxed">
                          {lvl.deskripsi}
                        </p>

                        {isCompleted && lvl.completed_at && (
                          <p className="text-[11px] text-emerald-700 font-semibold pt-1 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> Diselesaikan pada:{' '}
                            {new Date(lvl.completed_at).toLocaleString('id-ID', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="w-full sm:w-auto pt-2 sm:pt-0 flex justify-end shrink-0">
                      {isCompleted ? (
                        <button
                          type="button"
                          className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Tinjau / Edit LKPD</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : isUnlocked ? (
                        <button
                          type="button"
                          className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition-all hover:scale-105 cursor-pointer"
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span>Lanjutkan Pembelajaran</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <div className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-medium text-slate-500 bg-slate-100 flex items-center justify-center gap-1.5">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Buka dengan Selesaikan Unit {lvl.level - 1}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* VISUAL LEARNING PROGRESS TRACKER FOR THIS UNIT */}
                  <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
                    {/* Header Tracker Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span className="text-xs font-bold text-slate-800">
                          Pelacak Kemajuan Pembelajaran (Learning Progress):
                        </span>
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                            isCompleted
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : isUnlocked
                              ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                              : 'bg-slate-100 text-slate-500 border-slate-200'
                          }`}
                        >
                          {isCompleted ? '100% Tuntas' : isUnlocked ? `${unitProgressPercent}% Selesai` : '0% Terkunci'}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="font-semibold text-slate-700 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-indigo-500" />
                          Lembar LKPD: <strong className="text-indigo-600 font-extrabold">{isCompleted ? totalQuestions : answeredQuestions}</strong> / {totalQuestions} Tugas
                        </span>
                      </div>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="w-full h-3 rounded-full bg-slate-100 p-0.5 border border-slate-200/80 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          isCompleted
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                            : isUnlocked
                            ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 animate-pulse'
                            : 'bg-slate-300'
                        }`}
                        style={{ width: `${isLocked ? 0 : unitProgressPercent}%` }}
                      />
                    </div>

                    {/* Modular Breakdown Checklist Pills */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1 text-[11px]">
                      {/* Sub-item 1: Materi & Video */}
                      <div className={`p-2 rounded-xl border flex items-center gap-2 ${
                        isCompleted
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800'
                          : isUnlocked
                          ? 'bg-slate-50 border-slate-200 text-slate-700'
                          : 'bg-slate-50/50 border-slate-200/60 text-slate-400'
                      }`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                          isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {isCompleted ? <Check className="w-2.5 h-2.5" /> : '1'}
                        </div>
                        <span className="font-semibold truncate">Materi & Video Ajar</span>
                        <span className="text-[10px] ml-auto font-bold opacity-75">
                          {isCompleted ? 'Dipahami' : isUnlocked ? 'Tersedia' : 'Terkunci'}
                        </span>
                      </div>

                      {/* Sub-item 2: Kuis Pemahaman */}
                      <div className={`p-2 rounded-xl border flex items-center gap-2 ${
                        isCompleted
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800'
                          : isUnlocked
                          ? 'bg-slate-50 border-slate-200 text-slate-700'
                          : 'bg-slate-50/50 border-slate-200/60 text-slate-400'
                      }`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                          isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {isCompleted ? <Check className="w-2.5 h-2.5" /> : '2'}
                        </div>
                        <span className="font-semibold truncate">Kuis Interaktif</span>
                        <span className="text-[10px] ml-auto font-bold opacity-75">
                          {isCompleted ? 'Teruji' : isUnlocked ? '5 Soal' : '-'}
                        </span>
                      </div>

                      {/* Sub-item 3: Mini-Game Seni */}
                      <div className={`p-2 rounded-xl border flex items-center gap-2 ${
                        isCompleted
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800'
                          : isUnlocked
                          ? 'bg-slate-50 border-slate-200 text-slate-700'
                          : 'bg-slate-50/50 border-slate-200/60 text-slate-400'
                      }`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                          isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {isCompleted ? <Check className="w-2.5 h-2.5" /> : '3'}
                        </div>
                        <span className="font-semibold truncate">
                          {lvl.level === 1 ? 'Eco-Art Tetris' : 'Game Edukasi'}
                        </span>
                        <span className="text-[10px] ml-auto font-bold opacity-75">
                          {isCompleted ? 'Tuntas' : isUnlocked ? 'Mainkan' : '-'}
                        </span>
                      </div>

                      {/* Sub-item 4: Lembar LKPD */}
                      <div className={`p-2 rounded-xl border flex items-center gap-2 ${
                        isCompleted
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800'
                          : isUnlocked && (answeredQuestions > 0 || hasLocalLkpd1)
                          ? 'bg-indigo-50/60 border-indigo-200 text-indigo-800'
                          : isUnlocked
                          ? 'bg-slate-50 border-slate-200 text-slate-700'
                          : 'bg-slate-50/50 border-slate-200/60 text-slate-400'
                      }`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                          isCompleted 
                            ? 'bg-emerald-500 text-white' 
                            : isUnlocked && answeredQuestions > 0 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-slate-200 text-slate-600'
                        }`}>
                          {isCompleted ? <Check className="w-2.5 h-2.5" /> : '4'}
                        </div>
                        <span className="font-semibold truncate">
                          {[1, 2, 3, 4, 5].includes(lvl.level) ? 'Trilogi LKPD 1-3' : 'Formulir LKPD'}
                        </span>
                        <span className="text-[10px] ml-auto font-bold opacity-75">
                          {isCompleted 
                            ? 'Lengkap ✓' 
                            : lvl.level === 1 
                            ? `${[hasLocalLkpd1, hasLocalLkpd2, hasLocalLkpd3].filter(Boolean).length || (answeredQuestions > 0 ? 1 : 0)}/3 Bagian`
                            : lvl.level === 2
                            ? `${[hasLocalU2Lkpd1, hasLocalU2Lkpd2, hasLocalU2Lkpd3].filter(Boolean).length || (answeredQuestions > 0 ? 1 : 0)}/3 Bagian`
                            : lvl.level === 3
                            ? `${[hasLocalU3Lkpd1, hasLocalU3Lkpd2, hasLocalU3Lkpd3].filter(Boolean).length || (answeredQuestions > 0 ? 1 : 0)}/3 Bagian`
                            : lvl.level === 4
                            ? `${[hasLocalU4Lkpd1, hasLocalU4Lkpd2, hasLocalU4Lkpd3].filter(Boolean).length || (answeredQuestions > 0 ? 1 : 0)}/3 Bagian`
                            : lvl.level === 5
                            ? `${[hasLocalU5Lkpd1, hasLocalU5Lkpd2, hasLocalU5Lkpd3].filter(Boolean).length || (answeredQuestions > 0 ? 1 : 0)}/3 Bagian`
                            : `${answeredQuestions}/${totalQuestions}`}
                        </span>
                      </div>
                    </div>

                    {/* Special Unit 1 Sub-LKPDs Stepper if level === 1 */}
                    {lvl.level === 1 && !isLocked && (
                      <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                        <span className="font-bold text-slate-700">Rincian LKPD Unit 1:</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${
                          isCompleted || hasLocalLkpd1 || answeredQuestions >= 8 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold' 
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {isCompleted || hasLocalLkpd1 || answeredQuestions >= 8 ? '✓' : '○'} LKPD 1: Ide & Desain
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${
                          isCompleted || hasLocalLkpd2 || answeredQuestions >= 11 
                            ? 'bg-teal-50 border-teal-200 text-teal-800 font-bold' 
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {isCompleted || hasLocalLkpd2 || answeredQuestions >= 11 ? '✓' : '○'} LKPD 2: Produksi & Logbook
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${
                          isCompleted || hasLocalLkpd3 || answeredQuestions >= 14 
                            ? 'bg-purple-50 border-purple-200 text-purple-800 font-bold' 
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {isCompleted || hasLocalLkpd3 || answeredQuestions >= 14 ? '✓' : '○'} LKPD 3: Pameran & Asesmen
                        </span>
                      </div>
                    )}

                    {/* Special Unit 2 Sub-LKPDs Stepper if level === 2 */}
                    {lvl.level === 2 && !isLocked && (
                      <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                        <span className="font-bold text-slate-700">Rincian LKPD Unit 2:</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${
                          isCompleted || hasLocalU2Lkpd1 || answeredQuestions >= 4 
                            ? 'bg-blue-50 border-blue-200 text-blue-800 font-bold' 
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {isCompleted || hasLocalU2Lkpd1 || answeredQuestions >= 4 ? '✓' : '○'} LKPD 1: 4 Tahap Kritik
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${
                          isCompleted || hasLocalU2Lkpd2 || answeredQuestions >= 7 
                            ? 'bg-teal-50 border-teal-200 text-teal-800 font-bold' 
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {isCompleted || hasLocalU2Lkpd2 || answeredQuestions >= 7 ? '✓' : '○'} LKPD 2: Pendekatan & Raden Saleh
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${
                          isCompleted || hasLocalU2Lkpd3 || answeredQuestions >= 10 
                            ? 'bg-purple-50 border-purple-200 text-purple-800 font-bold' 
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {isCompleted || hasLocalU2Lkpd3 || answeredQuestions >= 10 ? '✓' : '○'} LKPD 3: Jenis & Peer Review
                        </span>
                      </div>
                    )}

                    {/* Special Unit 3 Sub-LKPDs Stepper if level === 3 */}
                    {lvl.level === 3 && !isLocked && (
                      <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                        <span className="font-bold text-slate-700">Rincian LKPD Unit 3:</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${
                          isCompleted || hasLocalU3Lkpd1 || answeredQuestions >= 3 
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold' 
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {isCompleted || hasLocalU3Lkpd1 || answeredQuestions >= 3 ? '✓' : '○'} LKPD 1: Konsep & 5 Tahap Siklus
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${
                          isCompleted || hasLocalU3Lkpd2 || answeredQuestions >= 6 
                            ? 'bg-teal-50 border-teal-200 text-teal-800 font-bold' 
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {isCompleted || hasLocalU3Lkpd2 || answeredQuestions >= 6 ? '✓' : '○'} LKPD 2: Konstruksi & Logbook 3D
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${
                          isCompleted || hasLocalU3Lkpd3 || answeredQuestions >= 9 
                            ? 'bg-green-50 border-green-200 text-green-800 font-bold' 
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {isCompleted || hasLocalU3Lkpd3 || answeredQuestions >= 9 ? '✓' : '○'} LKPD 3: Finishing & Pameran 360°
                        </span>
                      </div>
                    )}

                    {/* Special Unit 4 Sub-LKPDs Stepper if level === 4 */}
                    {lvl.level === 4 && !isLocked && (
                      <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                        <span className="font-bold text-slate-700">Rincian LKPD Unit 4:</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${
                          isCompleted || hasLocalU4Lkpd1 || answeredQuestions >= 3 
                            ? 'bg-rose-50 border-rose-200 text-rose-800 font-bold' 
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {isCompleted || hasLocalU4Lkpd1 || answeredQuestions >= 3 ? '✓' : '○'} LKPD 1: Ide & Metafora
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${
                          isCompleted || hasLocalU4Lkpd2 || answeredQuestions >= 6 
                            ? 'bg-purple-50 border-purple-200 text-purple-800 font-bold' 
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {isCompleted || hasLocalU4Lkpd2 || answeredQuestions >= 6 ? '✓' : '○'} LKPD 2: Media & Maestro
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${
                          isCompleted || hasLocalU4Lkpd3 || answeredQuestions >= 9 
                            ? 'bg-pink-50 border-pink-200 text-pink-800 font-bold' 
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {isCompleted || hasLocalU4Lkpd3 || answeredQuestions >= 9 ? '✓' : '○'} LKPD 3: Statement & Refleksi
                        </span>
                      </div>
                    )}

                    {/* Special Unit 5 Sub-LKPDs Stepper if level === 5 */}
                    {lvl.level === 5 && !isLocked && (
                      <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
                        <span className="font-bold text-slate-700">Rincian LKPD Unit 5:</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${
                          isCompleted || hasLocalU5Lkpd1 || answeredQuestions >= 3 
                            ? 'bg-amber-50 border-amber-200 text-amber-800 font-bold' 
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {isCompleted || hasLocalU5Lkpd1 || answeredQuestions >= 3 ? '✓' : '○'} LKPD 1: Narasi & Karakter
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${
                          isCompleted || hasLocalU5Lkpd2 || answeredQuestions >= 6 
                            ? 'bg-teal-50 border-teal-200 text-teal-800 font-bold' 
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {isCompleted || hasLocalU5Lkpd2 || answeredQuestions >= 6 ? '✓' : '○'} LKPD 2: Model Sheet & POV
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${
                          isCompleted || hasLocalU5Lkpd3 || answeredQuestions >= 9 
                            ? 'bg-blue-50 border-blue-200 text-blue-800 font-bold' 
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}>
                          {isCompleted || hasLocalU5Lkpd3 || answeredQuestions >= 9 ? '✓' : '○'} LKPD 3: Layout & Dummy
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
