import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Flashcard({ card }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [card]);

  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full h-80 perspective-1000 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 bg-white border border-slate-200 rounded-3xl shadow-xl backface-hidden flex flex-col items-center justify-center p-8 text-center transition-shadow group-hover:shadow-2xl">
          <h3 className="text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">{card.target_word}</h3>
          <p className="text-xl text-slate-500 font-medium">{card.pronunciation}</p>
          <div className="absolute bottom-6 text-sm font-semibold text-slate-300 group-hover:text-blue-500 transition-colors tracking-wide uppercase">
            Tap to flip
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 bg-slate-900 text-white border border-slate-800 rounded-3xl shadow-xl backface-hidden rotate-y-180 flex flex-col p-8 overflow-y-auto">
          <h3 className="text-2xl font-bold text-blue-400 mb-6 border-b border-slate-700 pb-4 text-center">
            {card.native_translation}
          </h3>
          
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Target Context</p>
              <p className="text-lg leading-relaxed font-medium">{card.context_sentence_target}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Native Context</p>
              <p className="text-lg leading-relaxed text-slate-400">{card.context_sentence_native}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
