
import React, { useState } from 'react';
import { X, Zap, BrainCircuit, Trophy, CheckCircle2, Key } from './Icons';
import { AppSettings, ModelType } from '../types';

interface SettingsModalProps {
  settings: AppSettings;
  onSave: (settings: AppSettings) => void;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ settings, onSave, onClose }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);

  const models: {id: ModelType; name: string; desc: string}[] = [
    { id: 'gemini-3-pro-preview', name: 'Gemini 3.0 Pro', desc: 'Reasoning & Complex Tasks' },
    { id: 'gemini-2.5-pro-preview-09-2025', name: 'Gemini 2.5 Pro', desc: 'Balanced Performance' },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', desc: 'High Speed & Efficiency' },
  ];

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_black] rounded-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="bg-[#FF6B4A] p-4 border-b-4 border-black flex justify-between items-center">
          <h2 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-2">
            <SettingsIcon className="w-6 h-6" /> App Settings
          </h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-black/20 rounded text-white transition-colors"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>

        <div className="p-6 space-y-8 bg-[#FDFBD4] max-h-[80vh] overflow-y-auto custom-scrollbar">
          
          {/* Main Model Selection */}
          <div className="space-y-3">
            <label className="text-sm font-black text-black uppercase tracking-widest flex items-center gap-2">
              <BrainCircuit size={18} /> Primary Model
            </label>
            <div className="grid gap-2">
              {models.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setLocalSettings({ ...localSettings, activeModel: m.id })}
                  className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                    localSettings.activeModel === m.id 
                      ? 'bg-white border-black shadow-[4px_4px_0px_0px_black]' 
                      : 'bg-white/50 border-transparent hover:border-black/20'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-bold text-black">{m.name}</div>
                    <div className="text-xs text-gray-500 font-medium">{m.desc}</div>
                  </div>
                  {localSettings.activeModel === m.id && (
                    <div className="w-4 h-4 bg-[#A3E635] rounded-full border-2 border-black shadow-[1px_1px_0px_0px_black]"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Race Model Selection */}
          <div className="space-y-3">
            <label className="text-sm font-black text-black uppercase tracking-widest flex items-center gap-2">
              <Trophy size={18} /> Race Opponent
            </label>
            <div className="relative">
              <select
                value={localSettings.raceModel}
                onChange={(e) => setLocalSettings({ ...localSettings, raceModel: e.target.value as ModelType })}
                className="w-full p-3 bg-white border-2 border-black rounded-xl font-bold appearance-none shadow-[4px_4px_0px_0px_black] outline-none"
              >
                {models.filter(m => m.id !== localSettings.activeModel).map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Zap size={18} fill="black" />
              </div>
            </div>
          </div>

          {/* API Key Section */}
          <div className="space-y-3 pt-4 border-t-2 border-black border-dashed">
            <label className="text-sm font-black text-black uppercase tracking-widest flex items-center gap-2">
              <Key size={18} /> Custom API Key
            </label>
            <div className="relative">
              <input
                type={apiKeyVisible ? "text" : "password"}
                value={localSettings.customApiKey || ''}
                onChange={(e) => setLocalSettings({ ...localSettings, customApiKey: e.target.value })}
                placeholder="Use default env key"
                className="w-full p-3 bg-white border-2 border-black rounded-xl font-medium shadow-[4px_4px_0px_0px_black] outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_black] transition-all"
              />
              <button 
                onClick={() => setApiKeyVisible(!apiKeyVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 hover:text-black uppercase"
              >
                {apiKeyVisible ? 'Hide' : 'Show'}
              </button>
            </div>
            <p className="text-xs font-bold text-gray-500 leading-tight">
              Leave blank to use the default provided API key. Your key is stored locally.
            </p>
          </div>

          <button 
            onClick={handleSave}
            className="w-full py-4 bg-[#A3E635] hover:bg-[#8CD321] text-black font-black uppercase tracking-widest border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_black] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={20} strokeWidth={3} /> Save Settings
          </button>

        </div>
      </div>
    </div>
  );
};

// Simple Icon wrapper to avoid circular dependency issues in the snippet
const SettingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

export default SettingsModal;
