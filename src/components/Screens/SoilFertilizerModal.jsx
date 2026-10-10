import React from 'react';
import { X, Sprout, ShieldCheck, CheckCircle2, Info } from 'lucide-react';
import { translations } from '../../data/translations';

export const SoilFertilizerModal = ({ isOpen, onClose, activeLang }) => {
  const t = translations[activeLang] || translations.en;

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex flex-col justify-end p-4 animate-in fade-in duration-200">
      <div className="w-full glass-card-emerald rounded-3xl p-5 border border-emerald-500/40 relative max-h-[85%] overflow-y-auto phone-screen-scroll shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800/80 border border-slate-700/60"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-base font-bold text-white">
              {t.soilTitle}
            </h3>
            <p className="text-xs text-slate-400">{t.soilSubtitle}</p>
          </div>
        </div>

        <div className="space-y-3 my-3">
          
          {/* Phase 1: Vegetative Stage */}
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-emerald-500/20 space-y-1">
            <div className="text-xs font-bold text-emerald-300 flex items-center justify-between">
              <span>1. Vegetative Growth Stage</span>
              <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">High Nitrogen</span>
            </div>
            <p className="text-xs text-slate-300">
              Apply Urea or N-P-K 19:19:19 @ 5g/L water to stimulate foliage expansion and chlorophyll build-up.
            </p>
          </div>

          {/* Phase 2: Flowering Stage */}
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-teal-500/20 space-y-1">
            <div className="text-xs font-bold text-teal-300 flex items-center justify-between">
              <span>2. Flowering & Budding Stage</span>
              <span className="text-[9px] bg-teal-500/20 text-teal-300 px-1.5 py-0.5 rounded">High Phosphorus</span>
            </div>
            <p className="text-xs text-slate-300">
              Apply N-P-K 12:61:0 (Mono Ammonium Phosphate) + Boron @ 1.5g/L to prevent flower drop and encourage root branching.
            </p>
          </div>

          {/* Phase 3: Fruiting & Harvest Stage */}
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-amber-500/20 space-y-1">
            <div className="text-xs font-bold text-amber-300 flex items-center justify-between">
              <span>3. Fruit Development Stage</span>
              <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">High Potash</span>
            </div>
            <p className="text-xs text-slate-300">
              Apply N-P-K 0:0:50 (Sulphate of Potash) @ 5g/L to enhance fruit size, skin shine, sugar content, and shelf life.
            </p>
          </div>

        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all"
        >
          Got It, Back to App
        </button>

      </div>
    </div>
  );
};
