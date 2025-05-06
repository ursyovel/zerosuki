export interface SpeechSettings {
  voice: SpeechSynthesisVoice | null;
  rate: number;
  pitch: number;
  volume: number;
}

export interface HistoryItem {
  id: string;
  text: string;
  settings: SpeechSettings;
  date: string;
}