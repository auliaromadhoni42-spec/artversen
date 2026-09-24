import React, { useState } from 'react';
import { 
  FileText, 
  Layers, 
  Box, 
  Hammer, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Leaf, 
  Award,
  Recycle
} from 'lucide-react';
import { User, LkpdQuestion } from '../types';
import { UnitThreeLkpdOne } from './UnitThreeLkpdOne';
import { UnitThreeLkpdTwo } from './UnitThreeLkpdTwo';
import { UnitThreeLkpdThree } from './UnitThreeLkpdThree';

interface UnitThreeLkpdManagerProps {
  user: User;
  levelId: string;
  status: 'locked' | 'unlocked' | 'completed';
  questions: LkpdQuestion[];
  initialAnswers: Record<string, string>;
  onSave: (compiledAnswers: Record<string, string>) => Promise<void>;
  saving: boolean;
}

export const UnitThreeLkpdManager: React.FC<UnitThreeLkpdManagerProps> = ({
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
    initialAnswers['q-3-1'] || 
    localStorage.getItem(`lkpd_unit_3_lkpd1_${user.id}`)
  );
  const hasLkpd2 = Boolean(
    initialAnswers['q-3-4'] || 
    localStorage.getItem(`lkpd_unit_3_lkpd2_${user.id}`)
  );
  const hasLkpd3 = Boolean(
    initialAnswers['q-3-7'] || 
    localStorage.getItem(`lkpd_unit_3_lkpd3_${user.id}`)
  );

  const completedCount = [hasLkpd1, hasLkpd2, hasLkpd3].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* NAVIGATION TABS / STAGES FOR UNIT 3 LKPDS */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                <Box className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900 font-serif">
                Trilogi Lembar Kerja Peserta Didik (LKPD) — Unit 3: Berkarya Seni Rupa 3 Dimensi
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Alur berkarya kriya daur ulang 3D: Ide & Siklus 5 Tahap &rarr; Konstruksi & Logbook &rarr; Finishing & Pameran 360°.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shrink-0">
            <span className="font-bold text-slate-700">Kemajuan LKPD:</span>
            <span className="font-black text-emerald-600">
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
                ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-400 shadow-md ring-2 ring-emerald-400/20'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs ${
                  activeSubLkpd === 'lkpd1' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  1
                </div>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  LKPD 1: Ide & Siklus Daur Ulang
                </span>
              </div>
              {hasLkpd1 && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="w-3 h-3" /> Lengkap
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Karakter bahan limbah (pelepah/pandan/plastik), konsep kriya 3D, dan alur 5 tahapan daur ulang.
            </p>
          </button>

          {/* LKPD 2 BUTTON */}
          <button
            type="button"
            onClick={() => setActiveSubLkpd('lkpd2')}
            className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative ${
              activeSubLkpd === 'lkpd2'
                ? 'bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-400 shadow-md ring-2 ring-teal-400/20'
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
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Hammer className="w-3.5 h-3.5 text-teal-600" />
                  LKPD 2: Konstruksi & Logbook 3D
                </span>
              </div>
              {hasLkpd2 && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-100 text-teal-700">
                  <CheckCircle2 className="w-3 h-3" /> Lengkap
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Eksperimen sambungan & rangka 3D, logbook pengerjaan studio, dan uji kapasitas beban & ergonomi.
            </p>
          </button>

          {/* LKPD 3 BUTTON */}
          <button
            type="button"
            onClick={() => setActiveSubLkpd('lkpd3')}
            className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative ${
              activeSubLkpd === 'lkpd3'
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-500 shadow-md ring-2 ring-green-500/20'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs ${
                  activeSubLkpd === 'lkpd3' ? 'bg-green-700 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  3
                </div>
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-green-700" />
                  LKPD 3: Finishing & Pameran 360°
                </span>
              </div>
              {hasLkpd3 && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-green-100 text-green-700">
                  <CheckCircle2 className="w-3 h-3" /> Lengkap
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Pelapis pernis alami, tata display 360° pameran, label kuratorial, dan refleksi circular economy.
            </p>
          </button>
        </div>
      </div>

      {/* RENDER CURRENT SUB LKPD */}
      {activeSubLkpd === 'lkpd1' && (
        <UnitThreeLkpdOne
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
        <UnitThreeLkpdTwo
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
        <UnitThreeLkpdThree
          user={user}
          levelId={levelId}
          status={status}
          questions={questions}
          initialAnswers={initialAnswers}
          onSave={onSave}
          saving={saving}
        />
      )}

      {/* BOTTOM QUICK FOOTER NAVIGATION BETWEEN 3 LKPDS */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Recycle className="w-4 h-4 text-emerald-600" />
          <span>
            Sedang mengerjakan: <strong>{
              activeSubLkpd === 'lkpd1' 
                ? 'LKPD 1: Ide & 5 Tahap Siklus Daur Ulang' 
                : activeSubLkpd === 'lkpd2' 
                ? 'LKPD 2: Konstruksi Sambungan & Logbook 3D' 
                : 'LKPD 3: Finishing & Pameran 360°'
            }</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {activeSubLkpd !== 'lkpd1' && (
            <button
              type="button"
              onClick={() => setActiveSubLkpd(activeSubLkpd === 'lkpd3' ? 'lkpd2' : 'lkpd1')}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 font-bold text-slate-700 transition-colors cursor-pointer"
            >
              &larr; Tahap Sebelumnya
            </button>
          )}

          {activeSubLkpd !== 'lkpd3' && (
            <button
              type="button"
              onClick={() => setActiveSubLkpd(activeSubLkpd === 'lkpd1' ? 'lkpd2' : 'lkpd3')}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-bold text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Tahap Berikutnya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
