import React, { useState } from 'react';

export default function Flashcard({ card }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when card changes
  React.useEffect(() => {
    setIsFlipped(false);
  }, [card]);

  return (
    <div 
      className="w-full h-80 perspective-1000 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 bg-white border border-slate-200 rounded-2xl shadow-lg backface-hidden flex flex-col items-center justify-center p-8 text-center">
          <h3 className="text-4xl font-bold text-slate-800 mb-4">{card.target_word}</h3>
          <p className="text-lg text-slate-500 font-medium">{card.pronunciation}</p>
          <div className="absolute bottom-6 text-sm text-slate-400 group-hover:text-blue-500 transition-colors">
            Click to flip
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 bg-slate-800 text-white border border-slate-700 rounded-2xl shadow-lg backface-hidden rotate-y-180 flex flex-col p-8 overflow-y-auto">
          <h3 className="text-2xl font-bold text-blue-300 mb-6 border-b border-slate-600 pb-4 text-center">
            {card.native_translation}
          </h3>
          
          <div className="flex-1 flex flex-col justify-center space-y-6">
            <div>
              <p className="text-sm text-slate-400 uppercase font-semibold tracking-wider mb-2">Target Context</p>
              <p className="text-lg leading-relaxed">{card.context_sentence_target}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400 uppercase font-semibold tracking-wider mb-2">Native Context</p>
              <p className="text-lg leading-relaxed text-slate-300">{card.context_sentence_native}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
