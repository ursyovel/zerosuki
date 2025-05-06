import React from 'react';
import { MessageSquare } from 'lucide-react';

interface Props {
  text: string;
  setText: (value: string) => void;
  onSpeak: () => void;
}

const TextInput: React.FC<Props> = ({ text, setText, onSpeak }) => {
  return (
    <div className="space-y-4 p-4 rounded-xl bg-white/60 dark:bg-orange-950/40 backdrop-blur-md shadow-md transition-all">
      <div className="flex items-center space-x-2">
        <MessageSquare size={22} className="text-orange-500 dark:text-orange-400" />
        <h2 className="text-lg font-semibold text-orange-700 dark:text-orange-300">Text Input</h2>
      </div>

      <textarea
        className="w-full h-40 px-4 py-3 rounded-lg resize-none border-none 
                   bg-gradient-to-br from-orange-100 to-yellow-100 
                   dark:from-orange-900 dark:to-yellow-900 
                   placeholder:text-gray-600 dark:placeholder:text-gray-300 
                   text-black dark:text-white shadow-inner focus:outline-none"
        placeholder="Type or paste text to convert to speech..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setText('')}
          className="px-4 py-2 bg-orange-700 text-white rounded hover:bg-orange-800 transition"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={onSpeak}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          Speak
        </button>
      </div>
    </div>
  );
};

export default TextInput;
