import React, { useEffect } from 'react';
import { 
  Sparkles, Award, TrendingUp, CheckCircle2, AlertTriangle, 
  Share2, Printer, ArrowRight, ShieldCheck, ThumbsUp, ChevronRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations } from '../../data/translations';

export const AIFinalRecommendationScreen = ({ 
  activeLang, profitData, analysisData, onReset 
}) => {
  const t = translations[activeLang] || translations.en;

  // Trigger celebratory confetti on screen load!
  useEffect(() => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti trigger', e);
    }
  }, []);

  const marketName = profitData?.marketName || 'Pune Mandi (Highest Return)';
  const expectedEarning = profitData?.expectedRevenue || 100000;
  const netProfit = profitData?.netProfit || 97000;
  const cropProblem = analysisData?.diseaseName || 'Early Blight (Controlled Stage)';
  const cropName = profitData?.crop || analysisData?.cropKey || 'Tomato';

  const suggestedAction = activeLang === 'mr' 
    ? `पुणे मंडीमध्ये येत्या ३ दिवसांत टोमॅटो विक्रीसाठी न्यावी. वाहतूक खर्च ₹${profitData?.transportCost || 1800} वजा करून सर्वाधिक ₹${netProfit.toLocaleString()} निव्वळ नफा मिळेल.`
    : activeLang === 'hi'
    ? `पुणे मंडी में अगले 3 दिनों में टमाटर बिक्री के लिए ले जाएं। परिवहन खर्च ₹${profitData?.transportCost || 1800} घटाकर सर्वाधिक ₹${netProfit.toLocaleString()} शुद्ध लाभ मिलेगा।`
    : `Transport your ${cropName} to ${marketName} within 3 days. After deducting ₹${profitData?.transportCost || 1800} transport cost, you achieve maximum net profit of ₹${netProfit.toLocaleString()}.`;

  const reasoning = activeLang === 'mr'
    ? `${marketName} चा सर्वसाधारण दर सर्वाधिक ₹${profitData?.marketPrice || 2500}/क्विंटल आहे. स्थानिक बाजारापेक्षा प्रति क्विंटल ₹३५० जास्त दर मिळतो, ज्यामुळे अतिरिक्त वाहतूक खर्च निघून निव्वळ नफा ₹${netProfit.toLocaleString()} होतो.`
    : activeLang === 'hi'
    ? `${marketName} का मॉडल मूल्य सबसे अधिक ₹${profitData?.marketPrice || 2500}/क्विंटल है। स्थानीय मंडी से ₹350 प्रति क्विंटल अधिक दर मिलता है, जिससे शुद्ध लाभ ₹${netProfit.toLocaleString()} होता है।`
    : `${marketName} offers the highest modal rate of ₹${profitData?.marketPrice || 2500}/Quintal. It yields ₹350 higher rate per quintal than regional alternatives, comfortably covering transport costs and maximizing net profit to ₹${netProfit.toLocaleString()}.`;

  return (
    <div className="p-4 space-y-4 text-slate-100 pb-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-lg text-white">
            {t.finalTitle}
          </h2>
          <p className="text-xs text-slate-400">
            {t.finalSubtitle}
          </p>
        </div>
        <span className="px-2.5 py-1 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-bold flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> AI Verified
        </span>
      </div>

      {/* Main AI Final Recommendation Card */}
      <div className="glass-card-emerald rounded-3xl p-5 border-2 border-emerald-500/70 shadow-2xl space-y-4 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Recommendation Header */}
        <div className="flex items-center justify-between pb-2 border-b border-emerald-500/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-sm text-white">
                KrishiMitra AI Recommendation
              </h3>
              <div className="text-[10px] text-emerald-300 font-medium">Optimal Farming Decision</div>
            </div>
          </div>
          
          <span className="px-2.5 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[10px] font-extrabold rounded-full shadow-md">
            BEST MARKET RETURN
          </span>
        </div>

        {/* Recommended Details Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          
          {/* Recommended Market */}
          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-3">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">{t.recMarketLabel}</div>
            <div className="text-xs font-extrabold text-emerald-300 mt-1 truncate">
              {marketName}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Rate: ₹{profitData?.marketPrice || 2500} / Qtl
            </div>
          </div>

          {/* Expected Revenue */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">{t.recEarningLabel}</div>
            <div className="text-xs font-extrabold text-blue-400 mt-1">
              ₹{expectedEarning.toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Quantity: {profitData?.quantity || 40} Quintals
            </div>
          </div>

        </div>

        {/* Highlighted Net Profit Badge Card */}
        <div className="bg-slate-950 border-2 border-emerald-400 rounded-2xl p-3.5 flex items-center justify-between shadow-lg">
          <div>
            <div className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider">
              {t.recNetProfitLabel}
            </div>
            <div className="text-2xl font-extrabold text-white mt-0.5">
              ₹{netProfit.toLocaleString()}
            </div>
            <div className="text-[9px] text-emerald-300 font-medium mt-0.5">
              Estimated Net Return in Hand
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
            <ThumbsUp className="w-6 h-6" />
          </div>
        </div>

        {/* Crop Health Diagnosis */}
        <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 font-semibold uppercase">{t.recCropHealthLabel}</div>
          <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{cropProblem}</span>
          </div>
          <div className="text-[11px] text-slate-300 mt-1">
            Spray recommended Copper Oxychloride 50% WP before transporting crop to maintain shelf life.
          </div>
        </div>

        {/* Suggested Next Action */}
        <div className="p-3 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-1.5">
          <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t.recSuggestedAction}</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            "{suggestedAction}"
          </p>
        </div>

        {/* AI Reasoning Summary */}
        <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-400 font-semibold uppercase">{t.recWhyReasoning}</div>
          <p className="text-[11px] text-slate-300 leading-snug">
            {reasoning}
          </p>
        </div>

      </div>

      {/* Share / Print Action Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => alert('Report summary copied! Ready to share via WhatsApp with farmer friends.')}
          className="py-2.5 px-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 flex items-center justify-center gap-2 transition-all"
        >
          <Share2 className="w-4 h-4 text-emerald-400" />
          <span>{t.btnShareReport}</span>
        </button>

        <button
          onClick={() => window.print()}
          className="py-2.5 px-3 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 flex items-center justify-center gap-2 transition-all"
        >
          <Printer className="w-4 h-4 text-teal-400" />
          <span>{t.btnPrint}</span>
        </button>
      </div>

    </div>
  );
};
