import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

const History: React.FC<HistoryProps> = ({ history, onSelect, onClear }) => {
  if (history.length === 0) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 h-full">
        <div className="flex items-center mb-3">
          <Clock size={20} className="text-orange-500 mr-2" />
          <h2 className="text-xl font-semibold">History</h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-center italic py-8">
          Your speech history will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Clock size={20} className="text-orange-500 mr-2" />
          <h2 className="text-xl font-semibold">History</h2>
        </div>
        
        <button
          onClick={onClear}
          className="text-red-500 hover:text-red-700 transition-colors duration-200"
          title="Clear history"
        >
          <Trash2 size={18} />
        </button>
      </div>
      
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full text-left p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700"
          >
            <div className="text-sm font-medium truncate mb-1">
              {item.text.substring(0, 100)}
              {item.text.length > 100 ? '...' : ''}
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <div>
                Voice: {item.settings.voice?.name || 'Default'}
              </div>
              <div>
                {new Date(item.date).toLocaleString()}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default History;