import React from 'react';
import { Settings, Volume2 } from 'lucide-react';
import { SpeechSettings } from '../types';

interface VoiceSettingsProps {
  settings: SpeechSettings;
  setSettings: (settings: SpeechSettings) => void;
  availableVoices: SpeechSynthesisVoice[];
}

const VoiceSettingsControl: React.FC<{
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}> = ({ label, min, max, step, value, onChange }) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center">
      <label className="text-sm font-medium">{label}</label>
      <span className="text-sm bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-2 py-0.5 rounded">
        {value.toFixed(1)}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full h-2 bg-orange-200 dark:bg-orange-900/50 rounded-lg appearance-none cursor-pointer accent-orange-500"
    />
  </div>
);

const VoiceSettings: React.FC<VoiceSettingsProps> = ({
  settings,
  setSettings,
  availableVoices,
}) => {
  const voicesByLanguage = availableVoices.reduce((acc, voice) => {
    const lang = voice.lang || 'unknown';
    if (!acc[lang]) {
      acc[lang] = [];
    }
    acc[lang].push(voice);
    return acc;
  }, {} as Record<string, SpeechSynthesisVoice[]>);

  return (
    <div className="space-y-4 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg">
      <div className="flex items-center">
        <Settings size={20} className="text-orange-500 mr-2" />
        <h2 className="text-xl font-semibold">Voice Settings</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="voice" className="block text-sm font-medium">
            Voice
          </label>
          <select
            id="voice"
            value={settings.voice?.voiceURI || ''}
            onChange={(e) => {
              const selectedVoice = availableVoices.find(
                (voice) => voice.voiceURI === e.target.value
              );
              setSettings({ ...settings, voice: selectedVoice || null });
            }}
            className="w-full px-3 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-orange-200 dark:border-orange-900 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {Object.entries(voicesByLanguage).map(([lang, voices]) => (
              <optgroup key={lang} label={lang}>
                {voices.map((voice) => (
                  <option key={voice.voiceURI} value={voice.voiceURI}>
                    {voice.name} {voice.localService ? '(Local)' : ''}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            <div className="flex items-center">
              <Volume2 size={18} className="mr-1" />
              Volume
            </div>
          </label>
          <VoiceSettingsControl
            label="Volume"
            min={0}
            max={1}
            step={0.1}
            value={settings.volume}
            onChange={(value) => setSettings({ ...settings, volume: value })}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <VoiceSettingsControl
          label="Rate"
          min={0.5}
          max={2}
          step={0.1}
          value={settings.rate}
          onChange={(value) => setSettings({ ...settings, rate: value })}
        />
        
        <VoiceSettingsControl
          label="Pitch"
          min={0.5}
          max={2}
          step={0.1}
          value={settings.pitch}
          onChange={(value) => setSettings({ ...settings, pitch: value })}
        />
      </div>
    </div>
  );
};

export default VoiceSettings;