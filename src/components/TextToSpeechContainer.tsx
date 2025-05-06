import React, { useState, useEffect } from 'react';
import TextInput from './TextInput';
import VoiceSettings from './VoiceSettings';
import PlaybackControls from './PlaybackControls';
import AudioDownload from './AudioDownload';
import History from './History';
import { SpeechSettings, HistoryItem } from '../types';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

const TextToSpeechContainer: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [settings, setSettings] = useState<SpeechSettings>({
    voice: null,
    rate: 1,
    pitch: 1,
    volume: 1
  });
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const savedHistory = localStorage.getItem('speechHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  const { 
    voices, 
    speaking, 
    paused,
    speak, 
    pause, 
    resume, 
    stop,
    generateAudioUrl
  } = useSpeechSynthesis();

  useEffect(() => {
    if (voices.length > 0 && !settings.voice) {
      setSettings(prev => ({ ...prev, voice: voices[0] }));
    }
  }, [voices, settings.voice]);

  useEffect(() => {
    localStorage.setItem('speechHistory', JSON.stringify(history));
  }, [history]);

  const handleSpeak = () => {
    if (text.trim()) {
      speak(text, settings);
      
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        text: text,
        settings: settings,
        date: new Date().toISOString()
      };
      
      setHistory(prev => [newHistoryItem, ...prev].slice(0, 10));
    }
  };

  const handleLoadFromHistory = (item: HistoryItem) => {
    setText(item.text);
    setSettings(item.settings);
  };

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg p-6 mb-6 transition-all duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TextInput 
            text={text} 
            setText={setText} 
            onSpeak={handleSpeak}
          />
          
          <VoiceSettings 
            settings={settings}
            setSettings={setSettings}
            availableVoices={voices}
          />
          
          <PlaybackControls 
            speaking={speaking}
            paused={paused}
            onPlay={handleSpeak}
            onPause={pause}
            onResume={resume}
            onStop={stop}
            disabled={!text.trim()}
          />
          
          <AudioDownload 
            text={text}
            settings={settings}
            generateAudioUrl={generateAudioUrl}
            disabled={!text.trim()}
          />
        </div>
        
        <div className="lg:col-span-1">
          <History 
            history={history}
            onSelect={handleLoadFromHistory}
            onClear={() => setHistory([])}
          />
        </div>
      </div>
    </div>
  );
};

export default TextToSpeechContainer;