import { useState, useEffect, useCallback, useRef } from 'react';
import { SpeechSettings } from '../types';

export const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      
      // Load available voices
      const loadVoices = () => {
        const availableVoices = synthRef.current?.getVoices() || [];
        setVoices(availableVoices);
      };
      
      loadVoices();
      
      // Chrome loads voices asynchronously
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
      
      // Cleanup on unmount
      return () => {
        if (synthRef.current?.speaking) {
          synthRef.current.cancel();
        }
      };
    }
  }, []);

  // Stop speaking on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current?.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const speak = useCallback((text: string, settings: SpeechSettings) => {
    if (!synthRef.current) return;
    
    // If already speaking, stop it
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }
    
    // Create utterance with settings
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (settings.voice) {
      utterance.voice = settings.voice;
    }
    
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;
    
    // Setup event handlers
    utterance.onstart = () => {
      setSpeaking(true);
      setPaused(false);
    };
    
    utterance.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };
    
    utterance.onerror = (event) => {
      console.error('SpeechSynthesis error:', event);
      setSpeaking(false);
      setPaused(false);
    };
    
    // Store reference to current utterance
    utteranceRef.current = utterance;
    
    // Start speaking
    synthRef.current.speak(utterance);
  }, []);

  const pause = useCallback(() => {
    if (synthRef.current?.speaking && !paused) {
      synthRef.current.pause();
      setPaused(true);
    }
  }, [paused]);

  const resume = useCallback(() => {
    if (synthRef.current?.speaking && paused) {
      synthRef.current.resume();
      setPaused(false);
    }
  }, [paused]);

  const stop = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setSpeaking(false);
      setPaused(false);
    }
  }, []);

  // Generate audio URL for download
  const generateAudioUrl = useCallback(
    async (text: string, settings: SpeechSettings): Promise<string | null> => {
      if (!window.speechSynthesis) {
        console.error('Speech synthesis not supported');
        return null;
      }

      return new Promise((resolve, reject) => {
        try {
          // Use audio context to record the synthesis
          const audioContext = new (window.AudioContext || 
            (window as any).webkitAudioContext)();
          const mediaStreamDestination = audioContext.createMediaStreamDestination();
          const mediaRecorder = new MediaRecorder(mediaStreamDestination.stream);
          
          const audioChunks: Blob[] = [];
          
          mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
          };
          
          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
            const audioUrl = URL.createObjectURL(audioBlob);
            resolve(audioUrl);
          };
          
          mediaRecorder.start();
          
          const utterance = new SpeechSynthesisUtterance(text);
          
          if (settings.voice) {
            utterance.voice = settings.voice;
          }
          utterance.rate = settings.rate;
          utterance.pitch = settings.pitch;
          utterance.volume = settings.volume;
          
          utterance.onend = () => {
            mediaRecorder.stop();
          };
          
          utterance.onerror = (event) => {
            console.error('Error generating audio:', event);
            mediaRecorder.stop();
            reject(new Error('Failed to generate audio'));
          };
          
          window.speechSynthesis.speak(utterance);
        } catch (error) {
          console.error('Error in generateAudioUrl:', error);
          reject(error);
        }
      });
    },
    []
  );

  return {
    voices,
    speaking,
    paused,
    speak,
    pause,
    resume,
    stop,
    generateAudioUrl
  };
};