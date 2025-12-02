
import React, { useState } from 'react';
import { Key, CheckCircle2, ArrowRight, BrainCircuit, ExternalLink } from './Icons';

interface OnboardingPageProps {
  username: string;
  onComplete: (apiKey: string) => void;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ username, onComplete }) => {
  const [apiKey, setApiKey] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onComplete(apiKey.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBD4] flex items-center justify-center p-6 font-sans">
      <div className="max-w-2xl w-full bg-white border-2 border-black rounded-3xl shadow-[8px_8px_0px_0px_black] overflow-hidden flex flex-col md:flex-row animate-in zoom-in duration-500">
        
        {/* Left: Visual */}
        <div className="w-full md:w-5/12 bg-black p-8 text-[#FDFBD4] flex flex-col justify-between relative overflow-hidden">
           <div className="absolute top-[-20%] right-[-20%] w-[200px] h-[200px] bg-[#FF6B4A] rounded-full blur-[80px] opacity-40"></div>
           <div className="absolute bottom-[-20%] left-[-20%] w-[200px] h-[200px] bg-[#A3E635] rounded-full blur-[80px] opacity-40"></div>
           
           <div className="relative z-10">
             <div className="w-12 h-12 bg-[#FDFBD4] border-2 border-transparent rounded-xl flex items-center justify-center text-black font-black text-xl mb-6 shadow-lg">M</div>
             <h2 className="text-3xl font-display font-black uppercase tracking-tight leading-none mb-2">Welcome<br/>Aboard.</h2>
             <p className="text-sm font-medium opacity-80">Let's set up your creative engine.</p>
           </div>

           <div className="relative z-10 mt-12 space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full bg-[#A3E635] text-black flex items-center justify-center font-bold text-xs">1</div>
                 <div className="text-sm font-bold">Account Created</div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full bg-[#FDFBD4] text-black flex items-center justify-center font-bold text-xs animate-pulse">2</div>
                 <div className="text-sm font-bold">Connect Intelligence</div>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                 <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center font-bold text-xs">3</div>
                 <div className="text-sm font-bold">Start Building</div>
              </div>
           </div>
        </div>

        {/* Right: Form */}
        <div className="w-full md:w-7/12 p-8 md:p-12 bg-white">
           <div className="mb-8">
              <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Hi, {username.split(' ')[0]}! 👋</h1>
              <p className="text-gray-600 text-sm font-medium">To use Maxi Design, you need to connect your Google Gemini API Key. This ensures you have full control over your usage.</p>
           </div>

           <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-black flex items-center gap-2">
                    <Key size={14} /> Gemini API Key
                 </label>
                 <div className="relative">
                    <input 
                      type={isVisible ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="AIzaSy..."
                      className="w-full h-12 border-2 border-black rounded-xl pl-4 pr-12 font-mono text-sm outline-none focus:shadow-[4px_4px_0px_0px_black] transition-all"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setIsVisible(!isVisible)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase hover:text-[#FF6B4A]"
                    >
                       {isVisible ? 'Hide' : 'Show'}
                    </button>
                 </div>
                 <a 
                   href="https://aistudio.google.com/app/apikey" 
                   target="_blank" 
                   rel="noreferrer"
                   className="inline-flex items-center gap-1 text-xs font-bold text-[#FF6B4A] hover:underline"
                 >
                    Get a free key here <ExternalLink size={10} />
                 </a>
              </div>

              <div className="pt-4">
                 <button 
                   type="submit"
                   disabled={!apiKey.trim()}
                   className="w-full h-14 bg-black text-white rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[1px] hover:translate-y-[1px]"
                 >
                    Complete Setup <ArrowRight size={18} />
                 </button>
              </div>

              <p className="text-[10px] text-gray-400 font-medium text-center leading-relaxed">
                 Your API key is stored locally in your browser and is never sent to our servers.
              </p>
           </form>
        </div>

      </div>
    </div>
  );
};

export default OnboardingPage;
