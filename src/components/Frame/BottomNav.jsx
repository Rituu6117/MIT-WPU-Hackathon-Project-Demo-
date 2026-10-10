import React from 'react';
import { Home, Stethoscope, Store, Calculator, User } from 'lucide-react';
import { translations } from '../../data/translations';

export const BottomNav = ({ activeScreen, setActiveScreen, activeLang }) => {
  const t = translations[activeLang] || translations.en;

  const navItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'cropAI', label: t.navCropAI, icon: Stethoscope },
    { id: 'markets', label: t.navMarkets, icon: Store },
    { id: 'profit', label: t.navProfit, icon: Calculator },
    { id: 'profile', label: t.navProfile, icon: User },
  ];

  return (
    <div className="w-full bg-slate-900/95 backdrop-blur-md border-t border-slate-800/80 px-2 py-1.5 flex items-center justify-around sticky bottom-0 z-20 shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeScreen === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => setActiveScreen(item.id)}
            className={`flex flex-col items-center justify-center px-2 py-1 rounded-xl transition-all duration-200 relative ${
              isActive
                ? 'text-emerald-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {/* Active Indicator Bar */}
            {isActive && (
              <span className="absolute -top-1.5 w-6 h-1 bg-emerald-400 rounded-full shadow-sm shadow-emerald-400" />
            )}
            
            <div className={`p-1.5 rounded-xl transition-all ${
              isActive ? 'bg-emerald-500/15 text-emerald-400' : ''
            }`}>
              <Icon className="w-5 h-5" />
            </div>

            <span className="text-[10px] mt-0.5 tracking-tight">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
