import React from 'react';
import { MessageCircle } from 'lucide-react';

interface Props {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RedirectMessage: React.FC<Props> = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-zinc-900 text-white rounded-2xl p-6 shadow-lg w-[22rem] text-center relative animate-fade-in">
        <button
          className="absolute top-2 right-4 text-gray-400 hover:text-white text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <div className="flex justify-center mb-4">
          <MessageCircle size={48} className="text-orange-500" />
        </div>

        <h2 className="text-lg font-semibold mb-2">You're being redirected</h2>
        <p className="text-sm mb-4">To the creator’s portfolio at:</p>

        <div className="bg-zinc-800 text-orange-300 rounded px-4 py-2 text-sm mb-4 break-words">
          https://yovel.vercel.app
        </div>

        <button
          onClick={onConfirm}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md transition"
        >
          Visit Now
        </button>
      </div>
    </div>
  );
};

export default RedirectMessage;
