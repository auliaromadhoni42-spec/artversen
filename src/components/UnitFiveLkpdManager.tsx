import React, { useState } from 'react';
import { 
  FileText, 
  Layers, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Camera, 
  Type,
  Layout
} from 'lucide-react';
import { User, LkpdQuestion } from '../types';
import { UnitFiveLkpdOne } from './UnitFiveLkpdOne';
import { UnitFiveLkpdTwo } from './UnitFiveLkpdTwo';
import { UnitFiveLkpdThree } from './UnitFiveLkpdThree';

interface UnitFiveLkpdManagerProps {
  user: User;
  levelId: string;
  status: 'locked' | 'unlocked' | 'completed';
  questions: LkpdQuestion[];
  initialAnswers: Record<string, string>;
  onSave: (compiledAnswers: Record<string, string>) => Promise<void>;
  saving: boolean;
}

export const UnitFiveLkpdManager: React.FC<UnitFiveLkpdManagerProps> = ({
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
    initialAnswers['q-5-1'] || 
    localStorage.getItem(`lkpd_unit_5_lkpd1_${user.id}`)
  );
  const hasLkpd2 = Boolean(
    initialAnswers['q-5-4'] || 
    localStorage.getItem(`lkpd_unit_5_lkpd2_${user.id}`)
  );
  const hasLkpd3 = Boolean(
    initialAnswers['q-5-7'] || 
    localStorage.getItem(`lkpd_unit_5_lkpd3_${user.id}`)
  );

  const completedCount = [hasLkpd1, hasLkpd2, hasLkpd3].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* NAVIGATION TABS / STAGES FOR UNIT 5 LKPDS */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-100 text-amber-700">
                <FileText className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-slate-900 font-serif">
                Trilogi Lembar Kerja Peserta Didik (LKPD) — Unit 5: Merancang Desain Produk Kriya Industri
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Alur perancangan kriya industri: Identitas Merek & Riset Ramah Lingkungan (Sinergi Unit 1) &rarr; Desain Digital Logo & Desain Brief &rarr; Video Produk Promosi.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shrink-0">
            <span className="font-bold text-slate-700">Kemajuan LKPD:</span>
            <span className="font-black text-amber-600">
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
                ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-400 shadow-md ring-2 ring-amber-400/20'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs ${
                  activeSubLkpd === 'lkpd1' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  1
                </div>
                <span className={`text-[11px] font-black uppercase tracking-wider ${
                  activeSubLkpd === 'lkpd1' ? 'text-amber-800' : 'text-slate-500'
                }`}>
                  Identitas & Riset
                </span>
              </div>
              {hasLkpd1 && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Terisi
                </span>
              )}
            </div>

            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
              LKPD 1: Identitas Merek & Riset Kriya
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
              Persona brand ramah lingkungan (Unit 1), riset kompetitor & sketsa ide logo awal.
            </p>
          </button>

          {/* LKPD 2 BUTTON */}
          <button
            type="button"
            onClick={() => setActiveSubLkpd('lkpd2')}
            className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative ${
              activeSubLkpd === 'lkpd2'
                ? 'bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-400 shadow-md ring-2 ring-teal-400/20'
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
                  Logo & Desain Brief
                </span>
              </div>
              {hasLkpd2 && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Terisi
                </span>
              )}
            </div>

            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
              LKPD 2: Desain Digital Logo & Brief
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
              Mood board warna/tipografi, digitalisasi logo (Canva/AI) & perumusan Desain Brief.
            </p>
          </button>

          {/* LKPD 3 BUTTON */}
          <button
            type="button"
            onClick={() => setActiveSubLkpd('lkpd3')}
            className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative ${
              activeSubLkpd === 'lkpd3'
                ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-400 shadow-md ring-2 ring-blue-400/20'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs ${
                  activeSubLkpd === 'lkpd3' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}>
                  3
                </div>
                <span className={`text-[11px] font-black uppercase tracking-wider ${
                  activeSubLkpd === 'lkpd3' ? 'text-blue-800' : 'text-slate-500'
                }`}>
                  Video Produk & Promosi
                </span>
              </div>
              {hasLkpd3 && (
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3 h-3" /> Terisi
                </span>
              )}
            </div>

            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
              LKPD 3: Video Produk & Promosi
            </h4>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
              Tujuan promosi, naskah/storyboard adegan, pencahayaan & uji coba audiens.
            </p>
          </button>
        </div>
      </div>

      {/* ACTIVE SUB-LKPD CONTENT */}
      {activeSubLkpd === 'lkpd1' && (
        <UnitFiveLkpdOne
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
        <UnitFiveLkpdTwo
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
        <UnitFiveLkpdThree
          user={user}
          levelId={levelId}
          status={status}
          questions={questions}
          initialAnswers={initialAnswers}
          onSave={onSave}
          saving={saving}
        />
      )}

      {/* QUICK FOOTER NAVIGATOR BETWEEN SUB-LKPDS */}
      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 text-xs">
        <div className="text-slate-500">
          Modul: <strong className="text-slate-800">Unit 5: Merancang Desain Produk Kriya Industri</strong>
        </div>

        <div className="flex items-center gap-2">
          {activeSubLkpd !== 'lkpd1' && (
            <button
              type="button"
              onClick={() => setActiveSubLkpd(activeSubLkpd === 'lkpd3' ? 'lkpd2' : 'lkpd1')}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer"
            >
              &larr; Tahap Sebelumnya
            </button>
          )}

          {activeSubLkpd !== 'lkpd3' && (
            <button
              type="button"
              onClick={() => setActiveSubLkpd(activeSubLkpd === 'lkpd1' ? 'lkpd2' : 'lkpd3')}
              className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              Lanjut Tahap Berikutnya <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
