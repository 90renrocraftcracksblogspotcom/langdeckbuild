import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DeckGeneratorForm({ onGenerate, isLoading }) {
  const [targetLanguage, setTargetLanguage] = useState('');
  const [nativeLanguage, setNativeLanguage] = useState('English');
  const [nicheTopic, setNicheTopic] = useState('');
  const [numCards, setNumCards] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!targetLanguage || !nativeLanguage || !nicheTopic) return;
    onGenerate({ targetLanguage, nativeLanguage, nicheTopic, numCards });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-lg w-full mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Create New Deck</h2>
      
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Target Language</label>
            <input 
              type="text" 
              required
              placeholder="e.g., French"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-slate-50 focus:bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Native Language</label>
            <input 
              type="text" 
              required
              placeholder="e.g., English"
              value={nativeLanguage}
              onChange={(e) => setNativeLanguage(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-slate-50 focus:bg-white"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Niche Topic</label>
          <input 
            type="text" 
            required
            placeholder="e.g., Tokyo subway navigation"
            value={nicheTopic}
            onChange={(e) => setNicheTopic(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow bg-slate-50 focus:bg-white"
          />
        </div>
        
        <div className="pt-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex justify-between items-center">
            <span>Number of Cards</span>
            <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-xs font-bold">{numCards}</span>
          </label>
          <input 
            type="range" 
            min="5" 
            max="20" 
            value={numCards}
            onChange={(e) => setNumCards(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>
        
        <motion.button 
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          type="submit" 
          disabled={isLoading}
          className="w-full bg-slate-800 text-white font-bold py-3.5 rounded-xl hover:bg-slate-900 transition-colors mt-6 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-3" size={20} />
              Generating...
            </>
          ) : (
            'Generate Deck'
          )}
        </motion.button>
      </div>
    </form>
  );
}
