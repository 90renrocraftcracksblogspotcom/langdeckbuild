import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, onSave }) {
  const [apiKey, setApiKey] = useState('');
  const [baseUrl, setBaseUrl] = useState('https://api.openai.com/v1/chat/completions');
  const [modelName, setModelName] = useState('gpt-4o-mini');

  useEffect(() => {
    const savedKey = localStorage.getItem('langdeck_api_key') || '';
    const savedUrl = localStorage.getItem('langdeck_base_url') || 'https://api.openai.com/v1/chat/completions';
    const savedModel = localStorage.getItem('langdeck_model') || 'gpt-4o-mini';
    setApiKey(savedKey);
    setBaseUrl(savedUrl);
    setModelName(savedModel);
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('langdeck_api_key', apiKey);
    localStorage.setItem('langdeck_base_url', baseUrl);
    localStorage.setItem('langdeck_model', modelName);
    onSave({ apiKey, baseUrl, modelName });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Settings</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">API Key</label>
            <input 
              type="password" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="sk-..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Base URL</label>
            <input 
              type="text" 
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Model Name</label>
            <input 
              type="text" 
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button 
            onClick={handleSave}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
