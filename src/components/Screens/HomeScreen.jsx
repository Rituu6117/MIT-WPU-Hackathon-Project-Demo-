import React from 'react';
import { 
  Stethoscope, Store, Calculator, Sprout, CloudSun, AlertTriangle, 
  TrendingUp, ShieldCheck, ChevronRight, Sparkles, ArrowUpRight, Zap 
} from 'lucide-react';
import { translations } from '../../data/translations';

export const HomeScreen = ({ activeLang, setActiveScreen, onOpenSoilModal }) => {
  const t = translations[activeLang] || translations.en;

  return (
    <div className="p-4 space-y-4 text-slate-100 pb-6">
      
      {/* Welcome Hero Banner */}
      <div className="relative glass-card-emerald rounded-3xl p-4 overflow-hidden border border-emerald-500/30 shadow-xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-2">
          <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" /> {t.appName} 2.0
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            {t.weatherLocation}
          </span>
        </div>

        <h2 className="font-heading font-extrabold text-lg text-white leading-tight">
          {t.welcomeTitle}
        </h2>
        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
          {t.welcomeSubtitle}
        </p>

        {/* Action Buttons requested in Screen 1 */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={() => setActiveScreen('cropAI')}
            className="py-2.5 px-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Stethoscope className="w-4 h-4 text-slate-950" />
            <span>{t.btnCropAnalysis}</span>
          </button>

          <button
            onClick={() => setActiveScreen('markets')}
            className="py-2.5 px-3 bg-slate-900/90 border border-emerald-500/40 hover:bg-slate-800 text-emerald-300 font-bold text-xs rounded-xl shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Store className="w-4 h-4 text-emerald-400" />
            <span>{t.btnMarketProfit}</span>
          </button>
        </div>
      </div>

      {/* Weather & Field Info Card */}
      <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <CloudSun className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Pune / Nashik District</div>
            <div className="text-[11px] text-slate-400">{t.weatherCondition}</div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold border border-emerald-500/30">
            {t.idealSowing}
          </span>
          <div className="text-[10px] text-slate-400 mt-1">Moisture: 72%</div>
        </div>
      </div>

      {/* Main Feature Cards Grid */}
      <div className="space-y-2">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider px-1">
          Smart Agriculture Tools
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          
          {/* Crop Disease AI */}
          <div 
            onClick={() => setActiveScreen('cropAI')}
            className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-3.5 cursor-pointer transition-all group shadow-md"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2 group-hover:scale-110 transition-transform">
              <Stethoscope className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-xs text-white group-hover:text-emerald-300">
              {t.btnCropAnalysis}
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
              Detect leaf disease with AI scan & remedies
            </p>
          </div>

          {/* Live Mandi Comparison */}
          <div 
            onClick={() => setActiveScreen('markets')}
            className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-teal-500/50 rounded-2xl p-3.5 cursor-pointer transition-all group shadow-md"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-2 group-hover:scale-110 transition-transform">
              <Store className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-xs text-white group-hover:text-teal-300">
              Live Mandi Rates
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
              Compare 5,500+ daily market rates & best mandi
            </p>
          </div>

          {/* Expected Profit Calculator */}
          <div 
            onClick={() => setActiveScreen('profit')}
            className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-3.5 cursor-pointer transition-all group shadow-md"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2 group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-xs text-white group-hover:text-amber-300">
              Profit Calculator
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
              Calculate revenue minus transport & expenses
            </p>
          </div>

          {/* Soil & Fertilizer */}
          <div 
            onClick={onOpenSoilModal}
            className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-3.5 cursor-pointer transition-all group shadow-md"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2 group-hover:scale-110 transition-transform">
              <Sprout className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-xs text-white group-hover:text-emerald-300">
              {t.btnSoilFertilizer}
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
              NPK nutrient guide & soil dosage planner
            </p>
          </div>

        </div>
      </div>

      {/* AI Pest Advisory Alert Banner */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-3 flex items-start gap-3">
        <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300">{t.recentAlerts}</span>
            <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono">HIGH RISK</span>
          </div>
          <p className="text-[11px] text-slate-300 mt-1 leading-snug">
            {t.alertBollworm}
          </p>
          <button 
            onClick={() => setActiveScreen('cropAI')}
            className="text-[11px] font-semibold text-emerald-400 hover:underline flex items-center gap-1 mt-1.5"
          >
            <span>Scan leaf now</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Quick Mandi Market Teaser */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> Today's Highest Mandi Gainers
          </span>
          <button 
            onClick={() => setActiveScreen('markets')}
            className="text-[11px] text-emerald-400 font-medium hover:underline flex items-center gap-0.5"
          >
            View All <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div>
              <div className="text-xs font-semibold text-white">Tomato (टोमॅटो)</div>
              <div className="text-[10px] text-slate-400">Pune Mandi • Maharashtra</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-emerald-400">₹2,800 / Qtl</div>
              <div className="text-[9px] text-emerald-300 font-medium">Highest Rate</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <div>
              <div className="text-xs font-semibold text-white">Paddy (धान / चावल)</div>
              <div className="text-[10px] text-slate-400">Sampara Mandi • East Godavari</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-emerald-400">₹2,180 / Qtl</div>
              <div className="text-[9px] text-teal-300 font-medium">Modal Rate</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
