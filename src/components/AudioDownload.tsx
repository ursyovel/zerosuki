import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { SpeechSettings } from '../types';

interface AudioDownloadProps {
  text: string;
  settings: SpeechSettings;
  generateAudioUrl: (text: string, settings: SpeechSettings) => Promise<string | null>;
  disabled: boolean;
}

const AudioDownload: React.FC<AudioDownloadProps> = ({
  text,
  settings,
  generateAudioUrl,
  disabled
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleDownload = async () => {
    if (disabled || !text.trim()) return;
    
    setIsGenerating(true);
    try {
      const audioUrl = await generateAudioUrl(text, settings);
      
      if (audioUrl) {
        const downloadLink = document.createElement('a');
        downloadLink.href = audioUrl;
        downloadLink.download = `zerosuki-speech-${Date.now()}.mp3`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    } catch (error) {
      console.error('Error generating audio for download:', error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="flex justify-center">
      <button
        onClick={handleDownload}
        disabled={disabled || isGenerating}
        className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isGenerating ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Download size={20} />
            <span>Download Audio</span>
          </>
        )}
      </button>
    </div>
  );
};

export default AudioDownload;