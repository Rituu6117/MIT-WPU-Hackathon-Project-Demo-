import React, { useState, useEffect } from 'react';
import { Smartphone, Monitor, Maximize2, Sparkles, Signal, Wifi, Battery, ChevronRight, ShieldCheck } from 'lucide-react';

export const SmartphoneFrame = ({ children, activeLang, setActiveLang, onVoiceClick, sihBadgeText }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [scaleMode, setScaleMode] = useState('phone'); // 'phone' or 'fullscreen'

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col items-center justify-between p-2 sm:p-4 md:p-6 relative overflow-x-hidden selection:bg-emerald-500">
      
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Website Top Bar / Banner */}
      <header className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 py-2 px-4 glass-card rounded-2xl border border-emerald-500/20 mb-4 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shadow-emerald-500/30">
            🌾
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading font-extrabold text-xl text-white tracking-wide">AgriMitra AI</h1>
              <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> {sihBadgeText || 'SIH Project Demo'}
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Smart Crop Disease AI • Live Mandi Rates • Revenue & Net Profit AI</p>
          </div>
        </div>

        {/* View Mode Switcher Controls */}
        <div className="flex items-center gap-2">
          <div className="bg-slate-900/90 p-1 rounded-xl border border-slate-700/60 flex items-center gap-1">
            <button
              onClick={() => setScaleMode('phone')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                scaleMode === 'phone'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Smartphone View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Smartphone Frame</span>
            </button>
            <button
              onClick={() => setScaleMode('fullscreen')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                scaleMode === 'fullscreen'
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Expanded Full Mobile View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Screen</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Holding Smartphone Mockup */}
      <main className="w-full flex-1 flex flex-col items-center justify-center z-10 py-2">
        <div 
          className={`transition-all duration-500 ease-out flex justify-center items-center w-full ${
            scaleMode === 'fullscreen' ? 'max-w-md h-[92vh]' : 'max-w-[410px] h-[850px]'
          }`}
        >
          {/* Outer Phone Shell */}
          <div className="w-full h-full bg-slate-900 rounded-[48px] p-3 sm:p-3.5 relative phone-outer-shadow border-[4px] border-slate-700/80 flex flex-col justify-between overflow-hidden group">
            
            {/* Phone Hardware Details: Volume & Power Side Buttons */}
            <div className="absolute -left-[7px] top-28 w-[4px] h-12 bg-slate-700 rounded-l-md" />
            <div className="absolute -left-[7px] top-44 w-[4px] h-12 bg-slate-700 rounded-l-md" />
            <div className="absolute -right-[7px] top-36 w-[4px] h-16 bg-slate-700 rounded-r-md" />

            {/* Smartphone Inner Display Screen */}
            <div className="w-full h-full bg-slate-950 rounded-[38px] flex flex-col overflow-hidden relative border border-slate-800/80 shadow-inner">
              
              {/* Status Bar */}
              <div className="w-full h-11 bg-slate-950/95 text-slate-300 text-xs px-6 flex items-center justify-between z-30 shrink-0 select-none border-b border-slate-800/50">
                <span className="font-semibold text-[13px] tracking-tight text-emerald-400">{currentTime || '10:42'}</span>
                
                {/* Dynamic Island / Notch Camera */}
                <div className="w-24 h-5 bg-black rounded-full border border-slate-800/80 flex items-center justify-center gap-2 px-2 shadow-sm">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-emerald-500/40 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                </div>

                {/* Status Icons */}
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Signal className="w-3.5 h-3.5 text-emerald-400" />
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <Battery className="w-4 h-4 text-emerald-400" />
                </div>
              </div>

              {/* Main App Content Scroll View */}
              <div className="flex-1 w-full overflow-y-auto phone-screen-scroll flex flex-col relative bg-slate-950">
                {children}
              </div>

              {/* Smartphone Bottom Home Bar */}
              <div className="w-full bg-slate-950 pt-1 pb-2 flex justify-center shrink-0 z-30">
                <div className="w-32 h-1 bg-slate-700/80 rounded-full" />
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Website Footer Info */}
      <footer className="w-full max-w-6xl mx-auto py-2 text-center text-xs text-slate-500 z-10 flex flex-col sm:flex-row items-center justify-between gap-2 px-4 border-t border-slate-800/60 mt-2">
        <span>AgriMitra AI — Empowering Indian Farmers with Artificial Intelligence</span>
        <div className="flex items-center gap-4 text-slate-400">
          <span>Dataset: 5,559+ Daily Mandi Records</span>
          <span>•</span>
          <span className="text-emerald-400 font-medium">SIH Hackathon Ready</span>
        </div>
      </footer>

    </div>
  );
};
