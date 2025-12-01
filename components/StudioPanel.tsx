
import React, { useState } from 'react';
import { 
  Type, 
  Square, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Bold, 
  Italic, 
  Trash2,
  BoxSelect,
  Layers,
  Palette,
  Plus
} from './Icons';

interface ElementStyles {
  tagName: string;
  textContent: string;
  color: string;
  backgroundColor: string;
  fontSize: string;
  fontWeight: string;
  padding: string;
  borderRadius: string;
  textAlign: string;
  display: string;
}

interface StudioPanelProps {
  selectedElement: ElementStyles | null;
  onUpdateStyle: (key: string, value: string) => void;
  onInsertElement: (type: 'text' | 'button' | 'container' | 'image') => void;
}

const StudioPanel: React.FC<StudioPanelProps> = ({ selectedElement, onUpdateStyle, onInsertElement }) => {
  const [activeSection, setActiveSection] = useState<string | null>('design');

  if (!selectedElement) {
    return (
      <div className="p-8 flex flex-col items-center justify-center h-full text-center space-y-4 animate-in fade-in">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center">
          <BoxSelect className="text-gray-400" size={32} />
        </div>
        <div>
          <h3 className="font-bold text-black text-lg">No Selection</h3>
          <p className="text-sm text-gray-500 mt-1">Click on any element in the preview to edit its properties.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white animate-in slide-in-from-left duration-300">
      {/* Header */}
      <div className="p-4 border-b-2 border-black bg-gray-50 flex items-center justify-between shrink-0">
         <div className="flex items-center gap-2">
            <span className="bg-[#FF6B4A] text-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-black uppercase">
               {selectedElement.tagName}
            </span>
            <span className="text-xs font-bold text-gray-500 truncate max-w-[120px]">
               {selectedElement.textContent || 'Container'}
            </span>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
        
        {/* Quick Actions (Insert) */}
        <div className="space-y-2">
           <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Insert into Selected</label>
           <div className="grid grid-cols-4 gap-2">
              <button onClick={() => onInsertElement('text')} className="p-2 border-2 border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 flex flex-col items-center gap-1 transition-all" title="Add Text">
                 <Type size={16} />
              </button>
              <button onClick={() => onInsertElement('button')} className="p-2 border-2 border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 flex flex-col items-center gap-1 transition-all" title="Add Button">
                 <Square size={16} />
              </button>
              <button onClick={() => onInsertElement('container')} className="p-2 border-2 border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 flex flex-col items-center gap-1 transition-all" title="Add Container">
                 <BoxSelect size={16} />
              </button>
              <button onClick={() => onInsertElement('image')} className="p-2 border-2 border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 flex flex-col items-center gap-1 transition-all" title="Add Image">
                 <Palette size={16} />
              </button>
           </div>
        </div>

        {/* Content Editor */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Content</label>
          <textarea 
            value={selectedElement.textContent}
            onChange={(e) => onUpdateStyle('textContent', e.target.value)}
            className="w-full p-2 text-sm border-2 border-gray-200 rounded-lg focus:border-black outline-none resize-y min-h-[80px]"
            placeholder="Edit text content..."
          />
        </div>

        {/* Typography */}
        <div className="space-y-3">
           <div className="flex justify-between items-center border-b border-gray-100 pb-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-black">Typography</label>
           </div>
           
           <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                 <span className="text-xs font-bold text-gray-500">Size</span>
                 <input 
                   type="text" 
                   value={selectedElement.fontSize}
                   onChange={(e) => onUpdateStyle('fontSize', e.target.value)}
                   className="w-full p-1.5 text-xs border-2 border-gray-200 rounded focus:border-black outline-none" 
                 />
              </div>
              <div className="space-y-1">
                 <span className="text-xs font-bold text-gray-500">Weight</span>
                 <select 
                    value={selectedElement.fontWeight}
                    onChange={(e) => onUpdateStyle('fontWeight', e.target.value)}
                    className="w-full p-1.5 text-xs border-2 border-gray-200 rounded focus:border-black outline-none bg-white"
                 >
                    <option value="400">Normal</option>
                    <option value="500">Medium</option>
                    <option value="700">Bold</option>
                    <option value="900">Black</option>
                 </select>
              </div>
           </div>

           <div className="flex bg-gray-100 p-1 rounded-lg gap-1">
              <button onClick={() => onUpdateStyle('textAlign', 'left')} className={`flex-1 p-1 rounded flex justify-center ${selectedElement.textAlign === 'left' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}><AlignLeft size={14}/></button>
              <button onClick={() => onUpdateStyle('textAlign', 'center')} className={`flex-1 p-1 rounded flex justify-center ${selectedElement.textAlign === 'center' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}><AlignCenter size={14}/></button>
              <button onClick={() => onUpdateStyle('textAlign', 'right')} className={`flex-1 p-1 rounded flex justify-center ${selectedElement.textAlign === 'right' ? 'bg-white shadow-sm text-black' : 'text-gray-500'}`}><AlignRight size={14}/></button>
           </div>
           
           <div className="flex items-center justify-between p-2 border-2 border-gray-200 rounded-lg">
              <span className="text-xs font-bold">Color</span>
              <div className="flex items-center gap-2">
                 <span className="text-xs text-gray-500 uppercase">{selectedElement.color}</span>
                 <div className="w-6 h-6 rounded border border-gray-300 relative overflow-hidden">
                    <input 
                      type="color" 
                      value={selectedElement.color}
                      onChange={(e) => onUpdateStyle('color', e.target.value)}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="w-full h-full" style={{backgroundColor: selectedElement.color}}></div>
                 </div>
              </div>
           </div>
        </div>

        {/* Layout & Spacing */}
        <div className="space-y-3">
           <div className="flex justify-between items-center border-b border-gray-100 pb-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-black">Layout</label>
           </div>
           
           <div className="space-y-1">
              <span className="text-xs font-bold text-gray-500">Padding</span>
              <input 
                type="text" 
                value={selectedElement.padding}
                onChange={(e) => onUpdateStyle('padding', e.target.value)}
                className="w-full p-1.5 text-xs border-2 border-gray-200 rounded focus:border-black outline-none" 
              />
           </div>
           
           <div className="space-y-1">
              <span className="text-xs font-bold text-gray-500">Border Radius</span>
              <input 
                 type="range" 
                 min="0" max="50" 
                 value={parseInt(selectedElement.borderRadius) || 0}
                 onChange={(e) => onUpdateStyle('borderRadius', `${e.target.value}px`)}
                 className="w-full accent-black h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-right text-[10px] font-bold text-gray-400">{selectedElement.borderRadius}</div>
           </div>
        </div>

        {/* Appearance */}
        <div className="space-y-3">
           <div className="flex justify-between items-center border-b border-gray-100 pb-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-black">Appearance</label>
           </div>
           
           <div className="flex items-center justify-between p-2 border-2 border-gray-200 rounded-lg">
              <span className="text-xs font-bold">Background</span>
              <div className="flex items-center gap-2">
                 <span className="text-xs text-gray-500 uppercase">{selectedElement.backgroundColor}</span>
                 <div className="w-6 h-6 rounded border border-gray-300 relative overflow-hidden">
                    <input 
                      type="color" 
                      value={selectedElement.backgroundColor}
                      onChange={(e) => onUpdateStyle('backgroundColor', e.target.value)}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <div className="w-full h-full" style={{backgroundColor: selectedElement.backgroundColor}}></div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default StudioPanel;
