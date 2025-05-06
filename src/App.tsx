import React, { useState, useEffect } from 'react';
import { Sun, Moon, X } from 'lucide-react';
import TextToSpeechContainer from './components/TextToSpeechContainer';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleVisit = () => {
    window.open('https://yovel.vercel.app', '_blank');
    setPopupOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-orange-500 dark:from-yellow-700 dark:to-orange-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 flex flex-col">
      
      {/* Fullscreen Redirect Popup */}
      {popupOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white rounded-xl p-6 max-w-sm w-full relative shadow-lg">
            <button onClick={() => setPopupOpen(false)} className="absolute top-2 right-2 text-gray-300 hover:text-white">
              <X size={18} />
            </button>
            <h2 className="text-xl font-bold mb-2">Are you sure?</h2>
            <p className="text-sm mb-3">You are going to visit</p>
            <div className="bg-gray-800 px-3 py-2 rounded text-sm font-mono text-center mb-4">
              https://yovel.vercel.app
            </div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/creator.jpg" // Moved to public folder
                alt="Creator"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <span className="font-medium">Creator's Portfolio</span>
            </div>
            <div className="flex justify-between gap-4">
              <button
                onClick={handleVisit}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition"
              >
                Visit
              </button>
              <button
                onClick={() => setPopupOpen(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-400">ZeroSuki</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <TextToSpeechContainer />
      </main>

      {/* Footer */}
      <footer className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center text-sm text-gray-500 dark
