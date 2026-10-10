export const startVoiceRecognition = (onResult, onError, lang = 'mr-IN') => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (SpeechRecognition) {
    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };

      recognition.onerror = (err) => {
        console.warn('Speech recognition error fallback:', err);
        // Fallback simulated transcript for demo
        simulateVoiceResult(onResult, lang);
      };

      recognition.start();
      return recognition;
    } catch (e) {
      console.warn('Native speech recognition failed, using simulation:', e);
      simulateVoiceResult(onResult, lang);
    }
  } else {
    simulateVoiceResult(onResult, lang);
  }
};

const simulateVoiceResult = (onResult, lang) => {
  const samplePrompts = {
    mr: [
      "पुणे आणि नाशिक मंडीतील टोमॅटोचे बाजारभाव दाखवा",
      "माझ्या पिकाची पाने पिवळी पडत आहेत, रोगाचे निदान करा",
      "५० क्विंटल गव्हाचा निव्वळ नफा किती होईल?"
    ],
    hi: [
      "पुणे और नासिक मंडी में टमाटर का भाव दिखाएं",
      "मेरी फसल की पत्तियां पीली हो रही हैं, रोग जांचें",
      "50 क्विंटल गेहूं का शुद्ध लाभ कितना होगा?"
    ],
    en: [
      "Show me tomato mandi prices in Pune and Nashik",
      "Diagnose early blight leaf infection on tomato",
      "Calculate net profit for 50 quintals wheat"
    ]
  };

  const prompts = samplePrompts[lang] || samplePrompts.en;
  const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  
  setTimeout(() => {
    onResult(randomPrompt);
  }, 1800);
};

export const speakText = (text, lang = 'mr') => {
  if (!('speechSynthesis' in window)) return;

  window.speechSynthesis.cancel(); // Stop current speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  
  const voices = window.speechSynthesis.getVoices();
  const targetLang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-US';
  const matchingVoice = voices.find(v => v.lang === targetLang || v.lang.startsWith(lang));
  
  if (matchingVoice) {
    utterance.voice = matchingVoice;
  }
  
  window.speechSynthesis.speak(utterance);
};
