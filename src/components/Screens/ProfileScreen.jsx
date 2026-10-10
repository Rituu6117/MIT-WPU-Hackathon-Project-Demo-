import React from 'react';
import { User, MapPin, Database, Award, Languages, ShieldCheck, PhoneCall } from 'lucide-react';
import { translations } from '../../data/translations';

export const ProfileScreen = ({ activeLang, setActiveLang }) => {
  const t = translations[activeLang] || translations.en;

  return (
    <div className="p-4 space-y-4 text-slate-100 pb-6">
      
      {/* Profile Card */}
      <div className="glass-card-emerald rounded-3xl p-5 border border-emerald-500/30 flex items-center gap-4 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-600 p-0.5 shadow-lg shadow-emerald-500/20">
          <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center text-emerald-400 text-2xl font-bold">
            🌾
          </div>
        </div>

        <div>
          <h2 className="font-heading font-extrabold text-base text-white">
            Ramesh Patil (रमेश पाटील)
          </h2>
          <div className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Pimpalgaon, Nashik • Maharashtra</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold border border-emerald-500/30">
              4.5 Acres Cultivated
            </span>
            <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full font-semibold border border-teal-500/30">
              Tomato & Wheat
            </span>
          </div>
        </div>
      </div>

      {/* Dataset & System Health */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          System & Data Status
        </div>

        <div className="space-y-2">
          
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-teal-400" />
              <span className="text-xs text-slate-200">Mandi Dataset Records</span>
            </div>
            <span className="text-xs font-mono font-bold text-teal-300">5,559 Mandis</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-200">AI Leaf Vision Engine</span>
            </div>
            <span className="text-xs font-bold text-emerald-400">v2.4 Active</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-200">Project Prototype</span>
            </div>
            <span className="text-xs font-bold text-amber-400">SIH Hackathon Demo</span>
          </div>

        </div>
      </div>

      {/* Farmer Helpline Contact */}
      <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-emerald-300">Kisan Call Center Support</div>
          <div className="text-[10px] text-slate-300">24x7 Free Agriculture Expert Helpline</div>
        </div>
        <a 
          href="tel:18001801551" 
          className="px-3 py-1.5 bg-emerald-500 text-slate-950 text-xs font-extrabold rounded-xl shadow-md flex items-center gap-1"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>1800-180-1551</span>
        </a>
      </div>

    </div>
  );
};
