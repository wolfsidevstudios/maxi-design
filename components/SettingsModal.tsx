
import React, { useState } from 'react';
import { X, Zap, BrainCircuit, Trophy, CheckCircle2, Key, Settings as SettingsIcon } from './Icons';
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
    { id: 'gemini-3-pro-preview', name: 'Gemini 3.0 Pro', desc: 'Best for complex reasoning & coding' },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', desc: 'Fast, low-latency & high-frequency' },
    { id: 'gemini-flash-lite-latest', name: 'Gemini 2.5 Flash Lite', desc: 'Cost-effective & lightweight' },
  ];

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button 
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full border-2 border-black relative transition-colors ${checked ? 'bg-[#A3E635]' : 'bg-gray-200'}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white border-2 border-black absolute top-1/2 -translate-y-1/2 transition-all shadow-sm ${checked ? 'left-[26px]' : 'left-[2px]'}`}></div>
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#FDFBD4] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Header */}
      <div className="bg-[#FF6B4A] px-6 py-4 border-b-4 border-black flex justify-between items-center shrink-0 shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)]">
        <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-3">
          <SettingsIcon className="w-8 h-8" /> App Settings
        </h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-black/20 rounded-lg text-white transition-colors border-2 border-transparent hover:border-black/10"
        >
          <X size={28} strokeWidth={3} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-10 pb-32">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Main Model Selection */}
            <div className="space-y-4">
              <label className="text-base font-black text-black uppercase tracking-widest flex items-center gap-2 border-b-2 border-black pb-2">
                <BrainCircuit size={20} /> Primary Model
              </label>
              <div className="grid gap-3">
                {models.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setLocalSettings({ ...localSettings, activeModel: m.id })}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                      localSettings.activeModel === m.id 
                        ? 'bg-white border-black shadow-[4px_4px_0px_0px_black] translate-x-[-2px] translate-y-[-2px]' 
                        : 'bg-white/40 border-black/10 hover:border-black hover:bg-white'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-bold text-black text-lg">{m.name}</div>
                      <div className="text-sm text-gray-600 font-medium">{m.desc}</div>
                    </div>
                    {localSettings.activeModel === m.id && (
                      <div className="w-6 h-6 bg-[#A3E635] rounded-full border-2 border-black shadow-[1px_1px_0px_0px_black] flex items-center justify-center">
                        <CheckCircle2 size={14} strokeWidth={3} className="text-black" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Config & Race Opponent */}
            <div className="space-y-8">
              {/* Generation Settings */}
              <div className="space-y-4">
                <label className="text-base font-black text-black uppercase tracking-widest flex items-center gap-2 border-b-2 border-black pb-2">
                  <Zap size={20} /> Capabilities
                </label>
                
                <div className="bg-white p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_black] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-black">Enable Thinking</div>
                      <div className="text-xs text-gray-500 font-medium">Use model reasoning budget (Costlier, better quality)</div>
                    </div>
                    <ToggleSwitch 
                      checked={localSettings.enableThinking} 
                      onChange={(v) => setLocalSettings(prev => ({ ...prev, enableThinking: v }))} 
                    />
                  </div>
                  
                  <div className="w-full h-px bg-gray-100"></div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-black">Real-time Code Gen</div>
                      <div className="text-xs text-gray-500 font-medium">Stream code as it's generated</div>
                    </div>
                    <ToggleSwitch 
                      checked={localSettings.enableStreaming} 
                      onChange={(v) => setLocalSettings(prev => ({ ...prev, enableStreaming: v }))} 
                    />
                  </div>
                </div>
              </div>

              {/* Race Opponent */}
              <div className="space-y-4">
                <label className="text-base font-black text-black uppercase tracking-widest flex items-center gap-2 border-b-2 border-black pb-2">
                  <Trophy size={20} /> Race Opponent
                </label>
                <div className="relative">
                  <select
                    value={localSettings.raceModel}
                    onChange={(e) => setLocalSettings({ ...localSettings, raceModel: e.target.value as ModelType })}
                    className="w-full p-4 bg-white border-2 border-black rounded-xl font-bold appearance-none shadow-[4px_4px_0px_0px_black] outline-none text-lg cursor-pointer hover:translate-x-[-1px] hover:translate-y-[-1px] transition-transform"
                  >
                    {models.filter(m => m.id !== localSettings.activeModel).map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <Zap size={24} fill="black" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* API Key Section */}
          <div className="space-y-4 pt-8 border-t-2 border-black border-dashed">
            <label className="text-base font-black text-black uppercase tracking-widest flex items-center gap-2">
              <Key size={20} /> Custom API Key
            </label>
            <div className="bg-white p-6 rounded-2xl border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] space-y-4">
              <div className="relative">
                <input
                  type={apiKeyVisible ? "text" : "password"}
                  value={localSettings.customApiKey || ''}
                  onChange={(e) => setLocalSettings({ ...localSettings, customApiKey: e.target.value })}
                  placeholder="Use default environment key"
                  className="w-full p-4 bg-gray-50 border-2 border-black rounded-xl font-mono font-medium outline-none focus:shadow-[4px_4px_0px_0px_black] transition-all"
                />
                <button 
                  onClick={() => setApiKeyVisible(!apiKeyVisible)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-black uppercase hover:underline"
                >
                  {apiKeyVisible ? 'Hide' : 'Show'}
                </button>
              </div>
              <p className="text-sm font-bold text-gray-500 leading-tight">
                Leave blank to use the default key provided by the application. Your key is stored locally in your browser and never sent to our servers.
              </p>
            </div>
          </div>

          <div className="pt-8 flex justify-end">
             <button 
              onClick={handleSave}
              className="py-4 px-12 bg-[#A3E635] hover:bg-[#8CD321] text-black font-black uppercase tracking-widest border-2 border-black rounded-xl shadow-[6px_6px_0px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_black] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all flex items-center gap-3 text-lg"
            >
              <CheckCircle2 size={24} strokeWidth={3} /> Save & Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
