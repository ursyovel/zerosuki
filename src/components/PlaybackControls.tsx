import React from 'react';
import { Play, Pause, Square, RefreshCw } from 'lucide-react';

interface PlaybackControlsProps {
  speaking: boolean;
  paused: boolean;
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  disabled: boolean;
}

const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  speaking,
  paused,
  onPlay,
  onPause,
  onResume,
  onStop,
  disabled
}) => {
  return (
    <div className="flex justify-center space-x-4">
      {speaking && !paused ? (
        <button
          onClick={onPause}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors duration-200"
          disabled={disabled}
          title="Pause"
        >
          <Pause size={24} />
        </button>
      ) : speaking && paused ? (
        <button
          onClick={onResume}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors duration-200"
          disabled={disabled}
          title="Resume"
        >
          <RefreshCw size={24} />
        </button>
      ) : (
        <button
          onClick={onPlay}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300 hover:bg-orange-200 dark:hover:bg-orange-800/50 transition-colors duration-200"
          disabled={disabled}
          title="Play"
        >
          <Play size={24} />
        </button>
      )}
      
      <button
        onClick={onStop}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors duration-200"
        disabled={!speaking || disabled}
        title="Stop"
      >
        <Square size={24} />
      </button>
    </div>
  );
};

export default PlaybackControls;