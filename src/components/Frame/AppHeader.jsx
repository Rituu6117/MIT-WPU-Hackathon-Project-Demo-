import React from 'react';
import { Mic, Languages, Sparkles, Database } from 'lucide-react';
import { translations } from '../../data/translations';

export const AppHeader = ({ activeLang, setActiveLang, onVoiceClick, dataLoaded }) => {
  const t = translations[activeLang] || translations.en;

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-md px-4 py-2.5 border-b border-emerald-500/20 flex items-center justify-between sticky top-0 z-20 shadow-md">
      
      {/* Brand & Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20">
          <Sparkles className="w-4 h-4 text-slate-950 font-bold" />
        </div>
        <div>
          <h2 className="font-heading font-extrabold text-sm text-white tracking-wide leading-tight">
            {t.appName}
          </h2>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>AI Online</span>
            {dataLoaded && (
              <span className="text-slate-400 flex items-center gap-0.5 ml-1">
                • <Database className="w-2.5 h-2.5 text-teal-400" /> Mandi Data Ready
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Language Switcher & Voice Trigger */}
      <div className="flex items-center gap-2">
        
        {/* Language Selector Dropdown */}
        <div className="relative flex items-center bg-slate-800/90 border border-slate-700/80 rounded-lg px-2 py-1 hover:border-emerald-500/50 transition-colors">
          <Languages className="w-3.5 h-3.5 text-emerald-400 mr-1 shrink-0" />
          <select
            value={activeLang}
            onChange={(e) => setActiveLang(e.target.value)}
            className="bg-transparent text-xs text-slate-200 font-medium focus:outline-none cursor-pointer pr-1"
          >
            <option value="mr" className="bg-slate-900 text-white">मराठी (MR)</option>
            <option value="hi" className="bg-slate-900 text-white">हिंदी (HI)</option>
            <option value="en" className="bg-slate-900 text-white">English (EN)</option>
          </select>
        </div>

        {/* Voice Assistant Mic Button */}
        <button
          onClick={onVoiceClick}
          className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 flex items-center justify-center font-bold shadow-md shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all"
          title={t.btnVoiceAssist}
        >
          <Mic className="w-4 h-4 text-slate-950" />
        </button>

      </div>

    </div>
  );
};
