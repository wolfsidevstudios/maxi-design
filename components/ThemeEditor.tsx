import React from 'react';
import { ThemeSettings } from '../types';

interface ThemeEditorProps {
  theme: ThemeSettings;
  setTheme: React.Dispatch<React.SetStateAction<ThemeSettings>>;
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({ theme, setTheme }) => {
  return (
    <div className="p-6 space-y-8 animate-in slide-in-from-left duration-300 font-sans">
      <div className="space-y-4">
        <h3 className="text-xs font-black text-black uppercase tracking-widest border-b-2 border-black pb-2">Typography</h3>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Headings</label>
          <div className="relative">
             <select 
              className="w-full p-3 bg-white border-2 border-black rounded-lg text-sm font-medium focus:ring-0 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all appearance-none cursor-pointer"
              value={theme.fontHeading}
              onChange={(e) => setTheme({...theme, fontHeading: e.target.value})}
            >
              <option value="Space Grotesk">Space Grotesk</option>
              <option value="Inter">Inter</option>
              <option value="Playfair Display">Playfair Display</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wide">Body</label>
          <div className="relative">
            <select 
              className="w-full p-3 bg-white border-2 border-black rounded-lg text-sm font-medium focus:ring-0 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all appearance-none cursor-pointer"
              value={theme.fontBody}
              onChange={(e) => setTheme({...theme, fontBody: e.target.value})}
            >
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center border-b-2 border-black pb-2">
          <h3 className="text-xs font-black text-black uppercase tracking-widest">Style</h3>
          <span className="text-[10px] font-bold bg-[#FF6B4A] text-white border border-black px-2 py-0.5 rounded shadow-[2px_2px_0px_0px_black]">CUSTOM</span>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wide flex justify-between">
            Radius <span>{theme.radius}px</span>
          </label>
          <input 
            type="range" 
            min="0" 
            max="32" 
            value={theme.radius}
            onChange={(e) => setTheme({...theme, radius: parseInt(e.target.value)})}
            className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer border-2 border-black accent-black range-slider"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-black text-black uppercase tracking-widest border-b-2 border-black pb-2">Colors</h3>
        
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between p-3 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all bg-white cursor-pointer relative group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-black shadow-sm" style={{backgroundColor: theme.primaryColor}}></div>
              <span className="text-sm font-bold text-black">Primary</span>
            </div>
            <input 
              type="color" 
              value={theme.primaryColor}
              onChange={(e) => setTheme({...theme, primaryColor: e.target.value})}
              className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
            />
             <div className="pointer-events-none">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
            </div>
          </div>
          
           <div className="flex items-center justify-between p-3 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] bg-white opacity-60 cursor-not-allowed">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-black bg-gray-900"></div>
              <span className="text-sm font-bold text-black">Foreground</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeEditor;