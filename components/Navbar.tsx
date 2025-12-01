
import React from 'react';
import { Home, Grid, Settings } from './Icons';

interface NavbarProps {
  activeTab: 'create' | 'projects';
  onTabChange: (tab: 'create' | 'projects') => void;
  onOpenSettings: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, onOpenSettings }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 bg-white border-2 border-black rounded-full px-3 py-2 shadow-[4px_4px_0px_0px_black] animate-in slide-in-from-top-10 duration-500 max-w-[95vw] overflow-x-auto no-scrollbar">
      <button 
        onClick={() => onTabChange('create')}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 transition-all font-black text-xs uppercase tracking-wider shrink-0 ${activeTab === 'create' ? 'bg-[#FF6B4A] text-white border-black shadow-[2px_2px_0px_0px_black]' : 'border-transparent text-gray-500 hover:text-black hover:bg-gray-100 hover:border-black'}`}
      >
        <Home size={16} strokeWidth={3} />
        <span className="">Home</span>
      </button>

      {activeTab === 'create' && (
        <div className="flex items-center gap-1.5 hidden md:flex animate-in fade-in zoom-in duration-300">
          <button 
            onClick={() => scrollToSection('features-section')}
            className="px-4 py-2.5 rounded-full border-2 border-transparent hover:border-black hover:bg-gray-100 text-black transition-all font-bold text-xs uppercase tracking-wider shrink-0"
          >
            Features
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works-section')}
            className="px-4 py-2.5 rounded-full border-2 border-transparent hover:border-black hover:bg-gray-100 text-black transition-all font-bold text-xs uppercase tracking-wider shrink-0"
          >
            How it Works
          </button>
        </div>
      )}

      <button 
        onClick={() => onTabChange('projects')}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 transition-all font-black text-xs uppercase tracking-wider shrink-0 ${activeTab === 'projects' ? 'bg-[#A3E635] text-black border-black shadow-[2px_2px_0px_0px_black]' : 'border-transparent text-gray-500 hover:text-black hover:bg-gray-100 hover:border-black'}`}
      >
        <Grid size={16} strokeWidth={3} />
        <span className="">Projects</span>
      </button>

      <div className="w-0.5 h-6 bg-gray-200 mx-1 shrink-0"></div>

      <button 
        onClick={onOpenSettings}
        className="p-2.5 rounded-full border-2 border-transparent hover:border-black hover:bg-gray-100 text-black transition-all hover:shadow-[2px_2px_0px_0px_black] shrink-0"
        title="Settings"
      >
        <Settings size={20} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default Navbar;
