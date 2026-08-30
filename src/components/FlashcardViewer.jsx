import React, { useState } from 'react';
import Flashcard from './Flashcard';
import { ArrowLeft, ArrowRight, Shuffle, Download, ArrowLeftCircle } from 'lucide-react';
import { exportToAnki } from '../utils/ankiExport';

export default function FlashcardViewer({ deck, topic, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentDeck, setCurrentDeck] = useState(deck);

  if (!currentDeck || currentDeck.length === 0) return null;

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % currentDeck.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + currentDeck.length) % currentDeck.length);
  };

  const shuffleDeck = () => {
    const shuffled = [...currentDeck].sort(() => Math.random() - 0.5);
    setCurrentDeck(shuffled);
    setCurrentIndex(0);
  };

  const handleExport = () => {
    exportToAnki(currentDeck, topic);
  };

  return (
    <div className="max-w-2xl w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={onBack}
          className="text-slate-500 hover:text-slate-800 flex items-center transition-colors"
        >
          <ArrowLeftCircle className="mr-2" size={20} />
          Back to Generator
        </button>
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center transition-colors"
        >
          <Download className="mr-2" size={16} />
          Export to Anki
        </button>
      </div>

      <div className="mb-4 text-center">
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
          {topic}
        </span>
      </div>

      <Flashcard card={currentDeck[currentIndex]} />

      <div className="mt-8 flex items-center justify-between">
        <button 
          onClick={prevCard}
          className="p-3 rounded-full bg-white text-slate-700 shadow hover:bg-slate-50 transition-colors"
          aria-label="Previous card"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="text-slate-500 font-medium">
          {currentIndex + 1} / {currentDeck.length}
        </div>

        <div className="flex space-x-3">
          <button 
            onClick={shuffleDeck}
            className="p-3 rounded-full bg-white text-slate-700 shadow hover:bg-slate-50 transition-colors"
            title="Shuffle Deck"
          >
            <Shuffle size={20} />
          </button>
          
          <button 
            onClick={nextCard}
            className="p-3 rounded-full bg-white text-slate-700 shadow hover:bg-slate-50 transition-colors"
            aria-label="Next card"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
