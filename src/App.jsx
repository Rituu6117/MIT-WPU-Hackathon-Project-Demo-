import React, { useState, useEffect } from 'react';
import { SmartphoneFrame } from './components/Frame/SmartphoneFrame';
import { AppHeader } from './components/Frame/AppHeader';
import { BottomNav } from './components/Frame/BottomNav';
import { VoiceAssistantModal } from './components/Frame/VoiceAssistantModal';

import { HomeScreen } from './components/Screens/HomeScreen';
import { CropUploadScreen } from './components/Screens/CropUploadScreen';
import { AnalysisResultScreen } from './components/Screens/AnalysisResultScreen';
import { MarketScreen } from './components/Screens/MarketScreen';
import { ProfitCalculatorScreen } from './components/Screens/ProfitCalculatorScreen';
import { AIFinalRecommendationScreen } from './components/Screens/AIFinalRecommendationScreen';
import { ProfileScreen } from './components/Screens/ProfileScreen';
import { SoilFertilizerModal } from './components/Screens/SoilFertilizerModal';

import { sampleCropsData } from './data/sampleCropsData';
import { loadMarketData } from './services/csvDataLoader';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [activeLang, setActiveLang] = useState('mr'); // Default Marathi for farmer demo

  const [analysisData, setAnalysisData] = useState(sampleCropsData[0]);
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [profitData, setProfitData] = useState(null);

  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isSoilModalOpen, setIsSoilModalOpen] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Pre-load CSV Market Dataset on app launch
  useEffect(() => {
    loadMarketData()
      .then(() => setDataLoaded(true))
      .catch((err) => console.warn('CSV Preload:', err));
  }, []);

  // Handlers for Navigations
  const handleRunAnalysis = (cropData) => {
    setAnalysisData(cropData);
    if (cropData.cropKey) {
      setSelectedCrop(cropData.cropKey);
    }
    setActiveScreen('analysisResult');
  };

  const handleFindMarketForCrop = (cropKey) => {
    setSelectedCrop(cropKey || 'Tomato');
    setActiveScreen('markets');
  };

  const handleSelectMarketForProfit = (marketObj) => {
    setSelectedMarket(marketObj);
    setActiveScreen('profit');
  };

  const handleCalculateFinished = (calculatedData) => {
    setProfitData(calculatedData);
    setActiveScreen('aiRecommendation');
  };

  const handleVoiceQueryAction = (actionObj) => {
    if (actionObj.screen) {
      setActiveScreen(actionObj.screen);
    }
    if (actionObj.commodity) {
      setSelectedCrop(actionObj.commodity);
    }
    if (actionObj.sampleId) {
      const sample = sampleCropsData.find(s => s.id === actionObj.sampleId);
      if (sample) handleRunAnalysis(sample);
    }
  };

  return (
    <SmartphoneFrame
      activeLang={activeLang}
      setActiveLang={setActiveLang}
      onVoiceClick={() => setIsVoiceModalOpen(true)}
      sihBadgeText="SIH 2026 Project Demo"
    >
      {/* Phone Header */}
      <AppHeader
        activeLang={activeLang}
        setActiveLang={setActiveLang}
        onVoiceClick={() => setIsVoiceModalOpen(true)}
        dataLoaded={dataLoaded}
      />

      {/* Dynamic Screen View inside Smartphone Scroll Container */}
      <div className="flex-1 w-full relative">
        {activeScreen === 'home' && (
          <HomeScreen
            activeLang={activeLang}
            setActiveScreen={setActiveScreen}
            onOpenSoilModal={() => setIsSoilModalOpen(true)}
          />
        )}

        {activeScreen === 'cropAI' && (
          <CropUploadScreen
            activeLang={activeLang}
            onRunAnalysis={handleRunAnalysis}
          />
        )}

        {activeScreen === 'analysisResult' && (
          <AnalysisResultScreen
            analysisData={analysisData}
            activeLang={activeLang}
            onFindMarket={handleFindMarketForCrop}
          />
        )}

        {activeScreen === 'markets' && (
          <MarketScreen
            activeLang={activeLang}
            initialCommodity={selectedCrop}
            onSelectMarketForProfit={handleSelectMarketForProfit}
          />
        )}

        {activeScreen === 'profit' && (
          <ProfitCalculatorScreen
            activeLang={activeLang}
            selectedMarket={selectedMarket}
            selectedCrop={selectedCrop}
            onCalculateFinished={handleCalculateFinished}
          />
        )}

        {activeScreen === 'aiRecommendation' && (
          <AIFinalRecommendationScreen
            activeLang={activeLang}
            profitData={profitData}
            analysisData={analysisData}
            onReset={() => setActiveScreen('home')}
          />
        )}

        {activeScreen === 'profile' && (
          <ProfileScreen
            activeLang={activeLang}
            setActiveLang={setActiveLang}
          />
        )}
      </div>

      {/* Phone Bottom Tab Bar */}
      <BottomNav
        activeScreen={
          activeScreen === 'analysisResult' ? 'cropAI' :
          activeScreen === 'aiRecommendation' ? 'profit' :
          activeScreen
        }
        setActiveScreen={setActiveScreen}
        activeLang={activeLang}
      />

      {/* Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        activeLang={activeLang}
        onSelectVoiceQuery={handleVoiceQueryAction}
      />

      {/* Soil & Fertilizer Guide Modal */}
      <SoilFertilizerModal
        isOpen={isSoilModalOpen}
        onClose={() => setIsSoilModalOpen(false)}
        activeLang={activeLang}
      />

    </SmartphoneFrame>
  );
}
