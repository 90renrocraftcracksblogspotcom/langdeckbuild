import React, { useState, useEffect } from 'react';
import SettingsModal from './components/SettingsModal';
import DeckGeneratorForm from './components/DeckGeneratorForm';
import FlashcardViewer from './components/FlashcardViewer';
import { generateDeck } from './utils/api';
import { Settings, BookOpen } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

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
    toast.success('Settings saved successfully!');
  };

  const handleGenerateDeck = async (params) => {
    if (!settings.apiKey) {
      setIsSettingsOpen(true);
      toast.error("Please configure your API key first.");
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading('Generating your custom deck...');
    
    try {
      const cards = await generateDeck(settings, params);
      setCurrentDeck(cards);
      setCurrentTopic(params.nicheTopic);
      toast.success('Deck generated successfully!', { id: loadingToast });
    } catch (err) {
      toast.error(err.message || 'Failed to generate deck', { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-blue-600"
          >
            <BookOpen size={28} />
            <h1 className="text-xl font-bold tracking-tight text-slate-800">LangDeck Builder</h1>
          </motion.div>
          <motion.button 
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors"
            title="Settings"
          >
            <Settings size={24} />
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 relative min-h-[calc(100vh-64px)]">
        <AnimatePresence mode="wait">
          {!currentDeck ? (
            <motion.div
              key="generator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DeckGeneratorForm 
                onGenerate={handleGenerateDeck} 
                isLoading={isLoading} 
              />
            </motion.div>
          ) : (
            <motion.div
              key="viewer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <FlashcardViewer 
                deck={currentDeck} 
                topic={currentTopic}
                onBack={() => setCurrentDeck(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
      />
    </div>
  );
}
