import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  HelpCircle, 
  Gamepad2, 
  FileText, 
  Sparkles, 
  Lock, 
  ArrowRight, 
  RotateCcw,
  BookOpen,
  Award,
  Download,
  Eye,
  Printer,
  Leaf,
  Image as ImageIcon,
  ExternalLink,
  Globe,
  Presentation,
  X,
  Trophy,
  Puzzle,
  PenTool
} from 'lucide-react';
import { api } from '../api';
import { LkpdLevelDetail, LkpdQuestion, LkpdAnswer, User } from '../types';
import { InteractiveGames } from './InteractiveGames';
import { EnvironmentalArtGuide } from './EnvironmentalArtGuide';
import { UnitOneLkpdWorksheet } from './UnitOneLkpdWorksheet';
import { UnitOneLkpdManager } from './UnitOneLkpdManager';
import { EcoArtTetrisGame } from './EcoArtTetrisGame';
import { MatchingQuiz } from './MatchingQuiz';
import { FillInTheBlankQuiz } from './FillInTheBlankQuiz';
import { BerkaryaSeniRupa3Dimensi } from './BerkaryaSeniRupa3Dimensi';
import { KritikSeniRupaView } from './KritikSeniRupaView';
import { MembuatKaryaSeniRupaView } from './MembuatKaryaSeniRupaView';
import { MerancangDesainProdukKriyaView } from './MerancangDesainProdukKriyaView';
import { UnitTwoLkpdManager } from './UnitTwoLkpdManager';
import { UnitThreeLkpdManager } from './UnitThreeLkpdManager';
import { UnitFourLkpdManager } from './UnitFourLkpdManager';
import { UnitFiveLkpdManager } from './UnitFiveLkpdManager';

interface LevelDetailProps {
  levelId: string;
  user: User;
  onBack: () => void;
  onGoToNextLevel: (nextLevelId: string) => void;
  onOpenRekap: () => void;
  onOpenLeaderboard?: () => void;
}

export const LevelDetail: React.FC<LevelDetailProps> = ({
  levelId,
  user,
  onBack,
  onGoToNextLevel,
  onOpenRekap,
  onOpenLeaderboard
}) => {
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState<LkpdLevelDetail | null>(null);
  const [status, setStatus] = useState<'locked' | 'unlocked' | 'completed'>('unlocked');
  const [questions, setQuestions] = useState<LkpdQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'materi' | 'video' | 'kuis' | 'game' | 'lkpd'>('materi');
  const [materiViewMode, setMateriViewMode] = useState<'visual' | 'text' | 'lkpd_asset'>('text');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showAssetPreviewModal, setShowAssetPreviewModal] = useState(false);
  const [previewCanvaModal, setPreviewCanvaModal] = useState<{ title: string; url: string } | null>(null);
  const [unitOneGameMode, setUnitOneGameMode] = useState<'tetris' | 'classic'>('tetris');

  // Success Feedback Modal State (Workflow Point 13)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState<{
    message: string;
    levelNumber: number;
    nextLevel: { id: string; level: number; judul: string } | null;
  } | null>(null);

  // Quiz state
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizSubMode, setQuizSubMode] = useState<'multiple_choice' | 'matching' | 'fill_in_blank'>('multiple_choice');

  // Fetch Level Data with strict backend validation check
  const loadLevel = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await api.getLevelDetails(levelId);
      setLevel(res.level);
      setStatus(res.status);
      setQuestions(res.questions);

      // Populate existing answers if any
      const initialAns: Record<string, string> = {};
      res.existingAnswers.forEach((a: LkpdAnswer) => {
        initialAns[a.question_id] = a.jawaban;
      });
      setAnswers(initialAns);
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal memuat level.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLevel();
  }, [levelId]);

  const handleAnswerChange = (qId: string, val: string) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  // Submit and validate LKPD answers (Workflow Point 10, 11, 12, 13)
  const handleSaveLkpd = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Frontend validation
    const unfilled = questions.filter(q => {
      const ans = (answers[q.id] || '').trim();
      return !ans || ans.length < 5;
    });

    if (unfilled.length > 0) {
      setErrorMsg(
        `Validasi Formulir: Harap isi semua pertanyaan LKPD dengan lengkap (minimal 5 karakter). Pertanyaan yang belum lengkap: ${unfilled.map(u => `No. ${u.urutan}`).join(', ')}.`
      );
      // Switch tab to lkpd if not already there
      setActiveTab('lkpd');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      setSaving(true);
      const res = await api.submitAnswers(levelId, answers);
      setStatus('completed');
      setFeedbackData({
        message: res.message,
        levelNumber: res.level_number,
        nextLevel: res.next_level
      });
      setShowFeedbackModal(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal menyimpan LKPD.');
    } finally {
      setSaving(false);
    }
  };

  const handleDirectSubmitAnswers = async (newAnswers: Record<string, string>) => {
    setErrorMsg(null);
    setSaving(true);
    try {
      const mergedAnswers = { ...answers, ...newAnswers };
      const res = await api.submitAnswers(levelId, mergedAnswers);
      setAnswers(mergedAnswers);
      setStatus('completed');
      setFeedbackData({
        message: res.message,
        levelNumber: res.level_number,
        nextLevel: res.next_level
      });
      setShowFeedbackModal(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal menyimpan LKPD.');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const handleQuizOptionSelect = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setSelectedQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateQuizScore = () => {
    if (!level) return 0;
    let correct = 0;
    level.quiz_data.forEach((q, idx) => {
      if (selectedQuizAnswers[idx] === q.answerIndex) {
        correct++;
      }
    });
    return Math.round((correct / level.quiz_data.length) * 100);
  };

  const handleMultipleChoiceSubmit = async () => {
    if (!level) return;
    setQuizSubmitted(true);
    const score = calculateQuizScore();
    try {
      await api.saveQuizScore(levelId, 'multiple_choice', score, 100);
    } catch (err) {
      console.error('Failed to save multiple choice quiz score:', err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="inline-block w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-slate-600">
          Memeriksa hak akses & memuat materi LKPD...
        </p>
      </div>
    );
  }

  // If backend rejected access because level is locked
  if (errorMsg && !level) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Akses Unit Terkunci</h2>
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">{errorMsg}</p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
        </button>
      </div>
    );
  }

  if (!level) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Breadcrumb & Status Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
        </button>

        <div className="flex items-center gap-2">
          {status === 'completed' ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" /> LKPD Selesai Dikerjakan (Dapat Diedit)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Sedang Dikerjakan
            </span>
          )}
        </div>
      </div>

      {/* Level Header Card */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
          <span>{level.tema}</span>
          <span>•</span>
          <span>Seni Rupa Kelas XI</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
          Unit {level.level}: {level.judul}
        </h1>

        <p className="text-sm text-slate-600 mt-2 max-w-4xl leading-relaxed">
          {level.deskripsi}
        </p>

        {/* Learning Objectives Chips */}
        <div className="mt-5 pt-5 border-t border-slate-100">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
            Capaian Pembelajaran Unit Ini:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {level.tujuan_pembelajaran.map((tp, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{tp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Error Banner */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3 animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-rose-900">Validasi Pengisian LKPD</p>
            <p className="text-xs text-rose-700 mt-0.5">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Tabs Menu: Materi, Video, Kuis, Game, Form LKPD */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 scrollbar-none">
        <button
          onClick={() => setActiveTab('materi')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'materi'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-indigo-500" />
          <span>1. Materi Pembelajaran</span>
        </button>

        <button
          onClick={() => setActiveTab('video')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'video'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Play className="w-4 h-4 text-rose-500" />
          <span>2. Video Apresiasi</span>
        </button>

        <button
          onClick={() => setActiveTab('kuis')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'kuis'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-amber-500" />
          <span>3. Kuis Interaktif</span>
        </button>

        <button
          onClick={() => setActiveTab('game')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'game'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Gamepad2 className="w-4 h-4 text-purple-500" />
          <span>4. Mini-Game Seni</span>
        </button>

        <button
          onClick={() => setActiveTab('lkpd')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'lkpd'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
              : 'bg-indigo-50 text-indigo-700 font-semibold hover:bg-indigo-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>5. Formulir LKPD Utama</span>
          {status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
        </button>
      </div>

      {/* TAB 1: MATERI PEMBELAJARAN */}
      {activeTab === 'materi' && (
        <div className="space-y-6">
          {level.level === 1 ? (
            <>
              {/* Mode Switcher for Unit 1: Visual Interactive Project Guide vs Full Text Document vs Official LKPD Asset */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:px-6 sm:py-3.5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Tampilan Materi:</span>
                  <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl">
                    <button
                      onClick={() => setMateriViewMode('visual')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        materiViewMode === 'visual'
                          ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      🎨 Panduan Visual (Slide Proyek)
                    </button>
                    <button
                      onClick={() => setMateriViewMode('text')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        materiViewMode === 'text'
                          ? 'bg-white text-emerald-800 shadow-xs ring-1 ring-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      📄 Sumber Belajar
                    </button>
                    <button
                      onClick={() => setMateriViewMode('lkpd_asset')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        materiViewMode === 'lkpd_asset'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-emerald-800 hover:text-emerald-950 font-extrabold'
                      }`}
                    >
                      🖼️ Aset Poster LKPD Resmi (8 Bagian)
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 justify-end">
                  <button
                    onClick={() => setActiveTab('video')}
                    className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 cursor-pointer"
                  >
                    <span>Lanjut ke Video</span> <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {materiViewMode === 'visual' && (
                <EnvironmentalArtGuide 
                  user={user} 
                  onGoToLKPD={() => setActiveTab('lkpd')} 
                />
              )}

              {materiViewMode === 'text' && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 font-serif">Sumber Belajar</h2>
                      <p className="text-xs text-slate-500">Unit {level.level}: {level.judul} (SMA Kelas XI Fase F)</p>
                    </div>

                    {level.level === 1 && (
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300/60">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          2 Sumber Belajar Canva
                        </span>
                      </div>
                    )}
                  </div>

                  {/* SPECIAL PROMINENT CANVA MATERIALS SHOWCASE FOR UNIT 1 */}
                  {level.level === 1 && (
                    <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-900/10 via-amber-50 to-orange-50/60 border border-amber-200/90 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-2xl bg-amber-600 text-white flex items-center justify-center font-bold shadow-sm shadow-amber-200">
                            <Presentation className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-md">
                              Materi Digital Interaktif (Canva Site)
                            </span>
                            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-serif">
                              Sumber Belajar Digital Unit 1
                            </h3>
                          </div>
                        </div>
                        <span className="text-[11px] text-amber-800 font-semibold bg-white/80 px-2.5 py-1 rounded-xl border border-amber-200 shrink-0">
                          2 Sumber Belajar Resmi
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        Materi pembelajaran digital interaktif untuk eksplorasi karya seni dan pelestarian lingkungan Seni Rupa Kelas XI:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                        {/* Resource 1: Canva Presentation */}
                        <div className="bg-white rounded-2xl p-4 border border-amber-200/90 shadow-xs flex flex-col justify-between space-y-3 hover:shadow-md transition-all">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                                <Sparkles className="w-3 h-3 text-amber-600" /> Slide Presentasi
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">Canva Site</span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2">
                              Membuat karya seni rupa yang berdampak bagi lingkungan.
                            </h4>
                            <p className="text-[11px] text-slate-500 line-clamp-2">
                              Slide presentasi edukasi eksplorasi media, material ramah lingkungan, dan teknik berkarya seni rupa berdampak ekologis.
                            </p>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                            <a
                              href="https://literasi-smaneb.my.canva.site/brown-neutral-colors-rustic-paint-handdrawn-art-materials-visual-arts-education-presentation"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] shadow-sm shadow-amber-200 transition-all cursor-pointer"
                            >
                              <span>Buka Presentasi</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <button
                              type="button"
                              onClick={() => setPreviewCanvaModal({
                                title: 'Membuat karya seni rupa yang berdampak bagi lingkungan.',
                                url: 'https://literasi-smaneb.my.canva.site/brown-neutral-colors-rustic-paint-handdrawn-art-materials-visual-arts-education-presentation'
                              })}
                              className="py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-[11px] border border-amber-200 transition-colors cursor-pointer"
                            >
                              Pratinjau
                            </button>
                          </div>
                        </div>

                        {/* Resource 2: Canva Bahan Ajar */}
                        <div className="bg-white rounded-2xl p-4 border border-teal-200/90 shadow-xs flex flex-col justify-between space-y-3 hover:shadow-md transition-all">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md">
                                <BookOpen className="w-3 h-3 text-teal-600" /> Portal Bahan Ajar
                              </span>
                              <span className="text-[10px] text-slate-400 font-medium">Literasi SMANEB</span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2">
                              Menjaga lingkungan melalui seni
                            </h4>
                            <p className="text-[11px] text-slate-500 line-clamp-2">
                              Portal bahan ajar digital, literasi kontekstual, dan panduan belajar terpadu kurikulum Seni Rupa Fase F.
                            </p>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                            <a
                              href="https://literasi-smaneb.my.canva.site/bahan-ajar"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-[11px] shadow-sm shadow-teal-200 transition-all cursor-pointer"
                            >
                              <span>Buka Bahan Ajar</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <button
                              type="button"
                              onClick={() => setPreviewCanvaModal({
                                title: 'Menjaga lingkungan melalui seni',
                                url: 'https://literasi-smaneb.my.canva.site/bahan-ajar'
                              })}
                              className="py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-[11px] border border-teal-200 transition-colors cursor-pointer"
                            >
                              Pratinjau
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {level.materi_teks && level.materi_teks.trim().length > 0 && (
                    <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4">
                      {level.materi_teks.split('\n\n').map((paragraph, i) => {
                        if (paragraph.startsWith('### ')) {
                          return (
                            <h3 key={i} className="text-lg font-bold text-indigo-950 font-serif pt-3 border-b border-indigo-50 pb-1">
                              {paragraph.replace('### ', '')}
                            </h3>
                          );
                        }
                        if (paragraph.startsWith('#### ')) {
                          return (
                            <h4 key={i} className="text-base font-bold text-emerald-950 font-serif pt-2">
                              {paragraph.replace('#### ', '')}
                            </h4>
                          );
                        }
                        if (paragraph.startsWith('> ')) {
                          return (
                            <blockquote key={i} className="p-3.5 rounded-2xl bg-emerald-50/70 border-l-4 border-emerald-600 text-xs sm:text-sm text-emerald-950 italic">
                              {paragraph.replace(/^> /gm, '')}
                            </blockquote>
                          );
                        }
                        if (paragraph.startsWith('---')) {
                          return <hr key={i} className="my-4 border-slate-200" />;
                        }

                        // Check if paragraph contains canva links to format nicely
                        if (paragraph.includes('literasi-smaneb.my.canva.site')) {
                          return (
                            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                              <p className="text-slate-800 whitespace-pre-line font-medium">
                                {paragraph}
                              </p>
                            </div>
                          );
                        }

                        return (
                          <p key={i} className="text-slate-700 whitespace-pre-line">
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {materiViewMode === 'lkpd_asset' && (
                <div className="bg-white rounded-3xl border-2 border-emerald-500/40 p-6 sm:p-8 shadow-lg space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                        <Leaf className="w-3.5 h-3.5" /> Aset Grafis Resmi Kurikulum Merdeka
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                        Lembar Kerja Peserta Didik (LKPD) - Unit 1
                      </h2>
                      <p className="text-xs text-slate-500">
                        Karya Seni yang Berdampak bagi Lingkungan • Kelas XI Fase F (Format 8 Bagian)
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href="/assets/lkpd-unit-1.jpg"
                        download="LKPD-Karya-Seni-Berdampak-Lingkungan-Kelas-XI.jpg"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Unduh Resolusi Penuh (JPG)</span>
                      </a>
                      <button
                        onClick={() => setActiveTab('lkpd')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-md transition-all cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Buka Lembar Kerja Interaktif</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Asset Display */}
                  <div className="bg-slate-950 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center relative group overflow-hidden">
                    <img
                      src="/assets/lkpd-unit-1.jpg"
                      alt="Lembar Kerja Peserta Didik Unit 1"
                      referrerPolicy="no-referrer"
                      className="max-h-[700px] w-auto object-contain rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        onClick={() => setShowAssetPreviewModal(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-xl hover:scale-105 transition-all cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-emerald-600" />
                        <span>Perbesar Layar Penuh</span>
                      </button>
                    </div>
                  </div>

                  {/* Feature Breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                      <span className="text-emerald-800 font-black text-xs block">8 Bagian Proyek</span>
                      <span className="text-[11px] text-slate-500">Sesuai Alur PjBL</span>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                      <span className="text-emerald-800 font-black text-xs block">Kanvas Sketsa</span>
                      <span className="text-[11px] text-slate-500">Gambar Langsung / Upload</span>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                      <span className="text-emerald-800 font-black text-xs block">Rubrik Spektrum</span>
                      <span className="text-[11px] text-slate-500">7 Indikator Dampak</span>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                      <span className="text-emerald-800 font-black text-xs block">Print Ready</span>
                      <span className="text-[11px] text-slate-500">Format Cetak Rapi</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : level.level === 2 ? (
            <KritikSeniRupaView
              user={user}
              onGoToLKPD={() => setActiveTab('lkpd')}
              onGoToQuiz={() => setActiveTab('kuis')}
            />
          ) : level.level === 3 ? (
            <BerkaryaSeniRupa3Dimensi
              user={user}
              onGoToLKPD={() => setActiveTab('lkpd')}
              onGoToQuiz={() => setActiveTab('kuis')}
            />
          ) : level.level === 4 ? (
            <MembuatKaryaSeniRupaView
              user={user}
              onGoToLKPD={() => setActiveTab('lkpd')}
              onGoToQuiz={() => setActiveTab('kuis')}
            />
          ) : level.level === 5 ? (
            <MerancangDesainProdukKriyaView
              user={user}
              onGoToLKPD={() => setActiveTab('lkpd')}
              onGoToQuiz={() => setActiveTab('kuis')}
            />
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-serif">Modul Materi Interaktif</h2>
                  <p className="text-xs text-slate-500">Pelajari konsep dasar sebelum mengisi lembar kerja LKPD</p>
                </div>
                <button
                  onClick={() => setActiveTab('video')}
                  className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 cursor-pointer"
                >
                  <span>Lanjut ke Video</span> <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="prose prose-slate max-w-none text-sm leading-relaxed space-y-4">
                {level.materi_teks.split('\n\n').map((paragraph, i) => {
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={i} className="text-lg font-bold text-indigo-950 font-serif pt-2 border-b border-indigo-50 pb-1">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('---')) {
                    return <hr key={i} className="my-4 border-slate-200" />;
                  }
                  return (
                    <p key={i} className="text-slate-700 whitespace-pre-line">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setActiveTab('video')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-all cursor-pointer"
                >
                  <span>Tonton Video Pembelajaran</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: VIDEO APRESIASI */}
      {activeTab === 'video' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-serif">Video Pembelajaran & Apresiasi</h2>
              <p className="text-xs text-slate-500">{level.video_title}</p>
            </div>
            <button
              onClick={() => setActiveTab('kuis')}
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 cursor-pointer"
            >
              <span>Lanjut ke Kuis</span> <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
            <iframe
              className="w-full h-full"
              src={level.video_url}
              title={level.video_title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-900 leading-relaxed">
            <p className="font-bold mb-1">Catatan Pengamatan Video:</p>
            Perhatikan bagaimana seniman mengorganisasi unsur rupa, memilih media campuran yang selaras, serta bagaimana teknik penyelesaian karya (finishing) dilakukan. Hal ini akan sangat membantu saat mengisi LKPD.
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('materi')}
              className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Materi
            </button>
            <button
              onClick={() => setActiveTab('kuis')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 cursor-pointer"
            >
              <span>Uji Pemahaman di Kuis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: KUIS INTERAKTIF */}
      {activeTab === 'kuis' && (
        <div className="space-y-5">
          {/* Sub-tabs Selector for Quizzes */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex overflow-x-auto gap-2 scrollbar-none">
              <button
                type="button"
                onClick={() => setQuizSubMode('multiple_choice')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  quizSubMode === 'multiple_choice'
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>1. Pilihan Ganda ({level.quiz_data.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setQuizSubMode('matching')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  quizSubMode === 'matching'
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Puzzle className="w-3.5 h-3.5" />
                <span>2. Menjodohkan ({level.matching_quiz?.pairs.length || 5})</span>
              </button>

              <button
                type="button"
                onClick={() => setQuizSubMode('fill_in_blank')}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  quizSubMode === 'fill_in_blank'
                    ? 'bg-teal-600 text-white shadow-sm shadow-teal-200'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <PenTool className="w-3.5 h-3.5" />
                <span>3. Isian Rumpang ({level.fill_blank_quiz?.questions.length || 4})</span>
              </button>
            </div>

            {onOpenLeaderboard && (
              <button
                type="button"
                onClick={onOpenLeaderboard}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors shrink-0 cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-600" />
                <span>Lihat Papan Peringkat</span>
              </button>
            )}
          </div>

          {/* Submode 1: Multiple Choice */}
          {quizSubMode === 'multiple_choice' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-slate-900 font-serif">Kuis Pilihan Ganda</h2>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-indigo-100 text-indigo-800">
                      Teori & Konsep
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Jawab 5 pertanyaan untuk mengukur penguasaan konsep Unit {level.level}</p>
                </div>
                {quizSubmitted && (
                  <button
                    onClick={() => {
                      setSelectedQuizAnswers({});
                      setQuizSubmitted(false);
                    }}
                    className="flex items-center gap-1 text-xs text-slate-600 hover:text-indigo-600 px-3 py-1.5 rounded-lg border border-slate-200 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Ulangi Kuis
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {level.quiz_data.map((q, qIdx) => {
                  const selectedOpt = selectedQuizAnswers[qIdx];
                  const isAnswered = selectedOpt !== undefined;
                  const isCorrect = isAnswered && selectedOpt === q.answerIndex;

                  return (
                    <div key={q.id} className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {qIdx + 1}
                        </span>
                        <p className="text-sm font-bold text-slate-900 leading-snug">{q.question}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-9">
                        {q.options.map((opt, optIdx) => {
                          const isOptionSelected = selectedOpt === optIdx;
                          let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-slate-400';

                          if (quizSubmitted) {
                            if (optIdx === q.answerIndex) {
                              btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                            } else if (isOptionSelected) {
                              btnStyle = 'bg-rose-100 border-rose-400 text-rose-900 line-through';
                            } else {
                              btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                            }
                          } else if (isOptionSelected) {
                            btnStyle = 'bg-indigo-50 border-indigo-500 text-indigo-700 font-semibold shadow-xs';
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => handleQuizOptionSelect(qIdx, optIdx)}
                              className={`text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${btnStyle}`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className={`mt-3 p-3 rounded-xl text-xs pl-9 ${
                          isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                        }`}>
                          <p className="font-bold">{isCorrect ? '✓ Jawaban Anda Benar!' : '✗ Jawaban Belum Tepat'}</p>
                          <p className="mt-0.5">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Quiz Action & Results */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  {quizSubmitted ? (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                        {calculateQuizScore()}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Skor Kuis Pilihan Ganda</p>
                        <p className="text-xs text-slate-500">
                          {calculateQuizScore() >= 80 ? 'Pemahaman materi Anda sangat prima! Skor tercatat di papan peringkat.' : 'Bagus! Pelajari kembali materi untuk hasil optimal.'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">
                      {Object.keys(selectedQuizAnswers).length} dari {level.quiz_data.length} soal telah dijawab.
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  {!quizSubmitted ? (
                    <button
                      disabled={Object.keys(selectedQuizAnswers).length < level.quiz_data.length}
                      onClick={handleMultipleChoiceSubmit}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-indigo-200 transition-all cursor-pointer"
                    >
                      Periksa & Simpan Skor
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setQuizSubMode('matching')}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-200 transition-all cursor-pointer"
                      >
                        <Puzzle className="w-4 h-4" />
                        <span>Lanjut Kuis Menjodohkan</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('game')}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all cursor-pointer"
                      >
                        <span>Mini-Game</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Submode 2: Matching Quiz */}
          {quizSubMode === 'matching' && level.matching_quiz && (
            <MatchingQuiz
              quizData={level.matching_quiz}
              levelId={level.id}
              onOpenLeaderboard={onOpenLeaderboard}
            />
          )}

          {/* Submode 3: Fill In The Blank Quiz */}
          {quizSubMode === 'fill_in_blank' && level.fill_blank_quiz && (
            <FillInTheBlankQuiz
              quizData={level.fill_blank_quiz}
              levelId={level.id}
              onOpenLeaderboard={onOpenLeaderboard}
            />
          )}
        </div>
      )}

      {/* TAB 4: MINI-GAME SENI */}
      {activeTab === 'game' && (
        <div className="space-y-6">
          {level.level === 1 ? (
            <div className="space-y-4">
              {/* Unit 1 Game Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:px-5 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-indigo-600" />
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wide">Pilihan Permainan Unit 1:</span>
                </div>
                <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-xl">
                  <button
                    onClick={() => setUnitOneGameMode('tetris')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      unitOneGameMode === 'tetris'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🕹️ Eco-Art Tetris & Kuis Lingkungan (Utama)
                  </button>
                  <button
                    onClick={() => setUnitOneGameMode('classic')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                      unitOneGameMode === 'classic'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🧩 Teka-Teki Pasangan Aliran Seni
                  </button>
                </div>
              </div>

              {unitOneGameMode === 'tetris' ? (
                <EcoArtTetrisGame 
                  onGameCompleted={(finalScore, qScore) => {
                    // Optional celebration or state
                  }}
                />
              ) : (
                <InteractiveGames gameData={level.game_data} levelNumber={level.level} />
              )}
            </div>
          ) : (
            <InteractiveGames gameData={level.game_data} levelNumber={level.level} />
          )}

          <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-serif">Sudah Siap Mengisi LKPD?</h3>
              <p className="text-xs text-slate-500">
                Tuangkan seluruh ide, observasi, dan eksplorasimu ke dalam Formulir LKPD Unit {level.level}.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('lkpd')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-200 transition-all hover:scale-105 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Buka Formulir LKPD Utama</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: FORMULIR LKPD UTAMA (CRITICAL WORKFLOW) */}
      {activeTab === 'lkpd' && (
        level.level === 1 ? (
          <UnitOneLkpdManager
            user={user}
            levelId={level.id}
            status={status}
            questions={questions}
            initialAnswers={answers}
            onSave={handleDirectSubmitAnswers}
            saving={saving}
          />
        ) : level.level === 2 ? (
          <UnitTwoLkpdManager
            user={user}
            levelId={level.id}
            status={status}
            questions={questions}
            initialAnswers={answers}
            onSave={handleDirectSubmitAnswers}
            saving={saving}
          />
        ) : level.level === 3 ? (
          <UnitThreeLkpdManager
            user={user}
            levelId={level.id}
            status={status}
            questions={questions}
            initialAnswers={answers}
            onSave={handleDirectSubmitAnswers}
            saving={saving}
          />
        ) : level.level === 4 ? (
          <UnitFourLkpdManager
            user={user}
            levelId={level.id}
            status={status}
            questions={questions}
            initialAnswers={answers}
            onSave={handleDirectSubmitAnswers}
            saving={saving}
          />
        ) : level.level === 5 ? (
          <UnitFiveLkpdManager
            user={user}
            levelId={level.id}
            status={status}
            questions={questions}
            initialAnswers={answers}
            onSave={handleDirectSubmitAnswers}
            saving={saving}
          />
        ) : (
          <form onSubmit={handleSaveLkpd} className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 font-serif flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    Lembar Kerja Peserta Didik (LKPD) - Unit {level.level}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Siswa: <strong>{user.nama}</strong> ({user.kelas}) • Jawaban terhubung dengan akun Anda
                  </p>
                </div>

                {status === 'completed' && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Tersimpan di Database
                  </span>
                )}
              </div>

              {/* Questions List */}
              <div className="space-y-8">
                {questions.map((q) => {
                  const currentAnswer = answers[q.id] || '';
                  const charCount = currentAnswer.trim().length;

                  return (
                    <div key={q.id} className="space-y-3 p-5 rounded-2xl bg-slate-50/60 border border-slate-200/80">
                      <div className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                          {q.urutan}
                        </span>
                        <div className="space-y-1 w-full">
                          <p className="text-sm font-bold text-slate-900 leading-snug">{q.pertanyaan}</p>
                          <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-900 leading-relaxed flex items-start gap-2">
                            <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold">Panduan Penilaian: </span>
                              <span>{q.panduan}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pl-0 sm:pl-10 space-y-1.5">
                        <textarea
                          required
                          rows={4}
                          value={currentAnswer}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                          placeholder="Ketikkan jawaban Anda secara mendalam dan terstruktur di sini..."
                          className="w-full p-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-slate-800 bg-white shadow-inner transition-all leading-relaxed"
                        />
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Minimal 5 karakter jawaban bermakna</span>
                          <span className={charCount < 5 ? 'text-rose-500 font-semibold' : 'text-emerald-600 font-semibold'}>
                            {charCount} karakter {charCount >= 5 ? '✓' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Save LKPD Action Bar */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Tekan tombol di bawah untuk memvalidasi dan menyimpan jawaban ke database</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-sm shadow-xl shadow-indigo-200 transition-all hover:scale-105 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
                  >
                    {saving ? (
                      <span>Memvalidasi & Menyimpan Data...</span>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>SIMPAN DATA LKPD</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )
      )}

      {/* MODAL PREVIEW FOR ASSET IMAGE */}
      {showAssetPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 sm:px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-sm sm:text-base font-serif">
                  Aset Poster Lembar Kerja Peserta Didik (LKPD) Unit 1
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/assets/lkpd-unit-1.jpg"
                  download="LKPD-Unit-1-Karya-Seni-Lingkungan.jpg"
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Poster (JPG)</span>
                </a>
                <button
                  onClick={() => setShowAssetPreviewModal(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto flex items-center justify-center bg-slate-950/95 min-h-[450px]">
              <img
                src="/assets/lkpd-unit-1.jpg"
                alt="Aset Lembar LKPD Unit 1"
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl"
              />
            </div>
            
            <div className="p-3 bg-slate-100 flex items-center justify-between px-6 text-xs text-slate-600 border-t border-slate-200">
              <span>Aset Pembelajaran Resmi • Seni Rupa Kelas XI Fase F</span>
              <button
                onClick={() => {
                  setShowAssetPreviewModal(false);
                  setActiveTab('lkpd');
                }}
                className="font-bold text-emerald-700 hover:text-emerald-900"
              >
                Mulai Kerjakan LKPD Ini →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CANVA INTERACTIVE PREVIEW MODAL */}
      {previewCanvaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-5xl w-full h-[90vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-scaleUp">
            {/* Modal Header */}
            <div className="p-4 sm:px-6 bg-slate-900 text-white flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <Presentation className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white font-serif line-clamp-1">
                    {previewCanvaModal.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 truncate max-w-md">
                    {previewCanvaModal.url}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={previewCanvaModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Buka Layar Penuh</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setPreviewCanvaModal(null)}
                  className="p-1.5 rounded-xl hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Tutup Pratinjau"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content - iFrame */}
            <div className="flex-1 bg-slate-100 relative">
              <iframe
                src={previewCanvaModal.url}
                title={previewCanvaModal.title}
                className="w-full h-full border-0"
                allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3 px-6 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2 shrink-0">
              <span>Materi Ajar Digital • Kurikulum Merdeka Fase F Seni Rupa</span>
              <div className="flex items-center gap-2">
                <span>Jika tampilan terhalang pembatasan situs:</span>
                <a
                  href={previewCanvaModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-amber-600 hover:text-amber-700 underline flex items-center gap-1"
                >
                  Buka langsung di tab baru <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FEEDBACK MODAL (Strictly implementing Workflow Point 13) */}
      {showFeedbackModal && feedbackData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 text-center space-y-6 transform animate-scaleUp">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-100">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                <Award className="w-3.5 h-3.5" /> LKPD Unit {feedbackData.levelNumber} Berhasil Diselesaikan
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-serif">
                Data Berhasil Disimpan!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Jawaban LKPD Anda telah berhasil divalidasi dan disimpan ke database yang terhubung dengan akun <strong>{user.nama}</strong> ({user.kelas}).
              </p>

              {feedbackData.nextLevel ? (
                <div className="p-3.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-900 font-semibold flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>
                    Unit {feedbackData.nextLevel.level}: "{feedbackData.nextLevel.judul}" kini telah <strong>TERBUKA</strong>!
                  </span>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-xs text-emerald-900 font-semibold">
                  🎉 Selamat! Anda telah menuntaskan seluruh 5 Unit LKPD Seni Rupa Kelas XI!
                </div>
              )}
            </div>

            {/* 3 Action Buttons as required by Workflow Point 13 */}
            <div className="space-y-2.5 pt-2">
              {feedbackData.nextLevel && (
                <button
                  type="button"
                  onClick={() => {
                    setShowFeedbackModal(false);
                    onGoToNextLevel(feedbackData.nextLevel!.id);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Lanjut Unit Berikutnya (Unit {feedbackData.nextLevel.level})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setShowFeedbackModal(false);
                    onBack();
                  }}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Dashboard</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowFeedbackModal(false);
                    onOpenRekap();
                  }}
                  className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold text-xs transition-colors cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Lihat Rekap Hasil</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
