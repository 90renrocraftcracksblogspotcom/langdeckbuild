import React, { useState } from 'react';
import Flashcard from './Flashcard';
import { ArrowLeft, ArrowRight, Shuffle, Download, ArrowLeftCircle } from 'lucide-react';
import { exportToAnki } from '../utils/ankiExport';
import { useSwipeable } from 'react-swipeable';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function FlashcardViewer({ deck, topic, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentDeck, setCurrentDeck] = useState(deck);
  const [direction, setDirection] = useState(0); // 1 for right, -1 for left

  if (!currentDeck || currentDeck.length === 0) return null;

  const nextCard = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % currentDeck.length);
  };

  const prevCard = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + currentDeck.length) % currentDeck.length);
  };

  const shuffleDeck = () => {
    const shuffled = [...currentDeck].sort(() => Math.random() - 0.5);
    setCurrentDeck(shuffled);
    setCurrentIndex(0);
    toast('Deck Shuffled!', { icon: '🔀' });
  };

  const handleExport = () => {
    exportToAnki(currentDeck, topic);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
    });
    toast.success('Exported to Anki successfully!');
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextCard(),
    onSwipedRight: () => prevCard(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });

  return (
    <div className="max-w-2xl w-full mx-auto" {...handlers}>
      <div className="flex justify-between items-center mb-8">
        <motion.button 
          whileHover={{ x: -4 }}
          onClick={onBack}
          className="text-slate-500 hover:text-slate-800 flex items-center transition-colors font-medium"
        >
          <ArrowLeftCircle className="mr-2" size={22} />
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center transition-colors shadow-md hover:shadow-lg"
        >
          <Download className="mr-2" size={18} />
          Export to Anki
        </motion.button>
      </div>

      <div className="mb-6 text-center">
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
          {topic}
        </span>
      </div>

      <div className="relative h-80 w-full overflow-visible">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Flashcard card={currentDeck[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-between px-2">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevCard}
          className="p-4 rounded-full bg-white text-slate-700 shadow-md hover:shadow-lg hover:text-blue-600 transition-all"
          aria-label="Previous card"
        >
          <ArrowLeft size={24} />
        </motion.button>

        <div className="text-slate-500 font-bold tracking-widest text-sm">
          {currentIndex + 1} <span className="text-slate-300">/</span> {currentDeck.length}
        </div>

        <div className="flex space-x-4">
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={shuffleDeck}
            className="p-4 rounded-full bg-white text-slate-700 shadow-md hover:shadow-lg hover:text-purple-600 transition-all"
            title="Shuffle Deck"
          >
            <Shuffle size={20} />
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextCard}
            className="p-4 rounded-full bg-white text-slate-700 shadow-md hover:shadow-lg hover:text-blue-600 transition-all"
            aria-label="Next card"
          >
            <ArrowRight size={24} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
