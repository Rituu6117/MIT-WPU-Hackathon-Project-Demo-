import React, { useState, useEffect } from 'react';
import { Mic, X, Volume2, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { translations } from '../../data/translations';
import { startVoiceRecognition, speakText } from '../../services/speechService';

export const VoiceAssistantModal = ({ isOpen, onClose, activeLang, onSelectVoiceQuery }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const t = translations[activeLang] || translations.en;

  useEffect(() => {
    if (isOpen) {
      handleStartListening();
    } else {
      setIsListening(false);
      setTranscript('');
    }
  }, [isOpen]);

  const handleStartListening = () => {
    setIsListening(true);
    setTranscript('');
    
    startVoiceRecognition(
      (text) => {
        setTranscript(text);
        setIsListening(false);
        speakText(
          activeLang === 'mr' ? 'समजले! मी माहिती मिळवत आहे.' :
          activeLang === 'hi' ? 'समझ गया! मैं जानकारी ला रहा हूँ।' :
          'Understood! Fetching agricultural intelligence.',
          activeLang
        );
      },
      (err) => {
        setIsListening(false);
      },
      activeLang
    );
  };

  const handleQuickDemoQuery = (cmdText, targetAction) => {
    setTranscript(cmdText);
    setIsListening(false);
    speakText(cmdText, activeLang);
    setTimeout(() => {
      onSelectVoiceQuery(targetAction);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex flex-col justify-end p-4 animate-in fade-in duration-200">
      <div className="w-full glass-card-emerald rounded-3xl p-5 border border-emerald-500/40 relative flex flex-col items-center shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800/80 border border-slate-700/60"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Mic Pulse Icon */}
        <div className="relative mb-3 mt-1">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
            isListening
              ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-xl shadow-emerald-500/50 scale-105'
              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
          }`}>
            <Mic className={`w-9 h-9 ${isListening ? 'text-slate-950 animate-bounce' : 'text-emerald-400'}`} />
          </div>

          {/* Soundwave Animation */}
          {isListening && (
            <div className="flex items-center gap-1 absolute -bottom-3 left-1/2 -translate-x-1/2">
              <div className="w-1 bg-emerald-400 rounded-full soundwave-bar-1" />
              <div className="w-1 bg-emerald-300 rounded-full soundwave-bar-2" />
              <div className="w-1 bg-emerald-400 rounded-full soundwave-bar-3" />
              <div className="w-1 bg-emerald-300 rounded-full soundwave-bar-4" />
            </div>
          )}
        </div>

        <h3 className="font-heading text-lg font-bold text-white text-center mt-2">
          {t.voiceModalTitle}
        </h3>
        
        <p className="text-xs text-emerald-400 font-medium text-center mt-1">
          {isListening ? t.voiceModalListening : 'Voice AI Assistant Ready'}
        </p>

        {/* Live Transcript Display */}
        {transcript && (
          <div className="w-full bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-3 my-3 text-center text-sm font-medium text-emerald-200 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>"{transcript}"</span>
          </div>
        )}

        {/* Demo Preset Voice Buttons */}
        <div className="w-full my-3">
          <p className="text-[11px] text-slate-400 font-semibold mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" /> {t.voiceModalTry}
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => handleQuickDemoQuery(t.voiceCmd1, { screen: 'markets', commodity: 'Tomato', district: 'Pune' })}
              className="text-left text-xs bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 text-slate-200 p-2.5 rounded-xl flex items-center justify-between transition-all"
            >
              <span>{t.voiceCmd1}</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </button>
            <button
              onClick={() => handleQuickDemoQuery(t.voiceCmd2, { screen: 'cropAI', sampleId: 'tomato-blight' })}
              className="text-left text-xs bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 text-slate-200 p-2.5 rounded-xl flex items-center justify-between transition-all"
            >
              <span>{t.voiceCmd2}</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </button>
            <button
              onClick={() => handleQuickDemoQuery(t.voiceCmd3, { screen: 'profit', crop: 'Wheat', quantity: 50 })}
              className="text-left text-xs bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 text-slate-200 p-2.5 rounded-xl flex items-center justify-between transition-all"
            >
              <span>{t.voiceCmd3}</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </button>
          </div>
        </div>

        {/* Retry Button */}
        <button
          onClick={handleStartListening}
          className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all mt-1 flex items-center justify-center gap-2"
        >
          <Mic className="w-4 h-4" />
          <span>Tap to Speak Again</span>
        </button>

      </div>
    </div>
  );
};
