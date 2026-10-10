import React, { useState, useEffect, useMemo } from 'react';
import { 
  Store, Search, Filter, Award, TrendingUp, MapPin, 
  ArrowRight, RefreshCw, CheckCircle2, ChevronDown 
} from 'lucide-react';
import { translations } from '../../data/translations';
import { 
  loadMarketData, getUniqueStates, getDistrictsForState, 
  getUniqueCommodities, filterMarketData, findBestMarket 
} from '../../services/csvDataLoader';

export const MarketScreen = ({ activeLang, initialCommodity, onSelectMarketForProfit }) => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCommodity, setSelectedCommodity] = useState(initialCommodity || 'Tomato');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const t = translations[activeLang] || translations.en;

  useEffect(() => {
    loadMarketData()
      .then(data => {
        setAllData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load dataset:', err);
        setLoading(false);
      });
  }, []);

  // Update selected commodity if initialCommodity prop changes
  useEffect(() => {
    if (initialCommodity) {
      setSelectedCommodity(initialCommodity);
    }
  }, [initialCommodity]);

  const uniqueStates = useMemo(() => getUniqueStates(allData), [allData]);
  const uniqueDistricts = useMemo(() => getDistrictsForState(allData, selectedState), [allData, selectedState]);
  const uniqueCommodities = useMemo(() => getUniqueCommodities(allData), [allData]);

  const filteredMarkets = useMemo(() => {
    return filterMarketData(allData, {
      commodity: selectedCommodity,
      state: selectedState,
      district: selectedDistrict,
      searchQuery
    });
  }, [allData, selectedCommodity, selectedState, selectedDistrict, searchQuery]);

  const bestMarket = useMemo(() => findBestMarket(filteredMarkets), [filteredMarkets]);

  return (
    <div className="p-4 space-y-4 text-slate-100 pb-6">
      
      {/* Screen Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-lg text-white">
            {t.marketTitle}
          </h2>
          <p className="text-xs text-slate-400">
            {t.marketSubtitle}
          </p>
        </div>
        <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-mono">
          5,559 Mandi Rates
        </span>
      </div>

      {/* Filter Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 space-y-2 shadow-md">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Filters Dropdown Grid */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          
          {/* Commodity Dropdown */}
          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-0.5">{t.filterCommodity}</label>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-1.5 text-[11px] text-emerald-300 focus:outline-none"
            >
              <option value="ALL">All Crops</option>
              <option value="Tomato">Tomato (टोमॅटो)</option>
              <option value="Paddy(Dhan)(Common)">Paddy / Rice (धान)</option>
              <option value="Wheat">Wheat (गहू)</option>
              <option value="Cotton">Cotton (कापूस)</option>
              <option value="Potato">Potato (बटाटा)</option>
              <option value="Onion">Onion (कांदा)</option>
              <option value="Mango">Mango (आंबा)</option>
              {uniqueCommodities.slice(0, 30).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* State Dropdown */}
          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-0.5">{t.filterState}</label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('ALL');
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-1.5 text-[11px] text-slate-200 focus:outline-none"
            >
              <option value="ALL">All States</option>
              {uniqueStates.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* District Dropdown */}
          <div>
            <label className="text-[10px] text-slate-400 font-semibold block mb-0.5">{t.filterDistrict}</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2 py-1.5 text-[11px] text-slate-200 focus:outline-none"
            >
              <option value="ALL">All Districts</option>
              {uniqueDistricts.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center text-slate-400 space-y-2">
          <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
          <span className="text-xs">Loading Mandi Dataset...</span>
        </div>
      ) : filteredMarkets.length === 0 ? (
        <div className="py-8 bg-slate-900/60 rounded-2xl border border-slate-800 text-center space-y-2 p-4">
          <Store className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-xs text-slate-400">No mandi rates found for selected filters.</p>
          <button 
            onClick={() => {
              setSelectedCommodity('ALL');
              setSelectedState('ALL');
              setSelectedDistrict('ALL');
              setSearchQuery('');
            }}
            className="text-xs text-emerald-400 font-semibold underline"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          
          {/* Best Market Highlighted Card Requirement */}
          {bestMarket && (
            <div className="glass-card-emerald rounded-3xl p-4 border-2 border-emerald-500/60 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-400/15 rounded-full blur-xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-2">
                <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 text-[10px] font-extrabold rounded-full flex items-center gap-1.5 shadow-md">
                  <Award className="w-3.5 h-3.5 text-slate-950" /> {t.bestMarketBadge}
                </span>
                <span className="text-[10px] text-emerald-300 font-medium">
                  {t.bestMarketDesc}
                </span>
              </div>

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-base text-white">
                    {bestMarket.market} Mandi
                  </h3>
                  <div className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span>{bestMarket.district}, {bestMarket.state}</span>
                  </div>
                  <div className="text-[11px] text-emerald-300/90 font-medium mt-1">
                    Commodity: <strong>{bestMarket.commodity}</strong> ({bestMarket.variety})
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xl font-extrabold text-emerald-400">
                    ₹{bestMarket.modalPrice.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold">{t.perQuintal}</div>
                  <div className="text-[9px] text-teal-300 mt-1">
                    Range: ₹{bestMarket.minPrice} - ₹{bestMarket.maxPrice}
                  </div>
                </div>
              </div>

              {/* Action: Select Best Market for Profit Calculation */}
              <button
                onClick={() => onSelectMarketForProfit(bestMarket)}
                className="w-full mt-3 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Calculate Net Profit for {bestMarket.market} Mandi</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

            </div>
          )}

          {/* List of All Matching Mandis */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-300">
              <span>All Matching Mandi Markets ({filteredMarkets.length})</span>
              <span className="text-[10px] text-slate-400">Sorted by Modal Rate</span>
            </div>

            <div className="space-y-2 max-h-[420px] overflow-y-auto phone-screen-scroll pr-1">
              {filteredMarkets.map((mkt, idx) => {
                const isBest = bestMarket && bestMarket.id === mkt.id;
                return (
                  <div
                    key={mkt.id}
                    className={`p-3 rounded-2xl border transition-all ${
                      isBest 
                        ? 'bg-emerald-950/40 border-emerald-500/40' 
                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-heading font-bold text-xs text-white">
                            {mkt.market} Mandi
                          </h4>
                          {isBest && (
                            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold border border-emerald-500/30">
                              BEST
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {mkt.district}, {mkt.state} • {mkt.commodity}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-extrabold text-emerald-400">
                          ₹{mkt.modalPrice} <span className="text-[10px] text-slate-400 font-normal">/ Qtl</span>
                        </div>
                        <div className="text-[9px] text-slate-400">
                          Min: ₹{mkt.minPrice} | Max: ₹{mkt.maxPrice}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">
                        Grade: {mkt.grade} ({mkt.variety})
                      </span>
                      <button
                        onClick={() => onSelectMarketForProfit(mkt)}
                        className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline"
                      >
                        <span>Select for Profit</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
