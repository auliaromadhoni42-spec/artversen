import React, { useState } from 'react';
import { 
  FileText, 
  Layers, 
  Compass, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Scale, 
  Eye,
  BookOpen
} from 'lucide-react';
import { User, LkpdQuestion } from '../types';
import { UnitTwoLkpdOne } from './UnitTwoLkpdOne';
import { UnitTwoLkpdTwo } from './UnitTwoLkpdTwo';
import { UnitTwoLkpdThree } from './UnitTwoLkpdThree';

interface UnitTwoLkpdManagerProps {
  user: User;
  levelId: string;
  status: 'locked' | 'unlocked' | 'completed';
  questions: LkpdQuestion[];
  initialAnswers: Record<string, string>;
  onSave: (compiledAnswers: Record<string, string>) => Promise<void>;
  saving: boolean;
}

export const UnitTwoLkpdManager: React.FC<UnitTwoLkpdManagerProps> = ({
  user,
  levelId,
  status,
  questions,
  initialAnswers,
  onSave,
  saving
}) => {
  const [activeSubLkpd, setActiveSubLkpd] = useState<'lkpd1' | 'lkpd2' | 'lkpd3'>('lkpd1');

  // Check completion states from answers or localStorage
  const hasLkpd1 = Boolean(
    initialAnswers['q-2-1'] || 
    localStorage.getItem(`lkpd_unit_2_lkpd1_${user.id}`)
  );
  const hasLkpd2 = Boolean(
    initialAnswers['q-2-5'] || 
    localStorage.getItem(`lkpd_unit_2_lkpd2_${user.id}`)
  );
  const hasLkpd3 = Boolean(
    initialAnswers['q-2-8'] || 
    localStorage.getItem(`lkpd_unit_2_lkpd3_${user.id}`)
  );

  const completedCount = [hasLkpd1, hasLkpd2, hasLkpd3].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* NAVIGATION TABS / STAGES FOR UNIT 2 LKPDS */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                <FileText className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900 font-serif">
                Trilogi Lembar Kerja Peserta Didik (LKPD) — Unit 2: Kritik Seni Rupa
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Alur lengkap penguasaan kritik seni: 4 Tahapan Feldman &rarr; 4 Pendekatan & Kajian Raden Saleh &rarr; 4 Jenis Kritik, Dua Mata Panah & Peer-Review.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shrink-0">
            <span className="font-bold text-slate-700">Kemajuan LKPD:</span>
            <span className="font-black text-indigo-600">
              {completedCount} / 3 Selesai
            </span>
          </div>
        </div>

        {/* 3 STAGE BUTTONS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
          {/* LKPD 1 BUTTON */}
          <button
            type="button"
            onClick={() => setActiveSubLkpd('lkpd1')}
            className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative ${
              activeSubLkpd === 'lkpd1'
                ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-400 shadow-md ring-2 ring-blue-400/20'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs ${
                  activeSubLkpd === 'lkpd1' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  1
                </div>
                <span className={`text-[11px] font-black uppercase tracking-wider ${
                  activeSubLkpd === 'lkpd1' ? 'text-blue-800' : 'text-slate-500'
                }`}>
                  Tahap 4 Prosedur
                </span>
              </div>
              {hasLkpd1 && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Terisi
                </span>
              )}
            </div>

            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
              LKPD 1: Praktik 4 Tahap Kritik Feldman
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
              Deskripsi kasat mata, analisis formal komposisi, interpretasi simbol filosofis & evaluasi komparatif.
            </p>
          </button>

          {/* LKPD 2 BUTTON */}
          <button
            type="button"
            onClick={() => setActiveSubLkpd('lkpd2')}
            className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative ${
              activeSubLkpd === 'lkpd2'
                ? 'bg-gradient-to-br from-teal-50 to-indigo-50 border-teal-400 shadow-md ring-2 ring-teal-400/20'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs ${
                  activeSubLkpd === 'lkpd2' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  2
                </div>
                <span className={`text-[11px] font-black uppercase tracking-wider ${
                  activeSubLkpd === 'lkpd2' ? 'text-teal-800' : 'text-slate-500'
                }`}>
                  Pendekatan & Kontekstual
                </span>
              </div>
              {hasLkpd2 && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Terisi
                </span>
              )}
            </div>

            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
              LKPD 2: Pendekatan Kritik & Raden Saleh
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
              Komparasi 4 pendekatan kritik, studi kasus lukisan Penangkapan Diponegoro & eksplorasi karya sekitar.
            </p>
          </button>

          {/* LKPD 3 BUTTON */}
          <button
            type="button"
            onClick={() => setActiveSubLkpd('lkpd3')}
            className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative ${
              activeSubLkpd === 'lkpd3'
                ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-400 shadow-md ring-2 ring-purple-400/20'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs ${
                  activeSubLkpd === 'lkpd3' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  3
                </div>
                <span className={`text-[11px] font-black uppercase tracking-wider ${
                  activeSubLkpd === 'lkpd3' ? 'text-purple-800' : 'text-slate-500'
                }`}>
                  Aplikasi & Peer Review
                </span>
              </div>
              {hasLkpd3 && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Terisi
                </span>
              )}
            </div>

            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
              LKPD 3: 4 Jenis Kritik, Dua Mata Panah & Peer-Review
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
              Draf kritik jurnalistik vs pedagogik, refleksi fungsi dua mata panah & rubrik asesmen antarteman santun.
            </p>
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE SUB-LKPD */}
      {activeSubLkpd === 'lkpd1' && (
        <UnitTwoLkpdOne
          user={user}
          levelId={levelId}
          status={status}
          questions={questions}
          initialAnswers={initialAnswers}
          onSave={onSave}
          saving={saving}
        />
      )}

      {activeSubLkpd === 'lkpd2' && (
        <UnitTwoLkpdTwo
          user={user}
          levelId={levelId}
          status={status}
          questions={questions}
          initialAnswers={initialAnswers}
          onSave={onSave}
          saving={saving}
        />
      )}

      {activeSubLkpd === 'lkpd3' && (
        <UnitTwoLkpdThree
          user={user}
          levelId={levelId}
          status={status}
          questions={questions}
          initialAnswers={initialAnswers}
          onSave={onSave}
          saving={saving}
        />
      )}
    </div>
  );
};

export default UnitTwoLkpdManager;
