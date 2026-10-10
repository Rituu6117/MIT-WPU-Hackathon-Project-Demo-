import React, { useState } from 'react';
import { 
  UploadCloud, Camera, Sparkles, AlertCircle, CheckCircle2, 
  ArrowRight, ShieldCheck, RefreshCw, Eye 
} from 'lucide-react';
import { translations } from '../../data/translations';
import { sampleCropsData } from '../../data/sampleCropsData';

export const CropUploadScreen = ({ activeLang, onRunAnalysis }) => {
  const [selectedSample, setSelectedSample] = useState(sampleCropsData[0]);
  const [customImage, setCustomImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const t = translations[activeLang] || translations.en;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerCameraSimulation = () => {
    // Pick next sample crop for camera simulation
    const randomIndex = Math.floor(Math.random() * sampleCropsData.length);
    setSelectedSample(sampleCropsData[randomIndex]);
    setCustomImage(null);
  };

  const handleStartAnalysis = () => {
    setIsScanning(true);
    setScanProgress(15);

    const step1 = setTimeout(() => setScanProgress(45), 500);
    const step2 = setTimeout(() => setScanProgress(80), 1100);
    const step3 = setTimeout(() => {
      setScanProgress(100);
      setIsScanning(false);

      const activeCropData = customImage
        ? {
            id: 'custom-upload',
            cropName: 'Uploaded Leaf Sample (टोमॅटो)',
            cropKey: 'Tomato',
            qualityGrade: 'Grade B (AI Detected Leaf Damage)',
            diseaseName: 'Tomato Early Blight (Alternaria solani)',
            diseaseKey: 'Early Blight',
            confidence: 94,
            imageUrl: customImage,
            symptoms: 'Fungal leaf spots detected via AI image classification.',
            treatment: {
              chemical: 'Spray Copper Oxychloride 50% WP @ 2.5g/L or Mancozeb 75% WP @ 2g/L.',
              organic: 'Apply 5% Neem Seed Kernel Extract (NSKE) or Trichoderma viride.',
              dosage: 'Spray twice at 10-day intervals early morning.',
              safetyPeriod: 'Waiting period before harvest: 7 days.'
            },
            fertilizer: {
              category: 'NPK 19:19:19 + Calcium Spray',
              explanation: 'Strengthens leaf cellular structure to stop fungal lesion expansion.'
            },
            soilAdvice: 'Ensure proper drainage; avoid wet foliage overnight.'
          }
        : selectedSample;

      onRunAnalysis(activeCropData);
    }, 1800);
  };

  const currentDisplayImage = customImage || selectedSample.imageUrl;

  return (
    <div className="p-4 space-y-4 text-slate-100 pb-6">
      
      {/* Screen Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-extrabold text-lg text-white">
            {t.cropAnalysisTitle}
          </h2>
          <p className="text-xs text-slate-400">
            {t.cropAnalysisSubtitle}
          </p>
        </div>
        <span className="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full font-semibold">
          AI Vision v2.4
        </span>
      </div>

      {/* Upload & Photo Preview Box */}
      <div className="relative glass-card rounded-3xl p-4 border border-slate-800 flex flex-col items-center overflow-hidden">
        
        {/* Photo Box container */}
        <div className="w-full h-52 rounded-2xl bg-slate-900 border-2 border-dashed border-emerald-500/40 relative overflow-hidden flex flex-col items-center justify-center group shadow-inner">
          
          {/* Laser Scanning Grid Overlay when scanning */}
          {isScanning && (
            <div className="absolute inset-0 z-20 bg-emerald-950/40 backdrop-blur-[2px] flex flex-col items-center justify-between p-4">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-scan-laser shadow-lg shadow-emerald-400 absolute" />
              
              <div className="flex items-center gap-2 bg-slate-950/90 border border-emerald-500/50 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-300 mt-2 shadow-lg">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                <span>AI Analyzing Leaf Texture... {scanProgress}%</span>
              </div>

              <div className="w-full bg-slate-900/90 rounded-full h-2 overflow-hidden border border-emerald-500/30">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-300 rounded-full"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
            </div>
          )}

          <img 
            src={currentDisplayImage} 
            alt="Crop Leaf Preview" 
            className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30 pointer-events-none" />

          {/* Badge over image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
            <span className="px-2.5 py-1 text-[10px] bg-slate-900/90 text-emerald-300 border border-emerald-500/30 rounded-lg font-semibold flex items-center gap-1 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-emerald-400" /> {selectedSample.cropName}
            </span>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-lg font-mono">
              Ready for AI Scan
            </span>
          </div>
        </div>

        {/* Upload Controls */}
        <div className="grid grid-cols-2 gap-2.5 w-full mt-3">
          <label className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 cursor-pointer transition-all">
            <UploadCloud className="w-4 h-4 text-emerald-400" />
            <span>Upload Photo</span>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload}
              className="hidden" 
            />
          </label>

          <button
            onClick={triggerCameraSimulation}
            className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-all"
          >
            <Camera className="w-4 h-4 text-emerald-400" />
            <span>{t.btnCamera}</span>
          </button>
        </div>

        {/* Big Action Button: Analyze Crop */}
        <button
          onClick={handleStartAnalysis}
          disabled={isScanning}
          className="w-full py-3 mt-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow-xl shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>{isScanning ? 'Analyzing Crop Leaf...' : t.btnAnalyze}</span>
        </button>

      </div>

      {/* Sample Crop Selector for Instant Demo */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider px-1">
          {t.sampleCropsTitle}
        </span>

        <div className="grid grid-cols-3 gap-2">
          {sampleCropsData.map((sample) => {
            const isSelected = selectedSample.id === sample.id && !customImage;
            return (
              <div
                key={sample.id}
                onClick={() => {
                  setSelectedSample(sample);
                  setCustomImage(null);
                }}
                className={`p-2 rounded-2xl border cursor-pointer transition-all flex flex-col items-center text-center ${
                  isSelected
                    ? 'bg-emerald-950/60 border-emerald-500 shadow-md shadow-emerald-500/20 scale-102'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <img 
                  src={sample.imageUrl} 
                  alt={sample.cropName} 
                  className="w-full h-14 object-cover rounded-xl mb-1.5"
                />
                <span className="text-[10px] font-bold text-slate-200 truncate w-full">
                  {sample.cropKey}
                </span>
                <span className="text-[9px] text-amber-400 truncate w-full font-medium">
                  {sample.diseaseKey}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Analysis History */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300">
            {t.recentAnalysisTitle}
          </span>
          <span className="text-[10px] text-emerald-400 font-medium">Saved Reports</span>
        </div>

        <div className="space-y-2">
          {sampleCropsData.slice(0, 2).map((item) => (
            <div 
              key={`recent-${item.id}`}
              onClick={() => onRunAnalysis(item)}
              className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 flex items-center justify-between cursor-pointer transition-all"
            >
              <div className="flex items-center gap-2.5">
                <img src={item.imageUrl} alt={item.cropName} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <div className="text-xs font-bold text-white">{item.cropName}</div>
                  <div className="text-[10px] text-amber-400">{item.diseaseName}</div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  {item.confidence}% AI
                </span>
                <div className="text-[9px] text-slate-500 mt-0.5">2 hours ago</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
