import React, { useState, useEffect } from 'react';
import { 
  Calculator, DollarSign, Truck, FileText, TrendingUp, 
  Sparkles, ArrowRight, Edit3, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { translations } from '../../data/translations';

export const ProfitCalculatorScreen = ({ 
  activeLang, selectedMarket, selectedCrop, onCalculateFinished 
}) => {
  const [crop, setCrop] = useState(selectedCrop || 'Tomato');
  const [quantity, setQuantity] = useState(40); // 40 Quintals default
  const [location, setLocation] = useState('Pimpalgaon, Nashik');
  
  // Market rate from selected market or default ₹2,500/quintal
  const [marketName, setMarketName] = useState(selectedMarket ? `${selectedMarket.market} Mandi` : 'Pune Mandi');
  const [marketPrice, setMarketPrice] = useState(selectedMarket ? selectedMarket.modalPrice : 2500);
  
  // Editable costs
  const [transportCost, setTransportCost] = useState(1800); // Total Transport ₹
  const [otherExpenses, setOtherExpenses] = useState(1200);  // Labour, mandi fee ₹

  const t = translations[activeLang] || translations.en;

  // Sync state if selectedMarket prop changes
  useEffect(() => {
    if (selectedMarket) {
      setMarketName(`${selectedMarket.market} Mandi`);
      setMarketPrice(selectedMarket.modalPrice);
      if (selectedMarket.commodity) {
        setCrop(selectedMarket.commodity);
      }
    }
  }, [selectedMarket]);

  // Math Formulas requested
  const expectedRevenue = quantity * marketPrice;
  const totalExpenses = Number(transportCost) + Number(otherExpenses);
  const netProfit = expectedRevenue - totalExpenses;

  const handleProceedToRecommendation = () => {
    onCalculateFinished({
      crop,
      quantity,
      location,
      marketName,
      marketPrice,
      transportCost: Number(transportCost),
      otherExpenses: Number(otherExpenses),
      expectedRevenue,
      totalExpenses,
      netProfit,
      marketDetails: selectedMarket
    });
  };

  return (
    <div className="p-4 space-y-4 text-slate-100 pb-6">
      
      {/* Screen Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-lg text-white">
            {t.profitTitle}
          </h2>
          <p className="text-xs text-slate-400">
            {t.profitSubtitle}
          </p>
        </div>
        <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-mono">
          Smart Revenue AI
        </span>
      </div>

      {/* Editable Inputs Card */}
      <div className="glass-card rounded-3xl p-4 border border-slate-800 space-y-3 shadow-xl">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
          <span>Farmer Inputs</span>
          <span className="text-[10px] text-amber-400 font-normal flex items-center gap-1">
            <Edit3 className="w-3 h-3" /> {t.editCostNote}
          </span>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          
          {/* Crop Input */}
          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-1">{t.inputCrop}</label>
            <input
              type="text"
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Quantity in Quintals */}
          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-1">{t.inputQuantity}</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Current Location */}
          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-1">{t.inputLocation}</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Selected Market Name & Rate */}
          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-1">{t.inputSelectedMarket}</label>
            <div className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-emerald-300 font-semibold truncate">
              {marketName} (₹{marketPrice}/Qtl)
            </div>
          </div>

          {/* Editable Transport Cost */}
          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-1 flex items-center justify-between">
              <span>{t.inputTransportCost}</span>
              <Truck className="w-3 h-3 text-teal-400" />
            </label>
            <input
              type="number"
              value={transportCost}
              onChange={(e) => setTransportCost(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Editable Other Expenses */}
          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-1 flex items-center justify-between">
              <span>{t.inputOtherExpenses}</span>
              <FileText className="w-3 h-3 text-amber-400" />
            </label>
            <input
              type="number"
              value={otherExpenses}
              onChange={(e) => setOtherExpenses(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-amber-300 font-semibold focus:outline-none focus:border-amber-500"
            />
          </div>

        </div>
      </div>

      {/* Visual Earnings & Net Profit Breakdown Cards */}
      <div className="space-y-2.5">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider px-1">
          Financial Breakdown & Profit Summary
        </div>

        {/* Expected Gross Revenue */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">{t.expectedRevenue}</div>
              <div className="text-[10px] text-slate-400">
                {quantity} Quintals × ₹{marketPrice}/Qtl
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-extrabold text-blue-400">
              ₹{expectedRevenue.toLocaleString()}
            </div>
            <div className="text-[9px] text-slate-500">Gross Revenue</div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Total Costs (Transport + Fees)</div>
              <div className="text-[10px] text-slate-400">
                Transport ₹{transportCost} + Other ₹{otherExpenses}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-extrabold text-amber-400">
              - ₹{totalExpenses.toLocaleString()}
            </div>
            <div className="text-[9px] text-slate-500">Total Deductions</div>
          </div>
        </div>

        {/* Highly Visible Estimated Net Profit Card */}
        <div className="glass-card-emerald rounded-3xl p-4 border-2 border-emerald-500/70 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none animate-pulse-glow" />
          
          <div className="flex items-center justify-between mb-1">
            <span className="px-3 py-1 bg-emerald-500 text-slate-950 font-extrabold text-[10px] rounded-full flex items-center gap-1 shadow-md">
              <Sparkles className="w-3.5 h-3.5" /> {t.netProfitBadge}
            </span>
            <span className="text-[10px] text-emerald-300 font-mono">
              {t.calcFormula}
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-2">
            <div>
              <div className="text-xs font-bold text-slate-200">{t.netProfit}</div>
              <div className="text-[10px] text-emerald-300 mt-0.5">
                Clean profit in farmer's hand
              </div>
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 drop-shadow-md">
              ₹{netProfit.toLocaleString()}
            </div>
          </div>
        </div>

      </div>

      {/* Button: View AI Final Recommendation */}
      <button
        onClick={handleProceedToRecommendation}
        className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <span>{t.btnViewRecommendation}</span>
        <ArrowRight className="w-4 h-4 text-slate-950" />
      </button>

    </div>
  );
};
