
import React, { useState } from 'react';
import { Presentation, ArrowUp, Sparkles, Trash2, Plus, Layout } from './Icons';
import { ProjectData } from '../types';

interface SlidesPageProps {
  onStartProject: (prompt: string, ref: undefined, tab: 'chat', type: 'presentation') => void;
  projects: ProjectData[];
  onLoadProject: (project: ProjectData) => void;
  onDeleteProject: (projectId: string) => void;
}

const SlidesPage: React.FC<SlidesPageProps> = ({ onStartProject, projects, onLoadProject, onDeleteProject }) => {
  const [prompt, setPrompt] = useState('');

  // Filter only presentation projects
  const slideProjects = projects.filter(p => p.type === 'presentation');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onStartProject(prompt, undefined, 'chat', 'presentation');
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col w-full bg-[#FDFBD4] text-black font-sans pt-28 pb-20 px-6">
      
      {/* HERO / CREATE SECTION */}
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
         <div className="inline-block bg-[#8B5CF6] border-2 border-black px-4 py-1.5 rounded-full mb-6 shadow-[4px_4px_0px_0px_black]">
             <span className="font-bold text-white uppercase tracking-wider text-xs flex items-center gap-2">
                <Presentation size={14} /> Presentation Studio
             </span>
         </div>
         
         <h1 className="text-5xl md:text-7xl font-display font-black text-black tracking-tighter text-center mb-6 leading-[0.9]">
            GENERATE<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] stroke-black" style={{ WebkitTextStroke: '2px black' }}>
               PITCH DECKS
            </span>
         </h1>
         
         <p className="text-xl font-medium text-gray-600 max-w-2xl mx-auto text-center mb-10">
            Create stunning, scrollable slide decks in seconds. Export as HTML.
         </p>

         <form onSubmit={handleSubmit} className="w-full max-w-2xl relative z-10">
            <div className="bg-white border-2 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 focus-within:translate-x-[2px] focus-within:translate-y-[2px] focus-within:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col p-2">
                <div className="px-6 pt-4 pb-2 text-xs font-black uppercase tracking-widest text-purple-400 flex items-center gap-2">
                  <Sparkles size={14} /> Describe your presentation
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A pitch deck for a startup transforming waste into energy..."
                  className="w-full flex-1 bg-transparent px-6 py-2 text-xl font-medium text-black placeholder-gray-300 outline-none resize-none rounded-[2rem] h-24"
                />
                <div className="flex justify-end p-2">
                   <button 
                      type="submit" 
                      disabled={!prompt.trim()}
                      className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white border-2 border-black w-12 h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                   >
                      <ArrowUp size={24} strokeWidth={3} />
                   </button>
                </div>
            </div>
         </form>
      </div>

      {/* MY DECKS SECTION */}
      <div className="w-full max-w-6xl mx-auto">
         <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-4">
            <h2 className="text-3xl font-black text-black uppercase tracking-tight flex items-center gap-3">
               <span className="w-6 h-6 bg-[#8B5CF6] border-2 border-black shadow-[2px_2px_0px_0px_black]"></span>
               My Decks
            </h2>
            <div className="bg-white border-2 border-black px-4 py-2 rounded-lg font-bold shadow-[2px_2px_0px_0px_black]">
               {slideProjects.length} {slideProjects.length === 1 ? 'Deck' : 'Decks'}
            </div>
         </div>

         {slideProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 border-4 border-black border-dashed rounded-3xl bg-white/50">
               <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-6 border-2 border-black">
                  <Layout size={32} className="text-purple-500" />
               </div>
               <h3 className="text-xl font-bold text-black mb-2">No decks yet</h3>
               <p className="text-gray-500">Generate your first presentation above.</p>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {slideProjects.map((project) => (
                  <div 
                     key={project.id}
                     className="relative bg-white border-2 border-black rounded-xl p-5 shadow-[4px_4px_0px_0px_black] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_black] transition-all flex flex-col justify-between group h-64"
                  >
                     <div 
                        className="flex-1 cursor-pointer"
                        onClick={() => onLoadProject(project)}
                     >
                        <div className="flex justify-between items-start mb-4">
                           <div className="w-12 h-12 border-2 border-black rounded-lg flex items-center justify-center bg-blue-100 text-blue-600 shadow-[2px_2px_0px_0px_black]">
                              <Presentation size={24} strokeWidth={2.5} />
                           </div>
                           <div className="text-[10px] font-bold bg-black text-white px-2 py-1 rounded border border-black">
                              {project.screens ? project.screens.length : 1} Slides
                           </div>
                        </div>
                        
                        <h3 className="text-2xl font-black text-black leading-tight line-clamp-2 mb-2">
                           {project.name}
                        </h3>
                        
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                           Last edited {formatDate(project.lastEdited)}
                        </div>
                     </div>

                     <div className="mt-4 pt-4 border-t-2 border-gray-100 flex justify-end items-center">
                        <button 
                           onClick={(e) => {
                              e.stopPropagation();
                              if(window.confirm('Delete this deck?')) onDeleteProject(project.id);
                           }}
                           className="p-2 hover:bg-red-100 text-black border-2 border-transparent hover:border-black rounded-lg transition-all"
                           title="Delete Deck"
                        >
                           <Trash2 size={16} />
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
    </div>
  );
};

export default SlidesPage;
