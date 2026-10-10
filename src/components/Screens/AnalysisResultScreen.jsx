import React, { useState } from 'react';
import { 
  ShieldAlert, Sparkles, CheckCircle2, AlertTriangle, Pill, 
  Sprout, ArrowRight, CornerDownRight, ShieldCheck, Share2 
} from 'lucide-react';
import { translations } from '../../data/translations';

export const AnalysisResultScreen = ({ analysisData, activeLang, onFindMarket }) => {
  const [showHeatmap, setShowHeatmap] = useState(true);
  const t = translations[activeLang] || translations.en;

  if (!analysisData) return null;

  return (
    <div className="p-4 space-y-4 text-slate-100 pb-6">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-lg text-white">
            {t.analysisResultTitle}
          </h2>
          <p className="text-xs text-slate-400">
            {analysisData.cropName}
          </p>
        </div>
        
        {/* Clearly Labeled AI Analysis Demo Result Badge */}
        <span className="px-2.5 py-1 text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full font-bold flex items-center gap-1 shadow-sm">
          <Sparkles className="w-3 h-3 text-amber-400" /> {t.aiDemoBadge}
        </span>
      </div>

      {/* Main Result Card */}
      <div className="glass-card-emerald rounded-3xl p-4 border border-emerald-500/30 space-y-4 shadow-xl">
        
        {/* Leaf Image Preview with AI Heatmap Toggle */}
        <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-emerald-500/40 shadow-inner group">
          <img 
            src={analysisData.imageUrl} 
            alt={analysisData.cropName}
            className="w-full h-full object-cover"
          />

          {/* AI Heatmap Highlight Overlay Simulation */}
          {showHeatmap && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-rose-500/40 rounded-full blur-xl border-2 border-rose-400 animate-pulse" />
              <div className="absolute top-1/3 left-1/2 w-16 h-16 bg-amber-500/30 rounded-full blur-lg border border-amber-400" />
              <div className="absolute top-1/4 left-1/3 border-2 border-dashed border-rose-400 text-rose-200 text-[9px] font-bold px-1 rounded bg-black/60">
                Fungal Lesion ({analysisData.confidence}%)
              </div>
            </div>
          )}

          <div className="absolute bottom-2 right-2 z-10">
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className="px-2.5 py-1 bg-slate-950/80 hover:bg-slate-900 text-[10px] text-slate-200 border border-slate-700 rounded-lg font-medium backdrop-blur-md"
            >
              {showHeatmap ? 'Hide AI Bounding Box' : 'Show AI Bounding Box'}
            </button>
          </div>
        </div>

        {/* Diagnostic Metadata Stats Cards */}
        <div className="grid grid-cols-2 gap-2">
          
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-2.5">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{t.cropDetected}</div>
            <div className="text-xs font-extrabold text-white mt-0.5 truncate">{analysisData.cropName}</div>
            <div className="text-[10px] text-emerald-400 font-medium mt-0.5">{analysisData.qualityGrade}</div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-2.5">
            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{t.problemDetected}</div>
            <div className="text-xs font-extrabold text-rose-400 mt-0.5 truncate">{analysisData.diseaseName}</div>
            <div className="text-[10px] text-amber-300 font-bold mt-0.5">
              {analysisData.confidence}% {t.confidenceScore}
            </div>
          </div>

        </div>

      </div>

      {/* Treatment / Medicine Suggestion Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <Pill className="w-4 h-4" />
          </div>
          <h3 className="font-heading font-bold text-xs text-white uppercase tracking-wider">
            {t.treatmentTitle}
          </h3>
        </div>

        {/* Chemical Remedy */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/20 space-y-1">
          <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {t.chemicalOption}
          </div>
          <p className="text-xs text-slate-200 leading-snug">
            {analysisData.treatment.chemical}
          </p>
          <div className="text-[10px] text-slate-400 pt-1">
            <strong>Dosage:</strong> {analysisData.treatment.dosage}
          </div>
        </div>

        {/* Organic Remedy */}
        <div className="p-3 rounded-xl bg-slate-950/80 border border-teal-500/20 space-y-1">
          <div className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
            <Sprout className="w-3.5 h-3.5 text-teal-400" /> {t.organicOption}
          </div>
          <p className="text-xs text-slate-200 leading-snug">
            {analysisData.treatment.organic}
          </p>
        </div>

        {/* Verification Warning Disclaimer Box */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-[11px] text-amber-200/90 leading-snug">
            {t.disclaimerWarning}
          </p>
        </div>
      </div>

      {/* Fertilizer Recommendation Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-2 shadow-md">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-teal-500/20 text-teal-400">
            <Sprout className="w-4 h-4" />
          </div>
          <h3 className="font-heading font-bold text-xs text-white uppercase tracking-wider">
            {t.fertilizerTitle}
          </h3>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
          <div className="text-xs font-bold text-teal-300">
            {analysisData.fertilizer.category}
          </div>
          <div className="text-xs text-slate-300 leading-snug">
            <strong>{t.whyRecommended}:</strong> {analysisData.fertilizer.explanation}
          </div>
          {analysisData.soilAdvice && (
            <div className="text-[11px] text-emerald-400/90 pt-1 border-t border-slate-800/80 mt-1">
              🌱 <strong>Soil Management:</strong> {analysisData.soilAdvice}
            </div>
          )}
        </div>
      </div>

      {/* Next Step CTA: Find Mandi Market */}
      <button
        onClick={() => onFindMarket(analysisData.cropKey || 'Tomato')}
        className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <span>Compare Live Mandi Market Prices for {analysisData.cropKey}</span>
        <ArrowRight className="w-4 h-4" />
      </button>

    </div>
  );
};
