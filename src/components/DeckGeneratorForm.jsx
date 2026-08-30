import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-slate-100 max-w-lg w-full mx-auto">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Create New Deck</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Target Language</label>
            <input 
              type="text" 
              required
              placeholder="e.g., French"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Native Language</label>
            <input 
              type="text" 
              required
              placeholder="e.g., English"
              value={nativeLanguage}
              onChange={(e) => setNativeLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Niche Topic</label>
          <input 
            type="text" 
            required
            placeholder="e.g., Tokyo subway navigation"
            value={nicheTopic}
            onChange={(e) => setNicheTopic(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1 flex justify-between">
            <span>Number of Cards</span>
            <span className="text-blue-600 font-semibold">{numCards}</span>
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
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-slate-800 text-white font-semibold py-3 rounded-lg hover:bg-slate-900 transition-colors mt-6 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin mr-2" size={20} />
              Generating...
            </>
          ) : (
            'Generate Deck'
          )}
        </button>
      </div>
    </form>
  );
}
