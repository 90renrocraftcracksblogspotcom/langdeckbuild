import React, { useState, useEffect } from 'react';
import SettingsModal from './components/SettingsModal';
import DeckGeneratorForm from './components/DeckGeneratorForm';
import FlashcardViewer from './components/FlashcardViewer';
import { generateDeck } from './utils/api';
import { Settings, BookOpen } from 'lucide-react';

export default function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    apiKey: '',
    baseUrl: 'https://api.openai.com/v1/chat/completions',
    modelName: 'gpt-4o-mini'
  });
  
  const [currentDeck, setCurrentDeck] = useState(null);
  const [currentTopic, setCurrentTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load settings on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('langdeck_api_key') || '';
    const savedUrl = localStorage.getItem('langdeck_base_url') || 'https://api.openai.com/v1/chat/completions';
    const savedModel = localStorage.getItem('langdeck_model') || 'gpt-4o-mini';
    setSettings({ apiKey: savedKey, baseUrl: savedUrl, modelName: savedModel });
    
    // Auto-open settings if no API key
    if (!savedKey) {
      setIsSettingsOpen(true);
    }
  }, []);

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
  };

  const handleGenerateDeck = async (params) => {
    if (!settings.apiKey) {
      setIsSettingsOpen(true);
      setError("Please configure your API key first.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const cards = await generateDeck(settings, params);
      setCurrentDeck(cards);
      setCurrentTopic(params.nicheTopic);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-blue-600">
            <BookOpen size={28} />
            <h1 className="text-xl font-bold tracking-tight text-slate-800">LangDeck Builder</h1>
          </div>
          <button 
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
            title="Settings"
          >
            <Settings size={24} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg max-w-2xl mx-auto">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {!currentDeck ? (
          <DeckGeneratorForm 
            onGenerate={handleGenerateDeck} 
            isLoading={isLoading} 
          />
        ) : (
          <FlashcardViewer 
            deck={currentDeck} 
            topic={currentTopic}
            onBack={() => setCurrentDeck(null)}
          />
        )}
      </main>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
      />
    </div>
  );
}
