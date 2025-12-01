import React from 'react';
import { Home, Grid, Settings, Plus } from './Icons';

interface NavbarProps {
  activeTab: 'create' | 'projects';
  onTabChange: (tab: 'create' | 'projects') => void;
  onOpenSettings: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, onOpenSettings }) => {
  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white border-2 border-black rounded-full px-3 py-2 shadow-[4px_4px_0px_0px_black] animate-in slide-in-from-top-10 duration-500">
      <button 
        onClick={() => onTabChange('create')}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 transition-all font-black text-xs uppercase tracking-wider ${activeTab === 'create' ? 'bg-[#FF6B4A] text-white border-black shadow-[2px_2px_0px_0px_black]' : 'border-transparent text-gray-500 hover:text-black hover:bg-gray-100 hover:border-black'}`}
      >
        <Plus size={16} strokeWidth={3} />
        <span className="">Create</span>
      </button>

      <button 
        onClick={() => onTabChange('projects')}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 transition-all font-black text-xs uppercase tracking-wider ${activeTab === 'projects' ? 'bg-[#A3E635] text-black border-black shadow-[2px_2px_0px_0px_black]' : 'border-transparent text-gray-500 hover:text-black hover:bg-gray-100 hover:border-black'}`}
      >
        <Grid size={16} strokeWidth={3} />
        <span className="">Projects</span>
      </button>

      <div className="w-0.5 h-6 bg-gray-200 mx-1"></div>

      <button 
        onClick={onOpenSettings}
        className="p-2.5 rounded-full border-2 border-transparent hover:border-black hover:bg-gray-100 text-black transition-all hover:shadow-[2px_2px_0px_0px_black]"
        title="Settings"
      >
        <Settings size={20} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default Navbar;